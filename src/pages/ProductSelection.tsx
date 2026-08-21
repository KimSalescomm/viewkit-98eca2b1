import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";
import {
  Store,
  Tv,
  Box,
  Shirt,
  Waves,
  Sparkles,
  Wind,
  Monitor,
  UtensilsCrossed,
  Droplets,
  BookOpen,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

import { useAnalyticsContext } from "@/components/AnalyticsProvider";
import OrientationToggle from "@/components/OrientationToggle";
import StoreSetupModal from "@/components/StoreSetupModal";
import MobileAccessQR from "@/components/MobileAccessQR";
import ContentRequestButton from "@/components/ContentRequestButton";
import { PopularContentSlider } from "@/components/PopularContentSlider";
import ProductMockup from "@/components/ProductMockup";
import { getCurrentStore, registerStore, getRegistry } from "@/utils/storeId";

// webOS(StandByMe) 등 컬러 이모지 폰트가 없는 환경에서 아이콘이 검정으로 보이는 이슈 방지
// → 모든 카드 아이콘을 Lucide SVG 컴포넌트로 렌더링
const lucideIconMap: Record<string, LucideIcon> = {
  Tv,
  Box,
  Shirt,
  Waves,
  Sparkles,
  Wind,
  Monitor,
  UtensilsCrossed,
  Droplets,
};

const ProductLucideIcon = ({ name, className }: { name: string; className?: string }) => {
  const Icon = lucideIconMap[name] || Sparkles;
  return <Icon className={className} strokeWidth={2} />;
};

const desiredOrder = ["subscription", "vacuum", "refrigerator", "airconditioner", "washer", "washcombo", "styler", "tv", "cooking", "bathair"];

const ProductSelection = () => {
  const { products, isProductVisible } = useContent();

  const subscriptionCard = {
    id: "subscription",
    name: "구독",
    title: "구독 케어",
    description: "케어 전·후 비교로 한눈에 보는 케어 서비스",
    icon: "Waves",
  } as (typeof products)[number];

  const allProducts = [subscriptionCard, ...products.filter((product) => product.id !== "pc")];

  const visibleProducts = desiredOrder
    .map((id) => allProducts.find((p) => p.id === id))
    .filter((p): p is (typeof allProducts)[number] => {
      if (!p) return false;
      return isProductVisible(p.id);
    });

  const { trackProductClick } = useAnalyticsContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentStore, setCurrentStore] = useState<{ name: string; slug: string } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDismissible, setModalDismissible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlStore = params.get("store_id")?.toUpperCase().trim();
    const saved = getCurrentStore();

    if (urlStore) {
      const registry = getRegistry();
      const matchedName = Object.entries(registry).find(([, s]) => s === urlStore)?.[0];
      const savedNameForSlug = saved && saved.slug === urlStore ? saved.name : undefined;
      const name = matchedName || savedNameForSlug || urlStore;
      const info = registerStore(name, urlStore);
      setCurrentStore(info);
      if (info.slug !== urlStore) {
        params.set("store_id", info.slug);
        navigate({ pathname: location.pathname, search: `?${params.toString()}` }, { replace: true });
      }
      return;
    }

    if (saved) {
      setCurrentStore(saved);
      params.set("store_id", saved.slug);
      navigate({ pathname: location.pathname, search: `?${params.toString()}` }, { replace: true });
      return;
    }

    setModalDismissible(false);
    const today = (() => {
      const d = new Date();
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().slice(0, 10);
    })();
    const rankingSeenToday = localStorage.getItem("viewkit_ranking_seen_date") === today;
    if (rankingSeenToday) {
      setModalOpen(true);
    } else {
      const onClosed = () => {
        setModalOpen(true);
        window.removeEventListener("viewkit:ranking-popup-closed", onClosed);
      };
      window.addEventListener("viewkit:ranking-popup-closed", onClosed);
      const fallback = window.setTimeout(() => {
        window.removeEventListener("viewkit:ranking-popup-closed", onClosed);
        setModalOpen((prev) => prev || true);
      }, 6000);
      return () => {
        window.removeEventListener("viewkit:ranking-popup-closed", onClosed);
        window.clearTimeout(fallback);
      };
    }
  }, [location.pathname, location.search, navigate]);

  const handleStoreSaved = (info: { name: string; slug: string }) => {
    setCurrentStore(info);
    setModalOpen(false);
    const params = new URLSearchParams(location.search);
    params.set("store_id", info.slug);
    navigate({ pathname: location.pathname, search: `?${params.toString()}` }, { replace: true });
  };

  return (
    <main className="min-h-[100dvh] bg-white flex flex-col tracking-[-0.02em]">
      <StoreSetupModal
        open={modalOpen}
        initialName={currentStore?.name}
        onSaved={handleStoreSaved}
        onClose={() => setModalOpen(false)}
        dismissible={modalDismissible}
      />

      {/* Header */}
      <header className="sticky top-0 z-30 shrink-0 px-5 sm:px-10 py-4 sm:py-5 flex items-center justify-between gap-3 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="flex items-center">
          <div className="text-[24px] sm:text-[28px] font-semibold tracking-[-0.03em] text-brand-accent leading-none">VIEW KIT</div>
        </div>

        <nav className="flex items-center gap-2">
          {currentStore && (
            <button
              type="button"
              onClick={() => {
                setModalDismissible(true);
                setModalOpen(true);
              }}
              className="inline-flex h-11 items-center gap-2 rounded-full px-4 sm:px-5 text-[16px] font-medium bg-brand-accent text-white hover:opacity-90 transition-opacity"
              title="지점 변경"
            >
              <Store className="w-5 h-5" />
              <span>{currentStore.slug}</span>
            </button>
          )}
          <ContentRequestButton variant="segment" />
          <OrientationToggle variant="icon" />

          <div className="relative">
            <button
              type="button"
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Dropdown menu: 햄버거 아이콘 기준 우측 정렬, 헤더 고정 위치에 항상 노출 */}
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-gray-100 bg-white shadow-[0_8px_32px_-12px_rgba(0,0,0,0.16)] p-2 z-50">
                <Link
                  to="/homepage/guide"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-[16px] font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-gray-500" />
                  <span>뷰킷 소개</span>
                </Link>
                <MobileAccessQR storeSlug={currentStore?.slug} variant="simple" onClick={() => setMenuOpen(false)} />
              </div>
            )}
          </div>
        </nav>
      </header>


      {/* Hero */}
      <section className="shrink-0 px-5 sm:px-10 pt-6 pb-4 sm:pt-10 sm:pb-6 text-center">
        <h1 className="text-[32px] sm:text-[44px] font-extrabold tracking-[-0.02em] text-gray-900 leading-[1.2]">
          어떤 제품이 궁금하신가요?
        </h1>
        <p className="text-[16px] sm:text-[18px] font-normal leading-[1.5] text-gray-500 mt-2 tracking-[-0.02em]">
          선택하신 제품부터 차근차근 이해하기 쉽게 설명드릴게요.
        </p>
      </section>

      {/* Popular Content: 베스트 3만 노출 */}
      <div className="py-4 sm:py-6">
        <PopularContentSlider days={30} limit={3} />
      </div>

      {/* Product Grid */}
      <section className="px-5 sm:px-10 pt-6 pb-8 sm:pt-8 sm:pb-12">
        <div className="max-w-5xl mx-auto w-full">
          <div className="mb-4">
            <h2 className="text-[20px] sm:text-[24px] font-semibold text-gray-900 tracking-[-0.02em] leading-tight">제품을 선택하세요</h2>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
            {visibleProducts.map((product) => {
              const cardContent = (
                <div
                  className="
                    group relative flex h-[104px] sm:h-[136px] flex-col overflow-hidden rounded-[20px] bg-white p-1.5 sm:p-2
                    ring-1 ring-gray-100 transition-all duration-300
                    shadow-[0_6px_20px_-14px_rgba(0,0,0,0.14)]
                    hover:-translate-y-1 hover:ring-brand-accent/25 hover:shadow-[0_18px_38px_-16px_rgba(0,0,0,0.18)]
                  "
                >
                  {/* 통일된 배경박스 + 미니 목업 (박스 대비 세로 65%) */}
                  <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-[14px] bg-[#F5F4F0]">
                    <div className="pointer-events-none absolute inset-x-[38%] bottom-2 h-1.5 rounded-full bg-black/5 blur-[3px]" />
                    <ProductMockup
                      productId={product.id}
                      className="relative h-[70%] w-auto transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  </div>

                  {/* 텍스트: 제품명 1줄 */}
                  <div className="flex items-center justify-center px-2 pt-2 pb-1">
                    <h3 className="truncate text-[15px] sm:text-[17px] font-semibold leading-tight tracking-[-0.02em] text-gray-900">
                      {product.name}
                    </h3>
                  </div>
                </div>
              );

              return (
                <Link
                  key={product.id}
                  to={product.id === "subscription" ? "/subscription" : `/product/${product.id}`}
                  className="block"
                  onClick={() => trackProductClick(product.name)}
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>

        </div>
      </section>
    </main>
  );

};

export default ProductSelection;
