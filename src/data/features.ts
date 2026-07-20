import aircondAiSleepAsset from "@/assets/airconditioner-ai-sleep.png.asset.json";
import aircondRadarAsset from "@/assets/airconditioner-radar.png.asset.json";
import aircondVoiceAsset from "@/assets/airconditioner-voice.png.asset.json";

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

export interface FeatureTab {
  label: string;
  description?: string;
  mediaType?: "video" | "image" | "youtube";
  mediaUrl?: string;
  fallbackUrl?: string;
  isShorts?: boolean;
  mediaSlides?: MediaSlide[];
  highlights?: string[];
  caption?: string;
  belowMediaImage?: { url: string; alt?: string; caption?: string };
  frameBg?: string;
  imageFit?: "cover" | "contain";
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
  mediaSlides?: MediaSlide[];
  belowMediaImage?: { url: string; alt?: string; caption?: string };
  mediaSectionTitle?: string;


  isShorts?: boolean;
  disclaimers?: string[];
  collapsibleDisclaimers?: CollapsibleDisclaimer[];
  tabs?: FeatureTab[];
  tabsVariant?: "pill" | "underline";
  disabled?: boolean;
  /** true면 SC(관리자) 계정에서만 노출, 매장 계정에서는 숨김 */
  scOnly?: boolean;
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
      subtitle: "옷에도 세균, 먼지가 묻어와요!\n스타일링 후 세균 수가 줄어드는지 직접 측정해봤어요.",
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
        "2011년 세계 최초로 의류관리기를 선보인 LG 스타일러가 글로벌 누적 판매 200만대를 돌파했어요.\n\n현재 27개국에서 판매되며, 트루스팀과 다이내믹 무빙행어 등 핵심 기술력으로 의류관리 가전의 글로벌 기준을 만들어가고 있어요.",
      highlights: ["글로벌 200만대 돌파", "27개국 판매", "2026년형 AI 맞춤 관리", "스타일러도 구독으로!"],
    },
  ],
  // TV 특장점
  tv: [
    {
      id: "1",
      title: "올레드? LCD TV와 다른건가요?",
      subtitle: "픽셀 하나하나가 스스로 빛나는 올레드.\n화질이 압도적일 수밖에 없는 이유를 패널 구조로 비교해보세요",
      icon: "Sparkles",
      tag: "자발광 올레드",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/story/user-guide/images/basic-spec-vocabulary/quality-list01.mp4",
      tabsVariant: "underline",
      tabs: [
        {
          label: "LCD",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/story/user-guide/images/basic-spec-vocabulary/quality-list01.mp4",
          caption:
            "LCD는 뒤쪽 백라이트가 화면 전체를 비추는 방식이라, 어두운 장면에서도 빛이 새어 나와 화면이 회색빛으로 보여요. 백라이트, 광학시트, 편광판, TFT, 컬러필터 등 여러 겹의 패널이 겹쳐 있어 구조가 두껍습니다.",
        },
        {
          label: "OLED",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/story/user-guide/images/basic-spec-vocabulary/quality-list05.mp4",
          caption:
            "OLED는 약 800만 개의 픽셀이 하나하나 스스로 빛을 내고, 꺼질 땐 완전히 꺼져요. 백라이트가 필요 없어 패널이 얇고, 어느 각도에서 봐도 색이 왜곡되지 않으며, 검정은 진짜 검정으로 표현됩니다.",
        },
      ],
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
      title: "저화질 영상도 선명하게 만들어준다고?",
      subtitle: "AI가 픽셀 단위로 영상을 세밀하게 분석해\n해상도, 밝기, 대비, 선명도를 높여줘요",
      icon: "Cpu",
      tag: "AI 화질 엔진",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/tvs/2026/G6/OLEDG6_02_02_pc_b.mp4",
      description:
        "AI 프로세서가 이미지를 더 빠르게 처리하고, 장르와 얼굴 등을 분석해 화질을 4K까지 업스케일링해요. 알아서 최적의 화질로 맞춰줘 생동감 넘치는 화질을 즐길 수 있어요.",
      highlights: [
        "픽셀 단위로 장면을 세밀하게 분석",
        "해상도·밝기·대비·선명도 향상",
        "듀얼 업스케일링 & 다이내믹 톤 매핑 울트라",
        "AI HDR 리마스터링으로 화질 강화",
      ],
    },

    {
      id: "3",
      title: "밝은 곳에서도 진짜 블랙일까?",
      subtitle: "오직 올레드만 가능한 퍼펙트 블랙 & 퍼펙트 컬러.\n낮의 밝은 거실에서도 블랙과 컬러가 흐려지지 않아요.",
      icon: "Sparkles",
      tag: "퍼펙트 블랙 & 퍼펙트 컬러",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/tvs/2026/G6/OLEDG6_01_03_01_pc.mp4",
      tabsVariant: "underline",
      tabs: [
        {
          label: "퍼펙트 블랙",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/images/tvs/2026/G6/OLEDG6_01_03_01_pc.mp4",
          frameBg: "#e8dccb",
          belowMediaImage: {
            url: "https://www.lge.co.kr/kr/images/tvs/2026/G6/OLEDG6_01_03_03_pc.jpg",
            alt: "Perfect Black 인증마크 - UL 인증",
          },
        },
        {
          label: "퍼펙트 컬러",
          mediaType: "image",
          mediaUrl: "https://www.lge.co.kr/kr/images/tvs/2026/G6/OLEDG6_01_02_pc.jpg",
          frameBg: "#000000",
          imageFit: "contain",
          belowMediaImage: {
            url: "https://www.lge.co.kr/kr/images/tvs/2026/G6/OLEDG6_01_03_03_pc.jpg",
            alt: "Perfect Color 인증마크 - 100% 색 정확도 · 100% 컬러 볼륨",
          },
        },
      ],
      description:
        "블랙이 깊을수록 컬러는 더 정확해져요. 완벽한 블랙 위에서 컬러도 생생하게 살아납니다.\nLG 올레드는 밝은 거실에서도 블랙이 회색으로 흐려지지 않고 선명한 컬러를 그대로 유지해요.",
      highlights: [
        "밝은 곳에서도 회색으로 흐려지지 않는 진짜 블랙",
        "밝은 곳에서도 선명한 색 그대로",
        "UL 퍼펙트 블랙 · 퍼펙트 컬러 인증",
        "100% 색 정확도 인증 · 100% 컬러 볼륨 인증",
      ],
    },

    {
      id: "4",
      title: "벽에 착 붙는 설치, 어떻게 할까요?",
      subtitle: "전용 벽 밀착 브라켓으로 벽에 착 붙게 설치할 수 있어요.\n설치 방법을 영상으로 확인해보세요.",
      icon: "ImageIcon",
      tag: "갤러리 디자인",
      mediaType: "video",
      mediaUrl: "https://www.youtube.com/watch?v=-0RpTyUXChk",
      description:
        "전용 벽 밀착 브라켓으로 벽에 착 붙게 설치할 수 있어요.\n설치 방법을 영상으로 확인해보세요.",
      highlights: [
        "벽면에 착 붙는 디자인",
        "전용 벽밀착 브라켓 사용",
      ],
    },
    {
      id: "5",
      scOnly: true,
      title: "어떤 올레드가 나에게 맞을까?",
      subtitle: "화질부터 사운드, AI 프로세서까지\nLG 올레드 라인업을 한눈에 비교해보세요.",
      icon: "Ruler",
      tag: "라인업 비교",
      mediaType: "image",
      mediaUrl: "https://static.lge.co.kr/kr/images/common/pdp_lineup_compare/images/tvs/26_tvs_oled_line_up_pc.jpg",
      mediaSectionTitle: "LG 올레드 한눈에 비교하기",
      description:
        "올레드 라인업별 특장점과 핵심 기능, 주요 스펙을 비교해 나에게 맞는 올레드를 골라보세요.",
      highlights: [],
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
        "물이 흐르는 길을 세척, 청소하기 힘든 기계실 세척, 이사 후 재설치까지 다양한 케어서비스 혜택이 있어요.",
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
        "수도관 매립 여부, 냉장고와 싱크대의 거리 등 환경에 따라 STEM 설치는 달라져요. 가구색과 유사한 몰딩을 이용해 수도관이 드러나지 않도록 깔끔하게 마감해요.",
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
            "싱크대 아래 걸레받이 틈으로 수도관을 꺼내 연결할 수 있어요. 가구색과 가장 유사항 몰딩으로 깔끔하게 마무리 해드려요.",
        },
        {
          url: "/images/installation-step4.jpeg",
          title: "4.싱크대가 냉장고를 놓을 위치와 다소 떨어져 있나요?",
          description:
            "싱크대와 냉장고 사이를 잇는 수도관을 벽면에 가깝게 붙여 설치해요. 가구색과 가장 유사한 몰딩으로 깔끔하게 마무리 해드려요",
        },
        {
          url: "/images/installation-step5.jpeg",
          title: "인테리어에 맞춘 몰딩 부자재",
          description:
            "Case3,4처럼 수도관이 밖으로 이어지는 경우에는 주방 가구 컬러에 맞춘 몰딩 부자재로 숨김 처리를 해드려요.",
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
        "도어 걸림을 없앤 제로 클리어런스 힌지가 만드는 단 4mm 간격의 완벽에 가까운 밀착! 인테리어 조화를 생각한 디자인으로 공간에 자연스럽게 녹아들어요.",
      highlights: ["제로 클리어런스 힌지", "인테리어 냉장고", "다양한 라인업", "냉툭튀가 싫다면 Fit & Max로"],
      tabs: [
        {
          label: "제로 클리어런스 힌지",
          description:
            "도어가 안쪽으로 회전하는 제로 클리어런스 힌지로\n냉장고 장과의 간격을 최소화해 더 완성도 높은\n주방 인테리어를 완성할 수 있어요.",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/images/refrigerators/md10780841/ZEROHINGE_SWING.mp4",
        },
        {
          label: "다양한 조합",
          description:
            "Fit & Max 라인업은 가구장 간격을\n4mm로 최소화한 밀착 설계를 적용했어요.\n우리 집 구조에 딱 맞는 조합을 선택해보세요.",
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
        "AI가 세탁의 시작부터, 건조가 끝나는 과정까지 함께해요. 세탁물의 무게를 감지하여 3초만에 코스별 예상 종료시간을 알 수 있고, AI 맞춤 세탁은 의류의 무게와 재질, 오염도에 맞춰 최적의 코스를 추천해요. 건조가 끝날무렵 건조기를 예열해두고, 사용하면 할수록 더 정확하게 건조 완료 시간을 알려줘요.",
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
        "AI DD 모터가 세탁물의 무게와 옷감의 부드러움을 스스로 감지해, 손빨래 동작을 본뜬 6가지 모션으로 옷감 손상은 줄이고 세탁 성능은 높여줘요. 건조할 때도 무게와 습도를 인식해 6모션으로 보송하게 마무리해주니, 아끼는 옷도 안심하고 맡기실 수 있어요.",
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
        "건조 성능을 좌우하는 콘덴서를 물로 자동 세척해 보풀과 먼지가 쌓이지 않도록 관리해줘요.\n\n사용자가 직접 분리·청소할 필요 없이 늘 깨끗한 상태를 유지해, 건조 효율과 위생을 오래도록 지켜드려요.",
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
        "통 내부는 물론 보이지 않는 건조기 내부까지 최대 12포인트를 살균해 유해 세균 4종을 99.9% 제거해요.\n\n세탁기와 건조기를 따로 관리할 필요 없이 한 번의 케어로 위생을 지켜드려요.",
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
        `"사설 업체를 부를까?", "내가 직접 뜯어서 닦을까?" 매년 여름 반복되는 리얼한 에어컨 청소 고민! LG전자 에어컨 구독의 라이트 플러스 전문 케어 서비스(분해세척/UV&피톤치드 케어)로 시원하게 해결해드려요.`,

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
    {
      id: "18",
      title: "에어컨 바람, 늘 같은 방향이\n불편하지 않으세요?",
      subtitle: "사용패턴과 공간을 분석해\n온도·기류를 알아서 맞춰주는 AI바람.",
      icon: "Wind",
      tag: "AI바람",
      mediaType: "video",
      mediaUrl:
        "https://static.lge.co.kr/kr/images/air-conditioners/md10731826/usp/26_Tower1_9s_choice_02.mp4",
      descriptionTitle: "원하는 온도는 기본, 나에게 맞는 기류까지",
      description:
        "더울 때는 빠르고 강력한 바람으로 빠르고 시원하게,\n시원해지면 미세하고 조용한 한쪽바람, 소프트바람으로 부드럽게 유지해요.\n적정 온도에 맞춰 쾌적함을 자동으로 조절하고,\n사용 패턴을 학습해 사용자에게 맞는 온도, 습도, 기류를 알아서 찾아줍니다.",
      highlights: [
        "공간·재실자 감지 맞춤 냉방",
        "더울 땐 빠르고 강력한 바람",
        "쾌적해지면 미세·조용한 소프트바람",
        "적정 온도 자동 조절",
      ],
      disclaimers: [
        "AI바람 세부 동작은 모델·설치 환경·설정 조건에 따라 달라질 수 있습니다.",
        "상세 사양은 LG전자 공식 홈페이지의 최신 정보를 기준으로 확인해주세요.",
      ],
    },
    {
      id: "19",
      title: "에어컨, 이제 청정관리가 핵심입니다",
      subtitle: "바람이 지나가는 길을 꼼꼼하게 케어하는\n휘센 청정관리 시스템",
      icon: "Sparkles",
      tag: "청정 · UVnano",
      mediaType: "video",
      mediaUrl:
        "https://static.lge.co.kr/kr/images/air-conditioners/md10731826/usp/25_Tower1_9s_Whisen_Detail_1.mp4",
      descriptionTitle: "눈에 보이지 않는 곳까지 알아서 관리하여 언제나 깨끗한 바람을 선사합니다",
      description:
        "필터 클린봇이 극세필터의 먼지를 청소하고, UV-LED 팬살균, AI열교환기 세척과 AI건조 기능 등으로\n에어컨 내부를 위생적으로 관리해요.",
      highlights: [
        "필터 클린봇",
        "알러지케어 공기청정",
        "AI열교환기 세척",
        "UV-LED 팬살균",
      ],
      collapsibleDisclaimers: [
        {
          title: "필터 클린봇",
          items: [
            "하루 8시간 사용 기준, 총 56시간(1주일) 누적 사용 시 필터 클린봇 청소 기능 작동(에어컨 운전 종료 시) 에어컨 미작동 시, LG ThinQ 앱으로 필터 클린봇 청소 기능 작동 가능합니다.",
            "클린봇이 필터를 청소하더라도 6개월 주기로 먼지통을 비워야 하며 수동으로 필터 청소도 가능합니다.",
            "필터의 청소 정도는 사용 환경이나 사용 패턴에 따라 다를 수 있습니다.",
          ],
        },
        {
          title: "CAC인증 공기청정",
          items: [
            "인증 기관: 한국공기청정협회",
            "인증 내용: 공기청정 에어컨디셔너 단체품질인증(CAC마크)",
            "인증 조건: KACA-CAC-2011-03 공기청정 에어컨디셔너",
            "인증 유효 기간: '24. 1 ~ '27. 1",
            "인증 모델: FQ**GN****",
            "적용 면적: 99.0㎡",
          ],
        },
        {
          title: "알러지 유발물질 필터링 BAF 인증",
          items: [
            "인증 기관: 영국 알레르기 협회(BAF, British Allergy Foundation)",
            "인증 부문: For Efficiency in reducing small particulates which may include allergens, bacteria, and viruses",
            "인증 유효 기간: ~ 26년 12월 20일",
            "인증 모델: FQ**GN****",
            "알러지케어 공기청정 필터는 알러지 유발 물질 저감 기능과 초미세먼지 제거 기능에 특화된 필터이며, 유해가스 제거 및 탈취 기능은 제공하지 않습니다.",
            "공기청정기능 단독 사용 시 제품 평균 소비전력은 자사 가정용 공기청정기(AS203NS3A)와 동등 수준 입니다.",
            "시험 장소: 자사 에어컨 항온항습 시험실",
            "시험 조건:\n   - 실내 27℃(RH 47%)\n   - 실외 35℃(RH 40%)",
            "시험 일시: 2023.10",
            "시험 모델명: FQ25LDNBEN(휘센타워I)",
            "시험 방법: 에어컨 공기청정기능 강풍 단독 운전을 실시하고 제품 소비전력을 측정값과 자사 가정용 공기정청기의 정격 소비전력과 비교하였습니다.",
            "시험 결과: 휘센타워I 공기 청정 강풍 단독 사용 시 평균 소비전력 50W 이하",
            "자사 시험 결과로 환경에 따라 차이가 있을 수 있습니다.",
            "공기청정 기능은 공기청정 단독 및 냉방, 제습 운전과 동시에 사용할 수 있습니다. 공기청정 단독 운전 중에는 희망하는 온도를 조절할 수 없습니다.",
            "제품 운전 중에 종합 청정도가 3단계(나쁨) 이상일 경우 공기청정 기능을 따로 설정하지 않았더라도 자동으로 공기청정 운전을 시작할 수 있습니다.",
            "스마트 공기청정 기능 운전 중에 리모컨의 공기청정 버튼을 누르면 스마트 공기청정 기능이 해제되며, 제품을 껐다가 다시 켜기 전까지는 공기청정 운전이 자동으로 실행되지 않습니다.",
            "종합 청정도가 1단계(좋음)가 되면 1단계(좋음)까지 걸린 시간만큼 스마트 공기청정으로 한번 더 운전한 후 해당 기능을 종료합니다.",
          ],
        },
        {
          title: "AI열교환기 세척",
          items: [
            "AI열교환기 세척 기능 사용 시, 실내 열교환기의 오염도를 온도 및 습도센서를 통해 모니터링합니다.",
            "열교환기의 오염이 일정수준에 도달하면 LG ThinQ 앱을 통해 알림을 안내하고, 자동으로 열교환기 세척 운전을 실시 합니다.",
            "AI열교환기 세척 기능은 제품 출하 시 기본 설정 되어 있으므로 자동으로 작동합니다.",
            "AI열교환기 세척 기능을 비활성화하기 위해서는 LG ThinQ 앱을 통하여 설정 가능합니다.",
            "LG ThinQ 앱 내에 가전제품 등록을 위해서는 가정 내 무선 인터넷 환경이 필요합니다.",
            "LG ThinQ 앱 기능 사용을 위해서는 스마트폰의 Google Play 스토어 또는 Apple App 스토어에서 LG ThinQ 앱을 설치하여 Wi-Fi에 연결해야 합니다.",
          ],
        },
        {
          title: "AI건조",
          items: [
            "AI건조 기능 사용 중 고객의 강제 종료 패턴을 분석하여 선호도에 맞게 자동으로 건조 시간을 조절하여 동작합니다.",
            "AI건조는 제품 출하 시 기본 설정되어 있으므로 바로 사용 가능합니다.",
            "냉방 / 제습 운전 종료 후 자동으로 AI건조 기능이 시작됩니다.",
            "AI건조가 시작되면 일정 시간동안 에어컨이 송풍 상태로 운전 되며 열교환기의 습기 제거에 도움을 줄 수 있습니다.",
            "잔여건조 시간이 제품 및 LG ThinQ 앱에 표시됩니다.",
            "실내 공기의 온도 및 습도 조건에 따라 내부의 건조 상태는 차이가 날 수 있습니다.",
          ],
        },
        {
          title: "UV-LED 팬살균",
          items: [
            "UVnano란? UVnano는 유해세균을 줄여주는 UV(자외선) LED와 자외선 파장 단위인 나노미터의 합성어로 LG전자의 다양한 생활가전 제품에 적용하고 있는 기능입니다.",
            "UVnano 살균 효율은 UV-C LED 빛이 팬 날개에 닿는 면적에 한합니다. 99.99 % 살균효율은 상부 팬 대표 위치 3곳에 대한 평균값이며 균을 접종하여 4시간 동안 광조사 후 미처리 군과의 균 수를 비교하여 계산하였습니다.",
            "본 시험 결과는 자사에서 제안한 시험방법에 따라 국제 공인시험기관으로부터 취득하였으며 제품 수명에 따른 광출력 감소 등 실사용 환경에 따라 다를 수 있습니다.",
            "시험 기관: TÜV Rheinland에서 참관 시험, 한국화학융합시험연구원에서 직접 시험을 수행함",
            "참조 규격: ISO 22196:2007",
            "모델: FQ25LBNRA2",
            "시험환경: (25 ± 2)℃, (50 ± 10)% RH",
            "처리조건: 팬 송풍 약풍 구동, UV-C LED(2시간 On / 30분 Off / 2시간 On)",
            "시험균: 황색포도상구균, 표피포도상구균, 대장균",
            "시험기간: 2020년 10월 29일 ~ 11월 16일",
          ],
        },
      ],
    },
    {
      id: "20",
      title: "수면, 절전, 대화까지 나에게 맞춤",
      subtitle: "AI수면·외출절전·홈모니터링·AI음성인식으로\n일상이 더 편리해집니다.",
      icon: "Sparkles",
      tag: "AI편의기능 · 절전",
      mediaType: "gallery",
      mediaUrl: aircondAiSleepAsset.url,
      galleryImages: [
        {
          url: aircondAiSleepAsset.url,
          title: "AI수면",
          description: "AI로 쾌적한 수면 환경 조성",
        },
        {
          url: aircondRadarAsset.url,
          title: "외출 절전 (레이더)",
          description: "외출 중 절전 및 모니터링",
        },
        {
          url: aircondVoiceAsset.url,
          title: "AI음성인식",
          description: "\"Hi LG\" 음성인식으로 간편한 사용",
        },
      ],
      descriptionTitle: "수면, 절전, 대화까지 나에게 맞춤",
      description:
        "AI수면은 편안한 밤을 위해 사용 패턴 기반 온도, 습도, 기류를 맞춰줘요.\n잠시 외출할 때 에너지 소비를 줄여주는 외출 절전 모드와\n집안의 움직임을 감지해 LG ThinQ 앱으로 알림을 발송해주는 홈모니터링 모드,\n내가 말하는 의도까지 파악해 운전해주는 AI음성인식으로 편리한 일상을 경험할 수 있어요.",
      highlights: [
        "AI수면",
        "외출 절전",
        "홈모니터링",
        "AI음성인식",
      ],
      collapsibleDisclaimers: [
        {
          title: "공통",
          items: [
            "· 소비자의 이해를 돕기 위해 연출된 이미지이며, 제품별 색상 및 스펙은 다를 수 있습니다.",
            "· 활동량 감지는 레이더센서 탑재 듀얼쿨 벽걸이 에어컨(SQ07GS9EES.AKOR)에 한하여 가능합니다.",
          ],
        },
        {
          title: "AI수면",
          items: [
            "· AI수면 기능은 취침예약 운전 중 고객의 사용패턴을 분석하여 자동으로 온도 및 습도를 조절하여 동작합니다.",
            "· 최초 사용 시 고객의 사용패턴 정보가 누적되기 전까지 설정된 희망온도와 습도 50%, 약풍 이하의 바람 세기로 운전됩니다.",
            "· 리모컨이나 LG ThinQ 앱으로 최대 12시간까지 설정 가능하며 최소는 30분이며 1시간부터 12시간까지는 1시간 단위로 예약이 가능합니다.",
            "· LG ThinQ 앱 내에 가전제품 등록을 위해서는 가정 내 무선 인터넷 환경이 필요합니다.",
            "· ThinQ 기능 사용을 위해서는 스마트폰의 Google Play 스토어 또는 Apple App 스토어에서 \"LG ThinQ\" 앱을 설치하여 Wi-Fi에 연결해야 합니다. 자세한 사용 방법은 애플리케이션의 도움말을 참고해주세요.",
          ],
        },
        {
          title: "AI수면 쾌적감",
          items: [
            "· 시험 일시: 2026.01",
            "· 시험 기관: 자사 에어컨 주택환경 시험실(74.0㎡ 주거환경 모사, 천고 높이 2.4m)",
            "· 시험 모델: FQ25GN9BEN",
            "· 시험 조건:",
            "   - 실내 DB(30±0.5)℃, WB(22±0.5)℃",
            "   - 실외 DB(30±0.5)℃, WB(22±0.5)℃",
            "   - 설정온도 26℃",
            "· 시험 방법: 자사 스탠드 AI수면 모드로 운전(총 운전 시간 7시간), 재실 영역의 온도, 유속 측정 후 온열감 산출하여 수면 쾌적감을 계산하였습니다.",
            "   - 온열감 산출(ISO 7730 PMV equation): 온도, 습도, 유속, 복사온도(측정값)",
            "   - 수면 쾌적감: 수면 시 침구 착의량을 고려한 PMV 계산식으로 도출",
            "   - 착의량(1.37clo: 침구 착의량, 일본 Kansai Univ.에서 공동연구 진행하여 취득한 값)",
            "   - 활동량(0.7MET: 누운 상태 사용)",
            "· 시험 결과:",
            "   - 전체 시간 동안의 수면 쾌적감 91%",
            "   - 수면쾌적감 지수: 80% 이상: 매우 쾌적, 60~80%: 보통, 60% 미만: 불쾌적",
            "   - 참조규격: 미국냉동공조학회 ASHRAE standard 55",
            "· 시험실 측정 결과 기준이며 실 사용환경에서는 달라질 수 있습니다.",
          ],
        },
        {
          title: "외출절전",
          items: [
            "· 외출 절전 기능은 냉방 운전 중 레이더센서를 통해 재실자 부재 시 절전모드 또는 제품 운전을 종료하며, 재감지 시 이전 운전 모드로 복귀합니다. 단, 제품 운전이 종료된 경우에는 제품이 OFF 상태로 유지됩니다.",
            "· 최초 사용 시 LG ThinQ 앱을 통한 레이더센서 활성화가 필요하며, LG ThinQ 앱을 통해 운전 모드와 재실자 부재 시간(30분~120분, 10분 단위)을 설정할 수 있습니다.",
            "· LG ThinQ 앱 내에 가전제품 등록을 위해서는 가정 내 무선 인터넷 환경이 필요합니다. ThinQ 기능 사용을 위해서는 스마트폰의 Google Play 스토어 또는 Apple App 스토어에서 \"LG ThinQ\" 앱을 설치하여 Wi-Fi에 연결해야 합니다. 자세한 사용 방법은 애플리케이션의 도움말을 참고해주세요.",
          ],
        },
        {
          title: "홈모니터링",
          items: [
            "· 홈모니터링 기능은 레이더센서가 적용 된 모델에 한정하여 사용할 수 있는 기능입니다. 제품에 따라 기능적용 여부가 다를 수 있으니, 제품 구매 전에 기능사양을 확인하시기 바랍니다.",
            "· 제품 운전이 OFF된 상태에서 레이더센서를 통해 재실자 움직임이 10분 내 3회 이상 감지 될 경우 LG ThinQ 앱을 통해 알림을 제공합니다.",
            "· 홈모니터링 기능을 사용하기 위해서는 LG ThinQ 앱을 통한 기능 활성화가 필요합니다.",
            "· LG ThinQ 앱 내에 가전제품 등록을 위해서는 가정 내 무선 인터넷 환경이 필요합니다.",
            "· LG ThinQ 앱 기능 사용을 위해서는 스마트폰의 Google Play 스토어 또는 Apple App 스토어에서 LG ThinQ 앱을 설치하여 Wi-Fi에 연결해야 합니다.",
          ],
        },
        {
          title: "AI음성인식",
          items: [
            "· 소비자의 이해를 돕기 위해 연출된 장면이며 실제와 다를 수 있습니다.",
            "· AI음성인식 기능은 무선리모컨을 이용하여 사용이 가능하며, 리모컨을 통해 명령어를 수신하여 동작합니다.",
            "· AI음성인식 기능은 음성인식 기능이 적용된 모델에 한정하여 사용할 수 있는 기능입니다. 제품에 따라 기능적용 여부가 다를 수 있으니, 제품 구매 전에 기능사양을 확인하시기 바랍니다.",
            "· 실제 음성인식 작동 시 사투리 억양, 감탄사 등에 따라 일부 동작 인식이 되지 않을 수도 있습니다.",
            "· 시험 일시: 2025.06",
            "· 시험 기관: LG R&D 연구소(자사)",
            "· 시험 모델: FQ25FN9BEN",
            "· 시험 방법: 더움 / 추움 / 습함 / 공기탁함에 관련된 지역별 대표 부사어 / 어미(와이리 / 억수로, 오메 / 아따, 오지게, ~아이가 / ~해도, ~슈, ~당께 등)의 조합 1,270가지를 발화하여 제품의 기능이 작동하는지 실험하였습니다.",
            "· 시험 결과: 해석률 92% 수준",
            "· 광고에 표현된 단어와 다른 경우, 어린이나 노인과 같이 발화가 불명확한 경우 등의 환경에서 음성 인식 기능이 정확하게 작동하지 않을 수 있습니다.",
            "· AI음성인식 기능을 사용하기 위해서는 LG ThinQ 앱 내 제품 등록이 필요합니다.",
            "· LG ThinQ 앱 내에 가전제품 등록을 위해서는 가정 내 무선 인터넷 환경이 필요합니다. LG ThinQ 앱 기능 사용을 위해서는 스마트폰의 Google Play 스토어 또는 Apple App 스토어에서 LG ThinQ 앱을 설치하여 Wi-Fi에 연결해야 합니다. 자세한 사용 방법은 애플리케이션의 도움말을 참고해주세요.",
          ],
        },
      ],
    },

    {
      id: "21",
      title: "어떤 휘센이 우리 집에 맞을까요?",
      subtitle: "타워I·뷰I 프로 5개 모델을\n한눈에 비교해보세요.",
      icon: "Search",
      tag: "라인업 비교",
      mediaSectionTitle: "26년 LG 휘센 한눈에 비교하기",
      mediaType: "image",
      mediaUrl:
        "https://static.lge.co.kr/kr/images/common/pdp_lineup_compare/images/air-conditioners/whisen_type1_2026_line_up_pc.png",
      description:
        "타워I 9·7·5시리즈는 원하는 온도는 기본, 원하는 습도까지 AI로 더 편리해진 프리미엄 에어컨입니다.\n뷰I 프로 6·5시리즈는 공간 맞춤 냉방과 제습, 뷰케이스로 다양한 홈스타일링까지 가능한 인테리어 에어컨입니다.\n\nAI 특화기능(레이더센서·AI 콜드프리·AI 수면·AI 음성인식), 냉방(AI바람·소프트바람), 청정관리(필터클린봇·알러지케어 필터·UV-LED 팬살균), 셀프청정, 공기청정(PM1.0 센서), 에너지 등급, 색상·뷰케이스 등 항목별 사양을 비교해 우리 집에 맞는 모델을 선택해보세요.",
      highlights: [
        "타워I 9시리즈 · 프리미엄 AI 에어컨",
        "타워I 7·5시리즈 · 합리적 선택",
        "뷰I 프로 6·5시리즈 · 인테리어 에어컨",
        "전 모델 2026년 출시",
      ],
      disclaimers: [
        "실제 판매 모델의 스펙과 다를 수 있으며, 매장 재고 및 시즌에 따라 라인업이 조정될 수 있습니다.",
        "상세 사양은 LG전자 공식 홈페이지의 최신 정보를 기준으로 확인해주세요.",
      ],
    },
    {
      id: "22",
      title: "일상이 더 쾌적해지는 순간, TVCF 이야기",
      subtitle: "혁신적인 기술이 완성한 쾌적함, 영상 속에서 그 차이를 확인하세요.",
      icon: "Video",
      tag: "TVCF",
      mediaType: "youtube",
      mediaUrl: "https://www.youtube.com/watch?v=TNiEqW-mcb0",
      description:
        "지금까지의 에어컨은 절반의 쾌적\n지금부터 휘센은 완전한 쾌적!\n\n국내최초 AI콜드프리\n온도는 기본, 습도까지 내 마음대로\n\n마침내 AI콜드프리로\n온도를 넘어 습도까지 완벽한 바람",
      highlights: [],
    },
  ],



  // 청소기 특장점
  vacuum: [
    {
      id: "1",
      title: "바닥 얼룩, AI가 알아서 닦아줄까요?",
      subtitle: "AI 오염 인식으로 자동으로 바닥 오염물을 알아서\n닦아주는 편리한 스팀 물걸레 청소를 경험해보세요.",
      icon: "Flame",
      tag: "스팀 물걸레",
      mediaType: "video",
      mediaUrl: "https://static-stg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_02_moving_steam_pc.mp4",
      description: "로니는 AI 오염 인식 결과를 바탕으로 마른 얼룩이 인식되면 자동으로 스팀 물걸레 청소를 시작할 수 있습니다.\n실시간으로 생성된 100°C 스팀을 물걸레에 직접 분사해 강력하게 청소하며 오염 정도에 따라 최대 2회까지 청소를 반복합니다.\n청소가 끝나면 LG ThinQ 앱에서 청소 전후를 사진으로 비교할 수 있습니다.",
      highlights: ["AI로 바닥 오염물 인식", "100°C 스팀 물걸레 청소", "최대 2회 반복 청소", "ThinQ 전후 사진 비교"],
    },
    {
      id: "2",
      title: "흡입력, 어디까지 강해질까요?",
      subtitle: "최대 30W의 강력한 흡입력과 엉킴 방지 브러시로 머리카락 엉킴 걱정 없이 편리한 청소를 경험해보세요.",
      icon: "Zap",
      tag: "흡입 청소",
      mediaType: "video",
      mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_09_powerful_suction_pc.mp4",
      description:
        "강력한 30W 흡입력으로 카펫 속 숨어 있는 먼지까지 흡입하고, 벽·모서리 먼지는 엣지 확장 브러시로, 머리카락과 반려동물 털은 듀얼 엉킴 방지 브러시로 한 번에 해결해요.",
      highlights: [
        "30W 강력 흡입력",
        "카펫 속 미세먼지까지 흡입",
        "엣지 확장 물걸레로 벽면 밀착 청소",
        "구석구석 사각지대 해결",
      ],
      tabs: [
        {
          label: "강력한 30W 흡입력",
          description:
            "로니는 강력한 모터로 최대 30W의 흡입력을 제공합니다.\n머리카락 엉킴을 줄여주는 듀얼 엉킴 방지 브러시로 청소 효율을 높이고\n에지(Edge) 확장 사이드 브러시와 물걸레로 구석과 벽면까지 밀착 청소합니다.",
          highlights: [
            "30W 강력 흡입력",
            "고성능 모터",
            "무거운 이물질 흡입",
            "바닥 먼지 완전 제거",
          ],
          mediaType: "video",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_09_powerful_suction_pc.mp4",
        },
        {
          label: "엣지 확장 브러시",
          description:
            "최대 46mm까지 확장되는 사이드 브러시와 물걸레로 모서리나 벽면에 밀착하여 청소합니다.",
          highlights: [
            "엣지 확장 브러시",
            "벽면 가장자리 밀착 청소",
            "청소 사각지대 해결",
            "구석구석 꼼꼼 청소",
          ],
          mediaType: "video",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_10_edge_cleaning.mp4",
        },
        {
          label: "듀얼 엉킴 방지 브러시",
          description:
            "두 개의 브러시가 회전하며 머리카락을 가운데로 모아 엉킴을 방지합니다.\n모은 머리카락은 효율적으로 분리되어 먼지통으로 흡입합니다.",
          highlights: [
            "듀얼 엉킴 방지 브러시",
            "머리카락 흡입구 자동 이동",
            "엉킴 걱정 없이",
            "꾸준한 청소 성능",
          ],
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
      title: "우리 집 맞춤 스마트 청소, 가능할까요?",
      subtitle: "복잡한 장애물은 알아서 피하고, 놓친 공간까지\n스스로 찾아 완성하는 AI 맞춤 청소를 경험해보세요.",
      icon: "Navigation",
      tag: "AI 맞춤 청소",
      mediaType: "video",
      mediaUrl: "https://static-stg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_03_sensing_ai_driving_pc.mp4",
      description:
        "RGB 카메라와 센서 기반 다양한 상황과 장애물을 섬세하게 인식하고 똑똑하게 판단합니다.\n헤매거나 바퀴가 들려 구속되었던 공간은 '고립 위험 영역'으로 인식하고 다음 청소에는 이를 회피하여 청소합니다.\n이후 해당 영역 내 장애물이 사라지면 청소를 재개해 진화하는 청소 경험을 제공합니다.",
      highlights: ["복잡한 집안 구조와 장애물 똑똑하게 판단", "고립 위험 공간 스스로 학습해 안전 회피", "장애물 치워지면 놓친 곳까지 재청소", "쓸수록 진화하는 청소 편리함"],

    },
    {
      id: "3",
      title: "우리 집엔 어떤 게 어울릴까요?",
      subtitle: "우리 집 공간에 딱 맞춘 두 가지 타입의\n프리미엄 스테이션을 비교해보세요.",
      icon: "Armchair",
      tag: "공간 맞춤 솔루션",
      mediaType: "video",
      mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/n95twu_keyvideo_kitchen_pc.mp4",
      mediaSlides: [
        {
          mediaType: "video",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/n95twu_keyvideo_kitchen_pc.mp4",
        },
        {
          mediaType: "image",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_lifestyle_kitchen_pc_01.jpg",
        },
        {
          mediaType: "image",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_lifestyle_kitchen_pc_02.jpg",
        },
        {
          mediaType: "image",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_interior_kitchen_pc_01.jpg",
        },
        {
          mediaType: "image",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_interior_kitchen_pc_02.jpg",
        },
        {
          mediaType: "image",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_interior_kitchen_pc_03.jpg",
        },
        {
          mediaType: "image",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_interior_kitchen_pc_04.jpg",
        },
        {
          mediaType: "image",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_interior_kitchen_pc_05.jpg",
        },
      ],

      tabs: [
        {
          label: "히든스테이션",
          description:
            "약 15cm 초슬림 히든스테이션은 주방의 숨겨진 공간을 가치 있는 공간으로 바꿉니다.\n별도 전용 수납장을 마련할 필요 없이 싱크대 하단 걸레받이에 설치 가능해\n기존 수납 공간도 그대로 활용할 수 있습니다.",
          mediaType: "video",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/n95twu_keyvideo_kitchen_pc.mp4",
          highlights: [
            "15cm 초슬림 히든스테이션",
            "싱크대 하부 걸레받이 설치",
            "기존 수납 공간 그대로",
            "설치 부담을 줄인 디자인",
          ],

        },
        {
          label: "오브제스테이션",
          description:
            "공간 맞춤 디자인의 오브제스테이션을 거실 내 사이드 테이블로 자연스럽게 배치하세요.\n인테리어에 매끄럽게 스며들어 공간의 품격을 높여줍니다.",

          highlights: [
            "공간 맞춤 디자인",
            "거실 사이드 테이블로 활용",
            "소파 옆 간편 배치",
            "인테리어 품격 UP",
          ],

          mediaType: "video",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/n95tho_keyvideo_living-room_pc.mp4",
          mediaSlides: [
            {
              mediaType: "video",
              mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/n95tho_keyvideo_living-room_pc.mp4",
            },
            {
              mediaType: "image",
              mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_lifestyle_livingroom_pc_01.jpg",
            },
            {
              mediaType: "image",
              mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_lifestyle_livingroom_pc_02.jpg",
            },
            {
              mediaType: "image",
              mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_interior_livingroom_pc_01.jpg",
            },
            {
              mediaType: "image",
              mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_interior_livingroom_pc_02.jpg",
            },
            {
              mediaType: "image",
              mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_interior_livingroom_pc_03.jpg",
            },
            {
              mediaType: "image",
              mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_interior_livingroom_pc_04.jpg",
            },
            {
              mediaType: "image",
              mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_interior_livingroom_pc_05.jpg",
            },
            {
              mediaType: "image",
              mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_interior_livingroom_pc_06.jpg",
            },
          ],
        },
      ],
      description:
        "보이지 않아도 완성되고, 보일수록 품격이 되는 히든스테이션과 오브제스테이션. 공간 성격에 맞춰 두 가지 디자인을 선택할 수 있어요.",
      highlights: ["15cm 초슬림 히든스테이션", "싱크대 하부 걸레받이 설치", "보일수록 품격 오브제스테이션", "공간 성격에 맞춘 두 디자인"],
    },
    {
      id: "8",
      title: "위생 케어, 손 안 대고도 깨끗할까요?",
      subtitle: "물걸레 냄새와 빨래 번거로움 없이 100℃ 스팀 살균과 온풍 건조로 더 위생적인 케어 솔루션을 경험해보세요.",
      icon: "Sparkles",
      tag: "위생&케어 솔루션",
      mediaType: "image",
      mediaUrl: "https://viewkit.lovable.app/__l5e/assets-v1/d226a096-c139-4360-ac26-3392dec78942/vacuum-subscription-service-01.jpg",
      description:
        "청소로봇의 위생과 성능을 한 번에 관리하는 위생&케어 솔루션이에요. 케어 전문가가 정기 방문해 청소로봇의 내·외부 위생과 성능을 꼼꼼히 관리해드려요.",
      highlights: ["100℃ 살균 스팀", "스테이션 컨디셔닝", "무상 A/S 및 소모품 교체"],
      tabs: [
        {
          label: "100℃ 살균 스팀",
          description:
            "로니는 냉온수 세척부터 100℃ 살균 스팀까지 맞춤 세척 솔루션입니다.\n끝난 후에는 약 40~60℃ 온풍으로 물걸레를 건조시켜 물걸레 속 유해균을 99.99% 제거합니다.",
          mediaType: "video",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_12_mop_solution_pc.mp4",
          highlights: [
            "냉온수 맞춤 세척",
            "100℃ 살균 스팀",
            "약 40℃ 온풍 건조",
            "유해균 99.99% 제거",
          ],

        },
        {
          label: "스테이션 컨디셔닝",
          description:
            "히든스테이션 상부의 배기 팬이 제품 내부에서 발생할 수 있는 습증기를 외부로 배출해 스테이션 내부 관리에 대한 걱정과 부담을 덜어줍니다.",
          mediaType: "video",
          mediaUrl: "https://wwwstg.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_13_station_conditioning_pc.mp4",
          highlights: [
            "히든스테이션 상부 배기 팬",
            "내부 습증기 외부 배출",
            "히든 스테이션 내부 관리 부담 감소",
          ],
        },
      ],
    },
    {
      id: "5",
      title: "보안, 정말 안심해도 될까요?",
      subtitle: "보안 인증부터 개인정보, 물리적 보안까지\n안심을 더해주는 체계적인 보안 시스템을 알아보세요.",
      icon: "Shield",
      tag: "체계적인 보안 솔루션",
      mediaType: "image",
      mediaUrl: "/__l5e/assets-v1/8fe1dd11-6cb7-465a-a9ea-57e5e0e11c19/vacuum-security-cert-left.png",
      tabs: [
        {
          label: "보안 인증 & 개인정보 보호",
          mediaType: "image",
          mediaUrl: "/__l5e/assets-v1/8fe1dd11-6cb7-465a-a9ea-57e5e0e11c19/vacuum-security-cert-left.png",
          description: "사용자의 데이터를 안전하게 지키는 LG Shield로 철저한 보안 리스크 관리가 가능하고 이에 대해 개인정보보호위원회로부터 PbD 인증도 부여받았습니다.\n또한 소중한 개인 정보가 국외 서버로 전송되는 것을 제한하며 개인 정보를 철저하게 보호합니다.",
        },
        {
          label: "물리적 보안",
          description:
            "청소 후에는 자동 도어 닫힘 기능으로 카메라 노출 걱정까지 줄여 더욱 안심할 수 있습니다.",
          mediaType: "image",
          mediaUrl: "/__l5e/assets-v1/87dc63ce-7648-4fbf-9550-379990c2c0db/vacuum-physical-security-right-v2.png",
        },
      ],
      description:
        "글로벌 보안 인증을 획득한 LG 청소로봇은 개인정보 보호와 물리적 보안까지 갖춰 통신·저장·접근·보관 전 단계에서 빈틈없이 안전을 지켜줘요.",
      highlights: [],
    },
    {
      id: "7",
      title: "구독, 더 편해질까요?",
      subtitle: "무상 A/S는 기본, 전문가가 늘 새것처럼 유지해 주는\n차별화된 구독 서비스를 살펴보세요.",
      icon: "Wrench",
      tag: "구독",
      mediaType: "image",
      mediaUrl: "https://viewkit.lovable.app/__l5e/assets-v1/d226a096-c139-4360-ac26-3392dec78942/vacuum-subscription-service-01.jpg",
      description:
        "구독 기간 동안 무상 A/S는 기본, 케어 전문가가 정기 방문해 청소로봇의 내·외부 위생과 성능을 관리해드려요. 번거로운 소모품 교체까지 챙겨 더 편하게 사용할 수 있어요.",
      highlights: [
        "급·배수통·필터·회전솔 스팀 세척",
        "스테이션 내부 오수관 세척",
        "흡입구·먼지통·회전솔 관리",
        "무상 A/S 및 소모품 교체",
      ],
      tabs: [
        {
          label: "위생 케어",
          description:
            "전용 관리제로 스테이션 내부 오수관을 세척하고\n물때와 세균 발생이 쉬운 급·배수통, 필터, 회전솔을 스팀으로 꼼꼼히 세척합니다.",
          mediaType: "image",
          mediaUrl: "https://viewkit.lovable.app/__l5e/assets-v1/d226a096-c139-4360-ac26-3392dec78942/vacuum-subscription-service-01.jpg",
          highlights: [],
        },
        {
          label: "성능 관리",
          description:
            "먼지와 이물질이 쌓일 수 있는 흡입구와 먼지통, 회전솔 등을 꼼꼼히 관리하여\n청소 성능을 유지할 수 있도록 도와줍니다.",
          mediaType: "image",
          mediaUrl: "https://viewkit.lovable.app/__l5e/assets-v1/792fb934-9d72-442d-8433-c950ecc722ec/vacuum-subscription-service-02.jpg",
          highlights: [],
        },
        {
          label: "무상 A/S 및 소모품 교체",
          description:
            "계약기간 내내 무상 A/S 제공은 기본,\n소모품 정기 교체로 관리의 번거로움을 줄여줍니다.",
          mediaType: "image",
          mediaUrl: "https://viewkit.lovable.app/__l5e/assets-v1/04011284-51c7-43a5-83c5-2ad70db02be6/vacuum-subscription-service-03.jpg",
          highlights: [],
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
        "최신 NVIDIA RTX 4090 그래픽카드와 인텔 13세대 프로세서로 AAA 게임을 최고 옵션에서 플레이할 수 있어요. 레이트레이싱과 DLSS 3.0을 지원해요.",
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
        "수냉식 쿨러와 RGB 팬으로 강력한 냉각 성능과 화려한 비주얼을 동시에 제공해요. 소프트웨어로 다양한 라이팅 효과를 설정할 수 있어요.",
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
        "넓은 내부 공간으로 가족 식사 후 많은 식기를 한 번에 세척할 수 있어요. 다양한 랙 구성으로 효율적인 공간 활용이 가능해요.",
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
        "4방향 회전 노즐이 구석구석 강력하게 세척해요. 찌든 때도 깨끗하게 제거하여 손세척보다 더 위생적이에요.",
      highlights: ["4방향 회전 분사", "고압 세척", "99.9% 살균", "에너지 절약"],
    },
  ],

  // 바스에어 특장점 (대외비 · SC/KOR 계정 전용 미리보기)
  bathair: [
    {
      id: "1",
      title: "습한 욕실, 정말 그냥 두시겠어요?",
      subtitle: "샤워 후 남은 습기와 냄새,\n바스에어가 자동으로 관리해드려요.",
      icon: "Droplets",
      tag: "스마트 제습",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/lg-styler/md10747827/usp/SC5GMR80S_12_true_steam_Detail_01.mp4",
      description:
        "샤워 후 욕실에 남은 습기는 곰팡이와 냄새의 원인이 돼요. 바스에어는 습도를 감지해 자동으로 작동하며, 짧은 시간 안에 욕실 공기를 쾌적하게 바꿔줍니다.",
      highlights: [
        "샤워 후 자동 감지·작동",
        "곰팡이·냄새 원인 습기 제거",
        "저소음 야간 모드",
        "에너지 효율 1등급",
      ],
    },
    {
      id: "2",
      title: "실제 써본 후기가 궁금하다면?",
      subtitle: "실사용자의 리뷰 영상으로\n바스에어의 효과를 확인해보세요.",
      icon: "Tv",
      tag: "사용자 리뷰",
      mediaType: "youtube",
      mediaUrl: "https://www.youtube.com/embed/dVEO3aYykTM",
      description: "설치 전후 욕실 습도 변화와 실사용자의 생생한 후기를 영상으로 만나보세요.",
      highlights: ["설치 전후 비교", "실측 습도 변화", "생활 소음 체크"],
    },
    {
      id: "3",
      title: "우리 집 욕실에도 설치될까요?",
      subtitle: "다양한 욕실 크기와 구조에\n어떻게 설치되는지 살펴보세요.",
      icon: "ImageIcon",
      tag: "설치 사례",
      mediaType: "gallery",
      mediaUrl: "",
      galleryImages: [
        {
          url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=800&fit=crop",
          title: "일반 가정 욕실",
          description: "천장형 슬림 설치로 공간을 차지하지 않아요.",
        },
        {
          url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&h=800&fit=crop",
          title: "샤워부스가 있는 욕실",
          description: "샤워부스 상단 설치로 습기 배출 효율을 극대화했어요.",
        },
        {
          url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
          title: "럭셔리 프리미엄 욕실",
          description: "인테리어와 어우러지는 무광 화이트 디자인.",
        },
      ],
      description: "천장형 슬림 디자인으로 어떤 욕실에도 자연스럽게 어울려요.",
      highlights: ["천장형 슬림 설치", "무광 화이트 마감", "기존 환풍구 활용 가능"],
    },
    {
      id: "4",
      title: "바스에어, 어떤 모델이 맞을까요?",
      subtitle: "베이직·프리미엄·AI 모델을\n스펙별로 비교해보세요.",
      icon: "Search",
      tag: "모델 비교",
      mediaType: "table",
      mediaUrl: "",
      description:
        "욕실 크기·사용 인원·필요 기능에 따라 알맞은 바스에어 모델을 선택하세요.",
      highlights: ["적용 면적", "제습 용량", "AI 자동 모드", "스마트홈 연동"],
      tableData: [
        {
          name: "바스에어 베이직",
          imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop",
          specs: [
            { label: "적용 면적", values: ["~ 3평"] },
            { label: "제습 용량", values: ["일 6L"] },
            { label: "AI 자동 모드", values: ["-"] },
            { label: "스마트홈 연동", values: ["-"] },
            { label: "케어 서비스", values: ["●"] },
          ],
        },
        {
          name: "바스에어 프리미엄",
          imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop",
          specs: [
            { label: "적용 면적", values: ["~ 5평"] },
            { label: "제습 용량", values: ["일 10L"] },
            { label: "AI 자동 모드", values: ["●"] },
            { label: "스마트홈 연동", values: ["ThinQ"] },
            { label: "케어 서비스", values: ["●"] },
          ],
        },
        {
          name: "바스에어 AI",
          imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
          specs: [
            { label: "적용 면적", values: ["~ 7평"] },
            { label: "제습 용량", values: ["일 14L"] },
            { label: "AI 자동 모드", values: ["●", "학습형 케어"] },
            { label: "스마트홈 연동", values: ["ThinQ", "Matter"] },
            { label: "케어 서비스", values: ["●", "프리미엄"] },
          ],
        },
      ],
      disclaimers: [
        "본 페이지의 내용은 내부 검토용이며, 실제 출시 사양과 다를 수 있습니다.",
      ],
    },
    {
      id: "5",
      title: "AI가 알아서 관리해준다고요?",
      subtitle: "습도·냄새·사용 패턴을 학습해\n최적의 시점에 자동으로 작동해요.",
      icon: "Cpu",
      tag: "AI 스마트 케어",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/tvs/2026/G6/OLEDG6_02_02_pc_b.mp4",
      description:
        "AI 센서가 온도·습도·냄새·사용 시간을 분석해, 사용자가 조작하지 않아도 최적의 상태로 욕실을 관리해줍니다. ThinQ 앱으로 언제 어디서든 확인하세요.",
      highlights: [
        "온도·습도·냄새 통합 센싱",
        "사용 패턴 학습형 자동 모드",
        "ThinQ 원격 제어",
        "월간 케어 리포트 제공",
      ],
    },
    {
      id: "6",
      title: "구독으로 더 편리하게",
      subtitle: "필터 교체·정기 세척까지\n전문가가 알아서 챙겨드려요.",
      icon: "Wrench",
      tag: "구독 케어",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=1000&fit=crop",
      description:
        "구독 시 정기 필터 교체, 내부 세척, 성능 점검까지 포함돼요. 별도 관리 없이도 오래 새 제품처럼 사용할 수 있어요.",
      highlights: [
        "정기 필터 교체 (6개월)",
        "연 1회 전문가 방문 세척",
        "성능 점검 & AS 우선",
        "월 구독료 형태로 부담 없이",
      ],
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
  Gift: "Gift",
  Cable: "Cable",
  Droplets: "Droplets",
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
