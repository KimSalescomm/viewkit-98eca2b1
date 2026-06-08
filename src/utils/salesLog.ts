// 판매 인증 기록 저장소 (Lovable Cloud DB: sales_certifications)
import { supabase } from "@/integrations/supabase/client";

// 사이트 오픈일 — 이전 데이터는 허수로 간주하여 대시보드에서 제외
export const SITE_OPEN_DATE = "2026-06-08";

export interface SaleRecord {
  id?: string;
  branch: string;
  product: string;
  sold_at: string; // yyyy-MM-dd
  created_at: string; // ISO
}

export const getSales = async (): Promise<SaleRecord[]> => {
  const { data, error } = await supabase
    .from("sales_certifications")
    .select("id, branch, product, sold_at, created_at")
    .gte("created_at", `${SITE_OPEN_DATE}T00:00:00Z`)
    .order("created_at", { ascending: true })
    .limit(5000);
  if (error) {
    console.warn("[salesLog] fetch failed", error);
    return [];
  }
  return (data ?? []) as SaleRecord[];
};

export const appendSale = async (
  input: Omit<SaleRecord, "created_at" | "id">,
): Promise<void> => {
  const { error } = await supabase.from("sales_certifications").insert({
    branch: input.branch,
    product: input.product,
    sold_at: input.sold_at,
  });
  if (error) console.warn("[salesLog] insert failed", error);
};

export const deleteSale = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from("sales_certifications").delete().eq("id", id);
  if (error) {
    console.warn("[salesLog] delete failed", error);
    return false;
  }
  return true;
};

export const deleteSalesByIds = async (ids: string[]): Promise<boolean> => {
  if (ids.length === 0) return true;
  const { error } = await supabase.from("sales_certifications").delete().in("id", ids);
  if (error) {
    console.warn("[salesLog] bulk delete failed", error);
    return false;
  }
  return true;
};

export const clearAllSales = async (): Promise<boolean> => {
  // 모든 행 삭제 (id IS NOT NULL 조건으로 전체 매칭)
  const { error } = await supabase
    .from("sales_certifications")
    .delete()
    .not("id", "is", null);
  if (error) {
    console.warn("[salesLog] clear all failed", error);
    return false;
  }
  return true;
};

// 하위 호환
export const clearSales = clearAllSales;
