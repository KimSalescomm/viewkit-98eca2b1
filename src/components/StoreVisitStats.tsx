import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BarChart3, Users, Eye, Store, Download, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { BRANCH_CODE_MAP, getManagerByBranch, isSpecialtyManager } from "@/data/branches";

// 코드(store_id) → 정식 지점명 역매핑 (DB에 잘못 저장된 store_name 보정용)
const CODE_TO_NAME: Record<string, string> = Object.fromEntries(
  Object.entries(BRANCH_CODE_MAP).map(([name, code]) => [code, name]),
);

// 매장 카테고리: 'specialty' = 전문점(베스트샵), 'hiplaza' = 하이프라자(일반/본점/백화점), 'unknown'
type StoreCategory = "specialty" | "hiplaza" | "unknown";
const getCategoryByCode = (code: string): StoreCategory => {
  const name = CODE_TO_NAME[code];
  if (!name) return "unknown";
  const manager = getManagerByBranch(name);
  if (!manager) return "unknown";
  return isSpecialtyManager(manager) ? "specialty" : "hiplaza";
};

type CategoryKey = "all" | "specialty" | "hiplaza";
const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "hiplaza", label: "하이프라자" },
  { key: "specialty", label: "전문점" },
];

type Row = {
  id: string;
  store_id: string;
  store_name: string | null;
  path: string;
  session_id: string;
  created_at: string;
};

type RangeKey = "today" | "7d" | "14d" | "30d" | "all";

const RANGES: { key: RangeKey; label: string; days: number | null }[] = [
  { key: "today", label: "오늘", days: 0 },
  { key: "7d", label: "7일", days: 7 },
  { key: "14d", label: "14일", days: 14 },
  { key: "30d", label: "30일", days: 30 },
  { key: "all", label: "전체", days: null },
];

const getSince = (key: RangeKey): string | null => {
  if (key === "all") return null;
  const d = new Date();
  if (key === "today") {
    d.setHours(0, 0, 0, 0);
  } else {
    const days = key === "7d" ? 7 : key === "14d" ? 14 : 30;
    d.setDate(d.getDate() - days);
  }
  return d.toISOString();
};

// 매장당 1일 방문(세션) 인정 상한
const DAILY_VISIT_CAP = 20;

// created_at(UTC ISO) → KST 기준 날짜 키(yyyy-MM-dd)
const kstDayKey = (iso: string): string =>
  new Date(new Date(iso).getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);



