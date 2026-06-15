import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnalyticsProvider from "./components/AnalyticsProvider";
import Footer from "./components/Footer";
import { OrientationProvider } from "./hooks/useOrientation";
import { ContentProvider } from "./contexts/ContentContext";
import ProductSelection from "./pages/ProductSelection";
import Maintenance from "./pages/Maintenance";
import SalesCertBadge from "./components/SalesCertBadge";
import EventRankingAutoPopup from "./components/EventRankingAutoPopup";

const Home = lazy(() => import("./pages/Home"));
const Subscription = lazy(() => import("./pages/Subscription"));
const FeatureDetail = lazy(() => import("./pages/FeatureDetail"));

const NotFound = lazy(() => import("./pages/NotFound"));
const Ranking = lazy(() => import("./pages/Ranking"));
const Admin = lazy(() => import("./pages/Admin"));
const Legal = lazy(() => import("./pages/Legal"));
const StoreCodes = lazy(() => import("./pages/StoreCodes"));
const Guide = lazy(() => import("./pages/Guide"));
const ConsultDemo = lazy(() => import("./pages/ConsultDemo"));

const queryClient = new QueryClient();

const MAINTENANCE_MODE = true;

// 관리자(세션에 인증된 사용자) 또는 ?preview=admin 쿼리가 있으면 점검 모드 우회
const isAdminBypass = () => {
  try {
    if (sessionStorage.getItem("viewkit_admin_auth") === "1") return true;
    const params = new URLSearchParams(window.location.search);
    if (params.get("preview") === "admin") {
      sessionStorage.setItem("viewkit_preview_bypass", "1");
    }
    if (sessionStorage.getItem("viewkit_preview_bypass") === "1") return true;
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
                      <Route path="/consult-demo" element={<ConsultDemo />} />
                      <Route path="*" element={<NotFound />} />
                    </>
                  )}
                </Routes>
              </Suspense>
              <SalesCertBadge />
              <EventRankingAutoPopup />
            </ContentProvider>
          </AnalyticsProvider>
        </OrientationProvider>
      </BrowserRouter>
      <Footer />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
