export interface Feature {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  mediaType: "video" | "image";
  mediaUrl: string;
  description: string;
  highlights: string[];
}

export const featuresMap: Record<string, Feature[]> = {
  tv: [
    {
      id: "dolby-atmos",
      title: "돌비 애트모스",
      subtitle: "입체적인 사운드\n몰입감 있는 경험",
      icon: "Volume2",
      mediaType: "video",
      mediaUrl: "https://www.youtube.com/watch?v=example1",
      description: "돌비 애트모스 기술로 천장에서 쏟아지는 듯한 입체 사운드를 경험하세요. TV 스피커만으로도 영화관 같은 몰입감을 선사합니다.",
      highlights: ["360도 입체 사운드", "영화관급 오디오", "AI 사운드 최적화", "무선 서라운드 호환"]
    },
    {
      id: "smart-tv",
      title: "스마트 TV",
      subtitle: "webOS\n직관적인 인터페이스",
      icon: "Tv",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/images/tv/md09041133/gallery/medium02.jpg",
      description: "webOS 기반의 직관적인 스마트 TV 인터페이스로 넷플릭스, 유튜브 등 다양한 앱을 빠르게 실행하고 AI 음성 제어로 편리하게 사용하세요.",
      highlights: ["webOS 플랫폼", "AI 음성 제어", "다양한 스트리밍 앱", "매직 리모컨 지원"]
    },
    {
      id: "gaming-mode",
      title: "게이밍 모드",
      subtitle: "1ms 응답속도\n120Hz 주사율",
      icon: "Gamepad2",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/images/tv/md09041133/gallery/medium03.jpg",
      description: "1ms GTG 응답속도와 120Hz 주사율로 끊김 없는 게이밍을 경험하세요. VRR, ALLM 지원으로 최적의 게임 환경을 제공합니다.",
      highlights: ["1ms 응답속도", "120Hz 주사율", "VRR/ALLM 지원", "게임 최적화 엔진"]
    }
  ],
  refrigerator: [
    {
      id: "fit-max",
      title: "Fit&Max",
      subtitle: "더 넓어진 수납공간\n공간 활용 극대화",
      icon: "Maximize2",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/images/refrigerators/md09569594/gallery/medium02.jpg",
      description: "혁신적인 내부 설계로 동일 외관에서 더 넓은 수납 공간을 확보했습니다. 대용량 식재료도 여유롭게 보관하세요.",
      highlights: ["수납공간 20% 확대", "유연한 선반 구조", "도어 수납 최적화", "냉기 순환 시스템"]
    },
    {
      id: "energy-saving",
      title: "에너지 절약",
      subtitle: "인버터 리니어 컴프레서\n1등급 에너지 효율",
      icon: "Zap",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/images/refrigerators/md09569594/gallery/medium03.jpg",
      description: "LG 인버터 리니어 컴프레서로 에너지 소비를 최소화하고 소음도 줄였습니다. 10년 보증으로 오래도록 안심하세요.",
      highlights: ["에너지 1등급", "저소음 설계", "10년 컴프레서 보증", "스마트 인버터"]
    }
  ],
  styler: [
    {
      id: "dynamic-hanger",
      title: "다이내믹 무빙행어",
      subtitle: "360도 스윙\n구석구석 케어",
      icon: "Shirt",
      mediaType: "video",
      mediaUrl: "https://www.youtube.com/watch?v=styler1",
      description: "다이내믹 무빙행어가 360도로 스윙하며 의류 구석구석까지 스팀을 전달합니다. 주름 제거부터 살균까지 완벽하게 케어합니다.",
      highlights: ["360도 스윙 동작", "트루스팀 기술", "99.9% 살균", "섬세한 의류 케어"]
    },
    {
      id: "contamination-test",
      title: "오염도 테스트",
      subtitle: "AI 센서\n맞춤형 관리",
      icon: "Sparkles",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/images/styler/md09536291/gallery/medium02.jpg",
      description: "AI 센서가 의류의 오염도를 분석하여 최적의 코스를 자동으로 선택합니다. 과잉 케어 없이 효율적으로 관리하세요.",
      highlights: ["AI 오염도 감지", "맞춤 코스 추천", "에너지 효율 최적화", "스마트 진단"]
    },
    {
      id: "spec-compare",
      title: "스펙 비교",
      subtitle: "올뉴 스타일러\n업그레이드 포인트",
      icon: "Maximize2",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/images/styler/md09536291/gallery/medium03.jpg",
      description: "올뉴 스타일러는 기존 모델 대비 성능과 편의성이 크게 향상되었습니다. 더 강력해진 스팀과 더 조용해진 동작을 경험하세요.",
      highlights: ["스팀량 30% 증가", "소음 20% 감소", "신규 코스 추가", "스마트 연동 강화"]
    }
  ],
  washer: [
    {
      id: "ai-dd",
      title: "AI DD 세탁",
      subtitle: "직접구동 모터\n최적화된 세탁",
      icon: "Cpu",
      mediaType: "video",
      mediaUrl: "https://www.youtube.com/watch?v=washer1",
      description: "AI DD 기술이 의류의 무게와 소재를 감지하여 최적의 세탁 모션을 자동으로 선택합니다. 옷감 손상은 줄이고 세탁력은 높였습니다.",
      highlights: ["6가지 세탁 모션", "소재 자동 감지", "옷감 손상 최소화", "에너지 절약"]
    },
    {
      id: "steam-sanitize",
      title: "스팀 살균",
      subtitle: "트루스팀\n99.9% 살균",
      icon: "Sparkles",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/images/washing-machines/md09536334/gallery/medium02.jpg",
      description: "트루스팀 기술로 세탁물을 99.9% 살균하고 알레르기 유발 물질을 제거합니다. 아이 옷, 속옷 세탁에 안심하세요.",
      highlights: ["99.9% 살균", "알레르겐 제거", "깊은 침투 스팀", "아기 옷 전용 코스"]
    }
  ],
  vacuum: [
    {
      id: "powerful-suction",
      title: "강력한 흡입력",
      subtitle: "인버터 모터\n먼지 완벽 제거",
      icon: "Wind",
      mediaType: "video",
      mediaUrl: "https://www.youtube.com/watch?v=vacuum1",
      description: "스마트 인버터 모터가 강력한 흡입력을 유지하면서도 소음은 최소화합니다. 미세먼지까지 깨끗하게 제거하세요.",
      highlights: ["강력 흡입력", "저소음 설계", "5단계 여과 시스템", "미세먼지 99.99% 제거"]
    },
    {
      id: "wireless-freedom",
      title: "무선 자유로움",
      subtitle: "80분 연속 사용\n가벼운 무게",
      icon: "Zap",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/images/vacuum-cleaners/md09530863/gallery/medium02.jpg",
      description: "최대 80분 연속 사용 가능한 고용량 배터리와 가벼운 무게로 집안 구석구석 자유롭게 청소하세요.",
      highlights: ["80분 연속 사용", "1.9kg 경량 설계", "탈착식 배터리", "벽걸이 충전 거치대"]
    }
  ],
  airconditioner: [
    {
      id: "dual-inverter",
      title: "듀얼 인버터",
      subtitle: "빠른 냉방\n에너지 절약",
      icon: "Zap",
      mediaType: "video",
      mediaUrl: "https://www.youtube.com/watch?v=ac1",
      description: "듀얼 인버터 컴프레서가 빠르게 냉방하고 적정 온도에서 효율적으로 운전합니다. 에너지 비용을 절감하세요.",
      highlights: ["빠른 냉방 속도", "에너지 1등급", "저소음 운전", "10년 컴프레서 보증"]
    },
    {
      id: "auto-clean",
      title: "자동 청소",
      subtitle: "청정 에어컨\n간편한 관리",
      icon: "Sparkles",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/images/air-conditioner/md09530879/gallery/medium02.jpg",
      description: "자동 청소 기능으로 열교환기의 먼지와 세균을 스스로 제거합니다. 항상 깨끗한 바람을 즐기세요.",
      highlights: ["자동 건조 기능", "항균 필터", "먼지 자동 제거", "청정 유지 알림"]
    }
  ],
  pc: [
    {
      id: "gaming-performance",
      title: "최신 게이밍 성능",
      subtitle: "고사양 그래픽\n부드러운 프레임",
      icon: "Monitor",
      mediaType: "video",
      mediaUrl: "https://www.youtube.com/watch?v=pc1",
      description: "최신 그래픽 카드와 고성능 프로세서로 AAA 게임을 최고 설정에서 부드럽게 즐기세요. e스포츠부터 VR까지 완벽 지원합니다.",
      highlights: ["RTX 그래픽", "고주사율 지원", "VR Ready", "게임 최적화"]
    },
    {
      id: "rgb-cooling",
      title: "RGB 쿨링",
      subtitle: "효율적인 냉각\n스타일리시한 디자인",
      icon: "Palette",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/images/monitors/md09515063/gallery/medium02.jpg",
      description: "RGB LED 조명과 효율적인 쿨링 시스템을 갖춘 세련된 디자인. 게이밍 공간을 화려하게 연출하세요.",
      highlights: ["RGB 커스터마이징", "듀얼 팬 쿨링", "조용한 냉각", "케이스 일체형"]
    }
  ],
  cooking: [
    {
      id: "large-capacity",
      title: "대용량 수납",
      subtitle: "16인용\n한 번에 세척",
      icon: "UtensilsCrossed",
      mediaType: "video",
      mediaUrl: "https://www.youtube.com/watch?v=dish1",
      description: "16인용 대용량 식기세척기로 많은 양의 식기도 한 번에 세척하세요. 대형 냄비, 프라이팬도 여유롭게 넣을 수 있습니다.",
      highlights: ["16인용 대용량", "조절 가능한 선반", "대형 용기 수납", "공간 최적화 설계"]
    },
    {
      id: "quad-wash",
      title: "쿼드워시 시스템",
      subtitle: "4방향 분사\n깨끗한 세척",
      icon: "Sparkles",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/images/dish-washer/md09536282/gallery/medium02.jpg",
      description: "4개의 분사 암이 모든 방향에서 강력하게 물을 분사하여 식기 구석구석을 깨끗하게 세척합니다.",
      highlights: ["4방향 분사", "고압 세척", "음식물 분쇄", "스팀 건조"]
    }
  ]
};

export const featureIconMap: Record<string, string> = {
  Monitor: "🖥️",
  Cpu: "🧠",
  Palette: "🎨",
  Volume2: "🔊",
  Tv: "📺",
  Gamepad2: "🎮",
  Maximize2: "📐",
  Zap: "⚡",
  Shirt: "👔",
  Wind: "💨",
  Sparkles: "✨",
  UtensilsCrossed: "🍽️"
};

export const getFeaturesByProductId = (productId: string): Feature[] => {
  return featuresMap[productId] || [];
};

export const getFeatureById = (productId: string, featureId: string): Feature | undefined => {
  const features = featuresMap[productId] || [];
  return features.find(f => f.id === featureId);
};
