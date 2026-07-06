// 특장점 관심 표시(하트) 이벤트 로그
// - page_views와 유사한 append-only 패턴
// - 세션당 (product_id, feature_id) 조합 최대 20회 소프트 캡
// - SC(관리자)/KOR(유관부서) 계정은 집계 제외
// - 300ms debounce (동일 특장점 연속 클릭 스팸 방지)

import { supabase } from "@/integrations/supabase/client";
import { getCurrentStore } from "@/utils/storeId";
import { isAdminStore } from "@/data/branches";

const SESSION_KEY = "viewkit_reaction_session_id";
const CAP_KEY = "viewkit_reaction_caps"; // { [`${productId}:${featureId}`]: count }
const CAP_LIMIT = 20;
const DEBOUNCE_MS = 300;

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

const getCaps = (): Record<string, number> => {
  try {
    return JSON.parse(sessionStorage.getItem(CAP_KEY) || "{}");
  } catch {
    return {};
  }
};

const bumpCap = (key: string): number => {
  const caps = getCaps();
  const next = (caps[key] ?? 0) + 1;
  caps[key] = next;
  try {
    sessionStorage.setItem(CAP_KEY, JSON.stringify(caps));
  } catch {
    /* noop */
  }
  return next;
};

const lastCallAt: Record<string, number> = {};

export interface LogFeatureReactionInput {
  productId: string;
  productName?: string;
  featureId: string;
  featureTitle?: string;
}

/**
 * 관심 표시 이벤트를 서버에 기록.
 * - UI 반영은 호출부에서 즉시 처리하고, 이 함수는 fire-and-forget으로 사용
 * - 캡 초과/디바운스/관리자 계정이면 조용히 skip (반환값 없음)
 */
export const logFeatureReaction = async ({
  productId,
  productName,
  featureId,
  featureTitle,
}: LogFeatureReactionInput): Promise<void> => {
  if (!productId || !featureId) return;

  const key = `${productId}:${featureId}`;
  const now = Date.now();
  if (lastCallAt[key] && now - lastCallAt[key] < DEBOUNCE_MS) return;
  lastCallAt[key] = now;

  const store = getCurrentStore();
  if (!store?.slug) return; // 매장 미설정 시 기록하지 않음

  const slug = store.slug.toUpperCase();
  if (isAdminStore(slug) || slug === "KOR") return; // 관리자/본사 제외

  const caps = getCaps();
  if ((caps[key] ?? 0) >= CAP_LIMIT) return; // 세션 캡 초과
  bumpCap(key);

  try {
    await supabase.from("feature_reactions").insert({
      store_slug: slug,
      store_name: store.name || slug,
      product_id: productId,
      product_name: productName || productId,
      feature_id: featureId,
      feature_title: featureTitle || null,
      session_id: ensureSessionId(),
    });
  } catch {
    /* noop - 분석 실패는 앱 동작에 영향 없음 */
  }
};
