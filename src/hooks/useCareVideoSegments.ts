import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  CareVideoSegment,
  CareVideoSegmentRow,
  toSegmentMap,
} from "@/utils/careVideoSegments";

/**
 * 제품별 케어 영상 구간(관리자가 저장한 시작·종료 시간)을 불러옵니다.
 * 저장된 구간이 없으면 빈 맵을 반환하고, 이 경우 전체 영상을 처음부터 재생합니다.
 */
const useCareVideoSegments = (productId: string) => {
  const [segments, setSegments] = useState<Record<string, CareVideoSegment>>({});
  const [loaded, setLoaded] = useState(false);

  const refetch = useCallback(async () => {
    const { data, error } = await supabase
      .from("care_video_segments")
      .select("product_id, care_service_id, video_url, start_seconds, end_seconds")
      .eq("product_id", productId);
    if (!error && data) {
      setSegments(toSegmentMap(data as CareVideoSegmentRow[]));
    }
    setLoaded(true);
  }, [productId]);

  useEffect(() => {
    setLoaded(false);
    void refetch();
  }, [refetch]);

  return { segments, loaded, refetch };
};

export default useCareVideoSegments;
