// 접속 1위 지점 행사 이벤트 설정 (코드 관리)
// 기간 내에만 팝업/배지 노출되며, 종료 후 자동 비활성화됩니다.

export interface AccessRankingEvent {
  id: string;            // localStorage key 식별자 (월 변경 시 새 id)
  title: string;         // 메인 타이틀
  subtitle: string;      // 보조 설명
  startAt: string;       // ISO date (포함)
  endAt: string;         // ISO date (포함, 23:59까지)
  prizeLine?: string;    // 1위 혜택 한 줄
}

export const ACCESS_RANKING_EVENT: AccessRankingEvent = {
  id: "access-rank-2026-06",
  title: "접속 1위 지점 행사",
  subtitle: "이번 달 가장 많이 View Kit을 활용한 지점을 응원해 주세요!",
  startAt: "2026-06-01",
  endAt: "2026-06-30",
  prizeLine: "월말 1위 지점에는 특별 혜택이 준비되어 있어요 🎁",
};

export const isEventActive = (e: AccessRankingEvent = ACCESS_RANKING_EVENT): boolean => {
  const now = new Date();
  const start = new Date(`${e.startAt}T00:00:00+09:00`);
  const end = new Date(`${e.endAt}T23:59:59+09:00`);
  return now >= start && now <= end;
};
