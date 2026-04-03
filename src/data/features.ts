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

export interface CollapsibleDisclaimer {
  title: string;
  items: string[];
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
  disclaimers?: string[];
  collapsibleDisclaimers?: CollapsibleDisclaimer[];
}

export const featuresMap: Record<string, Feature[]> = {
  // 스타일러 특장점
  styler: [
    {
      id: "1",
      title: "아끼는 옷, 스타일러 괜찮을까 걱정되신다면?",
      subtitle: "두 개의 히터가 스팀을 정교하게 조절해\n섬세한 옷감도 부담 없이 관리해드려요.",
      icon: "Wind",
      tag: "듀얼 히팅 스팀",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/lg-styler/md10747827/usp/SC5GMR80S_12_true_steam_Detail_01.mp4",
      description: "드라이 없이도 매일 산뜻하게. 옷 속 미세먼지와 냄새를 줄여주는 스타일링 케어.",
      highlights: ["옷 속 미세먼지·냄새 케어", "매일 입는 옷도 산뜻하게", "집에서 간편하게 관리"],
    },
    {
      id: "2",
      title: "보이지 않는 먼지, 제대로 털리고 있나요?",
      subtitle: "옷을 흔들어 털어내듯 움직여,\n먼지와 잔여물을 효과적으로 관리해드려요.",
      icon: "dress",
      tag: "다이내믹 무빙 행어",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/_2023_styler/1.0/tech/movinghanger_pc.mp4",
      description:
        "옷에 묻은 오염물질 바람으로 불어내는 것과 탁탁 털어내는 것 중 뭐가 더 잘 제거될까요?\n분당 최대 350회 회전하는 강력한 다이내믹 무빙행어로 밖에서 온 먼지, 세균 털어내세요!",
      highlights: ["다이내믹 무빙행어", "분당 최대 350회", "다양한 무빙모션", "미세먼지 코스"],
    },
    {
      id: "3",
      title: "눈에 보이지 않는 세균, 정말 없어졌을까요?",
      subtitle: "옷에도 세균, 먼지가 묻어와요!\n스타일링 후 세균 수가 줄어드는지 직접 측정해봤습니다.",
      icon: "Cpu",
      tag: "세균 수 감소",
      mediaType: "video",
      mediaUrl: "https://youtu.be/Yq1l773oBGA?t=1343",
      description: "바깥에서 오염된 옷, 스타일러 후에는 오염도가 어떻게 바뀌었을까요? 확인해 보세요",
      highlights: ["스타일링 코스", "스팀 탈취", "유튜브 리뷰"],
    },
    {
      id: "4",
      title: "우리 집엔 어떤 스타일러가 딱 맞을까요?",
      subtitle: "몇 벌을 동시에 케어하는지,\n스티머가 있는지 다양한 차이를 비교해보세요.",
      icon: "Palette",
      tag: "모델별 스펙비교",
      mediaType: "image",
      mediaUrl:
        "https://www.lge.co.kr/kr/images/common/pdp_lineup_compare/images/lg-styler/styler_line_up_pc.jpg?w=1200&h=1096&fit=crop",
      description: "색상과 한번에 걸 수 있는 의류의 수, 핵심 기능 차이가 있으니 꼼꼼히 비교해보세요.",
      highlights: ["자동 환기", "바지 관리기", "다이내믹 무빙행어"],
    },
  ],
  // TV 특장점
  tv: [
    {
      id: "1",
      title: "햇살의 반짝임까지 선명하게 보고싶다면?",
      subtitle: "낮에봐도 선명하고, 밤에보면 더 화사한\n역대급 밝기의 최신 올레드",
      icon: "Sparkles",
      tag: "하이퍼 브라이트 부스터",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/tvs/2026/G6/OLEDG6_01_01_pc.mp4",
      description:
        "장면을 분석해서 밝기를 정교하게 끌어올리는 밝기 제어 기술로 백라이트 없이도 밝은, 가장 밝은 올레드가 탄생했어요.\n\n밝기가 높아져서 태양, 폭발, 유리 반사 같은 강한 하이라이트도 선명하게 볼 수 있고, 하얗게 뭉쳐서 잘 안보이던 밝은 영역의 디테일이 살아나 더 선명하고 생생한 화면을 느낄 수 있어요.",
      highlights: ["역대 가장 밝은 올레드", "B 시리즈 대비 3.2배(C6), 3.9배(G6) 높아진 밝기", "장면을 분석해 중간톤까지 섬세하게 조정"],
      disclaimers: [
        "소비자의 이해를 돕기 위해 연출된 영상이며, 제품별 색상 및 스펙은 다를 수 있습니다.",
        "하이퍼 브라이트 부스터: B 시리즈 대비 최대 390% 밝기 향상",
        "최대 3.9배 밝아진 올레드: APL 3% 기준 '25년 B 시리즈 대비 '26년 G 시리즈 최대 3.9배 밝기 향상(97형 제외)",
        "가장 빛나는 올레드: 자사 출시 제품 기준",
      ],
    },
    {
      id: "2",
      title: "눈으로 보는 그 색 그대로 느끼고 싶다면?",
      subtitle: "빛의 삼원색인 R,G,B를 온전히 그려내는\nTHE NEXT 올레드의 순도 높은 컬러 표현",
      icon: "Cpu",
      tag: "하이퍼 올레드 컬러",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/images/tvs/md10770835/gallery/medium-interior01.jpg",
      description:
        "실제 눈으로 보는 듯 정확한 컬러를 표현하기 위해서는 빛의 삼원색인 레드, 그린, 블루가 각각 빛나는 구조가 필요해요.\n파장을 조절해 컬러를 인위적으로 만들어내는 과정없이, R(레드), G(그린), B(블루) 광원이 각각 빛을 내는 방식이 적용돼 순수하고 정확한 컬러를 표현할 수 있어요.",
      highlights: [
        "R,G,B 컬러층을 분리해 각각의 순도 높은 컬러 표현",
        "100% 컬러볼륨",
        "100% 색 정확도",
      ],
      disclaimers: [
        "소비자의 이해를 돕기 위해 연출된 이미지이며, 제품별 색상 및 스펙은 다를 수 있습니다.",
        "100% 컬러 볼륨 인증 / 100% 색 정확도 인증",
      ],
      collapsibleDisclaimers: [
        {
          title: "100% 컬러 볼륨 인증",
          items: [
            "인증 기관: Intertek",
            "인증 기준일: 2025년 12월",
            "인증 대상: 2026년형 올레드 전 모델 TV 세트 기준",
            "인증 내용(인증 번호): 컬러 볼륨 측정값이 DCI-P3 표준 컬러 볼륨 크기의 100% 이상(25KRQ1124-01)",
          ],
        },
        {
          title: "100% 색 정확도 인증",
          items: [
            "인증 기관: Intertek",
            "인증 기준일: 2025년 3월",
            "인증 대상: 2026년형 올레드 전 모델 모듈 기준",
            "인증 내용(인증 번호): 500lux 환경에서 CIE DE 2000에 따른 125가지 색상 패턴의 목푯값과 측정값 차이가 2.0보다 작아 색 정확도 100% 기준 충족(24KRQ0950-02)",
          ],
        },
      ],
    },
    {
      id: "3",
      title: "인테리어에 녹아드는 갤러리 디자인",
      subtitle: "벽에 밀착 설치하면 마치\n한 폭의 그림처럼 공간에 녹아듭니다",
      icon: "ImageIcon",
      tag: "갤러리 디자인",
      mediaType: "gallery",
      mediaUrl: "",
      galleryImages: [
        {
          url: "https://www.lge.co.kr/kr/images/tvs/md10770835/gallery/medium-interior01.jpg",
          title: "거실 인테리어와 조화",
          description: "슬림한 디자인으로 벽에 밀착 설치하면 마치 액자처럼 공간과 하나가 됩니다.",
        },
        {
          url: "https://www.lge.co.kr/kr/images/tvs/md10770835/gallery/medium01.jpg",
          title: "제로 갭 벽걸이",
          description: "벽과의 간격을 최소화한 제로 갭 벽걸이로 깔끔한 설치가 가능합니다.",
        },
        {
          url: "https://www.lge.co.kr/kr/images/tvs/md10770835/gallery/OLED65G6KNA_st_mo.jpg",
          title: "스탠드형 설치",
          description: "전용 스탠드를 활용하면 어떤 공간에서도 프리미엄 인테리어를 연출할 수 있습니다.",
        },
      ],
      description:
        "LG 올레드 evo AI G6는 초슬림 디자인으로 벽에 밀착 설치하면 마치 한 폭의 그림처럼 공간에 녹아듭니다. 전용 갤러리 스탠드로 어디에 놓아도 프리미엄 인테리어를 완성합니다.",
      highlights: ["초슬림 벽밀착 디자인", "갤러리 스탠드 옵션", "인테리어 조화", "138~245cm 다양한 사이즈"],
    },
    {
      id: "4",
      title: "게이머를 위한 완벽한 디스플레이",
      subtitle: "4K 144Hz, 0.1ms 응답속도로\n차세대 게이밍 경험을 제공합니다",
      icon: "Gamepad2",
      tag: "게이밍 특화",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/images/tvs/md10770826/gallery/small03.jpg",
      description:
        "4K 144Hz 주사율과 0.1ms 응답속도, NVIDIA G-Sync 호환으로 최상의 게이밍 환경을 제공합니다. VRR, ALLM, HGiG 등 게임에 최적화된 기능으로 프로 게이머 수준의 플레이가 가능합니다.",
      highlights: ["4K 144Hz 지원", "0.1ms 응답속도", "G-Sync 호환", "게임 대시보드"],
    },
    {
      id: "5",
      title: "TV가 사운드바 없이도 충분할까?",
      subtitle: "9.1.2채널 AI 사운드 프로가\n공간에 맞춰 입체 음향을 구현합니다",
      icon: "Volume2",
      tag: "AI 사운드",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/images/tvs/md10770835/gallery/medium01.jpg",
      description:
        "업파이어링 스피커와 AI 사운드 프로 기술로 Dolby Atmos 기반 9.1.2채널 서라운드를 구현합니다. 시청 공간을 자동 분석하여 최적의 사운드 필드를 만들어줍니다.",
      highlights: ["9.1.2채널 서라운드", "Dolby Atmos", "AI 사운드 프로", "우퍼 내장"],
    },
    {
      id: "6",
      title: "어떤 사이즈가 우리 집에 딱 맞을까?",
      subtitle: "138cm부터 245cm까지\n공간에 맞는 사이즈를 비교해보세요",
      icon: "Ruler",
      tag: "사이즈 가이드",
      mediaType: "table",
      mediaUrl: "https://www.lge.co.kr/kr/images/tvs/md10770835/gallery/medium-interior01.jpg",
      description: "시청 거리와 공간 크기에 따라 최적의 TV 사이즈가 달라집니다. G6 시리즈는 55인치(138cm)부터 97인치(245cm)까지 다양한 라인업을 갖추고 있습니다.",
      highlights: ["138cm (55인치)", "163cm (65인치)", "194cm (77인치)", "245cm (97인치)"],
      tableData: [
        {
          name: "OLED G6 65인치",
          imageUrl: "https://www.lge.co.kr/kr/images/tvs/md10770835/gallery/OLED65G6KNA_st_mo.jpg",
          specs: [
            { label: "화면 크기", values: ["163cm (65인치)"] },
            { label: "권장 시청 거리", values: ["2.0~2.5m"] },
            { label: "설치 타입", values: ["스탠드형, 벽걸이형, 벽밀착형"] },
            { label: "회원할인가", values: ["4,290,000원"] },
          ],
        },
        {
          name: "OLED G6 77인치",
          imageUrl: "https://www.lge.co.kr/kr/images/tvs/md10770835/gallery/medium-interior01.jpg",
          specs: [
            { label: "화면 크기", values: ["194cm (77인치)"] },
            { label: "권장 시청 거리", values: ["2.5~3.0m"] },
            { label: "설치 타입", values: ["스탠드형, 벽걸이형, 벽밀착형"] },
            { label: "회원할인가", values: ["가격 확인 필요"] },
          ],
        },
        {
          name: "OLED G6 97인치",
          imageUrl: "https://www.lge.co.kr/kr/images/tvs/md10770835/gallery/medium01.jpg",
          specs: [
            { label: "화면 크기", values: ["245cm (97인치)"] },
            { label: "권장 시청 거리", values: ["3.0m 이상"] },
            { label: "설치 타입", values: ["스탠드형, 벽걸이형, 벽밀착형"] },
            { label: "회원할인가", values: ["가격 확인 필요"] },
          ],
        },
      ],
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
      id: "13",
      title: "들어내서 뒷편까지 전문장비로 케어",
      subtitle: "조용히 쌓이는 냉장고 뒷편에 가득한 먼지와 세균\n안전과 성능을 위해 전문가가 관리합니다.",
      icon: "Cleaning",
      tag: "기계실 세척",
      mediaType: "youtube",
      mediaUrl: "https://www.youtube.com/embed/ym2jxU6lzNw?si=d6qAuVkfwCzUyGVS",
      description:
        "조용히 쌓이는 냉장고 뒷편에 가득한 먼지와 세균, 안전과 성능을 위해 전문가가 관리합니다.",
      highlights: ["기계실 먼지 제거", "전문 장비 케어", "안전·성능 관리", "프리미엄 케어"],
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
