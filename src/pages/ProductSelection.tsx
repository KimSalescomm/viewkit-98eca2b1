import { Link } from "react-router-dom";
import { products, iconMap } from "@/data/products";
import SafeImage from "@/components/SafeImage";

const ProductSelection = () => {
  const enabledIds = ["refrigerator", "styler", "tv"];

  return (
    <div className="min-h-screen bg-[hsl(220,20%,97%)] px-5 py-10 sm:px-8 sm:py-14">
      <div className="max-w-xl mx-auto sm:max-w-3xl">

        {/* Header Section */}
        <div className="text-center mt-12 sm:mt-20 mb-12 sm:mb-16">
          {/* Brand Label */}
          <p
            className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "rgba(0,0,0,0.45)" }}
          >
            VIEW KIT
          </p>

          {/* Main CTA Headline */}
          <h1 className="text-[28px] sm:text-[32px] font-bold text-gray-900 leading-tight mb-3">
            어떤 제품부터 보시겠어요?
          </h1>

          {/* Subtext */}
          <p
            className="text-[15px] sm:text-[17px] font-normal leading-relaxed"
            style={{ color: "rgba(0,0,0,0.55)" }}
          >
            선택하신 제품부터 차근차근 이해하기 쉽게 설명드릴게요.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          {products.map((product) => {
            const isEnabled = enabledIds.includes(product.id);

            const cardContent = (
              <div
                className={`
                  group relative rounded-3xl overflow-hidden transition-all duration-300
                  ${isEnabled
                    ? "bg-white border-2 border-[#3A57FF] shadow-[0_4px_24px_rgba(58,87,255,0.12)] hover:shadow-[0_8px_32px_rgba(58,87,255,0.18)]"
                    : "bg-white/70 border border-gray-200/60 hover:bg-white hover:border-gray-300 hover:shadow-md"
                  }
                `}
              >
                {/* Thumbnail */}
                <div className="relative h-32 sm:h-48 overflow-hidden">
                  <SafeImage
                    src={product.keyVisualImage}
                    alt={product.name}
                    loading="lazy"
                    className={`w-full h-full object-cover object-top transition-all duration-500
                      ${isEnabled
                        ? "group-hover:scale-105"
                        : "saturate-[0.6] opacity-80 group-hover:saturate-100 group-hover:opacity-100"
                      }
                    `}
                  />
                  {/* Light overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/10 to-transparent pointer-events-none" />
                </div>

                {/* Card Body */}
                <div className={`p-3.5 sm:p-5 ${isEnabled ? "bg-[#F3F7FF]" : ""}`}>
                  <div className="flex items-start gap-2.5 sm:gap-3.5">
                    {/* Icon Badge */}
                    <div
                      className={`
                        w-10 h-10 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl sm:text-2xl
                        ${isEnabled
                          ? "bg-gradient-to-br from-[#3A57FF] to-[#6B7FFF] shadow-[0_2px_8px_rgba(58,87,255,0.3)]"
                          : "bg-gray-200/80 group-hover:bg-gray-300/80"
                        }
                      `}
                    >
                      <span className={`${isEnabled ? "" : "grayscale-[40%] group-hover:grayscale-0 transition-all duration-300"}`}>
                        {iconMap[product.icon]}
                      </span>
                    </div>

                    {/* Text */}
                    <div className="min-w-0 pt-0.5">
                      <h3
                        className={`text-base sm:text-lg leading-tight transition-colors duration-300
                          ${isEnabled
                            ? "font-extrabold text-gray-900"
                            : "font-bold text-gray-900/70 group-hover:text-gray-900"
                          }
                        `}
                      >
                        {product.name}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm mt-0.5 leading-snug transition-colors duration-300
                          ${isEnabled
                            ? "text-gray-600 font-medium"
                            : "text-gray-400 group-hover:text-gray-500"
                          }
                        `}
                      >
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );

            if (isEnabled) {
              return (
                <Link key={product.id} to={`/product/${product.id}`} className="block transition-transform duration-300 hover:scale-[1.02]">
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
