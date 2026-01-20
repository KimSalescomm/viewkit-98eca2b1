import { convertToEmbedUrl } from "@/utils/videoUtils";
import SafeImage from "@/components/SafeImage";
import { ProductComparisonTable } from "@/data/features";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MediaViewerProps {
  mediaType: "video" | "image" | "table" | "gallery";
  mediaUrl: string;
  title: string;
  tableData?: ProductComparisonTable[];
  galleryImages?: string[];
}

const MediaViewer = ({ mediaType, mediaUrl, title, tableData, galleryImages }: MediaViewerProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (mediaType === "table" && tableData) {
    const specLabels = tableData[0]?.specs.map(s => s.label) || [];
    
    return (
      <div style={{ 
        width: "100%", 
        display: "flex", 
        justifyContent: "center" 
      }}>
        <div style={{ 
          display: "flex", 
          gap: "16px", 
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          {tableData.map((product, idx) => (
            <div
              key={idx}
              style={{
                flex: "0 0 280px",
                minWidth: "280px",
                maxWidth: "280px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Product Header */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px 12px",
                  background: "#f5f5f5",
                  borderRadius: "12px 12px 0 0",
                  height: "260px",
                }}
              >
                <h4 style={{ 
                  fontSize: "15px", 
                  fontWeight: 600, 
                  color: "#1f1f1f",
                  marginBottom: "16px",
                  textAlign: "center",
                  minHeight: "36px",
                  display: "flex",
                  alignItems: "center",
                }}>
                  {product.name}
                </h4>
                <div
                  style={{
                    width: "180px",
                    height: "180px",
                    overflow: "hidden",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SafeImage
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: "scale(1.2)",
                    }}
                  />
                </div>
              </div>
              
              {/* Product Specs */}
              <div style={{ background: "#fff", borderRadius: "0 0 12px 12px", overflow: "hidden", flex: 1 }}>
                {specLabels.map((label, rowIdx) => {
                  const spec = product.specs.find(s => s.label === label);
                  const values = spec?.values || ["-"];
                  
                  return (
                    <div
                      key={rowIdx}
                      style={{
                        borderTop: "1px dotted #ccc",
                        borderBottom: rowIdx === specLabels.length - 1 ? "2px solid #333" : "none",
                      }}
                    >
                      <div
                        style={{
                          padding: "8px 12px",
                          background: "#f9f9f9",
                          fontWeight: 500,
                          fontSize: "12px",
                          color: "#666",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          padding: "8px 12px",
                          fontSize: "13px",
                          color: "#333",
                          textAlign: "center",
                          lineHeight: "1.4",
                          height: "48px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {values.map((value, vIdx) => (
                          <div key={vIdx} style={{ marginBottom: vIdx < values.length - 1 ? "2px" : 0 }}>
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Gallery 타입 - 이미지 캐러셀
  if (mediaType === "gallery" && galleryImages && galleryImages.length > 0) {
    return (
      <div style={{ width: "100%", position: "relative" }}>
        {/* Carousel Navigation */}
        {canScrollPrev && (
          <button
            onClick={scrollPrev}
            style={{
              position: "absolute",
              left: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "rgba(255,255,255,0.9)",
              border: "none",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            }}
          >
            <ChevronLeft size={24} color="#333" />
          </button>
        )}
        {canScrollNext && (
          <button
            onClick={scrollNext}
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "rgba(255,255,255,0.9)",
              border: "none",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            }}
          >
            <ChevronRight size={24} color="#333" />
          </button>
        )}

        {/* Gallery Carousel */}
        <div ref={emblaRef} style={{ overflow: "hidden", borderRadius: "16px" }}>
          <div style={{ display: "flex" }}>
            {galleryImages.map((imageUrl, idx) => (
              <div
                key={idx}
                style={{
                  flex: "0 0 100%",
                  minWidth: "100%",
                  position: "relative",
                  paddingBottom: "66.67%", // 3:2 aspect ratio
                }}
              >
                <SafeImage
                  src={imageUrl}
                  alt={`${title} - 이미지 ${idx + 1}`}
                  loading="lazy"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
          {galleryImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              style={{
                width: selectedIndex === idx ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: selectedIndex === idx ? "#333" : "#ccc",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Image counter */}
        <div style={{ 
          textAlign: "center", 
          marginTop: "8px", 
          fontSize: "14px", 
          color: "#666" 
        }}>
          {selectedIndex + 1} / {galleryImages.length}
        </div>
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
          width: "100%",
          display: "flex",
          justifyContent: "center",
          borderRadius: "16px",
          overflow: "hidden",
          background: "#000"
        }}
      >
        <video
          src={mediaUrl}
          muted
          autoPlay
          loop
          playsInline
          style={{
            maxWidth: "100%",
            maxHeight: "80vh",
            objectFit: "contain"
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
