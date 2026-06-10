import { useEffect, useState } from "react";
import EventRankingModal from "@/components/EventRankingModal";
import { getCurrentStore } from "@/utils/storeId";
import { isAdminStore } from "@/data/branches";

// 매 세션 1회 노출 (sessionStorage). 같은 탭 새로고침에는 다시 뜨지 않음.
const SEEN_KEY = "viewkit_ranking_seen_session";

const EventRankingAutoPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const store = getCurrentStore();
    if (!store?.slug) return;
    if (isAdminStore(store.slug)) return;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch { /* noop */ }
    const t = window.setTimeout(() => {
      setOpen(true);
      try { sessionStorage.setItem(SEEN_KEY, "1"); } catch { /* noop */ }
    }, 800);
    return () => window.clearTimeout(t);
  }, []);

  return <EventRankingModal open={open} onClose={() => setOpen(false)} />;
};

export default EventRankingAutoPopup;
