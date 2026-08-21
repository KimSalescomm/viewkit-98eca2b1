import { Link } from "react-router-dom";
import FeatureIcon from "@/components/FeatureIcon";
import FeatureLikeButton from "@/components/FeatureLikeButton";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";

// 기존(기본) 색상 팔레트
const cardColors = [
  { gradient: "from-blue-500 to-cyan-400" },
  { gradient: "from-purple-500 to-pink-400" },
  { gradient: "from-emerald-500 to-teal-400" },
  { gradient: "from-orange-500 to-amber-400" },
  { gradient: "from-rose-500 to-red-400" },
  { gradient: "from-indigo-500 to-violet-400" },
  { gradient: "from-sky-500 to-blue-400" },
  { gradient: "from-fuchsia-500 to-purple-400" },
];

// 레드/코랄 통일 팔레트 (청소로봇 샘플 디자인 전용)
const redCardColors = [
  { gradient: "from-brand to-brand-accent" },
  { gradient: "from-brand-accent to-brand" },
  { gradient: "from-brand to-brand/70" },
  { gradient: "from-brand-accent to-brand-accent/70" },
  { gradient: "from-brand/90 to-brand-accent/80" },
  { gradient: "from-brand-accent/90 to-brand/80" },
  { gradient: "from-brand to-brand-accent/60" },
  { gradient: "from-brand-accent to-brand/60" },
];

interface FeatureCardProps {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  productId: string;
  productName?: string;
  tag?: string;
  colorIndex?: number;
  gradient?: string;
  variant?: "white" | "gray";
  bannerImage?: string;
  showLikeHint?: boolean;
  compact?: boolean;
  /** 144px 고정 높이 + 축약 타이포 (샘플 디자인) */
  dense?: boolean;
  /** 아이콘/태그를 레드 계열로 통일 (샘플 디자인) */
  redTheme?: boolean;
}

const FeatureCard = ({
  id,
  title,
  subtitle,
  icon,
  productId,
  productName,
  tag,
  colorIndex = 0,
  gradient,
  variant = "white",
  bannerImage,
  showLikeHint = false,
  compact = false,
  dense = false,
  redTheme = false,
}: FeatureCardProps) => {
  const palette = redTheme ? redCardColors : cardColors;
  const color = gradient ? { gradient } : palette[colorIndex % palette.length];
  const bgClass = variant === "gray" ? "bg-gray-50 border-gray-200" : "bg-white border-gray-100";
  const tagClass = redTheme ? "bg-brand-soft text-brand" : "bg-brand-soft text-brand";
  const { trackFeatureClick } = useAnalyticsContext();

  const likeButton = (variantMode: "mobile" | "desktop", extraClass?: string) => (
    <FeatureLikeButton
      productId={productId}
      productName={productName}
      featureId={id}
      featureTitle={title}
      variant={variantMode}
      showHint={showLikeHint}
      className={extraClass}
    />
  );

  if (compact) {
    return (
      <Link
        to={`/product/${productId}/feature/${id}`}
        onClick={() => trackFeatureClick(productName || productId, title)}
        className="group relative flex items-center gap-3 rounded-[18px] bg-white border border-surface-border/60 shadow-sm
          px-3 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:border-brand/25 active:scale-[0.99]"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted text-gray-600 transition-colors duration-300 group-hover:bg-brand-soft group-hover:text-brand">
          <FeatureIcon iconKey={icon} className="w-6 h-6" />
        </div>
        <div className="min-w-0 flex-1">
          {tag && (
            <span className="mb-0.5 inline-block rounded-md bg-brand-soft px-1.5 py-0.5 text-[11px] font-bold leading-tight text-brand">
              {tag}
            </span>
          )}
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-[-0.02em] text-gray-900 whitespace-pre-line">
            {title}
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {likeButton("mobile")}
          <span className="text-lg text-gray-300">›</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/product/${productId}/feature/${id}`}
      onClick={() => trackFeatureClick(productName || productId, title)}
      className={`relative block ${bgClass} border shadow-md hover:shadow-xl transition-all duration-300
        rounded-2xl
        ${dense ? "sm:h-[144px] sm:p-4 sm:hover:scale-[1.02]" : "sm:p-6 sm:hover:scale-[1.03]"} sm:text-center
        max-sm:px-4 max-sm:py-3.5 max-sm:active:scale-[0.99]`}
    >
      {/* Mobile layout: horizontal list with icon */}
      <div className="sm:hidden flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
          <FeatureIcon iconKey={icon} className="text-white w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0">
          {tag && (
            <span className={`inline-block ${tagClass} text-[10px] font-bold px-1.5 py-0.5 rounded-md mb-1`}>
              {tag}
            </span>
          )}
          <h3 className="text-[15px] font-bold text-gray-900 leading-snug whitespace-pre-line line-clamp-2">
            {title}
          </h3>
          <p className="text-[12px] text-gray-500 leading-snug whitespace-pre-line line-clamp-2 mt-0.5">
            {subtitle}
          </p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {likeButton("mobile")}
          <span className="text-gray-300 text-xl">›</span>
        </div>
      </div>

      {/* Desktop / tablet layout */}
      {dense ? (
        <div className="hidden sm:flex h-full flex-col items-center justify-center">
          <div className="absolute top-3 right-3 z-10">{likeButton("desktop")}</div>
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color.gradient} flex items-center justify-center mb-1.5`}>
            <FeatureIcon iconKey={icon} className="text-white w-6 h-6" />
          </div>
          {tag && (
            <span className={`inline-block ${tagClass} text-[11px] font-bold px-2 py-0.5 rounded-md mb-1`}>
              {tag}
            </span>
          )}
          <h3 className="text-[15px] font-bold text-gray-900 leading-snug whitespace-pre-line line-clamp-2">
            {title}
          </h3>
          <p className="text-[12px] text-gray-500 whitespace-pre-line leading-snug line-clamp-1 mt-0.5">
            {subtitle}
          </p>
        </div>
      ) : (
        <div className="hidden sm:block">
          <div className="absolute top-4 right-4 z-10">{likeButton("desktop")}</div>
          <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${color.gradient} flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
            <FeatureIcon iconKey={icon} className="text-white w-7 h-7 sm:w-9 sm:h-9" />
          </div>
          {tag && (
            <span className="inline-block bg-brand-soft text-brand text-sm font-bold px-2.5 py-1 rounded-lg mb-2 sm:mb-3">
              {tag}
            </span>
          )}
          <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 whitespace-pre-line">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 whitespace-pre-line leading-relaxed">
            {subtitle}
          </p>
        </div>
      )}
    </Link>
  );
};

export default FeatureCard;
