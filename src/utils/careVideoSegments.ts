// 케어 서비스 영상 구간(시작·종료 초) 관련 순수 로직
// - 고객용 화면(CareProcessSection)과 관리자 설정 화면이 같은 규칙을 공유합니다.

export interface CareVideoSegment {
  videoUrl: string;
  startSeconds: number;
  /** null이면 영상 끝까지 재생 */
  endSeconds: number | null;
}

export interface CareVideoSegmentRow {
  product_id: string;
  care_service_id: string;
  video_url: string;
  start_seconds: number;
  end_seconds: number | null;
}

/** DB 행 목록을 careServiceId → 구간 맵으로 변환 */
export const toSegmentMap = (
  rows: CareVideoSegmentRow[],
): Record<string, CareVideoSegment> => {
  const map: Record<string, CareVideoSegment> = {};
  for (const row of rows) {
    map[row.care_service_id] = {
      videoUrl: row.video_url,
      startSeconds: Number(row.start_seconds) || 0,
      endSeconds:
        row.end_seconds === null || row.end_seconds === undefined
          ? null
          : Number(row.end_seconds),
    };
  }
  return map;
};

/**
 * 케어 항목에 적용할 영상 URL 결정
 * 우선순위: 관리자가 저장한 구간의 URL → 케어별 개별 영상 → 공통 영상
 */
export const resolveVideoUrl = (
  segment: CareVideoSegment | undefined,
  stepVideoUrl: string | undefined,
  commonVideoUrl: string | undefined,
): string | undefined =>
  segment?.videoUrl || stepVideoUrl || commonVideoUrl || undefined;

/** "분:초" 또는 "분:초.소수" 문자열을 초로 변환. 유효하지 않으면 null */
export const parseTimeInput = (input: string): number | null => {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const match = /^(\d{1,3}):([0-5]?\d)(?:\.(\d{1,2}))?$/.exec(trimmed);
  if (!match) return null;
  const minutes = Number(match[1]);
  const seconds = Number(match[2]);
  const frac = match[3] ? Number(`0.${match[3]}`) : 0;
  return minutes * 60 + seconds + frac;
};

/** 초 → "분:초" 문자열 (소수점 첫째 자리까지) */
export const formatTimeInput = (totalSeconds: number | null): string => {
  if (totalSeconds === null || !Number.isFinite(totalSeconds)) return "";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  const secStr =
    seconds % 1 === 0
      ? String(seconds).padStart(2, "0")
      : seconds.toFixed(1).padStart(4, "0");
  return `${minutes}:${secStr}`;
};

/**
 * 구간 저장 전 검증. 유효하면 null, 아니면 에러 메시지 반환.
 * duration을 알 수 있으면(초) 종료 시간이 영상 길이를 넘지 않는지도 확인합니다.
 */
export const validateSegment = (
  startSeconds: number,
  endSeconds: number | null,
  durationSeconds?: number,
): string | null => {
  if (!Number.isFinite(startSeconds) || startSeconds < 0)
    return "시작 시간은 0초 이상이어야 합니다.";
  if (endSeconds !== null) {
    if (!Number.isFinite(endSeconds) || endSeconds <= startSeconds)
      return "종료 시간은 시작 시간보다 늦어야 합니다.";
    if (
      durationSeconds !== undefined &&
      Number.isFinite(durationSeconds) &&
      endSeconds > durationSeconds + 0.05
    )
      return "종료 시간이 영상 길이를 초과합니다.";
  }
  return null;
};

/** 재생 위치가 종료 시점에 도달했는지 (약간의 오차 허용) */
export const hasReachedEnd = (
  currentTime: number,
  endSeconds: number | null,
): boolean => endSeconds !== null && currentTime >= endSeconds - 0.05;
