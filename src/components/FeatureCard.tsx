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
        max-sm:px-4 max-sm:py-3.5 max-sm:active:scale-[0.99]`}
    >
      {/* Mobile layout: horizontal list with icon */}
      <div className="sm:hidden flex items-center gap-3.5">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
          <FeatureIcon iconKey={icon} className="text-white w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          {tag && (
            <span className="inline-block bg-blue-50 border border-blue-200 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-md mb-1">
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
        <span className="text-gray-300 text-xl flex-shrink-0">›</span>
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
