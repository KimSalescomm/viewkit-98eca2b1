import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Sparkles, ImageIcon, X, Play } from "lucide-react";
import OrientationToggle from "@/components/OrientationToggle";
import BackButton from "@/components/BackButton";
import PageContainer from "@/components/PageContainer";
import FeatureTabs from "@/components/FeatureTabs";
import CareSegmentVideo from "@/components/CareSegmentVideo";
import { careItemId } from "@/data/careCatalog";

import FeatureLikeButton from "@/components/FeatureLikeButton";
import { logFeatureReaction } from "@/utils/featureReactionLog";
import { useAnalyticsContext } from "@/components/AnalyticsProvider";
import { convertToEmbedUrl } from "@/utils/videoUtils";
import {
  typeDisplay,
  typeHeading,
  typeSectionTitle,
  typeBody,
  typeBodyMedium,
  typeBodySemibold,
  typeCaption,
  typeCaptionBold,
  labelEyebrow,
  actionPill,
  actionIconPill,
  actionIconSize,
} from "@/styles/typeScale";

import { subscriptionProducts, airconPlanContents, washerPlanContents, type CareStep } from "@/data/subscriptionCare";
export { subscriptionProducts, airconPlanContents, washerPlanContents } from "@/data/subscriptionCare";
type AirconPlanId = "premium" | "litePlus";
type WasherPlanId = "premium" | "litePlus";

const youtubeThumbnail = (url: string): string => {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : "";
};

