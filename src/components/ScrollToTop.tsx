import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * 라우트 변경 시 항상 페이지 최상단으로 스크롤합니다.
 * 브라우저 기본 스크롤 복원(scrollRestoration)과 지연 로딩 이미지로 인한
 * 스크롤 위치 튐을 방지하기 위해 여러 프레임에 걸쳐 재확인합니다.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const toTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    toTop();

    const rafId = requestAnimationFrame(toTop);
    const timers = [0, 60, 200, 400].map((delay) => window.setTimeout(toTop, delay));

    return () => {
      cancelAnimationFrame(rafId);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
