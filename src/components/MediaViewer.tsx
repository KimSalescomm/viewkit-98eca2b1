import { convertToEmbedUrl } from "@/utils/videoUtils";
import SafeImage from "@/components/SafeImage";
import WebOSVideoPlayer from "@/components/WebOSVideoPlayer";
import { ProductComparisonTable, GalleryImage } from "@/data/features";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MediaViewerProps {
  mediaType: "video" | "image" | "table" | "gallery" | "youtube";
  mediaUrl: string;
  title: string;
  tableData?: ProductComparisonTable[];
  galleryImages?: (string | GalleryImage)[];
  isShorts?: boolean;
  fallbackUrl?: string; // MP4 fallback URL for webOS compatibility
}

const MediaViewer = ({ mediaType, mediaUrl, title, tableData, galleryImages, isShorts, fallbackUrl }: MediaViewerProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);

  // Lock body scroll while in video fullscreen
  useEffect(() => {
    if (!isVideoFullscreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isVideoFullscreen]);

  // Prevent out-of-range access when switching between galleries of different sizes
  const galleryLength = galleryImages?.length ?? 0;
  useEffect(() => {
    if (!galleryLength) return;
    if (selectedIndex < galleryLength) return;
    setSelectedIndex(0);
    emblaApi?.scrollTo(0);
  }, [galleryLength, selectedIndex, emblaApi]);

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
    
    // Check if THIS product's value differs from the majority for a given spec label
    const isCellDifferent = (productIdx: number, label: string): boolean => {
      const allValues = tableData.map(product => {
        const spec = product.specs.find(s => s.label === label);
        return spec?.values.join('|') || '-';
      });
      
      // If all values are the same, no cell is different
      const uniqueValues = new Set(allValues);
      if (uniqueValues.size === 1) return false;
      
      // If all values are different, highlight all
      if (uniqueValues.size === allValues.length) return true;
      
      // Find the majority value (most common)
      const valueCounts = allValues.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const majorityValue = Object.entries(valueCounts).reduce((a, b) => 
        a[1] >= b[1] ? a : b
      )[0];
      
      // Highlight only if this value differs from the majority
      return allValues[productIdx] !== majorityValue;
    };
    
    return (
      <div style={{ 
          width: "100%", 
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}>
        <div style={{ 
          display: "flex", 
          gap: "16px", 
          justifyContent: "center",
          minWidth: "fit-content",
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
                  const isCellHighlighted = isCellDifferent(idx, label);
                  
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
                          color: isCellHighlighted ? "#2563eb" : "#666",
                          height: "35px",
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
                          color: isCellHighlighted ? "#2563eb" : "#333",
                          textAlign: "center",
                          lineHeight: "1.4",
                          height: "51px",
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

    const currentImage = normalizedImages[selectedIndex] ?? normalizedImages[0];

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
                }}
              >
                <SafeImage
                  src={image.url}
                  alt={image.title || `${title} - 이미지 ${idx + 1}`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Caption Box */}
        {(currentImage?.title || currentImage?.description) && (
          <div
            style={{
              background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
              padding: "20px 24px",
              borderRadius: "0 0 16px 16px",
              borderTop: "1px solid #dee2e6",
            }}
          >
            {currentImage?.title && (
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#212529",
                  marginBottom: currentImage?.description ? "8px" : 0,
                }}
              >
                {currentImage.title}
              </h4>
            )}
            {currentImage?.description && (
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

  // Shared fullscreen overlay (mobile only). Tap to exit.
  // When `isHorizontal` is true, the content is rotated 90deg to fill a
  // portrait viewport with a landscape video.
  const renderFullscreenOverlay = (
    content: React.ReactNode,
    opts?: { isHorizontal?: boolean }
  ) => {
    if (!isVideoFullscreen) return null;
    const isHorizontal = opts?.isHorizontal ?? false;
    const vw = typeof window !== "undefined" ? window.innerWidth : 0;
    const vh = typeof window !== "undefined" ? window.innerHeight : 0;
    const isPortrait = vh >= vw;
    const shouldRotate = isHorizontal && isPortrait;

    return (
      <div
        onClick={() => setIsVideoFullscreen(false)}
        className="sm:hidden"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsVideoFullscreen(false);
          }}
          aria-label="닫기"
          style={{
            position: "absolute",
            top: "max(env(safe-area-inset-top), 16px)",
            right: "16px",
            zIndex: 2,
            width: "44px",
            height: "44px",
            borderRadius: "9999px",
            background: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            fontSize: "22px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
        <div
          onClick={(e) => e.stopPropagation()}
          style={
            shouldRotate
              ? {
                  width: `${vh}px`,
                  height: `${vw}px`,
                  transform: "rotate(90deg)",
                  transformOrigin: "center center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
              : {
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
          }
        >
          {content}
        </div>
      </div>
    );
  };

  // YouTube 전용 렌더링 (isShorts 지원)
  if (mediaType === "youtube") {
    const { embedUrl } = convertToEmbedUrl(mediaUrl);
    const separator = embedUrl.includes('?') ? '&' : '?';
    const autoplayUrl = `${embedUrl}${separator}autoplay=1&mute=1&loop=1&playlist=${embedUrl.split('/embed/')[1]?.split('?')[0] || ''}`;
    const aspectRatio = isShorts ? "177.78%" : "56.25%";

    const iframeEl = (
      <iframe
        src={autoplayUrl}
        title={title}
        style={{
          position: isShorts ? "relative" : "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );

    return (
      <>
        <div
          onClick={() => setIsVideoFullscreen(true)}
          className="sm:cursor-default cursor-zoom-in"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              position: "relative",
              width: isShorts ? "min(100%, 400px)" : "100%",
              paddingBottom: isShorts ? "0" : aspectRatio,
              height: isShorts ? "min(80vh, 711px)" : "auto",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#000",
            }}
          >
            {iframeEl}
          </div>
        </div>
        {renderFullscreenOverlay(
          <iframe
            src={autoplayUrl}
            title={title}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />,
          { isHorizontal: !isShorts }
        )}
      </>
    );
  }

  if (mediaType === "video") {
    const { embedUrl, isYoutube } = convertToEmbedUrl(mediaUrl);

    if (isYoutube) {
      return (
        <>
          <div
            onClick={() => setIsVideoFullscreen(true)}
            className="sm:cursor-default cursor-zoom-in"
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "56.25%",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#000",
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
                border: "none",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {renderFullscreenOverlay(
            <iframe
              src={embedUrl}
              title={title}
              style={{
                width: "100%",
                aspectRatio: "16 / 9",
                maxHeight: "100%",
                border: "none",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </>
      );
    }

    return (
      <>
        <div
          onClick={() => setIsVideoFullscreen(true)}
          className="sm:cursor-default cursor-zoom-in"
        >
          <WebOSVideoPlayer mediaUrl={mediaUrl} fallbackUrl={fallbackUrl} />
        </div>
        {renderFullscreenOverlay(
          <div style={{ width: "100%", height: "100%" }}>
            <WebOSVideoPlayer mediaUrl={mediaUrl} fallbackUrl={fallbackUrl} />
          </div>
        )}
      </>
    );
  }

  return (
    <div
      style={{
        width: "100%",
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
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </div>
  );
};

export default MediaViewer;
