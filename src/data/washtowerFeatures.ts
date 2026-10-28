/**
 * ai-washtower 제품 카드·상세 문구 편집 파일.
 * title: 질문형 제목 / subtitle: 부제 / tag: 기능명 / description: 상세 설명
 * highlights: 핵심만 쏙 / tabs: 탭별 내용 / disclaimers: 유의사항
 * 문구만 수정할 때 id는 변경하지 마세요. 카드 순서는 featureCardConfig.ts에서 관리합니다.
 */
import type { Feature } from "@/data/features";

export const washtowerFeatures: Feature[] = [
    {
      id: "1",
      title: "빨래할 때마다 세탁, 건조 코스 직접 고르세요?",
      subtitle: "AI 기술로 세탁물의 무게와 재질을 감지해\n세탁부터 건조까지 알아서 완성해줘요.",
      icon: "Cpu",
      tag: "AI 세탁·건조",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525EGP6Z_tromm_ai_pc.mp4",
      posterImage: "/__l5e/assets-v1/b2aa3acd-dcfa-42a4-aa1c-7261913de6a3/ai-washtower-feature1-poster.png",
      showMainMedia: false,
      description:
        "세탁과 건조 모든 과정에 AI 기술을 적용해 더 편리해진 세탁·건조를 완성하고, 결과까지 확인할 수 있어요.",
      highlights: [
        "세탁·건조 모든 과정에 AI 기술 적용",
        "6가지 손빨래 동작으로 정교하게 세탁",
        "바람을 본뜬 6가지 건조 모션으로 꼼꼼하게 건조",
      ],
      tabs: [
        {
          label: "AI 세탁·건조",
          description:
            "세탁과 건조 모든 과정에 AI 기술을 적용해 더 편리해진 세탁·건조를 완성하고, 결과까지 확인할 수 있어요.",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525EGP6Z_tromm_ai_pc.mp4",
          highlights: [
            "세탁·건조 모든 과정에 AI 기술 적용",
            "6가지 손빨래 동작으로 정교하게 세탁",
            "바람을 본뜬 6가지 건조 모션으로 꼼꼼하게 건조",
          ],
          collapsibleDisclaimers: [
            {
              title: "건조 준비 시간 단축",
              items: [
                "'건조준비' 기능은 모든 코스에서 사용 가능하며, 건조 준비 중 예상 건조시간이 건조 시 디스플레이에 표기되는 기능입니다. (건조준비 버튼을 눌러야 하며, 다운로드 코스는 제외)",
                "KATRI 시험 결과, 자사가 제시한 시험기준으로 파자마를 스피드워시 세탁 후 건조준비 옵션을 선택한 후 소량급속 건조 코스로 동작 시, 건조준비 옵션 미적용 대비 세탁+건조시간 평균 65분에서 60분으로 최대 8% 단축",
                "시간 단축효과는 실제 사용환경 및 코스에 따라 다를 수 있음 (다운로드 코스는 제외)",
              ],
            },
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
          label: "AI DD x 6모션",
          descriptionTitle: "섬세한 6모션으로 최적화된 세탁·건조",
          description:
            "6가지 다양한 손빨래 동작으로 정교하게 세탁하며 바람을 본뜬 6가지 건조 모션으로 꼼꼼하게 건조해요.",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525EGP6Z_6motion_pc.mp4",
          highlights: [],
          collapsibleDisclaimers: [
            {
              title: "세부정보",
              items: [
                "AI 세탁 코스는 최대용량 6kg 이하에서 동작하며, 실사용 환경 및 세탁물 종류에 따라 다를 수 있습니다.",
                "AI 세탁은 딥러닝 AI 기술을 이용해 의류의 재질을 감지한 후 6모션 중 최적의 모션으로 세탁하며, 빅데이터 기반 환경에 맞춰 큰 진동을 미리 예측해 안정적으로 탈수합니다.",
                "AI 건조 코스는 AI 타임 센싱 및 AI 시간 안내 기능이 적용되어 있습니다.",
                "설치 조건 및 실사용 조건에 따라 시간은 달라질 수 있습니다.",
              ],
            },
          ],
        },
      ],
      subFeaturesTitle: "AI 세탁·건조 과정에서 제공되는 세부 기능",
      subFeatures: [
        {
          label: "AI 타임 센싱",
          title: "약 3초 만에 알려주는 세탁·건조 예상 시간",
          description:
            "세탁물을 투입 후 문을 닫고 시작 버튼을 누르면 무게를 감지해 약 3초 만에 예상 시간을 알려줍니다.\n세탁기 앞에서 오래 기다릴 필요가 없고, 코스별 시간도 바로 확인할 수 있어 편리해요.",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525EGP6Z_ai_time_sensing.mp4",
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
          label: "AI 시간 안내",
          title: "사용할수록 정교화되는 예상 건조 완료 시간",
          description:
            "건조기에서 AI 건조 코스를 사용할수록 사용자의 건조 패턴을 학습해 예상 건조 완료 시간을 더욱 정교하게 안내해줘요.",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525EGP6Z_ai_time_notice.mp4",
        },
        {
          label: "AI 세탁 리포트",
          title: "한눈에 확인하는 세탁·건조 결과",
          description:
            "세탁·건조가 끝나면 결과를 한눈에 확인할 수 있어요. AI 세탁·건조 코스 사용 시 세탁량, 의류 특성, 세제·유연제 양, 전력 사용량, 오염도까지 세탁·건조 결과를 확인 할 수 있어요.",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525EGP6Z_report_mo.mp4",
          disclaimers: [
            {
              title: "AI 세탁 리포트",
              items: [
                "AI 세탁 리포트는 AI 세탁·건조 코스 사용 후 제공되는 결과 정보로, 세탁물의 종류나 사용 환경에 따라 표시되는 항목과 수치는 차이가 있을 수 있습니다.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "2",
      title: "큰 이불도 넉넉하게 세탁하고 건조할 수 있다면요?",
      subtitle: "세탁 용량과 동일한 25kg 건조 용량으로 많은 양의 세탁물도 여유롭게\n세탁·건조 할 수 있어요.",
      icon: "Expand",
      tag: "25kg 대용량 세탁·건조",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525EGP6Z_25kg_pc.mp4",
      description:
        "세탁 용량과 동일한 25kg 건조 용량으로 많은 양의 세탁물도 여유롭게 세탁·건조 할 수 있어요.",
      highlights: ["국내 최대 용량 세탁기", "국내 최초/국내 최대 용량 건조"],
      disclaimers: [
        "소비자의 이해를 돕기 위해 연출된 영상이며, 제품별 색상 및 스펙은 다를 수 있습니다.",
        "국내 최초 · 국내 최대 용량 건조기 : 국내 판매중인 가정용 의류건조기 기준 ('26년 5월 에너지 관리공단 등록 기준)",
        "국내 최대 용량 세탁기 : 국내 판매중인 전기세탁기(드럼) 기준 ('26년 5월 에너지 관리공단 등록 기준)",
      ],
    },
    {
      id: "3",
      title: "세탁과 건조 코스에 스팀을 더하면 뭐가 달라질까요?",
      subtitle: "물을 끓여 만든 트루스팀과 60℃ 이상\n고온의 물로 의류를 살균 케어해요.",
      icon: "CloudFog",
      tag: "듀얼 트루스팀",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/wash-combo/md10792826/usp/FC2521TX6C_08_true_steam_pc.mp4",
      posterImage: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525EGP6Z_allergy_care.jpg",
      description:
        "물을 끓여 만든 트루스팀과 60℃ 이상 고온의 물로 의류를 살균 케어해요. 세탁부터 건조까지 스팀이 적용된 코스를 선택하거나 옵션 추가해 의류를 관리할 수 있어요.",
      courses: [
        {
          name: "알러지케어 코스",
          type: "세탁 코스",
          description:
            "바이러스, 집먼지진드기와 알러지 유발물질, 유해세균까지 99.99% 살균해 안심하고 세탁할 수 있어요.",
          imageUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525EGP6Z_allergy_care.jpg",
          disclaimers: [
            {
              title: "바이러스 제거-세탁",
              items: [
                "시험 기관 : KATRI (한국의류시험연구원) / 시험 일자 : ‘25년 03월",
                "시험 코스 : 알러지케어",
                "시험 부하 : KS C IEC60456 시험기준 국제 규격 부하 4kg",
                "시험 바이러스 : 바이러스 3종 (인플루엔자 A(H1N1), 아데노(HAdV-C5), 코로나(HCoV-229E)",
                "시험 조건 : 시험실 온도 21°±2C, 시험실 습도 50±15% R.H.",
                "시험 방법 : 바이러스 오염된 면직물 부착하여 알러지케어 코스 동작 후 바이러스 제거 능력 측정",
                "시험 결과 : 바이러스 3종 99.99% 제거",
                "HCoV 바이러스는 코로나바이러스의 일종으로 신종 코로나바이러스 19(COVID-19)에 대한 시험 결과가 아님.",
                "시험결과는 사용환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
            {
              title: "유해세균 살균-세탁",
              items: [
                "시험 기관 : KATRI (한국의류시험연구원) / 시험 일자 : ‘25년 03월",
                "시험 코스 : 알러지케어",
                "시험 부하 : KS C IEC60456 시험기준 국제 규격 부하 4kg",
                "시험 균 : 유해세균 3종 (황색포도상구균, 녹농균, 폐렴간균)",
                "시험 조건 : 시험실 온도 21°±2C, 시험실 습도 50±15% R.H.",
                "시험 방법 : 유해세균 오염된 면직물 부착하여 알러지케어 코스 동작 후 살균력 측정",
                "시험 결과 : 유해세균 3종 99.99% 살균",
                "시험결과는 사용환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
            {
              title: "알러지 유발물질 제거- 세탁",
              items: [
                "시험 기관 : Environmental Allergens Info and Care Inc.(일본소재) / 시험 일자 : ‘25년 03월",
                "시험 코스 : 알러지케어",
                "시험 부하 : KS C IEC60456 시험기준 국제 규격 부하 4kg",
                "시험 알레르겐 : 집먼지진드기 성충, 고양이(Fel d 1), 개(Can f 1), 집먼지진드기(Der f1)",
                "시험 방법 : 집먼지진드기 및 알레르겐이 오염된 면직물 부착하여 알러지케어 코스 동작 후 집먼지진드기 살충 및 알레르겐 제거율 확인",
                "시험 결과 : 집먼지진드기 성충 100% 살충, 고양이(Fel d 1), 개(Can f 1), 집먼지진드기(Der f 1) 알레르겐 99.99% 제거",
                "시험결과는 사용환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
          ],
        },
        {
          name: "스팀살균/스팀리프레쉬 코스",
          type: "건조 코스",
          description:
            "스팀살균 코스를 이용하면 바이러스 및 집먼지진드기, 알레르겐을 99% 제거할 수 있어요. 스팀리프레쉬 코스를 이용하면 매일 빨기 어려운 옷감의 냄새와 생활 속 구김을 제거해줘요.",
          imageUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525EGP6Z_steam.jpg",
          disclaimers: [
            {
              title: "유해세균 살균-건조",
              items: [
                "시험 기관 : UL Solutions, KATRI (한국의류시험연구원) / 시험 일자 : ‘25년 04월",
                "시험 코스 : 스팀살균",
                "시험 부하 : KS C IEC60456 시험기준 국제 규격 부하, UL Solutions 마른상태 4kg / KATRI 마른상태 4kg, 젖은상태 6.5kg",
                "시험 균 : 유해세균 3종 (황색포도상구균, 녹농균, 폐렴간균)",
                "시험 조건 : 시험실 온도 21°±2C, 시험실 습도 50±15% R.H.",
                "시험 방법 : 유해세균 오염된 면직물 부착하여 스팀살균 코스 동작 후 살균력 측정",
                "시험 결과 : 유해세균 3종 99.99% 살균",
                "시험결과는 사용환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
            {
              title: "바이러스 제거-건조",
              items: [
                "시험 기관 : KATRI (한국의류시험연구원) / 시험 일자 : ‘25년 03월",
                "시험 코스 : 스팀살균",
                "시험 부하 : KS C IEC60456 시험기준 국제 규격 부하 마른상태 4kg",
                "시험 바이러스 : 바이러스 3종 (인플루엔자 A(H1N1), 아데노(HAdV-C5), 코로나(HCoV-229E)",
                "시험 조건 : 시험실 온도 21°±2C, 시험실 습도 50±15% R.H.",
                "시험 방법 : 바이러스 오염된 면직물 부착하여 스팀살균 코스 동작 후 바이러스 제거 능력 측정",
                "시험 결과 : 바이러스 3종 99.99% 제거",
                "HCoV-229E 바이러스는 코로나바이러스의 일종으로 신종 코로나바이러스 19(COVID-19)에 대한 시험 결과가 아님.",
                "시험결과는 사용환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
            {
              title: "알러지 유발물질 제거-건조",
              items: [
                "시험 기관 : Environmental Allergens Info and Care Inc. (일본소재) / 시험 일자 : ‘25년 04월",
                "시험 코스 : 스팀살균",
                "시험 부하 : KS C IEC60456 시험기준 국제 규격 부하 마른상태 1.5kg, 젖은상태 2.7kg",
                "시험 알레르겐 : 집먼지진드기 성충, 고양이(Fel d 1), 개(Can f 1), 집먼지진드기(Der f1)",
                "시험 방법 : 집먼지진드기 및 알레르겐이 오염된 면직물 부착하여 스팀살균 코스 동작 후 집먼지진드기 살충 및 알레르겐 제거율 확인",
                "시험 결과 : 집먼지진드기 성충 100% 살충, 고양이(Fel d 1), 개(Can f 1), 집먼지진드기(Der f 1) 알레르겐 99.9% 제거",
                "시험결과는 사용환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
            {
              title: "꽃가루 알레르겐 불활성화-건조",
              items: [
                "시험 기관 : Environmental Allergens Info and Care Inc. (일본소재) / 시험 일자 : ‘25년 04월",
                "시험 코스 : 스팀살균코스",
                "시험 부하 : KS C IEC60456 시험기준 국제 규격 부하 마른상태 4.5kg, 젖은상태 7kg",
                "시험 알레르겐 : 삼나무(Cry j 1), 돼지풀(Amb a 1), 자작나무(Bet v 1), 벼과(Phl p 5)",
                "시험 방법 : 꽃가루 알레르겐이 오염된 면직물 부착하여 스팀살균 코스 동작 후 꽃가루 알레르겐 불활성화율 확인",
                "시험 결과 : 삼나무(Cry j 1), 돼지풀(Amb a 1), 자작나무(Bet v 1), 벼과(Phl p 5) 99% 이상 불활성화",
                "시험결과는 사용환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
            {
              title: "탈취-건조",
              items: [
                "시험 기관 : KATRI (한국의류시험연구원) / 시험 일자 : ‘25년 03월",
                "시험 코스 : 스팀리프레쉬",
                "시험 부하 : KS C IEC60456 표준셔츠 7벌",
                "냄새 분자 : 땀냄새, 담배냄새",
                "시험 조건 : 시험실 온도 21°±2C, 시험실 습도 50±15% R.H.",
                "시험 방법 : 스팀리프레쉬 코스 동작 후 탈취력 측정",
                "시험 결과 : 땀냄새, 담배냄새 99% 제거",
                "시험결과는 사용환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
            {
              title: "구김제거-건조",
              items: [
                "시험 기관 : KATRI (한국의류시험연구원) / 시험 일자 : ‘25년 03월",
                "시험 코스 : 스팀리프레쉬",
                "시험 부하 : KS C IEC60456 표준셔츠 2장, 5장",
                "시험 조건 : 시험실 온도 21°±2C, 시험실 습도 50±15% R.H.",
                "시험 방법 : 자사가 제시한 시험 기준으로, 셔츠 등판 300mm x 300mm 기준 셔츠에 임의 구김을 부여한 후, 셔츠를 무작위로 선택하여 건조기 동작 전, 후 AATCC 시험평가판으로 비교",
                "시험 결과 : 구김정도 시험 전 대비 2배 이상 완화 됨.",
                "시험결과는 사용환경 등에 따라 차이가 있을 수 있습니다.",
              ],
            },
          ],
        },
      ],
      highlights: ["유해세균 살균", "냄새와 구김 케어", "세탁·건조 모두 적용", "위생적인 의류 관리"],
    },
    {
      id: "4",
      title: "매번 세제 양 맞추기, 번거롭지 않으세요?",
      subtitle: "세제와 유연제를 한 번 채워두면 세탁물의 무게와\n오염도를 감지해 자동으로 적정량을 투입해줘요.",
      icon: "Beaker",
      tag: "플랫세제함(자동세제)",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/usp2/WA2525EGP6Z_auto_detergent_pc.jpg",
      posterImage: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/usp2/WA2525EGP6Z_auto_detergent_pc.jpg",
      descriptionTitle: "세제와 유연제를 채워두면\n적정량을 알아서 투입",
      description:
        "세탁물의 무게와 오염도를 감지해 필요한 만큼 자동으로 적정량의 세제를 투입해요. 세제 종류에 따라 투입량도 원하는 대로 설정할 수 있어요.",
      coursesTitle: "자동세제함 사용 예시",
      courses: [
        {
          name: "세제 따로 유연제 따로",
          description: "세제 넣고 다시 또 유연제 넣는 번거로움 없이 세제 따로 유연제 따로 넣어두시면 알아서 투입해 줘요.",
          imageUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/usp2/WA2525EGP6Z_auto_detergent_detail_1_pc.jpg",
        },
        {
          name: "일반 세제 따로 유아 세제 따로",
          description: "어른 옷과 아이 옷을 따로 세탁하듯 세제도 일반 세제와 유아 세제로 분리하여 사용할 수 있어요.",
          imageUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/usp2/WA2525EGP6Z_auto_detergent_detail_2_pc.jpg",
        },
        {
          name: "한 가지 세제로 오래오래",
          description: "세제함도 분리 없이 한 가지 세제로 더 오래 쓸 수 있어요.",
          imageUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/usp2/WA2525EGP6Z_auto_detergent_detail_3_pc.jpg",
        },
      ],
      highlights: ["자동으로 세제/유연제 투입", "플랫세제함 디자인", "편리한 세탁"],
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
          ],
        },
      ],
    },
    {
      id: "5",
      title: "세탁하는 동안 건조기도 미리 준비할 수 있다면?",
      subtitle: "세탁이 끝날 쯤 건조기를 미리 예열해\n드럼 내부 온도를 높여줘요.",
      icon: "Wifi",
      tag: "건조준비",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525EGP6Z_ready2dry.mp4",
      posterImage: "/__l5e/assets-v1/da37e20a-983d-4986-a08e-7b3f755f5164/ai-washtower-feature5-poster.png",
      videoAspectRatio: "16/9",
      videoObjectFit: "cover",
      description:
        "세탁이 끝날 쯤 건조기를 미리 예열해 건조 시간을 줄여줘요.",
      highlights: ["건조 시간 단축", "편리한 세탁 일과"],
      collapsibleDisclaimers: [
        {
          title: "건조 준비 시간 단축",
          items: [
            "'건조준비' 기능은 모든 코스에서 사용 가능하며, 건조 준비 중 예상 건조시간이 건조 시 디스플레이에 표기되는 기능입니다. (건조준비 버튼을 눌러야 하며, 다운로드 코스는 제외)",
            "KATRI 시험 결과, 자사가 제시한 시험기준으로 파자마를 스피드워시 세탁 후 건조준비 옵션을 선택한 후 소량급속 건조 코스로 동작 시, 건조준비 옵션 미적용 대비 세탁+건조시간 평균 65분에서 60분으로 최대 8% 단축",
            "시간 단축효과는 실제 사용환경 및 코스에 따라 다를 수 있음 (다운로드 코스는 제외)",
          ],
        },
      ],
    },
    {
      id: "6",
      title: "모던하고 세련된 인테리어를 원한다면?",
      subtitle: "와이드 디스플레이, 플랫 도어와 플랫 세제함을\n적용해 프리미엄 디자인을 완성했어요.",
      icon: "RectangleHorizontal",
      tag: "All New Full 플랫 디자인",
      mediaType: "image",
      mediaUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525TTP6Z_design_pc.jpg",
      posterImage: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525TTP6Z_design_pc.jpg",
      description:
        "플랫 도어와 플랫 세제함을 적용해 세련되고 깔끔해진 디자인을 만나보세요. 고급스러운 색상을 취향에 맞게 선택해 인테리어를 완성할 수 있어요.",
      highlights: ["모던하고 세련된 프리미엄 디자인", "플랫 도어·플랫 세제함", "와이드 디스플레이", "인테리어 완성"],
      tabsVariant: "underline",
      tabs: [
        {
          label: "플랫 도어와 플랫 세제함으로 깔끔한 디자인",
          mediaType: "image",
          mediaUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525TTP6Z_design_pc.jpg",
        },
        {
          label: "더 커진 와이드 디스플레이",
          mediaType: "video",
          mediaUrl: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525EGP6Z_display_pc.mp4",
          posterImage: "https://www.lge.co.kr/kr/images/wash-tower/md10793829/usp/WA2525TTP6Z_design_pc.jpg",
        },
      ],
      collapsibleDisclaimers: [
        {
          title: "와이드 디스플레이 60% 기준",
          items: [
            "7인치로 커진 와이드 디스플레이 : 기존 모델 (WL22GMZU) 4.3인치 대비 60% 커진 7인치 디스플레이 적용",
          ],
        },
        {
          title: "인체공학 설계",
          items: [
            "인체공학 설계 : 디스플레이 높이 103cm (북미 인간공학 가이드 기준 권장 디스플레이 높이 98~167cm)",
          ],
        },
      ],
    },
    {
      id: "7",
      title: "워시타워 구독하면\n무엇이 좋을까요?",
      subtitle: "가전 케어 매니저가 보이지 않는 부분까지 꼼꼼하게 관리해줘요.",
      icon: "Wrench",
      tag: "가전 구독",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/s-common/caresolution_washtower_260831.mp4",
      posterImage: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/s-common/img_washtower_01_260724.jpg",
      description: "케어 매니저가 방문하여 전문 장비를 활용해 고객이 직접하기 어려운 부분까지 꼼꼼하게 관리해 드려요.",
      highlights: [
        "LG전자에서 연구한 전용 관리제 사용",
        "세제함, 필터 등을 스팀 케어",
        "필터 교체 주기에 맞춰 필터 교체",
        "무상 A/S까지 제공",
      ],
      disclaimers: [],
      collapsibleDisclaimers: [
        {
          title: "세부정보",
          items: [
            "· 직수/고압세척 적용 모델 : 26년 6월 출시 워시타워 WA2525** 6P* 한정",
            "· Intetek에서 2024년 4월 및 2026년 6월 인공 오염 누적 조건으로 드럼 케어 및 직수/고압 세척의 세척력을 시험한 결과, 직수/고압 세척은 드럼 케어 대비 11% 우수했으며, 2024년 드럼 케어 세척력 기준 환산 시 분해 세척 대비 90% 수준의 세척력을 확인했으나, 세척률 및 오염 정도는 사용 환경에 따라 차이가 있을 수 있습니다.",
            "· 방문 관리는 사전 안내드리고 있으며, 고객 요청에 의해 협의된 일정으로 변경하실 수 있습니다.",
            "· UV 적용 모델 : 26년 6월 출시 워시타워 WA2525** 6P* 한정",
            "· 내시경 카메라 점검 적용 모델 : 26년 6월 출시 워시타워 WA2525** 6P* 한정",
            "· 배수 필터 : 24개월 주기 교체",
            "· 건조 필터 : 최초 방문 시 1회 교체",
            "· 제품 점검 적용 모델 : 26년 6월 출시 워시타워 WA2525** 6P* 한정",
            "· 무상 철거 및 재설치는 가전 구독 고객에 한하여 계약기간 내 1회 무상 제공 (운송비 별도) 해드립니다.",
            "· 운송 서비스를 희망할 경우 유상 제공되며 비용은 고객 부담입니다.",
            "· 제품 설치 환경에 따라 추가 비용이 발생할 수 있습니다.",
            "· 무상 A/S는 가전 구독 고객에 한하며, 고객 과실로 인한 제품 고장은 제외됩니다.",
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
          title: "UV/스팀 케어",
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
          url: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/s-common/img_washtower_05_260724.jpg",
          title: "제품 점검",
        },
        {
          url: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/s-common/img_washtower_06_260724.jpg",
          title: "무상 철거 및 재설치",
        },
        {
          url: "https://www.lge.co.kr/kr/main/caresolution/renew_2206/assets/rmsf2026/s-common/img_washtower_07_260724.jpg",
          title: "무상 A/S",
        },
      ],
    },
  ];
