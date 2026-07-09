import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MediaViewer from "@/components/MediaViewer";
import FeatureIcon from "@/components/FeatureIcon";
import OrientationToggle from "@/components/OrientationToggle";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";
import { useContent } from "@/contexts/ContentContext";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FeatureDetail = () => {
  const { productId, id } = useParams<{ productId: string; id: string }>();
  const { trackDetailView, trackVideoClick } = useAnalyticsContext();
  const { getFeatureById, getProductById } = useContent();

  const feature = getFeatureById(productId || "", id || "");
  const product = getProductById(productId || "");
  const tabs = feature?.tabs;

  const [activeTab, setActiveTab] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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

  if (!feature || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <h1 className="text-xl text-gray-900 mb-4">특장점을 찾을 수 없습니다</h1>
          <Link to={`/product/${productId}`} className="text-blue-600 font-medium">
            ← 특장점 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4 z-50">
        <div className="max-w-xl mx-auto sm:max-w-4xl">
          <div className="flex items-center justify-between">
            <Link
              to={`/product/${productId}`}
              className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 text-xs sm:text-sm transition-colors"
            >
              <span>←</span>
              <span>{product.name} 특장점으로 돌아가기</span>
            </Link>
            <OrientationToggle />
          </div>
          <div className="text-center mt-1 sm:mt-2">
            <span className="text-lg sm:text-2xl font-black tracking-wider uppercase text-gray-800">
              VIEW KIT
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 sm:px-6 sm:py-8 max-w-xl mx-auto sm:max-w-4xl">
        {/* Feature Header */}
        <div className="flex items-start gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
            <FeatureIcon iconKey={feature.icon} className="text-white w-8 h-8 sm:w-12 sm:h-12" />
          </div>
          <div className="min-w-0">
            {feature.title && (
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                {feature.title}
              </h1>
            )}
            <p className="text-sm sm:text-lg text-gray-500 whitespace-pre-line leading-relaxed">
              {feature.subtitle}
            </p>
          </div>
        </div>

        {/* Tabs (only when feature.tabs exists) */}
        {tabs && tabs.length > 0 && (
          feature.tabsVariant === "underline" ? (
            <div className="mb-4 sm:mb-5 flex w-full border-b border-gray-200">
              {tabs.map((tab, idx) => {
                const isActive = idx === activeTab;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`flex-1 min-h-[44px] px-3 sm:px-4 text-sm sm:text-base transition-colors -mb-px border-b-2 ${
                      isActive
                        ? "font-bold text-[#A50034] border-[#A50034]"
                        : "font-medium text-black border-transparent"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mb-4 sm:mb-5 flex flex-wrap gap-2 justify-center">
              {tabs.map((tab, idx) => {
                const isActive = idx === activeTab;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-200 hover:border-blue-400 hover:text-blue-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )
        )}

        {/* Media - video_click 이벤트용 래퍼 */}
        <div className="mb-3 sm:mb-4 relative" onClick={handleVideoClick}>
          <MediaViewer
            key={tabs ? `tab-${activeTab}` : "main"}
            mediaType={activeTabData?.mediaSlides ? "gallery" : activeTabData?.mediaType ?? feature.mediaType}
            mediaUrl={activeTabData?.mediaUrl ?? feature.mediaUrl}
            mediaSlides={activeTabData?.mediaSlides ?? feature.mediaSlides}
            title={feature.title}
            tableData={feature.tableData}
            galleryImages={feature.galleryImages}
            isShorts={activeTabData?.isShorts ?? feature.isShorts}
            fallbackUrl={activeTabData?.fallbackUrl ?? feature.fallbackUrl}
          />
        </div>

        {/* Below-media image (e.g. certification marks) — click to open lightbox */}
        {(() => {
          const belowImg = activeTabData?.belowMediaImage ?? feature.belowMediaImage;
          if (!belowImg) return null;
          return (
            <figure className="mb-6 sm:mb-8">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label={`${belowImg.alt || "인증 마크"} 확대 보기`}
                className="block w-full rounded-2xl overflow-hidden bg-white shadow-md transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-zoom-in"
              >
                <img
                  src={belowImg.url}
                  alt={belowImg.alt || ""}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain"
                />
              </button>
              {belowImg.caption && (
                <figcaption className="mt-2 text-xs sm:text-sm text-gray-500 text-center leading-relaxed">
                  {belowImg.caption}
                </figcaption>
              )}
            </figure>
          );
        })()}

        {/* Lightbox for certification badges */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-5xl p-2 sm:p-4 bg-white">
            <DialogTitle className="sr-only">인증 마크 확대 보기</DialogTitle>
            {(() => {
              const belowImg = activeTabData?.belowMediaImage ?? feature.belowMediaImage;
              if (!belowImg) return null;
              return (
                <img
                  src={belowImg.url}
                  alt={belowImg.alt || ""}
                  className="w-full h-auto object-contain rounded-lg"
                />
              );
            })()}
          </DialogContent>
        </Dialog>

        {/* Tab caption (underline variant) */}
        {activeTabData?.caption && (
          <p className="mb-6 sm:mb-8 text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line">
            {activeTabData.caption}
          </p>
        )}


        {/* Description Card: active tab description takes precedence */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 mb-4 sm:mb-6 shadow-md">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{feature.descriptionTitle || "설명 더 보기"}</h2>
          <p className="text-sm sm:text-base text-gray-600 leading-snug whitespace-pre-line">
            {activeTabData?.description ?? feature.description}
          </p>
        </div>

        {/* Pull quote */}
        {feature.pullQuote && (
          <blockquote className="relative bg-gradient-to-br from-gray-50 to-blue-50/50 border border-gray-100 rounded-2xl px-6 py-8 sm:px-10 sm:py-12 mb-4 sm:mb-6 text-center">
            <span
              aria-hidden="true"
              className="block text-4xl sm:text-5xl leading-none text-blue-400/70 font-serif mb-2 sm:mb-3"
            >
              &ldquo;
            </span>
            <p className="text-lg sm:text-2xl font-semibold text-gray-800 leading-relaxed whitespace-pre-line">
              {feature.pullQuote}
            </p>
          </blockquote>
        )}



        {/* Highlights Card: active tab highlights take precedence */}
        {(activeTabData?.highlights ?? feature.highlights) && (activeTabData?.highlights ?? feature.highlights)?.length > 0 && (
          <div className="bg-white rounded-2xl p-5 sm:p-6 mb-10 sm:mb-12 shadow-md">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">핵심만 쏙</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {(activeTabData?.highlights ?? feature.highlights).map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-xl"
                >
                  <span className="text-blue-600 font-bold text-base sm:text-lg">✓</span>
                <span className="text-sm sm:text-base text-gray-800 font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimers */}
        {feature.disclaimers && feature.disclaimers.length > 0 && (
          <div className="mb-4 sm:mb-6 px-1">
            <ul className="space-y-1">
              {feature.disclaimers.map((text, index) => (
                <li key={index} className="text-[10px] sm:text-[11px] text-muted-foreground leading-relaxed">
                  * {text}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Disclaimers (collapsible accordion) */}
        {feature.collapsibleDisclaimers && feature.collapsibleDisclaimers.length > 0 && (
          <div className="mb-10 sm:mb-12 px-1">
            <Accordion type="multiple" className="w-full">
              {feature.collapsibleDisclaimers.map((item, index) => (
                <AccordionItem key={index} value={`disclaimer-${index}`} className="border-b border-gray-200">
                  <AccordionTrigger className="text-[11px] sm:text-xs text-muted-foreground font-bold py-3 hover:no-underline text-left">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ol className="space-y-1 list-none pt-1 pb-2">
                      {item.items.map((text, i) => (
                        <li key={i} className="text-[10px] sm:text-[11px] text-muted-foreground leading-relaxed whitespace-pre-line">
                          {"①②③④⑤⑥⑦⑧⑨⑩"[i] || `${i + 1}.`} {text}
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {/* Back Button */}
        <div className="text-center">
          <Link
            to={`/product/${productId}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>←</span>
            <span>전체 특장점으로 돌아가기</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureDetail;
