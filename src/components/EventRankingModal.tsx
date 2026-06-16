import { useEffect, useState } from "react";
import { Trophy, RefreshCw, X, Activity } from "lucide-react";
import { useStoreRanking } from "@/hooks/useStoreRanking";
import { RANKING_CONFIG, getCurrentMonthRange } from "@/data/event";
import { getCurrentStore } from "@/utils/storeId";
import { isAdminStore, getBranchNameByCode, cleanBranchName } from "@/data/branches";

interface Props {
  open: boolean;
  onClose: () => void;
}

const fmtTime = (ts: number | null) => {
  if (!ts) return "—";
  const diff = Math.floor((Date.now() - ts) / 60000);
  if (diff <= 0) return "방금 전";
  if (diff < 60) return `${diff}분 전`;
  const h = Math.floor(diff / 60);
  return `${h}시간 전`;
};

const EventRankingModal = ({ open, onClose }: Props) => {
  const { rows, loading, updatedAt, refresh } = useStoreRanking(open);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!open) return;
    const t = window.setInterval(() => setTick((v) => v + 1), 60000);
    return () => window.clearInterval(t);
  }, [open]);

  if (!open) return null;

  const store = getCurrentStore();
  const mySlug = (store?.slug || "").toUpperCase();
  const myName = store?.name || getBranchNameByCode(mySlug) || "";
  const { label } = getCurrentMonthRange();

  const top5 = rows.slice(0, 5);
  const myRankIndex = rows.findIndex((r) => r.store_id === mySlug);
  const inTop5 = myRankIndex >= 0 && myRankIndex < 5;

  return (
    <div
      className="fixed inset-0 z-[130] overflow-y-auto overscroll-contain bg-slate-900/15 backdrop-blur-md animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="min-h-full flex items-center justify-center px-5 py-6">
        <div className="relative w-full max-w-md bg-white rounded-[28px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(15,23,42,0.3)] border border-gray-100 animate-in zoom-in-95 duration-200 my-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-4 right-4 z-10 w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/90 hover:bg-gray-100 text-gray-500 border border-gray-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header — 밝은 화이트 + LG 레드 액센트 */}
        <div className="relative px-7 pt-9 pb-7 bg-white border-b border-slate-100">
          <div className="relative flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[10.5px] font-bold tracking-[0.18em] uppercase text-emerald-600 mb-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              LIVE
            </div>
            <div className="w-14 h-14 rounded-2xl bg-brand flex items-center justify-center shadow-[0_12px_28px_-8px_hsl(var(--brand) / 0.45)] mb-4">
              <Activity className="w-7 h-7 text-white" strokeWidth={2.4} />
            </div>
            <h2
              className="text-[20px] sm:text-[22px] font-extrabold text-slate-900 leading-snug"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
            >
              {RANKING_CONFIG.title}
            </h2>
            <p
              className="mt-2 text-[13px] text-slate-500 leading-relaxed"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
            >
              {RANKING_CONFIG.subtitle}
            </p>
            <p className="mt-3 text-[11px] font-semibold text-slate-400">
              {label} 누적 · 지점별 고유 세션 기준
            </p>
          </div>
        </div>


        {/* Ranking list */}
        <div className="px-6 pt-5 pb-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-bold text-slate-700">TOP 5</span>
            <button
              type="button"
              onClick={() => void refresh()}
              className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 transition-colors"
              disabled={loading}
            >
              <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
              <span data-tick={tick}>{fmtTime(updatedAt)} 기준</span>
            </button>
          </div>

          <ol className="space-y-1.5">
            {loading && rows.length === 0 && (
              <li className="text-center py-8 text-sm text-slate-400">집계 중...</li>
            )}
            {!loading && rows.length === 0 && (
              <li className="text-center py-8 text-sm text-slate-400">아직 집계된 데이터가 없어요</li>
            )}
            {top5.map((r, i) => {
              const isMine = !!mySlug && r.store_id === mySlug;
              return (
                <li
                  key={r.store_id}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-colors ${
                    isMine
                      ? "bg-brand/10 border-brand/40 shadow-sm shadow-brand/10"
                      : i === 0
                        ? "bg-brand/5 border-brand/20 shadow-sm"
                        : "bg-slate-50 border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-6 text-center text-[14px] font-extrabold tabular-nums ${
                        isMine ? "text-brand" : i === 0 ? "text-brand" : "text-slate-400"
                      }`}
                    >
                      {i + 1}
                    </span>
                    {i === 0 && !isMine && <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                    <span
                      className={`truncate text-[14px] font-semibold ${
                        isMine ? "text-brand" : "text-slate-900"
                      }`}
                      style={{ wordBreak: "keep-all" }}
                    >
                      {cleanBranchName(r.store_name)}
                      {isMine && (
                        <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-brand text-white align-middle">
                          우리 매장
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <div
                      className={`text-[13px] font-extrabold tabular-nums ${
                        isMine ? "text-brand" : i === 0 ? "text-brand" : "text-slate-900"
                      }`}
                    >
                      {r.sessions.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      접속
                    </div>
                  </div>
                </li>

              );
            })}
          </ol>

          {/* 본인 매장이 TOP5 밖일 때 */}
          {mySlug && !isAdminStore(mySlug) && myRankIndex >= 0 && !inTop5 && (
            <div className="mt-3 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-brand/5 border border-brand/30">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-6 text-center text-[13px] font-extrabold text-brand tabular-nums">
                  {myRankIndex + 1}
                </span>
                <span className="truncate text-[13.5px] font-semibold text-brand">
                  {cleanBranchName(myName)}
                  <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-brand text-white align-middle">
                    우리 매장
                  </span>
                </span>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[13px] font-extrabold text-brand tabular-nums">
                  {rows[myRankIndex].sessions.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400">접속</div>
              </div>
            </div>
          )}
        </div>

        {/* CTA line — 참여 독려 (행사/혜택 표현 없음) */}
        {RANKING_CONFIG.ctaLine && (
          <p className="px-6 mt-4 text-center text-[12.5px] font-semibold text-slate-600 leading-relaxed">
            {RANKING_CONFIG.ctaLine}
          </p>
        )}

        <div className="px-6 pb-6 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full h-12 rounded-2xl bg-brand hover:bg-brand-dark text-white text-[15px] font-bold tracking-tight transition-colors shadow-lg shadow-brand/25 active:scale-[0.98]"
          >
            확인
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default EventRankingModal;
