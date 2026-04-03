import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductSelection from "./pages/ProductSelection";
import Home from "./pages/Home";
import FeatureDetail from "./pages/FeatureDetail";
import NotFound from "./pages/NotFound";
import Manual from "./pages/Manual";
import AnalyticsProvider from "./components/AnalyticsProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsProvider>
          <Routes>
            <Route path="/" element={<ProductSelection />} />
            <Route path="/product/:productId" element={<Home />} />
            <Route path="/product/:productId/feature/:id" element={<FeatureDetail />} />
            <Route path="/product/:productId/manual" element={<Manual />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnalyticsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
