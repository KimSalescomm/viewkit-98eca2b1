import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_IDS = ['G-HP0RSWYB40', 'G-B3XVTW4JX7'];

// URL에서 store_id 추출 (한번 읽으면 세션 동안 유지)
const getStoreId = (): string => {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('store_id');
  if (fromUrl) {
    sessionStorage.setItem('viewkit_store_id', fromUrl);
    return fromUrl;
  }
  return sessionStorage.getItem('viewkit_store_id') || 'unknown';
};

// GA4 이벤트 전송 헬퍼 (traffic_type 전송하지 않음)
const sendGAEvent = (eventName: string, params: Record<string, unknown>) => {
  if (typeof window.gtag === 'function') {
    // traffic_type 제거 보장
    const { traffic_type, ...cleanParams } = params;
    window.gtag('event', eventName, {
      ...cleanParams,
      store_id: cleanParams.store_id || getStoreId(),
    });
  }
};

// 페이지뷰 전송 (모든 계정에, 중복 방지)
const sendPageView = (path: string, title?: string) => {
  if (typeof window.gtag === 'function') {
    GA_MEASUREMENT_IDS.forEach(id => {
      window.gtag('config', id, {
        page_path: path,
        page_title: title || document.title,
        store_id: getStoreId(),
      });
    });
  }
};

// 라우트에서 step 판별
const getStepFromPath = (pathname: string): string | null => {
  if (pathname === '/') return 'step_1_view';
  if (/^\/product\/[^/]+$/.test(pathname)) return 'step_2_view';
  if (/^\/product\/[^/]+\/feature\/[^/]+$/.test(pathname)) return 'step_3_view';
  return null;
};

export const useAnalytics = () => {
  const location = useLocation();
  const pageEntryTime = useRef<number>(Date.now());
  const scrollMilestones = useRef<Set<number>>(new Set());
  const lastPath = useRef<string>('');
  const storeId = useMemo(() => getStoreId(), []);

  // 체류 시간 전송
  const sendDwellTime = useCallback(() => {
    const dwellTime = Math.round((Date.now() - pageEntryTime.current) / 1000);
    if (dwellTime > 0 && lastPath.current) {
      sendGAEvent('page_dwell_time', {
        page_path: lastPath.current,
        dwell_time_seconds: dwellTime,
        engagement_time_msec: dwellTime * 1000,
        store_id: storeId,
      });
    }
  }, [storeId]);

  // 스크롤 깊이 측정
  const measureScrollDepth = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    const milestones = [25, 50, 75, 90, 100];
    milestones.forEach((milestone) => {
      if (scrollPercent >= milestone && !scrollMilestones.current.has(milestone)) {
        scrollMilestones.current.add(milestone);
        sendGAEvent('scroll_depth', {
          page_path: location.pathname,
          scroll_percentage: milestone,
          store_id: storeId,
        });
      }
    });
  }, [location.pathname, storeId]);

  // 페이지 변경 시 처리
  useEffect(() => {
    const currentPath = location.pathname + location.search;

    // 동일 경로 중복 방지
    if (lastPath.current === currentPath) return;

    // 이전 페이지 체류 시간 전송
    if (lastPath.current) {
      sendDwellTime();
    }

    // 새 페이지 설정
    lastPath.current = currentPath;
    pageEntryTime.current = Date.now();
    scrollMilestones.current.clear();

    // 페이지뷰 전송 (1회만)
    sendPageView(currentPath);

    // step 이벤트 전송
    const step = getStepFromPath(location.pathname);
    if (step) {
      sendGAEvent(step, {
        page_path: location.pathname,
        store_id: storeId,
      });
    }

    // 스크롤 이벤트 리스너
    const handleScroll = () => measureScrollDepth();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 페이지 이탈 시 체류 시간 전송
    const handleBeforeUnload = () => sendDwellTime();
    window.addEventListener('beforeunload', handleBeforeUnload);

    measureScrollDepth();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname, location.search, measureScrollDepth, sendDwellTime, storeId]);

  return {
    storeId,
    trackEvent: (eventName: string, params?: Record<string, unknown>) => {
      sendGAEvent(eventName, { ...params, store_id: storeId });
    },
    trackProductClick: (productName: string) => {
      sendGAEvent('product_click', {
        product_name: productName,
        store_id: storeId,
      });
    },
    trackFeatureClick: (productName: string, featureName: string) => {
      sendGAEvent('feature_click', {
        product_name: productName,
        feature_name: featureName,
        store_id: storeId,
      });
    },
    trackDetailView: (productName: string) => {
      sendGAEvent('detail_view', {
        product_name: productName,
        store_id: storeId,
      });
    },
    trackVideoClick: (productName: string) => {
      sendGAEvent('video_click', {
        product_name: productName,
        store_id: storeId,
      });
    },
  };
};

export default useAnalytics;
