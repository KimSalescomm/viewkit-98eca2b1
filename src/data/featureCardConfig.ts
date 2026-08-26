/**
 * 제품별 특장점 카드(목록 페이지) 표시 설정.
 *
 * - `order`: 카드 노출 순서(featureId 배열). 미지정 특장점은 뒤에 원래 순서대로 붙습니다.
 * - `cards`: featureId별 카드 썸네일 이미지 / 아이브로우(작은 레드 라벨).
 * - `fallbackLikes`: 수집 데이터가 아직 없을 때 표시할 기본 좋아요 수.
 *
 * 설정이 없는 제품도 정상 동작합니다.
 * (이미지 = 특장점의 mediaUrl/갤러리 첫 장/제품 키비주얼)
 *
 * NOTE: 아이브로우는 가능한 이 파일에 명시적으로 기재합니다.
 *       eyebrow가 비어있으면 ProductFeatureGrid에서 feature.tag를 폴백으로 사용합니다.
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
  /** contain 사용 시 뒷배경 스타일. 기본 blur */
  containBackground?: "blur" | "white";
}

export interface ProductCardConfig {
  order?: string[];
  cards?: Record<string, FeatureCardConfig>;
  fallbackLikes?: Record<string, number>;
}

export const productCardConfig: Record<string, ProductCardConfig> = {
  bathair: {
    cards: {
      "3": {
        image: "/__l5e/assets-v1/df5bc023-5dd7-480a-81d2-4333f119d537/bathair-cleancare-edited.png",
        eyebrow: "클린케어",
      },
      "4": {
        image: "/__l5e/assets-v1/ef0cc59e-c910-415e-90d8-d87525609aac/bathair-install-cropped.png",
        eyebrow: "설치 환경",
      },
      "7": {
        image: "https://static.lge.co.kr/kr/Caresolution/images/bath-air-system/img-bath-air-system04.jpg",
        eyebrow: "바스에어 구독",
      },
    },
  },
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
        eyebrow: "체계적인 보안 솔루션",
        objectPositionClass: "object-[center_20%]",
      },
      "7": {
        image: "/__l5e/assets-v1/d226a096-c139-4360-ac26-3392dec78942/vacuum-subscription-service-01.jpg",
        eyebrow: "가전 구독",
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
        eyebrow: "STEM 제품 비교",
      },
      "10": {
        image: "https://static.lge.co.kr/kr/images/refrigerators/md10781901/refrigerator-lg-dios-ai-objet-d646-071-04-reason-direct-water-pc.jpg",
        eyebrow: "구독 전문케어",
      },
      "9": {
        image: "https://www.lge.co.kr/kr/bestcare/service-installation-removal/images/img-refrigerators-step02.jpg",
        eyebrow: "설치 체크",
      },
      "13": {
        image: "https://static.lge.co.kr/kr/images/refrigerators/md10781898/refrigerator-lg-dios-ai-objet-d646-091-01-reason-dual-fresh-pc.jpg",
        eyebrow: "프리미엄 기능",
        objectPositionClass: "object-right-bottom",
      },
    },
  },
  airconditioner: {
    order: ["15", "18", "19", "20", "21", "17", "22"],
    cards: {
      "15": {
        image: "https://www.lge.co.kr/kr/images/air-conditioners/md10731826/usp/26_Tower1_9s_AI_coldfree_detail_03.jpg",
        eyebrow: "AI 콜드프리",
      },
      "18": {
        image: "https://www.lge.co.kr/kr/usp_dcr/air-conditioner/2025/25_Tower1/03.soft-wind/25_Tower1_9s_soft-wind_Detail.jpg",
        eyebrow: "AI바람",
      },
      "19": {
        image: "https://static.lge.co.kr/kr/images/air-conditioners/md10731826/usp/26_Tower1_9s_specialized_wind_cover.jpg",
        eyebrow: "청정 · UVnano",
        objectPositionClass: "object-top",
      },
      "20": {
        image: "https://static.lge.co.kr/kr/images/air-conditioners/md10731826/usp/26_Tower1_9s_AI_radar_cover.jpg",
        eyebrow: "AI편의기능 · 절전",
        objectPositionClass: "object-top",
      },
      "21": {
        image: "https://www.lge.co.kr/kr/images/common/gallery_list/images/air-conditioners/25_tower_9s_08.png",
        eyebrow: "라인업 비교",
      },
    },
  },
  tv: {
    order: ["1", "2", "3", "4", "6", "5"],
    cards: {
      "1": {
        image: "https://static.lge.co.kr/kr/images/tvs/2026/G6/OLEDG6_00_01_pc.jpg",
        eyebrow: "자발광 올레드",
        objectPositionClass: "object-bottom",
      },
      "2": {
        image: "https://static.lge.co.kr/kr/images/tvs/2026/G6/OLEDG6_00_03_pc.jpg",
        eyebrow: "AI 화질 엔진",
        objectPositionClass: "object-bottom",
      },
      "3": {
        image: "https://static.lge.co.kr/kr/images/tvs/2026/G6/OLEDG6_00_02_pc.jpg",
        eyebrow: "퍼펙트 블랙 & 퍼펙트 컬러",
        objectPositionClass: "object-bottom",
      },
      "6": {
        image: "https://www.lge.co.kr/kr/images/tvs/2026/G6/OLEDG6_02_04_pc_b.jpg",
        eyebrow: "고객 리뷰",
      },
      "5": {
        image: "https://www.lge.co.kr/kr/images/tvs/2026/G6/OLEDG6_07_01_pc.jpg",
        eyebrow: "라인업 비교",
      },
    },
  },
  washer: {
    cards: {
      "3": {
        image: "https://static.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525EGP6Z_subpoint_B_pc.jpg",
        eyebrow: "AI DD x 6모션",
        objectPositionClass: "object-[center_65%]",
      },
      "4": {
        image: "https://static.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525EGP6Z_mainpoint_pc.png",
        eyebrow: "콘덴서 자동세척",
      },
    },
  },
  washcombo: {
    cards: {
      "1": {
        image: "https://static.lge.co.kr/kr/images/wash-combo/md10792826/usp/FC2521TX6C_mainpoint_pc.png",
        eyebrow: "AI 올인원 세탁+건조",
      },
      "2": {
        image: "https://static.lge.co.kr/kr/images/wash-combo/md10867827/gallery/medium05.jpg",
        eyebrow: "국내 최대 25kg 세탁 + 21kg 건조",
        fit: "contain",
        containBackground: "white",
      },
      "3": {
        image: "https://www.lge.co.kr/kr/images/wash-combo/md10792826/usp/FC2521TX6C_11_steam_sterilization.jpg",
        eyebrow: "트루스팀",
      },
      "4": {
        image: "/__l5e/assets-v1/1435d98b-daea-4b7b-a191-f282c8380294/washcombo-automatic.jpg",
        eyebrow: "플랫세제함(자동세제)",
        fit: "contain",
      },
      "5": {
        image: "https://static.lge.co.kr/kr/images/wash-combo/md10867827/gallery/medium-interior01.jpg",
        eyebrow: "All New Full 플랫 디자인",
        fit: "contain",
      },
    },
  },
};
