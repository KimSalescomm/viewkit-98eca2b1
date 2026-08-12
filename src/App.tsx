import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnalyticsProvider from "./components/AnalyticsProvider";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { OrientationProvider } from "./hooks/useOrientation";
import { ContentProvider } from "./contexts/ContentContext";
import ProductSelection from "./pages/ProductSelection";
import Maintenance from "./pages/Maintenance";
import SalesCertBadge from "./components/SalesCertBadge";
import EventRankingAutoPopup from "./components/EventRankingAutoPopup";
import ScreensaverOverlay from "./components/ScreensaverOverlay";
import { useAppVersionCheck } from "./hooks/useAppVersionCheck";

// 새 버전 배포 후 예전 청크 해시를 요청하면 실패하므로, 1회 자동 새로고침으로 복구
const lazyWithRetry = <T extends { default: React.ComponentType<Record<string, unknown>> }>(
  importer: () => Promise<T>,
) =>

  lazy(async () => {
    const RELOAD_KEY = "chunk-reload-attempt";
    try {
      const mod = await importer();
      sessionStorage.removeItem(RELOAD_KEY);
      return mod;
    } catch (error) {
      if (!sessionStorage.getItem(RELOAD_KEY)) {
        sessionStorage.setItem(RELOAD_KEY, "1");
        window.location.reload();
        return new Promise<T>(() => {});
      }
      throw error;
    }
  });

const Home = lazyWithRetry(() => import("./pages/Home"));
const Subscription = lazyWithRetry(() => import("./pages/Subscription"));
const FeatureDetail = lazyWithRetry(() => import("./pages/FeatureDetail"));

const NotFound = lazyWithRetry(() => import("./pages/NotFound"));
const Ranking = lazyWithRetry(() => import("./pages/Ranking"));
const Admin = lazyWithRetry(() => import("./pages/Admin"));
const Legal = lazyWithRetry(() => import("./pages/Legal"));
const StoreCodes = lazyWithRetry(() => import("./pages/StoreCodes"));
const Guide = lazyWithRetry(() => import("./pages/Guide"));

const queryClient = new QueryClient();

const MAINTENANCE_MODE = false;

// 관리자(세션에 인증된 사용자)만 점검 모드 우회
const isAdminBypass = () => {
  try {
    if (sessionStorage.getItem("viewkit_admin_auth") === "1") return true;
    const params = new URLSearchParams(window.location.search);
    if (params.get("preview") === "admin") {
      sessionStorage.setItem("viewkit_admin_preview", "1");
      return true;
    }
    if (sessionStorage.getItem("viewkit_admin_preview") === "1") return true;
  } catch {
    /* noop */
  }
  return false;
};

const showMaintenance = MAINTENANCE_MODE && !isAdminBypass();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-3 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
      <span className="text-sm text-gray-400">로딩 중...</span>
    </div>
  </div>
);

// 키오스크 등 장시간 켜둔 기기에서 새 배포 자동 반영
const VersionWatcher = () => {
  useAppVersionCheck();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <VersionWatcher />
      <BrowserRouter>
        <ScrollToTop />
        <OrientationProvider>
          <AnalyticsProvider>
            <ContentProvider>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* 관리자는 점검 모드에서도 항상 접근 가능 */}
                  <Route path="/admin" element={<Admin />} />
                  {showMaintenance ? (
                    <Route path="*" element={<Maintenance />} />
                  ) : (
                    <>
                      <Route path="/" element={<ProductSelection />} />
                      <Route path="/subscription" element={<Subscription />} />
                      <Route path="/product/:productId" element={<Home />} />
                      <Route path="/product/:productId/feature/:id" element={<FeatureDetail />} />
                      <Route path="/ranking" element={<Ranking />} />
                      <Route path="/legal" element={<Legal />} />
                      <Route path="/store-codes" element={<StoreCodes />} />
                      <Route path="/guide" element={<Guide />} />
                      <Route path="*" element={<NotFound />} />
                    </>
                  )}
                </Routes>
              </Suspense>
              {!showMaintenance && (
                <>
                  <SalesCertBadge />
                  <EventRankingAutoPopup />
                  <ScreensaverOverlay />
                </>
              )}
            </ContentProvider>
          </AnalyticsProvider>
        </OrientationProvider>
      </BrowserRouter>
      <Footer />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
