import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, ArrowLeft, Medal, Users, ShieldCheck } from "lucide-react";
import { getSales, SaleRecord } from "@/utils/salesLog";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { BRANCH_GROUPS, getManagerByBranch, isAdminStore } from "@/data/branches";
import { getCurrentStore } from "@/utils/storeId";

const Ranking = () => {
  const [sales, setSales] = useState<SaleRecord[]>([]);
  useEffect(() => {
    let cancelled = false;
    getSales().then((rows) => {
      if (!cancelled) setSales(rows);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const currentStore = getCurrentStore();
  const isAdmin = isAdminStore(currentStore?.slug);

  const byBranch = useMemo(() => {
    const map = new Map<string, number>();
    sales.forEach((s) => map.set(s.branch, (map.get(s.branch) ?? 0) + 1));
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [sales]);

  const byProduct = useMemo(() => {
    const map = new Map<string, number>();
    sales.forEach((s) => map.set(s.product, (map.get(s.product) ?? 0) + 1));
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [sales]);

  // 담당별 집계: 참여 지점 수 / 전체 지점 수, 총 인증 건수
  const byManager = useMemo(() => {
    const participatedByBranch = new Set(sales.map((s) => s.branch));
    const countsByManager = new Map<string, number>();
    sales.forEach((s) => {
      const m = getManagerByBranch(s.branch);
      if (!m) return;
      countsByManager.set(m, (countsByManager.get(m) ?? 0) + 1);
    });
    return BRANCH_GROUPS.map((g) => {
      const participated = g.branches.filter((b) => participatedByBranch.has(b)).length;
      return {
        manager: g.manager,
        total: g.branches.length,
        participated,
        rate: g.branches.length === 0 ? 0 : Math.round((participated / g.branches.length) * 100),
        sales: countsByManager.get(g.manager) ?? 0,
      };
    }).sort((a, b) => b.rate - a.rate || b.sales - a.sales);
  }, [sales]);

  const recent = useMemo(() => [...sales].reverse().slice(0, 20), [sales]);

  const medal = (i: number) =>
    i === 0 ? "text-yellow-500" : i === 1 ? "text-slate-400" : i === 2 ? "text-amber-700" : "text-slate-300";

  const overallParticipated = useMemo(
    () => new Set(sales.map((s) => s.branch).filter((b) => getManagerByBranch(b))).size,
    [sales],
  );
  const overallTotal = BRANCH_GROUPS.reduce((acc, g) => acc + g.branches.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> 제품 페이지로
          </Link>
          {isAdmin && (
            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-[#A50034]/10 text-[#A50034] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> 관리자 (SC) · 누적 보존
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-9 h-9 rounded-xl bg-[#3182CE]/10 text-[#3182CE] flex items-center justify-center">
            <Trophy className="w-5 h-5" strokeWidth={2.4} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">실시간 판매 순위</h1>
        </div>
        <p className="text-sm text-slate-500 mb-8">
          총 {sales.length}건 · 참여 지점 {overallParticipated} / {overallTotal}개
        </p>

        {/* 담당별 참여율 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-[#3182CE]" />
            <h2 className="text-sm font-semibold text-slate-900">담당별 참여율</h2>
          </div>
          <ul className="space-y-3">
            {byManager.map((m) => (
              <li key={m.manager} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800 w-10">{m.manager}</span>
                    <span className="text-xs text-slate-500 tabular-nums">
                      {m.participated} / {m.total} 지점
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 tabular-nums">인증 {m.sales}건</span>
                    <span className="text-sm font-bold text-[#3182CE] tabular-nums w-12 text-right">
                      {m.rate}%
                    </span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#3182CE] to-[#5BA8E8] transition-all"
                    style={{ width: `${m.rate}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {sales.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <Trophy className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <p className="text-sm text-slate-500">아직 기록된 판매가 없습니다</p>
            <p className="text-xs text-slate-400 mt-1">우측 하단 '판매 인증' 버튼으로 첫 실적을 등록해 보세요</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">지점별 순위</h2>
              <ul className="space-y-2.5">
                {byBranch.map(([name, count], i) => (
                  <li key={name} className="flex items-center justify-between rounded-xl bg-slate-50/70 px-3.5 py-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Medal className={`w-4 h-4 shrink-0 ${medal(i)}`} strokeWidth={2.4} />
                      <span className="text-sm text-slate-800 font-medium truncate">{name}</span>
                      {getManagerByBranch(name) && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-500 shrink-0">
                          {getManagerByBranch(name)}
                        </span>
                      )}
                    </div>
                    <span className="text-sm tabular-nums text-[#3182CE] font-semibold shrink-0">{count}건</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">제품별 순위</h2>
              <ul className="space-y-2.5">
                {byProduct.map(([name, count], i) => (
                  <li key={name} className="flex items-center justify-between rounded-xl bg-slate-50/70 px-3.5 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <Medal className={`w-4 h-4 ${medal(i)}`} strokeWidth={2.4} />
                      <span className="text-sm text-slate-800 font-medium">{name}</span>
                    </div>
                    <span className="text-sm tabular-nums text-[#3182CE] font-semibold">{count}건</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {recent.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">최근 기록</h2>
            <ul className="divide-y divide-slate-100">
              {recent.map((r, i) => (
                <li key={i} className="py-2.5 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-800 font-medium">{r.branch}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-600">{r.product}</span>
                    {getManagerByBranch(r.branch) && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
                        {getManagerByBranch(r.branch)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 tabular-nums">
                    {format(new Date(r.created_at), "MM.dd HH:mm", { locale: ko })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-[11px] text-slate-400 mt-6 text-center">
          ※ 데이터는 Lovable Cloud에 누적 저장되며 SC 관리자 계정에서는 절대 삭제되지 않습니다.
        </p>
      </div>
    </div>
  );
};

export default Ranking;
