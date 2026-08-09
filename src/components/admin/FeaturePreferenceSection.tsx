import { useCallback, useEffect, useMemo, useState } from "react";
import { Heart, Download, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { format, subDays } from "date-fns";
import { ko } from "date-fns/locale";
import * as XLSX from "xlsx";
import { supabase } from "@/integrations/supabase/client";


type PeriodKey = "7" | "14" | "30" | "90" | "all";

interface ReactionRow {
  created_at: string;
  store_slug: string;
  store_name: string | null;
  product_id: string;
  product_name: string | null;
  feature_id: string;
  feature_title: string | null;
}

interface AggregatedRow {
  productId: string;
  productName: string;
  featureId: string;
  featureTitle: string;
  total: number;
  uniqueStores: number;
  storeNames: string[];
  lastAt: string;
}

const selectClass =
  "h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 " +
  "focus:outline-none focus:ring-2 focus:ring-[#3182CE]/15 focus:border-[#3182CE]";

const downloadCsv = (csv: string, filename: string) => {
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1000);
};

const esc = (v: unknown) => {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const FeaturePreferenceSection = () => {
  const [rows, setRows] = useState<ReactionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<PeriodKey>("30");
  const [productFilter, setProductFilter] = useState<string>("all");
  const [storeFilter, setStoreFilter] = useState<string>("all");
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [totalEventCount, setTotalEventCount] = useState<number | null>(null);

  const toggleExpand = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const buildCountQuery = useCallback(() => {
    let q = supabase.from("feature_reactions").select("*", { count: "exact", head: true });
    const cutoff = period === "all" ? null : subDays(new Date(), Number(period)).toISOString();
    if (cutoff) q = q.gte("created_at", cutoff);
    if (productFilter !== "all") q = q.eq("product_id", productFilter);
    if (storeFilter !== "all") q = q.eq("store_slug", storeFilter);
    q = q.not("store_slug", "ilike", "SC").not("store_slug", "ilike", "KOR");
    return q;
  }, [period, productFilter, storeFilter]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      // PostgREST 응답은 요청당 최대 1,000행이므로 range 페이지네이션으로 전체를 누적 조회
      const PAGE = 1000;
      const all: ReactionRow[] = [];
      for (let from = 0; ; from += PAGE) {
        const { data, error } = await supabase
          .from("feature_reactions")
          .select("created_at, store_slug, store_name, product_id, product_name, feature_id, feature_title")
          .order("created_at", { ascending: false })
          .range(from, from + PAGE - 1);
        if (error || cancelled) break;
        const batch = data || [];
        all.push(...batch);
        if (batch.length < PAGE) break;
        if (from > 500_000) break;
      }
      if (cancelled) return;
      // 관리자/본사 계정 이벤트는 저장 단계에서 걸러지지만, 방어적으로 한 번 더 필터
      const clean = all.filter((r) => {
        const s = (r.store_slug || "").toUpperCase();
        return s && s !== "SC" && s !== "KOR";
      });
      setRows(clean);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);


  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { count, error } = await buildCountQuery();
      if (cancelled || error) return;
      setTotalEventCount(count ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, [buildCountQuery]);

  const filtered = useMemo(() => {
    const cutoff = period === "all" ? null : subDays(new Date(), Number(period));
    return rows.filter((r) => {
      if (cutoff && new Date(r.created_at) < cutoff) return false;
      if (productFilter !== "all" && r.product_id !== productFilter) return false;
      if (storeFilter !== "all" && r.store_slug !== storeFilter) return false;
      return true;
    });
  }, [rows, period, productFilter, storeFilter]);

  const products = useMemo(() => {
    const m = new Map<string, string>();
    rows.forEach((r) => m.set(r.product_id, r.product_name || r.product_id));
    return [...m.entries()].sort((a, b) => a[1].localeCompare(b[1], "ko"));
  }, [rows]);

  const stores = useMemo(() => {
    const m = new Map<string, string>();
    rows.forEach((r) => m.set(r.store_slug, r.store_name || r.store_slug));
    return [...m.entries()].sort((a, b) => a[1].localeCompare(b[1], "ko"));
  }, [rows]);

  const aggregated: AggregatedRow[] = useMemo(() => {
    const map = new Map<string, AggregatedRow & { storeSet: Map<string, string> }>();
    filtered.forEach((r) => {
      const key = `${r.product_id}::${r.feature_id}`;
      const storeLabel = r.store_name || r.store_slug;
      const cur = map.get(key);
      if (cur) {
        cur.total += 1;
        cur.storeSet.set(r.store_slug, storeLabel);
        if (r.created_at > cur.lastAt) cur.lastAt = r.created_at;
        if (r.feature_title && !cur.featureTitle) cur.featureTitle = r.feature_title;
      } else {
        map.set(key, {
          productId: r.product_id,
          productName: r.product_name || r.product_id,
          featureId: r.feature_id,
          featureTitle: r.feature_title || r.feature_id,
          total: 1,
          uniqueStores: 0,
          storeNames: [],
          storeSet: new Map([[r.store_slug, storeLabel]]),
          lastAt: r.created_at,
        });
      }
    });
    return [...map.values()]
      .map((v) => ({
        productId: v.productId,
        productName: v.productName,
        featureId: v.featureId,
        featureTitle: v.featureTitle,
        total: v.total,
        uniqueStores: v.storeSet.size,
        storeNames: [...v.storeSet.values()].sort((a, b) => a.localeCompare(b, "ko")),
        lastAt: v.lastAt,
      }))
      .sort((a, b) => b.total - a.total);
  }, [filtered]);

  const totals = useMemo(() => {
    const uniqueStores = new Set(filtered.map((r) => r.store_slug)).size;
    return {
      // 전체 조회가 페이지네이션으로 누적되므로 화면 집계와 서버 count 중 큰 값(실데이터)을 사용
      events: Math.max(filtered.length, totalEventCount ?? 0),
      features: aggregated.length,
      stores: uniqueStores,
    };
  }, [filtered, aggregated, totalEventCount]);

  const handleExportXlsx = () => {
    const summaryHeader = ["순위", "제품", "특장점", "관심수", "매장수", "매장목록", "최근 반응"];
    const summaryRows = aggregated.map((r, i) => {
      const top = r.storeNames.slice(0, 5).join(", ");
      const rest = r.storeNames.length - 5;
      return [
        i + 1,
        r.productName,
        r.featureTitle,
        r.total,
        r.uniqueStores,
        rest > 0 ? `${top} +${rest}개 매장` : top,
        format(new Date(r.lastAt), "yyyy-MM-dd HH:mm", { locale: ko }),
      ];
    });

    const rawHeader = ["기록 시각", "매장", "매장코드", "제품", "특장점", "특장점ID"];
    const rawRows = [...filtered]
      .sort((a, b) => (a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0))
      .map((r) => [
        format(new Date(r.created_at), "yyyy-MM-dd HH:mm:ss", { locale: ko }),
        r.store_name || r.store_slug,
        r.store_slug,
        r.product_name || r.product_id,
        r.feature_title || r.feature_id,
        r.feature_id,
      ]);

    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.aoa_to_sheet([summaryHeader, ...summaryRows]);
    ws1["!cols"] = [{ wch: 6 }, { wch: 14 }, { wch: 34 }, { wch: 8 }, { wch: 8 }, { wch: 60 }, { wch: 18 }];
    const ws2 = XLSX.utils.aoa_to_sheet([rawHeader, ...rawRows]);
    ws2["!cols"] = [{ wch: 20 }, { wch: 16 }, { wch: 10 }, { wch: 14 }, { wch: 34 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(wb, ws1, "관심수 요약");
    XLSX.utils.book_append_sheet(wb, ws2, "원본 데이터");
    XLSX.writeFile(wb, `feature_reactions_summary_${format(new Date(), "yyyyMMdd")}.xlsx`, {
      bookType: "xlsx",
      compression: true,
    });
  };


  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 mb-6">
      <div className="flex items-center gap-2.5 mb-1">
        <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center">
          <Heart className="w-4 h-4 fill-rose-500" strokeWidth={2.4} />
        </div>
        <h2 className="text-base font-bold text-slate-900">콘텐츠 선호도</h2>
        <span className="text-xs text-slate-400">특장점 관심 표시 집계</span>
      </div>
      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
        관심 표시는 세션당 특장점별 최대 20회로 제한됩니다. 편향 판단을 위해 <b className="text-slate-700">매장 수</b> 지표를 함께 확인하세요.
      </p>

      <div className="flex flex-wrap items-end gap-3 mb-4">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-slate-500">기간</label>
          <select value={period} onChange={(e) => setPeriod(e.target.value as PeriodKey)} className={selectClass}>
            <option value="7">최근 7일</option>
            <option value="14">최근 14일</option>
            <option value="30">최근 30일</option>
            <option value="90">최근 90일</option>
            <option value="all">전체</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-slate-500">제품</label>
          <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className={selectClass}>
            <option value="all">전체</option>
            {products.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-slate-500">매장</label>
          <select value={storeFilter} onChange={(e) => setStoreFilter(e.target.value)} className={selectClass}>
            <option value="all">전체</option>
            {stores.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1" />
        <button
          type="button"
          onClick={handleExportXlsx}
          disabled={filtered.length === 0}
          className="h-9 px-3.5 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors disabled:opacity-40"
        >
          <Download className="w-3.5 h-3.5" /> 엑셀 다운로드 ({filtered.length.toLocaleString()})
        </button>


      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-xl bg-rose-50/60 border border-rose-100 px-4 py-3">
          <p className="text-[11px] text-rose-500 font-semibold mb-0.5">관심 이벤트</p>
          <p className="text-lg font-bold text-slate-900 tabular-nums">{totals.events.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
          <p className="text-[11px] text-slate-500 font-semibold mb-0.5">특장점</p>
          <p className="text-lg font-bold text-slate-900 tabular-nums">{totals.features.toLocaleString()}</p>
        </div>
        <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
          <p className="text-[11px] text-slate-500 font-semibold mb-0.5">참여 매장</p>
          <p className="text-lg font-bold text-slate-900 tabular-nums">{totals.stores.toLocaleString()}</p>
        </div>
      </div>

      {loading ? (
        <div className="py-10 text-center text-sm text-slate-400">불러오는 중…</div>
      ) : aggregated.length === 0 ? (
        <div className="py-10 text-center">
          <TrendingUp className="w-8 h-8 mx-auto text-slate-300 mb-2" />
          <p className="text-sm text-slate-500">해당 조건의 관심 표시 데이터가 아직 없습니다</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <th className="py-2 pr-3 font-medium w-12">순위</th>
                <th className="py-2 pr-4 font-medium">제품</th>
                <th className="py-2 pr-4 font-medium">특장점</th>
                <th className="py-2 pr-4 font-medium text-right">관심 수</th>
                <th className="py-2 pr-4 font-medium">매장</th>
                <th className="py-2 pr-2 font-medium text-right">최근 반응</th>
              </tr>
            </thead>
            <tbody>
              {aggregated.map((r, i) => {
                const maxTotal = aggregated[0]?.total || 1;
                const barPct = Math.max(4, Math.round((r.total / maxTotal) * 100));
                const rowKey = `${r.productId}::${r.featureId}`;
                const isExpanded = expandedKeys.has(rowKey);
                const visibleStores = isExpanded ? r.storeNames : r.storeNames.slice(0, 5);
                const hasMore = r.storeNames.length > 5;
                return (
                  <tr key={rowKey} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                    <td className="py-2.5 pr-3 text-slate-400 tabular-nums">{i + 1}</td>
                    <td className="py-2.5 pr-4 text-slate-600 text-xs">{r.productName}</td>
                    <td className="py-2.5 pr-4 text-slate-800 font-medium">
                      <div className="flex items-center gap-2">
                        <span className="min-w-0 truncate max-w-[280px]" title={r.featureTitle}>
                          {r.featureTitle}
                        </span>
                      </div>
                      <div className="mt-1 h-1 w-full max-w-[200px] rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-rose-400/70 rounded-full" style={{ width: `${barPct}%` }} />
                      </div>
                    </td>
                    <td className="py-2.5 pr-4 text-right text-rose-500 font-semibold tabular-nums">{r.total}</td>
                    <td className="py-2.5 pr-4 text-slate-600 text-xs">
                      <div className="flex flex-wrap gap-1 max-w-[240px]">
                        {visibleStores.map((name) => (
                          <span key={name} className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px]">
                            {name}
                          </span>
                        ))}
                        {hasMore && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(rowKey)}
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-slate-50 text-slate-500 text-[11px] hover:bg-slate-100 transition-colors"
                          >
                            {isExpanded ? (
                              <>
                                접기 <ChevronUp className="w-3 h-3" />
                              </>
                            ) : (
                              <>
                                +{r.storeNames.length - 5} 더보기 <ChevronDown className="w-3 h-3" />
                              </>
                            )}
                          </button>
                        )}
                        <span className="text-slate-400 text-[11px] ml-1">({r.uniqueStores})</span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-2 text-right text-slate-400 text-xs tabular-nums">
                      {format(new Date(r.lastAt), "yyyy.MM.dd HH:mm", { locale: ko })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default FeaturePreferenceSection;
