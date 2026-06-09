import { useEffect, useMemo, useState } from "react";
import { BarChart3, Users, Eye, Store, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { BRANCH_CODE_MAP } from "@/data/branches";

// 코드(store_id) → 정식 지점명 역매핑 (DB에 잘못 저장된 store_name 보정용)
const CODE_TO_NAME: Record<string, string> = Object.fromEntries(
  Object.entries(BRANCH_CODE_MAP).map(([name, code]) => [code, name]),
);

type Row = {
  id: string;
  store_id: string;
  store_name: string | null;
  path: string;
  session_id: string;
  created_at: string;
};

type RangeKey = "today" | "7d" | "30d" | "all";

const RANGES: { key: RangeKey; label: string; days: number | null }[] = [
  { key: "today", label: "오늘", days: 0 },
  { key: "7d", label: "7일", days: 7 },
  { key: "30d", label: "30일", days: 30 },
  { key: "all", label: "전체", days: null },
];

const getSince = (key: RangeKey): string | null => {
  if (key === "all") return null;
  const d = new Date();
  if (key === "today") {
    d.setHours(0, 0, 0, 0);
  } else {
    const days = key === "7d" ? 7 : 30;
    d.setDate(d.getDate() - days);
  }
  return d.toISOString();
};

const StoreVisitStats = () => {
  const [range, setRange] = useState<RangeKey>("7d");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const since = getSince(range);
    // 사이트 오픈일(2026-06-08) 이전 데이터는 허수로 간주하여 제외
    const SITE_OPEN = "2026-06-08T00:00:00Z";
    const effectiveSince = since && since > SITE_OPEN ? since : SITE_OPEN;
    let q = supabase
      .from("page_views")
      .select("id, store_id, store_name, path, session_id, created_at")
      .order("created_at", { ascending: false })
      .limit(5000);
    q = q.gte("created_at", effectiveSince);
    q.then(({ data }) => {
      if (cancelled) return;
      const filtered = ((data as Row[]) || []).filter((r) => {
        const sid = (r.store_id || "").toUpperCase();
        return sid !== "SC" && sid !== "KOR";
      });
      setRows(filtered);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [range]);

  const stats = useMemo(() => {
    const map = new Map<
      string,
      { store_id: string; store_name: string; views: number; sessions: Set<string>; lastAt: string }
    >();
    rows.forEach((r) => {
      const key = r.store_id;
      // 정식 명칭은 코드 매핑이 우선 (DB의 store_name 불일치 보정)
      const canonicalName = CODE_TO_NAME[r.store_id] || r.store_name || r.store_id;
      const cur = map.get(key);
      if (cur) {
        cur.views += 1;
        cur.sessions.add(r.session_id);
        if (r.created_at > cur.lastAt) cur.lastAt = r.created_at;
        cur.store_name = canonicalName;
      } else {
        map.set(key, {
          store_id: r.store_id,
          store_name: canonicalName,
          views: 1,
          sessions: new Set([r.session_id]),
          lastAt: r.created_at,
        });
      }
    });
    return [...map.values()]
      .map((v) => ({
        store_id: v.store_id,
        store_name: v.store_name,
        views: v.views,
        visits: v.sessions.size,
        lastAt: v.lastAt,
      }))
      .sort((a, b) => b.views - a.views);
  }, [rows]);

  const totals = useMemo(() => {
    const sessions = new Set(rows.map((r) => r.session_id));
    return {
      views: rows.length,
      visits: sessions.size,
      stores: stats.length,
    };
  }, [rows, stats]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 mb-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-600 flex items-center justify-center">
            <BarChart3 className="w-4 h-4" strokeWidth={2.4} />
          </div>
          <h2 className="text-sm font-semibold text-slate-900">지점별 접속 통계</h2>
        </div>
        <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
          {RANGES.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRange(r.key)}
              className={cn(
                "px-3 h-7 rounded-md text-xs font-medium transition-colors",
                range === r.key
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-xl bg-slate-50/70 px-4 py-3">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
            <Eye className="w-3 h-3" /> 총 페이지뷰
          </div>
          <div className="text-xl font-bold text-slate-900 tabular-nums">{totals.views.toLocaleString()}</div>
        </div>
        <div className="rounded-xl bg-slate-50/70 px-4 py-3">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
            <Users className="w-3 h-3" /> 총 방문(세션)
          </div>
          <div className="text-xl font-bold text-slate-900 tabular-nums">{totals.visits.toLocaleString()}</div>
        </div>
        <div className="rounded-xl bg-slate-50/70 px-4 py-3">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
            <Store className="w-3 h-3" /> 활성 지점
          </div>
          <div className="text-xl font-bold text-slate-900 tabular-nums">{totals.stores.toLocaleString()}</div>
        </div>
      </div>

      {loading ? (
        <div className="py-10 text-center text-sm text-slate-400">불러오는 중...</div>
      ) : stats.length === 0 ? (
        <div className="py-10 text-center text-sm text-slate-400">기록된 접속이 없습니다</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <th className="py-2 pr-4 font-medium">#</th>
                <th className="py-2 pr-4 font-medium">지점</th>
                <th className="py-2 pr-4 font-medium">코드</th>
                <th className="py-2 pr-4 font-medium text-right">페이지뷰</th>
                <th className="py-2 pr-4 font-medium text-right">방문</th>
                <th className="py-2 pr-2 font-medium">최근 접속</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s, i) => {
                const max = stats[0]?.views || 1;
                const pct = Math.round((s.views / max) * 100);
                return (
                  <tr key={s.store_id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                    <td className="py-2.5 pr-4 text-slate-400 tabular-nums">{i + 1}</td>
                    <td className="py-2.5 pr-4 text-slate-800 font-medium">{s.store_name}</td>
                    <td className="py-2.5 pr-4">
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 text-slate-600">
                        {s.store_id}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-violet-500" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="tabular-nums font-semibold text-violet-600 w-10 text-right">{s.views}</span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-4 text-right tabular-nums text-slate-600">{s.visits}</td>
                    <td className="py-2.5 pr-2 text-xs tabular-nums text-slate-400">
                      {format(new Date(s.lastAt), "MM.dd HH:mm", { locale: ko })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StoreVisitStats;
