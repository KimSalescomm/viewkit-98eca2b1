import type { Feature } from "@/data/features";
import ai from "@/assets/hydrotower-ai.jpg.asset.json";
import purified from "@/assets/hydrotower-purified.jpg.asset.json";
import drying from "@/assets/hydrotower-drying.jpg.asset.json";
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
    title: "하이드로타워 구독하면 무엇이 좋을까요?",
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
      "무상 A/S는 가전구독 고객에 한하며, 고객 과실로 인한 제품 고장은 제외됩니다.",
      "상세한 제공 항목은 LG 공식 구독 서비스 및 계약 내용을 확인해 주세요.",
    ],
  },
  {
    id: "2",
    title: "우리 집에 맞는 습도,\n매번 조절하기 번거로우신가요?",
    subtitle: "공간의 크기와 온도를 판단해\nAI가습이 적정 습도로 맞춰드려요.",
    icon: "Cpu",
    tag: "공간 맞춤 AI가습",
    mediaType: "image",
    mediaUrl: ai.url,
    imageFit: "original",
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
    title: "가습에 쓰는 물,\n깨끗하게 관리되고 있을까요?",
    subtitle: "정수 필터링부터 살균·청정 건조까지\n4단계로 가습 위생을 챙겨드려요.",
    icon: "ShieldCheck",
    tag: "4단계 정수 가습",
    mediaType: "image",
    mediaUrl: purified.url,
    imageFit: "original",
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
    subtitle: "남은 물을 회수하고 내부 물길을 말려\n사용 후 위생까지 관리해드려요.",
    icon: "Sparkles",
    tag: "자동 위생 관리",
    mediaType: "image",
    mediaUrl: drying.url,
    imageFit: "original",
    fullWidthMedia: true,
    description:
      "가습 종료 시 내부에 남은 물을 가열 수조로 회수하고, 다시 가습을 시작할 때 재가열해요. 청정 건조는 내부 가습길의 물기를 말려 물때와 냄새 발생을 줄이도록 도와드려요.",
    highlights: ["종료 후 잔수 회수", "재시작 시 재가열", "내부 물길 청정 건조", "건조 모드 4가지"],
    subFeatures: [
      {
        label: "잔수 회수",
        title: "남은 물을 다시 가열 수조로",
        description: "가습 종료 후 잔수를 회수하고, 다음 가습 시작 시 100℃로 재가열해요.",
      },
      {
        label: "청정 건조",
        title: "생활에 맞춰 건조 모드 선택",
        description:
          "쾌속·집중·섬세·조용 중 선택할 수 있으며, 모드에 따라 2~4시간 동안 내부를 건조해요. 리모컨 또는 LG ThinQ 앱에서 설정할 수 있어요.",
      },
    ],
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
    title: "가습뿐 아니라,\n먼지와 생활 냄새도 고민이신가요?",
    subtitle: "360˚ 탈취청정 V2 필터로\n넓은 공간의 공기까지 케어해드려요.",
    icon: "Wind",
    tag: "360˚ 탈취청정 V2",
    mediaType: "image",
    mediaUrl: filter.url,
    imageFit: "original",
    fullWidthMedia: true,
    description:
      "교체형 극세필터로 큰 먼지를, 집진 필터로 미세먼지를, 탈취 필터로 생활 냄새의 원인이 되는 유해가스를 걸러줘요. 청정면적 66㎡의 공기청정 성능과 청정 표시 라이팅으로 실내 공기 상태를 확인할 수 있어요.",
    highlights: ["청정면적 66㎡", "큰 먼지·미세먼지 케어", "생활 냄새·유해가스 케어", "공기 상태 라이팅"],
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
];
