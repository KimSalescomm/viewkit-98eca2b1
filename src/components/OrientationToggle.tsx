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
      className={`inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white/80 backdrop-blur px-2.5 py-1.5 text-gray-500 hover:text-sky-500 hover:border-sky-200 hover:bg-white transition-colors shadow-sm ${className}`}
    >
      {isLandscape ? (
        <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />
      ) : (
        <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
      )}
      <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
        {isLandscape ? "Landscape" : "Portrait"}
      </span>
    </button>
  );
};

export default OrientationToggle;