const Subscription = () => {
  const [searchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState<string>("washer");
  const { trackEvent } = useAnalyticsContext();
  const handleTabClick = (productId: string, productName: string) => {
    if (productId === selectedId) return;
    setSelectedId(productId);
    trackEvent("subscription_tab_click", { product_id: productId, product_name: productName });
    logFeatureReaction({
      productId: "subscription",
      productName: "구독 케어",
      featureId: `tab_${productId}`,
      featureTitle: `${productName} 탭`,
    });
  };
  const [previewStep, setPreviewStep] = useState<CareStep | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const selected = subscriptionProducts.find((p) => p.id === selectedId) ?? subscriptionProducts[0];
  const hasAnyImage = selected.careSteps.some((s) => s.image);
  // 라이트플러스 요금제는 당분간 미노출(데이터는 보존). 다시 노출하려면 true로 변경.
  const LITE_PLUS_ENABLED = true;
  const visibleAirconPlans = LITE_PLUS_ENABLED
    ? airconPlanContents
    : airconPlanContents.filter((p) => p.plan !== "litePlus");
  const visibleWasherPlans = LITE_PLUS_ENABLED
    ? washerPlanContents
    : washerPlanContents.filter((p) => p.plan !== "litePlus");

  const [airconPlanId, setAirconPlanId] = useState<AirconPlanId>("premium");
  const isAircon = selected.id === "airconditioner";
  const airconPlan = isAircon
    ? airconPlanContents.find((p) => p.plan === airconPlanId)
    : undefined;
  const isAirconLite = LITE_PLUS_ENABLED && isAircon && airconPlanId === "litePlus";

  const [washerPlanId, setWasherPlanId] = useState<WasherPlanId>("premium");
  const isWasher = selected.id === "washer";
  const washerPlan = isWasher
    ? washerPlanContents.find((p) => p.plan === washerPlanId)
    : undefined;
  // 프리미엄/라이트플러스 모두 Before/After 그리드.
  // After 썸네일 영상: 요금제 videoUrl(라이트플러스=YouTube) 우선, 없으면 제품 공통 케어 영상.
  const planCareVideo = isWasher
    ? washerPlan?.videoUrl || selected.careVideo
    : isAircon
    ? airconPlan?.videoUrl || selected.careVideo
    : selected.careVideo;
  // 요금제별 Before/After 이미지 (에어컨 라이트플러스는 전용 이미지 사용)
  const planBeforeImage =
    isAircon && airconPlan?.beforeAfterImages
      ? airconPlan.beforeAfterImages.before
      : isWasher && washerPlan?.beforeAfterImages
      ? washerPlan.beforeAfterImages.before
      : selected.beforeImage;
  const planAfterImage =
    isAircon && airconPlan?.beforeAfterImages
      ? airconPlan.beforeAfterImages.after
      : isWasher && washerPlan?.beforeAfterImages
      ? washerPlan.beforeAfterImages.after
      : selected.afterImage;
  const planKey = isAircon ? airconPlanId : isWasher ? washerPlanId : "base";

  // Preload all before/after images on mount so tab switching is instant
  useEffect(() => {
    subscriptionProducts.forEach((p) => {
      [p.beforeImage, p.afterImage].forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []);

  // URL 쿼리(?tab=productId)로 진입 시 해당 제품 탭 선택
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && subscriptionProducts.some((p) => p.id === tab)) {
      setSelectedId(tab);
    }
  }, [searchParams]);


  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      <PageContainer as="main" verticalPadding="py-8 sm:py-12">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <BackButton />
          <div className="flex items-center gap-2">
            <OrientationToggle />
          </div>
        </div>

        {/* Title */}
        <div className="mb-6 sm:mb-8 text-center">
          <p className={`${labelEyebrow} mb-2`}>
            CARE SERVICE
          </p>
          <h1 className={`${typeDisplay} text-gray-900`}>
            구독 케어 전·후 비교
          </h1>
          <p className={`${typeBody} text-gray-500 mt-2`}>
            제품을 선택하면 케어 전·후 변화와 케어 과정을 확인할 수 있습니다.
          </p>
        </div>


        {/* Category buttons */}
        <div className="-mx-5 sm:mx-0 mb-8 px-5 sm:px-0">
          <FeatureTabs
            tabs={subscriptionProducts.map((p) => ({ label: p.name }))}
            activeIndex={subscriptionProducts.findIndex((p) => p.id === selectedId)}
            onChange={(idx) => {
              const p = subscriptionProducts[idx];
              if (p) handleTabClick(p.id, p.name);
            }}
            scrollable
          />
        </div>


        {/* Section title */}
        {(() => {
          const sectionTitles: Record<string, string> = {
            washer: "세탁기 케어서비스",
            washcombo: "워시콤보 케어서비스",
            refrigerator: "냉장고 케어서비스",
            stem: "STEM 냉장고 케어서비스",
            airconditioner: "스탠드 에어컨 케어서비스",
            airpurifier: "공기청정기 케어서비스",
            cooktop: "전기레인지 케어서비스",
            dishwasher: "식기세척기 케어서비스",
            oven: "광파오븐 케어서비스",
            bathair: "바스에어시스템 케어서비스",
          };
          const title =
            isAircon && airconPlan
              ? airconPlan.title
              : isWasher && washerPlan
              ? washerPlan.title
              : sectionTitles[selected.id];
          if (!title) return null;
          return (
            <div className="mb-4 sm:mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className={`${typeSectionTitle} text-gray-900 flex items-center gap-3`}>
                <span
                  aria-hidden="true"
                  className="inline-block w-1 sm:w-1.5 h-5 sm:h-6 rounded-sm"
                  style={{ backgroundColor: "hsl(var(--brand-accent))" }}
                />
                {title}
              </h2>
              <div className="flex items-center gap-3">
                {((isAircon && visibleAirconPlans.length > 1) ||
                  (isWasher && visibleWasherPlans.length > 1)) && (
                  <div
                    role="tablist"
                    aria-label={isAircon ? "에어컨 요금제 선택" : "세탁기 요금제 선택"}
                    className="inline-flex items-center rounded-full border border-gray-200 bg-white p-0.5"
                  >
                    {(isAircon ? visibleAirconPlans : visibleWasherPlans).map((p) => {
                      const active = isAircon
                        ? p.plan === airconPlanId
                        : p.plan === washerPlanId;
                      return (
                        <button
                          key={p.plan}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() =>
                            isAircon
                              ? setAirconPlanId(p.plan as AirconPlanId)
                              : setWasherPlanId(p.plan as WasherPlanId)
                          }
                          className={`rounded-full px-3 h-7 text-[12px] font-semibold transition-colors ${
                            active ? "bg-gray-900 text-white" : "bg-transparent text-gray-500"
                          }`}
                        >
                          {p.planLabel}
                        </button>
                      );
                    })}
                  </div>
                )}
                <FeatureLikeButton
                  productId="subscription"
                  productName="구독 케어"
                  featureId={`care-before-after:${selected.id}${
                    isAircon && airconPlanId !== "premium"
                      ? `:${airconPlanId}`
                      : isWasher && washerPlanId !== "premium"
                        ? `:${washerPlanId}`
                        : ""
                  }`}
                  featureTitle={title}
                  variant="desktop"
                  className="shrink-0"
                />
              </div>
            </div>
          );
        })()}

        {/* Before / After */}
        {(!isAirconLite || !!airconPlan?.beforeAfterImages) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Before */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] flex flex-col h-full">
            <div className="px-5 pt-4 pb-3 flex items-center justify-between">
              <span className={`${typeCaptionBold} tracking-wider uppercase text-gray-400`}>
                Before
              </span>
              <span className={`${typeCaption} text-gray-500`}>케어 전</span>

            </div>
            <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
              <img
                key={`before-${selected.id}-${planKey}`}
                src={planBeforeImage}
                alt={`${selected.name} 케어 전`}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent pointer-events-none" />
            </div>
            {(() => {
              const beforeLabels: Record<string, string> = {
                washer: "세탁기 분해세척 전",
                washcombo: "워시콤보 분해세척 전",
                bathair: "바스에어시스템 팬 분해세척 전",
                refrigerator: "기계실 세척 전",
                stem: "기계실 세척 전",
                airconditioner: "열교환기 세척 전",
                airpurifier: "필터 교체 & 클리닝 전",
                cooktop: "코팅 및 광택 서비스 전",
                oven: "내부 클리닝 전",
                dishwasher: "필터 클리닝 전",
              };
              const label = isAirconLite ? "팬 & 필터 세척 전" : beforeLabels[selected.id];
              if (!label) return null;
              return (
                <div className="bg-white border-t border-gray-50 flex-1 flex items-center justify-center px-5 py-6 min-h-[56px]">
                  <span className={`${typeBodyMedium} text-gray-900 text-center`}>{label}</span>
                </div>
              );
            })()}
          </div>

          {/* After + Care Steps */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
            <div className="px-5 pt-4 pb-3 flex items-center justify-between">
              <span className={`${typeCaptionBold} tracking-wider uppercase text-brand-accent`}>
                After
              </span>
              <span className={`${typeCaption} text-brand-accent`}>케어 후</span>

            </div>
            <div className="relative aspect-[4/3] bg-gray-100">
              {planCareVideo ? (
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  className="group block w-full h-full overflow-hidden relative"
                  aria-label={`${selected.name} 케어 영상 재생`}
                >
                  <img
                    key={`after-${selected.id}-${planKey}`}
                    src={planAfterImage}
                    alt={`${selected.name} 케어 후`}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0.05) 45%, transparent)" }}
                  />
                  {/* (Center play button removed — image-first display) */}
                  {/* Hint chip */}
                  <div className={`absolute left-3 bottom-3 inline-flex items-center gap-1 px-2.5 h-7 rounded-lg ${typeCaptionBold} bg-brand-accent text-white shadow-md`}>
                    <Play className={actionIconSize} fill="currentColor" />
                    케어 영상 보기
                  </div>

                </button>
              ) : (
                <div className="overflow-hidden w-full h-full">
                  <img
                    key={`after-${selected.id}-${planKey}`}
                    src={planAfterImage}
                    alt={`${selected.name} 케어 후`}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to top, hsl(var(--brand-accent)/0.12), transparent)" }} />
                </div>
              )}
            </div>

            {/* Care Process */}
            <div className="px-5 py-5 border-t border-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className={`${typeHeading} text-gray-900 flex items-center gap-1.5`}>
                  <Sparkles className="w-4 h-4 text-brand-accent" />
                  {selected.name} 케어 과정
                </h3>
              </div>
              <ul className="space-y-2">
                {((isAircon && airconPlan && isAirconLite
                  ? airconPlan.steps.map((s) => ({ label: s.label, careServiceId: s.careServiceId }))
                  : isWasher && washerPlan
                  ? washerPlan.steps.map((s) => ({ label: s.label, careServiceId: s.careServiceId }))
                  : selected.careSteps
                ) as Array<{ label: string; careServiceId?: string; image?: string; notes?: string[] }>).map((step, i) => {
                  const clickable = !!step.image;
                  return (
                    <li key={i}>
                      {clickable ? (
                        <button
                          type="button"
                          onClick={() => setPreviewStep(step)}
                          className="group w-full text-left flex items-center gap-2.5 rounded-lg px-2.5 py-2 -mx-2.5 border border-gray-100 bg-white transition-all duration-200 hover:-translate-y-px hover:border-gray-200"
                        >
                          <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-brand-accent text-white">
                            <Check className="w-3 h-3" strokeWidth={3} />
                          </span>
                          <span className={`${typeBodyMedium} text-gray-900 flex-1`}>
                            {step.label}
                          </span>
                          <span className={`${actionPill} group-hover:brightness-110`}>
                            <ImageIcon className={actionIconSize} />
                            보기
                          </span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2.5 px-2.5 py-2 -mx-2.5 border border-transparent">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-brand-accent text-white">
                            <Check className="w-3 h-3" strokeWidth={3} />
                          </span>
                          <span className={`${typeBodyMedium} text-gray-900 flex-1`}>
                            {step.label}
                          </span>
                        </div>
                      )}
                      <CareSegmentVideo productId={selected.id} modelId={searchParams.get("modelId") ?? undefined} careServiceId={step.careServiceId ?? careItemId(step.label)} />
                    </li>
                  );

                })}
              </ul>
            </div>
          </div>
        </div>
        )}


        {/* Highlight banner */}
        <div
          className="mt-10 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 flex items-start gap-3"
          style={{ backgroundColor: "#F3F4F6", border: "1px solid #E5E7EB" }}
        >
          <span
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
            style={{ backgroundColor: "#4B5563", color: "#fff" }}
          >
            <Sparkles className="w-4 h-4" />
          </span>
          <p className={`${typeBodyMedium} text-gray-700`}>
            분해세척 제공 여부 등은 상세 내용은 '보기' 버튼을 클릭하면 확인할 수 있습니다. 이하 제공되는 서비스의 유무는 제품별 구독 타입(프리미엄, 라이트 플러스, 라이트 등) 및 구독 모델, 시점에 따라 다를 수 있으므로, 자세한 내용은 구독 계약할 때 반드시 다시 확인해 주세요.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <ul className="space-y-1.5 text-[12px] leading-relaxed text-gray-700 whitespace-nowrap overflow-x-auto">
            <li className="font-bold text-gray-900">* 이해를 돕기 위해 연출한 광고적 이미지로, 오염 여부 및 실제 케어서비스 결과는 사용 환경에 따라 다를 수 있습니다.</li>
            <li>* 케어서비스 항목은 구독한 제품의 모델, 계약 시점, 구독 타입(프리미엄, 라이트 플러스, 라이트 등)에 따라 다를 수 있으니, 자세한 내용은 구독 계약 시 반드시 확인하세요.</li>
            <li>* 고객 과실로 인한 제품 고장은 무상 A/S에서 제외되며 별도 비용이 발생할 수 있습니다.</li>
            <li>* 방문 관리는 사전 안내하며, 고객 요청 시 협의된 일정으로 변경할 수 있습니다.</li>
          </ul>
        </div>
      </PageContainer>

      {/* Lightbox modal */}
      {previewStep?.image && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/70 backdrop-blur-sm animate-in fade-in"
          onClick={() => setPreviewStep(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "hsl(var(--brand-accent))", color: "#fff" }}
                >
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                <h4 className={`${typeHeading} text-gray-900 flex items-baseline gap-2 flex-wrap`}>
                  <span>{previewStep.label}{previewStep.titleSuffix ? ` (${previewStep.titleSuffix})` : ""}</span>
                  {previewStep.disclaimer?.startsWith("프리미엄") && (
                    <span className="text-[70%] font-normal text-gray-400">
                      ({previewStep.disclaimer})
                    </span>
                  )}
                </h4>
              </div>
              <button
                onClick={() => setPreviewStep(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="relative bg-gray-50">
              <img
                src={previewStep.image}
                alt={previewStep.label}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
              {previewStep.disclaimer?.startsWith("프리미엄") && (
                <span
                  className="absolute top-3 left-3 sm:top-4 sm:left-4 px-[8px] py-[3px] sm:px-[10px] sm:py-[4px] rounded-sm text-[8px] sm:text-[12px] font-extrabold tracking-tight shadow-sm"
                  style={{
                    backgroundColor: "#695F55",
                    color: "#FFFFFF",
                    fontFamily: "'Noto Sans KR', sans-serif",
                  }}
                >
                  프리미엄
                </span>
              )}
            </div>
            {previewStep.disclaimer && !previewStep.disclaimer.startsWith("프리미엄") && (
              <div className="px-5 py-3 border-t border-gray-100 bg-white">
                <p className="text-[12px] leading-relaxed text-gray-500">
                  * {previewStep.disclaimer}
                </p>
              </div>
            )}
            {previewStep.notes && previewStep.notes.length > 0 && (
              <div className="px-5 py-4 border-t border-gray-100 bg-white">
                <ul className="space-y-1.5 text-[12px] leading-relaxed text-gray-500">
                  {previewStep.notes.map((n, i) => (
                    <li key={i}>* {n}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Care video modal */}
      {videoOpen && planCareVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-sm animate-in fade-in"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 bg-gray-900/80">
              <div className="flex items-center gap-2">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "hsl(var(--brand-accent))", color: "#fff" }}
                >
                  <Play className="w-3 h-3" fill="white" />
                </span>
                <h4 className="text-sm font-bold text-white">
                  {selected.name} 케어 영상
                </h4>
              </div>
              <button
                onClick={() => setVideoOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            {(() => {
              const { embedUrl, isYoutube } = convertToEmbedUrl(planCareVideo!);
              if (isYoutube) {
                const sep = embedUrl.includes("?") ? "&" : "?";
                return (
                  <div className="w-full aspect-video bg-black">
                    <iframe
                      src={`${embedUrl}${sep}autoplay=1&rel=0&playsinline=1`}
                      title={`${selected.name} 케어 영상`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                );
              }
              return (
                <video
                  src={planCareVideo}
                  className="w-full h-auto max-h-[80vh] bg-black"
                  controls
                  autoPlay
                  playsInline
                />
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
