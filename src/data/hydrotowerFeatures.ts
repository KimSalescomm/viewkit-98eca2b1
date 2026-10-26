import type { Feature } from "@/data/features";
import m7Compare from "@/assets/airpurifier-m7-chart.jpg.asset.json";
import hydrotowerMaxCompare from "@/assets/hydrotower-max-chart.jpg.asset.json";
import hydrotowerCompare from "@/assets/hydrotower-chart.jpg.asset.json";
import spaceAiVideo from "@/assets/hydrotower-space-ai-humidification.mp4.asset.json";
import spaceAiWebm from "@/assets/hydrotower-space-ai-humidification.webm.asset.json";
import spaceAiPoster from "@/assets/hydrotower-space-ai-humidification-poster.jpg.asset.json";
import purifiedVideo from "@/assets/hydrotower-purified-humidification.mp4.asset.json";
import purifiedWebm from "@/assets/hydrotower-purified-humidification.webm.asset.json";
import purifiedPoster from "@/assets/hydrotower-purified-humidification-poster.jpg.asset.json";
import recoveryVideo from "@/assets/hydrotower-residual-water-recovery.mp4.asset.json";
import recoveryWebm from "@/assets/hydrotower-residual-water-recovery.webm.asset.json";
import recoveryPoster from "@/assets/hydrotower-residual-water-recovery-poster.jpg.asset.json";
import dryingVideo from "@/assets/hydrotower-air-path-drying.mp4.asset.json";
import dryingWebm from "@/assets/hydrotower-air-path-drying.webm.asset.json";
import dryingPoster from "@/assets/hydrotower-air-path-drying-poster.jpg.asset.json";
import filter from "@/assets/hydrotower-filter.jpg.asset.json";
import care from "@/assets/hydrotower-care.png.asset.json";
import disassemblyCare from "@/assets/hydrotower-care-01-disassembly-care.png.asset.json";
import steamCare from "@/assets/hydrotower-care-02-steam-hygiene-care.png.asset.json";
import uvCare from "@/assets/hydrotower-care-03-uv-hygiene-care.png.asset.json";
import waterFilterCare from "@/assets/hydrotower-care-04-water-filter-replacement.png.asset.json";
import airFilterCare from "@/assets/hydrotower-care-05-air-filter-replacement.png.asset.json";
import tankCare from "@/assets/hydrotower-care-06-water-tank-mist-case-cleaning.png.asset.json";
import supplyCare from "@/assets/hydrotower-care-07-water-supply-cleaning.png.asset.json";

// Source: LG HY856RSAAP (MD10919831) official product page, checked 2026-10-20.
// Video-led official visuals are stored as still frames for reliable kiosk playback.
const imageNote =
  "소비자의 이해를 돕기 위해 연출 또는 AI로 생성·보정한 이미지이며, 실제 제품 및 사용 환경과 다를 수 있습니다. 제품별 색상 및 스펙은 다를 수 있습니다.";
const environmentNote = "시험 결과는 특정 시험 조건에서 측정한 것으로 실제 사용 환경에 따라 달라질 수 있습니다.";

