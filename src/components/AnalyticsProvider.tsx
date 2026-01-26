import React from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  // 훅을 호출하여 페이지 추적 활성화
  useAnalytics();
  
  return <>{children}</>;
};

export default AnalyticsProvider;
