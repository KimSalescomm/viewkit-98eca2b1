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
  X,
  type LucideIcon,
} from "lucide-react";



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
      keyVisualImage: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/gallery/medium01.jpg",
      secondaryKeyVisualImage: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_lifestyle_livingroom_mo_01.jpg",
    },
    refrigerator: {
      keyVisualImage: "https://static.lge.co.kr/kr/images/refrigerators/md10780840/gallery/medium01.jpg",
    },
    airconditioner: {
      keyVisualImage: "https://static.lge.co.kr/kr/images/air-conditioners/md10738836/gallery/medium01.jpg",
    },
    washer: {
      keyVisualImage: "https://static.lge.co.kr/kr/images/wash-tower/md09155834/gallery/medium01.jpg",
    },
    washcombo: {
      keyVisualImage: "https://static.lge.co.kr/kr/images/wash-combo/md10867827/gallery/medium03.jpg",
    },
    styler: {
      keyVisualImage: "https://static.lge.co.kr/kr/images/lg-styler/md10747827/gallery/medium11.jpg",
    },
    tv: {
      keyVisualImage: "https://static.lge.co.kr/kr/images/tvs/md10770832/gallery/medium01.jpg",
    },
    cooking: {
      keyVisualImage: "https://static.lge.co.kr/kr/images/dishwashers/md10492835/gallery/medium01.jpg",
    },
    bathair: {
      keyVisualImage: "https://static.lge.co.kr/kr/images/bath-air-system/md10753826/gallery/medium01.jpg",
    },
  };

  // 제품별 이미지 여백: 실제 제품 물리적 크기와 무관하게 그리드 내 시각적 볼륨감 통일
  // - 세로형 제품군: 세로 방향 여백 기준 통일
  // - 가로형/저상형 제품군: 가로 방향 여백 기준 통일
  // - 다중 제품 구성(에어컨 등): 별도 그룹 내 비율 통일
  const imagePaddingMap: Record<string, string> = {
    // 세로형 제품군 — 기준 여백 유지
    refrigerator: "p-4 sm:p-5",
    washer: "p-4 sm:p-5",
    styler: "p-4 sm:p-5",
    // 세로형이지만 현재 이미지가 프레임에 과도하게 꽉 참 → 여백 증가
    washcombo: "p-5 sm:p-6",

    // 가로형/저상형 제품군
    tv: "p-4 sm:p-5",
    // 저상형이며 현재 이미지가 프레임에 과도하게 꽉 참 → 여백 증가
    cooking: "p-5 sm:p-6",

    // 다중 제품 구성(실내기+실외기) — 기준 여백 유지
    airconditioner: "p-4 sm:p-5",

    // 콤팩트/라운드 제품 — 현재 이미지가 프레임에 과도하게 꽉 참 → 여백 증가
    vacuum: "p-5 sm:p-6",

    // 기타
    bathair: "p-4 sm:p-5",
    subscription: "p-3 sm:p-4",
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

          <button
            type="button"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Inline dropdown menu (헤더 바로 아래, 딤 없음) */}
      {menuOpen && (
        <div className="shrink-0 border-b border-gray-100 bg-white px-5 sm:px-10 py-2">
          <div className="max-w-5xl mx-auto w-full flex flex-col">
            <Link
              to="/homepage/guide"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-3 rounded-xl px-4 py-3 text-[16px] font-medium text-gray-800 hover:bg-gray-50 transition-colors"
            >
              <BookOpen className="w-5 h-5 text-gray-500" />
              <span>뷰킷 소개</span>
            </Link>
            <MobileAccessQR storeSlug={currentStore?.slug} variant="simple" onClick={() => setMenuOpen(false)} />
          </div>
        </div>
      )}


      {/* Hero */}
      <section className="shrink-0 px-5 sm:px-10 pt-10 pb-8 sm:pt-12 sm:pb-10 text-center">
        <h1 className="text-[36px] font-extrabold tracking-[-0.02em] text-gray-900 leading-[1.25]">
          어떤 제품부터 보시겠어요?
        </h1>
        <p className="text-[16px] sm:text-[18px] font-normal leading-[1.6] text-gray-500 mt-3 tracking-[-0.02em]">
          선택하신 제품부터 차근차근 이해하기 쉽게 설명드릴게요.
        </p>
      </section>

      {/* Popular Content */}
      <div className="py-6 sm:py-8">
        <PopularContentSlider days={30} limit={5} />
      </div>


      {/* Product Grid */}
      <section className="px-5 sm:px-10 pt-10 pb-16 sm:pt-12 sm:pb-20">
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] sm:text-[26px] font-semibold text-gray-900 tracking-[-0.02em] leading-tight">제품별 특장점</h2>
            <span className="text-[16px] text-gray-500 font-normal tracking-[-0.02em]">총 {visibleProducts.length}개 제품</span>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {visibleProducts.map((product, index) => {
              const cardContent = (
                <div
                  className="
                    group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white
                    transition-all duration-300
                    shadow-[0_4px_16px_-10px_rgba(0,0,0,0.08)]
                    hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.12)]
                  "
                >
                  {/* 제품 단독 이미지 영역 (라이트 배경) */}
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                    <SafeImage
                      src={product.keyVisualImage}
                      alt={`LG ${product.name} 제품 이미지`}
                      loading={index < 6 ? "eager" : "lazy"}
                      fetchPriority={index < 6 ? "high" : undefined}
                      decoding="async"
                      className={`h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 ${imagePaddingMap[product.id] || "p-4 sm:p-5"}`}
                    />
                    <div className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/85 text-brand-accent shadow-sm backdrop-blur-sm">
                      <ProductLucideIcon name={product.icon} className="h-4 w-4" />
                    </div>
                  </div>

                  {/* 텍스트: 제품명 1줄 + 특장점 1줄 */}
                  <div className="flex flex-col gap-1 px-3 py-3">
                    <h3 className="truncate text-[18px] font-semibold leading-tight tracking-[-0.02em] text-gray-900">
                      {product.name}
                    </h3>
                    <p className="truncate text-[14px] sm:text-[15px] font-normal leading-tight text-gray-500 tracking-[-0.02em]">
                      {product.description}
                    </p>
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
