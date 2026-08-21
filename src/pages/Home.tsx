import { Link, useParams, useNavigate } from "react-router-dom";

import FeatureCard from "@/components/FeatureCard";
import SafeImage from "@/components/SafeImage";
import WebOSVideoPlayer from "@/components/WebOSVideoPlayer";
import OrientationToggle from "@/components/OrientationToggle";
import BackButton from "@/components/BackButton";
import ProductBentoDetail from "@/components/ProductBentoDetail";
import { useContent } from "@/contexts/ContentContext";

const Home = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { getProductById, getFeaturesByProductId, isProductVisible } = useContent();

  const isCompact = productId === "vacuum"; // 샘플: 청소로봇만 신규 디자인 적용

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
    <main className="min-h-screen tracking-[-0.02em] bg-[#F3F4F6] px-5 py-6 sm:px-8 sm:py-8">
      <div className="max-w-xl mx-auto sm:max-w-4xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <BackButton />
          <div className="flex items-center gap-2">
            <OrientationToggle />
          </div>
        </div>

        {/* Hero: 인테리어컷 배경 + 다크 그라디언트 + 텍스트 오버레이 */}
        <div className="relative overflow-hidden rounded-[14px] h-[22vh] min-h-[150px] max-h-[25vh] mb-5 sm:mb-6 bg-gray-200">
          <SafeImage
            src={product.keyVisualImage}
            alt={`LG ${product.name} 대표 이미지`}
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
          <div className="absolute bottom-0 left-0 p-4 sm:p-5">
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-brand-accent mb-1">
              VIEW KIT · {product.name}
            </p>
            <h1 className="text-[22px] font-medium leading-tight text-white">{product.title}</h1>
            <p className="mt-1 text-[13px] leading-snug text-white/70">{product.description}</p>
          </div>
        </div>

        {/* 키비주얼 영상 (있는 경우) */}
        {product.keyVisualVideo && (
          <div className="mb-6 overflow-hidden rounded-[14px] border border-white bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
            <WebOSVideoPlayer mediaUrl={product.keyVisualVideo} />
          </div>
        )}

        {/* Features Section Title */}
        <div className="text-center mb-4 sm:mb-6">
          <p className="text-[11px] font-black tracking-[0.25em] uppercase text-gray-400 mb-2">FEATURES</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111111]">주요 특장점</h3>
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
                compact={isCompact}
              />
            );
          })}
        </div>


        {/* Other Products Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className={`inline-flex items-center justify-center gap-2 rounded-full bg-white border border-surface-border text-gray-800 font-semibold shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:border-brand hover:text-brand transition-colors ${
              isCompact ? "h-11 px-7 text-[15px]" : "h-12 sm:h-14 px-8 sm:px-10 text-base sm:text-lg"
            }`}
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
