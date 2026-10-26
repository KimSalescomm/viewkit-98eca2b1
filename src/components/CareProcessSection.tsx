import { useEffect, useRef, useState } from "react";
import { ChevronRight, Play, Image as ImageIcon, ChevronLeft } from "lucide-react";
import type { CareProcessPlan, CareMediaType } from "@/data/careProcess";
import SafeImage from "@/components/SafeImage";
import useCareVideoSegments from "@/hooks/useCareVideoSegments";
import { hasReachedEnd, resolveVideoUrl } from "@/utils/careVideoSegments";

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
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pendingSeekRef = useRef<number | null>(null);
  const { segments } = useCareVideoSegments(plan.productId);

  const active = steps[activeIndex];
  const images = [active.representativeImageUrl, ...(active.detailImageUrls ?? [])];
  const segment = segments[active.careServiceId];
  const activeVideoUrl = resolveVideoUrl(segment, active.videoUrl, plan.commonVideoUrl);
  const hasVideo = !!activeVideoUrl;

  // 단계 전환 시: 사진 모드 복귀 + 영상 정지 + 첫 이미지
  useEffect(() => {
    setMediaType(plan.defaultMediaType);
    setImageIndex(0);
    setVideoError(false);
    videoRef.current?.pause();
  }, [activeIndex, plan.defaultMediaType]);

  // 영상 모드 진입 시: 설정된 구간의 시작 위치로 이동 후 자동 재생
  useEffect(() => {
    if (mediaType !== "video") return;
    const target = segment?.startSeconds ?? 0;
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 1) {
      video.currentTime = target;
      void video.play().catch(() => {});
    } else {
      pendingSeekRef.current = target;
    }
  }, [mediaType, activeIndex, segment]);

  const selectMedia = (type: CareMediaType) => {
    if (type === "image") videoRef.current?.pause();
    setMediaType(type);
  };

  return (
    <section className="mb-4 rounded-[14px] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] sm:mb-5 sm:p-6">
      {/* 상단 타이틀 */}
      <h2 className="text-[17px] font-bold text-gray-900 sm:text-[20px]">{plan.title}</h2>
      <p className="mt-1 mb-4 text-[14px] leading-relaxed text-gray-600">{plan.subtitle}</p>

      {/* 상단 케어 메뉴: 가로형 캡슐 탭, 공간 부족 시 줄바꿈 (스크롤 없음) */}
      <div role="tablist" aria-label="케어 항목" className="flex flex-wrap gap-1.5 lg:flex-nowrap lg:gap-1">
        {steps.map((step, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={step.careServiceId}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(idx)}
              className={`min-h-[40px] flex-auto whitespace-nowrap rounded-full border px-[clamp(8px,1.1vw,16px)] text-[clamp(12px,1.15vw,14px)] lg:min-h-[36px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 ${
                isActive
                  ? "border-brand-accent bg-brand-accent font-semibold text-brand-accent-foreground"
                  : "border-gray-200 bg-white font-medium text-gray-800 hover:bg-gray-50"
              }`}
            >
              {step.careServiceName}
            </button>
          );
        })}
      </div>

      {/* 사진/영상 슬라이딩 토글 */}
      <div className="mt-4 flex justify-end">
        <div className="relative grid grid-cols-2 rounded-full bg-gray-100 p-1" role="group" aria-label="미디어 유형 선택">
          <div
            aria-hidden
            className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-brand-accent shadow-sm transition-transform duration-300 ease-out ${
              mediaType === "video" ? "translate-x-full" : "translate-x-0"
            }`}
          />
          {(["image", "video"] as CareMediaType[]).map((type) => {
            const isOn = mediaType === type;
            const disabled = type === "video" && !hasVideo;
            return (
              <button
                key={type}
                type="button"
                onClick={() => !disabled && selectMedia(type)}
                disabled={disabled}
                aria-pressed={isOn}
                className={`relative z-10 flex h-9 min-w-[92px] items-center justify-center gap-1.5 rounded-full px-4 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 disabled:cursor-not-allowed disabled:opacity-40 ${
                  isOn ? "text-brand-accent-foreground" : "text-gray-500"
                }`}
              >
                {type === "image" ? <ImageIcon className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
                {type === "image" ? "사진" : "영상"}
              </button>
            );
          })}
        </div>
      </div>

      {/* 메인 미디어 (16:9, 카드 가로 너비) */}
      <div className="relative mt-3 aspect-video w-full overflow-hidden rounded-[14px] bg-gray-50">
        {mediaType === "video" && hasVideo ? (
          videoError ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 px-6 text-center">
              <p className="text-[14px] font-semibold text-gray-800">영상을 불러오지 못했습니다.</p>
              <p className="text-[12px] text-muted-foreground">네트워크 연결을 확인한 뒤 다시 시도해 주세요.</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              key={`${active.careServiceId}-${activeVideoUrl}`}
              src={activeVideoUrl}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
              onLoadedMetadata={(e) => {
                if (pendingSeekRef.current !== null) {
                  e.currentTarget.currentTime = pendingSeekRef.current;
                  void e.currentTarget.play().catch(() => {});
                  pendingSeekRef.current = null;
                }
              }}
              onTimeUpdate={(e) => {
                // 설정된 종료 시점에 도달하면 자동 일시정지
                if (hasReachedEnd(e.currentTarget.currentTime, segment?.endSeconds ?? null)) {
                  e.currentTarget.pause();
                }
              }}
              onPlay={(e) => {
                // 구간 끝에서 다시 재생하면 구간 시작 위치부터 재생
                const v = e.currentTarget;
                if (segment && hasReachedEnd(v.currentTime, segment.endSeconds)) {
                  v.currentTime = segment.startSeconds;
                }
              }}
              onError={() => setVideoError(true)}
            />
          )
        ) : (
          <SafeImage
            key={images[imageIndex]}
            src={images[imageIndex]}
            alt={active.careServiceName}
            className="h-full w-full object-contain"
          />
        )}
        {mediaType === "image" && images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="이전 사진"
              onClick={() => setImageIndex((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90"
            >
              <ChevronLeft className="h-5 w-5 text-gray-800" />
            </button>
            <button
              type="button"
              aria-label="다음 사진"
              onClick={() => setImageIndex((i) => (i + 1) % images.length)}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90"
            >
              <ChevronRight className="h-5 w-5 text-gray-800" />
            </button>
          </>
        )}
      </div>

      {mediaType === "image" && images.length > 1 && (
        <div className="mt-2.5 flex flex-wrap gap-2">
          {images.map((url, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setImageIndex(idx)}
              aria-label={`사진 ${idx + 1}`}
              className={`aspect-video w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                idx === imageIndex ? "border-brand-accent" : "border-transparent"
              }`}
            >
              <SafeImage src={url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* 케어 설명 (영상 모드에서는 숨김) */}
      {mediaType === "image" && (
        <>
          <h3 className="mt-4 text-[17px] font-bold text-gray-900 sm:text-[18px]">{active.benefitText}</h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-gray-600 sm:text-[15px]">{active.description}</p>
          {(active.careCycle || active.disclaimer) && (
            <div className="mt-2">
              {active.careCycle && (
                <p className="text-[12px] text-muted-foreground">제공 주기: {active.careCycle}</p>
              )}
              {active.disclaimer && (
                <p className="mt-1 text-[11px] text-muted-foreground">* {active.disclaimer}</p>
              )}
            </div>
          )}
        </>
      )}

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
