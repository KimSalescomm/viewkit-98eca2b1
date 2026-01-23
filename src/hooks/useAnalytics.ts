import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = 'G-HP0RSWYB40';

// GA4 이벤트 전송 헬퍼
const sendGAEvent = (eventName: string, params: Record<string, unknown>) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

// 페이지뷰 전송
const sendPageView = (path: string, title?: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

export const useAnalytics = () => {
  const location = useLocation();
  const pageEntryTime = useRef<number>(Date.now());
  const scrollMilestones = useRef<Set<number>>(new Set());
  const lastPath = useRef<string>('');

  // 체류 시간 전송
  const sendDwellTime = useCallback(() => {
    const dwellTime = Math.round((Date.now() - pageEntryTime.current) / 1000);
    if (dwellTime > 0 && lastPath.current) {
      sendGAEvent('page_dwell_time', {
        page_path: lastPath.current,
        dwell_time_seconds: dwellTime,
        engagement_time_msec: dwellTime * 1000,
      });
    }
  }, []);

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
        });
      }
    });
  }, [location.pathname]);

  // 페이지 변경 시 처리
  useEffect(() => {
    // 이전 페이지 체류 시간 전송
    if (lastPath.current && lastPath.current !== location.pathname) {
      sendDwellTime();
    }

    // 새 페이지 설정
    lastPath.current = location.pathname;
    pageEntryTime.current = Date.now();
    scrollMilestones.current.clear();

    // 페이지뷰 전송
    sendPageView(location.pathname + location.search);

    // 스크롤 이벤트 리스너
    const handleScroll = () => measureScrollDepth();
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 페이지 이탈 시 체류 시간 전송
    const handleBeforeUnload = () => sendDwellTime();
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 초기 스크롤 측정
    measureScrollDepth();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname, location.search, measureScrollDepth, sendDwellTime]);

  // 커스텀 이벤트 전송 함수들 반환
  return {
    trackEvent: (eventName: string, params?: Record<string, unknown>) => {
      sendGAEvent(eventName, params || {});
    },
    trackClick: (elementName: string, additionalParams?: Record<string, unknown>) => {
      sendGAEvent('click', {
        element_name: elementName,
        page_path: location.pathname,
        ...additionalParams,
      });
    },
    trackFeatureView: (featureId: string, featureName: string) => {
      sendGAEvent('view_item', {
        item_id: featureId,
        item_name: featureName,
        page_path: location.pathname,
      });
    },
  };
};

export default useAnalytics;
