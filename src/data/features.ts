/** 제품별 문구는 각각의 *Features.ts 파일에서 수정하세요. 경로 안내: docs/content-editing.md */
import { hydrotowerFeatures } from "@/data/hydrotowerFeatures";
import { stylerFeatures } from "@/data/stylerFeatures";
import { tvFeatures } from "@/data/tvFeatures";
import { refrigeratorFeatures } from "@/data/refrigeratorFeatures";
import { washtowerFeatures } from "@/data/washtowerFeatures";
import { airconditionerFeatures } from "@/data/airconditionerFeatures";
import { vacuumFeatures } from "@/data/vacuumFeatures";
import { pcFeatures } from "@/data/pcFeatures";
import { cookingFeatures } from "@/data/cookingFeatures";
import { bathairFeatures } from "@/data/bathairFeatures";
import { washcomboFeatures } from "@/data/washcomboFeatures";

/** 추가 설치 비용 표의 한 행 */
export interface InstallCostRow {
  item: string;
  price: string;
  unit: string;
  description: string;
}

/** 행 기반 추가 설치 비용 표 */
export interface InstallCostTable {
  /** 표 위 제목 (예: 바스에어시스템 추가 설치 비용) */
  title?: string;
  /** 표 우측 상단 기준 문구 (예: [단가 : 원, VAT 포함]) */
  headerNote?: string;
  rows: InstallCostRow[];
  /** 표 하단 참고 문구 */
  notes?: string[];
}

export interface ProductComparisonTable {
  name: string;
  imageUrl: string;
  category?: string;
  /** 대표 추천 제품에만 표시하는 BEST 배지 플래그 */
  best?: boolean;
  specs: {
    label: string;
    values: string[];
    highlighted?: boolean;
    /** 단위를 항목명(라벨)로 옮긴 수치 행: 여백·글자 크기를 줄여 한 줄로 표시 */
    compact?: boolean;
    /** 항목명 옆 정보 아이콘(i)에 보여주는 표기 설명 */
    hint?: string;
    /** 값의 첫 줄만 굵게 표시 (제품별 추천 상황 등) */
    emphasizeFirst?: boolean;

  }[];
}

export interface GalleryImage {
  url: string;
  title?: string;
  description?: string;
}

export interface MediaSlide {
  mediaType: "video" | "image" | "youtube";
  mediaUrl: string;
  fallbackUrl?: string;
  isShorts?: boolean;
  title?: string;
  description?: string;
}

export interface CollapsibleDisclaimer {
  title: string;
  items: string[];
}

export interface SubscriptionServiceItem {
  label: string;
  imageUrl: string;
  description: string;
  /** 이미지 아래 bullet 형태의 세부 안내 */
  details?: string[];
}

export interface TrueSteamCourseDisclaimer {
  title: string;
  items: string[];
}

export interface TrueSteamCourse {
  name: string;
  type?: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  disclaimers?: TrueSteamCourseDisclaimer[];
}

export interface FeatureTab {
  label: string;
  description?: string;
  descriptionTitle?: string;
  mediaType?: "video" | "image" | "table" | "gallery" | "youtube";
  tableData?: ProductComparisonTable[];
  costTable?: InstallCostTable;
  mediaUrl?: string;
  posterImage?: string;
  fallbackUrl?: string;
  isShorts?: boolean;
  mediaSlides?: MediaSlide[];
  galleryImages?: (string | GalleryImage)[];
  /** 갤러리 캐러셀 이미지의 최대 높이(px). 세로 이미지를 다른 미디어와 비슷한 높이로 제한 */
  galleryImageMaxHeight?: number;
  /** 갤러리 이미지 아래 캡션 박스 숨김 */
  galleryHideCaptions?: boolean;
  /** 갤러리 이미지 클릭 시 확대 보기(라이트박스) 활성 */
  galleryZoom?: boolean;
  highlights?: string[];
  caption?: string;
  belowMediaImage?: { url: string; alt?: string; caption?: string };
  frameBg?: string;
  imageFit?: "cover" | "contain" | "original";
  imagePosition?: string;
  videoAspectRatio?: string;
  videoObjectFit?: "cover" | "contain";
  collapsibleDisclaimers?: CollapsibleDisclaimer[];
  /** 메인 미디어(영상) 아래에 표시할 이미지+설명 그리드 */
  mediaGallery?: GalleryImage[];
}

export interface HighlightDetail {
  title: string;
  description: string;
  mediaType: "video" | "image" | "youtube";
  mediaUrl: string;
  isShorts?: boolean;
  fallbackUrl?: string;
}

/** 메인 콘텐츠 하위에 위치하는 세부 기능 (아코디언 카드) */
export interface SubFeature {
  /** 기능 명칭 (예: AI 타임 센싱) */
  label: string;
  /** 흐름 상 역할 (예: 분석 · 안내 · 기록) */
  step?: string;
  title: string;
  description: string;
  mediaType?: "video" | "image" | "youtube";
  mediaUrl?: string;
  isShorts?: boolean;
  fallbackUrl?: string;
  /** 세부정보 토글에 노출할 디스클라이머 */
  disclaimers?: TrueSteamCourseDisclaimer[];
}

