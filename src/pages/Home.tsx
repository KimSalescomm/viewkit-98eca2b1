import { Link, useParams, useNavigate } from "react-router-dom";
import { getProductById, iconMap } from "@/data/products";
import { getFeaturesByProductId } from "@/data/features";
import FeatureCard from "@/components/FeatureCard";
import SafeImage from "@/components/SafeImage";
import { HelpCircle } from "lucide-react";

const Home = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  
  const product = getProductById(productId || "");
  const features = getFeaturesByProductId(productId || "");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <h1 className="text-xl text-gray-900 mb-4">제품을 찾을 수 없습니다</h1>
          <Link to="/" className="text-blue-600 font-medium">
            ← 제품 선택으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 px-4 py-6 sm:px-6 sm:py-6">
      <div className="max-w-xl mx-auto sm:max-w-4xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm sm:text-base transition-colors"
          >
            <span className="text-lg">←</span>
            <span>제품 선택으로 돌아가기</span>
          </Link>
          <Link
            to={`/product/${productId}/manual`}
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-purple-600 transition-colors"
            title="운영 매뉴얼"
          >
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm font-medium tracking-widest uppercase text-gray-400 mb-3 sm:mb-4">
            VIEW KIT
          </p>
          <div className="inline-block bg-purple-50 border border-purple-200 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full mb-4 sm:mb-5">
            <span className="text-sm sm:text-base font-semibold text-purple-600">{product.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            {product.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-600">{product.description}</p>
        </div>

        {/* Key Visual */}
        <div className="rounded-2xl overflow-hidden mb-8 sm:mb-10 shadow-2xl">
          <SafeImage
            src={product.keyVisualImage}
            alt={product.name}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className={`w-full h-[134px] sm:h-[350px] object-cover ${
              productId === "tv" ? "scale-[1.15] object-[65%_55%] -translate-y-[20px]" :
              productId === "airconditioner" ? "object-top" :
              productId === "washer" ? "object-[55%_center]" : "object-center"
            }`}
          />
        </div>

        {/* Features Section Title */}
        <div className="text-center mb-5 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">주요 특장점</h3>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-10 sm:mb-12">
          {features.map((feature, index) => {
            const isFitMax = productId === "refrigerator" && (feature.id === "11" || feature.id === "12");

            // Derive a banner image for the mobile layout
            let bannerImage: string | undefined;
            if (feature.mediaType === "image" || feature.mediaType === "table") {
              bannerImage = feature.mediaUrl;
            } else if (feature.mediaType === "gallery" && feature.galleryImages?.length) {
              const first = feature.galleryImages[0];
              bannerImage = typeof first === "string" ? first : first.src;
            }
            if (!bannerImage) bannerImage = product.keyVisualImage;

            return (
              <FeatureCard
                key={feature.id}
                id={feature.id}
                title={feature.title}
                subtitle={feature.subtitle}
                icon={feature.icon}
                productId={productId || ""}
                productName={product.name}
                tag={feature.tag}
                colorIndex={index}
                variant={isFitMax ? "gray" : "white"}
                bannerImage={bannerImage}
              />
            );
          })}
        </div>

        {/* Other Products Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 sm:px-12 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            다른 제품 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
