import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

type VideoStyleSnapshot = {
  display: string;
  visibility: string;
  opacity: string;
  overflow: string;
  transform: string;
};

export type VideoDebugSnapshot = {
  path: string;
  pageId?: string;
  event: string;
  ts: number;
  currentSrc?: string;
  readyState?: number;
  networkState?: number;
  paused?: boolean;
  muted?: boolean;
  currentTime?: number;
  styles?: {
    video?: VideoStyleSnapshot | null;
    parent?: VideoStyleSnapshot | null;
    grandParent?: VideoStyleSnapshot | null;
  };
  extra?: Record<string, unknown>;
};

const pickStyle = (el: Element | null | undefined): VideoStyleSnapshot | null => {
  if (!el || typeof window === "undefined") return null;
  const cs = window.getComputedStyle(el);
  return {
    display: cs.display,
    visibility: cs.visibility,
    opacity: cs.opacity,
    overflow: cs.overflow,
    transform: cs.transform,
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

export function useVideoDebug(params: {
  videoRef: React.RefObject<HTMLVideoElement>;
  pageId?: string;
  extra?: Record<string, unknown>;
}) {
  const location = useLocation();
  const lastGestureTsRef = useRef<number>(0);
  const [items, setItems] = useState<VideoDebugSnapshot[]>([]);

  const enabled = useMemo(() => {
    return isEnabledFromSearch(location.search) || isEnabledFromStorage();
  }, [location.search]);

  const isInGestureContext = useMemo(() => {
    return () => Date.now() - lastGestureTsRef.current <= 600;
  }, []);

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

  const snapshot = (event: string, extra?: Record<string, unknown>): VideoDebugSnapshot => {
    const video = params.videoRef.current;
    const parent = video?.parentElement ?? null;
    const grandParent = parent?.parentElement ?? null;

    return {
      path: location.pathname,
      pageId: params.pageId,
      event,
      ts: Date.now(),
      currentSrc: video?.currentSrc,
      readyState: video?.readyState,
      networkState: video?.networkState,
      paused: video?.paused,
      muted: video?.muted,
      currentTime: video?.currentTime,
      styles: {
        video: pickStyle(video),
        parent: pickStyle(parent),
        grandParent: pickStyle(grandParent),
      },
      extra: { ...(params.extra ?? {}), ...(extra ?? {}) },
    };
  };

  const log = (event: string, extra?: Record<string, unknown>) => {
    if (!enabled) return;
    const s = snapshot(event, extra);
    // eslint-disable-next-line no-console
    console.log("[VideoDebug]", s);
    setItems((prev) => [s, ...prev].slice(0, 30));
  };

  const clear = () => setItems([]);

  return {
    enabled,
    items,
    clear,
    log,
    snapshot,
    isInGestureContext,
  };
}
