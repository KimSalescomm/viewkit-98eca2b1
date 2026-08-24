import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Play } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { useFeatureLikeCounts } from "@/hooks/useFeatureLikeCounts";
import { logFeatureReaction } from "@/utils/featureReactionLog";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";
import { productCardConfig } from "@/data/featureCardConfig";
import type { Feature } from "@/data/features";

/**
 * 제품 상세(특장점 목록) 페이지 공통 특장점 그리드.
 * 카드 = 실사 이미지 + 아이브로우 + 헤드카피 (+ 영상 소스가 있을 때만 재생 버튼)
 *
 * 제품별 카드 이미지/아이브로우/순서는 src/data/featureCardConfig.ts 에서 관리하고,
 * 설정이 없으면 특장점 데이터에서 자동으로 유추합니다.
 */

interface ProductFeatureGridProps {
  productId: string;
  productName?: string;
  features: Feature[];
  /** 카드 이미지 폴백용 제품 키비주얼 */
  fallbackImage?: string;
}

/** 유튜브 URL에서 썸네일 추출 */
const youtubeThumb = (url?: string): string | undefined => {
  if (!url) return undefined;
  const match = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : undefined;
};

const deriveImage = (feature: Feature): string | undefined => {
  if ((feature.mediaType === "image" || feature.mediaType === "table") && feature.mediaUrl) {
    return feature.mediaUrl;
  }
  if (feature.galleryImages?.length) {
    const first = feature.galleryImages[0];
    return typeof first === "string" ? first : first.url;
  }
  if (feature.mediaGallery?.length) return feature.mediaGallery[0]?.url;
  const slide = feature.mediaSlides?.find((s) => s.mediaType === "image");
  if (slide) return slide.mediaUrl;
  const tabImage = feature.tabs?.find((t) => t.mediaType === "image" && t.mediaUrl)?.mediaUrl;
  if (tabImage) return tabImage;
  if (feature.belowMediaImage?.url) return feature.belowMediaImage.url;
  // 유튜브 특장점은 영상 썸네일을 사용
  if (feature.mediaType === "youtube") return youtubeThumb(feature.mediaUrl);
  const tabYoutube = feature.tabs?.find((t) => t.mediaType === "youtube" && t.mediaUrl)?.mediaUrl;
  if (tabYoutube) return youtubeThumb(tabYoutube);
  const slideYoutube = feature.mediaSlides?.find((s) => s.mediaType === "youtube")?.mediaUrl;
  if (slideYoutube) return youtubeThumb(slideYoutube);
  return undefined;
};

const hasVideoSource = (feature: Feature): boolean => {
  if (feature.mediaType === "video" || feature.mediaType === "youtube") return true;
  if (feature.mediaSlides?.some((s) => s.mediaType === "video" || s.mediaType === "youtube")) return true;
  if (feature.tabs?.some((t) => t.mediaType === "video" || t.mediaType === "youtube")) return true;
  return false;
};

const ProductFeatureGrid = ({
  productId,
  productName,
  features,
  fallbackImage,
}: ProductFeatureGridProps) => {
  const { counts } = useFeatureLikeCounts(productId);
  const { trackEvent, trackFeatureClick } = useAnalyticsContext();
  const navigate = useNavigate();
  const [localLikes, setLocalLikes] = useState<Record<string, number>>({});

  const config = productCardConfig[productId] ?? {};

  const ordered = useMemo(() => {
    const order = config.order;
    if (!order || order.length === 0) return features;
    const byId = new Map(features.map((f) => [f.id, f]));
    const sorted = order.map((fid) => byId.get(fid)).filter(Boolean) as Feature[];
    const rest = features.filter((f) => !order.includes(f.id));
    return [...sorted, ...rest];
  }, [features, config.order]);

  const likeCount = (id: string) =>
    (counts[id] ?? config.fallbackLikes?.[id] ?? 0) + (localLikes[id] ?? 0);

  const handleLike = useCallback(
    (e: React.MouseEvent, feature: Feature) => {
      e.preventDefault();
      e.stopPropagation();
      setLocalLikes((prev) => ({ ...prev, [feature.id]: (prev[feature.id] ?? 0) + 1 }));
      void logFeatureReaction({
        productId,
        productName,
        featureId: feature.id,
        featureTitle: feature.title,
      });
      trackEvent("feature_like", {
        product_name: productName || productId,
        feature_name: feature.title,
      });
    },
    [productId, productName, trackEvent],
  );

  const handleCardClick = useCallback(
    (feature: Feature) => {
      trackFeatureClick(productName || productId, feature.title);
      navigate(`/product/${productId}/feature/${feature.id}`);
    },
    [navigate, productId, productName, trackFeatureClick],
  );

  return (
    <div className="vk-vacuum-grid grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
      {ordered.map((feature) => {
        const cardConfig = config.cards?.[feature.id];
        const image = cardConfig?.image ?? deriveImage(feature) ?? fallbackImage;
        const eyebrow = cardConfig?.eyebrow ?? feature.tag;

        return (
          <div
            key={feature.id}
            role="button"
            tabIndex={0}
            onClick={() => handleCardClick(feature)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleCardClick(feature);
            }}
            className="group relative flex flex-col overflow-hidden rounded-[12px] bg-white text-left shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-transform duration-100 active:scale-[0.98]"
          >
            {/* 이미지 영역 */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
              {image && cardConfig?.fit === "contain" && (
                <SafeImage
                  src={image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
                />
              )}
              {image && (
                <SafeImage
                  src={image}
                  alt={`${feature.title} 이미지`}
                  className={`absolute inset-0 h-full w-full ${
                    cardConfig?.fit === "contain" ? "object-contain" : "object-cover"
                  } ${cardConfig?.objectPositionClass ?? ""}`}
                />
              )}
              {/* 좋아요 */}
              <span
                role="button"
                tabIndex={0}
                aria-label={`${feature.title} 관심 표시`}
                onClick={(e) => handleLike(e, feature)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleLike(e as unknown as React.MouseEvent, feature);
                }}
                className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 shadow-sm"
              >
                <Heart className="h-3.5 w-3.5 text-gray-400" strokeWidth={2} />
                <span className="text-[11px] font-medium tabular-nums text-gray-600">
                  {likeCount(feature.id)}
                </span>
              </span>
            </div>

            {/* 카피 + 재생 버튼 */}
            <div className="flex flex-1 flex-col px-3 pb-3 pt-3">
              {eyebrow && (
                <span className="mb-1 w-fit text-[12px] font-bold tracking-[-0.01em] text-brand-accent">
                  {eyebrow}
                </span>
              )}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[17px] font-bold leading-snug tracking-[-0.02em] text-gray-900 sm:text-[18px]">
                  {feature.title}
                </h3>
                {hasVideoSource(feature) && (
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-accent shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                    <Play className="h-3.5 w-3.5 fill-white text-white" />
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductFeatureGrid;
