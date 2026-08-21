import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * 제품 내 특장점별 좋아요(feature_reactions) 수를 한 번에 조회.
 * 벤토 그리드에서 "가장 좋아요가 많은 특장점"을 강조하기 위해 사용.
 */
export const useFeatureLikeCounts = (productId: string | undefined) => {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId) return;
    let cancelled = false;

    const fetchCounts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("feature_reactions")
          .select("feature_id")
          .eq("product_id", productId)
          .limit(10000);
        if (error) throw error;
        const next: Record<string, number> = {};
        (data || []).forEach((row: { feature_id: string }) => {
          next[row.feature_id] = (next[row.feature_id] || 0) + 1;
        });
        if (!cancelled) setCounts(next);
      } catch {
        /* noop - 카운트 조회 실패는 레이아웃에 영향 없음 */
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void fetchCounts();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  return { counts, loading };
};
