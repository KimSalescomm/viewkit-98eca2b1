import { Smartphone, Monitor } from "lucide-react";
import { useOrientation } from "@/hooks/useOrientation";

interface Props {
  className?: string;
}

const OrientationToggle = ({ className = "" }: Props) => {
  const { orientation, toggle } = useOrientation();
  const isLandscape = orientation === "landscape";

  return (
    <button
      type="button"
      onClick={toggle}
      title={isLandscape ? "세로 모드로 전환" : "가로 모드로 전환"}
      aria-label={isLandscape ? "세로 모드로 전환" : "가로 모드로 전환"}
      className={`inline-flex h-8 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 hover:border-[#A50034] hover:text-[#A50034] transition-colors shadow-sm ${className}`}
    >
      {isLandscape ? (
        <Monitor className="w-3.5 h-3.5" />
      ) : (
        <Smartphone className="w-3.5 h-3.5" />
      )}
      <span className="tracking-wider uppercase">
        {isLandscape ? "Landscape" : "Portrait"}
      </span>
    </button>
  );
};

export default OrientationToggle;
