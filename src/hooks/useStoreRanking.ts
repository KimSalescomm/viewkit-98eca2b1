import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getBranchNameByCode } from "@/data/branches";
import { ACCESS_RANKING_EVENT } from "@/data/event";

export interface RankRow {
  store_id: string;
  store_name: string;
  sessions: number;  // unique session_id 수
  views: number;     // 총 page_views
}

const CACHE_MS = 5 * 60 * 1000;
let cache: { ts: number; rows: RankRow[] } | null = null;

const aggregate = (rows: { store_id: string; store_name: string | null; session_id: string }[]): RankRow[] => {
  const map = new Map<string, { name: string; sessions: Set<string>; views: number }>();
  for (const r of rows) {
    const id = (r.store_id || "").toUpperCase();
    if (!id || id === "SC" || id === "KOR") continue;
    const name = r.store_name || getBranchNameByCode(id) || id;
    if (!map.has(id)) map.set(id, { name, sessions: new Set(), views: 0 });
    const entry = map.get(id)!;
    entry.sessions.add(r.session_id);
    entry.views += 1;
  }
  return [...map.entries()]
    .map(([store_id, v]) => ({ store_id, store_name: v.name, sessions: v.sessions.size, views: v.views }))
    .sort((a, b) => b.sessions - a.sessions || b.views - a.views);
};

export const useStoreRanking = (autoLoad = true) => {
  const [rows, setRows] = useState<RankRow[]>(cache?.rows ?? []);
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<number | null>(cache?.ts ?? null);

  const fetchRanking = useCallback(async (force = false) => {
    if (!force && cache && Date.now() - cache.ts < CACHE_MS) {
      setRows(cache.rows);
      setUpdatedAt(cache.ts);
      return;
    }
    setLoading(true);
    try {
      // 이벤트 기간만 집계
      const start = `${ACCESS_RANKING_EVENT.startAt}T00:00:00+09:00`;
      const end = `${ACCESS_RANKING_EVENT.endAt}T23:59:59+09:00`;
      const { data, error } = await supabase
        .from("page_views")
        .select("store_id,store_name,session_id")
        .gte("created_at", start)
        .lte("created_at", end)
        .limit(20000);
      if (error) throw error;
      const agg = aggregate(data || []);
      cache = { ts: Date.now(), rows: agg };
      setRows(agg);
      setUpdatedAt(cache.ts);
    } catch (e) {
      console.warn("[useStoreRanking] failed", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoLoad) void fetchRanking(false);
  }, [autoLoad, fetchRanking]);

  return { rows, loading, updatedAt, refresh: () => fetchRanking(true) };
};
