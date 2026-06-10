// 접속 BEST 5 실시간 랭킹 설정 (참여 독려용 · 행사/이벤트 아님)
// 기간은 "이번 달 1일 00:00 ~ 현재" 자동 계산.

export interface RankingConfig {
  title: string;
  subtitle: string;
  ctaLine?: string;
}

export const RANKING_CONFIG: RankingConfig = {
  title: "실시간 접속 BEST 5",
  subtitle: "지금 View Kit을 가장 많이 활용하고 있는 지점이에요.",
  ctaLine: "우리 매장도 함께 활용해 순위에 도전해 보세요!",
};

/** 이번 달 1일 00:00 (KST) ~ 이번 달 말일 23:59 (KST) 범위를 ISO 문자열로 반환 */
export const getCurrentMonthRange = (): { startISO: string; endISO: string; label: string } => {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth(); // 0-indexed
  const pad = (n: number) => String(n).padStart(2, "0");
  const lastDay = new Date(y, m + 1, 0).getDate();
  const startISO = `${y}-${pad(m + 1)}-01T00:00:00+09:00`;
  const endISO = `${y}-${pad(m + 1)}-${pad(lastDay)}T23:59:59+09:00`;
  const label = `${y}.${pad(m + 1)}`;
  return { startISO, endISO, label };
};
