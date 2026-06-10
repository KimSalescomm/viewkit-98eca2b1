import { useEffect, useState } from "react";
import EventRankingModal from "@/components/EventRankingModal";
import { ACCESS_RANKING_EVENT, isEventActive } from "@/data/event";
import { getCurrentStore } from "@/utils/storeId";
import { isAdminStore } from "@/data/branches";

const SEEN_KEY = `viewkit_event_seen_${ACCESS_RANKING_EVENT.id}`;

/** 이벤트 기간 동안 일반 지점에 최초 1회 자동 노출되는 팝업 트리거. UI 요소 없음. */
const EventRankingAutoPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isEventActive()) return;
    const store = getCurrentStore();
    if (!store?.slug) return;
    if (isAdminStore(store.slug)) return;
    try {
      if (localStorage.getItem(SEEN_KEY)) return;
    } catch { /* noop */ }
    const t = window.setTimeout(() => {
      setOpen(true);
      try { localStorage.setItem(SEEN_KEY, "1"); } catch { /* noop */ }
    }, 800);
    return () => window.clearTimeout(t);
  }, []);

  return <EventRankingModal open={open} onClose={() => setOpen(false)} />;
};

export default EventRankingAutoPopup;
