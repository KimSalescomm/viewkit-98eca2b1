/**
 * cooking 제품 카드·상세 문구 편집 파일.
 * title: 질문형 제목 / subtitle: 부제 / tag: 기능명 / description: 상세 설명
 * highlights: 핵심만 쏙 / tabs: 탭별 내용 / disclaimers: 유의사항
 * 문구만 수정할 때 id는 변경하지 마세요. 카드 순서는 featureCardConfig.ts에서 관리합니다.
 */
import type { Feature } from "@/data/features";

export const cookingFeatures: Feature[] = [
    {
      id: "21",
      title: "대용량 수납",
      subtitle: "한 번에 더 많이",
      icon: "Maximize2",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop",
      description:
        "넓은 내부 공간으로 가족 식사 후 많은 식기를 한 번에 세척할 수 있어요. 다양한 랙 구성으로 효율적인 공간 활용이 가능해요.",
      highlights: ["15인용 대용량", "3단 랙 시스템", "높이 조절 가능", "다양한 식기 수납"],
    },
    {
      id: "22",
      title: "쿼드워시 시스템",
      subtitle: "완벽한 세척력",
      icon: "Sparkles",
      mediaType: "video",
      mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      description:
        "4방향 회전 노즐이 구석구석 강력하게 세척해요. 찌든 때도 깨끗하게 제거하여 손세척보다 더 위생적이에요.",
      highlights: ["4방향 회전 분사", "고압 세척", "99.9% 살균", "에너지 절약"],
    },
  ];
