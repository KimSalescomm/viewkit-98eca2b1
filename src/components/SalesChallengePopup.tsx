import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getSales } from "@/utils/salesLog";
import { getBranchCode, isAdminStore } from "@/data/branches";

interface Props {
  currentStoreSlug?: string | null;
  currentStoreName?: string | null;
}

const DISMISS_KEY = "viewkit_sales_challenge_dismissed_leader";

// 입체적인 3D 황금 트로피 (인라인 SVG · 그라데이션 · 하이라이트 · 그림자)
const Trophy3D = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 140" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="cupGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFF1B8" />
        <stop offset="35%" stopColor="#FFD66B" />
        <stop offset="65%" stopColor="#E8A933" />
        <stop offset="100%" stopColor="#8B5A12" />
      </linearGradient>
      <linearGradient id="cupHighlight" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="baseGold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE08A" />
        <stop offset="50%" stopColor="#E8A933" />
        <stop offset="100%" stopColor="#7A4B0E" />
      </linearGradient>
      <radialGradient id="cupShine" cx="0.35" cy="0.25" r="0.55">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
        <feOffset dy="3" result="off" />
        <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
        <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* Ground shadow */}
    <ellipse cx="60" cy="132" rx="34" ry="4" fill="#000" opacity="0.18" />

    {/* Base column */}
    <rect x="50" y="110" width="20" height="14" rx="2" fill="url(#baseGold)" />
    {/* Base plate */}
    <rect x="36" y="122" width="48" height="10" rx="3" fill="url(#baseGold)" filter="url(#softShadow)" />
    <rect x="36" y="122" width="48" height="3" rx="2" fill="#FFF1B8" opacity="0.6" />

    {/* Side handles */}
    <path d="M28 40 Q14 50 18 70 Q22 86 38 86" fill="none" stroke="url(#cupGold)" strokeWidth="7" strokeLinecap="round" />
    <path d="M92 40 Q106 50 102 70 Q98 86 82 86" fill="none" stroke="url(#cupGold)" strokeWidth="7" strokeLinecap="round" />

    {/* Cup body */}
    <path
      d="M30 26 L90 26 Q92 70 78 96 Q70 108 60 108 Q50 108 42 96 Q28 70 30 26 Z"
      fill="url(#cupGold)"
      filter="url(#softShadow)"
    />
    {/* Cup rim band */}
    <rect x="28" y="24" width="64" height="8" rx="2" fill="url(#baseGold)" />
    <rect x="28" y="24" width="64" height="2.5" rx="1.5" fill="#FFF6D0" opacity="0.9" />

    {/* Highlight gloss */}
    <path
      d="M38 32 Q34 60 46 96"
      stroke="url(#cupHighlight)"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
      opacity="0.7"
    />
    <ellipse cx="50" cy="48" rx="14" ry="22" fill="url(#cupShine)" />

    {/* Star emblem */}
    <path
      d="M60 56 L63.2 64.5 L72 65 L65 70.5 L67.5 79 L60 74 L52.5 79 L55 70.5 L48 65 L56.8 64.5 Z"
      fill="#FFFFFF"
      opacity="0.85"
    />
  </svg>
);

const SalesChallengePopup = ({ currentStoreSlug, currentStoreName }: Props) => {

  const [open, setOpen] = useState(false);
  const [leaderBranch, setLeaderBranch] = useState<string | null>(null);

  useEffect(() => {
    // 지점 미설정 / 관리자(SC)는 표시하지 않음
    if (!currentStoreSlug) return;
    if (isAdminStore(currentStoreSlug)) return;

    let cancelled = false;
    (async () => {
      const sales = await getSales();
      if (cancelled) return;
      if (sales.length === 0) return;

      // 지점별 카운트 (1위만 사용)
      const counts = new Map<string, number>();
      sales.forEach((s) => {
        counts.set(s.branch, (counts.get(s.branch) || 0) + 1);
      });
      const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
      const [topBranch] = sorted[0] || [];
      if (!topBranch) return;

      // "다음에 보지 않기" — 같은 1위에 한해 영구 숨김
      try {
        const dismissed = localStorage.getItem(DISMISS_KEY);
        if (dismissed === topBranch) return;
      } catch { /* noop */ }

      setLeaderBranch(topBranch);
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
      <div className="relative w-full max-w-md bg-white rounded-[28px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(15,23,42,0.35)] animate-in zoom-in-95 duration-200">
        {/* Close (X) */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-10 w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white/90 transition-colors"
          aria-label="닫기"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top banner — warm navy + gold (편안한 무드, 위기감 X) */}
        <div className="relative px-7 pt-10 pb-9 text-white overflow-hidden bg-[radial-gradient(ellipse_at_top,_#3B4A6B_0%,_#1E2A44_55%,_#141C30_100%)]">
          {/* Soft golden glow behind trophy */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-[radial-gradient(circle,_rgba(255,214,107,0.35)_0%,_rgba(255,214,107,0)_70%)] pointer-events-none" />
          {/* Confetti dots */}
          <div className="absolute top-8 left-8 w-1.5 h-1.5 rounded-full bg-[#FFD66B] opacity-70" />
          <div className="absolute top-14 right-10 w-1 h-1 rounded-full bg-white opacity-60" />
          <div className="absolute bottom-10 left-12 w-1 h-1 rounded-full bg-[#FFD66B] opacity-60" />
          <div className="absolute bottom-16 right-8 w-1.5 h-1.5 rounded-full bg-white opacity-50" />

          <div className="relative flex flex-col items-center text-center">
            {/* 3D Trophy */}
            <Trophy3D className="w-24 h-28 mb-3 drop-shadow-[0_8px_18px_rgba(255,184,40,0.45)]" />

            <p className="text-[10.5px] font-black tracking-[0.32em] uppercase text-[#FFD66B] mb-2">
              No.1 Sales Champion
            </p>
            <h2
              id="sales-challenge-title"
              className="text-[17px] sm:text-[18px] font-semibold text-white/85 leading-snug"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
            >
              현재 판매인증 1위 지점은
            </h2>

            {/* 지점명 — 다크 칩 + 금색 외곽 + 큰 폰트로 확실한 가독성 */}
            <div className="mt-4 inline-flex items-center gap-2.5 bg-[#0F172A] border-2 border-[#FFD66B] px-6 py-3 rounded-2xl shadow-[0_10px_30px_-10px_rgba(255,214,107,0.55)]">
              <span className="text-[24px] sm:text-[26px] font-extrabold tracking-tight bg-gradient-to-b from-[#FFF1B8] to-[#E8A933] bg-clip-text text-transparent">
                {leaderBranch}
              </span>
              {leaderCode && (
                <span className="text-[10px] font-bold tracking-wider bg-[#FFD66B]/15 text-[#FFD66B] border border-[#FFD66B]/40 px-2 py-0.5 rounded-md">
                  {leaderCode}
                </span>
              )}
            </div>
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
            className="w-full h-12 rounded-2xl bg-gradient-to-b from-[#2C3A5A] to-[#1E2A44] hover:from-[#34466A] hover:to-[#22304F] text-white text-[15px] font-bold tracking-tight transition-colors shadow-[0_10px_24px_-10px_rgba(30,42,68,0.7)] border border-white/10"
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
