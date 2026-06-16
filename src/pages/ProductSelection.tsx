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
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";
import OrientationToggle from "@/components/OrientationToggle";
import StoreSetupModal from "@/components/StoreSetupModal";
import MobileAccessQR from "@/components/MobileAccessQR";
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
};

const ProductLucideIcon = ({ name, className }: { name: string; className?: string }) => {
  const Icon = lucideIconMap[name] || Sparkles;
  return <Icon className={className} strokeWidth={2.2} />;
};

const productAccents: Record<string, { gradient: string; tint: string; chip: string; keywords: string[] }> = {
  subscription: {
    gradient: "from-brand to-[#7A0026]",
    tint: "from-[#FFF5F8] via-white to-white",
    chip: "bg-brand-soft text-brand border-[#F5C9D5]",
    keywords: ["케어 서비스", "Before / After"],
  },
  refrigerator: {
    gradient: "from-sky-400 to-blue-500",
    tint: "from-sky-50 via-white to-white",
    chip: "bg-sky-50 text-sky-600 border-sky-100",
    keywords: ["Direct Feed", "fresh sySTEM", "STEM"],
  },
  washer: {
    gradient: "from-emerald-400 to-teal-500",
    tint: "from-emerald-50 via-white to-white",
    chip: "bg-emerald-50 text-emerald-600 border-emerald-100",
    keywords: ["6모션", "세탁+건조", "트루스팀"],
  },
  styler: {
    gradient: "from-violet-400 to-purple-500",
    tint: "from-violet-50 via-white to-white",
    chip: "bg-violet-50 text-violet-600 border-violet-100",
    keywords: ["스타일링", "건조", "제습"],
  },
  tv: {
    gradient: "from-slate-700 to-slate-900",
    tint: "from-slate-50 via-white to-white",
    chip: "bg-slate-100 text-slate-600 border-slate-200",
    keywords: ["올레드", "AI 화질", "초대형"],
  },
  vacuum: {
    gradient: "from-amber-400 to-orange-500",
    tint: "from-amber-50 via-white to-white",
    chip: "bg-amber-50 text-amber-600 border-amber-100",
    keywords: ["무선", "강력 흡입"],
  },
  airconditioner: {
    gradient: "from-cyan-400 to-sky-500",
    tint: "from-cyan-50 via-white to-white",
    chip: "bg-cyan-50 text-cyan-600 border-cyan-100",
    keywords: ["공기 관리", "절전"],
  },
  pc: {
    gradient: "from-rose-400 to-pink-500",
    tint: "from-rose-50 via-white to-white",
    chip: "bg-rose-50 text-rose-600 border-rose-100",
    keywords: ["고성능", "게이밍"],
  },
  cooking: {
    gradient: "from-lime-400 to-green-500",
    tint: "from-lime-50 via-white to-white",
    chip: "bg-lime-50 text-lime-600 border-lime-100",
    keywords: ["편리함", "위생"],
  },
};

