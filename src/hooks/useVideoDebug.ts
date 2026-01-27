import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

type VideoStyleSnapshot = {
  tagName: string;
  className?: string;
  id?: string;
  display: string;
  visibility: string;
  opacity: string;
  overflow: string;
  transform: string;
  zIndex: string;
  position: string;
};

/**
 * 타이밍 측정용 타입
 */
export type VideoTimingInfo = {
  srcSetTs: number;       // source 설정 시점
  loadedmetadataTs?: number;
  canplayTs?: number;
  playingTs?: number;
  errorTs?: number;
  // elapsed times (in ms)
  toLoadedmetadata?: number;
  toCanplay?: number;
  toPlaying?: number;
  toError?: number;
};

export type VideoDebugSnapshot = {
  path: string;
  locationKey?: string;
  pageId?: string;
  event: string;
  ts: number;
  currentSrc?: string;
  readyState?: number;
  networkState?: number;
  paused?: boolean;
  muted?: boolean;
  currentTime?: number;
  errorCode?: number;
  errorMessage?: string;
  boundingRect?: {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    left: number;
  };
  // Up to 6 ancestors + video element
  ancestorStyles?: VideoStyleSnapshot[];
  extra?: Record<string, unknown>;
  // Timing info
  timing?: VideoTimingInfo;
};

const pickStyle = (el: Element | null | undefined): VideoStyleSnapshot | null => {
  if (!el || typeof window === "undefined") return null;
  const cs = window.getComputedStyle(el);
  return {
    tagName: el.tagName,
    className: el.className || undefined,
    id: (el as HTMLElement).id || undefined,
    display: cs.display,
    visibility: cs.visibility,
    opacity: cs.opacity,
    overflow: cs.overflow,
    transform: cs.transform,
    zIndex: cs.zIndex,
    position: cs.position,
  };
};

/**
 * Capture styles from video element up to 6 ancestors (or until body)
 */
const captureAncestorStyles = (video: HTMLVideoElement | null): VideoStyleSnapshot[] => {
  if (!video) return [];
  const result: VideoStyleSnapshot[] = [];
  let el: Element | null = video;
  let depth = 0;
  const maxDepth = 7; // video + 6 ancestors
  while (el && depth < maxDepth && el.tagName !== "BODY" && el.tagName !== "HTML") {
    const style = pickStyle(el);
    if (style) result.push(style);
    el = el.parentElement;
    depth++;
  }
  return result;
};

const captureBoundingRect = (video: HTMLVideoElement | null) => {
  if (!video) return undefined;
  const rect = video.getBoundingClientRect();
  return {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
  };
};

const isEnabledFromSearch = (search: string): boolean => {
  const params = new URLSearchParams(search);
  return (
    params.get("videoDebug") === "1" ||
    params.get("videoDebug") === "true" ||
    params.get("debugVideo") === "1" ||
    params.get("debugVideo") === "true" ||
    params.get("vd") === "1"
  );
};

const isEnabledFromStorage = (): boolean => {
  try {
    return localStorage.getItem("videoDebug") === "1";
  } catch {
    return false;
  }
};

/**
 * 타이밍 측정 훅
 */
export function useVideoTiming() {
  const timingRef = useRef<VideoTimingInfo | null>(null);

  const startTiming = useCallback(() => {
    timingRef.current = { srcSetTs: Date.now() };
    // eslint-disable-next-line no-console
    console.log("[VideoDebugTiming] source set", { srcSetTs: timingRef.current.srcSetTs });
  }, []);

  const markEvent = useCallback((eventName: "loadedmetadata" | "canplay" | "playing" | "error") => {
    if (!timingRef.current) return;
    const now = Date.now();
    const t = timingRef.current;
    
    switch (eventName) {
      case "loadedmetadata":
        t.loadedmetadataTs = now;
        t.toLoadedmetadata = now - t.srcSetTs;
        break;
      case "canplay":
        t.canplayTs = now;
        t.toCanplay = now - t.srcSetTs;
        break;
      case "playing":
        t.playingTs = now;
        t.toPlaying = now - t.srcSetTs;
        break;
      case "error":
        t.errorTs = now;
        t.toError = now - t.srcSetTs;
        break;
    }
    
    // eslint-disable-next-line no-console
    console.log("[VideoDebugTiming]", eventName, {
      elapsed: now - t.srcSetTs,
      timing: { ...t },
    });
  }, []);

  const getTiming = useCallback(() => {
    return timingRef.current ? { ...timingRef.current } : null;
  }, []);

  const resetTiming = useCallback(() => {
    timingRef.current = null;
  }, []);

  return { startTiming, markEvent, getTiming, resetTiming };
}