export const hydrotowerFeatures: Feature[] = [
  {
    id: "1",
    title: "하이드로타워 구독하면\n 무엇이 좋을까요?",
    subtitle: "전문가의 케어로\n깨끗하게 오래 사용할 수 있어요.",
    icon: "ShieldCheck",
    tag: "가전 구독",
    mediaType: "image",
    mediaUrl: care.url,
    imageFit: "original",
    fullWidthMedia: true,
    description:
      "하이드로타워 Max 프리미엄 구독은 전문가의 분해·스팀·UV 케어부터 정수 필터와 공기청정 필터 교체, 물통과 급수부 청소까지 제공해요. 계약기간 내 무상 A/S로 제품 관리 부담을 덜어드려요.",
    highlights: ["분해·스팀·UV 케어", "정기적인 필터 교체", "물통·급수부 클리닝", "계약기간 내 무상 A/S"],
    subscriptionServiceItems: [
      { label: "분해 케어", imageUrl: disassemblyCare.url, description: "전문가가 제품을 분해해 내부를 관리해요." },
      { label: "스팀 케어", imageUrl: steamCare.url, description: "스팀으로 위생 관리를 도와드려요." },
      { label: "UV 케어", imageUrl: uvCare.url, description: "UV 케어로 한 번 더 위생을 챙겨드려요." },
      { label: "정수 필터 교체", imageUrl: waterFilterCare.url, description: "교체 주기에 맞춰 정수 필터를 교체해요." },
      {
        label: "공기청정 필터 교체",
        imageUrl: airFilterCare.url,
        description: "공기청정 성능 유지를 위해 필터를 교체해요.",
      },
      {
        label: "물통·미스트 케이스 클리닝",
        imageUrl: tankCare.url,
        description: "물통과 미스트 케이스를 깨끗하게 관리해요.",
      },
      { label: "급수부 클리닝", imageUrl: supplyCare.url, description: "물을 공급하는 급수부를 청소해요." },
    ],
    disclaimers: [
      "하이드로타워 Max 프리미엄 구독 서비스 기준입니다. 서비스 구성·방문 주기·소모품 교체 주기는 계약 조건에 따라 달라질 수 있습니다.",
      "무상 A/S는 가전 구독 고객에 한하며, 고객 과실로 인한 제품 고장은 제외됩니다.",
      "상세한 제공 항목은 LG 공식 구독 서비스 및 계약 내용을 확인해 주세요.",
    ],
  },
  {
    id: "2",
    title: "공간 전체를\n고르게 가습할 수 있을까요?",
    subtitle: "공간의 크기와 온도를 판단해\nAI가습이 쾌적한 습도로 맞춰드려요.",
    icon: "Cpu",
    tag: "공간 맞춤 AI가습",
    mediaType: "video",
    mediaUrl: spaceAiVideo.url,
    fallbackUrl: spaceAiWebm.url,
    posterImage: spaceAiPoster.url,
    fullWidthMedia: true,
    description:
      "공간 맞춤 AI가습은 공간의 크기와 실내 온도를 판단해 목표 습도와 가습 속도를 조절해요. 공간 조건에 맞춰 습도를 유지하고, 실내에 고르게 가습할 수 있도록 도와드려요.",
    highlights: ["공간 크기 판단", "온도별 적정 습도", "가습 속도 자동 조절", "균일한 습도 유지"],
    disclaimers: [
      imageNote,
      "제품이 감지 가능한 정보와 설정 조건에 따라 작동하며, 실제 사용 환경에 따라 달라질 수 있습니다.",
    ],
    collapsibleDisclaimers: [
      {
        title: "AI가습 시험 조건",
        items: [
          "온도별 적정 습도: 2026.08.14 LG 스마트파크2, HY85 시리즈, 초기 21℃·상대습도 40%·80㎥ 챔버에서 시험. 실내 온도 20~30℃ 변화에 따라 적정 습도 65~45% 내 맞춤 조절.",
          "공간 크기 예측: 2026.07.22 와이즈스톤, HY85 시리즈, AI가습 80분 실환경 평가 데이터 기반 시험.",
          "균일 습도: 2026.08.11 자사 시험, 57.8㎡·층고 2.4m·초기 23±1℃·45±5% 환경에서 포근가습 터보 운전 3시간 기준.",
          environmentNote,
        ],
      },
    ],
  },
  {
    id: "3",
    title: "가습에 쓰이는 물까지 \n깨끗하게 만들어준다고요?",
    subtitle: "정수 필터링부터 살균·청정 건조까지\n4단계로 정수 가습 기술로 위생적이에요.",
    icon: "ShieldCheck",
    tag: "4단계 정수 가습",
    mediaType: "video",
    mediaUrl: purifiedVideo.url,
    fallbackUrl: purifiedWebm.url,
    posterImage: purifiedPoster.url,
    fullWidthMedia: true,
    description:
      "정수 필터로 스케일 원인 물질을 걸러내고, 100℃ 고온으로 가습수를 살균해요. 공기청정 필터를 거친 청정 바람에 가습을 실어 보내고, 사용 후에는 내부 물길까지 청정 건조해요.",
    highlights: ["정수 필터링", "100℃ 가습수 살균", "청정 바람으로 가습", "사용 후 청정 건조"],
    disclaimers: [
      imageNote,
      "가습용 정수 기능은 마시는 물을 정수하는 기능과 차이가 있습니다.",
      "100℃는 가습수 살균 시 가열 온도이며, 분사되는 가습무의 온도를 의미하지 않습니다.",
      environmentNote,
    ],
    collapsibleDisclaimers: [
      {
        title: "정수·살균 성능 시험 조건",
        items: [
          "스케일 원인 물질: 2024.10 KOTITI, 정수필터 ABQ30077301. 수돗물 경도 물질의 초기 농도와 필터 통과 후 농도를 비교해 99.99% 초과 제거 확인.",
          "정수 성능: 2024.10 KCL, ABQ30077301. 환경부고시 제2021-157호 기준 유리잔류염소·경도 제거율 100%, 용출안전성 기준 적합.",
          "가습수 살균: 2026.08.10 KOTITI, HY85 시리즈, 20±5℃·50±10% 환경. 황색포도상구균·폐렴간균·녹농균 배양액 투입 후 가습수 살균 동작 종료 시 공급수 균수 비교, 99.999% 제거.",
          environmentNote,
        ],
      },
    ],
  },
  {
    id: "4",
    title: "가습이 끝난 뒤,\n남은 물기가 걱정되시나요?",
    subtitle: "가습이 끝난 뒤에도\n남은 물기 걱정 없이 깨끗하게 관리해요.",
    icon: "Sparkles",
    tag: "자동 위생 관리",
    mediaType: "video",
    mediaUrl: recoveryVideo.url,
    fallbackUrl: recoveryWebm.url,
    posterImage: recoveryPoster.url,
    fullWidthMedia: true,
    tabs: [
      {
        label: "남아 있는 물까지 회수",
        mediaType: "video",
        mediaUrl: recoveryVideo.url,
        fallbackUrl: recoveryWebm.url,
        posterImage: recoveryPoster.url,
        videoAspectRatio: "16/9",
        videoObjectFit: "contain",
        description:
          "가습이 끝나면 내부에 남은 물을 자동으로 회수하고, 다음에 사용할 때 100℃로 재가열해 깨끗한 물이 분사될 수 있도록 관리해요.",
      },
      {
        label: "물이 지나가는 길까지 건조",
        mediaType: "video",
        mediaUrl: dryingVideo.url,
        fallbackUrl: dryingWebm.url,
        posterImage: dryingPoster.url,
        videoAspectRatio: "16/9",
        videoObjectFit: "contain",
        description:
          "가습이 끝나면 물이 지나간 길을 청정바람으로 말끔하게 건조해요. 남은 물기가 1g 미만이 될 때까지 말려 물때와 냄새가 생기는 것을 예방해 줍니다.",
      },
    ],
    description:
      "가습 종료 시 내부에 남은 물을 가열 수조로 회수하고, 다시 가습을 시작할 때 재가열해요. 청정 건조는 내부 가습길의 물기를 말려 물때와 냄새 발생을 줄이도록 도와드려요.",
    highlights: ["사용 후 남은 물 회수", "100℃ 재가열", "내부 물길 청정 건조", "가습기 위생 관리"],
    disclaimers: [
      imageNote,
      "자동 위생 관리가 정기적인 물통·부품 청소 및 필터 교체를 대신하지는 않습니다. 제품 사용설명서의 관리 방법을 따라주세요.",
      "LG ThinQ 사용 시 앱 설치와 Wi-Fi 연결이 필요합니다.",
      environmentNote,
    ],
    collapsibleDisclaimers: [
      {
        title: "잔수 회수·청정 건조 시험 조건",
        items: [
          "잔수 회수: 2026.09.15 LG 스마트파크2, HY85 시리즈, 20±5℃·50±10%, 포근가습 강 6시간 가동 후 종료. 회수 완료 후 잔수 31cc 미만.",
          "유로 건조: 2026.09.15 LG 스마트파크2, 23.5±1℃·50±3%, 포근가습 강풍 6시간 후 청정 건조. 섬세모드 4시간 이내 건조중량 대비 중량 변화 1g 이내.",
          environmentNote,
        ],
      },
    ],
  },
  {
    id: "5",
    title: "공기 청정 성능도\n 좋은가요?",
    subtitle: "360˚ 탈취청정 V2 필터로\n먼지와 유해가스까지 제거해요.",
    icon: "Wind",
    tag: "360˚ 탈취청정 V2",
    mediaType: "image",
    mediaUrl: filter.url,
    imageFit: "contain",
    fullWidthMedia: false,
    description:
      "360˚ 탈취청정 V2 필터가 공기 중에 떠다니는 세균, 곰팡이를 99.9%, 바이러스는 98% 제거해요. \n 눈에 보이지 않는 미세먼지부터 불쾌한 생활 냄새의 원인인 3대 유해가스까지 업애 공기를 쾌적하게 지켜줘요.",
    highlights: ["청정면적 66㎡", "세균, 곰팡이 99.9% 제거,", "바이러스는 98% 제거", "3대 유해가스 제거"],
    disclaimers: [
      imageNote,
      "공기청정 성능은 공기청정 모드 기준이며, 운전 모드 및 실제 사용 환경에 따라 달라질 수 있습니다.",
    ],
    collapsibleDisclaimers: [
      {
        title: "필터 성능 시험 조건",
        items: [
          "0.01㎛ 극초미세먼지: 2026.08.14 KCL, HY85 시리즈, 30㎥ 챔버·23±3℃·50±10%, 공기청정 터보 운전. KCl 입자 기준 46분 이상 가동 시 99.999% 제거.",
          "유해가스: 2026.08.06~13 광주 KETI, HY85 시리즈, 8㎥ 챔버에서 한국공기청정협회 시험 표준에 따라 평가. 톨루엔·포름알데하이드·암모니아 정화능력 평균 90% 이상.",
          environmentNote,
        ],
      },
    ],
  },
  {
    id: "6",
    title: "우리집엔 어떤\n에어케어 제품이 맞을까?",
    subtitle: "하이드로타워 Max, 하이드로타워, 360˚공기청정기 M7의\n차이를 한눈에 비교해보세요.",
    icon: "Search",
    tag: "라인업 비교",
    mediaType: "table",
    mediaUrl: hydrotowerMaxCompare.url,
    description: "",
    highlights: [],
    tableData: [
      {
        name: "하이드로타워 Max",
        category: "가습 공기청정기",
        imageUrl: hydrotowerMaxCompare.url,
        best: true,
        specs: [
          { label: "대표 모델명", values: ["HY856RNAA"] },
          {
            label: "추천 상황",
            values: ["넓은 거실부터 침실까지", "공기청정과 가습을 함께 관리하고 싶은 경우"],
          },
          { label: "색상", values: ["네오 실버", "카밍 베이지"] },
          { label: "최대 가습량", values: ["850 cc/hr"], highlighted: true },
          { label: "청정 사용 면적", values: ["66.0㎡"] },
          { label: "물통 (용량/만수용량)", values: ["5.1 / 4.5 L"] },
          { label: "가습모드", values: ["AI가습", "일반가습", "포근가습", "가습청정", "공기청정"], highlighted: true },
          { label: "AI 인증", values: ["공간 맞춤 AI가습"] },
          { label: "필터", values: ["360 탈취청정 V2"] },
          { label: "무드등", values: ["테마무드 3종 + 컬러 12종"], highlighted: true },
          { label: "에너지소비효율등급", values: ["3등급"] },
          { label: "이동성", values: ["히든휠 내장"], highlighted: true },
          { label: "무게 (kg)", values: ["21.2"], compact: true },
          { label: "크기 (mm)", hint: "가로 × 높이 × 깊이", values: ["388(310) × 1,088 × 388(310)"], compact: true },
        ],
      },
      {
        name: "하이드로타워",
        category: "정수 가습기",
        imageUrl: hydrotowerCompare.url,
        specs: [
          { label: "대표 모델명", values: ["HY706RSUA"] },
          {
            label: "추천 상황",
            values: ["침실이나 안방 등에서", "깨끗한 물로 습도를 관리하고 싶은 경우"],
          },
          { label: "색상", values: ["카밍 베이지", "에센스 화이트"] },
          { label: "최대 가습량", values: ["700 cc/hr"] },
          { label: "청정 사용 면적", values: ["16.6㎡"] },
          { label: "물통 (용량/만수용량)", values: ["5.1 / 4.5 L"] },
          { label: "가습모드", values: ["가습", "포근가습", "가습청정", "공기청정"] },
          { label: "AI 인증", values: ["미지원"] },
          { label: "필터", values: ["에어로 퓨리청정 V"] },
          { label: "무드등", values: ["컬러 12종"] },
          { label: "에너지소비효율등급", values: ["3등급"] },
          { label: "이동성", values: ["무빙휠 (별매)"] },
          { label: "무게 (kg)", values: ["18.7"], highlighted: true, compact: true },
          { label: "크기 (mm)", hint: "가로 × 높이 × 깊이", values: ["310 × 986 × 310"], compact: true },
        ],
      },
      {
        name: "AI 360˚ 공기청정기 M7",
        category: "공기청정기",
        imageUrl: m7Compare.url,
        specs: [
          { label: "대표 모델명", values: ["AS356NSMA"] },
          {
            label: "추천 상황",
            values: ["넓은 거실 등에서", "미세먼지와 유해가스까지 관리하고 싶은 경우"],
          },
          { label: "색상", values: ["카밍 베이지", "네이처 그린"] },
          { label: "최대 가습량", values: ["미지원"] },
          { label: "청정 사용 면적", values: ["114.0㎡"], highlighted: true },
          { label: "물통 (용량/만수용량)", values: ["미지원"] },
          { label: "가습모드", values: ["미지원"] },
          { label: "AI 인증", values: ["AI 공기질 센서", "AI 맞춤 운전"] },
          { label: "필터", values: ["360 강력탈취청정 M7"] },
          { label: "무드등", values: ["미지원"] },
          { label: "에너지소비효율등급", values: ["2등급"], highlighted: true },
          { label: "이동성", values: ["무빙휠 (별매)"] },
          { label: "무게 (kg)", values: ["20.6"], compact: true },
          { label: "크기 (mm)", hint: "가로 × 높이 × 깊이", values: ["377 × 1,100 × 377"], compact: true },
        ],
      },
    ],
  },
];
