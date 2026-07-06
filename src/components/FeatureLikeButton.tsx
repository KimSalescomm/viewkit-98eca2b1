import { useCallback, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { logFeatureReaction } from "@/utils/featureReactionLog";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";

// 세션 내 "이미 눌러본 특장점" 표시를 위한 로컬 상태 키
// (데이터는 계속 누적되지만, UI에는 채워진 하트를 유지해 재확인 가능)
const LIKED_KEY = "viewkit_liked_features";
// 첫 진입 시 pulse 힌트를 딱 한 번만 노출
const HINT_KEY = "viewkit_like_hint_shown";

const readLikedSet = (): Set<string> => {
  try {
    const raw = sessionStorage.getItem(LIKED_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
};

const writeLikedSet = (set: Set<string>) => {
  try {
    sessionStorage.setItem(LIKED_KEY, JSON.stringify([...set]));
  } catch {
    /* noop */
  }
};

interface FeatureLikeButtonProps {
  productId: string;
  productName?: string;
  featureId: string;
  featureTitle: string;
  variant?: "mobile" | "desktop";
  className?: string;
  showHint?: boolean; // 카드 목록 중 첫 카드에서만 pulse 힌트 노출
}

const FeatureLikeButton = ({
  productId,
  productName,
  featureId,
  featureTitle,
  variant = "desktop",
  className,
  showHint = false,
}: FeatureLikeButtonProps) => {
  const key = `${productId}:${featureId}`;
  const [liked, setLiked] = useState(false);
  const [bump, setBump] = useState(0);
  const [pulse, setPulse] = useState(false);
  const { trackEvent } = useAnalyticsContext();

  useEffect(() => {
    setLiked(readLikedSet().has(key));
  }, [key]);

  useEffect(() => {
    if (!showHint) return;
    try {
      if (localStorage.getItem(HINT_KEY) === "1") return;
      setPulse(true);
      const t = setTimeout(() => {
        setPulse(false);
        try {
          localStorage.setItem(HINT_KEY, "1");
        } catch {
          /* noop */
        }
      }, 1800);
      return () => clearTimeout(t);
    } catch {
      /* noop */
    }
  }, [showHint]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const set = readLikedSet();
      const alreadyLiked = set.has(key);
      if (!alreadyLiked) {
        set.add(key);
        writeLikedSet(set);
        setLiked(true);
        toast("관심 표시가 기록되었어요", {
          description: "매장 콘텐츠 개선에 활용됩니다",
          duration: 1800,
        });
      }
      setBump((n) => n + 1);
      setPulse(false);

      // fire-and-forget: 서버 기록 + GA4
      void logFeatureReaction({ productId, productName, featureId, featureTitle });
      trackEvent("feature_like", {
        product_name: productName || productId,
        feature_name: featureTitle,
      });
    },
    [key, productId, productName, featureId, featureTitle, trackEvent],
  );

  const size = variant === "mobile" ? "w-9 h-9" : "w-10 h-10";
  const icon = variant === "mobile" ? "w-[18px] h-[18px]" : "w-5 h-5";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={liked ? "관심 표시 완료" : "이 특장점에 관심 표시하기"}
      aria-pressed={liked}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full transition-all duration-200",
        "bg-white/85 backdrop-blur-sm border border-black/[0.04] shadow-[0_2px_10px_-2px_rgba(0,0,0,0.08)]",
        "hover:bg-white active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1",
        size,
        pulse && !liked && "animate-pulse ring-2 ring-brand/40",
        className,
      )}
    >
      <Heart
        key={bump}
        className={cn(
          icon,
          "transition-colors duration-200",
          liked ? "text-brand fill-brand animate-scale-in" : "text-gray-400",
        )}
        strokeWidth={2.2}
      />
    </button>
  );
};

export default FeatureLikeButton;
