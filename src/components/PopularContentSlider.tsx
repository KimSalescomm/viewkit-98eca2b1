import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import { usePopularFeatures } from "@/hooks/usePopularFeatures";
import { useContent } from "@/contexts/ContentContext";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";
import { subscriptionProducts } from "@/pages/Subscription";
import type { Product } from "@/data/products";
import type { Feature } from "@/data/features";

interface PopularContentSliderProps {
  days?: number;
  limit?: number;
}

// 요즘 많이 본 콘텐츠 썸네일: 특정 콘텐츠의 대표 이미지를 강제로 교체
const THUMBNAIL_OVERRIDES: Record<string, string> = {
  "/product/vacuum/feature/1": "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/gallery/medium-interior01.jpg",
};

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
      const isSubscription = item.productId === "subscription";
      const subProduct = isSubscription
        ? subscriptionProducts.find((p) => p.id === item.featureId.replace("tab_", ""))
        : undefined;

      let product: Product | undefined;
      let feature: Feature | undefined;
      let thumbnail: string | undefined;

      if (isSubscription && subProduct) {
        product = {
          id: "subscription",
          name: "가전 구독",
          title: "가전 구독",
          description: "가전 구독 케어",
          keyVisualImage: subProduct.afterImage,
          icon: "Calendar",
        };
        feature = {
          id: item.featureId,
          title: `${subProduct.name} 구독 전/후 비교`,
          subtitle: "",
          icon: "Calendar",
          tag: "가전 구독",
          mediaType: "image",
          mediaUrl: subProduct.afterImage,
        } as Feature;
        thumbnail = subProduct.afterImage;
      } else {
        product = getProductById(item.productId);
        feature = getFeatureById(item.productId, item.featureId);
        if (!product || !feature || !isProductVisible(product.id)) return null;

        // 영상/유튜브 URL은 썸네일로 부적합 → 제품 키비주얼 또는 갤러리/아래 이미지로 폴백
        const isImageUrl = (url?: string) =>
          !!url && (url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png") || url.endsWith(".webp"));
        const fallbackImage =
          (typeof feature.belowMediaImage === "object" && feature.belowMediaImage?.url) ||
          feature.galleryImages?.[0] ||
          product.keyVisualImage;
        const autoThumbnail = isImageUrl(feature.mediaUrl) ? feature.mediaUrl : (isImageUrl(String(fallbackImage)) ? String(fallbackImage) : product.keyVisualImage);
        const overrideKey = `/product/${item.productId}/feature/${item.featureId}`;
        thumbnail = THUMBNAIL_OVERRIDES[overrideKey] || autoThumbnail;
      }

      if (!product || !feature || !thumbnail || !isProductVisible(product.id)) return null;

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
      <section className="bg-gray-900 px-5 sm:px-10 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center rounded-full bg-brand-accent px-3 py-1 text-[13px] font-semibold text-white tracking-wide">
                HOT
              </span>
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-white tracking-tight">요즘 많이 본 콘텐츠</h2>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-0 rounded-2xl bg-white/[0.06] overflow-hidden animate-pulse">
                <div className="h-[130px] sm:h-[140px] bg-gray-800" />
                <div className="p-3 space-y-2">
                  <div className="h-4 w-16 rounded bg-gray-700" />
                  <div className="h-4 w-full rounded bg-gray-700" />
                  <div className="h-4 w-2/3 rounded bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (visibleItems.length < 3) return null;

  type VisibleItem = typeof visibleItems[number];

  const Card = ({ item, index, eager }: { item: VisibleItem; index: number; eager?: boolean }) => (
    <Link
      to={item.product.id === "subscription" ? `/subscription?tab=${item.feature.id.replace("tab_", "")}` : `/product/${item.product.id}/feature/${item.feature.id}`}
      onClick={() => trackProductClick(item.product.name)}
      className="min-w-0 group block"
    >
      <div className="rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] transition-colors">
        <div className="relative">
          <div className="relative h-[110px] sm:h-[140px] bg-gray-800 overflow-hidden rounded-2xl rounded-b-none">
            <SafeImage
              src={item.thumbnail}
              alt={`${item.product.name} ${item.feature.title}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading={eager ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/70 flex items-center justify-center text-black transition-transform duration-300 group-hover:scale-105">
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="black" />
              </div>
            </div>
            <span
              className="absolute left-1 bottom-0.5 sm:left-1.5 sm:bottom-1 text-[36px] sm:text-[56px] font-bold leading-none select-none z-10 vk-rank-number"
              aria-hidden="true"
            >
              {index + 1}
            </span>
          </div>
        </div>
        <div className="p-2.5 sm:p-3">
          <p className="text-brand-accent text-[10px] font-semibold mb-1">{item.product.name}</p>
          <h3 className="text-white text-[13px] sm:text-[15px] font-medium leading-[1.35] line-clamp-2">
            {item.feature.title}
          </h3>
        </div>
      </div>

    </Link>
  );

  return (
    <section className="bg-gray-900 px-5 sm:px-10 py-6 sm:py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center rounded-full bg-brand-accent px-3 py-1 text-[13px] font-semibold text-white tracking-wide">
              HOT
            </span>
            <h2 className="text-[20px] sm:text-[24px] font-semibold text-white tracking-tight">요즘 많이 본 콘텐츠</h2>
          </div>
          {visibleItems.length > 3 && (
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
          )}
        </div>

        {visibleItems.length > 3 ? (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-3 sm:gap-4">
              {visibleItems.map((item, index) => (
                <div key={item.path} className="flex-[0_0_calc(33.333%-0.75rem)] sm:flex-[0_0_calc(33.333%-1rem)] min-w-0">
                  <Card item={item} index={index} eager={index < 3} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {visibleItems.map((item, index) => (
              <Card key={item.path} item={item} index={index} eager />
            ))}
          </div>
        )}

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
