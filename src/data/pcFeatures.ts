/**
 * pc 제품 카드·상세 문구 편집 파일.
 * title: 질문형 제목 / subtitle: 부제 / tag: 기능명 / description: 상세 설명
 * highlights: 핵심만 쏙 / tabs: 탭별 내용 / disclaimers: 유의사항
 * 문구만 수정할 때 id는 변경하지 마세요. 카드 순서는 featureCardConfig.ts에서 관리합니다.
 */
import type { Feature } from "@/data/features";

export const pcFeatures: Feature[] = [
    {
      id: "19",
      title: "최신 게이밍 성능",
      subtitle: "RTX 4090 탑재",
      icon: "Monitor",
      mediaType: "video",
      mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      description:
        "최신 NVIDIA RTX 4090 그래픽카드와 인텔 13세대 프로세서로 AAA 게임을 최고 옵션에서 플레이할 수 있어요. 레이트레이싱과 DLSS 3.0을 지원해요.",
      highlights: ["RTX 4090 GPU", "인텔 i9-13900K", "DDR5 32GB RAM", "레이트레이싱 지원"],
    },
    {
      id: "20",
      title: "RGB 쿨링 시스템",
      subtitle: "화려하고 시원하게",
      icon: "Palette",
      mediaType: "image",
      mediaUrl: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1200&h=800&fit=crop",
      description:
        "수냉식 쿨러와 RGB 팬으로 강력한 냉각 성능과 화려한 비주얼을 동시에 제공해요. 소프트웨어로 다양한 라이팅 효과를 설정할 수 있어요.",
      highlights: ["360mm 수냉 쿨러", "RGB 팬 6개", "스마트 온도 제어", "커스터마이징 라이팅"],
    },
  ];
