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
      style={{
        display: "block",
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid #f3f4f6",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        textDecoration: "none",
        textAlign: "center"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #2563eb, #9333ea)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px auto"
        }}
      >
        <span style={{ fontSize: "32px" }}>{emoji}</span>
      </div>
      {tag && (
        <span
          style={{
            display: "inline-block",
            backgroundColor: "#EFF6FF",
            color: "#2563EB",
            fontSize: "13px",
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: "12px",
            marginBottom: "12px"
          }}
        >
          {tag}
        </span>
      )}
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#111827",
          marginBottom: "8px"
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: "#6b7280",
          whiteSpace: "pre-line",
          lineHeight: "1.5"
        }}
      >
        {subtitle}
      </p>
    </Link>
  );
};

export default FeatureCard;
