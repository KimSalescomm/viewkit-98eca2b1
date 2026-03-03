import { Link } from "react-router-dom";
import { featureIconMap } from "@/data/features";

interface FeatureCardProps {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  productId: string;
  tag?: string;
}

const FeatureCard = ({ id, title, subtitle, icon, productId, tag }: FeatureCardProps) => {
  const emoji = featureIconMap[icon] || "✨";

  return (
    <Link
      to={`/product/${productId}/feature/${id}`}
      className="block bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-md hover:scale-[1.03] hover:shadow-xl transition-all duration-300 text-center"
    >
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-3 sm:mb-4">
        <span className="text-2xl sm:text-3xl">{emoji}</span>
      </div>
      {tag && (
        <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-lg mb-2 sm:mb-3">
          {tag}
        </span>
      )}
      <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 whitespace-pre-line leading-relaxed">
        {subtitle}
      </p>
    </Link>
  );
};

export default FeatureCard;
