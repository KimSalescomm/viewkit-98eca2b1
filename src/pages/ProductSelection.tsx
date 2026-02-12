import { Link } from "react-router-dom";
import { products, iconMap } from "@/data/products";
import SafeImage from "@/components/SafeImage";

const ProductSelection = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f9fafb, #dbeafe, #fae8ff)",
        padding: "32px 24px"
      }}
    >
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px", marginTop: "120px" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 900,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#1f2937",
              marginBottom: "16px"
            }}
          >
            VIEW KIT
          </h1>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: "#374151",
              marginBottom: "8px"
            }}
          >
            제품을 선택해주세요
          </h2>
          <p style={{ fontSize: "16px", color: "#6b7280" }}>
            제품별 특장점을 확인하실 수 있습니다
          </p>
        </div>

        {/* Product Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px"
          }}
        >
        {products.map((product) => {
            const isEnabled = ["refrigerator", "styler"].includes(product.id);

            const cardStyle: React.CSSProperties = {
              display: "block",
              background: "#ffffff",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              textDecoration: "none",
              cursor: isEnabled ? "pointer" : "not-allowed",
              opacity: isEnabled ? 1 : 0.7
            };

            const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
              if (isEnabled) {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.15)";
              }
            };

            const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
              if (isEnabled) {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
              }
            };

            const cardContent = (
              <>
                {/* Product Image */}
                <div
                  style={{
                    height: "192px",
                    overflow: "hidden",
                    background: "#f9fafb"
                  }}
                >
                  <SafeImage
                    src={product.keyVisualImage}
                    alt={product.name}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                      transition: "transform 0.3s ease",
                      filter: isEnabled ? "none" : "grayscale(100%)"
                    }}
                    onMouseEnter={(e) => {
                      if (isEnabled) {
                        e.currentTarget.style.transform = "scale(1.1)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isEnabled) {
                        e.currentTarget.style.transform = "scale(1)";
                      }
                    }}
                  />
                </div>

                {/* Product Info */}
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: isEnabled
                          ? "linear-gradient(135deg, #2563eb, #9333ea)"
                          : "linear-gradient(135deg, #9ca3af, #6b7280)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <span style={{ fontSize: "24px", filter: isEnabled ? "none" : "grayscale(100%)" }}>
                        {iconMap[product.icon]}
                      </span>
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: isEnabled ? "#111827" : "#9ca3af",
                          margin: 0
                        }}
                      >
                        {product.name}
                      </h3>
                      <p
                        style={{
                          fontSize: "14px",
                          color: isEnabled ? "#6b7280" : "#9ca3af",
                          margin: 0
                        }}
                      >
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );

            if (isEnabled) {
              return (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  style={cardStyle}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div
                key={product.id}
                style={cardStyle}
              >
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductSelection;
