import { useCallback, useEffect, useMemo, useState } from "react";
import { Layers, Users, Eye, Download, RefreshCw, CalendarIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Row = {
  store_id: string;
  path: string;
  session_id: string;
  created_at: string;
};

type RangeKey = "today" | "7d" | "14d" | "30d" | "all" | "custom";

const RANGES: { key: RangeKey; label: string }[] = [
  { key: "today", label: "오늘" },
  { key: "7d", label: "7일" },
  { key: "14d", label: "14일" },
  { key: "30d", label: "30일" },
  { key: "all", label: "전체" },
  { key: "custom", label: "직접" },
];

const SITE_OPEN = "2026-06-08T00:00:00Z";
const SITE_OPEN_DATE = new Date(SITE_OPEN);

const startOfDayLocal = (d: Date): Date => {
  const n = new Date(d);
  n.setHours(0, 0, 0, 0);
  return n;
};

const getPresetDates = (key: Exclude<RangeKey, "all" | "custom">): [Date, Date] => {
  const end = startOfDayLocal(new Date());
  const start = startOfDayLocal(new Date());
  if (key === "today") {
    return [start, end];
  }
  const days = key === "7d" ? 7 : key === "14d" ? 14 : 30;
  start.setDate(start.getDate() - days);
  return [start, end];
};

const getEndExclusive = (d: Date): string => {
  const next = startOfDayLocal(new Date(d));
  next.setDate(next.getDate() + 1);
  return next.toISOString();
};

const normalizeDate = (d: Date): number => startOfDayLocal(d).getTime();

const PRODUCT_NAMES: Record<string, string> = Object.fromEntries(
  products.map((p) => [p.id, p.name]),
);

// 경로 → 제품 탭 분류 (제품 외 주요 페이지도 별도 그룹으로 집계)
const OTHER_GROUPS: { key: string; label: string; match: (p: string) => boolean }[] = [
  { key: "__subscription", label: "가전구독", match: (p) => p.startsWith("/subscription") },
  { key: "__home", label: "홈", match: (p) => p === "/" || p === "" },
  { key: "__guide", label: "가이드/매뉴얼", match: (p) => p.includes("guide") || p.includes("manual") },
];

const classify = (path: string): { key: string; label: string } | null => {
  const m = path.match(/^\/product\/([^/?#]+)/);
  if (m) {
    const id = m[1];
    return { key: id, label: PRODUCT_NAMES[id] || id };
  }
  const g = OTHER_GROUPS.find((o) => o.match(path));
  if (g) return { key: g.key, label: g.label };
  return { key: "__etc", label: "기타" };
};

const ProductVisitStats = () => {
  const [range, setRange] = useState<RangeKey>("30d");
  const [startDate, setStartDate] = useState<Date>(() => getPresetDates("30d")[0]);
  const [endDate, setEndDate] = useState<Date>(() => getPresetDates("30d")[1]);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const since = range === "all" ? SITE_OPEN : startDate.toISOString();
    const effectiveSince = since > SITE_OPEN ? since : SITE_OPEN;
    const until = range === "all" ? null : getEndExclusive(endDate);
    const PAGE_SIZE = 1000;

    const fetchAll = async () => {
      let countQ = supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", effectiveSince);
      if (until) countQ = countQ.lt("created_at", until);
      const { count } = await countQ;

      const all: Row[] = [];
      const maxPages = Math.max(1, Math.ceil((count ?? 100000) / PAGE_SIZE));
      for (let page = 0; page < maxPages; page++) {
        const from = page * PAGE_SIZE;
        let q = supabase
          .from("page_views")
          .select("store_id, path, session_id, created_at")
          .gte("created_at", effectiveSince)
          .order("created_at", { ascending: false })
          .range(from, from + PAGE_SIZE - 1);
        if (until) q = q.lt("created_at", until);
        const { data, error } = await q;
        if (error || !data || data.length === 0) break;
        all.push(...(data as Row[]));
        if (data.length < PAGE_SIZE) break;
        if (all.length >= 200000) break;
      }
      return all;
    };

    fetchAll().then((data) => {
      if (cancelled) return;
      setRows(
        data.filter((r) => {
          const sid = (r.store_id || "").toUpperCase();
          return sid !== "SC" && sid !== "KOR";
        }),
      );
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [range, startDate, endDate, reloadKey]);

  const stats = useMemo(() => {
    const map = new Map<
      string,
      { key: string; label: string; views: number; sessions: Set<string>; stores: Set<string> }
    >();
    rows.forEach((r) => {
      const g = classify(r.path || "");
      if (!g) return;
      let cur = map.get(g.key);
      if (!cur) {
        cur = { key: g.key, label: g.label, views: 0, sessions: new Set(), stores: new Set() };
        map.set(g.key, cur);
      }
      cur.views += 1;
      cur.sessions.add(r.session_id);
      cur.stores.add(r.store_id);
    });
    return [...map.values()]
      .map((v) => ({
        key: v.key,
        label: v.label,
        views: v.views,
        visits: v.sessions.size,
        stores: v.stores.size,
      }))
      .sort((a, b) => b.views - a.views);
  }, [rows]);

  const totals = useMemo(
    () => ({
      views: rows.length,
      visits: new Set(rows.map((r) => r.session_id)).size,
    }),
    [rows],
  );

  const handleRangeChange = (key: RangeKey) => {
    setRange(key);
    if (key === "all") {
      setStartDate(SITE_OPEN_DATE);
      setEndDate(startOfDayLocal(new Date()));
    } else if (key !== "custom") {
      const [start, end] = getPresetDates(key);
      setStartDate(start);
      setEndDate(end);
    }
  };

  const handleStartSelect = (date: Date | undefined) => {
    if (!date) return;
    if (normalizeDate(date) > normalizeDate(endDate)) {
      setEndDate(date);
    }
    setStartDate(date);
    setRange("custom");
  };

  const handleEndSelect = (date: Date | undefined) => {
    if (!date) return;
    if (normalizeDate(date) < normalizeDate(startDate)) {
      setStartDate(date);
    }
    setEndDate(date);
    setRange("custom");
  };

  const handleExport = () => {
    const rangeLabel =
      range === "custom"
        ? `${format(startDate, "yyyy.MM.dd")}~${format(endDate, "yyyy.MM.dd")}`
        : RANGES.find((r) => r.key === range)?.label || range;
    const table = [
      ["기간", rangeLabel],
      ["총 페이지뷰", totals.views],
      ["총 방문(세션)", totals.visits],
      [],
      ["순위", "제품/탭", "페이지뷰", "방문(세션)", "접속 지점 수"],
      ...stats.map((s, i) => [i + 1, s.label, s.views, s.visits, s.stores]),
    ];
    const csv = table
      .map((row) =>
        row
          .map((cell) => {
            const v = String(cell ?? "");
            return /[",\n]/.test(v) ? `"${v.replace(/"/g, """)}"` : v;
          })
          .join(","),
      )
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `product-visit-stats_${rangeLabel}_${format(new Date(), "yyyyMMdd_HHmm")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const today = startOfDayLocal(new Date());
  const datePickerDisabled = range === "all";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 mb-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center">
            <Layers className="w-4 h-4" strokeWidth={2.4} />
          </div>
          <h2 className="text-sm font-semibold text-slate-900">제품별 접속 통계</h2>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
            {RANGES.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => handleRangeChange(r.key)}
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

          <div className="hidden sm:block w-px h-5 bg-slate-200" />

          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={datePickerDisabled}
                  className={cn(
                    "h-7 px-2 text-xs justify-start gap-1 w-[110px] sm:w-[130px] font-normal",
                    !startDate && "text-muted-foreground",
                    datePickerDisabled && "opacity-60 cursor-not-allowed",
                  )}
                >
                  <CalendarIcon className="w-3 h-3 shrink-0" />
                  {startDate ? format(startDate, "yyyy.MM.dd") : <span>시작일</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartSelect}
                  disabled={(date) => normalizeDate(date) > normalizeDate(endDate)}
                  initialFocus
                  locale={ko}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            <span className="text-xs text-slate-400">~</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={datePickerDisabled}
                  className={cn(
                    "h-7 px-2 text-xs justify-start gap-1 w-[110px] sm:w-[130px] font-normal",
                    !endDate && "text-muted-foreground",
                    datePickerDisabled && "opacity-60 cursor-not-allowed",
                  )}
                >
                  <CalendarIcon className="w-3 h-3 shrink-0" />
                  {endDate ? format(endDate, "yyyy.MM.dd") : <span>종료일</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndSelect}
                  disabled={(date) => {
                    const t = normalizeDate(date);
                    return t < normalizeDate(startDate) || t > normalizeDate(today);
                  }}
                  initialFocus
                  locale={ko}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <button
            type="button"
            onClick={refetch}
            title="새로고침"
            className="inline-flex items-center gap-1 h-7 px-2 rounded-md border border-slate-200 bg-white text-xs text-slate-600 hover:bg-slate-50"
          >
            <RefreshCw className={cn("w-3 h-3", loading && "animate-spin")} />
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <Download className="w-3 h-3" /> CSV 다운로드
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl bg-slate-50/70 px-4 py-3">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
            <Eye className="w-3 h-3" /> 총 페이지뷰
          </div>
          <div className="text-xl font-bold text-slate-900 tabular-nums">
            {totals.views.toLocaleString()}
          </div>
        </div>
        <div className="rounded-xl bg-slate-50/70 px-4 py-3">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1">
            <Users className="w-3 h-3" /> 총 방문(세션)
          </div>
          <div className="text-xl font-bold text-slate-900 tabular-nums">
            {totals.visits.toLocaleString()}
          </div>
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
                <th className="py-2 pr-4 font-medium">제품/탭</th>
                <th className="py-2 pr-4 font-medium text-right">페이지뷰</th>
                <th className="py-2 pr-4 font-medium text-right">방문(세션)</th>
                <th className="py-2 pr-2 font-medium text-right">접속 지점</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s, i) => {
                const max = stats[0]?.views || 1;
                const pct = Math.round((s.views / max) * 100);
                return (
                  <tr key={s.key} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                    <td className="py-2.5 pr-4 text-slate-400 tabular-nums">{i + 1}</td>
                    <td className="py-2.5 pr-4 text-slate-800 font-medium">{s.label}</td>
                    <td className="py-2.5 pr-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-sky-500" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="tabular-nums font-semibold text-sky-600 w-12 text-right">
                          {s.views.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-4 text-right tabular-nums text-slate-600">
                      {s.visits.toLocaleString()}
                    </td>
                    <td className="py-2.5 pr-2 text-right tabular-nums text-slate-400">{s.stores}</td>
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

export default ProductVisitStats;