export interface Feature {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  tag?: string;
  mediaType: "video" | "image" | "table" | "gallery" | "youtube";
  mediaUrl: string;
  /** 비디오 재생 전/로딩 중 표시할 포스터 이미지 */
  posterImage?: string;
  /** 외부 페이지를 인앱 iframe으로 임베드 (예: 고객 리뷰) */
  embedUrl?: string;
  fallbackUrl?: string; // MP4 fallback URL for webOS compatibility
  description: string;
  descriptionTitle?: string;
  highlights: string[];
  highlightDetails?: Record<string, HighlightDetail>;
  tableData?: ProductComparisonTable[];
  costTable?: InstallCostTable;
  galleryImages?: (string | GalleryImage)[];
  /** 갤러리 캐러셀 이미지의 최대 높이(px). 세로 이미지를 다른 미디어와 비슷한 높이로 제한 */
  galleryImageMaxHeight?: number;
  galleryHideCaptions?: boolean;
  galleryZoom?: boolean;
  mediaSlides?: MediaSlide[];
  belowMediaImage?: { url: string; alt?: string; caption?: string };
  mediaSectionTitle?: string;
  /** 메인 미디어(영상) 아래에 표시할 이미지+설명 그리드 */
  mediaGallery?: GalleryImage[];

  isShorts?: boolean;
  disclaimers?: string[];
  collapsibleDisclaimers?: CollapsibleDisclaimer[];
  /** 메인 미디어 바로 아래 노출되는 일반 디스클레이머 */
  mediaDisclaimers?: string[];
  /** 메인 미디어 바로 아래 노출되는 접이식 디스클레이머 */
  mediaCollapsibleDisclaimers?: CollapsibleDisclaimer[];
  tabs?: FeatureTab[];
  tabsVariant?: "pill" | "underline";
  showMainMedia?: boolean;
  /** 메인 미디어 이미지를 컨텐츠 폭에 맞춰 꽉 채움 */
  fullWidthMedia?: boolean;
  /** 메인 미디어 이미지 표시 방식: original = 원본 비율 유지, 블러 없음 */
  imageFit?: "cover" | "contain" | "original";
  /** 비디오 강제 가로 비율 (예: "16/9"). 지정 시 object-fit으로 꽉 채움 */
  videoAspectRatio?: string;
  /** 비디오 강제 비율 적용 시 object-fit (기본 cover) */
  videoObjectFit?: "cover" | "contain";
  /** 메인 콘텐츠 하위 세부 기능 (아코디언) */
  subFeatures?: SubFeature[];
  /** 세부 기능 영역 제목/부제 */
  subFeaturesTitle?: string;
  subFeaturesSubtitle?: string;

  /** 트루스팀 등 실제 적용 코스 소개 카드 */
  courses?: TrueSteamCourse[];

  /** 코스 섹션 제목 (기본값: 트루스팀 적용 코스) */
  coursesTitle?: string;

  /** 구독 케어 서비스 인터랙티브 항목 (이미지 + 설명 + 리스트) */
  subscriptionServiceItems?: SubscriptionServiceItem[];

  disabled?: boolean;

  /** true면 SC(관리자) 계정에서만 노출, 매장 계정에서는 숨김 */
  scOnly?: boolean;
}

export const featuresMap: Record<string, Feature[]> = {
  hydrotower: hydrotowerFeatures,
  styler: stylerFeatures,
  tv: tvFeatures,
  refrigerator: refrigeratorFeatures,
  "ai-washtower": washtowerFeatures,
  airconditioner: airconditionerFeatures,
  vacuum: vacuumFeatures,
  pc: pcFeatures,
  cooking: cookingFeatures,
  bathair: bathairFeatures,
  washcombo: washcomboFeatures,
};

// Lucide icon name map – used by FeatureCard and FeatureDetail to render SVG icons
// Keys must match the `icon` field in each Feature object
export const featureIconNames: Record<string, string> = {
  Monitor: "Monitor",
  Cpu: "Cpu",
  Brain: "Brain",
  Expand: "Expand",
  CloudFog: "CloudFog",
  Beaker: "Beaker",
  RectangleHorizontal: "RectangleHorizontal",
  Palette: "Palette",
  Volume2: "Volume2",
  Tv: "Tv",
  Gamepad2: "Gamepad2",
  Maximize2: "Maximize2",
  Zap: "Zap",
  Shirt: "Shirt",
  Wind: "Wind",
  Sparkles: "Sparkles",
  UtensilsCrossed: "UtensilsCrossed",
  dress: "Shirt",
  Seedling: "Sprout",
  Search: "Search",
  Cleaning: "Brush",
  ImageIcon: "Image",
  Ruler: "Ruler",
  Wrench: "Wrench",
  Puzzle: "Puzzle",
  Flame: "Flame",
  EyeOff: "EyeOff",
  Armchair: "Armchair",
  Move: "Move",
  Scissors: "Scissors",
  Globe: "Globe",
  Shield: "Shield",
  ShieldCheck: "ShieldCheck",
  Navigation: "Navigation",
  Square: "EyeOff",
  Gift: "Gift",
  Cable: "Cable",
  Droplets: "Droplets",
  ClipboardCheck: "ClipboardCheck",
};

// Keep legacy export for backwards compat (unused but safe)
export const featureIconMap = featureIconNames;

export const getFeaturesByProductId = (productId: string): Feature[] => {
  return featuresMap[productId] || [];
};

export const getFeatureById = (productId: string, featureId: string): Feature | undefined => {
  const features = featuresMap[productId] || [];
  return features.find((f) => f.id === featureId);
};
