import { Link } from "react-router-dom";
import FeatureIcon from "@/components/FeatureIcon";

const cardColors = [
  { gradient: "from-blue-500 to-cyan-400", tagBg: "bg-blue-100 text-blue-800" },
  { gradient: "from-purple-500 to-pink-400", tagBg: "bg-purple-100 text-purple-800" },
  { gradient: "from-emerald-500 to-teal-400", tagBg: "bg-emerald-100 text-emerald-800" },
  { gradient: "from-orange-500 to-amber-400", tagBg: "bg-orange-100 text-orange-800" },
  { gradient: "from-rose-500 to-red-400", tagBg: "bg-rose-100 text-rose-800" },
  { gradient: "from-indigo-500 to-violet-400", tagBg: "bg-indigo-100 text-indigo-800" },
  { gradient: "from-sky-500 to-blue-400", tagBg: "bg-sky-100 text-sky-800" },
  { gradient: "from-fuchsia-500 to-purple-400", tagBg: "bg-fuchsia-100 text-fuchsia-800" },
];

interface FeatureCardProps {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  productId: string;
  tag?: string;
  colorIndex?: number;
}

const FeatureCard = ({ id, title, subtitle, icon, productId, tag, colorIndex = 0 }: FeatureCardProps) => {
  const color = cardColors[colorIndex % cardColors.length];

  return (
    <Link
      to={`/product/${productId}/feature/${id}`}
      className="block bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-md hover:scale-[1.03] hover:shadow-xl transition-all duration-300 text-center"
    >
      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${color.gradient} flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
        <FeatureIcon iconKey={icon} className="text-white w-6 h-6 sm:w-8 sm:h-8" />
      </div>
      {tag && (
        <span className={`inline-block ${color.tagBg} text-sm font-bold px-2.5 py-1 rounded-lg mb-2 sm:mb-3`}>
          {tag}
        </span>
      )}
      <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 whitespace-pre-line">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 whitespace-pre-line leading-relaxed">
        {subtitle}
      </p>
    </Link>
  );
};

export default FeatureCard;
