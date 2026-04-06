import type { LucideIcon, LucideProps } from "lucide-react";
import {
  Brush,
  Cpu,
  Gamepad2,
  Image,
  Maximize2,
  Monitor,
  Palette,
  Puzzle,
  Ruler,
  Search,
  Shirt,
  Sparkles,
  Sprout,
  Tv,
  UtensilsCrossed,
  Volume2,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import { featureIconNames } from "@/data/features";

const featureIcons: Record<string, LucideIcon> = {
  Monitor,
  Cpu,
  Palette,
  Volume2,
  Tv,
  Gamepad2,
  Maximize2,
  Zap,
  Shirt,
  Wind,
  Sparkles,
  UtensilsCrossed,
  Sprout,
  Search,
  Brush,
  Image,
  Ruler,
  Wrench,
  Puzzle,
};

interface FeatureIconProps extends Omit<LucideProps, "ref"> {
  iconKey: string;
}

const FeatureIcon = ({ iconKey, ...props }: FeatureIconProps) => {
  const name = featureIconNames[iconKey] || "Sparkles";
  const LucideIcon = featureIcons[name] || Sparkles;

  return <LucideIcon {...props} />;
};

export default FeatureIcon;
