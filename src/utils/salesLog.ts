// 판매 인증 기록 저장소
// - 1차: Lovable Cloud DB (sales_certifications) — 영구 저장 + 매장 간 공유
// - 2차: localStorage — 네트워크 실패 시 오프라인 폴백

import { supabase } from "@/integrations/supabase/client";

const KEY = "viewkit_sales_log";

export interface SaleRecord {
  branch: string;
  product: string;
  sold_at: string; // yyyy-MM-dd
  created_at: string; // ISO
}

const getLocal = (): SaleRecord[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const setLocal = (rows: SaleRecord[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(rows));
  } catch {
    /* noop */
  }
};

export const getSales = async (): Promise<SaleRecord[]> => {
  try {
    const { data, error } = await supabase
      .from("sales_certifications")
      .select("branch, product, sold_at, created_at")
      .order("created_at", { ascending: true })
      .limit(5000);
    if (error) throw error;
    return (data ?? []) as SaleRecord[];
  } catch (e) {
    console.warn("[salesLog] cloud fetch failed, falling back to local", e);
    return getLocal();
  }
};

export const appendSale = async (
  input: Omit<SaleRecord, "created_at">,
): Promise<SaleRecord> => {
  const nowIso = new Date().toISOString();
  const rec: SaleRecord = { ...input, created_at: nowIso };
  try {
    const { error } = await supabase.from("sales_certifications").insert({
      branch: input.branch,
      product: input.product,
      sold_at: input.sold_at,
    });
    if (error) throw error;
  } catch (e) {
    console.warn("[salesLog] cloud insert failed, saving locally", e);
    setLocal([...getLocal(), rec]);
  }
  return rec;
};

export const clearSales = async () => {
  try {
    // 모든 행 삭제 (RLS DELETE 정책이 없으므로 서버에선 무시될 수 있음).
    // 우선 로컬 폴백 캐시를 정리하고, 서버 데이터는 관리자가 별도 절차로 정리합니다.
    localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
};
