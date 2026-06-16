import { useEffect, useRef, useState, useCallback } from "react";
import {
  SCREENSAVER_ENABLED,
  SCREENSAVER_IDLE_MS,
  SCREENSAVER_VIDEOS,
  type ScreensaverVideo,
} from "@/config/screensaver";

/**
 * ScreensaverOverlay
 * - 일정 시간 무동작 시 전면에 세로형 광고 영상을 풀스크린으로 노출
 * - 영상 목록을 순환 재생
 * - 사용자가 화면을 터치/클릭/키 입력하면 즉시 해제
 */
const ScreensaverOverlay = () => {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const idleTimerRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videos = SCREENSAVER_VIDEOS;
  const hasVideos = videos.length > 0;
  const enabled = SCREENSAVER_ENABLED && hasVideos;

  const clearIdleTimer = () => {
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  };

  const scheduleIdle = useCallback(() => {
    clearIdleTimer();
    if (!enabled) return;
    idleTimerRef.current = window.setTimeout(() => {
      setIndex(0);
      setActive(true);
    }, SCREENSAVER_IDLE_MS);
  }, [enabled]);

  const dismiss = useCallback(() => {
    setActive(false);
    scheduleIdle();
  }, [scheduleIdle]);

  // 사용자 활동 감지
  useEffect(() => {
    if (!enabled) return;

    const events: (keyof DocumentEventMap)[] = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "wheel",
      "scroll",
    ];

    const onActivity = () => {
      if (active) return;
      scheduleIdle();
    };

    events.forEach((e) =>
      document.addEventListener(e, onActivity, { passive: true })
    );
    scheduleIdle();

    return () => {
      events.forEach((e) => document.removeEventListener(e, onActivity));
      clearIdleTimer();
    };
  }, [enabled, active, scheduleIdle]);

  // 다음 영상으로 진행
  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % videos.length);
  }, [videos.length]);

  if (!enabled || !active) return null;

  const current: ScreensaverVideo | undefined = videos[index];
  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-label="화면 보호기"
      onClick={dismiss}
      onTouchStart={dismiss}
      onKeyDown={dismiss}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center cursor-pointer select-none animate-fade-in"
    >
      {current.youtube ? (
        <iframe
          key={current.src + index}
          src={toYouTubeEmbed(current.src, () => goNext())}
          title="screensaver"
          className="w-full h-full pointer-events-none"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      ) : (
        <video
          ref={videoRef}
          key={current.src + index}
          src={current.src}
          poster={current.poster}
          autoPlay
          muted
          playsInline
          onEnded={goNext}
          onError={goNext}
          className="w-full h-full object-contain"
        />
      )}
      {/* 안내 텍스트 */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-white/70 text-sm pointer-events-none">
        화면을 터치하면 돌아갑니다
      </div>
    </div>
  );
};

function toYouTubeEmbed(url: string, _onEnd?: () => void): string {
  const idMatch = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  const id = idMatch?.[1] ?? "";
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    controls: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    playlist: id,
    loop: "1",
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

export default ScreensaverOverlay;
