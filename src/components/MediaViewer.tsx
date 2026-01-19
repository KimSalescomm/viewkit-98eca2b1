import { convertToEmbedUrl } from "@/utils/videoUtils";
import SafeImage from "@/components/SafeImage";
import { ProductComparisonTable } from "@/data/features";

interface MediaViewerProps {
  mediaType: "video" | "image" | "table";
  mediaUrl: string;
  title: string;
  tableData?: ProductComparisonTable[];
}

const MediaViewer = ({ mediaType, mediaUrl, title, tableData }: MediaViewerProps) => {
  if (mediaType === "table" && tableData) {
    const specLabels = tableData[0]?.specs.map(s => s.label) || [];
    
    return (
      <div style={{ width: "100%", overflowX: "auto" }}>
        {/* Product names and images row */}
        <div 
          style={{ 
            display: "grid", 
            gridTemplateColumns: `120px repeat(${tableData.length}, 1fr)`,
            gap: "0",
            marginBottom: "0",
          }}
        >
          <div></div>
          {tableData.map((product, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px 12px",
                background: "#f5f5f5",
              }}
            >
              <h4 style={{ 
                fontSize: "15px", 
                fontWeight: 600, 
                color: "#1f1f1f",
                marginBottom: "16px",
                textAlign: "center",
              }}>
                {product.name}
              </h4>
              <SafeImage
                src={product.imageUrl}
                alt={product.name}
                style={{
                  width: "100%",
                  maxWidth: "160px",
                  height: "180px",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Specs table */}
        {specLabels.map((label, rowIdx) => (
          <div
            key={rowIdx}
            style={{
              display: "grid",
              gridTemplateColumns: `120px repeat(${tableData.length}, 1fr)`,
              borderTop: "1px dotted #ccc",
              borderBottom: rowIdx === specLabels.length - 1 ? "2px solid #333" : "none",
            }}
          >
            <div
              style={{
                padding: "16px 12px",
                background: "#f9f9f9",
                fontWeight: 500,
                fontSize: "13px",
                color: "#1f1f1f",
                display: "flex",
                alignItems: "center",
              }}
            >
              {label}
            </div>
            {tableData.map((product, colIdx) => {
              const spec = product.specs.find(s => s.label === label);
              const values = spec?.values || ["-"];
              
              return (
                <div
                  key={colIdx}
                  style={{
                    padding: "16px 12px",
                    background: "#fff",
                    fontSize: "13px",
                    color: "#333",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    lineHeight: "1.5",
                  }}
                >
                  {values.map((value, vIdx) => (
                    <div key={vIdx} style={{ marginBottom: vIdx < values.length - 1 ? "2px" : 0 }}>
                      {value}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  if (mediaType === "video") {
    const { embedUrl, isYoutube } = convertToEmbedUrl(mediaUrl);

    if (isYoutube) {
      return (
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%",
            borderRadius: "16px",
            overflow: "hidden",
            background: "#000"
          }}
        >
          <iframe
            src={embedUrl}
            title={title}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none"
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%",
          borderRadius: "16px",
          overflow: "hidden",
          background: "#000"
        }}
      >
        <video
          src={mediaUrl}
          controls
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "56.25%",
        borderRadius: "16px",
        overflow: "hidden",
        background: "#f3f4f6"
      }}
    >
      <SafeImage
        src={mediaUrl}
        alt={title}
        loading="lazy"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
    </div>
  );
};

export default MediaViewer;
