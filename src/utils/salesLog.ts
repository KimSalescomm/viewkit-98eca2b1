// 판매 인증 기록 저장소 (Lovable Cloud DB: sales_certifications)
import { supabase } from "@/integrations/supabase/client";

// 사이트 오픈일 — 이전 데이터는 허수로 간주하여 대시보드에서 제외
export const SITE_OPEN_DATE = "2026-06-08";

export interface SaleRecord {
  id?: string;
  branch: string;
  product: string;
  subcategory?: string | null;
  memo?: string | null;
  sold_at: string; // yyyy-MM-dd
  created_at: string; // ISO
}

export const getSales = async (): Promise<SaleRecord[]> => {
  const { data, error } = await supabase
    .from("sales_certifications")
    .select("id, branch, product, subcategory, memo, sold_at, created_at")
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
    subcategory: input.subcategory ?? null,
    memo: input.memo ?? null,
    sold_at: input.sold_at,
  });
  if (error) console.warn("[salesLog] insert failed", error);
};

// 삭제는 관리자 패스코드를 통해 서버(Edge Function: delete-sales)에서만 수행됩니다.
const invokeDelete = async (
  body: { code: string; mode: "one" | "many" | "all"; id?: string; ids?: string[] },
): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke("delete-sales", { body });
    if (error || !data?.ok) {
      console.warn("[salesLog] delete failed", error ?? data);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("[salesLog] delete invoke failed", err);
    return false;
  }
};

export const deleteSale = (id: string, code: string): Promise<boolean> =>
  invokeDelete({ code, mode: "one", id });

export const deleteSalesByIds = (ids: string[], code: string): Promise<boolean> => {
  if (ids.length === 0) return Promise.resolve(true);
  return invokeDelete({ code, mode: "many", ids });
};

export const clearAllSales = (code: string): Promise<boolean> =>
  invokeDelete({ code, mode: "all" });

// 하위 호환
export const clearSales = clearAllSales;
