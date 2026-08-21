import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Brain,
  Droplets,
  Wind,
  Boxes,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useFeatureLikeCounts } from "@/hooks/useFeatureLikeCounts";
import { logFeatureReaction } from "@/utils/featureReactionLog";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";
import type { Feature } from "@/data/features";

/**
 * 청소로봇 상세페이지 전용 특장점 그리드.
 * 사진 배경 대신 브랜드 레드 패밀리 컬러 블록 + 화이트 실루엣 아이콘 조합.
 */

// 카드 노출 순서 (feature id 기준) — 첫 항목은 2칸 차지 가로형 카드
const CARD_ORDER = ["4", "1", "2", "3", "8", "5", "7"];

// 카드별 배경 톤 (브랜드 레드 패밀리 변주) + 상징 아이콘
const CARD_STYLES: Record<
  string,
  { gradient: string; icon: React.ElementType }
> = {
  "4": { gradient: "bg-gradient-to-br from-rose-400 to-red-600", icon: Brain },
  "1": { gradient: "bg-gradient-to-br from-red-400 to-rose-600", icon: Droplets },
  "2": { gradient: "bg-gradient-to-br from-orange-400 to-red-500", icon: Wind },
  "3": { gradient: "bg-gradient-to-br from-red-500 to-red-700", icon: Boxes },
  "8": { gradient: "bg-gradient-to-br from-pink-500 to-rose-600", icon: Sparkles },
  "5": { gradient: "bg-gradient-to-br from-red-700 to-rose-900", icon: ShieldCheck },
  "7": { gradient: "bg-gradient-to-br from-amber-500 to-orange-600", icon: HeartHandshake },
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
      <div className="grid grid-cols-2 gap-3">
        {ordered.map((feature, index) => {
          const isLarge = index === 0;
          const style = CARD_STYLES[feature.id] ?? {
            gradient: "bg-gradient-to-br from-red-400 to-red-600",
            icon: Sparkles,
          };
          const Icon = style.icon;
          return (
            <button
              key={feature.id}
              type="button"
              onClick={() => {
                setActiveId(feature.id);
                trackFeatureClick(productName || productId, feature.title);
              }}
              className={`relative h-36 overflow-hidden rounded-[14px] ${style.gradient} text-left transition-transform duration-100 active:scale-[0.97] ${
                isLarge ? "col-span-2" : ""
              }`}
            >
              {/* 좌측 텍스트 영역 */}
              <div className="relative z-10 flex h-full w-[70%] flex-col justify-center px-4 py-3">
                {feature.tag && (
                  <span className="mb-2 w-fit rounded-full bg-white/25 px-2 py-[3px] text-[12px] font-medium text-white">
                    {feature.tag}
                  </span>
                )}
                <h3
                  className={`font-semibold text-white leading-tight ${
                    isLarge ? "text-[22px]" : "text-[18px]"
                  }`}
                >
                  {feature.title}
                </h3>
              </div>

              {/* 우측 아이콘 실루엣 */}
              <Icon
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-white opacity-90 ${
                  isLarge ? "h-20 w-20" : "h-16 w-16"
                }`}
                strokeWidth={1.5}
              />

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
                className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 text-white"
              >
                <Heart className="h-4 w-4" strokeWidth={2} />
                <span className="text-[13px] font-medium tabular-nums">{likeCount(feature.id)}</span>
              </span>
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
                <DialogTitle className="text-left text-[19px] font-semibold leading-snug">
                  {active.title}
                </DialogTitle>
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
