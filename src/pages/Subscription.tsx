import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowLeft, Sparkles, ImageIcon, X, Play } from "lucide-react";
import OrientationToggle from "@/components/OrientationToggle";
import washcomboBefore from "@/assets/washcombo-before.png";
import washcomboAfter from "@/assets/washcombo-after.png";
import washerBefore from "@/assets/washercare-b.png";
import washerAfter from "@/assets/washercare-a.png";
import refrigeratorBefore from "@/assets/refrigerator-before.png";
import refrigeratorAfter from "@/assets/refrigerator-after.png";
import airconBefore from "@/assets/airconB.png";
import airconAfter from "@/assets/airconA.png";
import airpurifierBefore from "@/assets/aircB.png";
import airpurifierAfter from "@/assets/airA.png";
import inductionBefore from "@/assets/inductionB.png";
import inductionAfter from "@/assets/inductionA.png";
import ovenBefore from "@/assets/ovenB.png";
import ovenAfter from "@/assets/ovenA.png";

interface CareStep {
  label: string;
  image?: string;
  disclaimer?: string;
}

interface SubscriptionProduct {
  id: string;
  name: string;
  beforeImage: string;
  afterImage: string;
  careVideo?: string;
  careSteps: CareStep[];
}

const subscriptionProducts: SubscriptionProduct[] = [
  {
    id: "washer",
    name: "세탁기",
    beforeImage: washerBefore,
    afterImage: washerAfter,
    careVideo: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/washing_machines_250826.mp4",
    careSteps: [
      { label: "분해세척", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/img_washing_machines_250826_01.jpg", disclaimer: "프리미엄, 48개월 차에 1회 서비스" },
      { label: "세탁조 스팀 & UV 관리", image: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/img_washing_machines_250826_02.jpg" },
      { label: "고무패킹 교체", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/img_washing_machines_250826_03.jpg" },
      { label: "급/배수 필터 세척" },
      { label: "배수 필터 교체", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/img_washing_machines_250826_04.jpg" },
      { label: "세탁조 클리너 제공" },
      { label: "제품 성능 점검" },
      { label: "토탈 클리닝", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/img_washing_machines_250826_06.jpg" },
    ],
  },
  {
    id: "washcombo",
    name: "워시콤보",
    beforeImage: washcomboBefore,
    afterImage: washcomboAfter,
    careSteps: [
      { label: "드럼케어" },
      { label: "고무패킹 클리닝" },
      { label: "스팀케어" },
      { label: "건조필터 추가 제공" },
      { label: "배수 필터 거름망 클리닝 & 교체" },
      { label: "외관 클리닝" },
      { label: "무상 A/S" },
    ],
  },
  {
    id: "refrigerator",
    name: "냉장고",
    beforeImage: refrigeratorBefore,
    afterImage: refrigeratorAfter,
    careSteps: [
      { label: "기계실 세척" },
      { label: "토탈 클리닝" },
      { label: "제품 성능 점검" },
      { label: "무상 A/S" },
    ],
  },
  {
    id: "airconditioner",
    name: "에어컨",
    beforeImage: airconBefore,
    afterImage: airconAfter,
    careSteps: [
      { label: "분해세척" },
      { label: "위생케어 (피톤치드, UV케어)" },
      { label: "필터 세척 & 교체" },
      { label: "제품 성능 점검" },
      { label: "무상 A/S" },
    ],
  },
  {
    id: "airpurifier",
    name: "공기청정기",
    beforeImage: airpurifierBefore,
    afterImage: airpurifierAfter,
    careSteps: [
      { label: "필터 교체 & 필터 클리닝" },
      { label: "클린부스터 클리닝" },
      { label: "토탈 클리닝" },
      { label: "UV 살균" },
      { label: "모듈 점검" },
      { label: "무상 A/S" },
    ],
  },
  {
    id: "cooktop",
    name: "전기레인지",
    beforeImage: inductionBefore,
    afterImage: inductionAfter,
    careSteps: [
      { label: "코팅 및 광택 서비스" },
      { label: "토탈 클리닝" },
      { label: "상판 교체" },
      { label: "무상 재설치" },
      { label: "무상 A/S" },
    ],
  },
  {
    id: "oven",
    name: "광파오븐",
    beforeImage: ovenBefore,
    afterImage: ovenAfter,
    careSteps: [
      { label: "소모품 교체" },
      { label: "토탈 클리닝" },
      { label: "내부 클리닝" },
      { label: "무상 A/S" },
    ],
  },
];

const Subscription = () => {
  const [selectedId, setSelectedId] = useState<string>("washer");
  const [previewStep, setPreviewStep] = useState<CareStep | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const selected = subscriptionProducts.find((p) => p.id === selectedId)!;
  const hasAnyImage = selected.careSteps.some((s) => s.image);

  return (
    <div className="min-h-screen bg-[hsl(220,20%,97%)]">
      {/* GNB */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">VIEW KIT</span>
            </Link>
            <nav className="flex items-center gap-1">
              <span
                className="px-3 py-1.5 text-sm font-bold rounded-full border inline-flex items-center gap-1"
                style={{ color: "#A50034", backgroundColor: "#FBE8EE", borderColor: "#F5C9D5" }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                구독
              </span>
            </nav>
          </div>
          <OrientationToggle />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        {/* Title */}
        <div className="mb-6 sm:mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: "#A50034" }}>
            CARE SERVICE
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            구독 케어 전·후 비교
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            제품을 선택하면 케어 전·후 변화와 케어 과정을 확인할 수 있습니다.
          </p>
        </div>

        {/* Category buttons */}
        <div className="-mx-5 sm:mx-0 mb-8">
          <div className="flex sm:flex-wrap gap-2 overflow-x-auto px-5 sm:px-0 pb-2 scrollbar-hide">
            {subscriptionProducts.map((p) => {
              const active = p.id === selectedId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                    active
                      ? "text-white shadow-md"
                      : "bg-white text-gray-600 border-gray-200"
                  }`}
                  style={
                    active
                      ? {
                          backgroundColor: "#A50034",
                          borderColor: "#A50034",
                          color: "#ffffff",
                          boxShadow: "0 6px 16px -4px rgba(165,0,52,0.35)",
                        }
                      : undefined
                  }
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.borderColor = "#A50034";
                      e.currentTarget.style.color = "#A50034";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.color = "";
                    }
                  }}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Before / After */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Before */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
            <div className="px-5 pt-4 pb-3 flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider uppercase text-gray-400">
                Before
              </span>
              <span className="text-xs font-medium text-gray-500">케어 전</span>
            </div>
            <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
              <img
                src={selected.beforeImage}
                alt={`${selected.name} 케어 전`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent pointer-events-none" />
            </div>
            <div className="px-5 py-4 text-sm text-gray-500 border-t border-gray-50">
              일상 사용 후 누적된 오염 · 마모 상태
            </div>
          </div>

          {/* After + Care Steps */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
            <div className="px-5 pt-4 pb-3 flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider uppercase" style={{ color: "#A50034" }}>
                After
              </span>
              <span className="text-xs font-medium" style={{ color: "#A50034" }}>케어 후</span>
            </div>
            <div className="relative aspect-[4/3] bg-gray-100">
              {selected.careVideo ? (
                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  className="group block w-full h-full overflow-hidden relative"
                  aria-label={`${selected.name} 케어 영상 재생`}
                >
                  <img
                    src={selected.afterImage}
                    alt={`${selected.name} 케어 후`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0.05) 45%, transparent)" }}
                  />
                  {/* (Center play button removed — image-first display) */}
                  {/* Hint chip */}
                  <div className="absolute left-3 bottom-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 shadow-md" style={{ color: "#A50034" }}>
                    <Play className="w-3 h-3" fill="currentColor" />
                    케어 영상 보기
                  </div>
                </button>
              ) : (
                <div className="overflow-hidden w-full h-full">
                  <img
                    src={selected.afterImage}
                    alt={`${selected.name} 케어 후`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to top, rgba(165,0,52,0.12), transparent)" }} />
                </div>
              )}
            </div>

            {/* Care Process */}
            <div className="px-5 py-5 border-t border-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" style={{ color: "#A50034" }} />
                  {selected.name} 케어 과정
                </h3>
                {hasAnyImage && (
                  <span
                    className="text-[11px] font-semibold inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
                    style={{ color: "#A50034", backgroundColor: "#FBE8EE" }}
                  >
                    <ImageIcon className="w-3 h-3" />
                    이미지 클릭
                  </span>
                )}
              </div>
              <ul className="space-y-2">
                {selected.careSteps.map((step, i) => {
                  const clickable = !!step.image;
                  return (
                    <li key={i}>
                      {clickable ? (
                        <button
                          type="button"
                          onClick={() => setPreviewStep(step)}
                          className="group w-full text-left flex items-center gap-2.5 leading-relaxed rounded-lg px-2.5 py-2 -mx-2.5 border transition-all duration-200 hover:-translate-y-px"
                          style={{
                            backgroundColor: "#FFF5F8",
                            borderColor: "#F5C9D5",
                          }}
                        >
                          <span
                            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "#A50034", color: "#fff" }}
                          >
                            <Check className="w-3 h-3" strokeWidth={3} />
                          </span>
                          <span
                            className="text-[15px] font-semibold flex-1"
                            style={{ color: "#7A0026" }}
                          >
                            {step.label}
                          </span>
                          <span
                            className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors group-hover:brightness-110"
                            style={{ backgroundColor: "#A50034", color: "#fff" }}
                          >
                            <ImageIcon className="w-3 h-3" />
                            보기
                          </span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2.5 leading-relaxed px-2.5 py-1.5 -mx-2.5">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-gray-100 text-gray-400">
                            <Check className="w-3 h-3" strokeWidth={3} />
                          </span>
                          <span className="text-[15px] text-gray-500">
                            {step.label}
                          </span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <ul className="space-y-1.5 text-[12px] leading-relaxed text-gray-400">
              <li>* 이해를 돕기 위해 연출한 광고적 이미지로, 오염 여부 및 실제 케어서비스 결과는 사용 환경에 따라 다를 수 있음</li>
              <li>* 고객 과실로 인한 제품 고장은 무상 A/S에서 제외되며 별도 비용 발생할 수 있음</li>
            </ul>
          </div>
        </div>
      </main>

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
                  style={{ backgroundColor: "#A50034", color: "#fff" }}
                >
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                <h4 className="text-base font-bold text-gray-900 flex items-baseline gap-2 flex-wrap">
                  <span>{previewStep.label}</span>
                  {previewStep.disclaimer && (
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
            <div className="bg-gray-50">
              <img
                src={previewStep.image}
                alt={previewStep.label}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Care video modal */}
      {videoOpen && selected.careVideo && (
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
                  style={{ backgroundColor: "#A50034", color: "#fff" }}
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
            <video
              src={selected.careVideo}
              className="w-full h-auto max-h-[80vh] bg-black"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscription;
