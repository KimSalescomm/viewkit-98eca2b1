import { useEffect, useMemo, useState } from "react";
import { Eye, Download, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { products } from "@/data/products";
import { featuresMap } from "@/data/features";
import { getBranchNameByCode, cleanBranchName } from "@/data/branches";
import { cn } from "@/lib/utils";
import StatsFilterBar, {
  CategoryKey,
  RangeKey,
  getCategoryByCode,
  getRangeSinceISO,
  matchesCategory,
} from "@/components/admin/StatsFilters";

interface ViewRow {
  store_id: string;
  store_name: string | null;
  path: string;
  created_at: string;
}

const selectClass =
  "h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 " +
  "focus:outline-none focus:ring-2 focus:ring-[#3182CE]/15 focus:border-[#3182CE]";

const PRODUCT_NAMES: Record<string, string> = Object.fromEntries(products.map((p) => [p.id, p.name]));

const FEATURE_TITLES: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  Object.entries(featuresMap).forEach(([pid, list]) => {
    list.forEach((f) => {
      map[`${pid}::${f.id}`] = f.title;
    });
  });
  return map;
})();

const FEATURE_PATH = /^\/product\/([^/?#]+)\/feature\/([^/?#]+)$/;

const ContentViewSection = () => {
  const [rows, setRows] = useState<ViewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [storeFilter, setStoreFilter] = useState("all");
  const [productFilter, setProductFilter] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const PAGE = 1000;
      const all: ViewRow[] = [];
      for (let offset = 0; ; offset += PAGE) {
        const { data, error } = await supabase
          .from("page_views")
          .select("store_id, store_name, path, created_at")
          .like("path", "/product/%/feature/%")
          .order("created_at", { ascending: false })
          .range(offset, offset + PAGE - 1);
        if (error || cancelled) break;
        const batch = (data || []) as ViewRow[];
        all.push(...batch);
        if (batch.length < PAGE) break;
        if (offset > 500_000) break;
      }
      if (cancelled) return;
      setRows(
        all.filter((r) => {
          const s = (r.store_id || "").toUpperCase();
          return s && s !== "SC" && s !== "KOR";
        }),
      );
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const stores = useMemo(() => {
    const m = new Map<string, string>();
    rows.forEach((r) => {
      const code = (r.store_id || "").toUpperCase();
      m.set(code, cleanBranchName(getBranchNameByCode(code) || r.store_name || code));
    });
    return [...m.entries()].sort((a, b) => a[1].localeCompare(b[1], "ko"));
  }, [rows]);

  const productOptions = useMemo(() => {
    const m = new Map<string, string>();
    rows.forEach((r) => {
      const match = r.path.match(FEATURE_PATH);
      if (!match) return;
      m.set(match[1], PRODUCT_NAMES[match[1]] || match[1]);
    });
    return [...m.entries()].sort((a, b) => a[1].localeCompare(b[1], "ko"));
  }, [rows]);

  const aggregated = useMemo(() => {
    const fromTs = from ? new Date(`${from}T00:00:00`).getTime() : null;
    const toTs = to ? new Date(`${to}T23:59:59.999`).getTime() : null;
    const map = new Map<string, { productName: string; contentName: string; views: number }>();
    rows.forEach((r) => {
      const match = r.path.match(FEATURE_PATH);
      if (!match) return;
      const [, pid, fid] = match;
      if (productFilter !== "all" && pid !== productFilter) return;
      if (storeFilter !== "all" && (r.store_id || "").toUpperCase() !== storeFilter) return;
      const ts = new Date(r.created_at).getTime();
      if (fromTs !== null && ts < fromTs) return;
      if (toTs !== null && ts > toTs) return;
      const key = `${pid}::${fid}`;
      let cur = map.get(key);
      if (!cur) {
        cur = {
          productName: PRODUCT_NAMES[pid] || pid,
          contentName: FEATURE_TITLES[key] || `특장점 ${fid}`,
          views: 0,
        };
        map.set(key, cur);
      }
      cur.views += 1;
    });
    return [...map.values()].sort((a, b) => b.views - a.views);
  }, [rows, productFilter, storeFilter, from, to]);

  const totalViews = useMemo(() => aggregated.reduce((a, r) => a + r.views, 0), [aggregated]);

  const handleExport = () => {
    const table = [
      ["순위", "제품", "콘텐츠", "페이지뷰"],
      ...aggregated.map((r, i) => [i + 1, r.productName, r.contentName, r.views]),
    ];
    const csv = table
      .map((row) =>
        row
          .map((cell) => {
            const v = String(cell ?? "");
            return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
          })
          .join(","),
      )
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `content-views_${format(new Date(), "yyyyMMdd_HHmm")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 mb-6">
      <div className="flex items-center gap-2.5 mb-1">
        <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center">
          <Eye className="w-4 h-4" strokeWidth={2.4} />
        </div>
        <h2 className="text-base font-bold text-slate-900">콘텐츠 조회수</h2>
        <span className="text-xs text-slate-400">특장점 상세 페이지뷰 집계</span>
      </div>
      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
        관리자(SC)·본사(KOR) 접속은 집계에서 제외됩니다.
      </p>

      <div className="flex flex-wrap items-end gap-3 mb-4">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-slate-500">지점</label>
          <select value={storeFilter} onChange={(e) => setStoreFilter(e.target.value)} className={selectClass}>
            <option value="all">전체</option>
            {stores.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-slate-500">제품</label>
          <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className={selectClass}>
            <option value="all">전체</option>
            {productOptions.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-slate-500">시작일</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className={selectClass} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-slate-500">종료일</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className={selectClass} />
        </div>

        <div className="flex-1" />

        <button
          type="button"
          onClick={() => setReloadKey((k) => k + 1)}
          className="h-9 px-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 text-xs font-semibold hover:bg-slate-50"
        >
          <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} /> 새로고침
        </button>
        <button
          type="button"
          onClick={handleExport}
          disabled={aggregated.length === 0}
          className="h-9 px-3.5 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-40"
        >
          <Download className="w-3.5 h-3.5" /> CSV 다운로드
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl bg-slate-50/70 px-4 py-3">
          <div className="text-[11px] text-slate-500 mb-1">총 페이지뷰</div>
          <div className="text-xl font-bold text-slate-900 tabular-nums">{totalViews.toLocaleString()}</div>
        </div>
        <div className="rounded-xl bg-slate-50/70 px-4 py-3">
          <div className="text-[11px] text-slate-500 mb-1">콘텐츠 수</div>
          <div className="text-xl font-bold text-slate-900 tabular-nums">{aggregated.length.toLocaleString()}</div>
        </div>
      </div>

      {loading ? (
        <div className="py-10 text-center text-sm text-slate-400">불러오는 중...</div>
      ) : aggregated.length === 0 ? (
        <div className="py-10 text-center text-sm text-slate-400">해당 조건의 조회 기록이 없습니다</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <th className="py-2 pr-4 font-medium">순위</th>
                <th className="py-2 pr-4 font-medium">제품</th>
                <th className="py-2 pr-4 font-medium">콘텐츠</th>
                <th className="py-2 pr-2 font-medium text-right">페이지뷰</th>
              </tr>
            </thead>
            <tbody>
              {aggregated.map((r, i) => (
                <tr
                  key={`${r.productName}-${r.contentName}-${i}`}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60"
                >
                  <td className="py-2.5 pr-4 text-slate-400 tabular-nums">{i + 1}</td>
                  <td className="py-2.5 pr-4 text-slate-600">{r.productName}</td>
                  <td className="py-2.5 pr-4 text-slate-800 font-medium">{r.contentName}</td>
                  <td className="py-2.5 pr-2 text-right tabular-nums font-semibold text-sky-600">
                    {r.views.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ContentViewSection;
