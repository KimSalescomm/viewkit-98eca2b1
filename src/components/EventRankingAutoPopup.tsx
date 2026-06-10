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
    // 팝업 우선순위: 지점 설정(StoreSetupModal) > 접속 통계(랭킹) 팝업
    // 지점이 아직 설정되지 않은 최초 접속의 경우, 랭킹 팝업을 띄우지 않고
    // 지점이 등록될 때까지 대기한다. (storeId 저장 시 storage 이벤트로 재시도)
    const today = getTodayKST();

    const tryOpen = () => {
      const store = getCurrentStore();
      if (!store) return false; // 지점 미설정 → 지점 설정 팝업이 먼저 처리
      if (isAdminStore(store.slug)) return true; // SC 제외 (다시 시도 안 함)
      if (localStorage.getItem(DAILY_KEY) === today) return true;
      localStorage.setItem(DAILY_KEY, today);
      setOpen(true);
      return true;
    };

    const t = window.setTimeout(() => {
      if (tryOpen()) return;
      // 지점 설정 후 재확인 (storage 이벤트 + 폴링)
      const onStorage = (e: StorageEvent) => {
        if (e.key === "viewkit_current_store" && tryOpen()) {
          window.removeEventListener("storage", onStorage);
          window.clearInterval(poll);
        }
      };
      window.addEventListener("storage", onStorage);
      const poll = window.setInterval(() => {
        if (tryOpen()) {
          window.removeEventListener("storage", onStorage);
          window.clearInterval(poll);
        }
      }, 800);
    }, 800);
    return () => window.clearTimeout(t);
  }, []);

  return <EventRankingModal open={open} onClose={() => setOpen(false)} />;
};

export default EventRankingAutoPopup;
