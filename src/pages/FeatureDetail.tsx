import { Link, useParams } from "react-router-dom";
import { getFeatureById, featureIconMap } from "@/data/features";
import { getProductById } from "@/data/products";
import MediaViewer from "@/components/MediaViewer";

const FeatureDetail = () => {
  const { productId, id } = useParams<{ productId: string; id: string }>();
  
  const feature = getFeatureById(productId || "", id || "");
  const product = getProductById(productId || "");

  if (!feature || !product) {
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
            특장점을 찾을 수 없습니다
          </h1>
          <Link
            to={`/product/${productId}`}
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: 500
            }}
          >
            ← 특장점 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const emoji = featureIconMap[feature.icon] || "✨";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f9fafb, #dbeafe, #fae8ff)"
      }}
    >
      {/* Sticky Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 24px",
          zIndex: 100
        }}
      >
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <Link
            to={`/product/${productId}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#4b5563",
              textDecoration: "none",
              fontSize: "14px",
              transition: "color 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#111827";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#4b5563";
            }}
          >
            <span>←</span>
            <span>{product.name} 특장점으로 돌아가기</span>
          </Link>
          <div style={{ textAlign: "center", marginTop: "8px" }}>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 900,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#1f2937"
              }}
            >
              VIEW KIT
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "32px 24px", maxWidth: "1080px", margin: "0 auto" }}>
        {/* Feature Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "32px"
          }}
        >
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "24px",
              background: "linear-gradient(135deg, #2563eb, #9333ea)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <span style={{ fontSize: "48px" }}>{emoji}</span>
          </div>
          <div>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "8px"
              }}
            >
              {feature.title}
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "#6b7280",
                whiteSpace: "pre-line",
                lineHeight: "1.5"
              }}
            >
              {feature.subtitle}
            </p>
          </div>
        </div>

        {/* Media */}
        <div style={{ marginBottom: "32px" }}>
          <MediaViewer
            mediaType={feature.mediaType}
            mediaUrl={feature.mediaUrl}
            title={feature.title}
            tableData={feature.tableData}
          />
        </div>

        {/* Description Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "16px"
            }}
          >
            상세 설명
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#4b5563",
              lineHeight: "1.8"
            }}
          >
            {feature.description}
          </p>
        </div>

        {/* Highlights Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "48px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "16px"
            }}
          >
            핵심 기능
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "12px"
            }}
          >
            {feature.highlights.map((highlight, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "16px",
                  background: "#eff6ff",
                  borderRadius: "12px"
                }}
              >
                <span
                  style={{
                    fontSize: "20px",
                    color: "#2563eb",
                    fontWeight: "bold"
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    color: "#1f2937",
                    fontWeight: 500
                  }}
                >
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div style={{ textAlign: "center" }}>
          <Link
            to={`/product/${productId}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(to right, #2563eb, #9333ea)",
              color: "#ffffff",
              padding: "16px 32px",
              borderRadius: "12px",
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: 600,
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
            <span>←</span>
            <span>전체 특장점으로 돌아가기</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureDetail;
