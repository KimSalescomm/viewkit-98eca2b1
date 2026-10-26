import washerCareSteamUvAsset from "@/assets/washer-care-steam-uv.png.asset.json";
import washcomboBeforeAsset from "@/assets/washcombo-before.jpg.asset.json";
import washcomboAfterAsset from "@/assets/washcombo-after.jpg.asset.json";
import washerBefore from "@/assets/washercare-b.png";
import washerAfter from "@/assets/washercare-a.png";
import washerLiteBeforeAsset from "@/assets/washer-lite-before.jpg.asset.json";
import washerLiteAfterAsset from "@/assets/washer-lite-after.jpg.asset.json";
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
import bathairBeforeAsset from "@/assets/bathair-before.jpg.asset.json";
import bathairAfterAsset from "@/assets/bathair-after.jpg.asset.json";
import airconLiteBeforeAsset from "@/assets/aircon-lite-before.jpg.asset.json";
import airconLiteAfterAsset from "@/assets/aircon-lite-after.jpg.asset.json";

const bathairBefore = bathairBeforeAsset.url;
const bathairAfter = bathairAfterAsset.url;
const washcomboBefore = washcomboBeforeAsset.url;
const washcomboAfter = washcomboAfterAsset.url;
const washerLiteBefore = washerLiteBeforeAsset.url;
const washerLiteAfter = washerLiteAfterAsset.url;
const airconLiteBefore = airconLiteBeforeAsset.url;
const airconLiteAfter = airconLiteAfterAsset.url;

export interface CareStep {
  careServiceId?: string;
  label: string;
  image?: string;
  disclaimer?: string;
  description?: string;
  notes?: string[];
  titleSuffix?: string;
}

export interface SubscriptionProduct {
  id: string;
  name: string;
  beforeImage: string;
  afterImage: string;
  careVideo?: string;
  careSteps: CareStep[];
}

