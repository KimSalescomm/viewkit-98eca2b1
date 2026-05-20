// 판매 인증 기록 로컬 저장소
// (Lovable Cloud DB 도입 전 임시 저장; /ranking 페이지에서 집계 사용)

const KEY = "viewkit_sales_log";

export interface SaleRecord {
  branch: string;
  product: string;
  sold_at: string; // yyyy-MM-dd
  created_at: string; // ISO
}

export const getSales = (): SaleRecord[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const appendSale = (input: Omit<SaleRecord, "created_at">): SaleRecord => {
  const rec: SaleRecord = { ...input, created_at: new Date().toISOString() };
  try {
    const next = [...getSales(), rec];
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* noop */
  }
  return rec;
};

export const clearSales = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
};
