/**
 * refrigerator 제품 카드·상세 문구 편집 파일.
 * title: 질문형 제목 / subtitle: 부제 / tag: 기능명 / description: 상세 설명
 * highlights: 핵심만 쏙 / tabs: 탭별 내용 / disclaimers: 유의사항
 * 문구만 수정할 때 id는 변경하지 마세요. 카드 순서는 featureCardConfig.ts에서 관리합니다.
 */
import type { Feature } from "@/data/features";

export const refrigeratorFeatures: Feature[] = [
    {
      id: "10",
      title: "냉장고를 구독하면\n무엇이 좋을까요?",
      subtitle: "필터부터 청소까지, 전문가가 알아서\n챙겨주는 전문 케어를 보여드려요.",
      icon: "Wrench",
      tag: "가전 구독",
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
      id: "7",
      title: "매번 물 채우기, 번거롭지 않나요?",
      subtitle: "물통 없이 스스로 채우는 편리한\n직수형 냉장고 STEM을 확인해보세요.",
      icon: "Seedling",
      tag: "자동 제빙",
      mediaType: "video",
      mediaUrl: "https://static.lge.co.kr/kr/images/refrigerators/md10364835/M825_582_filter.mp4",
      description:
        "STEM 냉장고는 고여 있는 물이 아닌, 흐르는 물로 얼음을 만드는 위생적인 제빙 시스템을 갖추고 있어요.\n게다가 매번 물을 채워 넣을 필요 없이 알아서 얼음이 만들어져 더 편리하게 시원한 시간을 누릴 수 있어요.",
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
      description:
        "STEM 얼음정수, STEM 베이직, STEM 베이직 Fit & Max의 냉장고 용량, 정수기 디스펜서, 얼음 종류, 정수 필터, 케어 서비스를 비교해보세요.",
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
      tabs: [
        {
          label: "사진으로 보기",
          mediaType: "gallery",
          description:
            "수도관 매립 여부, 냉장고와 싱크대의 거리 등 환경에 따라 STEM 설치는 달라져요. 가구색과 유사한 몰딩을 이용해 수도관이 드러나지 않도록 깔끔하게 마감해요.",
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
        },
        {
          label: "영상으로 보기",
          mediaType: "video",
          mediaUrl: "https://static.lge.co.kr/kr/story/trend/lg-refrigerators-dios-stem/stem_install.webm",
          description:
            "설치 과정을 영상으로 확인해보세요. 수도관 연결부터 몰딩 마감까지 실제 설치 흐름을 한눈에 볼 수 있어요.",
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
      tag: "Fit & Max",
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
      tag: "프리미엄 기능",
      mediaType: "video",
      mediaUrl: "https://www.lge.co.kr/kr/images/refrigerators/md10604864/M876_181_aicare_pc.mp4",
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
          items: ["기존 크기 (100x30x7 mm) x 2개 / 신규 크기 : (150x70x8 mm) x 1개 비교 시"],
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
  ];
