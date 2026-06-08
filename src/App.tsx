import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnalyticsProvider from "./components/AnalyticsProvider";
import { OrientationProvider } from "./hooks/useOrientation";
import { ContentProvider } from "./contexts/ContentContext";
import ProductSelection from "./pages/ProductSelection";
import SalesCertBadge from "./components/SalesCertBadge";

const Home = lazy(() => import("./pages/Home"));
const Subscription = lazy(() => import("./pages/Subscription"));
const FeatureDetail = lazy(() => import("./pages/FeatureDetail"));
const Manual = lazy(() => import("./pages/Manual"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Ranking = lazy(() => import("./pages/Ranking"));
const Admin = lazy(() => import("./pages/Admin"));
const Legal = lazy(() => import("./pages/Legal"));

const queryClient = new QueryClient();

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
                  <Route path="/" element={<ProductSelection />} />
                  <Route path="/subscription" element={<Subscription />} />
                  <Route path="/product/:productId" element={<Home />} />
                  <Route path="/product/:productId/feature/:id" element={<FeatureDetail />} />
                  <Route path="/product/:productId/manual" element={<Manual />} />
                  <Route path="/ranking" element={<Ranking />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/legal" element={<Legal />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <SalesCertBadge />
            </ContentProvider>
          </AnalyticsProvider>
        </OrientationProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
