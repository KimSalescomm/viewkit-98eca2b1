import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowLeft, Sparkles, ImageIcon, X, Play } from "lucide-react";
import OrientationToggle from "@/components/OrientationToggle";
import washcomboBefore from "@/assets/tower-before.png";
import washcomboAfter from "@/assets/tower-after.png";
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
import dishBefore from "@/assets/dishB.png";
import dishAfter from "@/assets/dishA.jpg";

interface CareStep {
  label: string;
  image?: string;
  disclaimer?: string;
  description?: string;
  notes?: string[];
  titleSuffix?: string;
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
      { label: "고무패킹 교체", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/img_washing_machines_250826_03.jpg", disclaimer: "프리미엄, 48개월 차에 1회 서비스" },
      { label: "급/배수 필터 세척" },
      { label: "배수 필터 교체", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/img_washing_machines_250826_04.jpg" },
      { label: "세탁조 클리너 제공" },
      { label: "제품 성능 점검" },
      { label: "토탈 클리닝" },
    ],
  },
  {
    id: "airconditioner",
    name: "스탠드 에어컨",
    beforeImage: airconBefore,
    afterImage: airconAfter,
    careVideo: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/air_conditioners_stand_250804.mp4",
    careSteps: [
      {
        label: "분해세척",
        image: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_air-conditioner01.jpg",
        notes: [
          "프리미엄 구독 고객이 이용할 수 있으며, 분해 세척은 36/72개월 차에 진행됩니다.",
          "1~3월 구독 계약 시, 다음 해 3월 방문 / 4~6월 구독 계약 시, 다음 해 4월 방문 / 7~8월 구독 계약 시, 다음 해 5월 방문 / 9월 구독 계약 시, 다음 해 9월 방문 / 10월 구독 계약 시, 다음 해 10월 방문 / 11~12월 구독 계약 시, 다음 해 11월 방문합니다.",
          "방문 일정은 상황에 따라 변경될 수 있으며 방문 전 케어서비스 매니저가 사전 연락을 드립니다.",
        ],
      },
      {
        label: "위생케어 (피톤치드, UV케어)",
        image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/img_air-conditioners_stand_251126_03.jpg",
        notes: [
          "스팀케어는 프리미엄과 라이트 플러스 모두 36개월마다 서비스",
          "UV와 피톤치드 케어는 프리미엄은 36개월마다 라이트플러스는 12개월마다 서비스",
          "사용 장비는 이미지와 다를 수 있음",
        ],
      },
      { label: "필터 세척 & 교체", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/img_air-conditioners_stand_251126_04.jpg", notes: ["12개월마다 1회 교체하며, 공기청정 모델에 한함"] },
      { label: "제품 성능 점검" },
      { label: "무상 A/S" },
    ],
  },
  {
    id: "airpurifier",
    name: "공기청정기",
    beforeImage: airpurifierBefore,
    afterImage: airpurifierAfter,
    careVideo: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/air_purifiers_250804.mp4",
    careSteps: [
      { label: "필터 교체 & 필터 클리닝" },
      { label: "클린부스터 클리닝", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_airpurifier02.jpg", notes: ["6개월마다 점검 (단, 360° 공기청정기 알파UP, UV살균 모델은 방문 시마다 점검)"] },
      { label: "분해세척", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2024/s-common/img_aircare01.jpg", notes: ["해당 서비스는 25년 출시 이후 제품만 해당", "프리미엄은 30/60개월 주기로 진행", "상/하단 분리는 2단 제품에 한하여 진행"] },
      { label: "UV 살균" },
      { label: "모듈 점검" },
      { label: "무상 A/S" },
    ],
  },
  {
    id: "refrigerator",
    name: "냉장고",
    beforeImage: refrigeratorBefore,
    afterImage: refrigeratorAfter,
    careVideo: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/refrigerators_regular_250804.mp4",
    careSteps: [
      { label: "기계실 세척", image: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator01.jpg" },
      { label: "퓨어프레시 필터 교체", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator06.png", notes: ["필터 교체 주기(12개월)에 맞춰 교체하며, 해당 필터를 적용한 모델에 한함"] },
      { label: "토탈 클리닝" },
      { label: "고무패킹 케어", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator10.png" },
      { label: "얼음저장통 세척", image: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator-basic02.jpg" },
      { label: "제품 성능 점검" },
      { label: "무상 A/S" },
    ],
  },
  {
    id: "stem",
    name: "STEM 냉장고",
    beforeImage: refrigeratorBefore,
    afterImage: refrigeratorAfter,
    careVideo: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/refrigerators_regular_250804.mp4",
    careSteps: [
      {
        label: "기계실 세척",
        image: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator01.jpg",
        description: "냉장고 뒷면 기계실의 냉각팬과 쿨링핀을 세척해 냉각 효율 저하를 예방합니다.",
        notes: [
          "연출된 이미지로, 오염 정도 및 실제 케어 결과는 사용 환경에 따라 달라질 수 있습니다.",
        ],
      },
      {
        label: "유로 세척 케어",
        image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator04.png",
        description: "고온·고압 세척으로 물이 지나는 유로부터 출수구까지 위생적으로 관리합니다.",
        notes: [
          "유로 세척 결과는 수질 및 사용 환경에 따라 차이가 있을 수 있습니다.",
        ],
      },
      {
        label: "워터필터 교체",
        titleSuffix: "12개월",
        image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator05.png",
        description: "깨끗한 정수 성능 유지를 위해 교체 주기에 맞춰 워터필터를 무상으로 교체합니다.",
        notes: [
          "필터 교체 주기는 제품 및 사용 환경에 따라 달라질 수 있습니다.",
          "정수 기능이 있는 모델에 한해 제공됩니다.",
        ],
      },
      {
        label: "퓨어프레시 필터 교체",
        titleSuffix: "12개월",
        image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator06.png",
        notes: [
          "퓨어프레시 필터 적용 모델에 한해 제공되는 서비스입니다.",
          "필터 교체 주기는 약 12개월이며 사용 환경에 따라 달라질 수 있습니다.",
        ],
      },
      {
        label: "얼음저장통 세척",
        image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator07.png",
        description: "관리가 어려운 얼음저장통과 출수구까지 분리 세척해 위생적인 사용을 돕습니다.",
        notes: [
          "얼음 기능이 있는 모델에 한해 제공됩니다.",
        ],
      },
      {
        label: "고무패킹 케어",
        image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator10.png",
        description: "도어 고무패킹을 클리닝하고 전용 윤활제를 도포해 밀폐력 유지에 도움을 줍니다.",
        notes: [
          "고무패킹의 마모·손상 상태에 따라 케어 효과는 달라질 수 있습니다.",
        ],
      },
      {
        label: "제품 성능 점검",
        description: "설치 상태, 수평, 기본 작동 여부를 점검해 안정적인 사용을 지원합니다.",
        notes: [
          "정밀 수리 또는 부품 교체가 필요한 경우 별도 A/S로 안내될 수 있습니다.",
        ],
      },
      {
        label: "무상 철거 및 재설치",
        image: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator08.png",
        description: "이사 시 제품 무상 철거 및 재설치 서비스를 제공합니다.",
        notes: [
          "STEM 냉장고는 가전 구독 고객에 한하여 계약기간 내 1회 무상 철거 및 재설치 이용 가능 (25년 3월 1일부터 제공)",
          "단, 무상 철거 서비스는 26년 1월 5일부터 설치된 제품 한해서 가능 (~26년 1월 4일 설치 제품 제외)",
          "운송 서비스는 유료이며, 비용은 고객 부담",
          "제품 설치 환경에 따라 추가 비용이 발생할 수 있음",
          "추가 비용 관련 자세한 사항은 LG전자 고객센터(1544-7777)에 문의",
        ],
      },
      {
        label: "무상 A/S",
        description: "약정 기간 내 제품 고장 발생 시 무상 A/S를 제공합니다.",
        notes: [
          "고객 과실로 인한 고장은 무상 A/S 대상에서 제외됩니다.",
        ],
      },
    ],
  },
  {
    id: "washcombo",
    name: "워시타워",
    beforeImage: washcomboBefore,
    afterImage: washcomboAfter,
    careVideo: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/wash_tower_250804.mp4",
    careSteps: [
      { label: "드럼케어", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2024/s-common/img_washcombo01.jpg", notes: ["드럼/스팀케어는 25년 4월 이후 구독 고객부터 이용할 수 있음"] },
      { label: "고무패킹 클리닝" },
      { label: "스팀케어", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2024/s-common/img_washcombo03.jpg", notes: ["드럼/스팀케어는 25년 4월 이후 구독 고객부터 이용할 수 있음"] },
      { label: "2중 안심필터 교체", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_washtower05.jpg", notes: ["2중 안심필터는 첫 방문시 1회 증정"] },
      { label: "배수 필터 거름망 클리닝 & 교체", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_washtower02.jpg", notes: ["배수필터는 24개월마다 교체"] },
      { label: "외관 클리닝" },
      { label: "무상 A/S" },
      {
        label: "무상 철거 및 재설치",
        image: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/new_img_washtower.jpg",
        notes: [
          "워시타워는 무상 철거 및 재설치 서비스 이용할 수 있음",
          "가전 구독 고객에 한하여 계약기간 내 1회 해당",
          "운송비는 유상이며, 거리에 따라 비용이 다름",
          "제품 설치 환경에 따라 추가 비용이 발생할 수 있음",
          "추가 비용 관련 자세한 사항은 LG전자 고객센터(1544-7777)에서 안내받을 수 있음",
        ],
      },
    ],
  },
  {
    id: "cooktop",
    name: "전기레인지",
    beforeImage: inductionBefore,
    afterImage: inductionAfter,
    careVideo: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/electric_stoves_250819.mp4",
    careSteps: [
      { label: "코팅 및 광택 서비스", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/img_stove_02_250804.jpg", notes: ["코팅/광택 서비스는 계약 시 선택한 방문 주기에 맞춰 받을 수 있음 (무방문 선택 고객은 해당 없음)"] },
      { label: "토탈 클리닝", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_stove03.jpg", notes: ["클리닝은 계약 시 선택한 방문 주기에 맞춰 받을 수 있음 (무방문 선택 고객은 해당 없음)"] },
      { label: "상판 교체", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_stove01.jpg", notes: ["36개월 차 이후 최대 48개월차까지 고객이 원하는 시점에 1회 교체 받을 수 있으며, 오브제컬렉션 컬러 모델은 조작부 컬러도 변경 가능함", "고객 직접 교체는 불가, LG전자 공식 서비스 이용, 계약 만료 및 해지 시 상판 교체 대상에서 제외되며 기존 상판은 회수 원칙"] },
      { label: "틈새 세척", image: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/img_stove_03_250804.jpg", notes: ["인덕션 빌트인 모델 전용 – 프리스탠딩 모델, 하이브리드 모델 적용 불가", "가전 구독 가입 시 12개월 방문 케어서비스를 선택한 고객에 한함"] },
      { label: "무상 재설치" },
      { label: "무상 A/S" },
    ],
  },
  {
    id: "dishwasher",
    name: "식기세척기",
    beforeImage: dishBefore,
    afterImage: dishAfter,
    careVideo: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/dishwashers_250804.mp4",
    careSteps: [
      { label: "음식물거름망 교체", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_dishwasher01.jpg" },
      { label: "연수장치 점검", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_dishwasher02.jpg" },
      { label: "수질 경도 측정" },
      { label: "내부 세척 및 통살균 세척", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_dishwasher04.jpg", disclaimer: "통살균은 뜨거운 물로 제품 내부를 물리적인 방식으로 세척하기 위한 코스입니다." },
      { label: "에어필터 교체", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_dishwasher05.jpg", notes: ["에어 필터 교체 서비스는 열풍건조 기능이 적용된 일부 제품에 한합니다. (1년에 1회 교체)", "방문 관리는 사전 안내드리고 있으며, 고객 요청에 의해 협의된 일정으로 변경하실 수 있습니다."] },
      { label: "무상 철거 및 재설치", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_dishwasher06.jpg", notes: ["식기세척기는 무상 철거 및 재설치 서비스를 제공해 드립니다.", "단, 무상 철거 및 재설치는 25년 3월 1일부터 제공됩니다.", "가전 구독 고객에 한하여 계약기간 내 1회 무상 제공(운송비 별도) 해드립니다.", "운송 서비스를 희망할 경우 유상 제공되며 비용은 고객 부담입니다.", "제품 설치 환경에 따라 추가 비용이 발생할 수 있습니다.", "추가 비용 관련 자세한 사항은 LG전자 고객센터(1544-7777)에 문의 바랍니다.", "방문 관리는 사전 안내드리고 있으며, 고객 요청에 의해 협의된 일정으로 변경하실 수 있습니다."] },
      { label: "무상 A/S" },
    ],
  },
  {
    id: "oven",
    name: "광파오븐",
    beforeImage: ovenBefore,
    afterImage: ovenAfter,
    careVideo: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/electric_stoves_250819.mp4",
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

  // Preload all before/after images on mount so tab switching is instant
  useEffect(() => {
    subscriptionProducts.forEach((p) => {
      [p.beforeImage, p.afterImage].forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []);

  // Auto-rotate tabs after 30s of user inactivity
  useEffect(() => {
    const IDLE_MS = 30000;
    let timer: ReturnType<typeof setTimeout>;

    const advance = () => {
      setSelectedId((current) => {
        const idx = subscriptionProducts.findIndex((p) => p.id === current);
        const next = subscriptionProducts[(idx + 1) % subscriptionProducts.length];
        return next.id;
      });
    };

    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(advance, IDLE_MS);
    };

    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "pointermove",
      "keydown",
      "wheel",
      "touchstart",
      "scroll",
    ];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, []);

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
        <div className="mb-6 sm:mb-8 text-center">
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
          <div className="flex sm:flex-wrap sm:justify-center gap-2 overflow-x-auto px-5 sm:px-0 pb-2 scrollbar-hide">
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

        {/* Section title */}
        {(() => {
          const sectionTitles: Record<string, string> = {
            washer: "세탁기 케어서비스 (분해세척)",
            washcombo: "워시타워 케어서비스 (스팀케어)",
            refrigerator: "냉장고 케어서비스 (기계실 세척)",
            stem: "STEM 냉장고 케어서비스 (기계실 세척)",
            airconditioner: "스탠드 에어컨 케어서비스 (분해세척)",
            airpurifier: "공기청정기 케어서비스 (필터 교체 & 필터 클리닝)",
            cooktop: "전기레인지 케어서비스 (코팅 및 광택)",
            dishwasher: "식기세척기 케어서비스 (내부 세척)",
            oven: "광파오븐 케어서비스 (내부 클리닝)",
          };
          const title = sectionTitles[selected.id];
          if (!title) return null;
          return (
            <div className="mb-4 sm:mb-5">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-block w-1 sm:w-1.5 h-5 sm:h-6 rounded-sm"
                  style={{ backgroundColor: "#A50034" }}
                />
                {title}
              </h2>
            </div>
          );
        })()}

        {/* Before / After */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Before */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] flex flex-col h-full">
            <div className="px-5 pt-4 pb-3 flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider uppercase text-gray-400">
                Before
              </span>
              <span className="text-xs font-medium text-gray-500">케어 전</span>
            </div>
            <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
              <img
                key={`before-${selected.id}`}
                src={selected.beforeImage}
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
                refrigerator: "기계실 세척 전",
                stem: "기계실 세척 전",
                washcombo: "스팀케어 전",
                airconditioner: "열교환기 세척 전",
                airpurifier: "필터 교체 & 클리닝 전",
                cooktop: "코팅 및 광택 서비스 전",
                oven: "내부 클리닝 전",
                dishwasher: "필터 클리닝 전",
              };
              const label = beforeLabels[selected.id];
              if (!label) return null;
              return (
                <div className="bg-white border-t border-gray-50 flex-1 flex items-center justify-center px-5 py-6 min-h-[56px]">
                  <span className="text-sm font-bold text-gray-700 text-center">{label}</span>
                </div>
              );
            })()}
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
                    key={`after-${selected.id}`}
                    src={selected.afterImage}
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
                  <div className="absolute left-3 bottom-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 shadow-md" style={{ color: "#A50034" }}>
                    <Play className="w-3 h-3" fill="currentColor" />
                    케어 영상 보기
                  </div>
                </button>
              ) : (
                <div className="overflow-hidden w-full h-full">
                  <img
                    key={`after-${selected.id}`}
                    src={selected.afterImage}
                    alt={`${selected.name} 케어 후`}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
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
        </div>

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
          <p className="text-[14px] sm:text-[15px] font-semibold leading-relaxed" style={{ color: "#374151" }}>
            제품별 구독 타입(프리미엄, 라이트, 라이트 플러스 등)에 따라 적용 서비스는 다르니, 자세한 내용은 구독 계약할 때 다시 한번 확인해 주세요.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <ul className="space-y-1.5 text-[12px] leading-relaxed text-gray-700 whitespace-nowrap overflow-x-auto">
            <li>* 이해를 돕기 위해 연출한 광고적 이미지로, 오염 여부 및 실제 케어서비스 결과는 사용 환경에 따라 다를 수 있음</li>
            <li>* 케어서비스 항목은 구독 모델, 시점, 요금제에 따라 다를 수 있으니, 자세한 내용은 구독 계약할 때 반드시 확인</li>
            <li>* 고객 과실로 인한 제품 고장은 무상 A/S에서 제외되며 별도 비용 발생할 수 있음</li>
            <li>* 방문 관리는 사전 안내하며, 고객 요청 시 협의된 일정으로 변경할 수 있음</li>
          </ul>
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
