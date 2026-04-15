import React, { createContext, useContext } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

type AnalyticsContextType = ReturnType<typeof useAnalytics>;

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export const useAnalyticsContext = () => {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) throw new Error('useAnalyticsContext must be used within AnalyticsProvider');
  return ctx;
};

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const analytics = useAnalytics();
  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsProvider;
