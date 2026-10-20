// 케어 프로세스형 상세 섹션 데이터 (제품별 재사용 구조)
// 케어 항목 개수·순서·콘텐츠는 제품마다 달라질 수 있으며, 이 파일에서만 관리합니다.
import disassemblyCare from "@/assets/hydrotower-care-01-disassembly-care.png.asset.json";
import steamCare from "@/assets/hydrotower-care-02-steam-hygiene-care.png.asset.json";
import uvCare from "@/assets/hydrotower-care-03-uv-hygiene-care.png.asset.json";
import waterFilterCare from "@/assets/hydrotower-care-04-water-filter-replacement.png.asset.json";
import airFilterCare from "@/assets/hydrotower-care-05-air-filter-replacement.png.asset.json";
import tankCare from "@/assets/hydrotower-care-06-water-tank-mist-case-cleaning.png.asset.json";
import supplyCare from "@/assets/hydrotower-care-07-water-supply-cleaning.png.asset.json";

export type CareMediaType = "image" | "video";

export interface CareServiceStep {
  careServiceId: string;
  careServiceName: string;
  displayOrder: number;
  benefitText: string;
  description: string;
  representativeImageUrl: string;
  detailImageUrls?: string[];
  /** 케어별 개별 영상. 없으면 commonVideoUrl 사용 */
  videoUrl?: string;
  careCycle?: string;
  disclaimer?: string;
}

export interface CareProcessPlan {
  productId: string;
  productName: string;
  planId: string;
  title: string;
  subtitle: string;
  commonVideoUrl?: string;
  defaultMediaType: CareMediaType;
  careServices: CareServiceStep[];
}

export const careProcessPlans: Record<string, CareProcessPlan> = {
  hydrotower: {
    productId: "hydrotower",
    productName: "LG 퓨리케어 AI 오브제컬렉션 하이드로타워 Max",
    planId: "hydrotower-max-premium",
    title: "하이드로타워 Max 케어 서비스",
    subtitle: "전문가가 직접 관리하는 케어서비스를 확인해 보세요.",
    commonVideoUrl:
      "https://www.lge.co.kr/kr/images/common/pdp-subscribe-careship/images/humidifying-air-purifier/subscription-hydro-tower-max.mp4",
    defaultMediaType: "image",
    careServices: [
      {
        careServiceId: "disassembly",
        careServiceName: "분해 케어",
        displayOrder: 1,
        benefitText: "가습부, 공기청정부, 케이스 등 완전분해",
        description: "평소 관리하기 어려운 내부까지 전문가가 직접 케어합니다.",
        representativeImageUrl: disassemblyCare.url,
      },
      {
        careServiceId: "steam",
        careServiceName: "위생 케어(스팀)",
        displayOrder: 2,
        benefitText: "스팀 살균으로 세균 99.999% 제거",
        description: "스팀으로 위생적으로 관리합니다.",
        representativeImageUrl: steamCare.url,
      },
      {
        careServiceId: "uv",
        careServiceName: "위생 케어(UV)",
        displayOrder: 3,
        benefitText: "UV 살균으로 세균 99.9% 제거",
        description: "UV 살균 케어를 통해 관리가 필요한 부위를 케어합니다.",
        representativeImageUrl: uvCare.url,
      },
      {
        careServiceId: "water-filter",
        careServiceName: "정수필터 교체",
        displayOrder: 4,
        benefitText: "고객 선택 주기에 정수필터 무상 교체",
        description: "제품에 맞는 필터를 정해진 교체 주기에 따라 관리합니다.",
        representativeImageUrl: waterFilterCare.url,
      },
      {
        careServiceId: "air-filter",
        careServiceName: "공기청정필터 교체",
        displayOrder: 5,
        benefitText: "12개월마다 공기청정필터 무상 교체",
        description: "공기청정 성능 유지를 위해 필터를 주기적으로 교체합니다.",
        representativeImageUrl: airFilterCare.url,
        careCycle: "12개월",
      },
      {
        careServiceId: "humidifier-cleaning",
        careServiceName: "가습부 클리닝",
        displayOrder: 6,
        benefitText: "물통, 커버, 미스트케이스 습/건식 클리닝",
        description: "물이 닿는 가습부를 깨끗하게 관리합니다.",
        representativeImageUrl: tankCare.url,
      },
      {
        careServiceId: "supply-cleaning",
        careServiceName: "급수부 클리닝",
        displayOrder: 7,
        benefitText: "진동자 잔수제거, 급수부 건식 클리닝",
        description: "물을 공급하는 급수부까지 청소합니다.",
        representativeImageUrl: supplyCare.url,
      },
    ],
  },
};

export const getCareProcessPlan = (productId: string): CareProcessPlan | undefined =>
  careProcessPlans[productId];
