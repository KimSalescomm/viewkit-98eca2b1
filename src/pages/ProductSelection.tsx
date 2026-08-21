import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContent } from "@/contexts/ContentContext";
import SafeImage from "@/components/SafeImage";
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
  type LucideIcon,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";


import { useAnalyticsContext } from "@/components/AnalyticsProvider";
import OrientationToggle from "@/components/OrientationToggle";
import StoreSetupModal from "@/components/StoreSetupModal";
import MobileAccessQR from "@/components/MobileAccessQR";
import ContentRequestButton from "@/components/ContentRequestButton";
import { PopularContentSlider } from "@/components/PopularContentSlider";
import { getCurrentStore, registerStore, getRegistry } from "@/utils/storeId";
import washcomboCardImage from "@/assets/washcombo-card-lifestyle.jpg";

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
    keyVisualImage: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/img_stove_03_250804.jpg",
    icon: "Waves",
  } as (typeof products)[number];

  // 제품 카드(홈) 전용 썸네일 오버라이드 — 다른 페이지의 키비주얼은 유지
  const cardThumbnailOverrides: Record<string, { keyVisualImage?: string; secondaryKeyVisualImage?: string }> = {
    vacuum: {
      keyVisualImage: "https://www.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_lifestyle_kitchen_mo_01.jpg",
      secondaryKeyVisualImage: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_lifestyle_livingroom_mo_01.jpg",
    },
    washcombo: {
      keyVisualImage: washcomboCardImage,
    },
  };

  const allProducts = [subscriptionCard, ...products.filter((product) => product.id !== "pc")].map((p) => {
    const override = cardThumbnailOverrides[p.id];
    return override ? { ...p, ...override } : p;
  });

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
    <main className="min-h-[100dvh] bg-white flex flex-col">
      <StoreSetupModal
        open={modalOpen}
        initialName={currentStore?.name}
        onSaved={handleStoreSaved}
        onClose={() => setModalOpen(false)}
        dismissible={modalDismissible}
      />

      {/* Header */}
      <header className="sticky top-0 z-30 shrink-0 px-5 sm:px-10 py-4 sm:py-5 flex items-center justify-between gap-3 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-accent flex items-center justify-center">
            <span className="text-white text-2xl font-semibold leading-none">V</span>
          </div>
          <div className="leading-none">
            <div className="text-[24px] sm:text-[28px] font-semibold tracking-[-0.03em] text-brand-accent">VIEW KIT</div>
            <div className="text-[12px] sm:text-[13px] font-medium tracking-[0.22em] text-gray-500 mt-1">LG HOME APPLIANCE</div>
          </div>
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

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="메뉴 열기"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[380px]">
              <SheetHeader>
                <SheetTitle className="text-[22px] font-semibold tracking-tight">메뉴</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                <Link
                  to="/homepage/guide"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-3 rounded-2xl px-4 py-4 text-[18px] font-medium text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>뷰킷 소개</span>
                </Link>
                <div className="px-1">
                  <p className="text-[15px] font-medium text-gray-500 mb-2">모바일에서 보기</p>
                  <MobileAccessQR storeSlug={currentStore?.slug} variant="segment" />
                </div>
                <div className="px-1">
                  <p className="text-[15px] font-medium text-gray-500 mb-2">화면 방향</p>
                  <OrientationToggle variant="segment" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      {/* Hero */}
      <section className="shrink-0 px-5 sm:px-10 pt-10 pb-8 sm:pt-12 sm:pb-10 text-center">
        <h1 className="text-[30px] sm:text-[40px] font-semibold tracking-tight text-gray-900 leading-[1.2]">
          어떤 제품부터 보시겠어요?
        </h1>
        <p className="text-[18px] sm:text-[20px] text-gray-600 font-normal mt-3">
          선택하신 제품부터 차근차근 이해하기 쉽게 설명드릴게요.
        </p>
      </section>

      {/* Popular Content */}
      <div className="py-10 sm:py-12">
        <PopularContentSlider days={30} limit={5} />
      </div>

      {/* Product Grid */}
      <section className="px-5 sm:px-10 pt-10 pb-16 sm:pt-12 sm:pb-20">
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] sm:text-[26px] font-semibold text-gray-900 tracking-tight">제품별 특장점</h2>
            <span className="text-[16px] text-gray-600 font-normal">총 {visibleProducts.length}개 제품</span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {visibleProducts.map((product, index) => {
              const cardContent = (
                <div
                  className={`
                    group relative bg-white rounded-3xl overflow-hidden border border-gray-100
                    transition-all duration-500
                    shadow-[0_6px_20px_-10px_rgba(0,0,0,0.08)]
                    hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12)]
                    aspect-[3/4]
                  `}
                >
                  <div className="absolute inset-0 bg-gray-100 overflow-hidden">
                    {product.id === "vacuum" && product.secondaryKeyVisualImage ? (
                      <div className="grid grid-cols-2 h-full w-full">
                        <SafeImage
                          src={product.secondaryKeyVisualImage}
                          alt={`LG ${product.name} 히든스테이션`}
                          loading={index < 4 ? "eager" : "lazy"}
                          fetchPriority={index < 4 ? "high" : undefined}
                          decoding="async"
                          className="w-full h-full object-cover object-[60%_center] transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-y-0 left-1/2 w-px bg-white/40 z-10" />
                        <SafeImage
                          src={product.keyVisualImage}
                          alt={`LG ${product.name} 오브제스테이션`}
                          loading={index < 4 ? "eager" : "lazy"}
                          decoding="async"
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <SafeImage
                        src={product.keyVisualImage}
                        alt={`LG ${product.name} 대표 이미지`}
                        loading={index < 4 ? "eager" : "lazy"}
                        fetchPriority={index < 4 ? "high" : undefined}
                        decoding="async"
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                          product.id === "airconditioner" ? "object-top" : "object-center"
                        }`}
                      />
                    )}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 pt-14 px-4 pb-4 sm:px-5 sm:pb-5 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-white/25 backdrop-blur-sm text-white flex items-center justify-center">
                        <ProductLucideIcon name={product.icon} className="w-6 h-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[22px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
                          {product.name}
                        </h3>
                        <p className="text-[18px] leading-[1.45] font-normal text-white mt-1 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>
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
