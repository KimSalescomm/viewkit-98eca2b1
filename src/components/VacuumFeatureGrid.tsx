import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useFeatureLikeCounts } from "@/hooks/useFeatureLikeCounts";
import { logFeatureReaction } from "@/utils/featureReactionLog";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";
import type { Feature } from "@/data/features";

/**
 * 청소로봇 상세페이지 전용 특장점 그리드.
 * 카드 배경은 컬러 그라디언트가 아닌 실제 제품/사용 장면 사진 + 다크 오버레이로 구성.
 */

const OVERLAY = "linear-gradient(135deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 100%)";

// 카드 노출 순서 (feature id 기준) — 첫 항목은 2칸 차지 가로형 카드
const CARD_ORDER = ["4", "1", "2", "3", "8", "5", "7"];

// 카드별 배경 사진. 아직 전용 촬영컷이 없는 항목은 주석으로 필요한 이미지를 명시.
const CARD_IMAGES: Record<string, string> = {
  /* image: ai-obstacle-avoid.jpg - 로봇청소기가 장애물을 피해 이동하는 장면 (임시: 리빙 라이프스타일 컷) */
  "4": "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_lifestyle_kitchen_pc_01.jpg",
  /* image: steam-mop-cleaning.jpg - 스팀 물걸레로 바닥 얼룩을 닦는 클로즈업 (임시: 인테리어 컷) */
  "1": "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_interior_kitchen_pc_01.jpg",
  /* image: suction-hair-pickup.jpg - 먼지·머리카락을 흡입하는 장면 (임시: 인테리어 컷) */
  "2": "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_interior_kitchen_pc_02.jpg",
  // 거실/주방 공간에 놓인 스테이션 제품 컷
  "3": "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_lifestyle_kitchen_pc_02.jpg",
  // 스팀 살균·건조 케어 장면
  "8": "https://viewkit.lovable.app/__l5e/assets-v1/d226a096-c139-4360-ac26-3392dec78942/vacuum-subscription-service-01.jpg",
  // 보안 인증 관련 이미지
  "5": "/__l5e/assets-v1/8fe1dd11-6cb7-465a-a9ea-57e5e0e11c19/vacuum-security-cert-left.png",
  // 전문가 방문 관리 장면
  "7": "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/robot-cleaners_roni_01.jpg",
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
      <div className="grid grid-cols-2 gap-2">
        {ordered.map((feature, index) => {
          const isLarge = index === 0;
          const image = CARD_IMAGES[feature.id];
          return (
            <button
              key={feature.id}
              type="button"
              onClick={() => {
                setActiveId(feature.id);
                trackFeatureClick(productName || productId, feature.title);
              }}
              className={`relative h-36 overflow-hidden rounded-[14px] bg-muted text-left transition-transform duration-150 active:scale-[0.98] ${
                isLarge ? "col-span-2" : ""
              }`}
            >
              {image && (
                <SafeImage
                  src={image}
                  alt=""
                  aria-hidden="true"
                  loading={isLarge ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0" style={{ background: OVERLAY }} />

              {/* 카테고리 태그 */}
              {feature.tag && (
                <span className="absolute left-3 top-3 rounded-full bg-white/20 px-2 py-[3px] text-[11px] font-medium text-white backdrop-blur-sm">
                  {feature.tag}
                </span>
              )}

              {/* 좋아요 */}
              <span
                role="button"
                tabIndex={0}
                aria-label={`${feature.title} 관심 표시`}
                onClick={(e) => handleLike(e, feature)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleLike(e as unknown as React.MouseEvent, feature);
                }}
                className="absolute right-3 top-3 inline-flex items-center gap-1 text-white"
              >
                <Heart className="h-4 w-4" strokeWidth={2} />
                <span className="text-[12px] font-medium tabular-nums">{likeCount(feature.id)}</span>
              </span>

              {/* 제목 */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3
                  className={`font-medium text-white ${isLarge ? "text-[20px]" : "text-[16px]"} leading-snug`}
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
                >
                  {feature.title}
                </h3>
                {isLarge && <p className="mt-1 text-[11px] text-white/70">자세히 보기 ›</p>}
              </div>
            </button>
          );
        })}
      </div>

      {/* 탭 시 확장 상세 설명 */}
      <Dialog open={!!active} onOpenChange={(open) => !open && setActiveId(null)}>
        <DialogContent className="max-w-md">
          {active && (
            <>
              <DialogHeader>
                {active.tag && (
                  <span className="mb-1 inline-block w-fit rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-bold text-brand">
                    {active.tag}
                  </span>
                )}
                <DialogTitle className="text-left text-[19px] font-semibold leading-snug">{active.title}</DialogTitle>
              </DialogHeader>
              <p className="whitespace-pre-line text-[14px] leading-relaxed text-gray-600">
                {active.description || active.subtitle}
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="inline-flex items-center gap-1 text-[13px] text-gray-500">
                  <Heart className="h-4 w-4 text-brand" strokeWidth={2} />
                  <span className="tabular-nums">{likeCount(active.id)}</span>
                </span>
                <Link
                  to={`/product/${productId}/feature/${active.id}`}
                  className="rounded-full bg-brand px-4 py-2 text-[14px] font-semibold text-brand-foreground"
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
