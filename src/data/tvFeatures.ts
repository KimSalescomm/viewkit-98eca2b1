/**
 * tv 제품 카드·상세 문구 편집 파일.
 * title: 질문형 제목 / subtitle: 부제 / tag: 기능명 / description: 상세 설명
 * highlights: 핵심만 쏙 / tabs: 탭별 내용 / disclaimers: 유의사항
 * 문구만 수정할 때 id는 변경하지 마세요. 카드 순서는 featureCardConfig.ts에서 관리합니다.
 */
import type { Feature } from "@/data/features";
import tvLineupGSeriesAsset from "@/assets/tv-lineup-g-series.png.asset.json";
import tvLineupCSeriesAsset from "@/assets/tv-lineup-c-series.png.asset.json";
import tvLineupBSeriesAsset from "@/assets/tv-lineup-b-series.png.asset.json";

export const tvFeatures: Feature[] = [
    {
      id: "1",
      title: "올레드? LCD TV와 다른건가요?",
      subtitle: "픽셀 하나하나가 스스로 빛나는 올레드.\n화질이 압도적일 수밖에 없는 이유를 패널 구조로 비교해보세요",
      icon: "Sparkles",
      tag: "자발광 올레드",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/story/user-guide/images/basic-spec-vocabulary/quality-list01.mp4",
      tabs: [
        {
          label: "LCD",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/story/user-guide/images/basic-spec-vocabulary/quality-list01.mp4",
          description:
            "LCD는 뒤쪽 백라이트가 화면 전체를 비추는 방식이에요. 어두운 장면에서도 빛이 새어 나와 화면이 회색빛으로 보이고, 백라이트·광학시트·편광판·TFT·컬러필터 등 여러 겹의 패널이 겹쳐 있어 구조가 두꺼워요.",
        },
        {
          label: "올레드",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/story/user-guide/images/basic-spec-vocabulary/quality-list05.mp4",
          description:
            "OLED는 약 8백만 개의 픽셀 하나하나가 스스로 빛을 내는 방식이에요. 꺼질 땐 완전히 꺼져서 진짜 검정을 표현하고, 백라이트가 없어 패널이 얇고, 어느 각도에서 봐도 색 왜곡이 없어요.",
        },
      ],
      description: "",
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
      description: "전용 벽 밀착 브라켓으로 벽에 착 붙게 설치할 수 있어요.\n설치 방법을 영상으로 확인해보세요.",
      highlights: ["벽면에 착 붙는 디자인", "전용 벽밀착 브라켓 사용"],
    },
    {
      id: "6",
      title: "실제로 사용하는 고객들의 솔직 리뷰!",
      subtitle: "LG전자 공식 홈페이지에 남겨둔 고객 리뷰를\n바로 확인해보세요.",
      icon: "Star",
      tag: "고객 리뷰",
      mediaType: "image",
      mediaUrl: "https://static.lge.co.kr/kr/story/buying-guide/2025/img/tv/img_P14_001_10.png",
      embedUrl: "https://www.lge.co.kr/mkt/review/MD10770835/pdpReviewListPopup",
      description:
        "구매 고객이 직접 남긴 별점과 후기를 확인해보세요. 화질, 사운드, 설치 만족도까지 생생한 이야기가 담겨 있어요.",
      highlights: [],
    },
    {
      id: "5",
      scOnly: true,
      title: "어떤 올레드가 나에게 맞을까?",
      subtitle: "화질부터 사운드, AI 프로세서까지\nLG 올레드 라인업을 한눈에 비교해보세요.",
      icon: "Ruler",
      tag: "라인업 비교",
      mediaType: "table",
      mediaUrl: "https://static.lge.co.kr/kr/images/common/pdp_lineup_compare/images/tvs/26_tvs_oled_line_up_pc.jpg",
      mediaSectionTitle: "LG 올레드 한눈에 비교하기",
      description: "",
      highlights: [],
      tableData: [
        {
          name: "G 시리즈",
          category: "고화질 · 고음질의 프리미엄 올레드 선호 고객",
          imageUrl: tvLineupGSeriesAsset.url,
          specs: [
            { label: "올레드 evo", values: ["●"], highlighted: true },
            { label: "해상도", values: ["4K"] },
            { label: "주사율", values: ["120 Hz"] },
            { label: "VRR 최대 주사율", values: ["165 Hz"], highlighted: true, compact: true },
            { label: "AI 프로세서", values: ["알파11 (3세대)"], highlighted: true },
            { label: "돌비 비전 / 돌비 애트모스", values: ["●"] },
            { label: "하이퍼 브라이트 부스터", values: ["●"], highlighted: true },
            { label: "버추얼 서라운드", values: ["11.1.2"] },
            { label: "운영체제", values: ["webOS 26"] },
            { label: "리모컨", values: ["AI 매직 리모컨"], highlighted: true },
          ],
        },
        {
          name: "C 시리즈",
          category: "스탠다드 올레드를 찾는 고객",
          imageUrl: tvLineupCSeriesAsset.url,
          specs: [
            { label: "올레드 evo", values: ["●"], highlighted: true },
            { label: "해상도", values: ["4K"] },
            { label: "주사율", values: ["120 Hz"] },
            { label: "VRR 최대 주사율", values: ["165 Hz"], highlighted: true, compact: true },
            { label: "AI 프로세서", values: ["알파11 (3세대)"], highlighted: true },
            { label: "돌비 비전 / 돌비 애트모스", values: ["●"] },
            { label: "하이퍼 브라이트 부스터", values: ["올레드 밝기 부스터"] },
            { label: "버추얼 서라운드", values: ["11.1.2"] },
            { label: "운영체제", values: ["webOS 26"] },
            { label: "리모컨", values: ["AI 매직 리모컨 / 일반 리모컨", "※ 모델별 상이"] },
          ],
        },
        {
          name: "B 시리즈",
          category: "실속형 올레드를 찾는 고객",
          imageUrl: tvLineupBSeriesAsset.url,
          specs: [
            { label: "올레드 evo", values: ["-"] },
            { label: "해상도", values: ["4K"] },
            { label: "주사율", values: ["120 Hz"] },
            { label: "VRR 최대 주사율", values: ["144 Hz / 120 Hz", "※ 모델별 상이"], compact: true },
            { label: "AI 프로세서", values: ["알파8 (3세대)"] },
            { label: "돌비 비전 / 돌비 애트모스", values: ["●"] },
            { label: "하이퍼 브라이트 부스터", values: ["-"] },
            { label: "버추얼 서라운드", values: ["11.1.2"] },
            { label: "운영체제", values: ["webOS 26"] },
            { label: "리모컨", values: ["AI 매직 리모컨 / 일반 리모컨", "※ 모델별 상이"] },
          ],
        },
      ],
    },
  ];
