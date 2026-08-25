import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Check, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import MediaViewer from "@/components/MediaViewer";
import FeatureIcon from "@/components/FeatureIcon";
import OrientationToggle from "@/components/OrientationToggle";
import BackButton from "@/components/BackButton";
import PageContainer from "@/components/PageContainer";
import FeatureTabs from "@/components/FeatureTabs";

import SafeImage from "@/components/SafeImage";
import BlurMediaFrame from "@/components/BlurMediaFrame";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";
import { useContent } from "@/contexts/ContentContext";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { GalleryImage, SubscriptionServiceItem, type Feature } from "@/data/features";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FeatureDetail = () => {
  const { productId, id } = useParams<{ productId: string; id: string }>();
  const { trackDetailView, trackVideoClick } = useAnalyticsContext();
  const { getFeatureById, getProductById, isProductVisible } = useContent();

  const feature = getFeatureById(productId || "", id || "");
  const product = getProductById(productId || "");
  const tabs = feature?.tabs;

  const [activeTab, setActiveTab] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomUrl, setZoomUrl] = useState<string | null>(null);

  // 트루스팀 적용 코스 캐러셀
  const [courseIndex, setCourseIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollCoursePrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollCourseNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onCourseSelect = useCallback(() => {
    if (!emblaApi) return;
    setCourseIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onCourseSelect();
    emblaApi.on("select", onCourseSelect);
    emblaApi.on("reInit", onCourseSelect);
    return () => {
      emblaApi.off("select", onCourseSelect);
      emblaApi.off("reInit", onCourseSelect);
    };
  }, [emblaApi, onCourseSelect]);

  const renderMediaGallery = (images: GalleryImage[] | undefined) => {
    if (!images || images.length === 0) return null;
    const topRow = images.slice(0, 4);
    const bottomRow = images.slice(4, 7);
    return (
      <section className="my-6 sm:my-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-3 sm:mb-4">
          {topRow.map((img, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <BlurMediaFrame
                src={img.url}
                alt={img.title || `이미지 ${idx + 1}`}
                aspectClassName="aspect-[4/3]"
                radiusClassName="rounded-2xl rounded-b-none"
              />
              <div className="p-2.5 sm:p-3">
                {img.title && <h4 className="text-[14px] font-bold text-gray-900 mb-1">{img.title}</h4>}
                {img.description && <p className="text-[12px] text-gray-500 leading-snug">{img.description}</p>}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {bottomRow.map((img, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <BlurMediaFrame
                src={img.url}
                alt={img.title || `이미지 ${idx + 5}`}
                aspectClassName="aspect-[4/3]"
                radiusClassName="rounded-2xl rounded-b-none"
              />
              <div className="p-2.5 sm:p-3">
                {img.title && <h4 className="text-[14px] font-bold text-gray-900 mb-1">{img.title}</h4>}
                {img.description && <p className="text-[12px] text-gray-500 leading-snug">{img.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const SubscriptionServiceSection = ({
    items,
    mediaDisclaimers,
    accent = "brand",
  }: {
    items: SubscriptionServiceItem[];
    mediaDisclaimers?: string[];
    accent?: "purple" | "brand";
  }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedItem = items[selectedIndex];
    const barClass = accent === "brand" ? "bg-brand-accent" : "bg-[#534AB7]";
    const activeClass = accent === "brand" ? "bg-brand-accent text-white font-medium" : "bg-[#7842F5] text-white font-medium";


    return (
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col md:flex-row md:items-stretch bg-white rounded-2xl overflow-hidden border-[0.5px] border-[hsl(var(--border))]">
          {/* Left block: category detail */}
          <div className="w-full md:w-[70%] p-5 sm:p-6 md:pr-4">
            <h3 className="text-gray-900 text-xl font-bold mb-2">
              {selectedItem.label}
            </h3>
            <div className={`w-7 h-[3px] rounded-sm mb-4 ${barClass}`} />
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
              {selectedItem.description}
            </p>
            <BlurMediaFrame
              src={selectedItem.imageUrl}
              alt={selectedItem.label}
              aspectClassName="aspect-[16/10]"
              radiusClassName="rounded-lg"
            />
          </div>

          {/* Right block: category list */}
          <div className="w-full md:w-[30%] p-4 md:pl-4 flex flex-col justify-start border-t md:border-t-0 md:border-l border-[hsl(var(--border))]">
            <div className="flex flex-col gap-1.5">
              {items.map((item, idx) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-full text-left px-3.5 py-2.5 min-h-[44px] rounded-[999px] transition-colors duration-200 text-sm sm:text-base ${
                    selectedIndex === idx
                      ? activeClass
                      : "bg-transparent text-gray-900 font-normal border-none"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {mediaDisclaimers && mediaDisclaimers.length > 0 && (
          <ul className="mt-3 sm:mt-4 px-1 sm:px-2 space-y-1">
            {mediaDisclaimers.map((text, index) => (
              <li
                key={index}
                className="text-[12px] text-muted-foreground leading-relaxed"
              >
                * {text}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  useEffect(() => {

    setActiveTab(0);
  }, [feature, tabs]);

  const activeTabData = tabs?.[activeTab];

  // detail_view 이벤트
  useEffect(() => {
    if (product) {
      trackDetailView(product.name);
    }
  }, [productId, id]);

  // 비디오/유튜브 클릭 감지
  const handleVideoClick = () => {
    if (product) {
      trackVideoClick(product.name);
    }
  };

  const FeatureDetailLayout = ({
    feature,
    product,
    productId,
    onVideoClick,
  }: {
    feature: Feature;
    product: { name: string };
    productId: string;
    onVideoClick: () => void;
  }) => {
    const highlights = activeTabData?.highlights ?? feature.highlights ?? [];
    const hasSubscriptionService =
      !!feature.subscriptionServiceItems && feature.subscriptionServiceItems.length > 0;
    const belowImg = activeTabData?.belowMediaImage ?? feature.belowMediaImage;
    const groupedDisclaimers = productId === "washcombo" && id === "7";

    /** 접이식 디스클레이머 블록 (세부정보) */
    const renderCollapsible = (
      items: { title: string; items: string[] }[],
      keyPrefix: string,
      grouped = false,
    ) => {
      if (!items || items.length === 0) return null;
      if (grouped) {
        return (
          <Accordion type="single" collapsible className="w-full" key={`${keyPrefix}-grouped`}>
            <AccordionItem value={`${keyPrefix}-all`} className="border-b border-gray-200">
              <AccordionTrigger className="py-3 text-left text-xs font-bold text-muted-foreground hover:no-underline">
                세부정보
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pb-2 pt-1">
                  {items.map((item, index) => (
                    <div key={index}>
                      {item.title !== "세부정보" && (
                        <h4 className="mb-1 text-[11px] font-bold text-gray-700 sm:text-xs">{item.title}</h4>
                      )}
                      <ol className="list-none space-y-1">
                        {item.items.map((text, i) => (
                          <li key={i} className="text-[12px] leading-relaxed text-muted-foreground whitespace-pre-line">
                            {text}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      }
      return (
        <Accordion type="multiple" className="w-full" key={`${keyPrefix}-${activeTab}`}>
          {items.map((item, index) => (
            <AccordionItem key={index} value={`${keyPrefix}-${index}`} className="border-b border-gray-200">
              <AccordionTrigger className="py-3 text-left text-xs font-bold text-muted-foreground hover:no-underline">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                <ol className="list-none space-y-1 pb-2 pt-1">
                  {item.items.map((text, i) => (
                    <li key={i} className="text-[12px] leading-relaxed text-muted-foreground whitespace-pre-line">
                      {"①②③④⑤⑥⑦⑧⑨⑩"[i] || `${i + 1}.`} {text}
                    </li>
                  ))}
                </ol>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      );
    };

    const renderFlat = (items?: string[]) =>
      items && items.length > 0 ? (
        <ul className="mb-2 space-y-1">
          {items.map((text, index) => (
            <li key={index} className="text-[12px] leading-relaxed text-muted-foreground">
              * {text}
            </li>
          ))}
        </ul>
      ) : null;

    return (
      <PageContainer>
        <div className="mb-5 flex items-center justify-between sm:mb-6">
          <BackButton to={`/product/${productId}`} label={`${product.name} 특장점`} />
          <OrientationToggle />
        </div>

        {/* Feature Header */}
        <div className="mb-5 flex items-center gap-4 border-b border-gray-200 pb-5 sm:mb-6 sm:gap-5 sm:pb-6">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gray-200/70 sm:h-16 sm:w-16">
            <FeatureIcon iconKey={feature.icon} className="h-7 w-7 text-brand-accent sm:h-8 sm:w-8" />
          </div>
          <div className="min-w-0">
            {feature.tag && (
              <span className="mb-1 inline-block text-[12px] font-bold tracking-[0.12em] uppercase text-brand-accent">
                {feature.tag}
              </span>
            )}
            <h1 className="text-[26px] font-extrabold leading-[1.2] tracking-[-0.02em] text-gray-900 sm:text-[32px]">
              {feature.title.replace(/\n/g, " ")}
            </h1>
            <p className="mt-1 text-[15px] leading-snug text-gray-600 sm:text-[17px]">
              {feature.subtitle.replace(/\n/g, " ")}
            </p>
          </div>
        </div>

        {/* 탭보다 위에 메인 미디어를 유지해야 하는 경우 */}
        {feature.showMainMedia && tabs && tabs.length > 0 && (
          <div className="mb-4 overflow-hidden rounded-[14px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] sm:mb-5">
            <div onClick={onVideoClick}>
              <MediaViewer
                key="main-media"
                mediaType={feature.mediaSlides ? "gallery" : feature.mediaType}
                mediaUrl={feature.mediaUrl}
                mediaSlides={feature.mediaSlides}
                title={feature.title}
                tableData={feature.tableData}
                galleryImages={feature.galleryImages}
                isShorts={feature.isShorts}
                fallbackUrl={feature.fallbackUrl}
                fullWidthMedia={feature.fullWidthMedia}
              />
            </div>
          </div>
        )}

        {/* 선택 탭 */}
        {tabs && tabs.length > 0 && (
          <FeatureTabs
            tabs={tabs}
            activeIndex={activeTab}
            onChange={setActiveTab}
            scrollable={tabs.length > 3}
          />
        )}

        {/* 외부 페이지 인앱 임베드 (고객 리뷰 등) */}
        {feature.embedUrl && (
          <div className="mb-4 sm:mb-5">
            <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
              <iframe
                src={feature.embedUrl}
                title={`${feature.title} 리뷰`}
                loading="lazy"
                className="h-[70vh] min-h-[520px] w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </div>
            <div className="mt-2 text-right">
              <a
                href={feature.embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-brand-accent"
              >
                리뷰가 보이지 않으면 새 창에서 열기 ↗
              </a>
            </div>
          </div>
        )}

        {/* 메인 미디어 (구독 케어처럼 하위 이미지 섹션이 있으면 중복 방지를 위해 생략) */}
        {!hasSubscriptionService && !feature.embedUrl && !feature.showMainMedia && (() => {
          const mainType =
            activeTabData?.mediaSlides || activeTabData?.galleryImages
              ? "gallery"
              : activeTabData?.mediaType ?? feature.mediaType;
          const mainUrl = activeTabData?.mediaUrl ?? feature.mediaUrl;

          return (
            <>
              {feature.mediaSectionTitle && (
                <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                  {feature.mediaSectionTitle}
                </h2>
              )}
              {mainType === "image" && mainUrl ? (
                /* 이미지: 블러 확장 배경 프레임 (클릭 시 확대) */
                <div className="group relative mb-4 sm:mb-5">
                  <button
                    type="button"
                    aria-label="이미지 크게 보기"
                    onClick={() => {
                      onVideoClick();
                      setZoomUrl(mainUrl);
                    }}
                    className="block w-full cursor-zoom-in rounded-[14px] text-left transition-transform duration-200 hover:scale-[1.005] focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  >
                    <BlurMediaFrame
                      key={tabs ? `tab-${activeTab}` : "main"}
                      src={mainUrl}
                      alt={feature.title}
                      loading="eager"
                      aspectClassName="aspect-[4/3] sm:aspect-[16/10]"
                      radiusClassName="rounded-[14px]"
                      objectPosition={activeTabData?.imagePosition}
                      imageFit={activeTabData?.imageFit ?? feature.imageFit ?? "cover"}
                    />
                  </button>
                  <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    <Maximize2 className="h-3 w-3" />
                    클릭하면 크게 보기
                  </span>
                </div>
              ) : (

                <div className="mb-4 overflow-hidden rounded-[14px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] sm:mb-5">
                  <div onClick={onVideoClick}>
                    <MediaViewer
                      key={tabs ? `tab-${activeTab}` : "main"}
                      mediaType={mainType}
                      mediaUrl={mainUrl}
                      mediaSlides={activeTabData?.mediaSlides ?? feature.mediaSlides}
                      title={feature.title}
                      tableData={feature.tableData}
                      galleryImages={activeTabData?.galleryImages ?? feature.galleryImages}
                      isShorts={activeTabData?.isShorts ?? feature.isShorts}
                      fallbackUrl={activeTabData?.fallbackUrl ?? feature.fallbackUrl}
                      imagePosition={activeTabData?.imagePosition}
                      fullWidthMedia={feature.fullWidthMedia}
                    />
                  </div>
                </div>
              )}
            </>
          );
        })()}

        {/* 미디어 하단 이미지 (인증 마크 등) */}
        {belowImg && (
          <figure className="mb-4 sm:mb-5">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={`${belowImg.alt || "인증 마크"} 확대 보기`}
              className="block w-full cursor-zoom-in overflow-hidden rounded-[14px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-transform duration-200 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
              <img
                src={belowImg.url}
                alt={belowImg.alt || ""}
                loading="lazy"
                decoding="async"
                className="h-auto w-full object-contain"
              />
            </button>
            {belowImg.caption && (
              <figcaption className="mt-2 text-center text-[12px] leading-relaxed text-gray-500">
                {belowImg.caption}
              </figcaption>
            )}
          </figure>
        )}

        {/* 인증 마크 확대 보기 */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-5xl bg-white p-2 sm:p-4">
            <DialogTitle className="sr-only">인증 마크 확대 보기</DialogTitle>
            {belowImg && (
              <img
                src={belowImg.url}
                alt={belowImg.alt || ""}
                className="h-auto w-full rounded-lg object-contain"
              />
            )}
          </DialogContent>
        </Dialog>

        {/* 이미지 확대 보기 */}
        <Dialog open={!!zoomUrl} onOpenChange={(open) => !open && setZoomUrl(null)}>
          <DialogContent
            className="max-w-[96vw] border-0 bg-white p-3 [&>button.absolute]:hidden sm:max-w-5xl sm:p-4"
          >
            <DialogTitle className="sr-only">이미지 확대 보기</DialogTitle>
            <button
              type="button"
              onClick={() => setZoomUrl(null)}
              className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-gray-900/80 px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-gray-900"
            >
              <X className="h-3.5 w-3.5" />
              닫기
            </button>
            {zoomUrl && (
              <img
                src={zoomUrl}
                alt={feature.title}
                className="max-h-[85vh] w-full rounded-lg object-contain"
              />
            )}
          </DialogContent>
        </Dialog>

        {renderMediaGallery(activeTabData?.mediaGallery ?? feature.mediaGallery)}

        {/* 구독 케어 서비스 (이미지 + 설명) */}
        {hasSubscriptionService && (
          <SubscriptionServiceSection items={feature.subscriptionServiceItems!} accent="brand" />
        )}

        {/* 설명 카드 */}
        {(activeTabData?.caption || activeTabData?.description || feature.description) && (
          <div className="mb-4 rounded-[14px] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] sm:mb-5">
            {(activeTabData?.descriptionTitle || feature.descriptionTitle) && (
              <h2 className="mb-2 text-lg font-bold text-gray-900">
                {activeTabData?.descriptionTitle ?? feature.descriptionTitle}
              </h2>
            )}
            <p className="text-[15px] leading-relaxed text-gray-700 whitespace-pre-line">
              {activeTabData?.description ?? activeTabData?.caption ?? feature.description}
            </p>
          </div>
        )}

        {/* 세부 기능 (아코디언) */}
        {feature.subFeatures && feature.subFeatures.length > 0 && (!tabs || activeTab === 0) && (
          <div className="mb-4 rounded-[14px] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] sm:mb-5">
            <h2 className="mb-1 text-lg font-bold text-gray-900">
              {feature.subFeaturesTitle || "세부 기능"}
            </h2>
            {feature.subFeaturesSubtitle && (
              <p className="mb-3 text-[14px] leading-relaxed text-gray-500 whitespace-pre-line">
                {feature.subFeaturesSubtitle}
              </p>
            )}
            <Accordion type="single" collapsible className="w-full">
              {feature.subFeatures.map((sub, index) => (
                <AccordionItem key={index} value={`v-sub-${index}`} className="border-b border-gray-100">
                  <AccordionTrigger className="py-3 text-left hover:no-underline">
                    <span className="flex min-w-0 items-center gap-2.5">
                      {sub.step && (
                        <span className="flex-shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[12px] font-bold text-brand-accent">
                          {sub.step}
                        </span>
                      )}
                      <span className="text-[15px] font-semibold text-gray-900">{sub.label}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    {sub.title && (
                      <h3 className="mb-1.5 text-[15px] font-bold text-gray-900">{sub.title}</h3>
                    )}
                    <p className="mb-3 text-[14px] leading-relaxed text-gray-600 whitespace-pre-line">
                      {sub.description}
                    </p>
                    {sub.mediaUrl && (
                      <div className="overflow-hidden rounded-xl bg-black" onClick={onVideoClick}>
                        <MediaViewer
                          mediaType={sub.mediaType || "video"}
                          mediaUrl={sub.mediaUrl}
                          title={sub.title}
                          isShorts={sub.isShorts}
                          fallbackUrl={sub.fallbackUrl}
                        />
                      </div>
                    )}
                    {sub.disclaimers && sub.disclaimers.length > 0 && (
                      <div className="mt-4">
                        {renderCollapsible(sub.disclaimers, `v-sub-${index}-disc`, true)}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {/* 적용 코스 캐러셀 */}
        {feature.courses && feature.courses.length > 0 && (
          <section className="mb-6 sm:mb-8">
            <h2 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4">
              트루스팀 적용 코스
            </h2>
            <div className="group relative">
              <div className="overflow-hidden rounded-[14px]" ref={emblaRef}>
                <div className="flex">
                  {feature.courses.map((course, index) => (
                    <div key={index} className="min-w-0 flex-[0_0_100%] pl-0">
                      <div className="flex flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] md:flex-row">
                        <div className="h-1 w-full bg-brand-accent md:hidden" />
                        <div className="w-full bg-gray-50 md:w-3/5">
                          <SafeImage
                            src={course.imageUrl}
                            alt={course.imageAlt || course.name}
                            loading="lazy"
                            decoding="async"
                            className="h-auto w-full object-cover"
                          />
                        </div>
                        <div className="hidden w-1 flex-shrink-0 bg-brand-accent md:block" />
                        <div className="flex w-full flex-col justify-center p-5 sm:p-6 md:w-2/5">
                          <span className="mb-2 inline-block self-start rounded-full bg-gray-100 px-2.5 py-1 text-[12px] font-bold text-brand-accent">
                            {course.type || "코스"}
                          </span>
                          <h3 className="mb-2 text-base font-bold text-gray-900 sm:text-lg">
                            {course.name}
                          </h3>
                          <p className="text-[15px] leading-relaxed text-gray-600">
                            {course.description}
                          </p>
                          {course.disclaimers && course.disclaimers.length > 0 && (
                            <div className="mt-4">
                              {renderCollapsible(course.disclaimers, `course-${index}-disc`, true)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {feature.courses.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={scrollCoursePrev}
                    disabled={!canScrollPrev}
                    className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md backdrop-blur transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-30 sm:h-10 sm:w-10"
                    aria-label="이전 코스"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={scrollCourseNext}
                    disabled={!canScrollNext}
                    className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md backdrop-blur transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-30 sm:h-10 sm:w-10"
                    aria-label="다음 코스"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  <div className="mt-4 flex justify-center gap-2">
                    {feature.courses.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === courseIndex ? "w-4 bg-brand-accent" : "w-2 bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`${index + 1}번째 코스로 이동`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {/* 핵심만 쏙 */}
        {highlights.length > 0 && (
          <div className="mb-8 rounded-[14px] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] sm:mb-10">
            <h2 className="mb-4 text-lg font-bold text-gray-900">핵심만 쏙</h2>
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((highlight, index) => {
                const detail = feature.highlightDetails?.[highlight];
                if (detail) {
                  return (
                    <div key={index} className="col-span-2 overflow-hidden rounded-xl bg-gray-50 p-4 sm:p-5">
                      <h3 className="mb-2 text-base font-bold text-gray-900 sm:text-lg">{detail.title}</h3>
                      <p className="mb-3 text-[15px] leading-relaxed text-gray-600 whitespace-pre-line sm:mb-4">
                        {detail.description}
                      </p>
                      <div className="overflow-hidden rounded-xl bg-black" onClick={onVideoClick}>
                        <MediaViewer
                          mediaType={detail.mediaType}
                          mediaUrl={detail.mediaUrl}
                          title={detail.title}
                          isShorts={detail.isShorts}
                          fallbackUrl={detail.fallbackUrl}
                        />
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={index} className="flex items-center gap-2 rounded-xl bg-gray-50 p-3">
                    <Check className="h-[22px] w-[22px] flex-shrink-0 text-brand-accent" />
                    <span className="text-[15.4px] font-medium leading-snug text-gray-800">{highlight}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 세부정보 / 디스클레이머 */}
        {(() => {
          const collapsible = [
            ...(activeTabData?.collapsibleDisclaimers ?? []),
            ...(feature.mediaCollapsibleDisclaimers ?? []),
            ...(feature.collapsibleDisclaimers ?? []),
          ];
          const flat = [
            ...(feature.mediaDisclaimers ?? []),
            ...(feature.disclaimers ?? []),
          ];
          if (collapsible.length === 0 && flat.length === 0) return null;
          return (
            <div className="mb-8 px-1 sm:mb-10">
              {renderFlat(flat)}
              {renderCollapsible(collapsible, "v-disc", groupedDisclaimers)}
            </div>
          );
        })()}

        <div className="text-center">
          <Link
            to={`/product/${productId}`}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-6 py-3 text-base font-semibold text-white shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
          >
            <span>←</span>
            <span>전체 특장점으로 돌아가기</span>
          </Link>
        </div>
      </PageContainer>
    );
  };

  if (!feature || !product || !isProductVisible(productId || "")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6]">
        <div className="text-center">
          <h1 className="text-xl text-gray-900 mb-4">특장점을 찾을 수 없습니다</h1>
          <Link to={`/product/${productId}`} className="text-brand-accent font-medium">
            ← 특장점 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <FeatureDetailLayout
        feature={feature}
        product={product}
        productId={productId || ""}
        onVideoClick={handleVideoClick}
      />
    </div>
  );
};

export default FeatureDetail;
