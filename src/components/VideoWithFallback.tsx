/**
 * VideoWithFallback - 안정적인 비디오 재생 컴포넌트
 * 
 * 사용법:
 * <VideoWithFallback
 *   videoUrl="https://example.com/video.mp4"
 *   posterUrl="https://example.com/thumbnail.jpg"
 *   timeoutMs={8000}
 * />
 * 
 * - 로딩 중/에러 시 poster(썸네일)만 표시
 * - 영상이 재생 가능(canplay/playing) 상태일 때만 영상 표시
 * - 에러 발생 시 오류 화면 대신 poster 유지
 */

import { useEffect, useRef, useState, useCallback } from "react";

interface VideoWithFallbackProps {
  videoUrl: string;
  posterUrl: string;
  timeoutMs?: number;
  className?: string;
}

type VideoState = "loading" | "ready" | "error";

const VideoWithFallback = ({
  videoUrl,
  posterUrl,
  timeoutMs = 8000,
  className = "",
}: VideoWithFallbackProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState<VideoState>("loading");
  const [showLoading, setShowLoading] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasPlayedRef = useRef(false);

  // Hard fallback: 에러 시 video를 완전히 중지
  const hardFallback = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.removeAttribute("src");
      video.load(); // 추가 로딩/에러 반복 방지
    }
    setVideoState("error");
    setShowLoading(false);
  }, []);

  // 타임아웃 처리
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (!hasPlayedRef.current) {
        // 타임아웃 시 로딩 라벨만 끄고 poster 유지
        setShowLoading(false);
        // 아직 ready가 아니면 error로 처리
        if (videoState === "loading") {
          hardFallback();
        }
      }
    }, timeoutMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timeoutMs, videoState, hardFallback]);

  // 비디오 이벤트 핸들러
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => {
      setVideoState("loading");
      setShowLoading(true);
    };

    const handleWaiting = () => {
      setShowLoading(true);
    };

    const handleStalled = () => {
      setShowLoading(true);
    };

    const handleCanPlay = () => {
      hasPlayedRef.current = true;
      setVideoState("ready");
      setShowLoading(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    const handlePlaying = () => {
      hasPlayedRef.current = true;
      setVideoState("ready");
      setShowLoading(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    const handleError = () => {
      hardFallback();
    };

    const handleAbort = () => {
      hardFallback();
    };

    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("stalled", handleStalled);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("error", handleError);
    video.addEventListener("abort", handleAbort);

    return () => {
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("stalled", handleStalled);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("error", handleError);
      video.removeEventListener("abort", handleAbort);
    };
  }, [hardFallback]);

  const isVideoVisible = videoState === "ready";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        aspectRatio: "9/16",
        background: "#000",
      }}
    >
      {/* Poster (항상 렌더링, 영상 ready 시에만 숨김) */}
      <img
        src={posterUrl}
        alt="Video thumbnail"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: isVideoVisible ? 0 : 1,
          transition: "opacity 0.3s ease",
          zIndex: 1,
        }}
      />

      {/* Video (항상 렌더링하지만 opacity로 제어) */}
      {videoState !== "error" && (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          autoPlay
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isVideoVisible ? 1 : 0,
            transition: "opacity 0.3s ease",
            zIndex: 2,
          }}
        />
      )}

      {/* 로딩 라벨 (하단 좌측 pill) - 에러 시에는 숨김 */}
      {showLoading && videoState !== "error" && (
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
            zIndex: 10,
            background: "rgba(0, 0, 0, 0.6)",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 500,
            backdropFilter: "blur(4px)",
          }}
        >
          로딩중…
        </div>
      )}
    </div>
  );
};

export default VideoWithFallback;
