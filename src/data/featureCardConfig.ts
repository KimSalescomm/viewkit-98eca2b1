/**
 * 제품별 특장점 카드(목록 페이지) 표시 설정.
 *
 * - `order`: 카드 노출 순서(featureId 배열). 미지정 특장점은 뒤에 원래 순서대로 붙습니다.
 * - `cards`: featureId별 카드 썸네일 이미지 / 아이브로우(작은 레드 라벨).
 * - `fallbackLikes`: 수집 데이터가 아직 없을 때 표시할 기본 좋아요 수.
 *
 * 설정이 없는 제품도 정상 동작합니다.
 * (이미지 = 특장점의 mediaUrl/갤러리 첫 장/제품 키비주얼, 아이브로우 = feature.tag)
 */

export interface FeatureCardConfig {
  image?: string;
  eyebrow?: string;
  /** 썸네일 크롭 위치 (tailwind object-position 클래스) */
  objectPositionClass?: string;
  /** "contain" = 잘림 없이 전체 노출(뒤에 블러 배경으로 카드를 가득 채움) */
  fit?: "cover" | "contain";
  /** 추가 확대 (tailwind scale 클래스) */
  scaleClass?: string;
}

export interface ProductCardConfig {
  order?: string[];
  cards?: Record<string, FeatureCardConfig>;
  fallbackLikes?: Record<string, number>;
}

export const productCardConfig: Record<string, ProductCardConfig> = {
  vacuum: {
    // 화면 노출 순서 = 아래 배열 순서
    order: ["1", "2", "8", "4", "3", "5", "7"],
    cards: {
      "1": {
        image: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/mainpoint_N95THO_pc.jpg",
        eyebrow: "스팀 물걸레",
      },
      "2": {
        image: "https://www.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_11_anti_tangle_03.jpg",
        eyebrow: "강력한 흡입력",
      },
      "8": {
        image: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/subpointA_N95THO_pc.jpg",
        eyebrow: "물걸레 관리 솔루션",
      },
      "4": {
        image: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/gallery/medium-interior01.jpg",
        eyebrow: "AI 맞춤 청소",
      },
      "3": {
        image: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_lifestyle_kitchen_pc_01.jpg",
        eyebrow: "오브제/히든스테이션",
      },
      "5": {
        image: "/__l5e/assets-v1/8fe1dd11-6cb7-465a-a9ea-57e5e0e11c19/vacuum-security-cert-left.png",
        eyebrow: "",
        objectPositionClass: "object-[center_20%]",
      },
      "7": {
        image: "/__l5e/assets-v1/d226a096-c139-4360-ac26-3392dec78942/vacuum-subscription-service-01.jpg",
        eyebrow: "",
      },
    },
    fallbackLikes: {
      "4": 48,
      "1": 36,
      "2": 30,
      "3": 34,
      "8": 34,
      "5": 30,
      "7": 30,
    },
  },
  refrigerator: {
    cards: {
      "7": {
        image: "https://static.lge.co.kr/kr/images/refrigerators/md10364835/M875_filter_pc.jpg",
        eyebrow: "STEM이란?",
      },
      "8": {
        image: "/__l5e/assets-v1/5c91565e-d004-4833-9be9-da696f378141/refrigerator-stem-vs-comparison.png",
      },
      "10": {
        image: "https://static.lge.co.kr/kr/images/refrigerators/md10781901/refrigerator-lg-dios-ai-objet-d646-071-04-reason-direct-water-pc.jpg",
      },
      "9": {
        image: "https://c29ebf32-471f-4991-a656-57585c8d8b56.lovableproject.com/images/installation-step1.jpeg",
      },
      "13": {
        image: "https://static.lge.co.kr/kr/images/refrigerators/md10781898/refrigerator-lg-dios-ai-objet-d646-091-01-reason-dual-fresh-pc.jpg",
        objectPositionClass: "object-right-bottom",
      },
    },
  },
  airconditioner: {
    order: ["15", "18", "19", "20", "21", "17", "22"],
    cards: {
      "15": {
        image: "https://www.lge.co.kr/kr/images/air-conditioners/md10731826/usp/26_Tower1_9s_AI_coldfree_detail_03.jpg",
      },
      "18": {
        image: "https://www.lge.co.kr/kr/usp_dcr/air-conditioner/2025/25_Tower1/03.soft-wind/25_Tower1_9s_soft-wind_Detail.jpg",
      },
      "19": {
        image: "https://static.lge.co.kr/kr/images/air-conditioners/md10731826/usp/26_Tower1_9s_specialized_wind_cover.jpg",
        objectPositionClass: "object-top",
      },
      "20": {
        image: "https://static.lge.co.kr/kr/images/air-conditioners/md10731826/usp/26_Tower1_9s_pleasant_cover.jpg",
        objectPositionClass: "object-top",
      },
      "21": {
        image: "https://www.lge.co.kr/kr/images/common/gallery_list/images/air-conditioners/25_tower_9s_08.png",
      },
    },
  },
};
