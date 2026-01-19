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
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
          {/* Header row with product names */}
          <thead>
            <tr>
              <th style={{ width: "120px" }}></th>
              {tableData.map((product, idx) => (
                <th
                  key={idx}
                  style={{
                    padding: "16px 12px",
                    background: "#e5e5e5",
                    fontWeight: 600,
                    fontSize: "15px",
                    color: "#1f1f1f",
                    textAlign: "center",
                    borderBottom: "none",
                  }}
                >
                  {product.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Product images row */}
            <tr>
              <td style={{ background: "#fff" }}></td>
              {tableData.map((product, idx) => (
                <td
                  key={idx}
                  style={{
                    padding: "24px 16px",
                    background: "#fff",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  <SafeImage
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      width: "100%",
                      maxWidth: "180px",
                      height: "180px",
                      objectFit: "contain",
                      margin: "0 auto",
                    }}
                  />
                </td>
              ))}
            </tr>
            {/* Spec rows */}
            {specLabels.map((label, rowIdx) => (
              <tr key={rowIdx}>
                <th
                  style={{
                    padding: "16px 12px",
                    background: "#f5f5f5",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#1f1f1f",
                    textAlign: "left",
                    borderTop: "1px dotted #ccc",
                    borderBottom: rowIdx === specLabels.length - 1 ? "2px solid #333" : "none",
                    verticalAlign: "middle",
                  }}
                >
                  {label}
                </th>
                {tableData.map((product, colIdx) => {
                  const spec = product.specs.find(s => s.label === label);
                  const values = spec?.values || ["-"];
                  const hasHighlight = values.some(v => v.includes("각얼음") || v.includes("조각"));
                  
                  return (
                    <td
                      key={colIdx}
                      style={{
                        padding: "16px 12px",
                        background: "#fff",
                        fontSize: "14px",
                        color: "#333",
                        textAlign: "center",
                        borderTop: "1px dotted #ccc",
                        borderBottom: rowIdx === specLabels.length - 1 ? "2px solid #333" : "none",
                        verticalAlign: "middle",
                        lineHeight: "1.6",
                      }}
                    >
                      {values.map((value, vIdx) => {
                        // Highlight specific text in red
                        const highlightedValue = value
                          .replace(/(각얼음|조각얼음|조각 얼음|크래프트 아이스|미니 각얼음)/g, '<span style="color: #c41230; text-decoration: underline;">$1</span>');
                        
                        return (
                          <div 
                            key={vIdx} 
                            style={{ marginBottom: vIdx < values.length - 1 ? "2px" : 0 }}
                            dangerouslySetInnerHTML={{ __html: highlightedValue }}
                          />
                        );
                      })}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
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
