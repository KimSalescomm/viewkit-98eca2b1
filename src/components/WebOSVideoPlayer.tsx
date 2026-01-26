import { useRef, useState, useEffect, useCallback } from "react";
import { PlayCircle, AlertCircle } from "lucide-react";

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
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [detectedFormat, setDetectedFormat] = useState<VideoFormat>("unknown");
  const [currentSource, setCurrentSource] = useState<"primary" | "fallback">("primary");
  const [errorMessage, setErrorMessage] = useState<string>("");

  /**
   * 확장자가 mp4이지만 실제로 WebM인 것으로 알려진 URL 목록
   * LG 서버의 일부 영상은 .mp4 확장자를 사용하지만 실제 콘텐츠는 WebM
   */
  const KNOWN_WEBM_URLS = [
    "lge.co.kr/kr/story/trend/lg-refrigerators-dios-stem/3steps_filter.mp4",
    "lge.co.kr/kr/images/refrigerators/md10516831/M626_hinge_pc.mp4",
  ];

  /**
   * URL이 WebM으로 알려진 특수 케이스인지 확인
   */
  const isKnownWebMUrl = useCallback((url: string): boolean => {
    return KNOWN_WEBM_URLS.some(pattern => url.includes(pattern));
  }, []);

  /**
   * URL에서 Content-Type 헤더를 가져와 실제 비디오 포맷을 감지
   * HEAD 요청으로 빠르게 확인
   */
  const detectVideoFormat = useCallback(async (url: string): Promise<VideoFormat> => {
    // 먼저 알려진 WebM URL인지 확인 (HEAD 요청 없이 바로 반환)
    if (isKnownWebMUrl(url)) {
      console.log("알려진 WebM URL 감지 (확장자 무시):", url);
      return "video/webm";
    }

    try {
      // HEAD 요청으로 Content-Type만 확인 (본문 다운로드 없음)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5초 타임아웃
      
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
      
      // Content-Type을 못 가져온 경우 확장자로 추측 (fallback)
      const extension = url.split(".").pop()?.toLowerCase().split("?")[0];
      if (extension === "mp4") return "video/mp4";
      if (extension === "webm") return "video/webm";
      if (extension === "ogg" || extension === "ogv") return "video/ogg";
      
      return "unknown";
    } catch (error) {
      // CORS 에러 또는 타임아웃 시 - WebM을 기본으로 시도 (LG URL 특성상)
      console.warn("Content-Type 감지 실패:", error);
      
      // LG 도메인의 경우 WebM일 가능성이 높음
      if (url.includes("lge.co.kr")) {
        console.log("LG 도메인 감지 - WebM으로 가정");
        return "video/webm";
      }
      
      // 그 외의 경우 확장자로 추측
      const extension = url.split(".").pop()?.toLowerCase().split("?")[0];
      if (extension === "mp4") return "video/mp4";
      if (extension === "webm") return "video/webm";
      if (extension === "ogg" || extension === "ogv") return "video/ogg";
      return "unknown";
    }
  }, [isKnownWebMUrl]);

  /**
   * webOS 브라우저 감지
   */
  const isWebOS = useCallback(() => {
    if (typeof navigator === "undefined") return false;
    return /webOS|Web0S|LG Browser/i.test(navigator.userAgent);
  }, []);

  /**
   * WebM 코덱 지원 여부 확인
   */
  const canPlayWebM = useCallback(() => {
    const video = document.createElement("video");
    // VP8, VP9 코덱 확인
    const canPlayVP8 = video.canPlayType('video/webm; codecs="vp8"');
    const canPlayVP9 = video.canPlayType('video/webm; codecs="vp9"');
    return canPlayVP8 === "probably" || canPlayVP8 === "maybe" || 
           canPlayVP9 === "probably" || canPlayVP9 === "maybe";
  }, []);

  /**
   * fallback 소스로 전환
   */
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

      // webOS에서 WebM 지원 확인
      if (isWebOS() && !canPlayWebM()) {
        console.warn("webOS: WebM 지원 안됨, fallback 필요");
      }

      const format = await detectVideoFormat(url);
      setDetectedFormat(format);
      
      console.log(`비디오 포맷 감지: ${format} (URL: ${url})`);

      // webOS에서 WebM이 감지되었지만 재생 불가능한 경우 바로 fallback
      if (isWebOS() && format === "video/webm" && !canPlayWebM() && fallbackUrl) {
        console.log("webOS: WebM 미지원, MP4 fallback으로 전환");
        switchToFallback();
        return;
      }
    };

    initVideo();
  }, [mediaUrl, fallbackUrl, currentSource, detectVideoFormat, isWebOS, canPlayWebM, switchToFallback]);

  // 비디오 이벤트 핸들링
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      // webOS 자동재생 정책: muted 상태에서만 autoplay 허용
      video.play().catch((err) => {
        console.warn("자동재생 실패:", err);
        // 자동재생 실패해도 에러로 처리하지 않음 (사용자 상호작용 필요할 수 있음)
      });
    };

    const handlePlaying = () => {
      setIsLoading(false);
    };

    const handleError = (e: Event) => {
      const target = e.target as HTMLVideoElement;
      const error = target.error;
      
      console.error("비디오 에러:", {
        code: error?.code,
        message: error?.message,
        currentSource,
        detectedFormat,
      });

      // MediaError 코드별 처리
      if (error) {
        switch (error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            setErrorMessage("재생이 중단되었습니다");
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            setErrorMessage("네트워크 오류가 발생했습니다");
            break;
          case MediaError.MEDIA_ERR_DECODE:
            // 디코딩 에러 = 포맷 미지원, fallback 시도
            setErrorMessage("포맷 디코딩 실패");
            switchToFallback();
            return;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            // 소스 미지원 = fallback 시도
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
      console.warn("비디오 로딩 지연 (stalled)");
    };

    const handleWaiting = () => {
      // 버퍼링 중
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("error", handleError);
    video.addEventListener("stalled", handleStalled);
    video.addEventListener("waiting", handleWaiting);

    // webOS 긴 타임아웃 (로딩이 오래 걸릴 수 있음)
    const timeout = setTimeout(() => {
      if (isLoading && !hasError) {
        console.warn("비디오 로딩 타임아웃");
        switchToFallback();
      }
    }, 15000); // 15초 타임아웃

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("error", handleError);
      video.removeEventListener("stalled", handleStalled);
      video.removeEventListener("waiting", handleWaiting);
      clearTimeout(timeout);
    };
  }, [currentSource, detectedFormat, isLoading, hasError, switchToFallback]);

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
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", textAlign: "center", marginBottom: "16px" }}>
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
        <p style={{ 
          color: "rgba(255,255,255,0.4)", 
          fontSize: "12px", 
          marginTop: "16px",
          textAlign: "center" 
        }}>
          감지된 포맷: {detectedFormat} | 소스: {currentSource}
        </p>
      </div>
    );
  }

  const currentUrl = currentSource === "primary" ? mediaUrl : fallbackUrl;
  // type 속성은 실제 감지된 포맷 사용 (unknown이면 생략)
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
          <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "8px", fontSize: "12px" }}>
            {detectedFormat !== "unknown" ? `포맷: ${detectedFormat}` : "포맷 감지 중..."}
          </p>
        </div>
      )}

      {/* 비디오 요소 - webOS 최적화 속성, 원본 비율 유지 */}
      <video
        ref={videoRef}
        key={currentUrl} // 소스 변경 시 재마운트
        muted // webOS 자동재생 필수
        autoPlay // 자동 재생
        loop // 반복 재생
        playsInline // 인라인 재생 (전체화면 방지)
        preload="auto" // 미리 로드
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
        // crossOrigin을 설정하지 않음 - CORS 문제 회피
      >
        {/* 
          다중 소스 전략:
          1. 감지된 포맷으로 현재 소스 제공
          2. type 속성은 실제 Content-Type 기반
        */}
        <source 
          src={currentUrl} 
          type={typeAttribute}
        />
        
        {/* 브라우저가 첫 번째 소스 실패 시 fallback 사용 */}
        {currentSource === "primary" && fallbackUrl && (
          <source 
            src={fallbackUrl} 
            type="video/mp4"
          />
        )}
        
        {/* HTML5 비디오 미지원 브라우저용 메시지 */}
        <p style={{ color: "#fff", padding: "20px" }}>
          브라우저가 비디오 재생을 지원하지 않습니다.
        </p>
      </video>
    </div>
  );
};

export default WebOSVideoPlayer;
