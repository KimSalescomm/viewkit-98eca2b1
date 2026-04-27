import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export type Orientation = "portrait" | "landscape";

const STORAGE_KEY = "viewkit-orientation";

interface OrientationContextValue {
  orientation: Orientation;
  setOrientation: (o: Orientation) => void;
  toggle: () => void;
}

const OrientationContext = createContext<OrientationContextValue | undefined>(undefined);

const readInitial = (): Orientation => {
  if (typeof window === "undefined") return "portrait";
  // URL 파라미터 우선 (?orientation=landscape)
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("orientation");
  if (fromUrl === "landscape" || fromUrl === "portrait") return fromUrl;
  // localStorage
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "landscape" || stored === "portrait") return stored;
  return "portrait";
};

export const OrientationProvider = ({ children }: { children: ReactNode }) => {
  const [orientation, setOrientationState] = useState<Orientation>(readInitial);

  // Sync to <html> attribute so CSS can target it
  useEffect(() => {
    document.documentElement.setAttribute("data-orientation", orientation);
    try {
      window.localStorage.setItem(STORAGE_KEY, orientation);
    } catch {
      /* ignore */
    }
  }, [orientation]);

  const setOrientation = useCallback((o: Orientation) => setOrientationState(o), []);
  const toggle = useCallback(
    () => setOrientationState((prev) => (prev === "portrait" ? "landscape" : "portrait")),
    [],
  );

  return (
    <OrientationContext.Provider value={{ orientation, setOrientation, toggle }}>
      {children}
    </OrientationContext.Provider>
  );
};

export const useOrientation = () => {
  const ctx = useContext(OrientationContext);
  if (!ctx) throw new Error("useOrientation must be used within OrientationProvider");
  return ctx;
};
