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
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {tableData.map((product, idx) => (
          <div
            key={idx}
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ padding: "16px", background: "#f9fafb" }}>
              <SafeImage
                src={product.imageUrl}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div style={{ padding: "20px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                {product.name}
              </h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14px",
                }}
              >
                <tbody>
                  {product.specs.map((spec, specIdx) => (
                    <tr key={specIdx}>
                      <th
                        style={{
                          padding: "12px 8px",
                          background: "#f3f4f6",
                          fontWeight: 600,
                          color: "#374151",
                          textAlign: "left",
                          borderBottom: "1px solid #e5e7eb",
                          verticalAlign: "top",
                          width: "100px",
                        }}
                      >
                        {spec.label}
                      </th>
                      <td
                        style={{
                          padding: "12px 8px",
                          color: "#4b5563",
                          borderBottom: "1px solid #e5e7eb",
                          verticalAlign: "top",
                        }}
                      >
                        {spec.values.map((value, vIdx) => (
                          <div key={vIdx} style={{ marginBottom: vIdx < spec.values.length - 1 ? "4px" : 0 }}>
                            {value}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
