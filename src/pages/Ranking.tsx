import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, ArrowLeft, Trash2, Medal } from "lucide-react";
import { getSales, clearSales } from "@/utils/salesLog";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const Ranking = () => {
  const [version, setVersion] = useState(0);
  const sales = useMemo(() => getSales(), [version]);

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

  const recent = useMemo(() => [...sales].reverse().slice(0, 20), [sales]);

  const handleClear = () => {
    if (!confirm("저장된 모든 판매 기록을 삭제하시겠어요?")) return;
    clearSales();
    setVersion((v) => v + 1);
  };

  const medal = (i: number) =>
    i === 0 ? "text-yellow-500" : i === 1 ? "text-slate-400" : i === 2 ? "text-amber-700" : "text-slate-300";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <div className="max-w-3xl mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> 제품 페이지로
          </Link>
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-500 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> 기록 초기화
          </button>
        </div>

        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-9 h-9 rounded-xl bg-[#3182CE]/10 text-[#3182CE] flex items-center justify-center">
            <Trophy className="w-5 h-5" strokeWidth={2.4} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">실시간 판매 순위</h1>
        </div>
        <p className="text-sm text-slate-500 mb-8">총 {sales.length}건의 판매가 기록되었습니다</p>

        {sales.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <Trophy className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <p className="text-sm text-slate-500">아직 기록된 판매가 없습니다</p>
            <p className="text-xs text-slate-400 mt-1">우측 하단 '판매인증' 버튼으로 첫 실적을 등록해 보세요</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">지점별 순위</h2>
              <ul className="space-y-2.5">
                {byBranch.map(([name, count], i) => (
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
          ※ 현재 데이터는 이 기기 브라우저에만 저장됩니다 (Lovable Cloud 연동 시 매장 전체 합산 가능)
        </p>
      </div>
    </div>
  );
};

export default Ranking;
