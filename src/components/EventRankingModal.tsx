import { useEffect, useState } from "react";
import { Trophy, RefreshCw, X, Sparkles } from "lucide-react";
import { useStoreRanking } from "@/hooks/useStoreRanking";
import { ACCESS_RANKING_EVENT, isEventActive } from "@/data/event";
import { getCurrentStore } from "@/utils/storeId";
import { isAdminStore, getBranchNameByCode } from "@/data/branches";

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

  // "n분 전" 라벨 1분마다 갱신
  useEffect(() => {
    if (!open) return;
    const t = window.setInterval(() => setTick((v) => v + 1), 60000);
    return () => window.clearInterval(t);
  }, [open]);

  if (!open) return null;

  const store = getCurrentStore();
  const mySlug = (store?.slug || "").toUpperCase();
  const myName = store?.name || getBranchNameByCode(mySlug) || "";

  const top5 = rows.slice(0, 5);
  const myRankIndex = rows.findIndex((r) => r.store_id === mySlug);
  const inTop5 = myRankIndex >= 0 && myRankIndex < 5;

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center bg-black/45 backdrop-blur-sm px-5 py-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-white rounded-[28px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(15,23,42,0.3)] border border-gray-100 animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-4 right-4 z-10 w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/90 hover:bg-gray-100 text-gray-500 border border-gray-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="relative px-7 pt-9 pb-7 overflow-hidden bg-[radial-gradient(ellipse_at_top,_#FFF6E0_0%,_#FFE8C2_55%,_#F8D78A_100%)]">
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[radial-gradient(circle,_rgba(232,169,51,0.35)_0%,_rgba(232,169,51,0)_70%)] pointer-events-none" />
          <div className="relative flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur text-[10.5px] font-black tracking-[0.28em] uppercase text-[#A50034] mb-3">
              <Sparkles className="w-3 h-3" /> Live Ranking
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFD66B] to-[#E8A933] flex items-center justify-center shadow-[0_10px_24px_-8px_rgba(184,122,20,0.6)] mb-3">
              <Trophy className="w-7 h-7 text-white" strokeWidth={2.4} />
            </div>
            <h2
              className="text-[20px] sm:text-[22px] font-extrabold text-gray-900 leading-snug"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
            >
              {ACCESS_RANKING_EVENT.title}
            </h2>
            <p
              className="mt-2 text-[13px] text-gray-600 leading-relaxed"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
            >
              {ACCESS_RANKING_EVENT.subtitle}
            </p>
            <p className="mt-3 text-[11.5px] font-semibold text-gray-500">
              {ACCESS_RANKING_EVENT.startAt.replace(/-/g, ".")} ~ {ACCESS_RANKING_EVENT.endAt.replace(/-/g, ".")}
              {!isEventActive() && (
                <span className="ml-2 text-[10.5px] px-1.5 py-0.5 rounded-full bg-gray-200 text-gray-500">
                  기간 외 미리보기
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Ranking list */}
        <div className="px-6 pt-5 pb-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-bold text-gray-700">실시간 TOP 5</span>
            <button
              type="button"
              onClick={() => void refresh()}
              className="inline-flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-800 transition-colors"
              disabled={loading}
            >
              <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
              <span data-tick={tick}>{fmtTime(updatedAt)} 기준</span>
            </button>
          </div>

          <ol className="space-y-1.5">
            {loading && rows.length === 0 && (
              <li className="text-center py-8 text-sm text-gray-400">집계 중...</li>
            )}
            {!loading && rows.length === 0 && (
              <li className="text-center py-8 text-sm text-gray-400">아직 집계된 데이터가 없어요</li>
            )}
            {top5.map((r, i) => {
              const isMine = !!mySlug && r.store_id === mySlug;
              const medal = ["🥇", "🥈", "🥉"][i];
              return (
                <li
                  key={r.store_id}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-colors ${
                    isMine
                      ? "bg-[#A50034]/5 border-[#A50034]/40"
                      : i === 0
                        ? "bg-[#FFF7E1] border-[#F2C75A]/60"
                        : "bg-gray-50 border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-7 text-center text-[15px] font-extrabold ${i === 0 ? "text-[#B8860B]" : "text-gray-400"}`}>
                      {medal ?? i + 1}
                    </span>
                    <span
                      className={`truncate text-[14px] font-semibold ${isMine ? "text-[#A50034]" : "text-gray-900"}`}
                      style={{ wordBreak: "keep-all" }}
                    >
                      {r.store_name}
                      {isMine && (
                        <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-[#A50034] text-white align-middle">
                          우리 매장
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`text-[13px] font-extrabold ${isMine ? "text-[#A50034]" : "text-gray-900"}`}>
                      {r.sessions.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-gray-400">접속</div>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* 본인 매장이 TOP5 밖일 때 */}
          {mySlug && !isAdminStore(mySlug) && myRankIndex >= 0 && !inTop5 && (
            <div className="mt-3 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#A50034]/5 border border-[#A50034]/30">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-7 text-center text-[13px] font-extrabold text-[#A50034]">
                  {myRankIndex + 1}
                </span>
                <span className="truncate text-[13.5px] font-semibold text-[#A50034]">
                  {myName}
                  <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-[#A50034] text-white align-middle">
                    우리 매장
                  </span>
                </span>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[13px] font-extrabold text-[#A50034]">
                  {rows[myRankIndex].sessions.toLocaleString()}
                </div>
                <div className="text-[10px] text-gray-400">접속</div>
              </div>
            </div>
          )}
        </div>

        {/* Prize line */}
        {ACCESS_RANKING_EVENT.prizeLine && (
          <div className="mx-6 mt-4 mb-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#FFF1D6] to-[#FFE0B0] text-[12.5px] font-semibold text-[#8B5A12] text-center leading-relaxed">
            {ACCESS_RANKING_EVENT.prizeLine}
          </div>
        )}

        <div className="px-6 pb-6 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full h-12 rounded-2xl bg-[#A50034] hover:bg-[#8a002b] text-white text-[15px] font-bold tracking-tight transition-colors shadow-[0_10px_24px_-10px_rgba(165,0,52,0.55)]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventRankingModal;
