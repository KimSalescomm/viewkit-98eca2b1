/**
 * 공통 타이포그래피 / 라벨 스타일 가이드
 *
 * 4단계 타입 스케일만 사용합니다.
 *  - Display  28px bold   : 페이지 메인 타이틀
 *  - Heading  18px bold   : 섹션 타이틀
 *  - Body     14px reg/med: 설명문, 탭 라벨, 리스트 항목, 버튼 텍스트
 *  - Caption  12px        : eyebrow, BEFORE/AFTER, 케어 전/후, 이미지 캡션, 배지
 *
 * 컬러 의미 규칙
 *  - 레드 배경 + 흰 텍스트 = 클릭 가능한 액션(버튼, 탭 선택 상태)
 *  - 레드 텍스트만        = 카테고리/타입 라벨 (CARE SERVICE, AFTER 등)
 *  - 회색 텍스트          = 보조 설명 (비활성 의미로 쓰지 않음)
 */

export const typeDisplay = "text-[28px] font-bold leading-tight tracking-[-0.02em]";
export const typeHeading = "text-[18px] font-bold leading-snug tracking-[-0.01em]";
/** 섹션 대제목 (예: "세탁기 케어서비스") */
export const typeSectionTitle = "text-[22px] sm:text-[24px] font-bold leading-snug tracking-[-0.02em]";
export const typeBody = "text-[14px] font-normal leading-relaxed";
export const typeBodyMedium = "text-[14px] font-medium leading-relaxed";
export const typeBodySemibold = "text-[14px] font-semibold leading-relaxed";
export const typeCaption = "text-[12px] font-medium leading-normal";
export const typeCaptionBold = "text-[12px] font-bold leading-normal";

/** 카테고리 eyebrow 라벨 (레드 텍스트만) */
export const labelEyebrow = `${typeCaptionBold} tracking-[0.2em] uppercase text-brand-accent`;

/** 보조 캡션 (회색) */
export const labelCaptionMuted = `${typeCaption} text-gray-500`;

/** 클릭 가능한 액션 배지/버튼 (레드 배경 + 흰 텍스트) */
export const actionPill =
  "inline-flex items-center justify-center gap-1 rounded-lg px-2.5 h-7 text-[12px] font-bold text-white bg-brand-accent transition-colors";

/** 액션 배지와 동일한 규격의 아이콘 전용 배지 */
export const actionIconPill =
  "inline-flex items-center justify-center rounded-lg w-7 h-7 text-white bg-brand-accent transition-colors";

/** 배지/버튼 내부 아이콘 크기 */
export const actionIconSize = "w-3.5 h-3.5";
