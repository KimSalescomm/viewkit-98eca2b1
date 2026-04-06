export interface Product {
  id: string;
  name: string;
  title: string;
  description: string;
  keyVisualImage: string;
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
    id: "styler",
    name: "의류관리기",
    title: "스타일러",
    description: "스타일링, 건조, 제습을 ALL NEW 스타일러 하나로",
    keyVisualImage: "https://www.lge.co.kr/kr/images/lg-styler/md10544833/gallery/medium-interior01.jpg",
    icon: "Shirt",
  },
  {
    id: "washer",
    name: "워시타워",
    title: "워시타워",
    description: "스마트한 세탁 경험",
    keyVisualImage: "https://www.lge.co.kr/kr/story/useful-tip/img/washtower-washcombo/img-main-visual.png",
    icon: "Waves",
  },
  {
    id: "vacuum",
    name: "청소기",
    title: "무선 청소기",
    description: "강력한 흡입력, 자유로운 청소",
    keyVisualImage: "https://www.lge.co.kr/kr/images/vacuum-cleaners/md10360831/usp2/24_pc.png",
    icon: "Sparkles",
  },
  {
    id: "airconditioner",
    name: "휘센",
    title: "휘센 에어컨",
    description: "완벽한 실내 공기 관리",
    keyVisualImage: "https://www.lge.co.kr/kr/images/common/gallery_list/images/air-conditioners/25_tower_9s_02.png",
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
    name: "쿠킹",
    title: "식기세척기",
    description: "편리함과 깔끔함을 동시에",
    keyVisualImage: "https://www.lge.co.kr/kr/usp_dcr/dishwasher_Largecapacity_Cover.jpg",
    icon: "UtensilsCrossed",
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
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};
