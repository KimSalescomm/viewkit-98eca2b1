import { Link } from "react-router-dom";
import { products, iconMap } from "@/data/products";
import SafeImage from "@/components/SafeImage";
import { HelpCircle } from "lucide-react";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";
import OrientationToggle from "@/components/OrientationToggle";

const productAccents: Record<string, { gradient: string; tint: string; chip: string; keywords: string[] }> = {
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
  const enabledIds = ["refrigerator", "styler", "washer", "airconditioner"];
  const visibleProducts = products.filter((product) => product.id !== "pc");
  const { trackProductClick } = useAnalyticsContext();

  return (
    <div className="min-h-screen bg-[hsl(220,20%,97%)] px-5 py-10 sm:px-8 sm:py-14">
      <div className="max-w-xl mx-auto sm:max-w-3xl relative">

        {/* Top-right controls */}
        <div className="absolute -top-4 sm:-top-6 right-0 flex items-center gap-2">
          <OrientationToggle />
          <Link
            to="/product/tv/manual"
            className="text-sky-400 hover:text-sky-500 transition-colors"
            title="운영 매뉴얼"
          >
            <HelpCircle className="w-7 h-7 sm:w-8 sm:h-8" />
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mt-12 sm:mt-20 mb-12 sm:mb-16">
          <p
            className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "rgba(0,0,0,0.45)" }}
          >
            VIEW KIT
          </p>
          <h1 className="text-[28px] sm:text-[32px] font-bold text-gray-900 leading-tight mb-3">
            어떤 제품부터 보시겠어요?
          </h1>
          <p
            className="text-[15px] sm:text-[17px] font-normal leading-relaxed"
            style={{ color: "rgba(0,0,0,0.55)" }}
          >
            선택하신 제품부터 차근차근 이해하기 쉽게 설명드릴게요.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          {visibleProducts.map((product, index) => {
            const isEnabled = enabledIds.includes(product.id);

            const accent = productAccents[product.id] || {
              gradient: "from-gray-300 to-gray-400",
              tint: "from-gray-50 via-white to-white",
              chip: "bg-gray-50 text-gray-500 border-gray-200",
              keywords: [],
            };

            const cardContent = (
              <div
                className={`
                  group relative rounded-3xl overflow-hidden transition-all duration-300
                  flex flex-row sm:flex-col h-full
                  ${isEnabled
                    ? "bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                    : "bg-white/70 shadow-sm hover:shadow-md"
                  }
                `}
              >
                {/* Accent bar — left on mobile, top on desktop */}
                <div
                  className={`absolute z-10 bg-gradient-to-b sm:bg-gradient-to-r ${accent.gradient}
                    left-0 top-0 bottom-0 w-2
                    sm:bottom-auto sm:right-0 sm:w-full sm:h-2
                    ${isEnabled ? "" : "opacity-30"}`}
                />
                {/* Thumbnail */}
                <div className="relative overflow-hidden flex-shrink-0 w-32 sm:w-full h-auto sm:h-48">
                  {isEnabled ? (
                    <>
                      <SafeImage
                        src={product.keyVisualImage}
                        alt={product.name}
                        loading={index < 2 ? "eager" : "lazy"}
                        fetchPriority={index < 2 ? "high" : undefined}
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/10 to-transparent pointer-events-none" />
                      {/* Mobile: small icon chip on thumbnail */}
                      <div className="sm:hidden absolute top-2 left-3.5">
                        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${accent.gradient} flex items-center justify-center text-sm shadow-md ring-2 ring-white/80`}>
                          <span>{iconMap[product.icon]}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-3xl border border-border bg-card shadow-sm">
                        <span className="text-3xl sm:text-4xl grayscale opacity-60">{iconMap[product.icon]}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className={`relative p-4 sm:p-5 flex-1 flex items-center sm:block overflow-hidden ${isEnabled ? `bg-gradient-to-br ${accent.tint}` : ""}`}>
                  {/* Decorative tinted blob (mobile) */}
                  {isEnabled && (
                    <div className={`sm:hidden pointer-events-none absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-gradient-to-br ${accent.gradient} opacity-10 blur-xl`} />
                  )}
                  <div className="relative flex items-start gap-3 sm:gap-3.5 w-full">
                    <div
                      className={`
                        hidden sm:flex w-10 h-10 sm:w-13 sm:h-13 rounded-2xl items-center justify-center flex-shrink-0 text-xl sm:text-2xl
                        ${isEnabled
                          ? `bg-gradient-to-br ${accent.gradient} shadow-md`
                          : "bg-gray-300 group-hover:bg-gray-400"
                        }
                      `}
                    >
                      <span className={`${isEnabled ? "" : "grayscale transition-all duration-300 group-hover:grayscale-[50%]"}`}>
                        {iconMap[product.icon]}
                      </span>
                    </div>
                    <div className="min-w-0 pt-0.5 flex-1">
                      <h3
                        className={`text-base sm:text-lg leading-tight transition-colors duration-300
                          ${isEnabled
                            ? "font-extrabold text-gray-900"
                            : "font-bold text-gray-400 group-hover:text-gray-600"
                          }
                        `}
                      >
                        {product.name}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm mt-1 leading-snug transition-colors duration-300
                          ${isEnabled
                            ? "text-gray-600 font-medium"
                            : "text-gray-300 group-hover:text-gray-400"
                          }
                        `}
                      >
                        {product.description}
                      </p>
                    </div>
                    {isEnabled && (
                      <span className="sm:hidden text-gray-300 text-xl flex-shrink-0 self-center">›</span>
                    )}
                  </div>
                </div>
              </div>
            );

            if (isEnabled) {
              return (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="block transition-transform duration-300 hover:scale-[1.02]"
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
    </div>
  );
};

export default ProductSelection;
