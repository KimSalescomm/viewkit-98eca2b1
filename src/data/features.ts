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

export interface FeatureTab {
  label: string;
  description?: string;
  mediaType: "video" | "image" | "youtube";
  mediaUrl: string;
  fallbackUrl?: string;
  isShorts?: boolean;
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
  descriptionTitle?: string;
  highlights: string[];
  tableData?: ProductComparisonTable[];
  galleryImages?: (string | GalleryImage)[];
  
  isShorts?: boolean;
  disclaimers?: string[];
  collapsibleDisclaimers?: CollapsibleDisclaimer[];
  tabs?: FeatureTab[];
  disabled?: boolean;
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
    {
      id: "5",
      title: "전 세계가 선택한\n의류관리가전, 스타일러!",
      subtitle: "2011년 출시 이후 글로벌 누적 판매 200만대!\n27개국에서 사랑받는 의류관리의 기준.",
      icon: "Trophy",
      tag: "스타일러 인기",
      mediaType: "gallery",
      mediaUrl: "",
      galleryImages: [
        {
          url: "/styler-news-200million.png",
          title: "중앙일보 보도",
          description: "LG 스타일러 200만대 찍었다… 글로벌 의류관리 가전 안착",
        },
      ],
      description:
        "2011년 세계 최초로 의류관리기를 선보인 LG 스타일러가 글로벌 누적 판매 200만대를 돌파했습니다.\n\n현재 27개국에서 판매되며, 트루스팀과 다이내믹 무빙행어 등 핵심 기술력으로 의류관리 가전의 글로벌 기준을 만들어가고 있습니다.",
      highlights: ["글로벌 200만대 돌파", "27개국 판매", "2026년형 AI 맞춤 관리", "스타일러도 구독으로!"],
    },
  ],
  // TV 특장점
  tv: [
    {
      id: "1",
      title: "왜 올레드 TV가 화질의 끝판왕일까?",
      subtitle: "픽셀 하나하나가 스스로 빛나는\n자발광 올레드만의 압도적 화질",
      icon: "Sparkles",
      tag: "자발광 올레드",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/wash-tower/md09942826/usp/pc_scene05_full_touch.mp4",
      description:
        "LCD는 뒤에서 백라이트가 화면 전체를 비추는 방식이라, 검정을 표현할 때도 빛이 새어 나와 회색처럼 보여요. 반면 올레드(OLED)는 약 8백만 개의 픽셀 하나하나가 스스로 빛을 내고, 꺼질 땐 완전히 꺼져요.\n\n그래서 검정은 진짜 검정으로, 빛은 더 또렷하게 표현되죠. 백라이트가 없으니 패널도 얇고, 어느 각도에서 봐도 색 왜곡 없이 동일한 화질을 즐길 수 있어요.",
      highlights: [
        "픽셀 단위 자발광 — 완벽한 명암비",
        "백라이트 없는 초슬림 패널",
        "어느 각도에서 봐도 동일한 색감",
        "응답속도 0.1ms로 잔상 없는 화면",
      ],
      disclaimers: [
        "소비자의 이해를 돕기 위해 연출된 영상이며, 제품별 색상 및 스펙은 다를 수 있습니다.",
        "자발광: 픽셀 자체가 빛을 내는 방식으로, 별도 백라이트가 필요 없습니다.",
        "응답속도: 자사 측정 기준이며 모델에 따라 다를 수 있습니다.",
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
      highlights: ["R,G,B 컬러층을 분리해 각각의 순도 높은 컬러 표현", "100% 컬러볼륨", "100% 색 정확도"],
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
      description:
        "시청 거리와 공간 크기에 따라 최적의 TV 사이즈가 달라집니다. G6 시리즈는 55인치(138cm)부터 97인치(245cm)까지 다양한 라인업을 갖추고 있습니다.",
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
      mediaUrl: "https://static.lge.co.kr/kr/images/refrigerators/md10364835/M825_582_filter.mp4",
      description: "STEM 냉장고는 고여 있는 물이 아닌, 흐르는 물로 얼음을 만드는 위생적인 제빙시스템을 갖추고 있어요. 게다가 매번 물을 채워 넣을 필요 없이 알아서 얼음이 만들어져 더 편리하게 시원한 시간을 누릴 수 있어요.",
      highlights: [
        "흐르는 물로 얼음을 만드는 제빙 시스템",
        "전문가가 꼼꼼하게 관리하는 케어 시스템",
        "식재료를 신선하게 보관하는 냉기 시스템",
      ],
      disclaimers: [
        "소비자의 이해를 돕기 위해 연출된 영상이며, 제품별 색상 및 스펙은 다를 수 있습니다.",
        "얼음 트레이에 물이 자동으로 급수되어 얼음이 얼려지며, 완전히 얼린 얼음은 얼음 저장통에 떨어져 저장됩니다.",
        "얼음이 일정량만큼 저장되면 더 이상 얼음이 만들어지지 않으며, 얼음을 사용하면 다시 얼음이 자동으로 만들어집니다.",
        "LG 디오스 STEM 베이직은 급/배수관 연결이 필수입니다. 연결이 안되는 경우 설치가 불가능합니다.",
        "LG 디오스 STEM 베이직의 급수관에는 상수도관만 연결이 가능하며, 지하수관에는 연결이 불가능합니다. 또한, 석회질 지역, 도서지역에는 설치가 불가능합니다.",
      ],
    },
    {
      id: "8",
      title: "나에게 딱 맞은 STEM 냉장고는?",
      subtitle: "얼음정수부터 베이직, Fit & Max까지\n모델별 핵심 차이를 한눈에 확인해 보세요.",
      icon: "Search",
      tag: "STEM 제품 비교",
      mediaType: "table",
      mediaUrl: "https://www.lge.co.kr/kr/story/trend/lg-refrigerators-dios-stem/product_img01.png",
      description: "STEM 얼음정수, STEM 베이직, STEM 베이직 Fit & Max의 냉장고 용량, 정수기 디스펜서, 얼음 종류, 정수 필터, 케어 서비스를 비교해보세요.",
      highlights: ["냉장고 용량", "정수기 디스펜서", "얼음 종류", "정수 필터", "케어 서비스"],
      tableData: [
        {
          name: "STEM 얼음정수",
          imageUrl: "https://www.lge.co.kr/kr/story/trend/lg-refrigerators-dios-stem/product_img01.png",
          specs: [
            { label: "냉장고 용량", values: ["800L 대"] },
            { label: "정수기 디스펜서", values: ["있음", "(정수, 냉수, 각얼음, 조각얼음)"] },
            { label: "얼음 종류", values: ["각얼음, 조각얼음", "미니 각얼음", "크래프트 아이스"] },
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
            { label: "냉장고 용량", values: ["600L"] },
            { label: "정수기 디스펜서", values: ["-"] },
            { label: "얼음 종류", values: ["각얼음(트레이)", "크래프트 아이스"] },
            { label: "정수 필터", values: ["중금속 7종, 박테리아 걸러 주는", "복합 안심 정수 필터"] },
            { label: "케어 서비스", values: ["●"] },
          ],
        },
      ],
      disclaimers: [
        "본 페이지의 내용은 제품 선택을 돕기 위한 참고용 정보로 제공됩니다.",
        "제품의 실제 사양, 기능, 제공 서비스는 모델별·구독 유형(프리미엄/라이트 등)·계약 시점에 따라 다를 수 있으며, 상세 내용은 계약서 및 공식 제품 설명을 기준으로 합니다.",
        "수치 및 비교 정보는 제품군 기준의 일반적인 정보로, 개별 제품에 따라 차이가 있을 수 있습니다.",
      ],
    },
    {
      id: "10",
      title: "보이지 않는 물길 속,\n관리는 누가 할까요?",
      subtitle: "필터부터 청소까지, 전문가가 알아서\n챙겨주는 전문 케어를 보여드려요.",
      icon: "Wrench",
      tag: "구독 전문케어",
      mediaType: "youtube",
      mediaUrl: "https://www.youtube.com/embed/dVEO3aYykTM?si=j4iIwotCwLBvji5k",
      description:
        "물이 흐르는 길을 세척, 청소하기 힘든 기계실 세척, 이사 후 재설치까지 다양한 케어서비스 혜택이 있습니다.",
      highlights: ["유로 세척 케어", "기계실 세척(프리미엄)", "고무패킹 케어", "소모품 교체"],
      disclaimers: [
        "[유로 세척 케어] 유로 세척키트를 통한 유로살균은 출수구, 정수유로에 한합니다.",
        "[워터필터] 워터필터는 12개월 마다 교체해드립니다.",
        "[퓨어프레시 필터] 필터교체주기는 12개월/1회이며, 퓨어프레시 탑재 모델에 한하여 제공되는 서비스입니다.",
        "[얼음 저장통 세척] 해당 서비스는 얼음 저장통 탑재 모델에 한하여 제공됩니다.",
        "[방문관리] 방문 관리는 사전 안내드리고 있으며, 고객 요청에 의해 협의된 일정으로 변경하실 수 있습니다.",
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
      disclaimers: [
        "본 페이지의 내용은 설치 환경의 이해를 돕기 위해 연출된 이미지입니다. 실제 설치 완료 이미지는 설치 장소의 구조, 상황에 따라 다를 수 있습니다.",
        "LG 디오스 STEM 베이직은 급/배수관 연결이 필수입니다. 연결이 안되는 경우 설치가 불가능합니다.",
        "LG 디오스 STEM 베이직의 급수관에는 상수도관만 연결이 가능하며, 지하수관에는 연결이 불가능합니다. 또한, 석회질 지역, 도서지역에는 설치가 불가능합니다.",
      ],
    },
    {
      id: "11",
      title: "빌트인 감성의 주방을 원한다면?",
      subtitle: "주방이 훨씬 넓고 깔끔해 보이는\n'Fit & Max' 냉장고를 확인해보세요.",
      icon: "Ruler",
      tag: "Fit & Max란?",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/refrigerators/md10780841/ZEROHINGE_SWING.mp4",
      description:
        "도어 걸림을 없앤 제로 클리어런스 힌지가 만드는 단 4mm 간격의 완벽에 가까운 밀착! 인테리어 조화를 생각한 디자인으로 공간에 자연스럽게 녹아듭니다.",
      highlights: ["제로 클리어런스 힌지", "인테리어 냉장고", "다양한 라인업", "냉툭튀가 싫다면 Fit & Max로"],
      tabs: [
        {
          label: "제로 클리어런스 힌지",
          description:
            "도어가 안쪽으로 회전하는 제로 클리어런스 힌지로\n냉장고 장과의 간격을 최소화해 더 완성도 높은\n주방 인테리어를 완성할 수 있습니다.",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/images/refrigerators/md10780841/ZEROHINGE_SWING.mp4",
        },
        {
          label: "다양한 조합",
          description:
            "Fit & Max 라인업은 가구장 간격을\n4mm로 최소화한 밀착 설계를 적용했습니다.\n우리 집 구조에 딱 맞는 조합을 선택해보세요.",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/images/refrigerators/md10780841/FitNMax_1380x670.mp4",
        },
      ],
      disclaimers: [
        "본 페이지의 영상 및 이미지는 소비자의 이해를 돕기 위해 연출된 자료임.",
        "제품의 색상, 외관, 구성 및 사양은 모델에 따라 다를 수 있으며, 제품 개선을 위해 예고 없이 변경될 수 있음.",
        "제품 이미지는 촬영 컷으로 실제 제품과 차이가 있을 수 있으며, 화면 설정 및 사용 환경에 따라 색상 표현이 달라질 수 있음.",
        "제품의 성능 및 특성은 사용 환경에 따라 다를 수 있음.",
      ],
      collapsibleDisclaimers: [
        {
          title: "[제로 클리어런스 힌지]",
          items: [
            "‘최소화’는 냉장고 도어와 가구장 사이 최소 좌우 간격 4mm 기준을 의미함.",
            "설치 환경 및 가구 제작 오차에 따라 추가 공간 확보가 필요할 수 있음.",
            "상세 치수 및 설치 조건은 반드시 설치 가이드 기준 확인 필요함.",
          ],
        },
      ],
    },
    {
      id: "12",
      title: "함께하면 더 좋은 Fit & Max\n어떤 세트가 있나요?",
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
      id: "13",
      title: "더 좋은 프리미엄 기능들이\n궁금하다면?",
      subtitle: "신선한 보관은 기본, 사용하면서 느끼는\n편리함까지 생각한 프리미엄 기능을 확인해보세요.",
      icon: "Sparkles",
      tag: "26년 STEM Fit&Max",
      mediaType: "image",
      mediaUrl: "",
      description:
        "신선한 보관은 기본, 사용하면서 느끼는 편리함까지 생각한 26년형 STEM Fit & Max의 프리미엄 기능을 확인해보세요.",
      highlights: [
        "(26년 NEW) 라이트 갤러리",
        "(26년 NEW) 오토 클로징",
        "(26년 NEW) 퓨어 프레시 필터",
        "(26년 UP) 듀얼 맞춤신선실",
      ],
      tabs: [
        {
          label: "AI 신선케어",
          description: "AI가 사용 패턴을 학습해 식재료를 더 오래 신선하게 보관해드려요.",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/images/refrigerators/md10780841/AI_FRESHCARE.mp4",
        },
        {
          label: "퓨어 프레시 필터",
          description: "강력한 탈취 성능으로 냉장고 속 냄새 걱정을 줄여드려요.",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/images/refrigerators/md10780841/DEODORIZING_1380x670.mp4",
        },
        {
          label: "라이트 갤러리",
          description: "은은한 조명으로 내부를 밝혀, 보관 중인 식재료를 한눈에 확인할 수 있어요.",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/images/refrigerators/md10780841/PREMIUMDETAILS_SWING.mp4",
        },
      ],
      collapsibleDisclaimers: [
        {
          title: "AI 신선케어",
          items: [
            "사용자의 최근 3주간(21일)의 사용 패턴을 학습하고 딥러닝을 통해 미래 1주일간 과사용구간을 설정합니다. 1일 단위로 업데이트합니다.",
            "사용일이 21일 미만인 경우 과거 7일 사용 패턴을 바탕으로 미래 1주일간 과사용구간을 설정합니다.",
            "냉장실 설정이 2℃ 이하일 경우 동작하지 않습니다.",
            "주위온도, 내부 적재량, 냉장고 설정 등 사용환경에 따라 차이가 있을 수 있습니다.",
            "AI 신선케어를 사용하기 위해서는 LG ThinQ 앱 별도 설치가 필요하며, 또한 초기 냉장고와 연결 시 동일한 Wi-Fi 환경 안에 있어야 하며, 이후 냉장고는 항상 등록된 Wi-Fi 환경 안에서 동작되어야 합니다. 또한, LG ThinQ 앱에서 제품 등록 후 기능을 활성화시켜야 하며, 외부에서 활성화 시 데이터 사용 환경이 필요합니다.",
            "모델에 따라 ThinQ 앱에는 '인공지능 신선케어'로 표시될 수 있으나 동일한 기능입니다.",
          ],
        },
        {
          title: "UV청정탈취필터+ - 균 번식 억제 성능",
          items: [
            "테스트에 사용된 박테리아: 황색포도상구균(Staphylococcus aureus), 대장균(Escherichia coli), 바실루스 세레우스(Bacillus cereus), 폐렴균(Klebsiella pneumonia)",
            "시험방법 : 5cm x 5cm 크기의 필터에 0.2 ml의 박테리아 용액을 항균 필터에 주입한 후 4시간 반응을 통해 박테리아의 수를 측정하였습니다. 박테리아 제거 성능은 직접적인 상호작용이 관찰된 실험실 테스트 결과입니다. (실제 필터 크기 7.7cm x 7.7cm)",
            "필터의 박테리아 번식 억제 성능을 나타냅니다.",
            "TÜV라인란드(TÜV Rheinland)에서 테스트하였으며, ISO 27447(=JIS R1702)를 참조한 자사 시험법으로 수행하였습니다.('24.01.13)",
            "전용팬과 전용LED 70분마다 10분씩 동작하며, 냉장실 도어 오픈 시, 성에 제거 시에는 동작하지 않습니다.",
            "실제 사용 조건에서는 결과가 다를 수 있습니다.",
            "균 번식 억제는 전용팬에 의해 통과된 공기에 한 합니다.",
          ],
        },
        {
          title: "UV청정탈취필터+ - 탈취 성능",
          items: [
            "황화수소, 트리메틸아민 탈취성능 90% 이상 도달 기준",
            "100L (W500 x D500 x H400 mm) 챔버 내 필터 단품 및 circulation Fan 설치, 황화수소 400ppm 주입 후, Fan을 동작하여 챔버 내 공기순환, 30분 단위 확인하여 비교한 수치임.",
            "100L (W500 x D500 x H400 mm) 챔버 내 필터 단품 및 circulation Fan 설치, 트리메틸아민 400ppm 주입 후, Fan을 동작하여 챔버 내 공기순환, 30분 단위 확인하여 비교한 수치임.",
            "필터 단품 성능을 제한된 공간에서 평가한 것으로, 적용된 제품의 냉장실 크기, 고객 사용 패턴, 저장된 음식의 종류 등 실사용 조건에 따라 결과는 달라질 수 있음.",
            "탈취 성능 시험은 TÜV 라인란드(TÜV Rheinland)에서 테스트하였으며 자사 제안 시험 방식으로 진행함. ('23.05.24)",
            "탈취는 전용팬에 의해 통과된 공기에 한 합니다.",
          ],
        },
        {
          title: "퓨어 프레시 필터 - 필터 크기",
          items: [
            "기존 크기 (100x30x7 mm) x 2개 / 신규 크기 : (150x70x8 mm) x 1개 비교 시",
          ],
        },
        {
          title: "퓨어 프레시 필터 - 탈취 성능",
          items: [
            "황화수소, 트리메틸아민 탈취성능 90% 이상 도달 속도 기준",
            "100L (W500 x D500 x H400 mm) 챔버 내 필터 단품 및 circulation Fan 설치, 황화수소 400ppm 주입 후, Fan을 동작하여 챔버 내 공기순환, 10분 단위 확인하여 비교한 수치임.",
            "100L (W500 x D500 x H400 mm) 챔버 내 필터 단품 및 circulation Fan 설치, 트리메틸아민 400ppm 주입 후, Fan을 동작하여 챔버 내 공기순환, 10분 단위 확인하여 비교한 수치임.",
            "필터 단품 성능을 제한된 공간에서 평가한 것으로, 적용된 제품의 냉장실 크기, 고객 사용 패턴, 저장된 음식의 종류 등 실사용 조건에 따라 결과는 달라질 수 있음.",
            "탈취 성능 시험은 TÜV 라인란드(TÜV Rheinland)에서 테스트하였으며 자사 제안 시험 방식으로 진행함. ('25.04.01)",
            "탈취는 냉기 순환에 의해 필터에 통과된 공기에 한 합니다.",
          ],
        },
        {
          title: "퓨어 프레시 필터 - 탈취 용량",
          items: [
            "100L (W500 x D500 x H400 mm) 챔버 내 필터 단품 및 circulation Fan 설치, 황화수소 10,000ppm 주입 후, Fan을 동작하여 챔버 내 공기순환, 24시간 후 제거량 측정, 탈취 효율이 50% 미만이 될 때까지 반복 측정 후 누적 제거량 비교함.",
            "필터 단품 성능을 제한된 공간에서 평가한 것으로, 적용된 제품, 고객 사용 패턴, 저장된 음식의 종류 등 실사용 조건에 따라 결과는 달라질 수 있음.",
            "탈취 성능 시험은 TÜV 라인란드(TÜV Rheinland)에서 테스트하였으며 자사 제안 시험 방식으로 진행함. ('25.04.01)",
            "탈취는 냉기 순환에 의해 필터에 통과된 공기에 한 합니다.",
          ],
        },
      ],
    },
  ],

  // 워시타워 특장점
  washer: [
    {
      id: "1",
      title: "AI가 세탁까지 업그레이드 한다니\n믿어지세요?",
      subtitle: "세탁부터 건조까지 모든 과정을\nAI로 더욱 똑똑하게 관리해드려요.",
      icon: "Cpu",
      tag: "트롬 AI 세탁건조",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10575829/usp/WA2323/WA2323EGZN_ai_laundry_pc.mp4",
      description:
        "AI가 세탁의 시작부터, 건조가 끝나는 과정까지 함께합니다. 세탁물의 무게를 감지하여 3초만에 코스별 예상 종료시간을 알 수 있고, AI 맞춤 세탁은 의류의 무게와 재질, 오염도에 맞춰 최적의 코스를 추천합니다. 건조가 끝날무렵 건조기를 예열해두고, 사용하면 할수록 더 정확하게 건조 완료 시간을 알려줍니다.",
      highlights: ["AI 타임센싱", "AI 맞춤 세탁, 탈수", "AI 시간 안내", "AI 세탁•건조 리포트"],
      disclaimers: ["소비자의 이해를 돕기 위해 연출된 영상이며, 제품별 색상 및 스펙은 다를 수 있습니다."],
      collapsibleDisclaimers: [
        {
          title: "AI 타임 센싱",
          items: [
            "해당 기능은 세탁기 AI 타임 센싱 예시이며, 건조기에서는 시작 버튼을 누른 후 시간을 안내합니다.",
            "AI 타임센싱 3초 : 문을 닫은후 전원 버튼을 누르고 웰컴 메시지가 나타난 이후 측정된 시간입니다.",
            "세탁기의 경우 마른 세탁물 기준 세탁물이 가득 찬 경우 최대 약 15초까지 소요될 수 있습니다.",
            "건조기의 경우 마른 세탁물 기준 5kg 이하에서 도어가 잠긴 후 약 3초 소요되며, 세탁물이 가득 찬 경우 최대 약 40초까지 소요될 수 있습니다.",
            "세탁물의 종류나 사용환경에 따라 센싱 시간은 달라질 수 있습니다.",
          ],
        },
        {
          title: "AI 시간 안내",
          items: [
            "'AI 시간 안내'는 건조기의 AI건조 코스에 해당 되는 기능입니다. 자사시험결과 'AI 시간 안내' 기능 미적용 제품(RD22****) 대비 제품 표시 시간과 실제 건조 동작 시간에 대한 시간 정확도가 개선 되었으며, 설치 조건 및 실사용 조건에 따라 달라질 수 있습니다.",
          ],
        },
      ],
    },
    {
      id: "2",
      title: "구독하면 세탁기 속까지\n관리할 수 있다는 사실, 아셨나요?",
      subtitle: "워시타워 구독으로 제품은 물론\n속까지 케어 받으며 사용해 보세요.",
      icon: "ShieldCheck",
      tag: "워시타워 구독",
      mediaType: "youtube",
      mediaUrl: "https://youtu.be/cb4gJ6vvqGk?si=7tTFaV8oX0Hlpyil",
      description:
        "워시타워를 구독하면 구석구석 꼼꼼한 케어와 청소는 물론, 소모품도 정기적으로 교체해 제품을 최상의 상태로 유지하고, 위생적으로 쓸 수 있어요. 무엇보다 구독기간 내 1회 사용할 수 있는 무상재설치는 세탁, 건조기의 결합이 중요한 워시타워에는 꼭 필요한 서비스죠. 워시타워는 꼭 구독해서 전문가의 정품케어를 누려보세요. (설명은 라이트 플러스 기준)",
      highlights: ["드럼 케어, 스팀 케어", "고무패킹 세척/습도센서 점검", "무상 재설치(계약기간 내 1회)", "무상 A/S"],
      collapsibleDisclaimers: [
        {
          title: "정기적인 소모품 교체",
          items: ["2중 안심 필터는 최초 방문시 1회 제공, 배수 필터는 24개월 주기로 교체"],
        },
        {
          title: "무상재설치",
          items: [
            "계약기간 내 1회 제공",
            "운송 서비스를 희망할 경우 유상 제공되며 비용은 고객 부담임 / 철거비는 무상임",
            "제품 설치 환경에 따라 추가 비용이 발생할 수 있으며, 자세한 사항은 LG전자 고객센터(1544-7777)에 문의",
            "해당 서비스는 25년 3월 이후 계약 고객에 한해 제공됨",
          ],
        },
        {
          title: "무상 A/S",
          items: ["고객 과실로 인한 제품 고장 제외"],
        },
      ],
    },
    {
      id: "3",
      title: "아끼는 옷, 더 섬세하게\n세탁·건조하고 싶지 않으세요?",
      subtitle: "AI를 만나 더 섬세하게 세탁, 건조해요.\n아끼는 옷은 6모션이 필요해요.",
      icon: "Waves",
      tag: "AI DD x 6모션",
      mediaType: "video",
      mediaUrl: "https://static.lge.co.kr/kr/images/wash-tower/md10575829/usp/WA2525EGZF_ai_dd_Cover_pc.mp4",
      description:
        "AI DD 모터가 세탁물의 무게와 옷감의 부드러움을 스스로 감지해, 손빨래 동작을 본뜬 6가지 모션으로 옷감 손상은 줄이고 세탁 성능은 높여줍니다. 건조할 때도 무게와 습도를 인식해 6모션으로 보송하게 마무리해주니, 아끼는 옷도 안심하고 맡기실 수 있어요.",
      highlights: ["AI DD 모터", "6모션 맞춤 세탁·건조", "옷감 손상 최소화", "섬세한 케어"],
      disclaimers: ["소비자의 이해를 돕기 위해 연출된 영상이며, 제품별 색상 및 스펙은 다를 수 있습니다."],
      collapsibleDisclaimers: [
        {
          title: "AI 세탁",
          items: [
            "AI 세탁코스는 최대용량 6kg 이하에서 동작하며, 실사용 환경 및 세탁물 종류에 따라 다를 수 있습니다.",
            "AI 세탁은 딥러닝 AI 기술을 이용해 의류의 재질을 감지한 후 6모션 중 최적의 모션으로 세탁하며, 빅데이터 기반 환경에 맞춰 큰 진동을 미리 예측해 안정적으로 탈수합니다.",
          ],
        },
        {
          title: "AI 건조",
          items: [
            "AI 건조 코스는 1kg 이상 ~ 5kg 이하에서 동작하며, 실사용 환경 및 세탁물 종류에 따라 다를 수 있습니다.",
            "AI 건조는 딥러닝 AI 기술을 이용해 의류의 재질을 감지하여 최적의 온도와 시간으로 건조합니다.",
            "초기 표시된 시간과 실제 동작 시간은 다를 수 있습니다.",
          ],
        },
      ],
    },
    {
      id: "4",
      title: "보이지 않는 속까지\n알아서 깨끗하게 관리하고 싶으시죠?",
      subtitle: "콘덴서를 알아서 세척해주니\n손이 많이 가지 않아요.",
      icon: "Sparkles",
      tag: "콘덴서 자동세척",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10575829/usp/WA2525EGZF_ai_cleancare_pc_01-1.mp4",
      description:
        "건조 성능을 좌우하는 콘덴서를 물로 자동 세척해 보풀과 먼지가 쌓이지 않도록 관리해줍니다.\n\n사용자가 직접 분리·청소할 필요 없이 늘 깨끗한 상태를 유지해, 건조 효율과 위생을 오래도록 지켜드려요.",
      highlights: ["콘덴서 자동 물 세척", "보풀·먼지 케어", "건조 효율 유지", "관리 부담 최소화"],
    },
    {
      id: "5",
      title: "세탁이 끝나기 전 건조를 준비하면,\n집안일도 빨리 끝나겠죠?",
      subtitle: "세탁이 끝나기 전 건조기를 미리 데워\n바로 이어서 보송하게 건조해드려요.",
      icon: "Timer",
      tag: "건조 준비",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10575829/usp/WA2323/WA2323EGZN_dry_ready_Cover_pc.mp4",
      description:
        "세탁이 끝나기 전, 건조기를 미리 예열해두는 똑똑한 기능이에요.\n\n세탁 완료 후 바로 건조가 시작되니 옷을 옮기고 기다리는 번거로움 없이, 집안일을 더 빠르고 효율적으로 마치실 수 있어요.",
      highlights: ["건조기 사전 예열", "세탁→건조 끊김 없이", "시간 절약", "효율적인 가사 동선"],
      disabled: true,
    },
    {
      id: "6",
      title: "매번 쓰는 세탁기·건조기 속,\n얼마나 깨끗한지 궁금하지 않으세요?",
      subtitle: "세탁통부터 건조기 내부까지 최대 12포인트를\n살균해 유해 세균을 99.9% 제거해드려요.",
      icon: "ShieldCheck",
      tag: "통살균 케어",
      mediaType: "video",
      mediaUrl: "https://static.lge.co.kr/kr/images/wash-tower/md09942826/usp/TotalAI_3.mp4",
      description:
        "통 내부는 물론 보이지 않는 건조기 내부까지 최대 12포인트를 살균해 유해 세균 4종을 99.9% 제거합니다.\n\n세탁기와 건조기를 따로 관리할 필요 없이 한 번의 케어로 위생을 지켜드려요.",
      highlights: ["최대 12포인트 살균", "유해 세균 4종 99.9% 제거", "세탁통·건조기 동시 케어", "위생 걱정 끝"],
      disabled: true,
    },
  ],

  // 에어컨 특장점
  airconditioner: [
    {
      id: "15",
      title: "냉방을 틀면 꿉꿉하고,\n제습을 틀면 추우셨나요?",
      subtitle: "원하는 온도와 습도를 동시에 설정\n춥지도 꿉꿉하지도 않은 쾌적함",
      icon: "Wind",
      tag: "AI 콜드프리",
      mediaType: "video",
      mediaUrl:
        "https://static.lge.co.kr/kr/images/air-conditioners/md10731826/usp/26_Tower1_9s_AI_coldfree_detail_01.mp4",
      descriptionTitle: "원하는 온도는 기본, 원하는 습도까지",
      description:
        "냉방을 틀면 꿉꿉하고, 제습을 틀면 추우셨나요?\nAI콜드프리는 원하는 온도와 습도를 동시에 설정할 수 있어,\n장시간 운전에도 춥지도 꿉꿉하지도 않은 쾌적한 환경을 유지해줘요.",
      highlights: [],
      disclaimers: [
        "AI콜드프리 피부온도 측정 시험",
        "소비자의 이해를 돕기 위해 LG 휘센 타워I 9시리즈 모델을 활용해 연출된 영상이며, 제품별 색상 및 스펙은 다를 수 있습니다.",
      ],
      collapsibleDisclaimers: [
        {
          title: "AI콜드프리 피부온도 측정 시험 자세히 보기",
          items: [
            "시험 일시: 2025.11",
            "시험 기관: 자사 에어컨 주택환경 시험실(44.4㎡ 주거환경 모사, 천고 높이 2.4m)",
            "시험 모델: FQ25GN9BEN(26년 휘센타워)",
            "시험 조건: KS C 9306(에어컨디셔너 이슬맺힘 조건)\n- 실내외 DB(27 ± 1.0)℃, WB(24 ± 0.5)℃ RH(78 ± 2.0)%\n- 설정온도 26℃\n- 제품으로부터 좌·우측 1.7m 거리에서 피험자 2명, 앉은 자세로 측정",
            "시험 방법:\n- 제안된 시험 조건에서 스탠드 자사 제습 모드 및 AI콜드프리(설정습도 40%) 모드 운전\n- 1시간 동안의 피험자 2명의 평균 피부온도 측정 비교하였습니다.",
            "시험 결과:\n- AI콜드프리 모드 운전 시 평균 피부 온도 0.1℃ 감소\n- 제습 모드 운전 시 평균 피부 온도 0.7℃ 감소",
            "시험실 측정 결과 기준이며 실사용 조건에서는 제품 성능에 차이가 있을 수 있습니다.",
          ],
        },
      ],
    },
    {
      id: "17",
      title: "에어컨 청소 지옥에서 탈출하는\n가장 쉬운 방법은?",
      subtitle: "매년 여름 반복되는 에어컨 청소고민\n구독으로 시원하게 해결",
      icon: "Sparkles",
      tag: "엘숏츠",
      mediaType: "youtube",
      mediaUrl: "https://youtu.be/DRk0yXY8zPg",
      isShorts: false,
      descriptionTitle: "에어컨 청소 지옥에서 탈출하는 가장 쉬운 방법은?",
      description:
        `"사설 업체를 부를까?", "내가 직접 뜯어서 닦을까?" 매년 여름 반복되는 리얼한 에어컨 청소 고민! LG전자 에어컨 구독의 라이트 플러스 전문 케어 서비스(분해세척/UV&피톤치드 케어)로 시원하게 해결해드립니다.`,

      highlights: ["분해세척", "UV케어", "피톤치드케어", "2명 중 1명꼴로 구독"],
      disclaimers: [
        "이 영상은 AI를 활용하여 제작되었습니다.",
        "소비자의 이해를 돕기 위해 연출된 이미지 입니다.",
      ],
      collapsibleDisclaimers: [
        {
          title: "[분해 세척]",
          items: [
            "프리미엄 케어 서비스 방문주기는 12개월 마다, 분해 케어는 36개월 마다 제공됩니다. 라이트플러스 케어 서비스 방문주기는 12개월 마다, 비분해 케어는 36개월 마다 제공됩니다.",
            "전문 장비 및 케어제를 활용하여 열교환기, 냉방팬등 내외부를 케어해드립니다. (제공되는 서비스에 따라 케어방식은 상이할 수 있습니다.)",
            "프리미엄은 1~3월 구매 시, 다음 해 3월 방문 / 4~6월 구매 시, 다음 해 4월 방문 / 7~8월 구매 시, 다음 해 5월 방문 / 9월 구매 시, 다음 해 9월 방문 / 10월 구매 시, 다음 해 10월 방문 / 11~12월 구매 시, 다음 해 11월 방문합니다.",
            "라이트 플러스는 1~2월 구매시, 같은해 9월 방문 / 3월 구매시, 같은해 10월 방문/ 4월 구매시, 같은해 11월 방문 / 5월 구매시, 다음해 3월 방문 / 6월구매시, 다음해 4월 방문 / 7월 구매시, 다음해 5월 방문 / 8월구매시, 다음해 6월 방문 / 9월 구매시, 다음해 9월 방문 / 10월 구매시 다음해 10월 방문 / 11~12월 구매시, 다음해 11월 방문 합니다.",
          ],
        },
        {
          title: "[위생케어]",
          items: [
            "스팀케어의 경우, 프리미엄과 라이트 플러스 모두 36개월마다 서비스가 제공됩니다.",
            "UV와 피톤치드 케어의 경우, 프리미엄의 36개월마다 라이트플러스는 12개월마다 서비스가 제공됩니다",
            "사용 장비는 상이할 수 있습니다.",
          ],
        },
        {
          title: "[방문관리]",
          items: [
            "방문 관리는 사전 안내드리고 있으며, 고객 요청에 의해 협의된 일정으로 변경하실 수 있습니다. 또한 제품 설치 환경에 따라 추가 비용이 발생할 수 있으니 (예: 사다리차, 앵글 등) 관련 자세한 사항은 LG전자 고객센터(1544-7777)에 문의 바랍니다.",
          ],
        },
        {
          title: "[구독 비중]",
          items: [
            "RAC 구독 비중: '25년 전체 대형가전 RAC 구독 비중 45.3% 베스트샵(시판+전문점 유통 합계), 구독운영팀 자료 기준",
          ],
        },
      ],
    },
  ],


  // 청소기 특장점
  vacuum: [
    {
      id: "1",
      title: "마른 얼룩, AI가 알아서 닦아줄 순 없을까?",
      subtitle: "AI 오염 인식으로 바닥 오염물을 감지하고\n100°C 스팀 물걸레로 찌든 때까지 말끔하게 청소해요.",
      icon: "Flame",
      tag: "스팀 물걸레",
      mediaType: "video",
      mediaUrl: "https://static-stg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_02_moving_steam_pc.mp4",
      description:
        "AI 오염 인식으로 바닥 오염물을 감지해, 세계최초 100°C 스팀 물걸레로 찌든 때와 기름때까지 보다 말끔하게 청소해요.",
      highlights: ["AI 오염 인식", "100°C 스팀 물걸레", "찌든 때·기름때 말끔 청소", "스팀 물걸레"],
      
    },
    {
      id: "2",
      title: "흡입력과 브러시, 어디까지 강해질 수 있을까?",
      subtitle: "최대 30W 강력 흡입력에\n엣지·듀얼 엉킴 방지 브러시를 더했어요.",
      icon: "Zap",
      tag: "흡입 청소",
      mediaType: "video",
      mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_09_powerful_suction_pc.mp4",
      description:
        "AlphaUP Drive에 탑재된 고출력 흡입 모터가 최대 30W에 달하는 강력한 흡입력을 발휘합니다. 여기에 벽·모서리 먼지까지 꼼꼼히 청소하는 엣지 확장 브러시와 머리카락·반려동물 털 엉킴을 방지하는 듀얼 엉킴 방지 브러시를 더해, 한층 강력하고 편리한 흡입 청소를 완성합니다.",
      highlights: [
        "최대 30W 강력 흡입력",
        "엣지 확장 브러시로 벽·모서리 청소",
        "듀얼 엉킴 방지 브러시",
      ],
      tabs: [
        {
          label: "30W 강력 흡입력",
          description:
            "AlphaUP Drive에 탑재된 고출력 흡입 모터가 최대 30W에 달하는 강력한 흡입력을 발휘합니다.\n스마트 터보가 카펫과 같이 청소가 까다로운 바닥재를 자동 감지하면 흡입 세기를 한 단계 더 끌어올려 깊숙한 먼지까지 꼼꼼하게 청소합니다.",
          mediaType: "video",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_09_powerful_suction_pc.mp4",
        },
        {
          label: "엣지 확장 브러시",
          description:
            "벽과 가구 모서리, 청소로봇이 닿기 어려운 곳에 쌓인 먼지를 걱정하셨나요?\n엣지 확장 브러시가 벽면 쪽으로 뻗어나가 모서리 먼지까지 꼼꼼히 털어냅니다.\n단차 없는 바닥이라면 더욱 밀착해 청소 범위를 넓혀줘요.",
          mediaType: "video",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_10_edge_cleaning.mp4",
        },
        {
          label: "듀얼 엉킴 방지 브러시",
          description:
            "길고 짧은 머리카락, 반려동물 털이 브러시에 엉켜 청소 성능이 떨어지는 일을 줄였습니다.\n듀얼 엉킴 방지 브러시가 회전하며 머리카락을 흡입구 쪽으로 밀어내, 엉킴 걱정 없이 꾸준한 청소 성능을 유지합니다.",
          mediaType: "video",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_11_anti_tangle.mp4",
        },
      ],
      disclaimers: [
        "흡입력·브러시 청소 성능은 회전 브러시 결합 여부, 바닥재, 측정 환경에 따라 차이가 있을 수 있습니다.",
      ],
      collapsibleDisclaimers: [
        {
          title: "강력한 흡입력 측정 기준 자세히 보기",
          items: [
            "24년 6월 한국산업기술시험원(KTL) 시험 결과, 국제 표준 IEC 62885-4:2020/AMD1:2023 5.11절 기준으로 측정되었습니다.",
            "본체에 빈 먼지통과 완전히 충전된 새 배터리가 결합된 상태, 터보 모드 직진 주행 동작 기준입니다.",
            "공기 데이터 시험 장비 연결을 위해 별도 제작한 어댑터로 회전 브러시를 제거한 상태에서 제품 최대 흡입력을 산정했습니다.",
            "스마트 터보 설정은 LG ThinQ 앱에서 켜고 끌 수 있으며, 카펫 재질에 따라 감지 성능은 차이가 있을 수 있습니다.",
            "모가 얇거나 20mm 이상의 카펫은 손상될 수 있으므로 정리 후 사용을 권장합니다.",
          ],
        },
        {
          title: "엣지 확장 브러시 안내",
          items: [
            "엣지 확장 브러시의 확장 거리와 청소 성능은 가구 배치, 벽 형상 등 사용 환경에 따라 차이가 있을 수 있습니다.",
            "브러시는 소모품으로, 사용 환경에 따라 교체 주기가 달라질 수 있습니다.",
          ],
        },
      ],
    },
    {
      id: "4",
      title: "복잡한 집안, AI가 알아서 피해 다닐 수 있을까?",
      subtitle: "AlphaUp Drive가 실시간 센싱으로\n장애물 제거 영역까지 놓치지 않고 청소해요.",
      icon: "Navigation",
      tag: "AI 맞춤 청소",
      mediaType: "video",
      mediaUrl: "https://static-stg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_03_sensing_ai_driving_pc.mp4",
      description:
        "LG의 진화된 주행 기술 AlphaUp Drive가 실시간 센싱으로 장애물 제거 영역을 즉시 파악해, 비워진 공간까지 놓치지 않고 꼼꼼히 청소해요.\n전선, 양말, 신발 같은 집 안 장애물은 AI 딥러닝으로 스스로 피해가며, 청소한 공간은 기억해 다음 번엔 더 효율적인 경로로 주행합니다.",
      highlights: ["3D 인식 센서 장애물 회피", "AI 딥러닝 실시간 인식", "스마트 경로 최적화", "집 안 구조 학습"],
    },
    {
      id: "3",
      title: "보이지 않아도 완성되고, 보일수록 품격이 되는",
      subtitle: "초슬림 히든스테이션과\n오브제스테이션으로 공간을 완성해요.",
      icon: "Armchair",
      tag: "공간 맞춤 솔루션",
      mediaType: "video",
      mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/n95twu_keyvideo_kitchen_pc.mp4",
      tabs: [
        {
          label: "히든스테이션",
          description:
            "보이지 않게 완성되는\n초슬림 히든스테이션\n15cm 초슬림 히든스테이션은 주방의 숨겨진 약 공간을 가치 있는 공간으로 바꿉니다.\n별도의 공간을 확보할 필요 없이 싱크대 하부 걸레받이에 설치할 수 있는 공간도 사실상 사용할 수 있습니다.",
          mediaType: "video",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/n95twu_keyvideo_kitchen_pc.mp4",
        },
        {
          label: "오브제스테이션",
          description:
            "보일수록 품격이 되는\n오브제스테이션\n컨테이너 내부 부품격이 있습니다.",
          mediaType: "video",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/n95tho_keyvideo_living-room_pc.mp4",
        },
      ],
      description:
        "보이지 않게 완성되는 히든스테이션부터, 보일수록 품격이 되는 오브제스테이션까지. 공간 성격에 맞춰 두 가지 디자인을 선택할 수 있어요.",
      highlights: ["히든스테이션 빌트인", "오브제스테이션 디자인", "공간 맞춤 선택", "보일수록 품격"],
    },
    {
      id: "5",
      title: "보안까지 빈틈없이,\n체계적인 보안 솔루션",
      subtitle: "보안 인증·개인정보·물리적 보안까지\n빈틈없이 지켜드려요.",
      icon: "Shield",
      tag: "체계적인 보안 솔루션",
      mediaType: "image",
      mediaUrl: "/__l5e/assets-v1/8fe1dd11-6cb7-465a-a9ea-57e5e0e11c19/vacuum-security-cert-left.png",
      tabs: [
        {
          label: "보안 인증",
          mediaType: "image",
          mediaUrl: "/__l5e/assets-v1/8fe1dd11-6cb7-465a-a9ea-57e5e0e11c19/vacuum-security-cert-left.png",
        },
        {
          label: "개인정보 보호",
          mediaType: "image",
          mediaUrl: "/images/security-privacy.png",
        },
        {
          label: "물리적 보안",
          description:
            "청소가 끝나면 스테이션 내부로 자동 복귀하고, 자동 개폐 도어가 닫히며 청소로봇 본체가 외부에 노출되지 않습니다. 슬림한 히든스테이션은 주방 싱크대 하단에 빌트인되고, 오브제스테이션은 가구처럼 자연스럽게 배치되어 외부 충격·먼지·이물질은 물론 아이와 반려동물의 접근까지 막아 물리적 보안을 완성합니다.",
          mediaType: "image",
          mediaUrl: "/__l5e/assets-v1/ca71652e-e0c0-41d1-b9cb-85f4f5c8f07a/vacuum-physical-security.png",
        },
      ],
      description:
        "글로벌 보안 인증을 획득한 LG 청소로봇은 개인정보 보호와 물리적 보안까지 갖춰 통신·저장·접근·보관 전 단계에서 빈틈없이 안전을 지켜드립니다.",
      highlights: ["글로벌 보안 인증", "개인정보 암호화 보호", "다층 보안 체계", "물리적 보안 스테이션"],
    },
    {
      id: "8",
      title: "청소로봇 관리,\n위생&케어 솔루션",
      subtitle: "위생부터 성능까지 한 번에 관리하여\n언제나 청결하게 사용할 수 있어요.",
      icon: "Sparkles",
      tag: "위생&케어 솔루션",
      mediaType: "image",
      mediaUrl: "https://viewkit.lovable.app/__l5e/assets-v1/d226a096-c139-4360-ac26-3392dec78942/vacuum-subscription-service-01.jpg",
      description:
        "청소로봇의 위생과 성능을 한 번에 관리하는 위생&케어 솔루션입니다. 케어 전문가가 정기 방문해 청소로봇의 내·외부 위생과 성능을 꼼꼼히 관리해드려요.",
      highlights: ["위생 케어", "성능 관리", "무상 A/S 및 소모품 교체"],
      tabs: [
        {
          label: "위생 케어",
          description:
            "물때와 세균 발생이 쉬운 급·배수통, 필터, 회전솔을 스팀으로 꼼꼼히 세척하고 전용 관리제로 스테이션 내부 오수관을 세척합니다.",
          mediaType: "image",
          mediaUrl: "https://viewkit.lovable.app/__l5e/assets-v1/d226a096-c139-4360-ac26-3392dec78942/vacuum-subscription-service-01.jpg",
        },
        {
          label: "성능 관리",
          description:
            "먼지와 이물질이 쌓일 수 있는 흡입구와 먼지통, 회전솔 등을 꼼꼼히 관리하여 청소 성능을 유지할 수 있도록 도와줍니다.",
          mediaType: "image",
          mediaUrl: "https://viewkit.lovable.app/__l5e/assets-v1/792fb934-9d72-442d-8433-c950ecc722ec/vacuum-subscription-service-02.jpg",
        },
        {
          label: "무상 A/S 및 소모품 교체",
          description:
            "계약기간 내내 무상 A/S 제공은 기본, 소모품 정기 교체로 관리의 번거로움을 줄여줍니다.",
          mediaType: "image",
          mediaUrl: "https://viewkit.lovable.app/__l5e/assets-v1/053e6377-2ea6-425d-bb5a-aa3306c91d16/vacuum-subscription-service-03.jpg",
        },
      ],
    },
    {
      id: "7",
      title: "우리집 청소 책임지는 청소 로봇\n청소 로봇의 청소는 구독으로",
      subtitle:
        "무상 A/S는 기본, 케어 전문가가 정기 방문해\n청소로봇 위생과 성능을 관리해드려요.",
      icon: "Wrench",
      tag: "구독",
      mediaType: "image",
      mediaUrl: "https://viewkit.lovable.app/__l5e/assets-v1/d226a096-c139-4360-ac26-3392dec78942/vacuum-subscription-service-01.jpg",
      description:
        "구독 기간 동안 무상 A/S는 기본, 케어 전문가가 정기 방문해 청소로봇의 내·외부 위생과 성능을 관리해드려요. 번거로운 소모품 교체까지 챙겨 더 편하게 사용할 수 있어요.",
      highlights: ["위생 케어", "성능 관리", "무상 A/S 및 소모품 교체"],
      tabs: [
        {
          label: "위생 케어",
          description:
            "물때와 세균 발생이 쉬운 급·배수통, 필터, 회전솔을 스팀으로 꼼꼼히 세척하고\n전용 관리제로 스테이션 내부 오수관을 세척합니다.",
          mediaType: "image",
          mediaUrl: "https://viewkit.lovable.app/__l5e/assets-v1/d226a096-c139-4360-ac26-3392dec78942/vacuum-subscription-service-01.jpg",
        },
        {
          label: "성능 관리",
          description:
            "먼지와 이물질이 쌓일 수 있는 흡입구와 먼지통, 회전솔 등을 꼼꼼히 관리하여\n청소 성능을 유지할 수 있도록 도와줍니다.",
          mediaType: "image",
          mediaUrl: "https://viewkit.lovable.app/__l5e/assets-v1/792fb934-9d72-442d-8433-c950ecc722ec/vacuum-subscription-service-02.jpg",
        },
        {
          label: "무상 A/S 및 소모품 교체",
          description:
            "계약기간 내내 무상 A/S 제공은 기본,\n소모품 정기 교체로 관리의 번거로움을 줄여줍니다.",
          mediaType: "image",
          mediaUrl: "https://viewkit.lovable.app/__l5e/assets-v1/053e6377-2ea6-425d-bb5a-aa3306c91d16/vacuum-subscription-service-03.jpg",
        },
      ],
    },
    {

      id: "6",
      title: "지금 사전 예약하고 혜택 받기",
      subtitle: "정식 출시 전 가장 먼저 만나볼 수 있는\n사전 예약 한정 판매 이벤트예요.",
      icon: "Globe",
      tag: "사전 예약 판매",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/images/vacuum-cleaners/md10360831/usp2/24_pc.png",
      description:
        "정식 출시에 앞서 진행되는 사전 예약 한정 판매 이벤트입니다. 예약 고객 대상 특별 구성·우선 배송 등 한정 혜택이 제공됩니다.\n\n자세한 내용은 매장 직원에게 문의해 주세요.",
      highlights: ["사전 예약 한정 혜택", "우선 배송", "한정 수량 판매"],
      collapsibleDisclaimers: [
        {
          title: "사전 예약 안내",
          items: [
            "사전 예약 기간 및 혜택은 변경될 수 있으며, 자세한 내용은 매장에서 안내드립니다.",
            "한정 수량으로 진행되며 조기 마감될 수 있습니다.",
          ],
        },
      ],
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

// Lucide icon name map – used by FeatureCard and FeatureDetail to render SVG icons
// Keys must match the `icon` field in each Feature object
export const featureIconNames: Record<string, string> = {
  Monitor: "Monitor",
  Cpu: "Cpu",
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
