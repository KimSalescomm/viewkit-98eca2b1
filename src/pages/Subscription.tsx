import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowLeft, Sparkles } from "lucide-react";
import OrientationToggle from "@/components/OrientationToggle";

interface SubscriptionProduct {
  id: string;
  name: string;
  beforeImage: string;
  afterImage: string;
  careSteps: string[];
}

const subscriptionProducts: SubscriptionProduct[] = [
  {
    id: "washer",
    name: "세탁기",
    beforeImage: "https://picsum.photos/seed/washer-before/800/600",
    afterImage: "https://picsum.photos/seed/washer-after/800/600",
    careSteps: [
      "분해세척",
      "세탁조 스팀 & UV 관리",
      "고무패킹 교체",
      "급/배수 필터 세척",
      "배수 필터 교체",
      "세탁조 클리너 제공",
      "제품 성능 점검",
      "토탈 클리닝",
    ],
  },
  {
    id: "washcombo",
    name: "워시콤보",
    beforeImage: "https://picsum.photos/seed/washcombo-before/800/600",
    afterImage: "https://picsum.photos/seed/washcombo-after/800/600",
    careSteps: [
      "드럼케어",
      "고무패킹 클리닝",
      "스팀케어",
      "건조필터 추가 제공",
      "배수 필터 거름망 클리닝 & 교체",
      "외관 클리닝",
      "무상 A/S",
    ],
  },
  {
    id: "refrigerator",
    name: "냉장고",
    beforeImage: "https://picsum.photos/seed/fridge-before/800/600",
    afterImage: "https://picsum.photos/seed/fridge-after/800/600",
    careSteps: ["기계실 세척", "토탈 클리닝", "제품 성능 점검", "무상 A/S"],
  },
  {
    id: "airconditioner",
    name: "에어컨",
    beforeImage: "https://picsum.photos/seed/aircon-before/800/600",
    afterImage: "https://picsum.photos/seed/aircon-after/800/600",
    careSteps: [
      "분해세척",
      "위생케어 (피톤치드, UV케어)",
      "필터 세척 & 교체",
      "제품 성능 점검",
      "무상 A/S",
    ],
  },
  {
    id: "airpurifier",
    name: "공기청정기",
    beforeImage: "https://picsum.photos/seed/airpurifier-before/800/600",
    afterImage: "https://picsum.photos/seed/airpurifier-after/800/600",
    careSteps: [
      "필터 교체 & 필터 클리닝",
      "클린부스터 클리닝",
      "토탈 클리닝",
      "UV 살균",
      "모듈 점검",
      "무상 A/S",
    ],
  },
  {
    id: "cooktop",
    name: "전기레인지",
    beforeImage: "https://picsum.photos/seed/cooktop-before/800/600",
    afterImage: "https://picsum.photos/seed/cooktop-after/800/600",
    careSteps: [
      "코팅 및 광택 서비스",
      "토탈 클리닝",
      "상판 교체",
      "무상 재설치",
      "무상 A/S",
    ],
  },
  {
    id: "oven",
    name: "광파오븐",
    beforeImage: "https://picsum.photos/seed/oven-before/800/600",
    afterImage: "https://picsum.photos/seed/oven-after/800/600",
    careSteps: ["소모품 교체", "토탈 클리닝", "내부 클리닝", "무상 A/S"],
  },
];

const Subscription = () => {
  const [selectedId, setSelectedId] = useState<string>("washer");
  const selected = subscriptionProducts.find((p) => p.id === selectedId)!;

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
              <span className="px-3 py-1.5 text-sm font-bold text-sky-600 bg-sky-50 rounded-full border border-sky-100 inline-flex items-center gap-1">
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
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-sky-600 mb-2">
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
                      ? "bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/20"
                      : "bg-white text-gray-600 border-gray-200 hover:border-sky-300 hover:text-sky-600"
                  }`}
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
              <span className="text-xs font-bold tracking-wider uppercase text-sky-600">
                After
              </span>
              <span className="text-xs font-medium text-sky-600">케어 후</span>
            </div>
            <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
              <img
                src={selected.afterImage}
                alt={`${selected.name} 케어 후`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-500/10 to-transparent pointer-events-none" />
            </div>

            {/* Care Process */}
            <div className="px-5 py-5 border-t border-gray-50">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-500" />
                {selected.name} 케어 과정
              </h3>
              <ul className="space-y-2.5">
                {selected.careSteps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 leading-relaxed"
                  >
                    <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    <span className="text-[15px] text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Subscription;
