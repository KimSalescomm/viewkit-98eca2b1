import { useCallback, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { logFeatureReaction } from "@/utils/featureReactionLog";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";
import { supabase } from "@/integrations/supabase/client";

// 첫 진입 시 pulse 힌트를 딱 한 번만 노출
const HINT_KEY = "viewkit_like_hint_shown";

interface FeatureLikeButtonProps {
  productId: string;
  productName?: string;
  featureId: string;
  featureTitle: string;
  variant?: "mobile" | "desktop";
  className?: string;
  showHint?: boolean; // 카드 목록 중 첫 카드에서만 pulse 힌트 노출
}

const MIN_FEEDBACK_MS = 400; // 최소 시각적 피드백 지속 시간

const FeatureLikeButton = ({
  productId,
  productName,
  featureId,
  featureTitle,
  variant = "desktop",
  className,
  showHint = false,
}: FeatureLikeButtonProps) => {
  const [pending, setPending] = useState(0); // 아직 서버에 수집되지 않은 클릭 수
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [bump, setBump] = useState(0);
  const [pulse, setPulse] = useState(false);
  const { trackEvent } = useAnalyticsContext();

  const fetchTotalCount = useCallback(async () => {
    try {
      const { count, error } = await supabase
        .from("feature_reactions")
        .select("*", { count: "exact", head: true })
        .eq("product_id", productId)
        .eq("feature_id", featureId);
      if (error) throw error;
      setTotalCount(count ?? 0);
    } catch {
      /* noop - 카운트 조회 실패는 UI 동작에 영향 없음 */
    }
  }, [productId, featureId]);

  useEffect(() => {
    void fetchTotalCount();
  }, [fetchTotalCount]);

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

      const clickTime = Date.now();
      const willRecord = canLogFeatureReaction(productId, featureId);

      setPending((n) => n + 1);
      setBump((n) => n + 1);
      setPulse(false);
      // 실제로 서버에 기록될 클릭만 즉시 카운트에 반영 (되돌아가는 깜빡임 방지)
      if (willRecord) setTotalCount((prev) => (prev === null ? 1 : prev + 1));

      const record = async () => {
        try {
          const recorded = await logFeatureReaction({ productId, productName, featureId, featureTitle });
          if (recorded) {
            // 서버 기준으로 정확히 보정 (낙관적 값보다 작아지지 않도록)
            const { count } = await supabase
              .from("feature_reactions")
              .select("*", { count: "exact", head: true })
              .eq("product_id", productId)
              .eq("feature_id", featureId);
            if (typeof count === "number") {
              setTotalCount((prev) => (prev === null ? count : Math.max(prev, count)));
            }
          }
        } catch {
          /* noop - 분석 실패는 앱 동작에 영향 없음 */
        } finally {
          // 최소 피드백 지속 시간 보장
          const elapsed = Date.now() - clickTime;
          if (elapsed < MIN_FEEDBACK_MS) {
            await new Promise((resolve) => setTimeout(resolve, MIN_FEEDBACK_MS - elapsed));
          }
          setPending((n) => Math.max(0, n - 1));
        }
      };
      void record();

      trackEvent("feature_like", {
        product_name: productName || productId,
        feature_name: featureTitle,
      });
    },
    [productId, productName, featureId, featureTitle, trackEvent],
  );


  const active = pending > 0;
  const size = variant === "mobile" ? "w-9 h-9" : "w-10 h-10";
  const icon = variant === "mobile" ? "w-[18px] h-[18px]" : "w-5 h-5";

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={handleClick}
        aria-label={active ? `관심 표시 ${pending}회 기록 중` : "이 특장점에 관심 표시하기"}
        aria-pressed={active}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full transition-all duration-200",
          "bg-white/85 backdrop-blur-sm border border-black/[0.04] shadow-[0_2px_10px_-2px_rgba(0,0,0,0.08)]",
          "hover:bg-white active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1",
          size,
          active && "ring-2 ring-brand/40 bg-brand-soft/30",
          pulse && !active && "animate-pulse ring-2 ring-brand/40",
        )}
      >
        <Heart
          key={bump}
          className={cn(
            icon,
            "transition-colors duration-200",
            active ? "text-brand fill-brand animate-scale-in" : "text-gray-400",
          )}
          strokeWidth={2.2}
        />
        {active && (
          <span
            key={`badge-${pending}`}
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-brand text-white text-[10px] font-bold leading-[18px] text-center shadow-sm animate-scale-in tabular-nums"
          >
            {pending}
          </span>
        )}
      </button>
      <span className="text-sm font-medium text-gray-600 tabular-nums">
        {totalCount === null ? "—" : totalCount.toLocaleString("ko-KR")}
      </span>
    </div>
  );
};

export default FeatureLikeButton;
