import { Smartphone, Monitor } from "lucide-react";
import { useOrientation } from "@/hooks/useOrientation";

interface Props {
  className?: string;
  variant?: "pill" | "segment";
}

const OrientationToggle = ({ className = "", variant = "pill" }: Props) => {
  const { orientation, toggle } = useOrientation();
  const isLandscape = orientation === "landscape";

  const base =
    variant === "segment"
      ? "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
      : "inline-flex h-8 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 text-xs font-medium text-gray-700 hover:border-brand hover:text-brand transition-colors shadow-sm";

  return (
    <button
      type="button"
      onClick={toggle}
      title={isLandscape ? "세로모드로 전환" : "가로모드로 전환"}
      aria-label={isLandscape ? "세로모드로 전환" : "가로모드로 전환"}
      className={`${base} ${className}`}
    >
      {isLandscape ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
      <span>{isLandscape ? "가로모드" : "세로모드"}</span>
    </button>
  );
};

export default OrientationToggle;
