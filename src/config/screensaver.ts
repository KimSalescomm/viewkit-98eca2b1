// 화면 보호기(스크린세이버) 설정
// - 일정 시간(IDLE_MS) 동안 사용자의 조작이 없으면 ScreensaverOverlay가 전면에 노출됩니다.
// - 영상 목록을 추가하면 순환 재생됩니다. (세로형 9:16 영상 권장)
// - 사용자가 화면을 터치/클릭/키 입력하면 즉시 해제됩니다.

export interface ScreensaverVideo {
  /** 영상 URL (mp4/webm 권장, 또는 YouTube URL) */
  src: string;
  /** YouTube 영상이면 true */
  youtube?: boolean;
  /** 로딩 전 표시할 포스터 이미지 (선택) */
  poster?: string;
}

/** 화면 보호기 활성화 여부 */
export const SCREENSAVER_ENABLED = true;

/** 무동작 후 화면 보호기 진입까지의 시간 (ms) */
export const SCREENSAVER_IDLE_MS = 90_000;

/** 순환 재생할 영상 목록 */
export const SCREENSAVER_VIDEOS: ScreensaverVideo[] = [
  // 예시: 아래에 세로형 광고 영상을 추가하세요.
  // { src: "https://example.com/ad-vertical-1.mp4" },
  // { src: "https://www.youtube.com/watch?v=XXXX", youtube: true },
];
