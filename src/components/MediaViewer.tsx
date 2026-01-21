import { convertToEmbedUrl } from "@/utils/videoUtils";
import SafeImage from "@/components/SafeImage";
import { ProductComparisonTable, GalleryImage } from "@/data/features";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";

interface MediaViewerProps {
  mediaType: "video" | "image" | "table" | "gallery" | "youtube";
  mediaUrl: string;
  title: string;
  tableData?: ProductComparisonTable[];
  galleryImages?: (string | GalleryImage)[];
  isShorts?: boolean;
}

// VideoPlayer component with error handling
const VideoPlayer = ({ mediaUrl }: { mediaUrl: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      video.play().catch(() => {
        setHasError(true);
      });
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    // Timeout fallback - if video doesn't load in 5 seconds, show error
    const timeout = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 5000);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      clearTimeout(timeout);
    };
  }, [mediaUrl]);

  if (hasError) {
    return (
      <div
        style={{
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 40px",
          minHeight: "300px",
        }}
      >
        <PlayCircle size={64} color="#fff" style={{ opacity: 0.6, marginBottom: "16px" }} />
        <p style={{ color: "#fff", fontSize: "16px", textAlign: "center", opacity: 0.8 }}>
          영상을 로드할 수 없습니다
        </p>
        <a
          href={mediaUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: "16px",
            padding: "12px 24px",
            background: "rgba(255,255,255,0.15)",
            borderRadius: "8px",
            color: "#fff",
            textDecoration: "none",
            fontSize: "14px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.15)";
          }}
        >
          외부 링크에서 보기
        </a>
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
        background: "#000",
        position: "relative",
      }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid rgba(255,255,255,0.3)",
              borderTopColor: "#fff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      )}
      <video
        ref={videoRef}
        src={mediaUrl}
        muted
        autoPlay
        loop
        playsInline
        style={{
          maxWidth: "100%",
          maxHeight: "80vh",
          objectFit: "contain",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      />
    </div>
  );
};

const MediaViewer = ({ mediaType, mediaUrl, title, tableData, galleryImages, isShorts }: MediaViewerProps) => {
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

  // Gallery 타입 - 이미지 캐러셀 (캡션 지원)
  if (mediaType === "gallery" && galleryImages && galleryImages.length > 0) {
    // galleryImages를 GalleryImage 배열로 정규화
    const normalizedImages: GalleryImage[] = galleryImages.map((img) =>
      typeof img === "string" ? { url: img } : img
    );

    const currentImage = normalizedImages[selectedIndex];

    return (
      <div style={{ width: "100%", position: "relative" }}>
        {/* Carousel Navigation */}
        {canScrollPrev && (
          <button
            onClick={scrollPrev}
            style={{
              position: "absolute",
              left: "8px",
              top: "calc(50% - 40px)",
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
              top: "calc(50% - 40px)",
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
        <div ref={emblaRef} style={{ overflow: "hidden", borderRadius: "16px 16px 0 0" }}>
          <div style={{ display: "flex" }}>
            {normalizedImages.map((image, idx) => (
              <div
                key={idx}
                style={{
                  flex: "0 0 100%",
                  minWidth: "100%",
                  position: "relative",
                  paddingBottom: "56.25%", // 16:9 aspect ratio
                }}
              >
                <SafeImage
                  src={image.url}
                  alt={image.title || `${title} - 이미지 ${idx + 1}`}
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

        {/* Caption Box */}
        {(currentImage.title || currentImage.description) && (
          <div
            style={{
              background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
              padding: "20px 24px",
              borderRadius: "0 0 16px 16px",
              borderTop: "1px solid #dee2e6",
            }}
          >
            {currentImage.title && (
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#212529",
                  marginBottom: currentImage.description ? "8px" : 0,
                }}
              >
                {currentImage.title}
              </h4>
            )}
            {currentImage.description && (
              <p
                style={{
                  fontSize: "15px",
                  color: "#495057",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {currentImage.description}
              </p>
            )}
          </div>
        )}

        {/* Dots indicator */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
          {normalizedImages.map((_, idx) => (
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
          {selectedIndex + 1} / {normalizedImages.length}
        </div>
      </div>
    );
  }

  // YouTube 전용 렌더링 (isShorts 지원)
  if (mediaType === "youtube") {
    // Shorts는 9:16 세로 비율, 일반은 16:9 가로 비율
    const aspectRatio = isShorts ? "177.78%" : "56.25%"; // 9:16 = 177.78%, 16:9 = 56.25%
    
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: isShorts ? "min(100%, 400px)" : "100%",
            paddingBottom: isShorts ? "0" : aspectRatio,
            height: isShorts ? "min(80vh, 711px)" : "auto", // 400 * 16/9 = 711
            borderRadius: "16px",
            overflow: "hidden",
            background: "#000"
          }}
        >
          <iframe
            src={mediaUrl}
            title={title}
            style={{
              position: isShorts ? "relative" : "absolute",
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
      <VideoPlayer mediaUrl={mediaUrl} />
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
