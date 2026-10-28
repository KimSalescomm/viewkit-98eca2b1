import type { Feature, ProductComparisonTable } from "@/data/features";
import bathairHomepage from "@/assets/bathair-homepage.jpg.asset.json";
import premiumDualPhoto from "@/assets/bathair-lineup-premium-dual.png.asset.json";
import premiumPhoto from "@/assets/bathair-lineup-premium.png.asset.json";

const lineups = [
  { name: "프리미엄 듀얼", model: "MX0120BASV", dual: true, premium: true, imageUrl: premiumDualPhoto.url },
  { name: "프리미엄", model: "M-X0120BASV", dual: false, premium: true, imageUrl: premiumPhoto.url },
  { name: "일반", model: "M-X0120BASA", dual: false, premium: false, imageUrl: premiumPhoto.url },
];

const tableData: ProductComparisonTable[] = lineups.map(({ name, model, dual, premium, imageUrl }) => ({
  name,
  category: "바스에어시스템",
  imageUrl,
  specs: [
    { label: "모델명", values: [model] },
    {
      label: "핵심 특징",
      values: [dual
        ? "복합 환풍기와 배기팬 세트 제품으로 ‘듀얼배기’ 기능을 통해 환기 및 습기를 더 빠르게 제거"
        : "복합 환풍기만 제공되는 제품으로 기본 공간에 충분한 환기 및 습기 제거 성능"],
    },
    {
      label: "추천 상황",
      values: [dual
        ? "많은 사람이 자주 사용하는 거실의 큰 욕실"
        : "환기가 어려운 안방 욕실 또는 기본 욕실"],
    },
    { label: "듀얼배기", values: [dual ? "지원" : "미지원"], highlighted: dual },
    { label: "와이드 자동 바람", values: ["지원"] },
    {
      label: "최대 풍량 (환기/송풍/온풍)",
      values: [dual ? "160 / 120 / 120 CMH" : "120 / 120 / 120 CMH"],
      highlighted: dual,
    },
    { label: "온풍", values: ["지원"] },
    { label: "송풍", values: ["지원"] },
    { label: "공간케어", values: ["지원"] },
    { label: "바디케어", values: ["지원"] },
    { label: "UV 팬살균", values: [premium ? "지원" : "미지원"], highlighted: premium },
    { label: "무드등", values: [premium ? "지원" : "미지원"], highlighted: premium },
    { label: "원격제어(ThinQ)", values: ["지원"] },
  ],
}));

export const bathairLineupFeatures: Feature[] = [
  {
    id: "8",
    title: "우리집엔 어떤 제품이 맞을까요?",
    subtitle: "바스에어시스템의 라인업별 특장점, 핵심 기능, 주요 스펙을 아래 표로 확인해보세요.",
    icon: "Search",
    tag: "라인업 비교",
    mediaType: "table",
    mediaUrl: bathairHomepage.url,
    description: "",
    highlights: [],
    tableData,
    disclaimers: [
      "최대 풍량은 환기/송풍/온풍 각 모드별 4단계 기준이며, 프리미엄 듀얼의 최대 풍량 160CMH는 환기 모드에서 듀얼배기를 동작했을 때의 풍량입니다.",
      "제품별 스펙은 다를 수 있으니 정확한 내용은 각 제품별 상세 스펙을 확인해 주세요.",
    ],
  },
];