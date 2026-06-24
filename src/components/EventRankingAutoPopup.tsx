import { useEffect, useState } from "react";
import EventRankingModal from "@/components/EventRankingModal";
import { getCurrentStore } from "@/utils/storeId";
import { isAdminStore } from "@/data/branches";

// 하루 1회 노출 (localStorage). 날짜가 바뀌면 다시 노출.
const DAILY_KEY = "viewkit_ranking_seen_date";

function getTodayKST(): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10); // YYYY-MM-DD
}

const EventRankingAutoPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // URL 강제 표시 옵션: ?ranking=1 또는 ?showRanking=1
    const params = new URLSearchParams(window.location.search);
    const forceShow = params.get("ranking") === "1" || params.get("showRanking") === "1";

    if (!forceShow) {
      const store = getCurrentStore();
      if (store && isAdminStore(store.slug)) return; // SC 제외

      const today = getTodayKST();
      if (localStorage.getItem(DAILY_KEY) === today) return; // 오늘 이미 노출됨
    }

    // 즉시 노출 — 어두워졌다가 다시 밝아지는 시각적 단절을 제거
    // 노출 기록은 닫는 시점에 저장하여 새로고침 시 재표시되지 않도록 함
    const raf = window.requestAnimationFrame(() => setOpen(true));
    return () => window.cancelAnimationFrame(raf);
  }, []);

  const handleClose = () => {
    setOpen(false);
    try {
      localStorage.setItem(DAILY_KEY, getTodayKST());
    } catch { /* noop */ }
    try {
      window.dispatchEvent(new Event("viewkit:ranking-popup-closed"));
    } catch { /* noop */ }
  };

  return <EventRankingModal open={open} onClose={handleClose} />;
};

export default EventRankingAutoPopup;
