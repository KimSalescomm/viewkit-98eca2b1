import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import EventRankingModal from "@/components/EventRankingModal";
import { ACCESS_RANKING_EVENT, isEventActive } from "@/data/event";
import { getCurrentStore } from "@/utils/storeId";
import { isAdminStore } from "@/data/branches";

const SEEN_KEY = `viewkit_event_seen_${ACCESS_RANKING_EVENT.id}`;

const EventRankingBadge = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // 숨겨진 관리자 진입 (기존 동작 유지): 길게 누르면 /admin
  const longPressTimer = useRef<number | null>(null);
  const longPressFired = useRef(false);
  const startLongPress = () => {
    longPressFired.current = false;
    longPressTimer.current = window.setTimeout(() => {
      longPressFired.current = true;
      navigate("/admin");
    }, 1200);
  };
  const cancelLongPress = () => {
    if (longPressTimer.current) {
      window.clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  // 이벤트 기간 + 일반 지점 → 최초 1회 자동 노출
  useEffect(() => {
    if (!isEventActive()) return;
    const store = getCurrentStore();
    if (!store?.slug) return;
    if (isAdminStore(store.slug)) return;
    try {
      if (localStorage.getItem(SEEN_KEY)) return;
      const t = window.setTimeout(() => {
        setOpen(true);
        localStorage.setItem(SEEN_KEY, "1");
      }, 800);
      return () => window.clearTimeout(t);
    } catch { /* noop */ }
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="접속 1위 지점 행사"
        onClick={() => {
          if (longPressFired.current) return;
          setOpen(true);
        }}
        onPointerDown={startLongPress}
        onPointerUp={cancelLongPress}
        onPointerLeave={cancelLongPress}
        onPointerCancel={cancelLongPress}
        onContextMenu={(e) => e.preventDefault()}
        className={cn(
          "group fixed bottom-5 right-5 z-40 isolate",
          "inline-flex items-center gap-2",
          "h-12 pl-4 pr-4 rounded-full text-white",
          "bg-gradient-to-r from-[#FFB347] via-[#E8A933] to-[#A50034]",
          "shadow-[0_10px_30px_-6px_rgba(165,0,52,0.45)]",
          "ring-1 ring-white/40",
          "hover:scale-105 hover:-translate-y-0.5 transition-transform duration-200",
        )}
      >
        <Trophy className="w-4 h-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" strokeWidth={2.6} />
        <span className="text-[13px] font-extrabold tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
          접속 1위 행사
        </span>
        <span className="ml-0.5 text-[10px] px-1.5 py-0.5 rounded-full bg-white text-[#A50034] font-black tracking-wider shadow-sm">
          LIVE
        </span>
      </button>

      <EventRankingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default EventRankingBadge;
