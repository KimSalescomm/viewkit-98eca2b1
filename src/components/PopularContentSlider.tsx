import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { usePopularFeatures } from "@/hooks/usePopularFeatures";
import { useContent } from "@/contexts/ContentContext";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";

interface PopularContentSliderProps {
  days?: number;
  limit?: number;
}

export const PopularContentSlider = ({ days = 30, limit = 5 }: PopularContentSliderProps) => {
  const { items, loading } = usePopularFeatures({ days, limit });
  const { getProductById, getFeatureById, isProductVisible } = useContent();
  const { trackProductClick } = useAnalyticsContext();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: items.length > 3,
    align: "start",
    slidesToScroll: 1,
    containScroll: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
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

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const visibleItems = items
    .map((item) => {
      const product = getProductById(item.productId);
      const feature = getFeatureById(item.productId, item.featureId);
      if (!product || !feature || !isProductVisible(product.id)) return null;

      // 영상/유튜브 URL은 썸네일로 부적합 → 제품 키비주얼 또는 갤러리/아래 이미지로 폴백
      const isImageUrl = (url?: string) =>
        !!url && (url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png") || url.endsWith(".webp"));
      const fallbackImage =
        (typeof feature.belowMediaImage === "object" && feature.belowMediaImage?.url) ||
        feature.galleryImages?.[0] ||
        product.keyVisualImage;
      const thumbnail = isImageUrl(feature.mediaUrl) ? feature.mediaUrl : (isImageUrl(String(fallbackImage)) ? String(fallbackImage) : product.keyVisualImage);

      return {
        ...item,
        product,
        feature,
        thumbnail,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (loading && items.length === 0) {
    return (
      <section className="bg-[#F3F4F6] px-6 sm:px-10 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">요즘 많이 본 콘텐츠</h2>
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-[0_0_33.333%] min-w-0 rounded-3xl bg-gray-200 h-48 sm:h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (visibleItems.length < 3) return null;

  return (
    <section className="bg-gray-900 px-6 sm:px-10 py-5 sm:py-6 shrink-0">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center rounded-full bg-brand-accent px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold text-white tracking-wide">
              HOT
            </span>
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight">요즘 많이 본 콘텐츠</h2>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white disabled:text-white/30 hover:bg-white/20 transition-colors"
              aria-label="이전"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white disabled:text-white/30 hover:bg-white/20 transition-colors"
              aria-label="다음"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3 sm:gap-4">
            {visibleItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.product.id === "subscription" ? "/subscription" : `/product/${item.product.id}/feature/${item.feature.id}`}
                onClick={() => trackProductClick(item.product.name)}
                className="flex-[0_0_calc(33.333%-0.75rem)] sm:flex-[0_0_calc(33.333%-1rem)] min-w-0 group"
              >
                <div className="flex items-stretch gap-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] transition-colors p-2">
                  <div className="relative w-20 h-16 sm:w-28 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-gray-800">
                    <SafeImage
                      src={item.thumbnail}
                      alt={`${item.product.name} ${item.feature.title}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading={index < 3 ? "eager" : "lazy"}
                    />
                    <div className="absolute top-1 left-1 w-5 h-5 rounded-md bg-brand-accent text-white text-[10px] font-semibold flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 flex flex-col justify-center py-0.5">
                    <p className="text-brand-accent text-[15px] font-medium mb-1">{item.product.name}</p>
                    <h3 className="text-white text-[18px] font-medium leading-[1.4] line-clamp-2">
                      {item.feature.title}
                    </h3>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        </div>


        {visibleItems.length > 3 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {visibleItems.map((_, index) => (
              <span
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === selectedIndex ? "bg-brand-accent" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
