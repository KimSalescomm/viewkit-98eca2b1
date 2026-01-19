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
    id: "tv",
    name: "TV",
    title: "OLED TV",
    description: "완벽한 블랙, 무한한 컬러",
    keyVisualImage: "https://www.lge.co.kr/kr/images/tv/md09041133/gallery/medium01.jpg",
    icon: "Tv"
  },
  {
    id: "refrigerator",
    name: "냉장고",
    title: "스마트 냉장고",
    description: "신선함을 지키는 기술",
    keyVisualImage: "https://www.lge.co.kr/kr/images/refrigerators/md09569594/gallery/medium01.jpg",
    icon: "Box"
  },
  {
    id: "styler",
    name: "스타일러",
    title: "EVERYDAY EVERYWEAR",
    description: "스타일링, 건조, 제습을 ALL NEW 스타일러 하나로",
    keyVisualImage: "https://www.lge.co.kr/kr/images/styler/md09536291/gallery/medium01.jpg",
    icon: "Shirt"
  },
  {
    id: "washer",
    name: "워시타워",
    title: "워시타워",
    description: "스마트한 세탁 경험",
    keyVisualImage: "https://www.lge.co.kr/kr/images/washing-machines/md09536334/gallery/medium01.jpg",
    icon: "Waves"
  },
  {
    id: "vacuum",
    name: "청소기",
    title: "무선 청소기",
    description: "강력한 흡입력, 자유로운 청소",
    keyVisualImage: "https://www.lge.co.kr/kr/images/vacuum-cleaners/md09530863/gallery/medium01.jpg",
    icon: "Sparkles"
  },
  {
    id: "airconditioner",
    name: "휘센",
    title: "휘센 에어컨",
    description: "완벽한 실내 공기 관리",
    keyVisualImage: "https://www.lge.co.kr/kr/images/air-conditioner/md09530879/gallery/medium01.jpg",
    icon: "Wind"
  },
  {
    id: "pc",
    name: "PC",
    title: "게이밍 PC",
    description: "최고의 성능, 완벽한 게이밍",
    keyVisualImage: "https://www.lge.co.kr/kr/images/monitors/md09515063/gallery/medium01.jpg",
    icon: "Monitor"
  },
  {
    id: "cooking",
    name: "쿠킹",
    title: "식기세척기",
    description: "편리함과 깔끔함을 동시에",
    keyVisualImage: "https://www.lge.co.kr/kr/images/dish-washer/md09536282/gallery/medium01.jpg",
    icon: "UtensilsCrossed"
  }
];

export const iconMap: Record<string, string> = {
  Tv: "📺",
  Box: "🧊",
  Shirt: "👔",
  Waves: "🌊",
  Sparkles: "✨",
  Wind: "💨",
  Monitor: "🖥️",
  UtensilsCrossed: "🍽️"
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};
