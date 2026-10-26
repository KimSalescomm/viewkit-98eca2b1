import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, Play } from "lucide-react";
import useCareVideoSegments from "@/hooks/useCareVideoSegments";
import { hasCareVideo, hasReachedEnd, resolveVideoUrl } from "@/utils/careVideoSegments";

/** Optional media control for legacy care layouts; their photos and copy remain untouched. */
const CareSegmentVideo = ({ productId, careServiceId, modelId = "" }: { productId: string; careServiceId: string; modelId?: string }) => {
  const { segments, productVideo } = useCareVideoSegments(productId, modelId);
  const segment = segments[careServiceId];
  const common = productVideo?.common_video_url ?? undefined;
  const url = resolveVideoUrl(segment, undefined, common);
  const available = hasCareVideo(segment, undefined, productVideo?.allow_full_video ? common : undefined);
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => { videoRef.current?.pause(); setOpen(false); setFailed(false); }, [careServiceId, productId, modelId]);
  if (!available || !url) return null;
  return <div className="mt-3 space-y-2">
    <Button variant="outline" size="sm" onClick={() => { videoRef.current?.pause(); setOpen(v => !v); }}>{open ? <ImageIcon /> : <Play />}{open ? "사진" : "영상"}</Button>
    {open && (failed ? <p className="text-sm text-muted-foreground">영상을 불러오지 못했습니다.</p> : <video ref={videoRef} key={url} src={url} controls playsInline className="aspect-video w-full rounded-lg bg-muted object-contain" onLoadedMetadata={e => { e.currentTarget.currentTime = segment?.startSeconds ?? 0; }} onTimeUpdate={e => { if (hasReachedEnd(e.currentTarget.currentTime, segment?.endSeconds ?? null)) e.currentTarget.pause(); }} onPlay={e => { if (segment && (e.currentTarget.currentTime < segment.startSeconds || hasReachedEnd(e.currentTarget.currentTime, segment.endSeconds))) e.currentTarget.currentTime = segment.startSeconds; }} onError={() => setFailed(true)} />)}
  </div>;
};
export default CareSegmentVideo;