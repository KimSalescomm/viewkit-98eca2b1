// 자체 페이지뷰 집계 - Supabase에 기록하여 /admin에서 store_id별 통계 표시
import { supabase } from "@/integrations/supabase/client";
import { getCurrentStore } from "@/utils/storeId";
import { getBranchNameByCode, isAdminStore } from "@/data/branches";

const SESSION_KEY = "viewkit_pv_session_id";
const SESSION_TS_KEY = "viewkit_pv_session_ts";
// 세션 유효 시간: 마지막 활동으로부터 30분 (브라우저를 껐다 켜도 동일 세션 유지)
const SESSION_TTL_MS = 30 * 60 * 1000;
// 동일 경로 재기록 최소 간격: 10분 (껐다 켜기 반복으로 인한 부풀림 방지)
const PATH_DEDUPE_MS = 10 * 60 * 1000;
const PATH_LOG_KEY = "viewkit_pv_path_log";

const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const ensureSessionId = (): string => {
  try {
    const now = Date.now();
    const sid = localStorage.getItem(SESSION_KEY);
    const ts = Number(localStorage.getItem(SESSION_TS_KEY) || 0);
    const valid = sid && ts && now - ts < SESSION_TTL_MS;
    const id = valid ? sid! : newId();
    localStorage.setItem(SESSION_KEY, id);
    localStorage.setItem(SESSION_TS_KEY, String(now));
    if (!valid) localStorage.removeItem(PATH_LOG_KEY); // 새 세션이면 경로 기록 초기화
    return id;
  } catch {
    return newId();
  }
};

// 같은 세션 내에서 동일 경로가 최근에 기록됐는지 확인 (기록 시 갱신)
const shouldSkipPath = (path: string): boolean => {
  try {
    const now = Date.now();
    const raw = localStorage.getItem(PATH_LOG_KEY);
    const log: Record<string, number> = raw ? JSON.parse(raw) : {};
    if (log[path] && now - log[path] < PATH_DEDUPE_MS) return true;
    log[path] = now;
    // 오래된 항목 정리
    for (const k of Object.keys(log)) {
      if (now - log[k] > PATH_DEDUPE_MS) delete log[k];
    }
    localStorage.setItem(PATH_LOG_KEY, JSON.stringify(log));
    return false;
  } catch {
    return false;
  }
};

let lastLogged = "";
let lastLoggedAt = 0;
let inflightLog = false; // 진행 중인 insert 중복 방지


export const logPageView = async (path: string) => {
  // URL에서 store_id 쿼리 파라미터는 제거하고 경로 부분만 사용
  const cleanPath = path.split("?")[0] || path;

  // 3초 내 동일 경로 중복 방지 (StrictMode 이중 마운트 대응)
  const now = Date.now();
  if (lastLogged === cleanPath && now - lastLoggedAt < 3000) return;
  // 진행 중인 insert가 있으면 skip
  if (inflightLog) return;
  lastLogged = cleanPath;
  lastLoggedAt = now;
  inflightLog = true;

  const store = getCurrentStore();
  // 지점 미설정 상태에서는 기록하지 않음 (모달 노출 단계)
  if (!store?.slug) {
    inflightLog = false;
    return;
  }

  const slug = store.slug.toUpperCase();
  // 관리자(SC) / 본사(KOR) 계정은 집계에서 제외
  if (isAdminStore(slug) || slug === "KOR") {
    inflightLog = false;
    return;
  }

  const name = store.name || getBranchNameByCode(slug) || slug;

  // 세션 갱신(슬라이딩 TTL) 후 동일 경로 재기록 여부 판단
  const sessionId = ensureSessionId();
  if (shouldSkipPath(cleanPath)) {
    inflightLog = false;
    return;
  }

  try {
    await supabase.from("page_views").insert({
      store_id: slug,
      store_name: name,
      path: cleanPath,
      session_id: sessionId,
    });

  } catch {
    /* noop - 분석은 실패해도 앱 동작에 영향 없음 */
  } finally {
    inflightLog = false;
  }
};
