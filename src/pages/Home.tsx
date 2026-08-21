import { Link, useParams, useNavigate } from "react-router-dom";

import FeatureCard from "@/components/FeatureCard";
import SafeImage from "@/components/SafeImage";
import WebOSVideoPlayer from "@/components/WebOSVideoPlayer";
import OrientationToggle from "@/components/OrientationToggle";
import BackButton from "@/components/BackButton";
import VacuumFeatureGrid from "@/components/VacuumFeatureGrid";
import { useContent } from "@/contexts/ContentContext";

const Home = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { getProductById, getFeaturesByProductId, isProductVisible } = useContent();

  // 샘플: 청소로봇 상세페이지만 신규 디자인(히어로 오버레이 + 144px 레드 카드) 적용
  const isSample = productId === "vacuum";

  const product = getProductById(productId || "");
  const features = getFeaturesByProductId(productId || "");

  // 노출 설정에서 제외된 제품은 지점 계정에서 직접 URL 접근도 차단
  if (!product || !isProductVisible(productId || "")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6]">
        <div className="text-center">
          <h1 className="text-xl text-gray-900 mb-4">
            {product ? "현재 열람할 수 없는 제품입니다" : "제품을 찾을 수 없습니다"}
          </h1>
          <Link to="/" className="text-brand font-medium">
            ← 제품 선택으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main
      className={`min-h-screen tracking-[-0.02em] bg-[#F3F4F6] ${
        isSample ? "px-5 py-6 sm:px-8 sm:py-8" : "px-5 py-8 sm:px-8 sm:py-12"
      }`}
    >
      <div className="max-w-xl mx-auto sm:max-w-4xl">
        {/* Top Bar */}
        <div className={`flex items-center justify-between ${isSample ? "mb-4 sm:mb-5" : "mb-6 sm:mb-8"}`}>
          <BackButton />
          <div className="flex items-center gap-2">
            <OrientationToggle />
          </div>
        </div>

        {isSample ? (
          <>
            {/* Hero: 인테리어컷 배경 + 다크 그라디언트 오버레이 */}
            <div className="relative h-[22vh] min-h-[160px] max-h-[260px] mb-5 sm:mb-6 overflow-hidden rounded-[14px]">
              <SafeImage
                src={product.keyVisualImage}
                alt={`LG ${product.name} 인테리어컷`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.75) 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-6 py-4 sm:py-5">
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-brand mb-1">
                  VIEW KIT · {product.name}
                </p>
                <h1 className="text-[22px] sm:text-[26px] font-medium leading-tight text-white">
                  {product.title}
                </h1>
                <p className="mt-1 text-[12px] leading-snug text-white/70">
                  {product.description}
                </p>
              </div>
            </div>

            {/* 키비주얼 영상 (있는 경우) */}
            {product.keyVisualVideo && (
              <div className="mb-6 overflow-hidden rounded-[14px] border border-white bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                <WebOSVideoPlayer mediaUrl={product.keyVisualVideo} />
              </div>
            )}
          </>
        ) : (
          <>
            {/* Header (기존 버전) */}
            <div className="text-center mb-8 sm:mb-10 space-y-3">
              <p className="text-[11px] sm:text-[12px] font-black tracking-[0.3em] uppercase text-brand">
                VIEW KIT · {product.name}
              </p>
              <h1 className="text-[28px] sm:text-[40px] font-extrabold tracking-tight text-[#111111] leading-tight">
                {product.title}
              </h1>
              <p className="text-base sm:text-lg text-gray-500 font-medium">{product.description}</p>
            </div>

            {/* Key Visual (기존 버전) */}
            <div className="mb-10 sm:mb-14 space-y-4 sm:space-y-5">
              {product.keyVisualVideo && (
                <div className="overflow-hidden bg-white rounded-[28px] sm:rounded-[36px] border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                  <WebOSVideoPlayer mediaUrl={product.keyVisualVideo} />
                </div>
              )}
              {(() => {
                const images = product.secondaryKeyVisualImage
                  ? [product.keyVisualImage, product.secondaryKeyVisualImage]
                  : [product.keyVisualImage];

                // 동영상 키비주얼이 있으면 첫 번째 이미지는 이미 영상으로 노출되므로 제외
                const displayImages = product.keyVisualVideo
                  ? images.filter((_, index) => index !== 0)
                  : images;

                const imageZoom = product.imageZoom ?? 1;
                const isZoomed = imageZoom !== 1;

                return displayImages.map((src, index) => {
                  const isFirst = index === 0 && !product.keyVisualVideo;
                  return (
                    <div
                      key={src + index}
                      className="relative overflow-hidden bg-gray-100 aspect-video rounded-[28px] sm:rounded-[36px] border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
                    >
                      {/* 블러 배경: 비율이 달라 생기는 여백을 자연스럽게 채움 */}
                      <SafeImage
                        src={src}
                        alt=""
                        aria-hidden="true"
                        loading="eager"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60"
                      />
                      <SafeImage
                        src={src}
                        alt={`LG ${product.name} ${isFirst ? "대표 이미지" : "추가 이미지"}`}
                        loading="eager"
                        fetchPriority={isFirst ? "high" : undefined}
                        decoding="async"
                        className={`relative w-full h-full object-center ${isZoomed ? "object-cover" : "object-contain"}`}
                        style={isZoomed ? { transform: `scale(${imageZoom})` } : undefined}
                      />
                    </div>
                  );
                });
              })()}
            </div>
          </>
        )}

        {/* Features Section Title */}
        <div className={isSample ? "text-center mb-4 sm:mb-6" : "text-center mb-6 sm:mb-8"}>
          <p className="text-[11px] font-black tracking-[0.25em] uppercase text-gray-400 mb-2">FEATURES</p>
          <h3 className="text-[20px] sm:text-[24px] font-semibold text-gray-900 tracking-[-0.02em] leading-tight">
            {isSample ? "특장점을 선택해보세요" : "주요 특장점"}
          </h3>
        </div>

        {/* Features Grid */}
        {isSample ? (
          <div className="mb-10 sm:mb-12">
            <VacuumFeatureGrid productId={productId || ""} productName={product.name} features={features} />
          </div>
        ) : (
        <div
          className={
            isSample
              ? "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-10 sm:mb-12"
              : "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-12 sm:mb-16"
          }
        >
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
                dense={isSample}
                redTheme={isSample}
              />
            );
          })}
        </div>
        )}

        {/* Other Products Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-surface-border text-gray-800 font-semibold shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:border-brand hover:text-brand transition-colors h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg"
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
