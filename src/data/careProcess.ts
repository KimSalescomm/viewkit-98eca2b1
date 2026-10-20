// 케어 프로세스형 상세 섹션 데이터 (제품별 재사용 구조)
// 케어 항목 개수·순서·콘텐츠는 제품마다 달라질 수 있으며, 이 파일에서만 관리합니다.
import disassemblyCare from "@/assets/hydrotower-care-01-disassembly-care.png.asset.json";
import steamCare from "@/assets/hydrotower-care-02-steam-hygiene-care.png.asset.json";
import uvCare from "@/assets/hydrotower-care-03-uv-hygiene-care.png.asset.json";
import waterFilterCare from "@/assets/hydrotower-care-04-water-filter-replacement.png.asset.json";
import airFilterCare from "@/assets/hydrotower-care-05-air-filter-replacement.png.asset.json";
import tankCare from "@/assets/hydrotower-care-06-water-tank-mist-case-cleaning.png.asset.json";
import supplyCare from "@/assets/hydrotower-care-07-water-supply-cleaning.png.asset.json";

export type CareMediaType = "image" | "video";

export interface CareServiceStep {
  careServiceId: string;
  careServiceName: string;
  displayOrder: number;
  benefitText: string;
  description: string;
  representativeImageUrl: string;
  detailImageUrls?: string[];
  /** 케어별 개별 영상. 없으면 commonVideoUrl 사용 */
  videoUrl?: string;
  careCycle?: string;
  disclaimer?: string;
}

export interface CareProcessPlan {
  productId: string;
  productName: string;
  planId: string;
  title: string;
  subtitle: string;
  commonVideoUrl?: string;
  defaultMediaType: CareMediaType;
  careServices: CareServiceStep[];
  /** Aviso sanfonado (clique para abrir) ao final da seção */
  disclaimers?: { title: string; text: string };
}

