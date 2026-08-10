import washerKeyVisualAsset from "@/assets/washer-keyvisual.png.asset.json";
import stylerKeyVisualAsset from "@/assets/styler-keyvisual.png.asset.json";

// 퍼블리시 스냅샷에 안정적인 CDN URL을 저장하기 위해 자산 포인터의 url을 사용합니다.
const washerKeyVisual = washerKeyVisualAsset.url;
const stylerKeyVisual = stylerKeyVisualAsset.url;


export interface Product {
  id: string;
  name: string;
  title: string;
  description: string;
  keyVisualImage: string;
  secondaryKeyVisualImage?: string;
  icon: string;
}

export const products: Product[] = [
  {
    id: "refrigerator",
    name: "냉장고",
    title: "DIOS 냉장고",
    description: "fresh sySTEM으로 완성되는 직수형 냉장고 STEM",
    keyVisualImage: "https://www.lge.co.kr/kr/story/buying-guide/img/lg-refrigerator-guide/keyvisual_02.jpg",
    icon: "Box",
  },
  {
    id: "vacuum",
    name: "청소로봇",
    title: "청소로봇",
    description: "세계최초 100℃ 투웨이 스팀 청소로봇.",
    // 상세 페이지(/product/vacuum) 전용 PC 가로형 이미지 — 제품 리스트(/) 썸네일과는 별도 관리
    keyVisualImage: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_lifestyle_livingroom_pc_01.jpg",
    secondaryKeyVisualImage: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_lifestyle_kitchen_pc_01.jpg",
    icon: "Sparkles",


  },
  {
    id: "styler",
    name: "의류관리기",
    title: "스타일러",
    description: "스타일링, 건조, 제습을 ALL NEW 스타일러 하나로",
    keyVisualImage: stylerKeyVisual,
    icon: "Shirt",
  },
  {
    id: "tv",
    name: "TV",
    title: "The Next 올레드",
    description: "지금까지 보지 못한 빛과 색을 깨운 올레드의 탄생",
    keyVisualImage: "https://static.lge.co.kr/kr/story/buying-guide/2025/img/tv/img_P14_001_10.png",
    icon: "Tv",
  },
  {
    id: "washer",
    name: "워시타워",
    title: "워시타워",
    description: "세상에 없던 6모션 세탁 건조의 시작",
    keyVisualImage: washerKeyVisual,
    icon: "Waves",
  },
  {
    id: "airconditioner",
    name: "에어컨",
    title: "LG 휘센 AI 오브제컬렉션",
    description: "온도를 넘어 습도까지 완벽한 바람",
    keyVisualImage: "https://static.lge.co.kr/kr/images/air-conditioners/md10738836/gallery/large-interior-m01.jpg",
    icon: "Wind",
  },
  {
    id: "pc",
    name: "PC",
    title: "게이밍 PC",
    description: "최고의 성능, 완벽한 게이밍",
    keyVisualImage: "https://www.lge.co.kr/kr/story/buying-guide/img/lg-pc-notebook-guide/keyvisual_01.jpg",
    icon: "Monitor",
  },
  {
    id: "cooking",
    name: "식기세척기",
    title: "식기세척기",
    description: "편리함과 깔끔함을 동시에",
    keyVisualImage: "https://www.lge.co.kr/kr/usp_dcr/dishwasher_Largecapacity_Cover.jpg",
    icon: "UtensilsCrossed",
  },
  {
    id: "bathair",
    name: "바스에어",
    title: "바스에어",
    description: "습기·냄새·곰팡이 걱정 없는\n스마트 욕실 공기케어 (내부용)",
    keyVisualImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1600&h=1000&fit=crop",
    icon: "Droplets",
  },

];

export const iconMap: Record<string, string> = {
  Tv: "📺",
  Box: "🧊",
  Shirt: "👔",
  Waves: "🌊",
  Sparkles: "✨",
  Wind: "💨",
  Monitor: "🖥️",
  UtensilsCrossed: "🍽️",
  Droplets: "💧",
};


export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};
