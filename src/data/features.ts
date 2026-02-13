export interface ProductComparisonTable {
  name: string;
  imageUrl: string;
  specs: {
    label: string;
    values: string[];
  }[];
}

export interface GalleryImage {
  url: string;
  title?: string;
  description?: string;
}

export interface Feature {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  tag?: string;
  mediaType: "video" | "image" | "table" | "gallery" | "youtube";
  mediaUrl: string;
  fallbackUrl?: string; // MP4 fallback URL for webOS compatibility
  description: string;
  highlights: string[];
  tableData?: ProductComparisonTable[];
  galleryImages?: (string | GalleryImage)[];
  isShorts?: boolean;
}

export const featuresMap: Record<string, Feature[]> = {
  // 스타일러 특장점
  styler: [
    {
      id: "1",
      title: "?",
      subtitle: "집에서 매일 새 옷처럼.\n미세먼지부터 냄새까지 관리하는 스타일러의 핵심 원리를 확인해보세요.",
      icon: "Wind",
      tag: "듀얼 히팅 스팀",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/lg-styler/md10747827/usp/SC5GMR80S_12_true_steam_Detail_01.mp4",
      description: "드라이 없이도 매일 산뜻하게. 옷 속 미세먼지와 냄새를 줄여주는 스타일링 케어.",
      highlights: ["옷 속 미세먼지·냄새 케어", "매일 입는 옷도 산뜻하게", "집에서 간편하게 관리"],
    },
    {
      id: "2",
      title: "눈에 보이지 않는 먼지, 정말 없어졌을까요?",
    subtitle:
        "옷에도 세균, 먼지가 묻어와요!\n스타일링 후 오염도 대폭 감소",
      icon: "Cpu",
      mediaType: "video",
      mediaUrl: "https://youtu.be/Yq1l773oBGA?t=1343",
      description:
        "바깥에서 오염된 옷, 스타일러 후에는 오염도가 어떻게 바뀌었을까요? 확인해 보세요",
      highlights: ["스타일링 코스", "스팀 탈취", "유튜브 리뷰"],
    },
      ],
    },
    {
      id: "3",
      title: "우리 집엔 어떤 스타일러가 딱 맞을까요?",
      subtitle: "공간, 사용량, 라이프스타일에 맞춰\n나에게 꼭 맞는 모델을 비교해보세요.",
      icon: "Palette",
      tag: "모델 비교하기",
      mediaType: "gallery",
      mediaUrl: "",
      description: "사용 인원과 공간에 따라 라인업 선택이 달라집니다. 핵심 포인트만 빠르게 비교해보세요.",
      highlights: ["설치 공간", "사용량", "관리 목적(먼지/냄새/구김)", "라인업 비교"],
      galleryImages: [
        {
          url: "/images/styler-model-step1.jpeg",
          title: "1. 우리 집 설치 공간은 충분한가요?",
          description: "설치 위치의 폭·높이·깊이를 먼저 확인해요. 문 여닫이 공간도 함께 체크하면 더 좋아요.",
        },
        {
          url: "/images/styler-model-step2.jpeg",
          title: "2. 하루에 옷을 몇 벌 정도 관리하나요?",
          description: "사용량이 많을수록 용량/구성 선택이 중요해요. 자주 쓰는 옷 기준으로 떠올려보세요.",
        },
      ],
    },
  ],
  // TV 특장점
  tv: [
    {
      id: "4",
      title: "돌비 애트모스",
      subtitle: "입체적인 사운드",
      icon: "Volume2",
      mediaType: "video",
      mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      description:
        "돌비 애트모스 오디오 시스템으로 3차원 입체 음향을 경험하세요. 영화관에서 듣는 것과 같은 몰입감 넘치는 사운드를 가정에서 즐길 수 있습니다.",
      highlights: ["3D 서라운드 사운드", "오브젝트 기반 오디오", "40W 스테레오 스피커", "서브우퍼 내장"],
    },
    {
      id: "5",
      title: "스마트 TV 기능",
      subtitle: "모든 콘텐츠를 한곳에",
      icon: "Tv",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1200&h=800&fit=crop",
      description:
        "다양한 스트리밍 서비스와 앱을 지원하는 스마트 플랫폼이 내장되어 있습니다. 음성 명령으로 쉽게 제어하고 원하는 콘텐츠를 빠르게 찾을 수 있습니다.",
      highlights: ["주요 OTT 앱 지원", "음성 인식 리모컨", "스마트홈 허브 기능", "모바일 미러링"],
    },
    {
      id: "6",
      title: "게이밍 모드",
      subtitle: "프로게이머를 위한 성능",
      icon: "Gamepad2",
      mediaType: "video",
      mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      description:
        "1ms 응답속도와 HDMI 2.1 지원으로 최상의 게이밍 환경을 제공합니다. VRR과 ALLM 기술로 화면 끊김 없이 부드러운 게임 플레이가 가능합니다.",
      highlights: ["1ms 응답속도", "HDMI 2.1 (4K@120Hz)", "VRR & ALLM 지원", "게임 최적화 모드"],
    },
  ],

  // DIOS 냉장고 특장점
  refrigerator: [
    {
      id: "7",
      title: "매번 물 채우기, 번거롭지 않나요?",
      subtitle: "물통 없이 스스로 채우는 직수형\n편리한 냉장고 STEM을 확인해보세요.",
      icon: "Seedling",
      tag: "STEM이란?",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/refrigerators/md10559842/J816_172_step3filter_detail_01.mp4",
      description: "음식 보관을 넘어, 흐르는 물로 깨끗한 물과 얼음을 만드는 직수형 냉장고",
      highlights: [
        "흐르는 물로 얼음을 만드는 제빙 시스템",
        "전문가가 꼼꼼하게 관리하는 케어 시스템",
        "식재료를 신선하게 보관하는 냉기 시스템",
      ],
    },
    {
      id: "8",
      title: "나에겐 어떤 모델이 딱 맞을까요?",
      subtitle: "다양한 종류의 직수형 냉장고 STEM\n모델별 차이를 확인해 보세요.",
      icon: "Search",
      tag: "STEM 제품 비교",
      mediaType: "table",
      mediaUrl: "https://www.lge.co.kr/kr/story/trend/lg-refrigerators-dios-stem/product_img01.png",
      description: "STEM 얼음정수 냉장고와 STEM 베이직 냉장고의 주요 사양을 비교해보세요.",
      highlights: ["냉장고 용량", "정수기 디스펜서", "얼음 종류", "정수 필터", "케어 서비스"],
      tableData: [
        {
          name: "STEM 얼음정수",
          imageUrl: "https://www.lge.co.kr/kr/story/trend/lg-refrigerators-dios-stem/product_img01.png",
          specs: [
            { label: "냉장고 용량", values: ["800L대"] },
            { label: "정수기 디스펜서", values: ["있음", "(정수, 냉수, 각얼음, 조각얼음)"] },
            { label: "얼음 종류", values: ["각얼음, 조각 얼음", "미니 각얼음", "크래프트 아이스"] },
            { label: "정수 필터", values: ["중금속 9종, 노로 바이러스 걸러 주는", "3단계 정수 필터"] },
            { label: "케어 서비스", values: ["●"] },
          ],
        },
        {
          name: "STEM 베이직",
          imageUrl: "https://www.lge.co.kr/kr/story/trend/lg-refrigerators-dios-stem/product_img02.png",
          specs: [
            { label: "냉장고 용량", values: ["800L대"] },
            { label: "정수기 디스펜서", values: ["-"] },
            { label: "얼음 종류", values: ["미니 각얼음", "크래프트 아이스"] },
            { label: "정수 필터", values: ["중금속 7종, 박테리아 걸러 주는", "복합 안심 정수 필터"] },
            { label: "케어 서비스", values: ["●"] },
          ],
        },
        {
          name: "STEM 베이직 Fit & Max",
          imageUrl: "https://www.lge.co.kr/kr/images/refrigerators/md10553840/gallery/medium-interior01.jpg",
          specs: [
            { label: "냉장고 용량", values: ["600L대"] },
            { label: "정수기 디스펜서", values: ["-"] },
            { label: "얼음 종류", values: ["각얼음 (트레이)", "크래프트 아이스"] },
            { label: "정수 필터", values: ["중금속 7종, 박테리아 걸러 주는", "복합 안심 정수 필터"] },
            { label: "케어 서비스", values: ["●"] },
          ],
        },
      ],
    },
    {
      id: "9",
      title: "STEM 냉장고, 우리 집에 어떻게 설치하죠?",
      subtitle: "수도관 연결 어떻게 될지 고민되시죠?\n깔끔한 마무리까지 확인해보세요.",
      icon: "Ruler",
      tag: "설치 체크",
      mediaType: "gallery",
      mediaUrl: "",
      description:
        "수도관 매립 여부, 냉장고와 싱크대의 거리 등 환경에 따라 STEM 설치는 달라집니다. 가구색과 유사한 몰딩을 이용해 수도관이 드러나지 않도록 깔끔하게 마감합니다.",
      highlights: ["수도관 매립 여부 확인", "싱크대 타공 가능한지 확인", "몰딩 처리 확인"],
      galleryImages: [
        {
          url: "/images/installation-step1.jpeg",
          title: "1.냉장고장에 수도관이 매립되어 있나요?",
          description:
            "냉장고 장에 수도관이 있다면 STEM을 설치하기 가장 좋은 환경이에요! 깔끔하게 수도관을 연결할 수 있어요.",
        },
        {
          url: "/images/installation-step2.jpeg",
          title: "2.싱크대 거리가 가깝고, 싱크대 타공이 가능한가요?",
          description:
            "매립된 수도관이 없다면, 싱크대 옆면에 수도관을 꺼낼만큼 구멍을 내어 수도관이 밖으로 드러나지 않게 설치할 수 있어요.",
        },
        {
          url: "/images/installation-step3.jpeg",
          title: "3.싱크대 거리가 가깝지만, 싱크대 타공을 할 수 없다면?",
          description:
            "싱크대 아래 걸레받이 틈으로 수도관을 꺼내 연결할 수 있어요. 가구색과 가장 유사항 몰딩으로 깔끔하게 마무리 해드립니다.",
        },
        {
          url: "/images/installation-step4.jpeg",
          title: "4.싱크대가 냉장고를 놓을 위치와 다소 떨어져 있나요?",
          description:
            "싱크대와 냉장고 사이를 잇는 수도관을 벽면에 가깝게 붙여 설치합니다. 가구색과 가장 유사한 몰딩으로 깔끔하게 마무리 해드립니다",
        },
        {
          url: "/images/installation-step5.jpeg",
          title: "인테리어에 맞춘 몰딩 부자재",
          description:
            "Case3,4처럼 수도관이 밖으로 이어지는 경우에는 주방 가구 컬러에 맞춘 몰딩 부자재로 숨김 처리를 해드립니다.",
        },
      ],
    },
    {
      id: "10",
      title: "보이지 않는 물길 속, 관리는 누가 할까요?",
      subtitle: "필터부터 청소까지, 전문가가 알아서\n챙겨주는 전문 케어를 보여드려요.",
      icon: "Wrench",
      tag: "구독 전문케어",
      mediaType: "youtube",
      mediaUrl: "https://www.youtube.com/embed/dVEO3aYykTM?si=j4iIwotCwLBvji5k",
      description:
        "물이 흐르는 길을 세척, 청소하기 힘든 기계실 세척, 이사 후 재설치까지 다양한 케어서비스 혜택이 있습니다.",
      highlights: ["유로 세척 케어", "기계실 세척(프리미엄)", "고무패킹 케어", "소모품 교체"],
    },
    {
      id: "11",
      title: "빌트인 감성의 주방을 원한다면?",
      subtitle: "주방이 훨씬 넓고 깔끔해 보이는\n'Fit & Max' 냉장고를 확인해보세요.",
      icon: "Ruler",
      tag: "Fit & Max란?",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/refrigerators/md10516831/M626_hinge_pc.mp4",
      description:
        "도어 걸림을 없앤 제로 클리어런스 힌지가 만드는 단 4mm 간격의 완벽에 가까운 밀착! 인테리어 조화를 생각한 디자인으로 공간에 자연스럽게 녹아듭니다.",
      highlights: ["제로 클리어런스 힌지", "인테리어 냉장고", "다양한 라인업", "냉툭튀가 싫다면 Fit & Max로"],
    },
    {
      id: "12",
      title: "함께하면 더 좋은 Fit & Max 어떤 세트가 있나요?",
      subtitle: "인테리어는 Fit 용량은 Max\n주방이 돋보이는 조합을 모아봤어요.",
      icon: "Puzzle",
      tag: "Fit & Max 세트",
      mediaType: "gallery",
      mediaUrl: "",
      galleryImages: [
        {
          url: "https://www.lge.co.kr/kr/images/refrigerators/interior/I5.jpg",
          title: "Fit & Max 냉장고 + 4도어 김치냉장고 조합",
          description:
            "노크온이 있는 Fit & Max 냉장고와 든든한 480L 용량의 4도어 김치냉장고, 가족이 많거나 미식을 즐기는 분을 위한 조합",
        },
        {
          url: "https://www.lge.co.kr/kr/images/refrigerators/interior/i2.jpg",
          title: "Fit & Max 냉장고 + 3도어 김치냉장고 조합",
          description:
            "깔끔하게 밀착 설치한 Fit & Max 냉장고에 3도어 김치냉장고를 더하면 디자인도 용량도 부족하지 않은 최상의 조합이 되죠.",
        },
        {
          url: "https://www.lge.co.kr/kr/images/convertible-refrigerators/md10574832/XYZ324_fitmax_01.jpg",
          title: "Fit & Max 냉장고 + 컨버터블 (냉장/냉동/김치)",
          description: "내 주방에 딱 맞는 Fit & Max에 내 라이프스타일에 맞는 컨버터블 모델을 하나 더 추가해 보세요.",
        },
      ],
      description:
        "다양한 Fit & Max 라인업, STEM 냉장고, 김치, 냉장,냉동 전용 컨버터블을 내 생활에 맞게 조합해 보세요. 공간은 아름다워지고, 생활은 더 풍요로워집니다.",
      highlights: ["다양한 인테리어 연출", "조합으로 더 넉넉해지는 용량", "Fit & Max로 트렌디한 인테리어"],
    },
  ],

  // 세탁기 특장점
  washer: [
    {
      id: "13",
      title: "AI DD 세탁",
      subtitle: "옷감을 인식하여 최적의 세탁 패턴 제공",
      icon: "Cpu",
      mediaType: "video",
      mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      description:
        "AI 기술이 옷감의 종류와 무게를 자동으로 감지하여 최적의 세탁 모션을 제공합니다. 섬세한 옷감부터 두꺼운 이불까지 완벽하게 세탁합니다.",
      highlights: ["18가지 세탁 패턴", "옷감 손상 최소화", "세제 자동 투입", "AI 학습 기능"],
    },
    {
      id: "14",
      title: "스팀 살균",
      subtitle: "99.9% 세균 제거",
      icon: "Zap",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=1200&h=800&fit=crop",
      description:
        "고온 스팀으로 세탁물의 세균과 알레르기 유발물질을 효과적으로 제거합니다. 아기 옷이나 알레르기가 있는 가족의 의류도 안심하고 세탁할 수 있습니다.",
      highlights: ["60도 고온 스팀", "알레르기 케어", "진드기 제거", "무세제 살균 가능"],
    },
  ],

  // 에어컨 특장점
  airconditioner: [
    {
      id: "15",
      title: "듀얼 인버터",
      subtitle: "빠른 냉방, 조용한 운전",
      icon: "Wind",
      mediaType: "video",
      mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      description:
        "듀얼 인버터 컴프레서로 일반 에어컨보다 70% 빠르게 냉방하고, 소음은 절반으로 줄였습니다. 빠르고 조용한 쾌적함을 경험하세요.",
      highlights: ["70% 빠른 냉방", "50% 소음 감소", "10년 무상 보증", "에너지 효율 1등급"],
    },
    {
      id: "16",
      title: "자동 청소 기능",
      subtitle: "언제나 깨끗한 공기",
      icon: "Sparkles",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1631545806609-c9ba0e07de00?w=1200&h=800&fit=crop",
      description:
        "열교환기를 자동으로 세척하고 건조하여 곰팡이와 세균 번식을 방지합니다. 별도의 청소 없이도 항상 깨끗한 공기를 유지합니다.",
      highlights: ["자동 열교환기 세척", "건조 기능", "필터 알림", "항균 코팅"],
    },
  ],

  // 청소기 특장점
  vacuum: [
    {
      id: "17",
      title: "강력한 흡입력",
      subtitle: "200W 파워풀 모터",
      icon: "Zap",
      mediaType: "video",
      mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      description:
        "200W 고성능 모터로 카펫 깊숙은 곳의 먼지부터 미세먼지까지 강력하게 흡입합니다. 한 번의 청소로 집안 구석구석 깨끗하게 관리할 수 있습니다.",
      highlights: ["200W 모터", "5단계 흡입력 조절", "사이클론 시스템", "HEPA 필터"],
    },
    {
      id: "18",
      title: "무선 자유로움",
      subtitle: "60분 장시간 사용",
      icon: "Sparkles",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1200&h=800&fit=crop",
      description:
        "대용량 배터리로 최대 60분간 연속 사용이 가능합니다. 충전 중에도 스탠드에 보관하여 공간을 절약하고 언제든 꺼내 쓸 수 있습니다.",
      highlights: ["60분 연속 사용", "착탈식 배터리", "급속 충전", "스탠드 거치대"],
    },
  ],

  // PC 특장점
  pc: [
    {
      id: "19",
      title: "최신 게이밍 성능",
      subtitle: "RTX 4090 탑재",
      icon: "Monitor",
      mediaType: "video",
      mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      description:
        "최신 NVIDIA RTX 4090 그래픽카드와 인텔 13세대 프로세서로 AAA 게임을 최고 옵션에서 플레이할 수 있습니다. 레이트레이싱과 DLSS 3.0을 지원합니다.",
      highlights: ["RTX 4090 GPU", "인텔 i9-13900K", "DDR5 32GB RAM", "레이트레이싱 지원"],
    },
    {
      id: "20",
      title: "RGB 쿨링 시스템",
      subtitle: "화려하고 시원하게",
      icon: "Palette",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&h=800&fit=crop",
      description:
        "수냉식 쿨러와 RGB 팬으로 강력한 냉각 성능과 화려한 비주얼을 동시에 제공합니다. 소프트웨어로 다양한 라이팅 효과를 설정할 수 있습니다.",
      highlights: ["360mm 수냉 쿨러", "RGB 팬 6개", "스마트 온도 제어", "커스터마이징 라이팅"],
    },
  ],

  // 쿠킹 특장점
  cooking: [
    {
      id: "21",
      title: "대용량 수납",
      subtitle: "한 번에 더 많이",
      icon: "Maximize2",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop",
      description:
        "넓은 내부 공간으로 가족 식사 후 많은 식기를 한 번에 세척할 수 있습니다. 다양한 랙 구성으로 효율적인 공간 활용이 가능합니다.",
      highlights: ["15인용 대용량", "3단 랙 시스템", "높이 조절 가능", "다양한 식기 수납"],
    },
    {
      id: "22",
      title: "쿼드워시 시스템",
      subtitle: "완벽한 세척력",
      icon: "Sparkles",
      mediaType: "video",
      mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      description:
        "4방향 회전 노즐이 구석구석 강력하게 세척합니다. 찌든 때도 깨끗하게 제거하여 손세척보다 더 위생적입니다.",
      highlights: ["4방향 회전 분사", "고압 세척", "99.9% 살균", "에너지 절약"],
    },
  ],
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
  UtensilsCrossed: "🍽️",
  dress: "👗",
  Seedling: "🌱",
  Search: "🔍",
  Cleaning: "🧹",
  ImageIcon: "🖼️",
  Ruler: "📐",
  Wrench: "🧰",
  Puzzle: "🧩",
};

export const getFeaturesByProductId = (productId: string): Feature[] => {
  return featuresMap[productId] || [];
};

export const getFeatureById = (productId: string, featureId: string): Feature | undefined => {
  const features = featuresMap[productId] || [];
  return features.find((f) => f.id === featureId);
};
