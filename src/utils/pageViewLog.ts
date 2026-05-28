// 자체 페이지뷰 집계 - Supabase에 기록하여 /admin에서 store_id별 통계 표시
import { supabase } from "@/integrations/supabase/client";
import { getCurrentStore } from "@/utils/storeId";
import { getBranchNameByCode, isAdminStore } from "@/data/branches";

const SESSION_KEY = "viewkit_pv_session_id";

const ensureSessionId = (): string => {
  try {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
};

let lastLogged = "";
let lastLoggedAt = 0;

export const logPageView = async (path: string) => {
  // URL에서 store_id 쿼리 파라미터는 제거하고 경로 부분만 사용
  const cleanPath = path.split("?")[0] || path;

  // 1초 내 동일 경로 중복 방지
  const now = Date.now();
  if (lastLogged === cleanPath && now - lastLoggedAt < 1000) return;
  lastLogged = cleanPath;
  lastLoggedAt = now;

  const store = getCurrentStore();
  // 지점 미설정 상태에서는 기록하지 않음 (모달 노출 단계)
  if (!store?.slug) return;

  const slug = store.slug.toUpperCase();
  const name = isAdminStore(slug)
    ? "관리자"
    : store.name || getBranchNameByCode(slug) || slug;

  try {
    await supabase.from("page_views").insert({
      store_id: slug,
      store_name: name,
      path: cleanPath,
      session_id: ensureSessionId(),
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 300) : null,
    });
  } catch {
    /* noop - 분석은 실패해도 앱 동작에 영향 없음 */
  }
};