const StoreVisitStats = () => {
  const [range, setRange] = useState<RangeKey>("7d");
  const [category, setCategory] = useState<CategoryKey>("all");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [serverTotal, setServerTotal] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const [reloadKey, setReloadKey] = useState(0);
  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const since = getSince(range);
    // 사이트 오픈일(2026-06-08) 이전 데이터는 허수로 간주하여 제외
    const SITE_OPEN = "2026-06-08T00:00:00Z";
    const effectiveSince = since && since > SITE_OPEN ? since : SITE_OPEN;

    // Supabase 기본 응답 상한(1,000행)을 우회하기 위해 페이지네이션으로 전체 조회
    const PAGE_SIZE = 1000;
    const fetchAll = async () => {
      // 서버측 정확한 카운트 (표시된 수치가 캡이 아님을 확인)
      const { count } = await supabase
        .from("page_views")
        .select("id", { count: "exact", head: true })
        .gte("created_at", effectiveSince);
      if (!cancelled) setServerTotal(count ?? null);

      const all: Row[] = [];
      const maxPages = Math.max(1, Math.ceil((count ?? 100000) / PAGE_SIZE));
      for (let page = 0; page < maxPages; page++) {
        const from = page * PAGE_SIZE;
        const { data, error } = await supabase
          .from("page_views")
          .select("id, store_id, store_name, path, session_id, created_at")
          .gte("created_at", effectiveSince)
          .order("created_at", { ascending: false })
          .range(from, from + PAGE_SIZE - 1);
        if (error || !data || data.length === 0) break;
        all.push(...(data as Row[]));
        if (data.length < PAGE_SIZE) break;
        if (all.length >= 200000) break; // 안전장치
      }
      return all;
    };

    fetchAll().then((data) => {
      if (cancelled) return;
      const filtered = data.filter((r) => {
        const sid = (r.store_id || "").toUpperCase();
        return sid !== "SC" && sid !== "KOR";
      });
      setRows(filtered);
      setLastUpdated(new Date());
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [range, reloadKey]);

  // 실시간 구독: 신규 page_views INSERT 발생 시 데이터 재조회 (5초 디바운스)
  useEffect(() => {
    let timer: number | null = null;
    const channel = supabase
      .channel("page_views-live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "page_views" },
        () => {
          if (timer) window.clearTimeout(timer);
          timer = window.setTimeout(() => setReloadKey((k) => k + 1), 5000);
        },
      )
      .subscribe();
    return () => {
      if (timer) window.clearTimeout(timer);
      supabase.removeChannel(channel);
    };
  }, []);

  // 60초마다 자동 새로고침(폴백)
  useEffect(() => {
    const id = window.setInterval(() => setReloadKey((k) => k + 1), 60000);
    return () => window.clearInterval(id);
  }, []);


  const filteredRows = useMemo(() => {
    if (category === "all") return rows;
    return rows.filter((r) => getCategoryByCode(r.store_id) === category);
  }, [rows, category]);

  const stats = useMemo(() => {
    const map = new Map<
      string,
      {
        store_id: string;
        store_name: string;
        views: number;
        sessions: Set<string>;
        // 날짜(KST) → 해당 일자의 고유 세션 집합 (일일 상한 보정용)
        daily: Map<string, Set<string>>;
        lastAt: string;
      }
    >();
    filteredRows.forEach((r) => {
      const key = r.store_id;
      // 정식 명칭은 코드 매핑이 우선 (DB의 store_name 불일치 보정)
      const canonicalName = CODE_TO_NAME[r.store_id] || r.store_name || r.store_id;
      const day = kstDayKey(r.created_at);
      const cur = map.get(key);
      if (cur) {
        cur.views += 1;
        cur.sessions.add(r.session_id);
        if (!cur.daily.has(day)) cur.daily.set(day, new Set());
        cur.daily.get(day)!.add(r.session_id);
        if (r.created_at > cur.lastAt) cur.lastAt = r.created_at;
        cur.store_name = canonicalName;
      } else {
        map.set(key, {
          store_id: r.store_id,
          store_name: canonicalName,
          views: 1,
          sessions: new Set([r.session_id]),
          daily: new Map([[day, new Set([r.session_id])]]),
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
        // 매장당 하루 최대 DAILY_VISIT_CAP회까지만 인정한 보정 방문 수
        visitsCapped: [...v.daily.values()].reduce(
          (sum, set) => sum + Math.min(set.size, DAILY_VISIT_CAP),
          0,
        ),
        lastAt: v.lastAt,
      }))
      .sort((a, b) => b.views - a.views);
  }, [filteredRows]);

  const totals = useMemo(() => {
    const sessions = new Set(filteredRows.map((r) => r.session_id));
    return {
      views: filteredRows.length,
      visits: sessions.size,
      visitsCapped: stats.reduce((sum, s) => sum + s.visitsCapped, 0),
      stores: stats.length,
    };
  }, [filteredRows, stats]);

  const handleExport = () => {
    const rangeLabel = RANGES.find((r) => r.key === range)?.label || range;
    const categoryLabel = CATEGORIES.find((c) => c.key === category)?.label || category;
    const catToLabel = (c: StoreCategory) =>
      c === "specialty" ? "전문점" : c === "hiplaza" ? "하이프라자" : "미분류";
    const header = [
      "순위",
      "구분",
      "지점",
      "코드",
      "페이지뷰",
      "방문(세션)",
      `방문(보정, 일 최대 ${DAILY_VISIT_CAP})`,
      "최근 접속",
    ];
    const lines = stats.map((s, i) => [
      i + 1,
      catToLabel(getCategoryByCode(s.store_id)),
      s.store_name,
      s.store_id,
      s.views,
      s.visits,
      s.visitsCapped,
      format(new Date(s.lastAt), "yyyy-MM-dd HH:mm:ss", { locale: ko }),
    ]);
    const summary = [
      ["기간", rangeLabel],
      ["필터", categoryLabel],
      ["총 페이지뷰", totals.views],
      ["총 방문(세션)", totals.visits],
      [`총 방문(보정, 일 최대 ${DAILY_VISIT_CAP})`, totals.visitsCapped],
      ["활성 지점", totals.stores],
      [],
      header,
      ...lines,
    ];
    const csv = summary
      .map((row) =>
        row
          .map((cell) => {
            const v = String(cell ?? "");
            return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
          })
          .join(","),
      )
      .join("\n");
    // BOM for Excel Korean compatibility
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `store-visit-stats_${rangeLabel}_${format(new Date(), "yyyyMMdd_HHmm")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 mb-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-600 flex items-center justify-center">
            <BarChart3 className="w-4 h-4" strokeWidth={2.4} />
          </div>
          <h2 className="text-sm font-semibold text-slate-900">지점별 접속 통계</h2>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            실시간
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setCategory(c.key)}
                className={cn(
                  "px-3 h-7 rounded-md text-xs font-medium transition-colors",
                  category === c.key
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                {c.label}
              </button>
            ))}
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
          <button
            type="button"
            onClick={refetch}
            title="새로고침"
            className="inline-flex items-center gap-1 h-7 px-2 rounded-md border border-slate-200 bg-white text-xs text-slate-600 hover:bg-slate-50"
          >
            <RefreshCw className={cn("w-3 h-3", loading && "animate-spin")} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2 text-[11px] text-slate-400">
        <div>
          {serverTotal !== null && (
            <span>서버 기록 {serverTotal.toLocaleString()}행 (SC/KOR 포함 원본)</span>
          )}
        </div>
        <div>
          {lastUpdated && <>업데이트: {format(lastUpdated, "HH:mm:ss", { locale: ko })}</>}
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
