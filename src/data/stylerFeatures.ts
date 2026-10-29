/** SC5GMR80S 공식 제품 페이지 기준. 카드 순서는 featureCardConfig.ts에서 관리합니다.
 * 출처: https://www.lge.co.kr/product/lg-styler/sc5gmr80s?modelId=MD10747827&pdpType=PURCHASE
 */
import type { Feature } from "@/data/features";
import steamVideo from "@/assets/styler-2026-13-truesteam-pc.mp4.asset.json";
import steamWebm from "@/assets/styler-2026-13-truesteam-pc.webm.asset.json";
import steamPoster from "@/assets/styler-2026-poster-13-truesteam-pc.jpg.asset.json";
import movingVideo from "@/assets/styler-2026-12-moving-hanger-pc.mp4.asset.json";
import movingWebm from "@/assets/styler-2026-12-moving-hanger-pc.webm.asset.json";
import movingPoster from "@/assets/styler-2026-poster-12-moving-hanger-pc.jpg.asset.json";
import hygieneVideo from "@/assets/styler-2026-03-steam-sterilization.mp4.asset.json";
import hygieneWebm from "@/assets/styler-2026-03-steam-sterilization.webm.asset.json";
import hygienePoster from "@/assets/styler-2026-poster-03-steam-sterilization.jpg.asset.json";
import aiStyleVideo from "@/assets/styler-2026-05-ai-styling-pc.mp4.asset.json";
import aiStyleWebm from "@/assets/styler-2026-05-ai-styling-pc.webm.asset.json";
import aiStylePoster from "@/assets/styler-2026-poster-05-ai-styling-pc.jpg.asset.json";
import aiDryVideo from "@/assets/styler-2026-06-ai-drying-pc.mp4.asset.json";
import aiDryWebm from "@/assets/styler-2026-06-ai-drying-pc.webm.asset.json";
import aiDryPoster from "@/assets/styler-2026-poster-06-ai-drying-pc.jpg.asset.json";
import steamerVideo from "@/assets/styler-2026-07-steamer-pc.mp4.asset.json";
import steamerWebm from "@/assets/styler-2026-07-steamer-pc.webm.asset.json";
import steamerPoster from "@/assets/styler-2026-poster-07-steamer-pc.jpg.asset.json";
import dehumidifyVideo from "@/assets/styler-2026-10-all-rounder-styler-03-pc.mp4.asset.json";
import dehumidifyWebm from "@/assets/styler-2026-10-all-rounder-styler-03-pc.webm.asset.json";
import dehumidifyPoster from "@/assets/styler-2026-poster-10-all-rounder-styler-03-pc.jpg.asset.json";
import ventVideo from "@/assets/styler-2026-15-auto-ventilation.mp4.asset.json";
import ventWebm from "@/assets/styler-2026-15-auto-ventilation.webm.asset.json";
import ventPoster from "@/assets/styler-2026-poster-15-auto-ventilation.jpg.asset.json";
import pantsVideo from "@/assets/styler-2026-16-pants-manager.mp4.asset.json";
import pantsWebm from "@/assets/styler-2026-16-pants-manager.webm.asset.json";
import pantsPoster from "@/assets/styler-2026-poster-16-pants-manager.jpg.asset.json";
import controlVideo from "@/assets/styler-2026-14-quick-control.mp4.asset.json";
import controlWebm from "@/assets/styler-2026-14-quick-control.webm.asset.json";
import controlPoster from "@/assets/styler-2026-poster-14-quick-control.jpg.asset.json";
import odorImage from "@/assets/styler-2026-04-deodorization.jpg.asset.json";
import steamModesImage from "@/assets/styler-2026-07-steamer-01.jpg.asset.json";
import steamWeightImage from "@/assets/styler-2026-07-steamer-02.jpg.asset.json";
import steamStorageImage from "@/assets/styler-2026-07-steamer-03.jpg.asset.json";
import designImage from "@/assets/styler-2026-18-design-01-pc.jpg.asset.json";

