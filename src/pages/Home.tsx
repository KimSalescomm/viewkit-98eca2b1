import { Link, useParams, useNavigate } from "react-router-dom";

import SafeImage from "@/components/SafeImage";
import WebOSVideoPlayer from "@/components/WebOSVideoPlayer";
import OrientationToggle from "@/components/OrientationToggle";
import BackButton from "@/components/BackButton";
import PageContainer from "@/components/PageContainer";
import ProductFeatureGrid from "@/components/ProductFeatureGrid";
import { useContent } from "@/contexts/ContentContext";

/**
 * 제품 상세(특장점 목록) 페이지.
 * 디자인 규칙은 docs/design-guide.md 참고 — 모든 제품군에 동일하게 적용됩니다.
 */
const Home = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { getProductById, getFeaturesByProductId, isProductVisible } = useContent();

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

  const heroImage = product.heroImage || product.keyVisualImage;

  return (
    <main className="min-h-screen tracking-[-0.02em] bg-[#F3F4F6]">
      <PageContainer verticalPadding="py-6 sm:py-8">
        {/* Top Bar */}
        <div className="mb-5 flex items-center justify-between sm:mb-6">
          <BackButton />
          <div className="flex items-center gap-2">
            <OrientationToggle />
          </div>
        </div>

        {/* Hero: 좌측 제품명 + 우측 제품 이미지 */}
        <div className="vk-sample-hero mb-5 flex items-center gap-3 overflow-hidden rounded-[14px] bg-white px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:mb-7 sm:px-7 sm:py-6">
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
              VIEW KIT
            </p>
            <h1 className="text-[30px] font-extrabold tracking-[-0.02em] leading-[1.2] text-gray-900 sm:text-[38px]">
              {product.name}
            </h1>
            <p className="mt-1 text-[13px] font-semibold leading-snug text-gray-700 sm:text-[15px]">
              {product.description}
            </p>
          </div>
          {heroImage && (
            <SafeImage
              src={heroImage}
              alt={`LG ${product.name} 제품 이미지`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={1024}
              height={1024}
              className="h-[130px] w-auto max-w-[55%] shrink-0 object-contain sm:h-[180px]"
            />
          )}
        </div>

        {/* 키비주얼 영상 (있는 경우) */}
        {product.keyVisualVideo && (
          <div className="mb-6 overflow-hidden rounded-[14px] border border-white bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
            <WebOSVideoPlayer mediaUrl={product.keyVisualVideo} />
          </div>
        )}

        {/* Features Section Title */}
        <div className="mt-7 mb-6 flex items-center gap-3 sm:mt-9 sm:mb-8">
          <span className="h-px flex-1 bg-gray-200" />
          <h3 className="text-[17px] font-semibold leading-tight tracking-[-0.02em] text-gray-900 sm:text-[20px]">
            궁금한 내용을 확인해보세요
          </h3>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Features Grid */}
        <div className="mb-10 sm:mb-12">
          <ProductFeatureGrid
            productId={productId || ""}
            productName={product.name}
            features={features}
            fallbackImage={product.keyVisualImage}
          />
        </div>

        {/* Other Products Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-surface-border text-gray-800 font-semibold shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:border-brand hover:text-brand transition-colors h-12 sm:h-14 lg:h-11 px-8 sm:px-10 text-base sm:text-lg lg:text-[15px]"
          >
            <span aria-hidden="true">←</span>
            <span>다른 제품 보기</span>
          </button>
        </div>
      </PageContainer>
    </main>
  );
};

export default Home;
