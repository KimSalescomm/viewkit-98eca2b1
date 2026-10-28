/**
 * washcombo 제품 카드·상세 문구 편집 파일.
 * title: 질문형 제목 / subtitle: 부제 / tag: 기능명 / description: 상세 설명
 * highlights: 핵심만 쏙 / tabs: 탭별 내용 / disclaimers: 유의사항
 * 문구만 수정할 때 id는 변경하지 마세요. 카드 순서는 featureCardConfig.ts에서 관리합니다.
 */
import type { Feature } from "@/data/features";
import washcomboAiTimeSensingDisplayAsset from "@/assets/washcombo-ai-time-sensing-display.png.asset.json";
import washcomboAiReportWideAsset from "@/assets/washcombo-ai-report-wide.mp4.asset.json";
import washcomboAutomaticAsset from "@/assets/washcombo-automatic.jpg.asset.json";

export const washcomboFeatures: Feature[] = [
    {
      id: "1",
      title: "빨래할 때마다 세탁, 건조 코스 직접 고르세요?",
      subtitle: "AI 기술로 세탁물의 무게와 재질을 감지해\n세탁하고 건조 시간까지 정확하게 알려줘요.",
      icon: "Cpu",
      tag: "AI 올인원 세탁+건조",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/wash-combo/md10792826/usp/FC2521TX6C_04_ai_wash_dry_pc.mp4",
      showMainMedia: false,
      description:
        "세탁과 건조 모든 과정에 AI 기술을 적용해 더 편리해진 세탁+건조를 완성하고, 결과까지 확인할 수 있어요.",
      highlights: [
        "세탁+건조 모든 과정에 AI 기술 적용",
        "6가지 손빨래 동작으로 정교하게 세탁",
        "바람을 본뜬 6가지 건조 모션으로 꼼꼼하게 건조",
      ],
      tabs: [
        {
          label: "AI 세탁+건조",
          description:
            "세탁과 건조 모든 과정에 AI 기술을 적용해 더 편리해진 세탁+건조를 완성하고, 결과까지 확인할 수 있어요.",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/images/wash-combo/md10792826/usp/FC2521TX6C_04_ai_wash_dry_pc.mp4",
          highlights: [
            "세탁+건조 모든 과정에 AI 기술 적용",
            "6가지 손빨래 동작으로 정교하게 세탁",
            "바람을 본뜬 6가지 건조 모션으로 꼼꼼하게 건조",
          ],
          collapsibleDisclaimers: [
            {
              title: "세부정보",
              items: [
                "AI 세탁+건조 코스는 최대용량 5kg 이하에서 동작하며, 실사용 환경 및 세탁물 종류에 따라 다를 수 있습니다.",
                "AI 세탁은 딥러닝 AI 기술을 이용해 의류의 재질을 감지한 후 6모션 중 최적의 모션으로 세탁하며, 빅데이터 기반 환경에 맞춰 큰 진동을 미리 예측해 안정적으로 탈수 하며, AI 세탁에서 센싱한 값으로 AI 건조까지 진행합니다.",
              ],
            },
          ],
        },
        {
          label: "AI DD x 6모션",
          descriptionTitle: "섬세한 6모션으로 최적화된 세탁·건조",
          description:
            "6가지 다양한 손빨래 동작으로 정교하게 세탁하며 바람을 본뜬 6가지 건조 모션으로 꼼꼼하게 건조해요.",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/images/wash-combo/md10792826/usp/FC2521TX6C_05_ai_6motion_pc.mp4",
          highlights: [],
          collapsibleDisclaimers: [
            {
              title: "세부정보",
              items: [
                "AI 세탁 코스는 최대용량 6kg 이하에서 동작하며, 실사용 환경 및 세탁물 종류에 따라 다를 수 있습니다.",
                "AI 세탁은 딥러닝 AI 기술을 이용해 의류의 재질을 감지한 후 6모션 중 최적의 모션으로 세탁하며, 빅데이터 기반 환경에 맞춰 큰 진동을 미리 예측해 안정적으로 탈수 합니다.",
                "AI 건조 코스는 AI 타임 센싱 및 AI 시간 안내 기능이 적용되어 있습니다.",
                "설치 조건 및 실사용 조건에 따라 시간은 달라질 수 있습니다.",
              ],
            },
          ],
        },
      ],
      subFeaturesTitle: "AI 세탁+건조 과정에서 제공되는 세부 기능",
      subFeatures: [
        {
          label: "AI 타임 센싱",
          title: "약 3초 만에 알려주는 세탁+건조 예상 시간",
          description:
            "세탁물을 투입 후 문을 닫고 시작 버튼을 누르면 무게를 감지해 약 3초 만에 예상 시간을 알려줍니다.\n세탁기 앞에서 오래 기다릴 필요가 없고, 코스 별 시간도 바로 확인할 수 있어 편리해요.",
          mediaType: "image",
          mediaUrl: washcomboAiTimeSensingDisplayAsset.url,
          disclaimers: [
            {
              title: "AI 타임 센싱",
              items: [
                "AI 타임 센싱 3초 : 문을 닫은 후 전원 버튼을 누르고 웰컴 메시지가 나타난 이후 측정된 시간입니다.",
                "마른 세탁물 기준 세탁물이 가득 찬 경우 최대 약 15초까지 소요될 수 있습니다.",
                "세탁물의 종류나 사용 환경에 따라 센싱 시간은 달라질 수 있습니다.",
              ],
            },
          ],
        },
        {
          label: "AI 최적화 기록",
          title: "세탁물의 특성에 맞춰 AI가 최적화한 세탁+건조 과정을 기록",
          description:
            "AI 세탁+건조 코스를 사용하면 옷감의 재질과 오염도를 분석해\n최적의 세탁+건조 조건을 설정하고 기록해요.\nAI 최적화 기록은 디스플레이에서 확인할 수 있어요.",
          mediaType: "video",
          mediaUrl: washcomboAiReportWideAsset.url,
          disclaimers: [
            {
              title: "AI 최적화 기록",
              items: [
                "AI 최적화 기록은 AI 세탁 중 감지된 오염도에 따른 세탁 행정을 안내하는 기능으로, 세탁물의 종류나 사용환경에 따라 안내되는 문구는 차이가 있을 수 있습니다.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "2",
      title: "큰 이불도 넉넉하게 세탁하고 건조할 수 있다면요?",
      subtitle: "6kg 더 커진 건조 용량으로 많은 양의 빨래도\n부담 없이 한 번에 세탁+건조해 보세요.",
      icon: "Expand",
      tag: "국내 최대 25kg 세탁 + 21kg 건조",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/wash-combo/md10792826/usp/FC2521TX6C_08_25kg_pc.mp4",
      descriptionTitle: "세탁 25kg, 건조 21kg\n국내 최대 용량으로 넉넉한 세탁·건조",
      description:
        "기존보다 10% 더 커진 드럼 사이즈로 세탁 25kg, 건조 21kg 국내 올인원 워시콤보 최대 용량을 구현했어요.",
      highlights: ["국내 최초·국내 최대 세탁건조기", "국내 최대 건조 용량"],
      disclaimers: [
        "소비자의 이해를 돕기 위해 연출된 이미지이며, 제품별 색상 및 스펙은 다를 수 있습니다.\n* 국내 최초 · 국내 최대 용량 세탁건조기 : 국내 판매중인 가정용 세탁건조기 기준 ('26년 6월 에너지 관리공단 등록 기준)\n* 국내 최대 건조 용량 : '26년 6월 기준, 한국 에너지 공단에 등록된 세탁건조기 건조 용량 기준\n* 워시콤보 단독 구매 시 미니워시는 별도 구매 제품 이오니, 미니워시 구매를 희망하신다면 미니워시 단독구매 또는 워시콤보+미니워시 세트 모델을 구매하세요.",
      ],
    },
    {
      id: "3",
      title: "세탁과 건조 코스에 스팀을 더하면 뭐가 달라질까요?",
      subtitle: "물을 끓여 만든 트루스팀과 60℃ 이상\n고온의 물로 의류를 살균 케어해요.",
      icon: "CloudFog",
      tag: "트루스팀",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/wash-combo/md10792826/usp/FC2521TX6C_08_true_steam_pc.mp4",
      description:
        "물을 끓여 만든 트루스팀과 60℃ 이상 고온의 물로 의류를 살균 케어해요. 세탁부터 건조까지 스팀이 적용된 코스를 선택하거나 옵션 추가해 의류를 관리할 수 있어요.",
      highlights: ["유해세균 살균", "냄새와 구김 케어"],
      courses: [
        {
          name: "알러지케어 코스",
          type: "세탁/건조 코스",
          description: "알러지 유발 물질 99.99% 제거로 위생적인 세탁",
          imageUrl: "https://www.lge.co.kr/kr/images/wash-combo/md10792826/usp/FC2521TX6C_10_allergy_care.jpg",
          disclaimers: [
            {
              title: "바이러스 제거",
              items: [
                "시험 기관 : KATRI (한국의류시험연구원) / 시험 일자 : ‘26년 03월",
                "시험 코스 : 알러지케어",
                "시험 부하 : KS C IEC60456 시험기준 국제 규격 부하 4kg",
                "시험 바이러스 : 바이러스 3종 (인플루엔자 A(H1N1), 아데노(HAdV-C5), 코로나(HCoV-229E)",
                "시험 조건 : 시험실 온도 21°±2C, 시험실 습도 50±15% R.H.",
                "시험 방법 : 바이러스 오염된 면직물 부착하여 알러지케어 코스 동작 후 바이러스 제거 능력 측정",
                "시험 결과 : 바이러스 3종 99.99% 제거",
                "HCoV 바이러스는 코로나 바이러스의 일종으로 신종 코로나바이러스 19(COVID-19)에 대한 시험 결과가 아님.",
                "시험결과는 사용환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
            {
              title: "유해세균 살균",
              items: [
                "시험 기관 : Intertek / 시험 일자 : ‘26년 03월",
                "시험 코스 : 알러지케어",
                "시험 부하 : KS C IEC60456 시험기준 국제 규격 부하 4kg",
                "시험 균 : 유해세균 3종 (황색포도상구균, 녹농균, 폐렴간균)",
                "시험 조건 : 시험실 온도 21°±2C, 시험실 습도 50±15% R.H.",
                "시험 방법 : 유해세균 오염된 면직물 부착하여 알러지케어 코스 동작 후 살균력 측정",
                "시험 결과 : 유해세균 3종 99.99% 살균",
                "시험 결과는 사용 환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
            {
              title: "알러지 유발물질 제거",
              items: [
                "시험 기관 : Environmental Allergens Info and Care Inc.(일본소재) / 시험 일자 : ‘26년 03월",
                "시험 코스 : 알러지케어",
                "시험 부하 : KS C IEC60456 시험기준 국제 규격 부하 4kg",
                "시험 알레르겐 : 집먼지진드기 성충, 고양이 (Fel d 1), 개(Can f 1), 집먼지진드기 (Der f1)",
                "시험 방법 : 집먼지진드기 및 알레르겐이 오염된 면직물 부착하여 알러지케어 코스 동작 후 집먼지진드기 살충 및 알레르겐 제거율 확인",
                "시험 결과 : 집먼지진드기 성충 100% 살충, 고양이(Fel d 1), 개(Can f 1), 집먼지진드기(Der f 1) 알레르겐 99.99% 제거",
                "시험 결과는 사용 환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
            {
              title: "꽃가루 알레르겐 불활성화",
              items: [
                "시험 기관 : Environmental Allergens Info and Care Inc.(일본소재) / 시험 일자 : ‘26년 03월",
                "시험 코스 : 알러지케어",
                "시험 부하 : KS C IEC60456 시험기준 국제 규격 부하 4kg",
                "시험 알레르겐 : 돼지풀(Amb a 1), 자작나무(Bet v 1), 벼과(Phl p 5)",
                "시험 방법 : 꽃가루 알레르겐이 오염된 면직물 부착하여 스팀살균 코스 동작 후 꽃가루 알레르겐 불활성화율 확인",
                "시험 결과 : 돼지풀(Amb a 1), 자작나무(Bet v 1), 벼과(Phl p 5) 99.9% 이상 불활성화",
                "시험결과는 사용환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
          ],
        },
        {
          name: "스팀살균 코스",
          type: "건조 코스",
          description: "유해세균을 99.99% 살균해 위생적인 건조",
          imageUrl: "https://www.lge.co.kr/kr/images/wash-combo/md10792826/usp/FC2521TX6C_11_steam_sterilization.jpg",
          disclaimers: [
            {
              title: "유해세균 살균",
              items: [
                "시험 기관 : KATRI (한국의류시험연구원) / 시험 일자 : ‘26년 03월",
                "시험 코스 : 스팀살균",
                "시험 부하 : KS C IEC60456 시험기준 국제 규격 부하 4kg",
                "시험 균 : 유해세균 3종 (황색포도상구균, 녹농균, 폐렴간균)",
                "시험 조건 : 시험실 온도 21°±2C, 시험실 습도 50±15% R.H.",
                "시험 방법 : 유해세균 오염된 면직물 부착하여 알러지케어 코스 동작 후 살균력 측정",
                "시험 결과 : 유해세균 3종 99.99% 살균",
                "시험 결과는 사용 환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
            {
              title: "바이러스 제거",
              items: [
                "시험 기관 : KATRI (한국의류시험연구원) / 시험 일자 : ‘26년 03월",
                "시험 코스 : 스팀살균",
                "시험 부하 : KS C IEC60456 시험기준 국제 규격 부하 마른 상태 4kg",
                "시험 바이러스 : 바이러스 3종 (인플루엔자 A(H1N1), 아데노(HAdV-C5), 코로나(HCoV-229E)",
                "시험 조건 : 시험실 온도 21°±2C, 시험실 습도 50±15% R.H.",
                "시험 방법 : 바이러스 오염된 면직물 부착하여 스팀살균 코스 동작 후 바이러스 제거 능력 측정",
                "시험 결과 : 바이러스 3종 99.99% 제거",
                "HCoV-229E 바이러스는 코로나 바이러스의 일종으로 신종 코로나바이러스 19(COVID-19)에 대한 시험 결과가 아님.",
                "시험 결과는 사용 환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
            {
              title: "알러지 유발물질 제거",
              items: [
                "시험 기관 : Environmental Allergens Info and Care Inc.(일본소재) / 시험 일자 : ‘26년 03월",
                "시험 코스 : 스팀살균",
                "시험 부하 : KS C IEC60456 시험기준 국제 규격 부하 4kg",
                "시험 알레르겐 : 집먼지진드기 성충, 고양이 (Fel d 1), 개(Can f 1), 집먼지진드기 (Der f1)",
                "시험 방법 : 집먼지진드기 및 알레르겐이 오염된 면직물 부착하여 알러지케어 코스 동작 후 집먼지진드기 살충 및 알레르겐 제거율 확인",
                "시험 결과 : 집먼지진드기 성충 100% 살충, 고양이(Fel d 1), 개(Can f 1), 집먼지진드기(Der f 1) 알레르겐 99.9% 제거",
                "시험 결과는 사용 환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
          ],
        },
        {
          name: "스팀리프레쉬 코스",
          type: "건조 코스",
          description: "트루스팀으로 생활 속 냄새와 구김까지 케어",
          imageUrl: "https://www.lge.co.kr/kr/images/wash-combo/md10792826/usp/FC2521TX6C_12_steam_refresh.jpg",
          disclaimers: [
            {
              title: "탈취",
              items: [
                "시험 기관 : KATRI (한국의류시험연구원) / 시험 일자 : ‘26년 03월",
                "시험 코스 : 스팀리프레쉬",
                "시험 부하 : KS C IEC60456 표준셔츠 3벌",
                "냄새 분자 : 땀냄새, 담배냄새",
                "시험 조건 : 시험실 온도 21°±2C, 시험실 습도 50±15% R.H.",
                "시험 방법 : 스팀리프레쉬 코스 동작 후 탈취력 측정",
                "시험 결과 : 땀냄새, 담배냄새 99% 제거",
                "시험 결과는 사용 환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
            {
              title: "구김제거",
              items: [
                "시험 기관 : KATRI (한국의류시험연구원) / 시험 일자 : ‘25년 03월",
                "시험 코스 : 스팀리프레쉬",
                "시험 부하 : 마른 상태의 셔츠 1벌, 셔츠 3벌, 셔츠 5벌",
                "시험 조건 : 시험실 온도 21°±2C, 시험실 습도 50±15% R.H.",
                "시험 방법 : 자사가 제시한 시험기준으로, 셔츠 등판 300mm x 300mm 기준 셔츠에 임의 구김을 부여한 후, 셔츠를 무작위로 선택하여 건조기 동작 전, 후 AATCC 시험평가판으로 비교",
                "시험 결과 : 구김정도 시험 전 대비 80% 이상 완화 됨.",
                "시험 결과는 사용 환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
          ],
        },
      ],
      disclaimers: ["트루스팀 효과는 사용 조건 및 대상 세탁물에 따라 달라질 수 있습니다."],
    },
    {
      id: "4",
      title: "매번 세제 양 맞추기, 번거롭지 않으세요?",
      subtitle: "세제와 유연제를 한 번 채워두면 세탁물의 무게와\n오염도를 감지해 자동으로 적정량을 투입해줘요.",
      icon: "Beaker",
      tag: "플랫세제함(자동세제)",
      mediaType: "image",
      mediaUrl: washcomboAutomaticAsset.url,
      descriptionTitle: "세제와 유연제를 채워두면\n적정량을 알아서 투입",
      description:
        "세탁물의 무게와 오염도를 감지해 필요한 만큼 자동으로 적정량의 세제를 투입해요. 세제 종류에 따라 투입량도 원하는 대로 설정할 수 있어요.",
      highlights: ["자동으로 세제/유연제 투입", "편리한 세탁"],
      disclaimers: ["세제 용량은 사용 빈도와 코스에 따라 달라질 수 있습니다."],
      collapsibleDisclaimers: [
        {
          title: "자동세제함 플러스",
          items: [
            "해당 기능은 자동세제 모델에 한하며, 자동세제 설정 시 세탁량에 알맞게 세제/유연제를 자동으로 투입됩니다.",
            "AI 세탁 코스 동작 시 세탁물의 오염도에 따라 세제가 추가 투입 될 수 있으며, 세제의 양은 오염도에 따라 달라질 수 있습니다.",
            "자동세제 또는 수동세제투입으로 사용 할 수 있어, 필요에 따라 원하는 세제/유연제 투입 가능",
            "자동세제 기준 투입량은 세제/유연제에 표시된 권장량을 참고해 5kg 기준으로 투입량을 설정해 주세요.",
            "기본값은 세제 45ml, 유연제 60ml로 설정되어 있습니다.",
            "세제함 사용 설정 변경 시 세제통을 꺼내 세척 한 뒤 물을 채워놓고 ‘설정’의 ‘자동 세제함 노즐 세척‘ 기능을 사용 후 세제함에 세제/유연제를 넣어주세요.",
          ],
        },
      ],
    },
    {
      id: "7",
      title: "워시콤보를 구독하면\n무엇이 좋을까요?",
      subtitle: "가전 케어 매니저가 보이지 않는 부분까지 꼼꼼하게 관리해줘요.",
      icon: "Wrench",
      tag: "가전 구독",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2025/wash_combo_250804.mp4",
      description: "가전 케어 매니저가 정기적으로 소모품 교체부터 위생 관리까지 도와줘 편리해요.",
      highlights: [
        "LG전자에서 연구한 전용 관리제 사용",
        "세제함, 필터 등을 스팀 케어",
        "필터 교체 주기에 맞춰 필터 교체",
      ],
      disclaimers: ["소비자의 이해를 돕기 위해 연출된 영상이며, 제품별 색상 및 스펙은 다를 수 있습니다."],
      collapsibleDisclaimers: [
        {
          title: "세부정보",
          items: [
            "[가전 구독]",
            "워시콤보 가전 구독은 구독 계약 고객에 한해 제공됩니다.",
            "정기적인 방문 관리 케어가 제공됩니다.",
            "구독 케어 서비스와 무상 A/S는 가전 구독 고객에 한하며, 고객 과실로 인한 제품 고장은 제외됩니다.",
            "자세한 내용은 LGE.COM 내 가전 구독 제품별 상세 페이지를 참고해주세요.",
            "판매처별 운영하는 제품 모델은 상이할 수 있습니다.",
            "총 계약기간 동안 제품의 소유권은 회사에게 있으며, 재구독은 계약기간 이후에 가능합니다.",
            "분실료 기준 : 제품판매가-{(제품판매가/총 계약기간(개월 수) X 사용 개월 수}, 파손의 경우 분실료의 50% 입니다.",
            "의무 사용기간 내에 해지 시 위약금 등 비용이 발생할 수 있으며 의무 사용기간이 경과하였더라도, 계약기간 이내에 해지할 경우 철거료 등 부대비용이 일부 발생할 수 있습니다.",
            "가전 구독 계약기간 종료 후에는 케어십을 이용하실 수 있습니다.",
            "판매처별/지점별 판촉에 따라 할인적용 여부 및 적용가는 상이할 수 있습니다.",
            "[직수/고압 세척]",
            "적용 모델 : 26년 6월 출시 워시콤보 FC2521**** 한정",
            "Intetek에서 2024년 4월 및 2026년 6월 인공 오염 누적 조건으로 드럼 케어 및 직수/고압 세척의 세척력을 시험한 결과, 직수/고압 세척은 드럼 케어 대비 11% 우수했으며, 2024년 드럼 케어 세척력 기준 환산 시 분해 세척 대비 90% 수준의 세척력을 확인했으나, 세척률 및 오염 정도는 사용 환경에 따라 차이가 있을 수 있습니다.",
            "방문 관리는 사전 안내드리고 있으며, 고객 요청에 의해 협의된 일정으로 변경하실 수 있습니다.",
            "[UV/스팀 케어]",
            "UV 적용 모델 : 26년 6월 출시 워시콤보 FC2521**** 한정",
            "[내시경 카메라 점검]",
            "적용 모델 : 26년 6월 출시 워시콤보 FC2521**** 한정",
            "[필터 세척 및 교체]",
            "배수 필터 : 24개월 주기 교체",
            "건조 필터 : 최초 방문 시 1회 교체",
            "[제품 점검]",
            "적용 모델 : 26년 6월 출시 워시콤보 FC2521**** 한정",
            "[무상 A/S]",
            "가전 구독 고객에 한하며, 고객 과실로 인한 제품 고장은 제외됩니다.",
          ],
        },
      ],
      mediaGallery: [
        {
          url: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/s-common/img_washtower_01_260724.jpg",
          title: "직수/고압 세척",
        },
        {
          url: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/s-common/img_washtower_02_260724.jpg",
          title: "드럼 케어",
        },
        {
          url: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/s-common/img_washtower_08_260805.png",
          title: "UV/스팀케어",
        },
        {
          url: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/s-common/img_washtower_03_260724.jpg",
          title: "내시경 카메라 점검",
        },
        {
          url: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/s-common/img_washtower_04_260724.jpg",
          title: "필터 세척 및 교체",
        },
        {
          url: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/s-common/img_washcombo_260805.png",
          title: "제품 점검",
        },
        {
          url: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/s-common/img_washtower_07_260724.jpg",
          title: "무상 A/S",
        },
      ],
    },
  ];
