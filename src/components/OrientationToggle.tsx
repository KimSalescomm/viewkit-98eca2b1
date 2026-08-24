import { Smartphone, Monitor } from "lucide-react";
import { useOrientation } from "@/hooks/useOrientation";

interface Props {
  className?: string;
  variant?: "pill" | "segment" | "icon";
}

const OrientationToggle = ({ className = "", variant = "pill" }: Props) => {
  const { orientation, toggle } = useOrientation();
  const isLandscape = orientation === "landscape";

  const base =
    variant === "segment"
      ? "inline-flex h-11 items-center gap-2 rounded-full px-4 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
      : variant === "icon"
      ? "inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
      : "inline-flex h-11 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-[13px] font-semibold text-gray-700 hover:border-brand hover:text-brand transition-colors shadow-sm";

  return (
    <button
      type="button"
      onClick={toggle}
      title={isLandscape ? "세로모드로 전환" : "가로모드로 전환"}
      aria-label={isLandscape ? "세로모드로 전환" : "가로모드로 전환"}
      className={`${base} ${className}`}
    >
      {isLandscape ? <Monitor className="w-[18px] h-[18px]" /> : <Smartphone className="w-[18px] h-[18px]" />}
      {variant !== "icon" && <span>{isLandscape ? "가로모드" : "세로모드"}</span>}
    </button>
  );
};

export default OrientationToggle;
