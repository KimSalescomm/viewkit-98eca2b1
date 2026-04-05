import { useRef, useState, useEffect, useCallback } from "react";
import { PlayCircle, AlertCircle } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import VideoDebugOverlay from "@/components/VideoDebugOverlay";
import { useVideoDebug } from "@/hooks/useVideoDebug";

interface WebOSVideoPlayerProps {
  mediaUrl: string;
  fallbackUrl?: string; // MP4 fallback URL if WebM fails
  poster?: string;
}

type VideoFormat = "video/mp4" | "video/webm" | "video/ogg" | "unknown";

/**
 * webOS 호환성을 고려한 비디오 플레이어
 *
 * 주요 기능:
 * 1. Content-Type 헤더 기반 실제 포맷 감지
 * 2. 다중 소스 fallback 지원 (WebM → MP4)
 * 3. webOS 자동재생 정책 대응 (muted, playsinline, autoplay)
 * 4. 확장자가 아닌 실제 MIME 타입으로 type 속성 설정
 */
const WebOSVideoPlayer = ({ mediaUrl, fallbackUrl, poster }: WebOSVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const location = useLocation();
  const { productId, id } = useParams<{ productId?: string; id?: string }>();

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [detectedFormat, setDetectedFormat] = useState<VideoFormat>("unknown");
  const [currentSource, setCurrentSource] = useState<"primary" | "fallback">("primary");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const currentUrl = currentSource === "primary" ? mediaUrl : fallbackUrl;

  const {
    enabled: videoDebugEnabled,
    items: videoDebugItems,
    clear: clearVideoDebug,
    log: logVideoDebug,
    isInGestureContext,
    logCanPlayTypes,
    timing: videoTiming,
  } = useVideoDebug({
    videoRef,
    pageId: id || undefined,
    extra: {
      productId,
      featureId: id,
      detectedFormat,
      currentSource,
      currentUrl,
    },
  });

  const tryPlay = useCallback(
    async (reason: string) => {
      const video = videoRef.current;
      const domContains =
        typeof document !== "undefined" && !!video ? document.contains(video) : false;
      const inGesture = isInGestureContext();

      logVideoDebug("play() call", {
        reason,
        inGesture,
        domContains,
        pathKey: location.key,
      });

      if (!video) return;

      try {
        const p = video.play();
        if (p && typeof (p as Promise<void>).then === "function") {
          await p;
          logVideoDebug("play() resolved", { reason });
        } else {
          logVideoDebug("play() returned non-promise", { reason });
        }
      } catch (e) {
        logVideoDebug("play() rejected", {
          reason,
          message: e instanceof Error ? e.message : String(e),
          name: e instanceof Error ? e.name : undefined,
        });
      }
    },
    [isInGestureContext, location.key, logVideoDebug]
  );

  // (수정 3) 페이지 진입/소스 변경 시 초기화: pause + load only, currentTime은 loadedmetadata 후에
  // + 타이밍 측정 시작
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 타이밍 측정 시작
    videoTiming.startTiming();

    try {
      video.pause();
      video.load();
      logVideoDebug("init: pause+load", { reason: "source-change" });
    } catch (e) {
      logVideoDebug("init failed", {
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }, [currentUrl, location.key, logVideoDebug, videoTiming]);

  // (5) 렌더 직후 강제 play 시도 (300ms)
  useEffect(() => {
    if (!currentUrl) return;
    const t = window.setTimeout(() => {
      const video = videoRef.current;
      if (!video) return;
      try {
        video.muted = true;
      } catch {
        // ignore
      }
      void tryPlay("post-render-timeout-300ms");
    }, 300);
    return () => window.clearTimeout(t);
  }, [currentUrl, tryPlay]);

  /**
   * 확장자가 mp4이지만 실제로 WebM인 것으로 알려진 URL 목록
   */
  const KNOWN_WEBM_URLS = [
    "lge.co.kr/kr/story/trend/lg-refrigerators-dios-stem/ice_maker.mp4",
    "lge.co.kr/kr/images/refrigerators/md10516831/M626_hinge_pc.mp4",
  ];

  const isKnownWebMUrl = useCallback(
    (url: string): boolean => {
      return KNOWN_WEBM_URLS.some((pattern) => url.includes(pattern));
    },
    []
  );

  const detectVideoFormat = useCallback(
    async (url: string): Promise<VideoFormat> => {
      if (isKnownWebMUrl(url)) {
        console.log("알려진 WebM URL 감지 (확장자 무시):", url);
        return "video/webm";
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(url, {
          method: "HEAD",
          mode: "cors",
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const contentType = response.headers.get("Content-Type") || "";

        if (contentType.includes("video/mp4") || contentType.includes("video/h264")) {
          return "video/mp4";
        }
        if (contentType.includes("video/webm")) {
          return "video/webm";
        }
        if (contentType.includes("video/ogg")) {
          return "video/ogg";
        }

        const extension = url.split(".").pop()?.toLowerCase().split("?")[0];
        if (extension === "mp4") return "video/mp4";
        if (extension === "webm") return "video/webm";
        if (extension === "ogg" || extension === "ogv") return "video/ogg";

        return "unknown";
      } catch (error) {
        console.warn("Content-Type 감지 실패:", error);

        if (url.includes("lge.co.kr")) {
          console.log("LG 도메인 감지 - WebM으로 가정");
          return "video/webm";
        }

        const extension = url.split(".").pop()?.toLowerCase().split("?")[0];
        if (extension === "mp4") return "video/mp4";
        if (extension === "webm") return "video/webm";
        if (extension === "ogg" || extension === "ogv") return "video/ogg";
        return "unknown";
      }
    },
    [isKnownWebMUrl]
  );

  const isWebOS = useCallback(() => {
    if (typeof navigator === "undefined") return false;
    return /webOS|Web0S|LG Browser/i.test(navigator.userAgent);
  }, []);

  const canPlayWebM = useCallback(() => {
    const video = document.createElement("video");
    const canPlayVP8 = video.canPlayType('video/webm; codecs="vp8"');
    const canPlayVP9 = video.canPlayType('video/webm; codecs="vp9"');
    return (
      canPlayVP8 === "probably" ||
      canPlayVP8 === "maybe" ||
      canPlayVP9 === "probably" ||
      canPlayVP9 === "maybe"
    );
  }, []);

  const switchToFallback = useCallback(() => {
    if (fallbackUrl && currentSource === "primary") {
      console.log("WebM 재생 실패, MP4 fallback으로 전환");
      setCurrentSource("fallback");
      setIsLoading(true);
      setHasError(false);
      setDetectedFormat("video/mp4");
    } else {
      setHasError(true);
      setErrorMessage("영상 포맷을 재생할 수 없습니다");
    }
  }, [fallbackUrl, currentSource]);

  // 비디오 포맷 감지 및 초기화
  useEffect(() => {
    const initVideo = async () => {
      const url = currentSource === "primary" ? mediaUrl : fallbackUrl;
      if (!url) return;

      if (isWebOS() && !canPlayWebM()) {
        console.warn("webOS: WebM 지원 안됨, fallback 필요");
      }

      const format = await detectVideoFormat(url);
      setDetectedFormat(format);

      console.log(`비디오 포맷 감지: ${format} (URL: ${url})`);

      if (isWebOS() && format === "video/webm" && !canPlayWebM() && fallbackUrl) {
        console.log("webOS: WebM 미지원, MP4 fallback으로 전환");
        switchToFallback();
        return;
      }
    };

    initVideo();
  }, [mediaUrl, fallbackUrl, currentSource, detectVideoFormat, isWebOS, canPlayWebM, switchToFallback]);

  // (수정 1) 이벤트 핸들링 - stable handler references
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Log canPlayType once on mount
    logCanPlayTypes();

    // ---------- STABLE HANDLERS with TIMING ----------

    // (수정 3) loadedmetadata 후 currentTime reset + 타이밍
    const handleLoadedMetadata = () => {
      videoTiming.markEvent("loadedmetadata");
      logVideoDebug("event:loadedmetadata");
      try {
        video.currentTime = 0;
        logVideoDebug("currentTime reset to 0 after loadedmetadata");
      } catch (e) {
        logVideoDebug("currentTime reset failed", {
          message: e instanceof Error ? e.message : String(e),
        });
      }
    };

    const handleCanPlay = () => {
      videoTiming.markEvent("canplay");
      logVideoDebug("event:canplay");
      setIsLoading(false);
      void tryPlay("canplay");
    };

    const handlePlay = () => {
      logVideoDebug("event:play");
    };

    const handlePause = () => {
      logVideoDebug("event:pause");
    };

    const handlePlaying = () => {
      videoTiming.markEvent("playing");
      logVideoDebug("event:playing");
      setIsLoading(false);
    };

    // (수정 2) error 핸들러 - MediaError 상세 로그 + 타이밍
    const handleError = () => {
      videoTiming.markEvent("error");
      const error = video.error;
      logVideoDebug("event:error", {
        errorCode: error?.code,
        errorMessage: error?.message,
        currentSrc: video.currentSrc,
        readyState: video.readyState,
        networkState: video.networkState,
      });

      console.error("비디오 에러:", {
        code: error?.code,
        message: error?.message,
        currentSource,
        detectedFormat,
      });

      if (error) {
        switch (error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            setErrorMessage("재생이 중단되었습니다");
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            setErrorMessage("네트워크 오류가 발생했습니다");
            break;
          case MediaError.MEDIA_ERR_DECODE:
            setErrorMessage("포맷 디코딩 실패");
            switchToFallback();
            return;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            setErrorMessage("지원하지 않는 포맷입니다");
            switchToFallback();
            return;
          default:
            setErrorMessage("알 수 없는 오류가 발생했습니다");
        }
      }

      setIsLoading(false);
      switchToFallback();
    };

    const handleStalled = () => {
      logVideoDebug("event:stalled");
      console.warn("비디오 로딩 지연 (stalled)");
    };

    const handleWaiting = () => {
      logVideoDebug("event:waiting");
    };

    // ---------- ADD LISTENERS ----------
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("error", handleError);
    video.addEventListener("stalled", handleStalled);
    video.addEventListener("waiting", handleWaiting);

    // webOS 긴 타임아웃
    const timeout = setTimeout(() => {
      if (isLoading && !hasError) {
        console.warn("비디오 로딩 타임아웃");
        switchToFallback();
      }
    }, 15000);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("error", handleError);
      video.removeEventListener("stalled", handleStalled);
      video.removeEventListener("waiting", handleWaiting);
      clearTimeout(timeout);
    };
  }, [
    currentSource,
    detectedFormat,
    hasError,
    isLoading,
    logVideoDebug,
    logCanPlayTypes,
    switchToFallback,
    tryPlay,
    videoTiming,
  ]);

  // 수동 재생 핸들러 (디버그 모드 전용)
  const handleManualPlay = useCallback(() => {
    void tryPlay("user-click");
  }, [tryPlay]);

  // 에러 UI
  if (hasError) {
    return (
      <div
        style={{
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 40px",
          minHeight: "300px",
        }}
      >
        <AlertCircle size={64} color="#ff6b6b" style={{ marginBottom: "16px" }} />
        <p style={{ color: "#fff", fontSize: "18px", textAlign: "center", marginBottom: "8px" }}>
          영상을 재생할 수 없습니다
        </p>
        {errorMessage && (
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "14px",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            {errorMessage}
          </p>
        )}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href={mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "12px 24px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: "8px",
              color: "#fff",
              textDecoration: "none",
              fontSize: "14px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.15)";
            }}
          >
            외부 링크에서 보기
          </a>
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "12px",
            marginTop: "16px",
            textAlign: "center",
          }}
        >
          감지된 포맷: {detectedFormat} | 소스: {currentSource}
        </p>
      </div>
    );
  }

  const typeAttribute = detectedFormat !== "unknown" ? detectedFormat : undefined;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#000",
        position: "relative",
      }}
    >
      {/* (수정 5) 오버레이 - pointer-events:none, 우상단, 높은 z-index, 수동 재생 버튼 */}
      <VideoDebugOverlay
        enabled={videoDebugEnabled}
        items={videoDebugItems}
        onClear={clearVideoDebug}
        onManualPlay={handleManualPlay}
        timing={videoTiming.getTiming()}
      />

      {/* 로딩 인디케이터 */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
            zIndex: 10,
          }}
        >
          {poster && (
            <img
              src={poster}
              alt="로딩 중"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                opacity: 0.5,
              }}
            />
          )}
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "3px solid rgba(255,255,255,0.3)",
              borderTopColor: "#fff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ color: "rgba(255,255,255,0.8)", marginTop: "16px", fontSize: "14px" }}>
            로딩중...
          </p>
        </div>
      )}

      {/* 비디오 요소 */}
      <video
        ref={videoRef}
        key={currentUrl}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        poster={poster}
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "80vh",
          objectFit: "contain",
          display: "block",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      >
        <source src={currentUrl} type={typeAttribute} />

        {currentSource === "primary" && fallbackUrl && <source src={fallbackUrl} type="video/mp4" />}

        <p style={{ color: "#fff", padding: "20px" }}>브라우저가 비디오 재생을 지원하지 않습니다.</p>
      </video>
    </div>
  );
};

export default WebOSVideoPlayer;
