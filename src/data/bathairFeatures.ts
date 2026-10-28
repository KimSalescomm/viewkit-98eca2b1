/**
 * bathair 제품 카드·상세 문구 편집 파일.
 * title: 질문형 제목 / subtitle: 부제 / tag: 기능명 / description: 상세 설명
 * highlights: 핵심만 쏙 / tabs: 탭별 내용 / disclaimers: 유의사항
 * 문구만 수정할 때 id는 변경하지 마세요. 카드 순서는 featureCardConfig.ts에서 관리합니다.
 */
import type { Feature } from "@/data/features";
import { bathairLineupFeatures } from "@/data/bathairLineupFeatures";

export const bathairFeatures: Feature[] = [
    ...bathairLineupFeatures,
    {
      id: "1",
      title: "듀얼배기, 무엇이 좋을까요?",
      subtitle: "바스에어시스템과 배기팬이 함께 작동해\n 습기와 냄새를 빠르게 없애줘요.",
      icon: "Wind",
      tag: "듀얼 배기",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/usp_dcr/Bath%20Air%20System/new/MX0120BASV_160CMH_pc.jpg",
      fullWidthMedia: true,
      imageFit: "original",
      description:
        "강력한 듀얼배기로 욕실의 습기를 단 16분 만에 60%까지 낮춰요, 최대 풍량 160CMH로 빠르게 습기를 제거해 금방 보송해져요.",
      highlights: [],

      mediaDisclaimers: [
        "소비자의 이해를 돕기 위해 연출된 이미지이며, 제품별 색상 및 스펙은 다를 수 있습니다.",
        "듀얼배기 기능은 ‘프리미엄 듀얼’ 구입 시 이용가능합니다.",
        "모델, 운전모드 및 실사용 환경에 따라 결과는 다를 수 있습니다.",
      ],
      mediaCollapsibleDisclaimers: [
        {
          title: "[듀얼배기]",
          items: [
            "시험 일시: 25. 12. 24",
            "시험 기관: LG 전자 자체 시험",
            "시험 대상: MX0120BAS*, M-X0120BAS*",
            "시험 방법: LG전자 실험 챔버(W*D*H(m): 2.3x2.7x2.2)",
            "프리미엄듀얼(MX0120BAS*): 풍량 160CMH, 외부온도 21℃, 외부 상대습도 40%, 실내 챔버 온도 21℃",
            "프리미엄(M-X0120BAS*): 풍량 120CMH, 외부온도 21℃, 외부 습도 40%, 실내 챔버 온도 21℃ 실내 챔버 RH습도 90% → 습도 60% 도달시간",
            "시험 결과: 챔버 RH습도 90% → 60% 도달시간 프리미엄듀얼(MX0120BAS*) 16분, 프리미엄(M-X0120BAS*) 22분",
          ],
        },
      ],
    },
    {
      id: "2",
      title: "사계절 내내 욕실이 쾌적할 수 있는 이유!",
      subtitle: "겨울엔 따뜻한 온풍으로, 여름엔 시원한 송풍으로 편안한 욕실 환경을 경험해보세요",
      icon: "Flame",
      tag: "웜 & 프레시케어",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/usp_dcr/Bath%20Air%20System/new/MX0120BASV_WarmNFresh_pc.jpg",
      fullWidthMedia: true,
      description:
        "욕실의 온도와 습도를 자동으로 감지해 알아서 작동하는 공간케어와\n물기 없이 산뜻하게 말려주는 바디케어까지,\n쾌적한 공간을 만들어줘요.",
      highlights: [],
      mediaDisclaimers: [
        "소비자의 이해를 돕기 위해 연출된 영상 및 이미지이며, 제품별 색상 및 스펙은 다를 수 있습니다.",
        "온풍 / 송풍 / 공간케어 / 바디케어",
      ],
      mediaCollapsibleDisclaimers: [
        {
          title: "[온풍]",
          items: [
            "LG ThinQ 앱을 통한 온풍 기능의 원격 제어는 고온 작동에 대한 안전 확보를 위해, 국내외 안전기준에 따라 지원되지 않습니다.",
            "온풍 성능 보증 범위: 실내공간 10℃ ~ 40℃",
            "시험 일시: 25.12.26",
            "시험 기관: LG 전자 자체 시험",
            "시험 대상: M-X0120BAS*",
            "시험 방법: LG전자 실험 챔버(W*D*H(m): 2.3x2.7x2.2) / 풍량 90CMH, 히터 on, 외부온도 19.5℃, 상대 습도 40%, 실내 챔버 온도 19.5℃ / 30분 운전 후 제품 취출구 하단 0.5M에서 온도 측정",
            "시험 결과: 챔버 온도 19.5℃ → 24.5℃ (도달시간 7분)",
            "제품의 동작 여부와 유지 성능은 설정된 기준 및 사용 환경에 따라 달라질 수 있습니다.",
          ],
        },
        {
          title: "[송풍]",
          items: [
            "샤워 후 피부 표면에는 미세한 수분막이 남아 있으며, 송풍 모드에서 발생하는 공기 흐름은 피부 표면의 수분을 빠르게 증발시키는 데 기여합니다.",
            "시험 일시: 25.11.06",
            "시험 기관: LG 전자 자체 시험",
            "시험 대상: M-X0120BAS*",
            "시험 방법: LG전자 실험 챔버(W*D*H(m): 2.3x2.7x2.2) / 히터 OFF, 외부온도 21.1℃, 외부 습도 42%, 실내 챔버 온도 20.1℃ / 풍량 세기 별 취출부 풍량 측정",
            "시험 결과: 풍량 120/90/70/50CMH 확인",
            "제품의 동작 여부와 유지 성능은 설정된 기준 및 사용 환경에 따라 달라질 수 있습니다.",
          ],
        },
        {
          title: "[공간케어]",
          items: [
            "공간케어 모드는 실내 온·습도 조건에 따라 자동으로 송풍, 온풍, 배기 기능을 제어하여 환경을 유지하는 운전 모드입니다.",
            "시험 일시: 25.12.20",
            "시험 기관: LG 전자 자체 시험",
            "시험 대상: MX0120BAS*, M-X0120BAS*",
            "시험 방법: LG전자 실험 챔버(W*D*H(m): 2.3x2.7x2.2) / 외부 온도 19℃, 외부 습도 40%, 실내 챔버 온도 20.4℃, 실내 챔버 습도 90% → 실내 챔버 습도 60% 도달시간 / 120CMH 풍량, 사용한 풍량은 실내 순환 50% 풍량과 배기 50% 풍량이 합쳐진 풍량임.",
            "시험 결과: 챔버 RH습도 90% → 60% 도달시간 프리미엄듀얼(MX0120BAS*) 7분, 프리미엄(M-X0120BAS*) 12분",
            "제품의 동작 여부와 유지 성능은 설정된 기준 및 사용 환경에 따라 달라질 수 있습니다.",
          ],
        },
        {
          title: "[바디케어]",
          items: [
            "집중된 온풍은 피부 표면에 남아 있는 수분과의 온도 차에 의해 증발 잠열 전달을 촉진하여, 빠른 수분 증발을 유도합니다.",
            "시험 일시: 25.12.08",
            "시험 기관: LG 전자 자체 시험",
            "시험 대상: M-X0120BAS*",
            "시험 방법: LG전자 실험 챔버(W*D*H(m): 2.3x2.7x2.2) / 히터 100% 동작, 실내 챔버 온도 20.0℃ / 10분 후 바람 출구에서 1M 주위온도 대비 상승온도 차를 측정함.",
            "시험 결과: 출구 1M에서, 정격풍량 190CMH에서 주위 온도 대비 14.3℃ 높음",
            "제품의 동작 여부와 유지 성능은 설정된 기준 및 사용 환경에 따라 달라질 수 있습니다.",
          ],
        },
      ],
      tabs: [
        {
          label: "온풍",
          description:
            "샤워하기 전에 온풍으로 미리 데워주고, 샤워하는 내내 욕실 온도를 따뜻하게 유지해줘요. 단 7분 만에 욕실 온도를 약 5℃ 높이고, 따뜻한 바람을 고르게 순환시켜요.",
          mediaType: "image",
          mediaUrl: "https://www.lge.co.kr/kr/usp_dcr/Bath%20Air%20System/new/MX0120BASV_Heating_pc.jpg",
        },
        {
          label: "송풍",
          description:
            "더운 여름엔 4단계 송풍으로 욕실 공기를 상쾌하게 바꿔줘요. 1단계 부드러운 약풍부터 2단계 일반풍, 3단계 강풍, 4단계 터보풍까지 상황에 맞게 선택할 수 있어요.",
          mediaType: "image",
          mediaUrl: "https://www.lge.co.kr/kr/usp_dcr/Bath%20Air%20System/new/MX0120BASV_Fresh_pc.jpg",
        },
        {
          label: "공간케어",
          description:
            "센서가 습도를 갑지해 욕실 상황에 맞는 모드를 자동으로 선택해요. 축축한 습기는 빠르게 제거하고, 차가운 공기는 부드럽게 데워 쾌적한 욕실을 만들어줘요.",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/usp_dcr/Bath%20Air%20System/new/MX0120BASV_SpaceCare_pc.mp4",
        },
        {
          label: "바디케어",
          description:
            "남은 물기를 깔끔하게 말려주는 강력한 바디 드라이! 바쁜 아침에는 준비 시간을 줄일 수 있고, 저녁에는 샤워하고난 뒤에도 상쾌하고 기분 좋게 샤워 마무리해줘요.",
          mediaType: "image",
          mediaUrl: "https://www.lge.co.kr/kr/usp_dcr/Bath%20Air%20System/new/MX0120BASV_BodyCare_pc.jpg",
        },
      ],
    },
    {
      id: "6",
      title: "여름철 습기와의 전쟁!\n욕실을 보송하게 바꾼 비결은?",
      subtitle: "구독하면 좋은 이유를 영상으로 확인하세요.",
      icon: "Monitor",
      tag: "엘숏츠",
      mediaType: "youtube",
      mediaUrl: "https://www.youtube.com/watch?v=NOxxvC5cQFw",
      isShorts: false,
      description:
        "샤워하고 나와도 금세 끈적이는 몸, 습기 가득찬 욕실, 꿉꿉한 냄새...\n여름철 욕실 관리 때문에 스트레스 받지 마세요.\nLG전자 퓨리케어 바스에어시스템이 거울 김 서림부터\n축축한 바닥 습기까지 싹 잡아서 보송한 욕실을 만들어주니까요.",
      highlights: ["송풍", "환기모드", "케어 전문가", "분해 세척"],
      disclaimers: [],
      collapsibleDisclaimers: [
        {
          title: "[영상]",
          items: [
            "이 영상은 AI를 활용하여 제작되었습니다.",
            "소비자의 이해를 위해 연출된 이미지이며, 제품별 색상 및 스펙은 다를 수 있습니다.",
          ],
        },
        {
          title: "[케어 서비스]",
          items: [
            "바스에어시스템 케어서비스는 구독 계약 고객에 한해 제공됩니다.",
            "6/12개월 마다 방문 관리 케어가 제공됩니다.",
            "필터 클리닝은 6개월 또는 12개월 주기마다 제공하며, 24개월 주기마다 새 필터로 교체됩니다.",
            "사용 환경 및 평소 관리 정도에 따라 오염도는 상이할 수 있습니다.",
            "방문 일정은 상황에 따라 변경될 수 있으며 방문 전 케어 전문가가 사전 연락을 드립니다.",
            "구독 케어 서비스와 무상 A/S는 가전 구독 고객에 한하며, 고객 과실로 인한 제품 고장은 제외됩니다.",
            "자세한 내용은 LGE.COM 내 가전 구독 제품별 상세 페이지를 참고해주세요.",
            "판매처별 운영하는 제품 모델은 상이할 수 있습니다.",
            "총 계약기간 동안 제품의 소유권은 회사에게 있으며, 재구독은 계약기간 이후에 가능합니다.",
            "분실료 기준 : 제품판매가-{(제품판매가/총 계약기간(개월 수) X 사용 개월 수}, 파손의 경우 분실료의 50% 입니다.",
            "의무 사용기간 내에 해지 시 위약금 등 비용이 발생할 수 있으며 의무 사용기간이 경과하였더라도, 계약기간 이내에 해지할 경우 철거료 등 부대비용이 일부 발생할 수 있습니다.",
            "가전 구독 계약기간 종료 후에는 케어십을 이용하실 수 있습니다.",
            "판매처별/지점별 판촉에 따라 할인적용 여부 및 적용가는 상이할 수 있습니다.",
          ],
        },
        {
          title: "[송풍]",
          items: [
            "샤워 후 피부 표면에는 미세한 수분막이 남아 있으며, 송풍 모드에서 발생하는 공기 흐름은 피부 표면의 수분을 빠르게 증발시키는 데 기여합니다.",
            "시험 일시: 25.11.06",
            "시험 기관: LG 전자 자체 시험",
            "시험 대상: M-X0120BAS*",
            "시험 방법: - LG전자 실험 챔버(W*D*H(m) : 2.3x2.7x2.2), - 히터 OFF, 외부온도 21.1℃, 외부 습도 42%, 실내 챔버 온도 20.1℃, - 풍량 세기 별 취출부 풍량 측정",
            "시험 결과: 풍량 120/90/70/50CMH 확인",
            "제품의 동작 여부와 유지 성능은 설정된 기준 및 사용 환경에 따라 달라질 수 있습니다.",
          ],
        },
        {
          title: "[환기]",
          items: ["리모컨의 환기 버튼을 누르면 욕실 내 공기가 배기되어 공간을 쾌적하게 유지해요."],
        },
      ],
    },
    {
      id: "5",
      title: "바스에어시스템을 설치한 집이 궁금하시다면?",
      subtitle: "실제 바스에어시스템을 설치한 사례를 알아보세요.",
      icon: "Image",
      tag: "설치 사례",
      mediaType: "gallery",
      mediaUrl: "",
      galleryImages: [
        {
          url: "https://www.lge.co.kr/kr/usp_dcr/Bath%20Air%20System/bathair_review_01.jpg",
          title: "욕조 위 설치",
          description: "출처: 주니호맘",
        },
        {
          url: "https://www.lge.co.kr/kr/usp_dcr/Bath%20Air%20System/bathair_review_02.jpg",
          title: "아치형 천장 부분 외 공간에 설치",
          description: "출처: 밍주부",
        },
        {
          url: "https://www.lge.co.kr/kr/usp_dcr/Bath%20Air%20System/bathair_review_03.jpg",
          title: "욕실 문 근처 설치",
          description: "출처: 윤로그",
        },
        {
          url: "https://www.lge.co.kr/kr/usp_dcr/Bath%20Air%20System/bathair_review_04.jpg",
          title: "샤워 부스 내 설치",
          description: "출처: 현둥",
        },
        {
          url: "https://www.lge.co.kr/kr/usp_dcr/Bath%20Air%20System/bathair_review_05.jpg",
          title: "거울 앞, 점검구 내 설치",
          description: "출처: 알라코",
        },
        {
          url: "https://www.lge.co.kr/kr/usp_dcr/Bath%20Air%20System/bathair_review_06.jpg",
          title: "샤워 부스–거울 사이 설치",
          description: "출처: 비클레어",
        },
      ],
      description: "다양한 욕실 구조와 공간에 맞춰 최적의 위치에 설치된 실제 사례를 확인해 보세요.",
      highlights: [],
    },
    {
      id: "4",
      title: "우리집 욕실에도 설치할 수 있나요?",
      subtitle: "바스에어시스템 설치하기 전, 확인해야할 체크리스트!",
      icon: "Wrench",
      tag: "설치 환경",
      mediaType: "image",
      mediaUrl:
        "https://www.lge.co.kr/kr/images/common/pdp_multi_banner/images/bath-air-system/Banner_BathAir_InstallChk_B_PC_x2.png",
      fullWidthMedia: true,
      imageFit: "original",
      description: "",
      highlights: [],
      mediaCollapsibleDisclaimers: [
        {
          title: "[설치 전 꼭 확인하세요]",
          items: [
            "설치 환경에 따라 설치기사의 현장 확인 및 추가 비용이 발생할 수 있습니다.",
            "바스에어시스템 프리미엄 듀얼 설치 시, 공기 흐름이 원활하도록 배기팬과 떨어뜨려 설치하는 것을 권장합니다.",
          ],
        },
      ],
      tabs: [
        {
          label: "설치 체크리스트",
          mediaType: "gallery",
          galleryImageMaxHeight: 520,
          galleryHideCaptions: true,
          galleryZoom: true,
          galleryImages: [
            {
              url: "/__l5e/assets-v1/431348cd-6464-4b11-b969-340b30068c02/bathair-install-check1-v3.png",
              title: "체크 1 · 기존 환풍기의 위치를 확인해 주세요",
            },
            {
              url: "/__l5e/assets-v1/895cf99c-b650-434d-83de-3cc85ba15096/bathair-install-check2-v3.png",
              title: "체크 2 · 기존 환풍기가 멀티 배기형인가요?",
            },
            {
              url: "/__l5e/assets-v1/74197998-e939-4e28-b5ad-1546271bbe51/bathair-install-check3-v3.png",
              title: "체크 3 · 욕실 천장의 구조와 재질을 확인해 주세요",
            },
            {
              url: "/__l5e/assets-v1/4ce45c19-fed2-4a33-82e5-573dac385715/bathair-install-check4-v3.png",
              title: "체크 4 · 제품 설치 공간을 확인해 주세요",
            },
            {
              url: "/__l5e/assets-v1/ff08b5c4-5a38-4ded-a57c-b5864d540abe/bathair-install-check5-v3.png",
              title: "체크 5 · 기타 주의사항",
            },
          ],
        },
        {
          label: "추가 설치 비용",
          mediaType: "table",
          mediaUrl: "/__l5e/assets-v1/6234ad47-4be2-4560-9908-9adc3359716f/bathair-install-cost.png",
          costTable: {
            title: "바스에어시스템 추가 설치 비용",
            headerNote: "[단가 : 원, VAT 포함]",
            rows: [
              {
                item: "신규 타공",
                price: "10,000",
                unit: "1개",
                description:
                  "욕실에 설치된 기존 환풍기 위치의 타공면을 활용하지 않고, 다른 위치에 새롭게 타공 작업 진행 시",
              },
              {
                item: "덕트 추가 및 교체",
                price: "10,000",
                unit: "1M",
                description:
                  "욕실에 설치된 기존 환풍기의 덕트가 노후/파손 등의 이유로 교체 필요한 경우, 또는 덕트 길이가 짧아 제품 연결을 위해 연장이 필요한 경우",
              },
              {
                item: "레듀샤(덕트 연결소켓)",
                price: "5,000",
                unit: "1개",
                description:
                  "욕실에 설치된 기존 환풍기의 덕트 구경이 작거나 커서 바스에어시스템 덕트 연결 구경과 결합이 안될 때 사용",
              },
              {
                item: "콘센트 설치",
                price: "7,000 / 10,000",
                unit: "1구 / 2구",
                description:
                  "바스에어시스템, 배기팬 전원 공급을 위한 욕실 천장 내 전원선 체결 타입이 콘센트가 아닐 경우 또는 부족할 경우, 기존 욕실 천장 속고 내 콘센트가 방우형 타입이 아닐 경우",
              },
              {
                item: "전원선 연장",
                price: "10,000",
                unit: "1M",
                description: "바스에어시스템, 배기팬 전원 공급을 위한 욕실 천장 내 전원선이 짧아 연장이 필요할 경우",
              },
              {
                item: "천장 보강 작업",
                price: "20,000",
                unit: "1식",
                description:
                  "제품 설치를 위해 욕실 천장의 구조물 M-bar(경량철골) 등을 절단하여 보강이 필요하다고 판단될 경우, 또는 제품 설치로 인해 천장 처짐 발생 우려로 보강이 필요하다고 판단될 경우",
              },
              {
                item: "점검구 설치",
                price: "50,000",
                unit: "1개",
                description: "(※ 바스에어시스템, 배기팬 이전 설치 시) 욕실 천장 인테리어 마감용 점검구 설치 시",
              },
              {
                item: "기존 제품 재설치",
                price: "10,000",
                unit: "1대",
                description:
                  "(※ 바스에어시스템, 배기팬 이전 설치 시) 바스에어시스템에 연결된 덕트를 기존 환풍기에 연결(전원포함) 작업 필요시",
              },
            ],
            notes: [
              "기존 환풍기는 바스에어시스템 설치 전 사용하던 제품 또는 별도 구입한 제품을 의미합니다.",
              "기본 설치 비용은 제품 가격에 포함되어 있습니다.",
              "구독 이전 설치는 유상 지원(판토스)으로 제품 이전에 따른 천장 복구 비용은 고객 부담입니다.",
              "구독 이전 설치 신청은 판토스 홈페이지 또는 LG전자서비스센터(1544-7777)를 통해 신청할 수 있습니다.",
              "구독 이전 설치 과정은 이전 설치 신청 > 일정 조율 및 예약 > 철거 & 설치 > 시운전 & 고객 인도 순서로 진행됩니다.",
            ],
          },
        },
      ],

    },
    {
      id: "7",
      title: "구독하면 어떤 케어서비스를 받을 수 있나요?",
      subtitle: "체계적인 전문가의 케어를 받으면 더욱 위생적으로 관리할 수 있어요.",
      icon: "Waves",
      tag: "가전 구독",
      mediaType: "youtube",
      mediaUrl: "https://www.youtube.com/embed/HkCNqxdZ5bs",
      fullWidthMedia: true,
      description:
        "필터 교체부터 내·외부 클리닝, 위생 관리, 성능 점검까지 체계적인 전문가 케어 프로세스로 바스에어시스템을 위생적으로 관리할 수 있어요.",
      highlights: [],
      mediaDisclaimers: ["소비자의 이해를 돕기 위해 연출된 이미지이며, 제품별 색상 및 스펙은 다를 수 있습니다."],
      mediaCollapsibleDisclaimers: [
        {
          title: "[케어 서비스]",
          items: [
            "바스에어시스템 케어서비스는 구독 계약 고객에 한해 제공되며 방문주기는 6/12개월 마다 방문 관리 케어를, 24개월마다 필터 교체가 제공됩니다.",
            "방문 일정은 상황에 따라 변경될 수 있으며 방문 전 케어 전문가가 사전 연락을 드립니다.",
            "무상 A/S는 가전 구독 고객에 한하며, 고객 과실로 인한 제품 고장은 제외됩니다.",
            "자세한 내용은 LGE.COM 내 가전 구독 제품별 상세 페이지를 참고해주세요.",
            "채널별 운영하는 모델은 상이할 수 있습니다.",
            "총 계약기간 동안 제품의 소유권은 회사에게 있으며, 재구독은 계약기간 이후에 가능합니다.",
            "분실료 기준 : 제품판매가-{(제품판매가/총 계약기간(개월 수) X 사용 개월 수}, 파손의 경우 분실료의 50% 입니다.",
            "의무 사용기간 내에 해지 시 위약금 등 비용이 발생할 수 있으며 의무 사용기간이 경과하였더라도, 계약기간 이내에 해지할 경우 철거료 등 부대비용이 일부 발생할 수 있습니다.",
            "가전 구독 계약기간 종료 후에는 케어십을 이용하실 수 있습니다.",
            "채널별/지점별 판촉에 따라 할인적용 여부 및 적용가는 상이할 수 있습니다.",
          ],
        },
      ],
    },
  ];
