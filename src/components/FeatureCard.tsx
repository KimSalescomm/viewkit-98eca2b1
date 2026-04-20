import { Link } from "react-router-dom";
import FeatureIcon from "@/components/FeatureIcon";
import SafeImage from "@/components/SafeImage";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";

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

interface FeatureCardProps {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  productId: string;
  productName?: string;
  tag?: string;
  colorIndex?: number;
  variant?: "white" | "gray";
  bannerImage?: string;
}

const FeatureCard = ({ id, title, subtitle, icon, productId, productName, tag, colorIndex = 0, variant = "white", bannerImage }: FeatureCardProps) => {
  const color = cardColors[colorIndex % cardColors.length];
  const bgClass = variant === "gray" ? "bg-gray-50 border-gray-200" : "bg-white border-gray-100";
  const { trackFeatureClick } = useAnalyticsContext();

  return (
    <Link
      to={`/product/${productId}/feature/${id}`}
      onClick={() => trackFeatureClick(productName || productId, title)}
      className={`block ${bgClass} border shadow-md hover:shadow-xl transition-all duration-300
        rounded-2xl
        sm:p-6 sm:text-center sm:hover:scale-[1.03]
        max-sm:p-0 max-sm:overflow-hidden max-sm:relative max-sm:h-32 max-sm:active:scale-[0.99]`}
    >
      {/* Mobile: banner background image with text overlay */}
      {bannerImage && (
        <div className="sm:hidden absolute inset-0">
          <SafeImage
            src={bannerImage}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
        </div>
      )}

      {/* Mobile layout: horizontal banner */}
      <div className="sm:hidden relative h-full flex flex-col justify-center px-4 py-3">
        {tag && (
          <span className="inline-block self-start bg-white/95 backdrop-blur text-blue-600 text-[11px] font-bold px-2 py-0.5 rounded-md mb-1.5">
            {tag}
          </span>
        )}
        <h3 className="text-[15px] font-bold text-white leading-snug whitespace-pre-line line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
          {title}
        </h3>
        <p className="text-[12px] text-white/85 leading-snug whitespace-pre-line line-clamp-2 mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
          {subtitle}
        </p>
      </div>

      {/* Desktop / tablet layout: original square card */}
      <div className="hidden sm:block">
        <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${color.gradient} flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
          <FeatureIcon iconKey={icon} className="text-white w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        {tag && (
          <span className="inline-block bg-blue-50 border border-blue-200 text-blue-600 text-sm font-bold px-2.5 py-1 rounded-lg mb-2 sm:mb-3">
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
    </Link>
  );
};

export default FeatureCard;
