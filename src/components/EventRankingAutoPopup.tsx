import { useEffect, useState } from "react";
import EventRankingModal from "@/components/EventRankingModal";
import { getCurrentStore } from "@/utils/storeId";
import { isAdminStore } from "@/data/branches";

// 매 세션 1회 노출 (sessionStorage). 같은 탭 새로고침에는 다시 뜨지 않음.
const SEEN_KEY = "viewkit_ranking_seen_session";

const EventRankingAutoPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 테스트 모드: 새로고침마다 항상 노출 (SC 포함)
    const t = window.setTimeout(() => setOpen(true), 800);
    return () => window.clearTimeout(t);
  }, []);

  return <EventRankingModal open={open} onClose={() => setOpen(false)} />;
};

export default EventRankingAutoPopup;
