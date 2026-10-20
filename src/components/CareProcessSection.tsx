import { useEffect, useRef, useState } from "react";
import { ChevronRight, Play, Image as ImageIcon, ChevronLeft } from "lucide-react";
import type { CareProcessPlan, CareMediaType } from "@/data/careProcess";
import SafeImage from "@/components/SafeImage";

/**
 * 케어 목록형 상세 섹션 (제품 공통 재사용)
 * - 왼쪽: 선택한 케어의 큰 미디어(사진/영상 전환), 오른쪽: 케어 항목 세로 목록
 * - 케어 개수·순서·콘텐츠는 careProcess.ts 데이터에서 관리
 */
const CareProcessSection = ({ plan }: { plan: CareProcessPlan }) => {
  const steps = [...plan.careServices].sort((a, b) => a.displayOrder - b.displayOrder);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaType, setMediaType] = useState<CareMediaType>(plan.defaultMediaType);
  const [imageIndex, setImageIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const active = steps[activeIndex];
  const images = [active.representativeImageUrl, ...(active.detailImageUrls ?? [])];
  const activeVideoUrl = active.videoUrl ?? plan.commonVideoUrl;
  const hasVideo = !!activeVideoUrl;

  // 단계 전환 시: 사진 모드 복귀 + 영상 정지 + 첫 이미지
  useEffect(() => {
    setMediaType(plan.defaultMediaType);
    setImageIndex(0);
    videoRef.current?.pause();
  }, [activeIndex, plan.defaultMediaType]);

  const selectMedia = (type: CareMediaType) => {
    if (type === "image") videoRef.current?.pause();
    setMediaType(type);
  };

  return (
    <section className="mb-4 rounded-[14px] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] sm:mb-5 sm:p-6">
      {/* 상단 타이틀 */}
      <h2 className="mb-4 text-[17px] font-bold text-gray-900 sm:text-[20px]">{plan.title}</h2>

      <div className="grid gap-5 lg:grid-cols-[3fr_2fr] lg:gap-6">
        {/* 왼쪽: 미디어 영역 */}
        <div className="min-w-0">
          {/* 선택한 케어 제목 + 설명 */}
          <h3 className="text-[17px] font-bold text-gray-900 sm:text-[18px]">
            {active.benefitText}
          </h3>
          <div className="mt-1.5 h-0.5 w-8 rounded-full bg-brand" aria-hidden />
          <p className="mt-2.5 text-[14px] leading-relaxed text-gray-700 sm:text-[15px]">
            {active.description}
          </p>

          {/* 사진/영상 전환 버튼 */}
          <div className="mt-3.5 flex gap-1.5">
            <button
              type="button"
              onClick={() => selectMedia("image")}
              aria-pressed={mediaType === "image"}
              className={`flex min-h-[40px] items-center gap-1.5 rounded-full border px-4 text-[13px] font-medium transition-colors ${
                mediaType === "image"
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-gray-200 bg-white text-gray-600"
              }`}
            >
              <ImageIcon className="h-3.5 w-3.5" aria-hidden />
              사진
            </button>
            <button
              type="button"
              onClick={() => hasVideo && selectMedia("video")}
              disabled={!hasVideo}
              aria-pressed={mediaType === "video"}
              className={`flex min-h-[40px] items-center gap-1.5 rounded-full border px-4 text-[13px] font-medium transition-colors ${
                mediaType === "video"
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-gray-200 bg-white text-gray-600"
              } disabled:cursor-not-allowed disabled:opacity-40`}
            >
              <Play className="h-3.5 w-3.5" aria-hidden />
              영상
            </button>
          </div>

          {/* 메인 미디어 (16:9) */}
          <div className="relative mt-3 aspect-video w-full overflow-hidden rounded-[14px] bg-gray-100">
            {mediaType === "video" && hasVideo ? (
              <video
                ref={videoRef}
                key={activeVideoUrl}
                src={activeVideoUrl}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-contain"
              />
            ) : (
              <SafeImage
                key={images[imageIndex]}
                src={images[imageIndex]}
                alt={active.careServiceName}
                className="h-full w-full object-contain"
              />
            )}
            {/* 이미지가 여러 장일 때 좌우 탐색 */}
            {mediaType === "image" && images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="이전 사진"
                  onClick={() => setImageIndex((i) => (i - 1 + images.length) % images.length)}
                  className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-800" />
                </button>
                <button
                  type="button"
                  aria-label="다음 사진"
                  onClick={() => setImageIndex((i) => (i + 1) % images.length)}
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-md"
                >
                  <ChevronRight className="h-5 w-5 text-gray-800" />
                </button>
              </>
            )}
          </div>

          {/* 썸네일 (이미지 여러 장일 때) */}
          {mediaType === "image" && images.length > 1 && (
            <div className="mt-2.5 flex gap-2 overflow-x-auto scrollbar-hide">
              {images.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageIndex(idx)}
                  aria-label={`사진 ${idx + 1}`}
                  className={`aspect-video w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    idx === imageIndex ? "border-brand" : "border-transparent"
                  }`}
                >
                  <SafeImage src={url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {(active.careCycle || active.disclaimer) && (
            <div className="mt-3">
              {active.careCycle && (
                <p className="text-[12px] text-muted-foreground">제공 주기: {active.careCycle}</p>
              )}
              {active.disclaimer && (
                <p className="mt-1 text-[11px] text-muted-foreground">* {active.disclaimer}</p>
              )}
            </div>
          )}
        </div>

        {/* 오른쪽: 케어 항목 세로 목록 */}
        <div role="tablist" aria-label="케어 항목" className="flex flex-col gap-1 lg:border-l lg:border-gray-100 lg:pl-5">
          {steps.map((step, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={step.careServiceId}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveIndex(idx)}
                className={`flex min-h-[52px] items-center justify-between gap-2 rounded-full px-5 text-left transition-colors ${
                  isActive
                    ? "bg-brand text-brand-foreground"
                    : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                <span className={`text-[15px] ${isActive ? "font-semibold" : "font-medium"}`}>
                  {step.careServiceName}
                </span>
                <ChevronRight
                  className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-brand-foreground/80" : "text-gray-300"}`}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* 디스클레이머 (클릭하면 열림) */}
      {plan.disclaimers && (
        <details className="group mt-4 rounded-lg border border-gray-200 bg-gray-50">
          <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-2 px-4 py-2.5 text-[13px] font-semibold text-gray-700 [&::-webkit-details-marker]:hidden">
            {plan.disclaimers.title}
            <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-90" aria-hidden />
          </summary>
          <p className="whitespace-pre-line border-t border-gray-200 px-4 py-3 text-[12px] leading-relaxed text-muted-foreground">
            {plan.disclaimers.text}
          </p>
        </details>
      )}
    </section>
  );
};

export default CareProcessSection;
