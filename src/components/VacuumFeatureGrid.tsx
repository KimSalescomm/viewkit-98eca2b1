import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Play } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SafeImage from "@/components/SafeImage";
import { useFeatureLikeCounts } from "@/hooks/useFeatureLikeCounts";
import { logFeatureReaction } from "@/utils/featureReactionLog";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";
import type { Feature } from "@/data/features";

/**
 * 청소로봇 상세페이지 전용 특장점 그리드.
 * 카드 = 실사 이미지 + 카피 + 재생 버튼 (LG 공홈 톤)
 */

// 카드 노출 순서 (feature id 기준)
const CARD_ORDER = ["1", "2", "8", "4", "3", "5", "7"];

// 상세페이지에서 이미 사용 중인 이미지 중에서 카드별로 선택

const CARD_IMAGES: Record<string, string> = {
  "1": "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/mainpoint_N95THO_pc.jpg",
  "2": "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_interior_livingroom_pc_02.jpg",
  "8": "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/subpointA_N95THO_pc.jpg",
  "4": "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_lifestyle_livingroom_pc_01.jpg",
  "3": "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_lifestyle_kitchen_pc_01.jpg",
  "5": "/__l5e/assets-v1/8fe1dd11-6cb7-465a-a9ea-57e5e0e11c19/vacuum-security-cert-left.png",
  "7": "/__l5e/assets-v1/d226a096-c139-4360-ac26-3392dec78942/vacuum-subscription-service-01.jpg",
};

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
  const [activeId, setActiveId] = useState<string | null>(null);
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

  const active = ordered.find((f) => f.id === activeId) || null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {ordered.map((feature) => {
          const image = CARD_IMAGES[feature.id];
          const sub = feature.subtitle || feature.description;
          return (

            <button
              key={feature.id}
              type="button"
              onClick={() => {
                setActiveId(feature.id);
                trackFeatureClick(productName || productId, feature.title);
              }}
              className="group relative flex flex-col overflow-hidden rounded-[12px] bg-white text-left shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-transform duration-100 active:scale-[0.98]"
            >
              {/* 이미지 영역 */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                {image && (
                  <SafeImage
                    src={image}
                    alt={`${feature.title} 이미지`}
                    className="absolute inset-0 h-full w-full object-cover"
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
                {feature.id === "1" && feature.tag && (
                  <span className="mb-1 w-fit text-[12px] font-bold tracking-[-0.01em] text-brand-accent">
                    {feature.tag}
                  </span>
                )}
                <h3 className="pr-9 text-[17px] font-bold leading-snug tracking-[-0.02em] text-gray-900 sm:text-[18px]">
                  {feature.title}
                </h3>
                {sub && feature.id !== "1" && (
                  <p className="mt-1 line-clamp-2 pr-9 text-[13px] leading-snug text-gray-500">
                    {sub}
                  </p>
                )}
                <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                  <Play className="h-3.5 w-3.5 fill-white text-white" />
                </span>
              </div>

            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center text-[12px] text-gray-400">
        각 기능을 선택하면 자세한 영상과 설명을 확인할 수 있습니다.
      </p>

      {/* 탭 시 확장 상세 설명 */}
      <Dialog open={!!active} onOpenChange={(open) => !open && setActiveId(null)}>
        <DialogContent className="max-w-md">
          {active && (
            <>
              <DialogHeader>
                {active.tag && (
                  <span className="mb-1 inline-block w-fit rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-bold text-gray-600">
                    {active.tag}
                  </span>
                )}
                <DialogTitle className="text-left text-[19px] font-semibold leading-snug">
                  {active.title}
                </DialogTitle>
              </DialogHeader>
              <p className="whitespace-pre-line text-[14px] leading-relaxed text-gray-600">
                {active.description || active.subtitle}
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="inline-flex items-center gap-1 text-[13px] text-gray-500">
                  <Heart className="h-4 w-4 text-gray-400" strokeWidth={2} />
                  <span className="tabular-nums">{likeCount(active.id)}</span>
                </span>
                <Link
                  to={`/product/${productId}/feature/${active.id}`}
                  className="rounded-full bg-gray-700 px-4 py-2 text-[14px] font-semibold text-white"
                >
                  조금 더 자세히 볼까요?
                </Link>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VacuumFeatureGrid;
