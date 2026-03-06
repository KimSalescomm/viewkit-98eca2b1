import { Link } from "react-router-dom";
import { products, iconMap } from "@/data/products";
import SafeImage from "@/components/SafeImage";

const ProductSelection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 px-4 py-8 sm:px-6 sm:py-8">
      <div className="max-w-xl mx-auto sm:max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 mt-16 sm:mt-28 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl font-black tracking-wider uppercase text-gray-800 mb-3">
            VIEW KIT
          </h1>
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-700 mb-1">
            제품을 선택해주세요
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            제품별 특장점을 확인하실 수 있습니다
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {products.map((product) => {
            const isEnabled = ["refrigerator", "styler", "tv"].includes(product.id);

            const cardClasses = `block bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
              isEnabled ? "cursor-pointer hover:scale-[1.03] hover:shadow-xl" : "cursor-not-allowed opacity-70"
            }`;

            const cardContent = (
              <>
                {/* Product Image */}
                <div className="h-28 sm:h-48 overflow-hidden bg-gray-50">
                  <SafeImage
                    src={product.keyVisualImage}
                    alt={product.name}
                    loading="lazy"
                    className={`w-full h-full object-cover object-top transition-transform duration-300 ${
                      isEnabled ? "hover:scale-110" : "grayscale"
                    }`}
                  />
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-5">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div
                      className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isEnabled
                          ? "bg-gradient-to-br from-blue-600 to-purple-600"
                          : "bg-gradient-to-br from-gray-400 to-gray-500"
                      }`}
                    >
                      <span className={`text-lg sm:text-2xl ${isEnabled ? "" : "grayscale"}`}>
                        {iconMap[product.icon]}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3
                        className={`text-base sm:text-xl font-bold leading-tight ${
                          isEnabled ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {product.name}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm mt-0.5 leading-snug ${
                          isEnabled ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );

            if (isEnabled) {
              return (
                <Link key={product.id} to={`/product/${product.id}`} className={cardClasses}>
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={product.id} className={cardClasses}>
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