const aiNotices = [
  "AI 스타일링 / AI 건조 코스는 다이내믹 무빙행어의 동작 등 데이터로 의류 무게를 추론하는 과정에 AI 딥러닝 기술을 적용합니다.",
  "사전에 학습된 데이터를 기반으로 작동하며, 성능은 사용 환경과 조건에 따라 다를 수 있습니다.",
  "초기 표시 시간과 실제 동작 시간은 다를 수 있습니다.",
];
const mediaNotice = "소비자의 이해를 돕기 위해 연출된 영상 및 이미지이며, 제품별 색상 및 사양은 다를 수 있습니다. 사용 가능한 의류는 제품 매뉴얼을 확인해주세요.";
export const stylerFeatures: Feature[] = [
  {
    id: "1", tag: "듀얼히팅 트루스팀", icon: "Wind",
    title: "섬세한 옷감도\n집에서 관리할 수 있을까요?",
    subtitle: "두 개의 히터로 스팀을 조절해\n옷감에 맞춰 섬세하게 관리해드려요.",
    mediaType: "video", mediaUrl: steamWebm.url, fallbackUrl: steamVideo.url, posterImage: steamPoster.url,
    videoAspectRatio: "16/9", videoObjectFit: "contain",
    description: "듀얼히팅 트루스팀은 두 개의 히터로 옷에 따라 스팀을 섬세하게 조절해요. 일반 면 소재부터 실크, 캐시미어처럼 관리가 예민한 소재까지 옷감에 맞춰 케어할 수 있어요.",
    highlights: ["두 개의 히터", "3단계 스팀 조절", "옷감별 섬세한 관리", "트루스팀 케어"],
    disclaimers: [mediaNotice, "듀얼 히터 분리 구조로 스팀 분사량을 3단계로 조절합니다. 소재별 사용 가능 코스는 제품 매뉴얼을 확인해주세요."],
  },
  {
    id: "2", tag: "다이내믹 무빙행어", icon: "dress",
    title: "밖에서 묻은 먼지,\n어떻게 털어낼까요?",
    subtitle: "트위스트 방식의 다양한 모션으로\n옷에 묻은 먼지를 털어드려요.",
    mediaType: "video", mediaUrl: movingWebm.url, fallbackUrl: movingVideo.url, posterImage: movingPoster.url,
    videoAspectRatio: "16/9", videoObjectFit: "contain",
    description: "다이내믹 무빙행어가 코스에 따라 분당 최대 350회 움직이며 먼지를 털어내요. 옷감에 맞는 다양한 모션으로 여러 종류의 의류를 세심하게 관리할 수 있어요.",
    highlights: ["분당 최대 350회", "트위스트 무빙 모션", "옷감별 맞춤 움직임", "미세먼지 코스"],
    collapsibleDisclaimers: [{ title: "무빙행어 코스 안내", items: ["분당 350회 동작은 스타일링 강력 및 미세먼지 코스에 해당합니다.", mediaNotice] }],
  },
  {
    id: "3", tag: "스팀 살균 · 탈취", icon: "ShieldCheck",
    title: "매일 입는 옷,\n더 산뜻하게 관리할까요?",
    subtitle: "스팀 살균부터 생활 냄새 탈취까지\n옷을 위생적으로 관리할 수 있어요.",
    mediaType: "video", mediaUrl: hygieneWebm.url, fallbackUrl: hygieneVideo.url, posterImage: hygienePoster.url,
    videoAspectRatio: "16/9", videoObjectFit: "contain",
    description: "트루스팀을 활용한 스팀 살균 코스로 의류를 위생적으로 관리해요. 옷에 스며든 생활 냄새는 탈취 코스로 케어할 수 있어요.",
    highlights: ["트루스팀 살균", "생활 냄새 탈취", "의류 위생 관리", "코스별 맞춤 케어"],
    tabs: [
      { label: "스팀 살균", mediaType: "video", mediaUrl: hygieneWebm.url, fallbackUrl: hygieneVideo.url, posterImage: hygienePoster.url, videoAspectRatio: "16/9", videoObjectFit: "contain", description: "트루스팀을 활용한 스팀 살균 코스로 관리해요." },
      { label: "탈취", mediaType: "image", mediaUrl: odorImage.url, imageFit: "contain", description: "땀 냄새, 음식 냄새, 담배 냄새 등 옷에 스며든 생활 냄새를 탈취 코스로 관리해요." },
    ], showMainMedia: false,
    disclaimers: [mediaNotice, "살균·탈취 효과는 시험 대상, 시험 코스, 의류 소재와 사용 환경에 따라 달라질 수 있습니다. 상세 시험 조건은 LG 공식 제품 페이지를 확인해주세요."],
  },
  {
    id: "4", tag: "AI 스타일링", icon: "Cpu",
    title: "옷마다 다른 코스,\n고르기 번거로우셨나요?",
    subtitle: "AI가 의류 무게를 감지해\n무빙행어 동작과 스팀량을 조절해드려요.",
    mediaType: "video", mediaUrl: aiStyleWebm.url, fallbackUrl: aiStyleVideo.url, posterImage: aiStylePoster.url,
    videoAspectRatio: "16/9", videoObjectFit: "contain",
    description: "AI 스타일링 코스가 의류 무게를 감지해 알맞게 관리해요. 가벼운 셔츠부터 맨투맨, 재킷, 롱코트와 패딩까지 무게에 따라 무빙행어 동작과 스팀량을 조절해 코스 고민을 덜어드려요.",
    highlights: ["AI 의류 무게 감지", "3단계 맞춤 관리", "무빙행어 동작 조절", "스팀량 자동 조절"],
    collapsibleDisclaimers: [{ title: "AI 코스 안내", items: [...aiNotices, mediaNotice] }],
  },
  {
    id: "5", tag: "AI 건조", icon: "Shirt",
    title: "비에 젖은 옷,\n어떻게 말리면 좋을까요?",
    subtitle: "의류 무게에 맞춰 건조 시간을 설정해\n보송하게 관리해드려요.",
    mediaType: "video", mediaUrl: aiDryWebm.url, fallbackUrl: aiDryVideo.url, posterImage: aiDryPoster.url,
    videoAspectRatio: "16/9", videoObjectFit: "contain",
    description: "AI 건조 코스가 옷의 무게에 따라 건조 시간을 알아서 설정해요. 코스 종료 전 내부 온도를 감지해 완료 시점을 한 번 더 조절하니, 부분 세탁한 옷이나 비에 젖은 점퍼도 간편하게 건조할 수 있어요.",
    highlights: ["무게별 건조 시간", "내부 온도 감지", "완료 시점 조절", "건조와 구김 케어"],
    collapsibleDisclaimers: [{ title: "AI 코스 안내", items: [...aiNotices, mediaNotice] }],
  },
  {
    id: "6", tag: "빌트인 고압 스티머", icon: "Wind",
    title: "외출 직전 옷의 구김,\n빠르게 펴고 싶으신가요?",
    subtitle: "빌트인 고압 스티머로\n카라와 밑단까지 손쉽게 관리할 수 있어요.",
    mediaType: "video", mediaUrl: steamerWebm.url, fallbackUrl: steamerVideo.url, posterImage: steamerPoster.url,
    videoAspectRatio: "16/9", videoObjectFit: "contain",
    description: "약 3분 만에 예열되는 빌트인 고압 스티머로 잔주름, 뒤집힌 카라, 말린 밑단을 관리해요. 옷감과 구김 정도에 맞춰 스팀량을 3단계로 조절하고, 사용 후에는 본체의 내장 보관함에 간편하게 넣을 수 있어요.",
    highlights: ["약 3분 예열", "3단계 스팀 조절", "0.6kg 가벼운 무게", "본체 내장 보관함"],
    mediaGallery: [
      { url: steamModesImage.url, title: "3단계 스팀 조절", description: "소재와 구김 정도에 맞춰 강·중·약을 선택해요." },
      { url: steamWeightImage.url, title: "0.6kg 가벼운 무게", description: "가벼운 스티머로 손목 부담을 덜어줘요." },
      { url: steamStorageImage.url, title: "간편한 보관", description: "스타일러 본체의 내장 보관함에 넣어둘 수 있어요." },
    ],
    collapsibleDisclaimers: [{ title: "스티머 사용 안내", items: ["예열 시간은 공급되는 물의 온도와 외부 온도 등에 따라 다를 수 있습니다.", "무게는 자사 측정 결과이며, 제조 과정과 측정 환경에 따라 차이가 있을 수 있습니다.", mediaNotice] }],
  },
  {
    id: "7", tag: "이지핏 바지관리기", icon: "dress",
    title: "바지 구김은 줄이고,\n깔끔한 선은 살려볼까요?",
    subtitle: "바지를 당겨 눌러주는 관리로\n무릎 뒤까지 깔끔하게 정돈해드려요.",
    mediaType: "video", mediaUrl: pantsWebm.url, fallbackUrl: pantsVideo.url, posterImage: pantsPoster.url,
    videoAspectRatio: "16/9", videoObjectFit: "contain",
    description: "이지핏 바지관리기가 바지를 폴더 형태로 당겨 눌러줘요. 구김이 잘 생기는 무릎 뒤까지 관리해 바지의 선을 깔끔하게 살릴 수 있어요.",
    highlights: ["이지핏 바지관리", "바지 구김 케어", "무릎 뒤까지 관리", "깔끔한 바지 선"],
    disclaimers: [mediaNotice, "바지 관리 효과는 의류 소재와 사용 환경에 따라 다를 수 있습니다."],
  },
  {
    id: "8", tag: "실내 제습 · 자동 환기", icon: "Droplets",
    title: "옷도, 옷을 둔 공간도\n쾌적하게 관리할까요?",
    subtitle: "실내 제습과 자동 환기로\n공간과 의류를 산뜻하게 관리할 수 있어요.",
    mediaType: "video", mediaUrl: dehumidifyWebm.url, fallbackUrl: dehumidifyVideo.url, posterImage: dehumidifyPoster.url,
    description: "실내 제습 코스로 스타일러가 설치된 공간까지 쾌적하게 관리해요. 코스가 끝나면 자동 환기 시스템이 안팎의 공기를 순환시켜, 옷을 바로 꺼내지 않아도 눅눅해지는 걱정을 줄여줘요.",
    highlights: ["실내 제습 코스", "하루 최대 10L 제습", "코스 종료 후 환기", "안팎 공기 순환"],
    tabs: [
      { label: "실내 제습", mediaType: "video", mediaUrl: dehumidifyWebm.url, fallbackUrl: dehumidifyVideo.url, posterImage: dehumidifyPoster.url, videoAspectRatio: "16/9", videoObjectFit: "contain", description: "제습 버튼 하나로 스타일러가 설치된 공간까지 제습해요." },
      { label: "자동 환기", mediaType: "video", mediaUrl: ventWebm.url, fallbackUrl: ventVideo.url, posterImage: ventPoster.url, videoAspectRatio: "16/9", videoObjectFit: "contain", description: "코스가 끝나면 도어 위쪽 홀이 열려 안팎의 공기를 순환시켜요." },
    ], showMainMedia: false,
    collapsibleDisclaimers: [{ title: "제습 성능 · 자동 환기 안내", items: ["인터텍 시험, 공간 제습 코스, 시험 모델 SC5*******. 시험 조건은 기온 (27±5)℃, 습도 (65±10)% R.H.입니다.", "실내제습 코스로 1시간 운전 후 측정된 제습량을 24시간 연속 운전 기준으로 환산해 최대 10L를 확인한 결과입니다.", "실제 제습량은 사용 환경, 실내 온·습도와 운전 조건 등에 따라 달라질 수 있습니다.", "자동 환기 시 내부 습도는 외부 습도와 동등한 수준으로 유지됩니다.", mediaNotice] }],
  },
  {
    id: "9", tag: "퀵 컨트롤 · 오브제 디자인", icon: "Palette",
    title: "매일 쓰는 스타일러,\n더 편리하게 만나볼까요?",
    subtitle: "도어의 LCD 화면으로 코스를 고르고\n공간에 어울리는 디자인을 만나볼 수 있어요.",
    mediaType: "image", mediaUrl: designImage.url, imageFit: "contain",
    description: "도어의 LCD 화면에서 41개 코스를 쉽게 찾고, 사용 빈도에 따라 자동 정렬할 수 있어요. 의류 5벌과 바지 1벌을 관리하는 스타일러를 공간에 어울리는 오브제 디자인으로 만나보세요.",
    highlights: ["도어 LCD 화면", "41개 코스 선택", "사용 빈도별 정렬", "5벌 + 바지 1벌"],
    tabs: [
      { label: "퀵 컨트롤", mediaType: "video", mediaUrl: controlWebm.url, fallbackUrl: controlVideo.url, posterImage: controlPoster.url, videoAspectRatio: "16/9", videoObjectFit: "contain", description: "LCD 화면에서 코스를 고르고 자주 쓰는 코스부터 볼 수 있어요." },
      { label: "오브제 디자인", mediaType: "image", mediaUrl: designImage.url, imageFit: "contain", description: "공간에 자연스럽게 어우러지는 디자인을 확인해보세요." },
    ], showMainMedia: false,
    disclaimers: ["코스 자동 정렬 기능은 설정 목록에서 켜짐 또는 꺼짐을 선택할 수 있습니다.", mediaNotice],
  },
];
