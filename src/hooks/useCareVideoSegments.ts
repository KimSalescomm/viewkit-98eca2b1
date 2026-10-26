import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { type CareVideoSegment, type CareVideoSegmentRow, toSegmentMap } from "@/utils/careVideoSegments";

export interface ProductCareVideo {
  product_id: string; model_id: string; common_video_url: string | null;
  video_duration: number | null; shared_product_id: string | null; shared_model_id: string;
  allow_full_video: boolean;
}
export const resolveCareSource = (rows: ProductCareVideo[], productId: string, modelId = "") => {
  let current = rows.find(r => r.product_id === productId && r.model_id === modelId)
    ?? rows.find(r => r.product_id === productId && r.model_id === "");
  const visited = new Set<string>();
  while (current?.shared_product_id) {
    const key = `${current.product_id}/${current.model_id}`;
    if (visited.has(key)) return undefined;
    visited.add(key);
    current = rows.find(r => r.product_id === current?.shared_product_id && r.model_id === current?.shared_model_id);
  }
  return current;
};
const useCareVideoSegments = (productId: string, modelId = "") => {
  const [segments, setSegments] = useState<Record<string, CareVideoSegment>>({});
  const [videos, setVideos] = useState<ProductCareVideo[]>([]);
  const [productVideo, setProductVideo] = useState<ProductCareVideo>();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const generation = useRef(0);
  const refetch = useCallback(async () => {
    const request = ++generation.current;
    const { data, error: videoError } = await supabase.from("product_care_videos").select("*");
    if (request !== generation.current) return;
    if (videoError) { setError(videoError.message); setLoaded(true); return; }
    const rows = (data ?? []) as ProductCareVideo[];
    const source = resolveCareSource(rows, productId, modelId);
    const { data: segmentRows, error: segmentError } = await supabase.from("care_video_segments")
      .select("product_id,care_service_id,video_url,individual_video_url,start_seconds,end_seconds")
      .eq("product_id", source?.product_id ?? productId).eq("model_id", source?.model_id ?? modelId);
    if (request !== generation.current) return;
    setVideos(rows); setProductVideo(source);
    setSegments(segmentError ? {} : toSegmentMap((segmentRows ?? []) as CareVideoSegmentRow[]));
    setError(segmentError?.message ?? null); setLoaded(true);
  }, [productId, modelId]);
  useEffect(() => {
    setLoaded(false); setSegments({}); setProductVideo(undefined); setError(null);
    void refetch();
    const timer = window.setInterval(() => { void refetch(); }, 15000);
    const refresh = () => { void refetch(); };
    window.addEventListener("focus", refresh); window.addEventListener("care-video-updated", refresh);
    return () => { ++generation.current; clearInterval(timer); window.removeEventListener("focus", refresh); window.removeEventListener("care-video-updated", refresh); };
  }, [refetch]);
  return { segments, productVideo, videos, loaded, error, refetch };
};
export default useCareVideoSegments;