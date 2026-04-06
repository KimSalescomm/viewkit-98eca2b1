import { icons, LucideProps } from "lucide-react";
import { featureIconNames } from "@/data/features";

interface FeatureIconProps extends Omit<LucideProps, "ref"> {
  iconKey: string;
}

const FeatureIcon = ({ iconKey, ...props }: FeatureIconProps) => {
  const name = featureIconNames[iconKey] || "Sparkles";
  const LucideIcon = icons[name as keyof typeof icons];

  if (!LucideIcon) {
    const Fallback = icons["Sparkles"];
    return <Fallback {...props} />;
  }

  return <LucideIcon {...props} />;
};

export default FeatureIcon;
