import { useEffect, useRef } from "react";

const CHECK_INTERVAL_MS = 3 * 60 * 1000; // 3분마다 신규 배포 확인
const RELOAD_GUARD_KEY = "viewkit_last_auto_reload";
const RELOAD_GUARD_MS = 60 * 1000; // 무한 새로고침 방지

function extractBuildId(html: string): string | null {
  // Vite 해시 번들 파일명을 빌드 식별자로 사용
  const matches = html.match(/\/assets\/[A-Za-z0-9_.-]+\.js/g);
  return matches && matches.length > 0 ? matches.join("|") : null;
}

async function fetchBuildId(): Promise<string | null> {
  try {
    const res = await fetch(`/index.html?_=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return null;
    return extractBuildId(await res.text());
  } catch {
    return null;
  }
}

/**
 * 키오스크/스탠바이미처럼 화면을 계속 켜둔 기기에서도
 * 새 배포가 감지되면 자동으로 최신 버전으로 갱신한다.
 */
export function useAppVersionCheck() {
  const currentRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      const latest = await fetchBuildId();
      if (cancelled || !latest) return;

      if (currentRef.current === null) {
        currentRef.current = latest;
        return;
      }

      if (latest !== currentRef.current) {
        const last = Number(sessionStorage.getItem(RELOAD_GUARD_KEY) || 0);
        if (Date.now() - last < RELOAD_GUARD_MS) return;
        sessionStorage.setItem(RELOAD_GUARD_KEY, String(Date.now()));

        try {
          if ("serviceWorker" in navigator) {
            const regs = await navigator.serviceWorker.getRegistrations();
            await Promise.all(regs.map((r) => r.unregister()));
          }
          if ("caches" in window) {
            const keys = await caches.keys();
            await Promise.all(keys.map((k) => caches.delete(k)));
          }
        } catch {
          // 캐시 정리 실패해도 새로고침은 진행
        }

        window.location.reload();
      }
    };

    check();
    const timer = window.setInterval(check, CHECK_INTERVAL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);
}
