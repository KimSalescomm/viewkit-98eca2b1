// 제품·콘텐츠 열람 권한 규칙 (순수 로직 — React/백엔드 없이 테스트 가능)
//
// 계정 종류
// - SC  : 관리자. 항상 전체(드래프트) 열람.
// - KOR : 유관부서(본사). 내부 계정으로 미공개·대외비 콘텐츠 열람.
// - 그 외 지점 코드(강서본점 GSB 등) : 매장 계정. 공개 노출 설정范围内에서만 열람.

import { ADMIN_STORE_CODE } from "@/data/branches";

/** 대외비 제품: 내부 계정(SC/KOR)에서만 열람 가능 */
export const CONFIDENTIAL_PRODUCT_IDS = new Set<string>(["bathair", "washcombo"]);

/** 관리자 전용 제품: SC 계정에서만 목록 및 직접 URL 열람 가능 */
export const SC_ONLY_PRODUCT_IDS = new Set<string>([]);

/**
 * 미공개 제품: 내부 계정(SC=관리자, KOR=유관부서)에서만 열람 가능.
 * 노출 설정 스냅샷에 체크되더라도 매장 계정에는 카드와 직접 URL 모두 숨김.
 * 매장에 공개할 때는 이 목록에서 제거한 뒤 관리자 화면에서 노출 설정을 저장합니다.
 */
export const UNRELEASED_PRODUCT_IDS = new Set<string>([
  "hydrotower",
  "styler",
  "cooking",
]);

/** 구독 케어 탭 중 미공개 제품 항목 (매장 계정에서 탭 숨김) */
export const UNRELEASED_CARE_TAB_IDS = new Set<string>(["hydrotower", "toploader"]);

/** 내부 계정(SC=관리자, KOR=유관부서) 여부 */
export const isInternalSlug = (slug?: string | null): boolean => {
  const s = (slug || "").trim().toUpperCase();
  return s === ADMIN_STORE_CODE || s === "KOR";
};

/** 미공개 구독 케어 탭을 내부 계정 외에는 숨김 */
export const filterVisibleCareTabs = <T extends { id: string }>(
  items: T[],
  isInternal: boolean,
): T[] =>
  isInternal ? items : items.filter((item) => !UNRELEASED_CARE_TAB_IDS.has(item.id));

/** 제품 열람 가능 여부: SC=전체, 미공개=내부 계정, 그 외=노출 설정 스냅샷 */
export const canOpenProduct = (
  productId: string,
  flags: { isAdmin: boolean; isInternal: boolean; visible: string[] },
): boolean => {
  const { isAdmin, isInternal, visible } = flags;
  if (isAdmin) return true;
  if (UNRELEASED_PRODUCT_IDS.has(productId)) return isInternal;
  if (SC_ONLY_PRODUCT_IDS.has(productId)) return false;
  return (
    isInternal ||
    visible.includes(productId) ||
    (isInternal && CONFIDENTIAL_PRODUCT_IDS.has(productId))
  );
};