export const careProcessPlans: Record<string, CareProcessPlan> = {
  hydrotower: {
    productId: "hydrotower",
    productName: "LG 퓨리케어 AI 오브제컬렉션 하이드로타워 Max",
    planId: "hydrotower-max-premium",
    title: "하이드로타워 Max 케어 서비스",
    subtitle: "전문가가 직접 관리하는 케어서비스를 확인해 보세요.",
    commonVideoUrl:
      "https://www.lge.co.kr/kr/images/common/pdp-subscribe-careship/images/humidifying-air-purifier/subscription-hydro-tower-max.mp4",
    defaultMediaType: "image",
    careServices: [
      {
        careServiceId: "disassembly",
        careServiceName: "분해 케어",
        displayOrder: 1,
        benefitText: "분해 케어(완전 분해)",
        description: "가습부, 공기청정부, 케이스 등 완전분해",
        representativeImageUrl: disassemblyCare.url,
      },
      {
        careServiceId: "steam",
        careServiceName: "위생 케어(스팀)",
        displayOrder: 2,
        benefitText: "위생 케어(스팀)",
        description: "스팀 살균으로 세균 99.999% 제거",
        representativeImageUrl: steamCare.url,
      },
      {
        careServiceId: "uv",
        careServiceName: "위생 케어(UV)",
        displayOrder: 3,
        benefitText: "위생 케어(UV)",
        description: "UV살균으로 눈에 보이지 않는 세균까지 위생적으로 케어",
        representativeImageUrl: uvCare.url,
      },
      {
        careServiceId: "water-filter",
        careServiceName: "정수필터 교체",
        displayOrder: 4,
        benefitText: "정수필터 교체",
        description: "고객 선택 주기에 정수필터 무상 교체",
        representativeImageUrl: waterFilterCare.url,
      },
      {
        careServiceId: "air-filter",
        careServiceName: "공기청정필터 교체",
        displayOrder: 5,
        benefitText: "공기청정필터 교체",
        description: "12개월마다 공기청정필터 무상 교체",
        representativeImageUrl: airFilterCare.url,
      },
      {
        careServiceId: "humidifier-cleaning",
        careServiceName: "가습부 클리닝",
        displayOrder: 6,
        benefitText: "가습부 클리닝",
        description: "물통, 커버, 미스트케이스 등 가습부 습/건식 클리닝",
        representativeImageUrl: tankCare.url,
      },
      {
        careServiceId: "supply-cleaning",
        careServiceName: "급수부 클리닝",
        displayOrder: 7,
        benefitText: "급수부 클리닝",
        description: "진동자 잔수제거, 급수부 건식 클리닝",
        representativeImageUrl: supplyCare.url,
      },
    ],
    disclaimers: {
      title: "구독 세부 정보",
      text: `케어서비스는 제품 · 모델 및 구독 유형, 가입 시점, 방문 주기 등에 따라 제공 대상과 내용, 제공 주기가 상이할 수 있습니다.

[분해 케어(완전 분해)] 상단 가습부는 토출구 및 케이스 분해, 하단 공청부는 팬까지 분해하여 생활오염을 케어합니다.
[분해 케어(완전 분해)] 프리미엄 케어서비스에 한하여 분해 케어(완전 분해)를 36개월 차에 1회 제공해 드립니다.

[위생 케어(스팀)] 진동자, 내부팬, 주요부품을 스티머로 클리닝합니다.
[위생 케어(스팀)] 해당 서비스는 36개월 차에 1회 제공됩니다.
[위생 케어(스팀)] 세균 99.999% 제거
시험일시: '26년 7월 6일
시험기관: KTR한국화학융합시험연구원
시험대상: 케어에 사용하는 스팀살균기기 (JC-2500, JC-7000)
시험방법: 직경 30 mm의 SUS304 스테인리스 스틸 담체를 사용하여 스팀분사구로부터 5 cm 거리에서 60초간 작동 후 초기값과 비교하여 저감률을 계산함
시험결과: 대장균, 황색포도상구균 99.999% 제거
상기 살균 기능은 고열 스팀을 이용한 비화학적 작용에 의한 결과입니다.
국내 공인기관의 시험 결과로 실 사용 환경에 따라 다를 수 있습니다.

[위생 케어(UV)] UV살균으로 눈에 보이지 않는 세균까지 위생적으로 케어합니다.
[위생 케어(UV)] 해당 서비스는 36개월 차에 1회 제공됩니다.
[위생 케어(UV)] 세균 99.9% 제거
시험일시: '26년 7월 6일
시험기관: KTR한국화학융합시험연구원
시험대상: 케어에 사용하는 UV살균기기 (퓨어라이트XD-2D04)
시험방법: 직경 30 mm의 SUS304 스테인리스 스틸 담체를 사용하여 UV 기기로부터 10 cm 거리에서 10초간 작동 후 초기값과 비교하여 저감률을 계산함
시험결과: 대장균, 황색포도상구균 99.9% 제거
상기 살균 기능은 UV 살균을 이용한 비화학적 작용에 의한 결과입니다.
국내 공인기관의 시험 결과로 실 사용 환경에 따라 다를 수 있습니다.

[정수필터 교체] 정수필터 교체 주기는 1일 8시간 포근가습 사용 기준 TDS 일반 2~6개월, TDS 고농도 1~3개월입니다.
[정수필터 교체] 정수필터의 교체 주기는 제품 사용 모드, 사용 시간에 따라 달라질 수 있으며, 수돗물의 TDS가 높을 경우 걸러주는 물질의 양이 많아져 수명이 짧아질 수 있습니다(TDS: 물 속 미네랄 등 작은 입자량)
[정수필터 교체] 정수필터 교체 주기는 3/6/12개월 중 고객이 선택한 주기에 따라 제공됩니다.
[정수필터 교체] 방문 관리는 사전 안내드리고 있으며, 고객 요청에 의해 협의된 일정으로 변경하실 수 있습니다.

[공기청정필터 교체] 공기청정필터는 12개월마다 교체, 극세필터는 방문 주기마다 교체합니다.
[공기청정필터 교체] 교체 주기는 필터 및 제품에 따라 달라질 수 있습니다.
[공기청정필터 교체] 방문 관리는 사전 안내드리고 있으며, 고객 요청에 의해 협의된 일정으로 변경하실 수 있습니다.`,
    },
  },
};

export const getCareProcessPlan = (productId: string): CareProcessPlan | undefined => careProcessPlans[productId];