const ProductSelection = () => {
  const { products } = useContent();
  const baseEnabledIds = ["subscription", "refrigerator", "airconditioner", "washer"];
  const subscriptionCard = {
    id: "subscription",
    name: "구독",
    title: "구독 케어",
    description: "케어 전·후 비교로 한눈에 보는 케어 서비스",
    keyVisualImage: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/img_stove_03_250804.jpg",
    icon: "Waves",
  } as (typeof products)[number];
  const desiredOrder = ["subscription", "refrigerator", "airconditioner", "washer", "styler", "vacuum", "tv", "cooking"];
  const allProducts = [subscriptionCard, ...products.filter((product) => product.id !== "pc")];
  const visibleProducts = desiredOrder.map((id) => allProducts.find((p) => p.id === id)).filter(Boolean) as (typeof allProducts);
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

    // 1) URL 코드가 최우선 — 어느 기기든 같은 코드면 동일 매장으로 인식
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

    // 2) URL 없음 + 로컬 저장 있음 → 저장값을 URL에 반영
    if (saved) {
      setCurrentStore(saved);
      params.set("store_id", saved.slug);
      navigate({ pathname: location.pathname, search: `?${params.toString()}` }, { replace: true });
      return;
    }

    // 3) 둘 다 없음 → 최초 진입
    // 이벤트 랭킹 팝업(BEST 5)이 오늘 노출 예정이면 먼저 보여주고,
    // 팝업이 닫힌 뒤 지점 설정 모달을 띄운다.
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
      // 안전장치: 팝업이 어떤 이유로든 뜨지 않으면 6초 후 모달 표시
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
    <main className="min-h-screen bg-[#F3F4F6] px-5 py-12 sm:px-8 sm:py-16">
      <StoreSetupModal
        open={modalOpen}
        initialName={currentStore?.name}
        onSaved={handleStoreSaved}
        onClose={() => setModalOpen(false)}
        dismissible={modalDismissible}
      />
      <div className="max-w-xl mx-auto sm:max-w-5xl">

        {/* Top Segmented Controls — centered */}
        <div className="flex justify-center items-center gap-2 mb-12 sm:mb-16">
          <div className="flex items-center bg-white/90 backdrop-blur-xl border border-white/70 rounded-full p-1.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
            {currentStore && (
              <button
                type="button"
                onClick={() => {
                  setModalDismissible(true);
                  setModalOpen(true);
                }}
                className="inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold bg-brand text-white hover:bg-brand-dark transition-colors shadow-sm"
                title="지점 변경"
              >
                <Store className="w-3.5 h-3.5" />
                <span>{currentStore.slug}</span>
              </button>
            )}
            <MobileAccessQR storeSlug={currentStore?.slug} variant="segment" />
            <Link
              to="/guide"
              className="inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              title="뷰킷 소개"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>뷰킷 소개</span>
            </Link>
            <OrientationToggle variant="segment" />
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <p className="text-[11px] sm:text-[12px] font-black tracking-[0.3em] uppercase text-brand">
            VIEW KIT
          </p>
          <h1 className="text-[32px] sm:text-[44px] font-extrabold tracking-tight text-[#111111] leading-tight">
            어떤 제품부터 보시겠어요?
          </h1>
          <p className="text-base sm:text-xl text-gray-500 font-medium">
            선택하신 제품부터 차근차근 이해하기 쉽게 설명드릴게요.
          </p>
        </div>

        {/* Card Grid */}
        <h2 className="sr-only">제품 선택</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
          {visibleProducts.map((product, index) => {
            const isEnabled = baseEnabledIds.includes(product.id) || (product.id === "vacuum" && currentStore?.slug === "SC");

            const accent = productAccents[product.id] || {
              gradient: "from-gray-300 to-gray-400",
              tint: "from-gray-50 via-white to-white",
              chip: "bg-gray-50 text-gray-500 border-gray-200",
              keywords: [],
            };

            const cardContent = (
              <div
                className={`
                  group relative bg-white rounded-[32px] sm:rounded-[40px] overflow-hidden border border-white
                  transition-all duration-500
                  ${isEnabled
                    ? "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)]"
                    : "shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] opacity-70"
                  }
                `}
              >
                {/* Top accent bar */}
                <div className={`h-2.5 w-full bg-gradient-to-r ${accent.gradient} ${isEnabled ? "" : "opacity-40"}`} />

                {/* Image */}
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  {isEnabled ? (
                    <SafeImage
                      src={product.keyVisualImage}
                      alt={`LG ${product.name} 대표 이미지`}
                      loading={index < 2 ? "eager" : "lazy"}
                      fetchPriority={index < 2 ? "high" : undefined}
                      decoding="async"
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                        product.id === "tv" ? "object-[65%_55%]" :
                        product.id === "airconditioner" ? "object-top" :
                        "object-center"
                      }`}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-50">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <ProductLucideIcon name={product.icon} className="w-7 h-7 text-gray-400" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8 flex items-start gap-4 sm:gap-5">
                  <div
                    className={`
                      w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl flex items-center justify-center
                      ${isEnabled
                        ? `bg-gradient-to-br ${accent.gradient} text-white shadow-lg`
                        : "bg-gray-200 text-gray-400"
                      }
                    `}
                  >
                    <ProductLucideIcon name={product.icon} className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <h3 className={`text-xl sm:text-2xl font-extrabold tracking-tight leading-tight ${isEnabled ? "text-gray-900" : "text-gray-400"}`}>
                      {product.name}
                    </h3>
                    <p className={`text-sm sm:text-[15px] leading-relaxed font-medium ${isEnabled ? "text-gray-500" : "text-gray-300"}`}>
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            );

            if (isEnabled) {
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
            }

            return (
              <div key={product.id} className="block cursor-not-allowed">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default ProductSelection;