export function useVideoDebug(params: {
  videoRef: React.RefObject<HTMLVideoElement>;
  pageId?: string;
  extra?: Record<string, unknown>;
}) {
  const location = useLocation();
  const lastGestureTsRef = useRef<number>(0);
  const [items, setItems] = useState<VideoDebugSnapshot[]>([]);
  const canPlayTypeCapturedRef = useRef(false);
  const timing = useVideoTiming();

  const enabled = useMemo(() => {
    return isEnabledFromSearch(location.search) || isEnabledFromStorage();
  }, [location.search]);

  const isInGestureContext = useCallback(() => {
    return Date.now() - lastGestureTsRef.current <= 600;
  }, []);

  // Gesture tracking
  useEffect(() => {
    if (!enabled) return;
    const mark = () => {
      lastGestureTsRef.current = Date.now();
    };
    window.addEventListener("pointerdown", mark, { passive: true });
    window.addEventListener("touchstart", mark, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", mark);
      window.removeEventListener("touchstart", mark);
    };
  }, [enabled]);

  const snapshot = useCallback(
    (event: string, extra?: Record<string, unknown>): VideoDebugSnapshot => {
      const video = params.videoRef.current;

      return {
        path: location.pathname,
        locationKey: location.key,
        pageId: params.pageId,
        event,
        ts: Date.now(),
        currentSrc: video?.currentSrc,
        readyState: video?.readyState,
        networkState: video?.networkState,
        paused: video?.paused,
        muted: video?.muted,
        currentTime: video?.currentTime,
        errorCode: video?.error?.code,
        errorMessage: video?.error?.message,
        boundingRect: captureBoundingRect(video),
        ancestorStyles: captureAncestorStyles(video),
        extra: { ...(params.extra ?? {}), ...(extra ?? {}) },
        timing: timing.getTiming() ?? undefined,
      };
    },
    [location.pathname, location.key, params.pageId, params.extra, params.videoRef, timing]
  );

  const log = useCallback(
    (event: string, extra?: Record<string, unknown>) => {
      if (!enabled) return;
      const s = snapshot(event, extra);
      // eslint-disable-next-line no-console
      console.log("[VideoDebug]", s);
      setItems((prev) => [s, ...prev].slice(0, 30));
    },
    [enabled, snapshot]
  );

  /**
   * Log canPlayType results once per session (call on video mount)
   */
  const logCanPlayTypes = useCallback(() => {
    if (!enabled || canPlayTypeCapturedRef.current) return;
    const video = params.videoRef.current;
    if (!video) return;
    canPlayTypeCapturedRef.current = true;

    const results = {
      mp4_avc: video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'),
      webm_vp9: video.canPlayType('video/webm; codecs="vp9, opus"'),
      webm_vp8: video.canPlayType('video/webm; codecs="vp8, vorbis"'),
    };
    log("canPlayType", results);
  }, [enabled, log, params.videoRef]);

  const clear = useCallback(() => {
    setItems([]);
    timing.resetTiming();
  }, [timing]);

  return {
    enabled,
    items,
    clear,
    log,
    snapshot,
    isInGestureContext,
    logCanPlayTypes,
    timing,
  };
}