const _subscriptionProducts: SubscriptionProduct[] = [
  {
    id: "washer",
    name: "세탁기",
    beforeImage: washerBefore,
    afterImage: washerAfter,
    careVideo: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/washing_machines_250826.mp4",
    careSteps: [
      { careServiceId: "service-478ffa04950a", label: "드럼케어" },
      { careServiceId: "service-75c94c6185bd", label: "스팀케어" },
      { careServiceId: "service-f10e39c4c2bf", label: "토탈 클리닝" },
      { careServiceId: "service-10bbb0cd75c2", label: "성능점검" },
      { careServiceId: "service-a582e2d32f45", label: "정기적인 소모품 교체" },
      { careServiceId: "service-4946c2df5d27", label: "무상 A/S" },
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
        careServiceId: "service-80cd53813961", label: "분해세척",
        image: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_air-conditioner01.jpg",
        notes: [
          "프리미엄 구독 고객이 이용할 수 있으며, 분해 세척은 36/72개월 차에 진행됩니다.",
          "1~3월 구독 계약 시, 다음 해 3월 방문 / 4~6월 구독 계약 시, 다음 해 4월 방문 / 7~8월 구독 계약 시, 다음 해 5월 방문 / 9월 구독 계약 시, 다음 해 9월 방문 / 10월 구독 계약 시, 다음 해 10월 방문 / 11~12월 구독 계약 시, 다음 해 11월 방문합니다.",
          "방문 일정은 상황에 따라 변경될 수 있으며 방문 전 케어서비스 매니저가 사전 연락을 드립니다.",
        ],
      },
      {
        careServiceId: "service-a206f7e85da4", label: "위생케어 (피톤치드, UV케어)",
        image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/img_air-conditioners_stand_251126_03.jpg",
        notes: [
          "스팀케어는 프리미엄과 라이트 플러스 모두 36개월마다 서비스",
          "UV와 피톤치드 케어는 프리미엄은 36개월마다 라이트플러스는 12개월마다 서비스",
          "사용 장비는 이미지와 다를 수 있음",
        ],
      },
      { careServiceId: "service-42bd696d1368", label: "필터 세척 & 교체", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/img_air-conditioners_stand_251126_04.jpg", notes: ["12개월마다 1회 교체하며, 공기청정 모델에 한함"] },
      { careServiceId: "service-b957095d34d8", label: "제품 성능 점검" },
      { careServiceId: "service-4946c2df5d27", label: "무상 A/S" },
    ],
  },
  {
    id: "airpurifier",
    name: "공기청정기",
    beforeImage: airpurifierBefore,
    afterImage: airpurifierAfter,
    careVideo: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/air_purifiers_250804.mp4",
    careSteps: [
      { careServiceId: "service-89e5cc23a8d7", label: "필터 교체 & 필터 클리닝" },
      { careServiceId: "service-24da8c1d082d", label: "클린부스터 클리닝", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_airpurifier02.jpg", notes: ["6개월마다 점검 (단, 360° 공기청정기 알파UP, UV살균 모델은 방문 시마다 점검)"] },
      { careServiceId: "service-80cd53813961", label: "분해세척", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2024/s-common/img_aircare01.jpg", notes: ["해당 서비스는 25년 출시 이후 제품만 해당", "프리미엄은 30/60개월 주기로 진행", "상/하단 분리는 2단 제품에 한하여 진행"] },
      { careServiceId: "service-7c9975baec4c", label: "UV 살균" },
      { careServiceId: "service-661d3a148c23", label: "모듈 점검" },
      { careServiceId: "service-4946c2df5d27", label: "무상 A/S" },
    ],
  },
  {
    id: "refrigerator",
    name: "냉장고",
    beforeImage: refrigeratorBefore,
    afterImage: refrigeratorAfter,
    careVideo: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/refrigerators_regular_250804.mp4",
    careSteps: [
      { careServiceId: "service-fc5334299201", label: "기계실 세척", image: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator01.jpg" },
      { careServiceId: "service-b957095d34d8", label: "제품 성능 점검" },
      { careServiceId: "service-4946c2df5d27", label: "무상 A/S" },
      { careServiceId: "service-518d9b823514", label: "고무패킹 케어", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator10.png", disclaimer: "25년 6월 이후 출시한 퓨어 프레시 필터 적용 냉장고에 한함" },
      { careServiceId: "service-f594ac176e7a", label: "퓨어프레시 필터 교체", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator06.png", disclaimer: "25년 6월 이후 출시한 퓨어 프레시 필터 적용 냉장고에 한함", notes: ["필터 교체 주기(12개월)에 맞춰 교체하며, 해당 필터를 적용한 모델에 한함"] },
      { careServiceId: "service-f2c6610b9d3c", label: "얼음저장통 세척", image: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator-basic02.jpg", disclaimer: "25년 6월 이후 출시한 퓨어 프레시 필터 적용 냉장고에 한함" },
      { careServiceId: "service-f10e39c4c2bf", label: "토탈 클리닝" },
    ],
  },
  {
    id: "stem",
    name: "STEM 냉장고",
    beforeImage: refrigeratorBefore,
    afterImage: refrigeratorAfter,
    careVideo: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/refrigerators_250804.mp4",
    careSteps: [
      {
        careServiceId: "service-bd12d0c6eed3", label: "유로 세척 케어",
        image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator04.png",
        description: "고온·고압 세척으로 물이 지나는 유로부터 출수구까지 위생적으로 관리합니다.",
        notes: [
          "유로 세척 결과는 수질 및 사용 환경에 따라 차이가 있을 수 있습니다.",
        ],
      },
      {
        careServiceId: "service-bf1b27ceb549", label: "워터필터 교체",
        titleSuffix: "12개월",
        image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator05.png",
        description: "깨끗한 정수 성능 유지를 위해 교체 주기에 맞춰 워터필터를 무상으로 교체합니다.",
        notes: [
          "필터 교체 주기는 제품 및 사용 환경에 따라 달라질 수 있습니다.",
          "정수 기능이 있는 모델에 한해 제공됩니다.",
        ],
      },
      {
        careServiceId: "service-7af69f57710a", label: "무상 철거 및 재설치",
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
        careServiceId: "service-fc5334299201", label: "기계실 세척",
        image: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator01.jpg",
        description: "냉장고 뒷면 기계실의 냉각팬과 쿨링핀을 세척해 냉각 효율 저하를 예방합니다.",
        notes: [
          "연출된 이미지로, 오염 정도 및 실제 케어 결과는 사용 환경에 따라 달라질 수 있습니다.",
        ],
      },
      {
        careServiceId: "service-b957095d34d8", label: "제품 성능 점검",
        description: "설치 상태, 수평, 기본 작동 여부를 점검해 안정적인 사용을 지원합니다.",
        notes: [
          "정밀 수리 또는 부품 교체가 필요한 경우 별도 A/S로 안내될 수 있습니다.",
        ],
      },
      {
        careServiceId: "service-4946c2df5d27", label: "무상 A/S",
        description: "계약 기간 내 제품 고장 발생 시 무상 A/S를 제공합니다.",
        notes: [
          "고객 과실로 인한 고장은 무상 A/S 대상에서 제외됩니다.",
        ],
      },
      {
        careServiceId: "service-518d9b823514", label: "고무패킹 케어",
        image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator10.png",
        description: "도어 고무패킹을 클리닝하고 전용 윤활제를 도포해 밀폐력 유지에 도움을 줍니다.",
        notes: [
          "고무패킹의 마모·손상 상태에 따라 케어 효과는 달라질 수 있습니다.",
        ],
      },
      {
        careServiceId: "service-f594ac176e7a", label: "퓨어프레시 필터 교체",
        titleSuffix: "12개월",
        image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator06.png",
        notes: [
          "퓨어프레시 필터 적용 모델에 한해 제공되는 서비스입니다.",
          "필터 교체 주기는 약 12개월이며 사용 환경에 따라 달라질 수 있습니다.",
        ],
      },
      {
        careServiceId: "service-f2c6610b9d3c", label: "얼음저장통 세척",
        image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/25rental-refrigerator07.png",
        description: "관리가 어려운 얼음저장통과 출수구까지 분리 세척해 위생적인 사용을 돕습니다.",
        notes: [
          "얼음 기능이 있는 모델에 한해 제공됩니다.",
        ],
      },
    ],
  },
  {
    id: "washcombo",
    name: "워시콤보",
    beforeImage: washcomboBefore,
    afterImage: washcomboAfter,
    careVideo: "https://youtu.be/pT9yzJUopzA",
    careSteps: [
      { careServiceId: "service-41dc9a6d217c", label: "직수/고압 세척", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/s-common/img_washtower_01_260724.jpg" },
      { careServiceId: "service-c8bc054164ae", label: "드럼 케어", image: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/s-common/img_washtower_02_260724.jpg" },
      { careServiceId: "service-c583fe054b32", label: "UV/스팀 케어", image: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/s-common/img_washtower_08_260805.png" },
      { careServiceId: "service-bcdf7dbabbbf", label: "내시경 카메라 점검", image: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/s-common/img_washtower_03_260724.jpg" },
      { careServiceId: "service-a582e2d32f45", label: "정기적인 소모품 교체" },
      { careServiceId: "service-4946c2df5d27", label: "무상 A/S" },
    ],
  },
  {
    id: "cooktop",
    name: "전기레인지",
    beforeImage: inductionBefore,
    afterImage: inductionAfter,
    careVideo: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/electric_stoves_250819.mp4",
    careSteps: [
      { careServiceId: "service-296f64459145", label: "코팅 및 광택 서비스", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/img_stove_02_250804.jpg", notes: ["코팅/광택 서비스는 계약 시 선택한 방문 주기에 맞춰 받을 수 있음 (무방문 선택 고객은 해당 없음)"] },
      { careServiceId: "service-f10e39c4c2bf", label: "토탈 클리닝", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_stove03.jpg", notes: ["클리닝은 계약 시 선택한 방문 주기에 맞춰 받을 수 있음 (무방문 선택 고객은 해당 없음)"] },
      { careServiceId: "service-d187e7f3867e", label: "상판 교체", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_stove01.jpg", notes: ["36개월 차 이후 최대 48개월차까지 고객이 원하는 시점에 1회 교체 받을 수 있으며, 오브제컬렉션 컬러 모델은 조작부 컬러도 변경 가능함", "고객 직접 교체는 불가, LG전자 공식 서비스 이용, 계약 만료 및 해지 시 상판 교체 대상에서 제외되며 기존 상판은 회수 원칙"] },
      { careServiceId: "service-2413bb168d1d", label: "틈새 세척", image: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/img_stove_03_250804.jpg", notes: ["인덕션 빌트인 모델 전용 – 프리스탠딩 모델, 하이브리드 모델 적용 불가", "가전 구독 가입 시 12개월 방문 케어서비스를 선택한 고객에 한함"] },
      { careServiceId: "service-ca897b40f55c", label: "무상 재설치" },
      { careServiceId: "service-4946c2df5d27", label: "무상 A/S" },
    ],
  },
  {
    id: "dishwasher",
    name: "식기세척기",
    beforeImage: dishBefore,
    afterImage: dishAfter,
    careVideo: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/dishwashers_250804.mp4",
    careSteps: [
      { careServiceId: "service-3c08584f33e1", label: "음식물거름망 교체", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_dishwasher01.jpg" },
      { careServiceId: "service-df1a8d69d959", label: "연수장치 점검", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_dishwasher02.jpg" },
      { careServiceId: "service-f294830081ed", label: "수질 경도 측정" },
      { careServiceId: "service-bb918e7bb8f2", label: "내부 세척 및 통살균 세척", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_dishwasher04.jpg", disclaimer: "통살균은 뜨거운 물로 제품 내부를 물리적인 방식으로 세척하기 위한 코스입니다." },
      { careServiceId: "service-5891fbce1e65", label: "에어필터 교체", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_dishwasher05.jpg", notes: ["에어 필터 교체 서비스는 열풍건조 기능이 적용된 일부 제품에 한합니다. (1년에 1회 교체)", "방문 관리는 사전 안내드리고 있으며, 고객 요청에 의해 협의된 일정으로 변경하실 수 있습니다."] },
      { careServiceId: "service-7af69f57710a", label: "무상 철거 및 재설치", image: "https://static.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2022/s-common/img_dishwasher06.jpg", notes: ["식기세척기는 무상 철거 및 재설치 서비스를 제공해 드립니다.", "단, 무상 철거 및 재설치는 25년 3월 1일부터 제공됩니다.", "가전 구독 고객에 한하여 계약기간 내 1회 무상 제공(운송비 별도) 해드립니다.", "운송 서비스를 희망할 경우 유상 제공되며 비용은 고객 부담입니다.", "제품 설치 환경에 따라 추가 비용이 발생할 수 있습니다.", "추가 비용 관련 자세한 사항은 LG전자 고객센터(1544-7777)에 문의 바랍니다.", "방문 관리는 사전 안내드리고 있으며, 고객 요청에 의해 협의된 일정으로 변경하실 수 있습니다."] },
      { careServiceId: "service-4946c2df5d27", label: "무상 A/S" },
    ],
  },
  {
    id: "oven",
    name: "광파오븐",
    beforeImage: ovenBefore,
    afterImage: ovenAfter,
    careVideo: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/microwaves_and_ovens_250804.mp4",
    careSteps: [
      { careServiceId: "service-8a17f819c769", label: "소모품 교체" },
      { careServiceId: "service-f10e39c4c2bf", label: "토탈 클리닝" },
      { careServiceId: "service-a0e8d4ad545e", label: "내부 클리닝" },
      { careServiceId: "service-4946c2df5d27", label: "무상 A/S" },
    ],
  },
  {
    id: "bathair",
    name: "바스에어시스템",
    beforeImage: bathairAfter,
    afterImage: bathairBefore,
    careVideo: "https://youtu.be/HkCNqxdZ5bs",
    careSteps: [
      {
        careServiceId: "service-b98098d509fd", label: "팬 분해세척",
        image: "https://www.lge.co.kr/kr/Caresolution/images/bath-air-system/img-bath-air-system04.jpg",
      },
      {
        careServiceId: "service-19e987cdbe23", label: "극세필터 교체 및 필터 클리닝",
        image: "https://www.lge.co.kr/kr/Caresolution/images/bath-air-system/img-bath-air-system01.jpg",
      },
      {
        careServiceId: "service-1fd56bbefdf4", label: "위생케어 (UV, 피톤치드)",
        image: "https://www.lge.co.kr/kr/Caresolution/images/bath-air-system/img-bath-air-system02.jpg",
      },
      { careServiceId: "service-4946c2df5d27", label: "무상 A/S" },
    ],
  },
];

const SUBSCRIPTION_PRODUCT_ORDER = [
  "washer",
  "washcombo",
  "airconditioner",
  "airpurifier",
  "bathair",
  "refrigerator",
  "stem",
  "cooktop",
  "oven",
  "dishwasher",
];

export const subscriptionProducts: SubscriptionProduct[] = [..._subscriptionProducts].sort(
  (a, b) => SUBSCRIPTION_PRODUCT_ORDER.indexOf(a.id) - SUBSCRIPTION_PRODUCT_ORDER.indexOf(b.id)
);

/**
 * 스탠드 에어컨 요금제(프리미엄 / 라이트플러스)별 케어서비스 콘텐츠.
 * 프리미엄/라이트플러스 모두 Before/After 그리드로 노출되며,
 * 라이트플러스는 전용 전·후 이미지와 YouTube 케어 영상을 사용합니다.
 */
type AirconPlanId = "premium" | "litePlus";

interface AirconPlanStep {
  careServiceId?: string;
  label: string;
  hasDetailLink: boolean;
  detailUrl?: string;
}

interface AirconPlanContent {
  plan: AirconPlanId;
  planLabel: string;
  title: string;
  beforeAfterImages?: { before: string; after: string };
  videoUrl?: string;
  videoCaption?: string;
  steps: AirconPlanStep[];
}

export const airconPlanContents: AirconPlanContent[] = [
  {
    plan: "premium",
    planLabel: "프리미엄",
    title: "스탠드 에어컨 케어서비스",
    beforeAfterImages: { before: airconBefore, after: airconAfter },
    steps: [
      { careServiceId: "service-80cd53813961", label: "분해세척", hasDetailLink: true },
      { careServiceId: "service-a206f7e85da4", label: "위생케어 (피톤치드, UV케어)", hasDetailLink: true },
      { careServiceId: "service-42bd696d1368", label: "필터 세척 & 교체", hasDetailLink: true },
      { careServiceId: "service-b957095d34d8", label: "제품 성능 점검", hasDetailLink: false },
      { careServiceId: "service-4946c2df5d27", label: "무상 A/S", hasDetailLink: false },
    ],
  },
  {
    plan: "litePlus",
    planLabel: "라이트플러스",
    title: "스탠드 에어컨 케어서비스",
    beforeAfterImages: { before: airconLiteBefore, after: airconLiteAfter },
    videoUrl: "https://youtu.be/t7DwsspCwuM",
    steps: [
      { careServiceId: "service-4ba68ec1c22d", label: "기본 세척(커버 분리)", hasDetailLink: false },
      { careServiceId: "service-9400258df9de", label: "위생케어(피톤치드, UV케어)", hasDetailLink: false },
      { careServiceId: "service-65ff1a8bcaf6", label: "필터세척 & 교체", hasDetailLink: false },
      { careServiceId: "service-b957095d34d8", label: "제품 성능 점검", hasDetailLink: false },
      { careServiceId: "service-4946c2df5d27", label: "무상 A/S", hasDetailLink: false },
    ],
  },
];

/**
 * 세탁기 요금제(프리미엄 / 라이트플러스)별 케어서비스 콘텐츠.
 * 프리미엄/라이트플러스 모두 Before/After 그리드 구조로 노출되며,
 * After 썸네일의 '케어 영상 보기'는 videoUrl(LG mp4 또는 YouTube)을 재생합니다.
 */
type WasherPlanId = "premium" | "litePlus";

interface WasherPlanStep {
  careServiceId?: string;
  label: string;
  hasDetailLink: boolean;
  detailUrl?: string;
}

interface WasherPlanContent {
  plan: WasherPlanId;
  planLabel: string;
  title: string;
  beforeAfterImages?: { before: string; after: string };
  videoUrl?: string;
  videoCaption?: string;
  steps: WasherPlanStep[];
}

export const washerPlanContents: WasherPlanContent[] = [
  {
    plan: "premium",
    planLabel: "프리미엄",
    title: "세탁기 케어서비스",
    beforeAfterImages: { before: washerBefore, after: washerAfter },
    steps: [
      { careServiceId: "service-6800665a02d1", label: "분해 케어", hasDetailLink: false },
      { careServiceId: "service-c583fe054b32", label: "UV/스팀 케어", hasDetailLink: false },
      { careServiceId: "service-f10e39c4c2bf", label: "토탈 클리닝", hasDetailLink: false },
      { careServiceId: "service-10bbb0cd75c2", label: "성능점검", hasDetailLink: false },
      { careServiceId: "service-a582e2d32f45", label: "정기적인 소모품 교체", hasDetailLink: false },
      { careServiceId: "service-4946c2df5d27", label: "무상 A/S", hasDetailLink: false },
    ],
  },
  {
    plan: "litePlus",
    planLabel: "라이트플러스",
    title: "세탁기 케어서비스",
    beforeAfterImages: { before: washerLiteBefore, after: washerLiteAfter },
    videoUrl: "https://youtu.be/x1dF8E81q0U",
    steps: [
      { careServiceId: "service-478ffa04950a", label: "드럼케어", hasDetailLink: false },
      { careServiceId: "service-d55e4df6eb4d", label: "스팀 케어", hasDetailLink: false },
      { careServiceId: "service-f10e39c4c2bf", label: "토탈 클리닝", hasDetailLink: false },
      { careServiceId: "service-10bbb0cd75c2", label: "성능점검", hasDetailLink: false },
      { careServiceId: "service-a582e2d32f45", label: "정기적인 소모품 교체", hasDetailLink: false },
      { careServiceId: "service-4946c2df5d27", label: "무상 A/S", hasDetailLink: false },
    ],
  },
];

