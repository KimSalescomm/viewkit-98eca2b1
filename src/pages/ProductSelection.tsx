import { Link } from "react-router-dom";
import { products, iconMap } from "@/data/products";
import SafeImage from "@/components/SafeImage";
import { HelpCircle } from "lucide-react";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";

const productAccents: Record<string, string> = {
  refrigerator: "from-sky-400 to-blue-500",
  washer: "from-emerald-400 to-teal-500",
  styler: "from-violet-400 to-purple-500",
  tv: "from-slate-700 to-slate-900",
  vacuum: "from-amber-400 to-orange-500",
  airconditioner: "from-cyan-400 to-sky-500",
  pc: "from-rose-400 to-pink-500",
  cooking: "from-lime-400 to-green-500",
};

const ProductSelection = () => {
  const enabledIds = ["refrigerator", "styler", "washer"];
  const { trackProductClick } = useAnalyticsContext();

  return (
    <div className="min-h-screen bg-[hsl(220,20%,97%)] px-5 py-10 sm:px-8 sm:py-14">
      <div className="max-w-xl mx-auto sm:max-w-3xl relative">

        {/* Help Icon */}
        <Link
          to="/product/tv/manual"
          className="absolute -top-4 sm:-top-6 right-0 text-sky-400 hover:text-sky-500 transition-colors"
          title="운영 매뉴얼"
        >
          <HelpCircle className="w-7 h-7 sm:w-8 sm:h-8" />
        </Link>

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
          {products.map((product, index) => {
            const isEnabled = enabledIds.includes(product.id);

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
                <div className={`p-4 sm:p-5 flex-1 flex items-center sm:block ${isEnabled ? "bg-[#F3F7FF]" : ""}`}>
                  <div className="flex items-start gap-3 sm:gap-3.5 w-full">
                    <div
                      className={`
                        hidden sm:flex w-10 h-10 sm:w-13 sm:h-13 rounded-2xl items-center justify-center flex-shrink-0 text-xl sm:text-2xl
                        ${isEnabled
                          ? "bg-gradient-to-br from-[#3A57FF] to-[#6B7FFF] shadow-[0_2px_8px_rgba(58,87,255,0.3)]"
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
