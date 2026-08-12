import { Link, useParams, useNavigate } from "react-router-dom";
import FeatureCard from "@/components/FeatureCard";
import SafeImage from "@/components/SafeImage";
import WebOSVideoPlayer from "@/components/WebOSVideoPlayer";
import OrientationToggle from "@/components/OrientationToggle";
import { useContent } from "@/contexts/ContentContext";

const Home = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { getProductById, getFeaturesByProductId } = useContent();

  const product = getProductById(productId || "");
  const features = getFeaturesByProductId(productId || "");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6]">
        <div className="text-center">
          <h1 className="text-xl text-gray-900 mb-4">제품을 찾을 수 없습니다</h1>
          <Link to="/" className="text-brand font-medium">
            ← 제품 선택으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F3F4F6] px-5 py-8 sm:px-8 sm:py-12">
      <div className="max-w-xl mx-auto sm:max-w-4xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-xl border border-white/70 px-4 h-9 text-[13px] font-semibold text-gray-700 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:bg-white transition-colors"
          >
            <span className="text-base leading-none" aria-hidden="true">←</span>
            <span>제품 선택</span>
          </Link>
          <div className="flex items-center gap-2">
            <OrientationToggle />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 space-y-3">
          <p className="text-[11px] sm:text-[12px] font-black tracking-[0.3em] uppercase text-brand">
            VIEW KIT · {product.name}
          </p>
          <h1 className="text-[28px] sm:text-[40px] font-extrabold tracking-tight text-[#111111] leading-tight">
            {product.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-500 font-medium">{product.description}</p>
        </div>

        {/* Key Visual */}
        <div className="mb-10 sm:mb-14 space-y-4 sm:space-y-5">
          {(() => {
            const isVacuum = productId === "vacuum";
            const images = product.secondaryKeyVisualImage
              ? isVacuum
                ? [product.secondaryKeyVisualImage, product.keyVisualImage]
                : [product.keyVisualImage, product.secondaryKeyVisualImage]
              : [product.keyVisualImage];

            return images.map((src, index) => {
              const isFirst = index === 0;
              return (
                <div
                  key={src + index}
                  className="rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
                >
                  <SafeImage
                    src={src}
                    alt={`LG ${product.name} ${isFirst ? "대표 이미지" : "추가 이미지"}`}
                    loading="eager"
                    fetchPriority={isFirst ? "high" : undefined}
                    decoding="async"
                    className={`w-full ${
                      productId === "airconditioner"
                        ? "h-auto object-contain"
                        : productId === "vacuum"
                        ? "h-auto aspect-[138/67] object-cover object-center"
                        : "h-[220px] sm:h-[480px] object-cover"
                    } ${
                      productId === "washer" && isFirst
                        ? "object-[55%_center]"
                        : productId === "airconditioner" || productId === "vacuum"
                        ? ""
                        : "object-center"
                    }`}
                  />
                </div>
              );
            });
          })()}
        </div>

        {/* Features Section Title */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-[11px] font-black tracking-[0.25em] uppercase text-gray-400 mb-2">FEATURES</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111111]">주요 특장점</h3>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {features.map((feature, index) => {
            const isFitMax = productId === "refrigerator" && (feature.id === "11" || feature.id === "12");

            // Derive a banner image for the mobile layout
            let bannerImage: string | undefined;
            if (feature.mediaType === "image" || feature.mediaType === "table") {
              bannerImage = feature.mediaUrl;
            } else if (feature.mediaType === "gallery" && feature.galleryImages?.length) {
              const first = feature.galleryImages[0];
              bannerImage = typeof first === "string" ? first : first.url;
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
                showLikeHint={index === 0}
              />
            );
          })}
        </div>

        {/* Other Products Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-8 sm:px-10 rounded-full bg-white border border-gray-200 text-gray-800 text-base sm:text-lg font-semibold shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:border-brand hover:text-brand transition-colors"
          >
            <span aria-hidden="true">←</span>
            <span>다른 제품 보기</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
