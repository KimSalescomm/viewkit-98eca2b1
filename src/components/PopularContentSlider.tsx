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
      return {
        ...item,
        product,
        feature,
        thumbnail: feature.mediaUrl || product.keyVisualImage,
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
    <section className="bg-[#F3F4F6] px-6 sm:px-10 py-10 sm:py-12 shrink-0">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">요즘 많이 본 콘텐츠</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700 disabled:text-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="이전"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700 disabled:text-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="다음"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6">
            {visibleItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.product.id === "subscription" ? "/subscription" : `/product/${item.product.id}/feature/${item.feature.id}`}
                onClick={() => trackProductClick(item.product.name)}
                className="flex-[0_0_calc(33.333%-1rem)] sm:flex-[0_0_calc(33.333%-1.5rem)] min-w-0 group"
              >
                <div className="relative h-48 sm:h-64 rounded-3xl overflow-hidden bg-gray-800 shadow-sm">
                  <SafeImage
                    src={item.thumbnail}
                    alt={`${item.product.name} ${item.feature.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-xl bg-brand-accent text-white text-sm font-semibold flex items-center justify-center shadow-sm">
                    {index + 1}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-brand-accent text-xs sm:text-sm font-medium mb-1">{item.product.name}</p>
                    <h3 className="text-white text-base sm:text-lg font-semibold leading-snug line-clamp-2">
                      {item.feature.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {visibleItems.length > 3 && (
          <div className="flex justify-center gap-2 mt-5">
            {visibleItems.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
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
