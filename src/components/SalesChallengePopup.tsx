import { useEffect, useState } from "react";
import { Trophy, X, Sparkles } from "lucide-react";
import { getSales } from "@/utils/salesLog";
import { getBranchCode, isAdminStore } from "@/data/branches";

interface Props {
  currentStoreSlug?: string | null;
  currentStoreName?: string | null;
}

const DISMISS_KEY = "viewkit_sales_challenge_dismissed_leader";

const SalesChallengePopup = ({ currentStoreSlug, currentStoreName }: Props) => {
  const [open, setOpen] = useState(false);
  const [leaderBranch, setLeaderBranch] = useState<string | null>(null);
  const [leaderCount, setLeaderCount] = useState(0);

  useEffect(() => {
    // 지점 미설정 / 관리자(SC)는 표시하지 않음
    if (!currentStoreSlug) return;
    if (isAdminStore(currentStoreSlug)) return;

    let cancelled = false;
    (async () => {
      const sales = await getSales();
      if (cancelled) return;
      if (sales.length === 0) return;

      // 지점별 카운트
      const counts = new Map<string, number>();
      sales.forEach((s) => {
        counts.set(s.branch, (counts.get(s.branch) || 0) + 1);
      });
      const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
      const [topBranch, topCount] = sorted[0] || [];
      if (!topBranch) return;

      // "다음에 보지 않기" — 같은 1위에 한해 영구 숨김
      try {
        const dismissed = localStorage.getItem(DISMISS_KEY);
        if (dismissed === topBranch) return;
      } catch { /* noop */ }

      setLeaderBranch(topBranch);
      setLeaderCount(topCount);
      setOpen(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [currentStoreSlug]);

  const handleDismissForever = () => {
    try {
      if (leaderBranch) localStorage.setItem(DISMISS_KEY, leaderBranch);
    } catch { /* noop */ }
    setOpen(false);
  };

  if (!open || !leaderBranch) return null;

  const isLeader = currentStoreName === leaderBranch;
  const leaderCode = getBranchCode(leaderBranch);

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 backdrop-blur-sm px-5 py-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sales-challenge-title"
    >
      <div className="relative w-full max-w-md bg-white rounded-[28px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(165,0,52,0.35)] animate-in zoom-in-95 duration-200">
        {/* Close (X) */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-10 w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="닫기"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Top accent / leader banner */}
        <div className="relative bg-gradient-to-br from-[#A50034] via-[#C8104A] to-[#7A0026] px-7 pt-9 pb-8 text-white overflow-hidden">
          {/* Decorative sparkles */}
          <Sparkles className="absolute top-6 left-6 w-4 h-4 text-white/30" />
          <Sparkles className="absolute bottom-6 right-10 w-3 h-3 text-white/40" />

          <div className="relative flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center mb-4 shadow-inner">
              <Trophy className="w-8 h-8 text-[#FFD66B]" strokeWidth={2.2} />
            </div>
            <p className="text-[11px] font-black tracking-[0.25em] uppercase text-white/80 mb-2">
              SALES RANKING
            </p>
            <h2
              id="sales-challenge-title"
              className="text-[22px] sm:text-2xl font-extrabold leading-snug"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
            >
              현재 판매인증 1위 지점은
            </h2>
            <div className="mt-4 inline-flex items-center gap-2 bg-white text-[#A50034] px-5 py-2 rounded-full shadow-md">
              <span className="text-lg font-extrabold tracking-tight">{leaderBranch}</span>
              {leaderCode && (
                <span className="text-[10px] font-bold tracking-wider bg-[#FBE8EE] text-[#A50034] px-2 py-0.5 rounded-md">
                  {leaderCode}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm font-medium text-white/85">
              누적 인증 <span className="font-extrabold text-white">{leaderCount}건</span>
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-7 pt-7 pb-6 text-center">
          {isLeader ? (
            <>
              <p
                className="text-[18px] sm:text-xl font-extrabold text-gray-900 leading-snug"
                style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
              >
                🏆 우리 매장이 1위예요!
              </p>
              <p className="mt-2 text-sm text-gray-500 font-medium leading-relaxed">
                계속해서 판매인증을 이어가 1위 자리를 지켜주세요.
              </p>
            </>
          ) : (
            <>
              <p
                className="text-[18px] sm:text-xl font-extrabold text-gray-900 leading-snug"
                style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
              >
                판매인증에 도전해 보세요!
              </p>
              <p className="mt-2 text-sm text-gray-500 font-medium leading-relaxed">
                지금 우리 매장도 도전하면 1위가 될 수 있어요.
              </p>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="px-7 pb-7 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full h-12 rounded-2xl bg-[#A50034] hover:bg-[#8a002b] text-white text-[15px] font-bold tracking-tight transition-colors shadow-[0_8px_20px_-8px_rgba(165,0,52,0.6)]"
          >
            확인
          </button>
          <button
            type="button"
            onClick={handleDismissForever}
            className="w-full h-10 rounded-xl text-[13px] font-semibold text-gray-400 hover:text-gray-700 transition-colors"
          >
            다음에 보지 않기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesChallengePopup;
