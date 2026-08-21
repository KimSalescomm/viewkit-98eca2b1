// NEW 뱃지 운영 규칙
// 신규 카드 등록일(releasedAt)로부터 NEW_BADGE_DAYS 동안만 NEW 뱃지를 노출한다.
// 새 제품을 추가할 때는 아래 맵에 productId와 등록일(YYYY-MM-DD, KST 기준)만 추가하면 된다.

export const NEW_BADGE_DAYS = 14;

export const NEW_PRODUCT_RELEASE_DATES: Record<string, string> = {
  bathair: "2026-08-21",
  washcombo: "2026-08-21",
};

export const isNewProduct = (productId: string, now: Date = new Date()): boolean => {
  const released = NEW_PRODUCT_RELEASE_DATES[productId];
  if (!released) return false;

  const start = new Date(`${released}T00:00:00+09:00`).getTime();
  if (Number.isNaN(start)) return false;

  const end = start + NEW_BADGE_DAYS * 24 * 60 * 60 * 1000;
  const current = now.getTime();
  return current >= start && current < end;
};
