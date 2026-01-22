import { Link, useParams, useNavigate } from "react-router-dom";
import { getProductById, iconMap } from "@/data/products";
import { getFeaturesByProductId } from "@/data/features";
import FeatureCard from "@/components/FeatureCard";
import SafeImage from "@/components/SafeImage";

const Home = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  
  const product = getProductById(productId || "");
  const features = getFeaturesByProductId(productId || "");

  if (!product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right, #f9fafb, #dbeafe, #fae8ff)"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", color: "#111827", marginBottom: "16px" }}>
            제품을 찾을 수 없습니다
          </h1>
          <Link
            to="/"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: 500
            }}
          >
            ← 제품 선택으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f9fafb, #dbeafe, #fae8ff)",
        padding: "24px"
      }}
    >
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        {/* Back Button */}
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#4b5563",
            textDecoration: "none",
            fontSize: "16px",
            marginBottom: "24px",
            transition: "color 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#111827";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#4b5563";
          }}
        >
          <span style={{ fontSize: "20px" }}>←</span>
          <span>제품 선택으로 돌아가기</span>
        </Link>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 900,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#1f2937",
              marginBottom: "24px"
            }}
          >
            VIEW KIT
          </h1>

          {/* Product Badge */}
          <div
            style={{
              display: "inline-block",
              background: "linear-gradient(to right, #2563eb, #9333ea)",
              padding: "12px 32px",
              borderRadius: "50px",
              marginBottom: "24px"
            }}
          >
            <span style={{ fontSize: "36px", fontWeight: "bold", color: "#ffffff" }}>
              {product.name}
            </span>
          </div>

          <h2
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#111827",
              marginBottom: "8px"
            }}
          >
            {product.title}
          </h2>
          <p style={{ fontSize: "18px", color: "#4b5563" }}>
            {product.description}
          </p>
        </div>

        {/* Key Visual */}
        <div
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            marginBottom: "40px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
          }}
        >
          <SafeImage
            src={product.keyVisualImage}
            alt={product.name}
            loading="lazy"
            style={{
              width: "100%",
              height: "500px",
              objectFit: "cover",
              objectPosition: productId === "airconditioner" ? "top" : "center"
            }}
          />
        </div>

        {/* Features Section Title */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#111827"
            }}
          >
            주요 특장점
          </h3>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            marginBottom: "48px"
          }}
        >
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              id={feature.id}
              title={feature.title}
              subtitle={feature.subtitle}
              icon={feature.icon}
              productId={productId || ""}
              tag={feature.tag}
            />
          ))}
        </div>

        {/* Other Products Button */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "linear-gradient(to right, #2563eb, #9333ea)",
              color: "#ffffff",
              padding: "16px 48px",
              borderRadius: "12px",
              border: "none",
              fontSize: "18px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(to right, #1d4ed8, #7e22ce)";
              e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.15)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(to right, #2563eb, #9333ea)";
              e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            다른 제품 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
