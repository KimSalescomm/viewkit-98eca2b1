import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Play } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { useFeatureLikeCounts } from "@/hooks/useFeatureLikeCounts";
import { logFeatureReaction } from "@/utils/featureReactionLog";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";
import type { Feature } from "@/data/features";

/**
 * 청소로봇 상세페이지 전용 특장점 그리드.
 * 카드 = 실사 이미지 + 카피 + 재생 버튼 (LG 공홈 톤)
 */

// 청소로봇 상세페이지 카드 설정
// 인덱스 0 = 1번 카드, 인덱스 1 = 2번 카드 ... 순서대로 노출됩니다.
const CARDS: { featureId: string; image: string; eyebrow: string }[] = [
  { featureId: "1", image: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/mainpoint_N95THO_pc.jpg", eyebrow: "스팀 물걸레" },          // 1번
  { featureId: "2", image: "https://www.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_11_anti_tangle_03.jpg", eyebrow: "강력한 흡입력" }, // 2번
  { featureId: "8", image: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/subpointA_N95THO_pc.jpg", eyebrow: "물걸레 관리 솔루션" },      // 3번
  { featureId: "4", image: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/gallery/medium-interior01.jpg", eyebrow: "AI 맞춤 청소" }, // 4번
  { featureId: "3", image: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_lifestyle_kitchen_pc_01.jpg", eyebrow: "오브제/히든스테이션" }, // 5번
  { featureId: "5", image: "/__l5e/assets-v1/8fe1dd11-6cb7-465a-a9ea-57e5e0e11c19/vacuum-security-cert-left.png", eyebrow: "" },                              // 6번
  { featureId: "7", image: "/__l5e/assets-v1/d226a096-c139-4360-ac26-3392dec78942/vacuum-subscription-service-01.jpg", eyebrow: "" },                            // 7번
];

const CARD_ORDER = CARDS.map((c) => c.featureId);
const CARD_IMAGES: Record<string, string> = Object.fromEntries(CARDS.map((c) => [c.featureId, c.image]));
const CARD_EYEBROWS: Record<string, string> = Object.fromEntries(CARDS.map((c) => [c.featureId, c.eyebrow]));

// 실제 수집 데이터가 없을 때 사용할 기본 좋아요 수
const FALLBACK_LIKES: Record<string, number> = {
  "4": 48,
  "1": 36,
  "2": 30,
  "3": 34,
  "8": 34,
  "5": 30,
  "7": 30,
};

interface VacuumFeatureGridProps {
  productId: string;
  productName?: string;
  features: Feature[];
}

const VacuumFeatureGrid = ({ productId, productName, features }: VacuumFeatureGridProps) => {
  const { counts } = useFeatureLikeCounts(productId);
  const { trackEvent, trackFeatureClick } = useAnalyticsContext();
  const navigate = useNavigate();
  const [localLikes, setLocalLikes] = useState<Record<string, number>>({});

  const ordered = useMemo(() => {
    const byId = new Map(features.map((f) => [f.id, f]));
    const sorted = CARD_ORDER.map((id) => byId.get(id)).filter(Boolean) as Feature[];
    const rest = features.filter((f) => !CARD_ORDER.includes(f.id));
    return [...sorted, ...rest];
  }, [features]);

  const likeCount = (id: string) =>
    (counts[id] ?? FALLBACK_LIKES[id] ?? 0) + (localLikes[id] ?? 0);

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
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {ordered.map((feature) => {
          const image = CARD_IMAGES[feature.id];
          
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
                {image && (
                  <SafeImage
                    src={image}
                    alt={`${feature.title} 이미지`}
                    className={`absolute inset-0 h-full w-full object-cover ${
                      feature.id === "5" ? "object-[center_20%]" : ""
                    }`}
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
              <div className="relative flex flex-1 flex-col px-3 pb-10 pt-3">
                {(CARD_EYEBROWS[feature.id] || feature.tag) && (
                  <span className="mb-1 w-fit text-[12px] font-bold tracking-[-0.01em] text-brand-accent">
                    {CARD_EYEBROWS[feature.id] || feature.tag}
                  </span>
                )}
                <h3 className="pr-9 text-[17px] font-bold leading-snug tracking-[-0.02em] text-gray-900 sm:text-[18px]">
                  {feature.title}
                </h3>
                <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                  <Play className="h-3.5 w-3.5 fill-white text-white" />
                </span>
              </div>

            </div>
          );
        })}
      </div>
    </>
  );
};

export default VacuumFeatureGrid;
