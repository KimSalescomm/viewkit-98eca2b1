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
    const store = getCurrentStore();
    if (store && isAdminStore(store.slug)) return; // SC 제외

    const today = getTodayKST();
    if (localStorage.getItem(DAILY_KEY) === today) return; // 오늘 이미 노출됨

    const t = window.setTimeout(() => {
      localStorage.setItem(DAILY_KEY, today);
      setOpen(true);
    }, 800);
    return () => window.clearTimeout(t);
  }, []);

  const handleClose = () => {
    setOpen(false);
    try {
      window.dispatchEvent(new Event("viewkit:ranking-popup-closed"));
    } catch { /* noop */ }
  };

  return <EventRankingModal open={open} onClose={handleClose} />;
};

export default EventRankingAutoPopup;
