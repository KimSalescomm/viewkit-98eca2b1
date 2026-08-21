import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

import SafeImage from "@/components/SafeImage";
import FeatureIcon from "@/components/FeatureIcon";
import FeatureLikeButton from "@/components/FeatureLikeButton";
import BackButton from "@/components/BackButton";
import OrientationToggle from "@/components/OrientationToggle";
import { useFeatureLikeCounts } from "@/hooks/useFeatureLikeCounts";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface BentoFeature {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  icon: string;
  tag?: string;
}

interface BentoProduct {
  id: string;
  name: string;
  title: string;
  description?: string;
  keyVisualImage: string;
  secondaryKeyVisualImage?: string;
}

interface ProductBentoDetailProps {
  product: BentoProduct;
  features: BentoFeature[];
}

// 아이콘 톤: 옅은 코랄 배경 + 버건디 아이콘 (단색)
const ICON_BG = "#FAECE7";
const ICON_FG = "#993C1D";
const TILE_SHADOW = "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)";

const ProductBentoDetail = ({ product, features }: ProductBentoDetailProps) => {
  const navigate = useNavigate();
  const { trackFeatureClick } = useAnalyticsContext();
  const { counts } = useFeatureLikeCounts(product.id);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const heroImage = product.secondaryKeyVisualImage || product.keyVisualImage;

  // 구독 성격 항목은 별도 바로 분리
  const { subscriptionFeatures, mainFeatures } = useMemo(() => {
    const isSubscription = (f: BentoFeature) =>
      (f.tag && f.tag.includes("구독")) || f.title.includes("구독");
    return {
      subscriptionFeatures: features.filter(isSubscription),
      mainFeatures: features.filter((f) => !isSubscription(f)),
    };
  }, [features]);

  // 좋아요가 가장 많은 특장점 1개를 히어로 타일로 강조 (없으면 첫 항목)
  const heroFeature = useMemo(() => {
    if (mainFeatures.length === 0) return undefined;
    return [...mainFeatures].sort(
      (a, b) => (counts[b.id] || 0) - (counts[a.id] || 0),
    )[0];
  }, [mainFeatures, counts]);

  const gridFeatures = mainFeatures.filter((f) => f.id !== heroFeature?.id);
  const selected = features.find((f) => f.id === selectedId);

  const iconBox = (icon: string, size: number, boxSize: string) => (
    <div
      className={`flex shrink-0 items-center justify-center rounded-[10px] ${boxSize}`}
      style={{ backgroundColor: ICON_BG, color: ICON_FG }}
    >
      <FeatureIcon iconKey={icon} className="" style={{ width: size, height: size }} />
    </div>
  );

  return (
    <main className="h-[100dvh] overflow-hidden bg-surface-muted px-4 pb-3 pt-3 tracking-[-0.02em] sm:px-6">
      <div className="mx-auto flex h-full max-w-xl flex-col sm:max-w-4xl">
        {/* Top Bar */}
        <div className="mb-2 flex shrink-0 items-center justify-between">
          <BackButton />
          <OrientationToggle />
        </div>

        {/* Hero */}
        <div className="relative mb-3 h-[20vh] max-h-[190px] min-h-[130px] shrink-0 overflow-hidden rounded-[14px]">
          <SafeImage
            src={heroImage}
            alt={`LG ${product.name} 인테리어 이미지`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.75) 100%)",
            }}
          />
          <div className="absolute bottom-0 left-0 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F08A6C]">
              VIEW KIT · {product.name}
            </p>
            <h1 className="mt-0.5 text-[22px] font-medium leading-tight text-white">
              {product.title}
            </h1>
            {product.description && (
              <p className="mt-0.5 text-[11px] leading-snug text-white/70">
                {product.description}
              </p>
            )}
          </div>
        </div>

        {/* Features */}
        <h2 className="mb-2 shrink-0 text-[15px] font-semibold text-gray-900">
          특장점을 선택해보세요
        </h2>

        <div className="flex min-h-0 flex-1 flex-col gap-2">
          {/* 대표 특장점: 2칸 전체 가로 타일 */}
          {heroFeature && (
            <button
              type="button"
              onClick={() => setSelectedId(heroFeature.id)}
              className="flex w-full items-center gap-3 rounded-[12px] bg-white px-3.5 py-3 text-left transition-transform active:scale-[0.995]"
              style={{ boxShadow: TILE_SHADOW }}
            >
              {iconBox(heroFeature.icon, 44, "h-[52px] w-[52px]")}
              <div className="min-w-0 flex-1">
                {heroFeature.tag && (
                  <span
                    className="mb-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{ backgroundColor: ICON_BG, color: ICON_FG }}
                  >
                    {heroFeature.tag}
                  </span>
                )}
                <h3 className="line-clamp-2 whitespace-pre-line text-[15px] font-semibold leading-snug text-gray-900">
                  {heroFeature.title}
                </h3>
              </div>
              <span className="flex shrink-0 items-center gap-1 text-[12px] font-medium text-gray-400">
                <Heart className="h-4 w-4" style={{ color: ICON_FG }} />
                {counts[heroFeature.id] || 0}
              </span>
            </button>
          )}

          {/* 나머지 특장점: 2열 정사각형 타일 */}
          <div className="grid min-h-0 flex-1 grid-cols-2 gap-2">
            {gridFeatures.map((feature) => (
              <button
                key={feature.id}
                type="button"
                onClick={() => setSelectedId(feature.id)}
                className="flex h-full min-h-0 flex-col items-center justify-center gap-3 rounded-[12px] bg-white p-3 text-center transition-transform active:scale-[0.99]"
                style={{ boxShadow: TILE_SHADOW }}
              >
                {iconBox(feature.icon, 36, "h-[44px] w-[44px]")}
                <h3 className="line-clamp-3 whitespace-pre-line text-[14px] font-semibold leading-snug text-gray-900">

                  {feature.title}
                </h3>
              </button>
            ))}
          </div>

          {/* 구독: 하단 얇은 가로 바 */}
          {subscriptionFeatures.map((feature) => (
            <button
              key={feature.id}
              type="button"
              onClick={() => setSelectedId(feature.id)}
              className="flex w-full shrink-0 items-center gap-2.5 rounded-[12px] bg-white px-3 py-2 text-left transition-transform active:scale-[0.995]"
              style={{ boxShadow: TILE_SHADOW }}
            >
              {iconBox(feature.icon, 32, "h-[38px] w-[38px]")}
              <h3 className="min-w-0 flex-1 truncate text-[13px] font-semibold text-gray-900">
                {feature.title}
              </h3>
              <span className="shrink-0 text-[16px] text-gray-300">›</span>
            </button>
          ))}
        </div>

        {/* 다른 제품 보기 */}
        <div className="mt-2 shrink-0 text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-white px-5 text-[13px] font-semibold text-gray-700"
            style={{ boxShadow: TILE_SHADOW }}
          >
            <span aria-hidden="true">←</span>
            <span>다른 제품 보기</span>
          </button>
        </div>
      </div>

      {/* 선택 시 확장 상세 카드 */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelectedId(null)}>
        <DialogContent className="max-w-[92vw] rounded-[16px] sm:max-w-lg">
          {selected && (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                {iconBox(selected.icon, 32, "h-[40px] w-[40px]")}
                <div className="min-w-0 flex-1">
                  {selected.tag && (
                    <span
                      className="mb-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{ backgroundColor: ICON_BG, color: ICON_FG }}
                    >
                      {selected.tag}
                    </span>
                  )}
                  <h3 className="whitespace-pre-line text-[18px] font-semibold leading-snug text-gray-900">
                    {selected.title}
                  </h3>
                </div>
              </div>

              <p className="whitespace-pre-line text-[14px] leading-relaxed text-gray-600">
                {selected.description || selected.subtitle}
              </p>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2 text-[12px] text-gray-500">
                  <FeatureLikeButton
                    productId={product.id}
                    productName={product.name}
                    featureId={selected.id}
                    featureTitle={selected.title}
                    variant="mobile"
                  />
                  <span>좋아요 {counts[selected.id] || 0}</span>
                </div>
                <Link
                  to={`/product/${product.id}/feature/${selected.id}`}
                  onClick={() => trackFeatureClick(product.name, selected.title)}
                  className="inline-flex h-9 items-center rounded-full bg-brand px-4 text-[13px] font-semibold text-white"
                >
                  조금 더 자세히 볼까요?
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default ProductBentoDetail;
