/**
 * vacuum 제품 카드·상세 문구 편집 파일.
 * title: 질문형 제목 / subtitle: 부제 / tag: 기능명 / description: 상세 설명
 * highlights: 핵심만 쏙 / tabs: 탭별 내용 / disclaimers: 유의사항
 * 문구만 수정할 때 id는 변경하지 마세요. 카드 순서는 featureCardConfig.ts에서 관리합니다.
 */
import type { Feature } from "@/data/features";

export const vacuumFeatures: Feature[] = [
    {
      id: "1",
      title: "바닥 얼룩,\nAI가 알아서 닦아줄까요?",
      subtitle: "오염을 인식해 바닥 오염과 기름때까지 보다 말끔하게 청소해요.",
      icon: "Flame",
      tag: "스팀 물걸레",
      mediaType: "video",
      mediaUrl: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_02_moving_steam_pc.mp4",
      description:
        "로니는 AI 오염을 알아서 인식해 마른 얼룩이 인식되면 자동으로 스팀 물걸레 청소를 시작할 수 있습니다.\n실시간으로 생성된 100°C 스팀을 물걸레에 직접 분사해 강력하게 청소하며 오염 정도에 따라 최대 2회까지 청소를 반복합니다.\n청소가 끝나면 LG ThinQ 앱에서 청소 전후를 사진으로 비교할 수 있습니다.",
      highlights: ["AI로 바닥 오염물 인식", "100°C 스팀 물걸레 청소", "최대 2회 반복 청소", "ThinQ 전후 사진 비교"],
    },
    {
      id: "2",
      title: "흡입력,\n어디까지 강해질까요?",
      subtitle: "최대 30W의 강력한 흡입력과 엉킴 방지 브러시로 청소가 더 편해져요",
      icon: "Zap",
      tag: "흡입 청소",
      mediaType: "video",
      mediaUrl: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_09_powerful_suction_pc.mp4",
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
          highlights: ["30W 강력 흡입력", "고성능 모터", "무거운 이물질 흡입", "바닥 먼지 완전 제거"],
          mediaType: "video",
          mediaUrl:
            "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_09_powerful_suction_pc.mp4",
        },
        {
          label: "엣지 확장 브러시",
          description: "최대 46mm까지 확장되는 사이드 브러시와 물걸레로 모서리나 벽면에 밀착하여 청소합니다.",
          highlights: ["엣지 확장 브러시", "벽면 가장자리 밀착 청소", "청소 사각지대 해결", "구석구석 꼼꼼 청소"],
          mediaType: "video",
          mediaUrl: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_10_edge_cleaning.mp4",
        },
        {
          label: "듀얼 엉킴 방지 브러시",
          description:
            "두 개의 브러시가 회전하며 머리카락을 가운데로 모아 엉킴을 방지합니다.\n모은 머리카락은 효율적으로 분리되어 먼지통으로 흡입합니다.",
          highlights: ["듀얼 엉킴 방지 브러시", "머리카락 흡입구 자동 이동", "엉킴 걱정 없이", "꾸준한 청소 성능"],
          mediaType: "video",
          mediaUrl: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_11_anti_tangle.mp4",
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
      title: "우리 집 맞춤 스마트 청소,\n가능할까요?",
      subtitle: "장애물은 알아서 피하고, 놓친 공간까지\n스스로 찾아 청소해요.",
      icon: "Navigation",
      tag: "AI 맞춤 청소",
      mediaType: "video",
      mediaUrl:
        "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_03_sensing_ai_driving_pc.mp4",
      description:
        "RGB 카메라와 센서 기반 다양한 상황과 장애물을 섬세하게 인식하고 똑똑하게 판단합니다.\n헤매거나 바퀴가 들려 구속되었던 공간은 '고립 위험 영역'으로 인식하고 다음 청소에는 이를 회피하여 청소합니다.\n이후 해당 영역 내 장애물이 사라지면 청소를 재개해 진화하는 청소 경험을 제공합니다.",
      highlights: [
        "복잡한 집안 구조와 장애물 똑똑하게 판단",
        "고립 위험 공간 스스로 학습해 안전 회피",
        "장애물 치워지면 놓친 곳까지 재청소",
        "쓸수록 진화하는 청소 편리함",
      ],
    },
    {
      id: "3",
      title: "우리 집엔 어떤 게 어울릴까요?",
      subtitle: "두 가지 타입의 \n프리미엄 스테이션을 비교해보세요.",
      icon: "Armchair",
      tag: "공간 맞춤 솔루션",
      mediaType: "video",
      mediaUrl: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/n95twu_keyvideo_kitchen_pc.mp4",
      mediaSlides: [
        {
          mediaType: "video",
          mediaUrl: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/n95twu_keyvideo_kitchen_pc.mp4",
        },
        {
          mediaType: "image",
          mediaUrl:
            "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_lifestyle_kitchen_pc_01.jpg",
        },
        {
          mediaType: "image",
          mediaUrl:
            "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_lifestyle_kitchen_pc_02.jpg",
        },
        {
          mediaType: "image",
          mediaUrl:
            "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_interior_kitchen_pc_01.jpg",
        },
        {
          mediaType: "image",
          mediaUrl:
            "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_interior_kitchen_pc_02.jpg",
        },
        {
          mediaType: "image",
          mediaUrl:
            "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_interior_kitchen_pc_03.jpg",
        },
        {
          mediaType: "image",
          mediaUrl:
            "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_interior_kitchen_pc_04.jpg",
        },
        {
          mediaType: "image",
          mediaUrl:
            "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_interior_kitchen_pc_05.jpg",
        },
      ],

      tabs: [
        {
          label: "히든스테이션",
          description:
            "약 15cm 초슬림 히든스테이션은 주방의 숨겨진 공간을 가치 있는 공간으로 바꿉니다.\n별도 전용 수납장을 마련할 필요 없이 싱크대 하단 걸레받이에 설치 가능해\n기존 수납 공간도 그대로 활용할 수 있습니다.",
          mediaType: "video",
          mediaUrl: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/n95twu_keyvideo_kitchen_pc.mp4",
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

          highlights: ["공간 맞춤 디자인", "거실 사이드 테이블로 활용", "소파 옆 간편 배치", "인테리어 품격 UP"],

          mediaType: "video",
          mediaUrl:
            "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/n95tho_keyvideo_living-room_pc.mp4",
          mediaSlides: [
            {
              mediaType: "video",
              mediaUrl:
                "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/n95tho_keyvideo_living-room_pc.mp4",
            },
            {
              mediaType: "image",
              mediaUrl:
                "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_lifestyle_livingroom_pc_01.jpg",
            },
            {
              mediaType: "image",
              mediaUrl:
                "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_lifestyle_livingroom_pc_02.jpg",
            },
            {
              mediaType: "image",
              mediaUrl:
                "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_interior_livingroom_pc_01.jpg",
            },
            {
              mediaType: "image",
              mediaUrl:
                "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_interior_livingroom_pc_02.jpg",
            },
            {
              mediaType: "image",
              mediaUrl:
                "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_interior_livingroom_pc_03.jpg",
            },
            {
              mediaType: "image",
              mediaUrl:
                "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_interior_livingroom_pc_04.jpg",
            },
            {
              mediaType: "image",
              mediaUrl:
                "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_interior_livingroom_pc_05.jpg",
            },
            {
              mediaType: "image",
              mediaUrl:
                "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_interior_livingroom_pc_06.jpg",
            },
          ],
        },
      ],
      description:
        "보이지 않아도 완성되고, 보일수록 품격이 되는 히든스테이션과 오브제스테이션. 공간 성격에 맞춰 두 가지 디자인을 선택할 수 있어요.",
      highlights: [
        "15cm 초슬림 히든스테이션",
        "싱크대 하부 걸레받이 설치",
        "보일수록 품격 오브제스테이션",
        "공간 성격에 맞춘 두 디자인",
      ],
    },
    {
      id: "8",
      title: "위생케어,\n손 안대고도 깨끗할까요?",
      subtitle: "물걸레 냄새와 빨래 번거로움 없이 100℃ 스팀 살균과 온풍 건조로 더 위생적인 케어 솔루션을 경험해보세요.",
      icon: "Sparkles",
      tag: "위생&케어 솔루션",
      mediaType: "image",
      mediaUrl:
        "https://viewkit.lovable.app/__l5e/assets-v1/d226a096-c139-4360-ac26-3392dec78942/vacuum-subscription-service-01.jpg",
      description:
        "청소로봇의 위생과 성능을 한 번에 관리하는 위생&케어 솔루션이에요. 케어 전문가가 정기 방문해 청소로봇의 내·외부 위생과 성능을 꼼꼼히 관리해드려요.",
      highlights: ["100℃ 살균 스팀", "스테이션 컨디셔닝", "무상 A/S 및 소모품 교체"],
      tabs: [
        {
          label: "100℃ 살균 스팀",
          description:
            "로니는 냉온수 세척부터 100℃ 살균 스팀까지 맞춤 세척 솔루션입니다.\n끝난 후에는 약 40~60℃ 온풍으로 물걸레를 건조시켜 물걸레 속 유해균을 99.99% 제거합니다.",
          mediaType: "video",
          mediaUrl: "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/usp/N95THO_12_mop_solution_pc.mp4",
          highlights: ["냉온수 맞춤 세척", "100℃ 살균 스팀", "약 40℃ 온풍 건조", "유해균 99.99% 제거"],
        },
        {
          label: "스테이션 컨디셔닝",
          description:
            "히든스테이션 상부의 배기 팬이 제품 내부에서 발생할 수 있는 습증기를 외부로 배출해 스테이션 내부 관리에 대한 걱정과 부담을 덜어줍니다.",
          mediaType: "video",
          mediaUrl:
            "https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730839/usp2/N95TWU_13_station_conditioning_pc.mp4",
          highlights: ["히든스테이션 상부 배기 팬", "내부 습증기 외부 배출", "히든 스테이션 내부 관리 부담 감소"],
        },
      ],
    },
    {
      id: "5",
      title: "보안, \n정말 안심해도 될까요?",
      subtitle: "안심을 더해주는\n 체계적인 보안 시스템을 알아보세요.",
      icon: "Shield",
      tag: "체계적인 보안 솔루션",
      mediaType: "image",
      mediaUrl: "/__l5e/assets-v1/8fe1dd11-6cb7-465a-a9ea-57e5e0e11c19/vacuum-security-cert-left.png",
      tabs: [
        {
          label: "보안 인증 & 개인정보 보호",
          mediaType: "image",
          mediaUrl: "/__l5e/assets-v1/8fe1dd11-6cb7-465a-a9ea-57e5e0e11c19/vacuum-security-cert-left.png",
          description:
            "사용자의 데이터를 안전하게 지키는 LG Shield로 철저한 보안 리스크 관리가 가능하고 이에 대해 개인정보보호위원회로부터 PbD 인증도 부여받았습니다.\n또한 소중한 개인 정보가 국외 서버로 전송되는 것을 제한하며 개인 정보를 철저하게 보호합니다.",
        },
        {
          label: "물리적 보안",
          description: "청소 후에는 자동 도어 닫힘 기능으로 카메라 노출 걱정까지 줄여 더욱 안심할 수 있습니다.",
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
      title: "구독, \n더 편해질까요?",
      subtitle: "구독으로 편하게,\n전문가가 관리해요",
      icon: "Wrench",
      tag: "가전 구독",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/robot-cleaners_roni_01.jpg",
      description:
        "구독 기간 동안 무상 A/S는 기본, 케어 전문가가 정기 방문해 청소로봇의 내·외부 위생과 성능을 관리해드려요. 번거로운 소모품 교체까지 챙겨 더 편하게 사용할 수 있어요.",
      highlights: [
        "위생 케어",
        "로봇/오수관 클리닝",
        "급배수통 스팀 클리닝",
        "소모품 7종 교체 및 배터리 교체",
        "무상 철거/재설치",
      ],
      subscriptionServiceItems: [
        {
          label: "위생 케어",
          imageUrl: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/robot-cleaners_roni_01.jpg",
          description: "스티머로 먼지통과 걸레세척판을 꼼꼼히 세척·살균해 위생적으로 관리해 드려요.",
        },
        {
          label: "로봇/오수관 클리닝",
          imageUrl: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/robot-cleaners_roni_02.jpg",
          description:
            "전용 관리제로 제품 안쪽 튜브까지 세척하고, 이물질이 쌓일 수 있는 먼지통과 회전솔 장착부를 꼼꼼하게 관리해요.",
        },
        {
          label: "급배수통 스팀 클리닝",
          imageUrl: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/robot-cleaners_roni_3.jpg",
          description: "스티머로 물때가 생기기 쉬운 급/배수통을 청소해 물길을 깨끗하게 유지해요.",
        },
        {
          label: "소모품 7종 및 배터리 교체",
          imageUrl:
            "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/robot-cleaners_roni_04_v2.jpg",
          description:
            "청소 성능을 유지할 수 있도록 소모품을 무상으로 교체하고, 로니 본체와 충전대를 꼼꼼하게 클리닝해요.",
        },
        {
          label: "무상 철거/재설치",
          imageUrl: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/robot-cleaners_roni_05.jpg",
          description: "이사할 때도 번거로움 없이 제품을 무상으로 철거·재설치해 드려요.",
        },
      ],
      mediaDisclaimers: ["방문 관리는 사전 안내드리고 있으며, 고객 요청에 의해 협의된 일정으로 변경하실 수 있습니다."],
    },
  ];
