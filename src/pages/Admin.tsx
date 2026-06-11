import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  ArrowLeft,
  Trash2,
  Download,
  Trophy,
  Medal,
  LogOut,
  Lock,
} from "lucide-react";
import { getSales, clearAllSales, deleteSale, deleteSalesByIds, SaleRecord } from "@/utils/salesLog";
import StoreVisitStats from "@/components/StoreVisitStats";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";

// 패스코드는 서버(Edge Function: admin-login)에서 검증합니다.
const AUTH_KEY = "viewkit_admin_auth";

// 모바일 브라우저(특히 iOS Safari)에서도 안정적으로 동작하는 CSV 다운로드 헬퍼
const downloadCsv = (csv: string, filename: string) => {
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8;" });
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  // iOS Safari는 download 속성을 무시하므로 새 탭에서 열어 사용자가 저장하도록 유도
  if (isIOS) a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1000);
};

const useAuth = () => {
  const [authed, setAuthed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === "1";
    } catch {
      return false;
    }
  });
  const login = async (code: string): Promise<boolean> => {
    const trimmed = code.trim();
    if (!trimmed) return false;
    try {
      const { data, error } = await supabase.functions.invoke("admin-login", {
        body: { code: trimmed },
      });
      if (error || !data?.ok) return false;
      try {
        sessionStorage.setItem(AUTH_KEY, "1");
      } catch {
        /* noop */
      }
      setAuthed(true);
      return true;
    } catch {
      return false;
    }
  };
  const logout = () => {
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      /* noop */
    }
    setAuthed(false);
  };
  return { authed, login, logout };
};

const Gate = ({ onPass }: { onPass: (code: string) => Promise<boolean> }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const submit = async () => {
    if (busy) return;
    setBusy(true);
    const ok = await onPass(code);
    setBusy(false);
    if (!ok) setErr(true);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.18)]">
        <div className="mx-auto w-12 h-12 rounded-xl bg-[#3182CE]/10 text-[#3182CE] flex items-center justify-center mb-4">
          <Lock className="w-6 h-6" strokeWidth={2.2} />
        </div>
        <h1 className="text-lg font-semibold text-slate-900 text-center mb-1">관리자 모드</h1>
        <p className="text-xs text-slate-500 text-center mb-6">
          판매 인증 대시보드 접근을 위한 패스코드를 입력해 주세요
        </p>
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={code}
          disabled={busy}
          onChange={(e) => {
            setCode(e.target.value);
            setErr(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") void submit();
          }}
          placeholder="패스코드"
          className={cn(
            "w-full h-11 px-3.5 rounded-xl border bg-white text-slate-800 text-sm tracking-widest text-center",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            err
              ? "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
              : "border-slate-200 focus:border-[#3182CE] focus:ring-[#3182CE]/15",
          )}
        />
        {err && <p className="text-xs text-rose-500 mt-2 text-center">패스코드가 올바르지 않습니다</p>}
        <button
          type="button"
          disabled={busy}
          onClick={() => void submit()}
          className="mt-4 w-full h-11 rounded-xl bg-[#3182CE] text-white text-sm font-semibold hover:bg-[#2c74b8] transition-colors disabled:opacity-60"
        >
          {busy ? "확인 중..." : "입장"}
        </button>
        <Link
          to="/"
          className="mt-3 block text-center text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          제품 페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
};


const medalColor = (i: number) =>
  i === 0 ? "text-yellow-500" : i === 1 ? "text-slate-400" : i === 2 ? "text-amber-700" : "text-slate-300";

const toCsv = (rows: SaleRecord[]) => {
  const header = ["branch", "product", "sold_at", "created_at"];
  const body = rows.map((r) =>
    [r.branch, r.product, r.sold_at, r.created_at].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","),
  );
  return [header.join(","), ...body].join("\n");
};

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [version, setVersion] = useState(0);
  const [sales, setSales] = useState<SaleRecord[]>([]);
  useEffect(() => {
    let cancelled = false;
    getSales().then((rows) => {
      if (!cancelled) setSales(rows);
    });
    return () => {
      cancelled = true;
    };
  }, [version]);

  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [productFilter, setProductFilter] = useState<string>("all");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const branches = useMemo(() => [...new Set(sales.map((s) => s.branch))], [sales]);
  const productList = useMemo(() => [...new Set(sales.map((s) => s.product))], [sales]);

  const filtered = useMemo(() => {
    return sales.filter((s) => {
      if (branchFilter !== "all" && s.branch !== branchFilter) return false;
      if (productFilter !== "all" && s.product !== productFilter) return false;
      if (from && s.sold_at < from) return false;
      if (to && s.sold_at > to) return false;
      return true;
    });
  }, [sales, branchFilter, productFilter, from, to]);

  const byBranch = useMemo(() => {
    const m = new Map<string, number>();
    filtered.forEach((s) => m.set(s.branch, (m.get(s.branch) ?? 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [filtered]);

  const byProduct = useMemo(() => {
    const m = new Map<string, number>();
    filtered.forEach((s) => m.set(s.product, (m.get(s.product) ?? 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [filtered]);

  const recent = useMemo(() => [...filtered].reverse(), [filtered]);

  // 선택 삭제 상태
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const toggleSelectAll = () => {
    const ids = recent.map((r) => r.id).filter(Boolean) as string[];
    setSelected((prev) => (prev.size === ids.length ? new Set() : new Set(ids)));
  };
  const clearSelection = () => setSelected(new Set());

  const handleDeleteOne = async (id?: string) => {
    if (!id) return;
    if (!confirm("이 판매 기록 1건을 삭제하시겠어요?")) return;
    const ok = await deleteSale(id);
    if (!ok) {
      alert("삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }
    clearSelection();
    setVersion((v) => v + 1);
  };

  const handleDeleteSelected = async () => {
    if (selected.size === 0) return;
    if (!confirm(`선택한 ${selected.size}건을 삭제하시겠어요? 되돌릴 수 없습니다.`)) return;
    const ok = await deleteSalesByIds([...selected]);
    if (!ok) {
      alert("선택 삭제에 실패했습니다.");
      return;
    }
    clearSelection();
    setVersion((v) => v + 1);
  };

  const handleClear = async () => {
    if (!confirm("저장된 모든 판매 기록을 삭제하시겠어요? 되돌릴 수 없습니다.")) return;
    const ok = await clearAllSales();
    if (!ok) {
      alert("전체 초기화에 실패했습니다.");
      return;
    }
    clearSelection();
    setVersion((v) => v + 1);
  };

  const handleExport = () => {
    const csv = toCsv(filtered);
    downloadCsv(csv, `sales_${format(new Date(), "yyyyMMdd_HHmm")}.csv`);
  };

  const handleExportAll = async () => {
    const esc = (v: unknown) => {
      const s = String(v ?? "");
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const toRow = (arr: unknown[]) => arr.map(esc).join(",");

    // 페이지뷰(지점별 접속) 데이터 조회
    const SITE_OPEN = "2026-06-08T00:00:00Z";
    const { data: pvData } = await supabase
      .from("page_views")
      .select("store_id, store_name, session_id, created_at")
      .gte("created_at", SITE_OPEN)
      .order("created_at", { ascending: false })
      .limit(10000);
    const pvRows = (pvData || []).filter((r) => {
      const sid = (r.store_id || "").toUpperCase();
      return sid !== "SC" && sid !== "KOR";
    });
    const visitMap = new Map<string, { name: string; views: number; sessions: Set<string>; lastAt: string }>();
    pvRows.forEach((r) => {
      const cur = visitMap.get(r.store_id);
      if (cur) {
        cur.views += 1;
        cur.sessions.add(r.session_id);
        if (r.created_at > cur.lastAt) cur.lastAt = r.created_at;
      } else {
        visitMap.set(r.store_id, {
          name: r.store_name || r.store_id,
          views: 1,
          sessions: new Set([r.session_id]),
          lastAt: r.created_at,
        });
      }
    });
    const visitStats = [...visitMap.entries()]
      .map(([code, v]) => ({ code, name: v.name, views: v.views, visits: v.sessions.size, lastAt: v.lastAt }))
      .sort((a, b) => b.views - a.views);

    const sections: string[] = [];
    const stamp = format(new Date(), "yyyy-MM-dd HH:mm", { locale: ko });

    sections.push(toRow(["관리자 대시보드 내보내기"]));
    sections.push(toRow(["생성 시각", stamp]));
    sections.push(toRow(["판매 기록 총건수", sales.length]));
    sections.push(toRow(["필터 결과 건수", filtered.length]));
    sections.push("");

    sections.push(toRow(["[1] 지점별 접속 통계 (사이트 오픈일 이후)"]));
    sections.push(toRow(["순위", "지점", "코드", "페이지뷰", "방문(세션)", "최근 접속"]));
    visitStats.forEach((s, i) =>
      sections.push(
        toRow([
          i + 1,
          s.name,
          s.code,
          s.views,
          s.visits,
          format(new Date(s.lastAt), "yyyy-MM-dd HH:mm:ss", { locale: ko }),
        ]),
      ),
    );
    sections.push("");

    sections.push(toRow([`[2] 지점별 판매 순위 (필터 적용, ${filtered.length}건 기준)`]));
    sections.push(toRow(["순위", "지점", "판매건수"]));
    byBranch.forEach(([name, count], i) => sections.push(toRow([i + 1, name, count])));
    sections.push("");

    sections.push(toRow(["[3] 제품별 판매 순위 (필터 적용)"]));
    sections.push(toRow(["순위", "제품", "판매건수"]));
    byProduct.forEach(([name, count], i) => sections.push(toRow([i + 1, name, count])));
    sections.push("");

    sections.push(toRow(["[4] 전체 판매 기록 (필터 적용)"]));
    sections.push(toRow(["#", "지점", "제품", "판매일", "기록 시각"]));
    recent.forEach((r, i) =>
      sections.push(
        toRow([
          recent.length - i,
          r.branch,
          r.product,
          r.sold_at,
          format(new Date(r.created_at), "yyyy-MM-dd HH:mm:ss", { locale: ko }),
        ]),
      ),
    );

    const csv = sections.join("\n");
    downloadCsv(csv, `dashboard_${format(new Date(), "yyyyMMdd_HHmm")}.csv`);
  };

  const handleExportVisits = async () => {
    const esc = (v: unknown) => {
      const s = String(v ?? "");
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const toRow = (arr: unknown[]) => arr.map(esc).join(",");
    const SITE_OPEN = "2026-06-08T00:00:00Z";
    const { data } = await supabase
      .from("page_views")
      .select("store_id, store_name, session_id, created_at")
      .gte("created_at", SITE_OPEN)
      .order("created_at", { ascending: false })
      .limit(10000);
    const pvRows = (data || []).filter((r) => {
      const sid = (r.store_id || "").toUpperCase();
      return sid !== "SC" && sid !== "KOR";
    });
    const map = new Map<string, { name: string; views: number; sessions: Set<string>; lastAt: string }>();
    pvRows.forEach((r) => {
      const cur = map.get(r.store_id);
      if (cur) {
        cur.views += 1;
        cur.sessions.add(r.session_id);
        if (r.created_at > cur.lastAt) cur.lastAt = r.created_at;
      } else {
        map.set(r.store_id, {
          name: r.store_name || r.store_id,
          views: 1,
          sessions: new Set([r.session_id]),
          lastAt: r.created_at,
        });
      }
    });
    const stats = [...map.entries()]
      .map(([code, v]) => ({ code, name: v.name, views: v.views, visits: v.sessions.size, lastAt: v.lastAt }))
      .sort((a, b) => b.views - a.views);
    const lines = [
      toRow(["순위", "지점", "코드", "페이지뷰", "방문(세션)", "최근 접속"]),
      ...stats.map((s, i) =>
        toRow([
          i + 1,
          s.name,
          s.code,
          s.views,
          s.visits,
          format(new Date(s.lastAt), "yyyy-MM-dd HH:mm:ss", { locale: ko }),
        ]),
      ),
    ];
    const csv = lines.join("\n");
    const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `visits_${format(new Date(), "yyyyMMdd_HHmm")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectClass =
    "h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 " +
    "focus:outline-none focus:ring-2 focus:ring-[#3182CE]/15 focus:border-[#3182CE]";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <div className="max-w-5xl mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> 제품 페이지로
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-700 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> 로그아웃
          </button>
        </div>

        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-9 h-9 rounded-xl bg-[#3182CE]/10 text-[#3182CE] flex items-center justify-center">
            <Shield className="w-5 h-5" strokeWidth={2.4} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">관리자 대시보드</h1>
        </div>
        <p className="text-sm text-slate-500 mb-6">
          전체 {sales.length}건 · 필터 결과 {filtered.length}건
        </p>

        {/* 필터 / 액션 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 mb-6 flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-500">지점</label>
            <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)} className={selectClass}>
              <option value="all">전체</option>
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-500">제품</label>
            <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className={selectClass}>
              <option value="all">전체</option>
              {productList.map((p) => (
                <option key={p} value={p}>
                  {p}
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
            onClick={() => void handleExportAll()}
            className="h-9 px-3.5 inline-flex items-center gap-1.5 rounded-lg bg-[#3182CE] text-white text-xs font-semibold hover:bg-[#2c74b8] transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> 전체 대시보드 CSV
          </button>
          <button
            type="button"
            onClick={() => void handleExportVisits()}
            className="h-9 px-3.5 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> 접속기록 CSV
          </button>
          <button
            type="button"
            onClick={handleExport}
            disabled={filtered.length === 0}
            className="h-9 px-3.5 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="w-3.5 h-3.5" /> 판매기록 CSV
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={sales.length === 0}
            className="h-9 px-3.5 inline-flex items-center gap-1.5 rounded-lg border border-rose-200 text-rose-500 text-xs font-semibold hover:bg-rose-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-3.5 h-3.5" /> 전체 초기화
          </button>
        </div>

        <StoreVisitStats />


        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <Trophy className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <p className="text-sm text-slate-500">조건에 맞는 판매 기록이 없습니다</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h2 className="text-sm font-semibold text-slate-900 mb-4">지점별 순위</h2>
                <ul className="space-y-2.5">
                  {byBranch.map(([name, count], i) => (
                    <li
                      key={name}
                      className="flex items-center justify-between rounded-xl bg-slate-50/70 px-3.5 py-2.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <Medal className={`w-4 h-4 ${medalColor(i)}`} strokeWidth={2.4} />
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
                    <li
                      key={name}
                      className="flex items-center justify-between rounded-xl bg-slate-50/70 px-3.5 py-2.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <Medal className={`w-4 h-4 ${medalColor(i)}`} strokeWidth={2.4} />
                        <span className="text-sm text-slate-800 font-medium">{name}</span>
                      </div>
                      <span className="text-sm tabular-nums text-[#3182CE] font-semibold">{count}건</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                <h2 className="text-sm font-semibold text-slate-900">전체 기록 ({recent.length}건)</h2>
                {selected.size > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{selected.size}건 선택됨</span>
                    <button
                      type="button"
                      onClick={clearSelection}
                      className="h-8 px-2.5 rounded-lg text-xs text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                      선택 해제
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteSelected}
                      className="h-8 px-3 inline-flex items-center gap-1.5 rounded-lg bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> 선택 삭제
                    </button>
                  </div>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
                      <th className="py-2 pr-3 font-medium w-8">
                        <input
                          type="checkbox"
                          aria-label="전체 선택"
                          checked={recent.length > 0 && selected.size === recent.length}
                          onChange={toggleSelectAll}
                          className="w-3.5 h-3.5 rounded border-slate-300 text-[#3182CE] focus:ring-[#3182CE]/30"
                        />
                      </th>
                      <th className="py-2 pr-4 font-medium">#</th>
                      <th className="py-2 pr-4 font-medium">지점</th>
                      <th className="py-2 pr-4 font-medium">제품</th>
                      <th className="py-2 pr-4 font-medium">판매일</th>
                      <th className="py-2 pr-4 font-medium">기록 시각</th>
                      <th className="py-2 pr-2 font-medium w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((r, i) => {
                      const id = r.id ?? "";
                      const isChecked = id ? selected.has(id) : false;
                      return (
                        <tr
                          key={id || i}
                          className={cn(
                            "border-b border-slate-50 last:border-0 transition-colors",
                            isChecked ? "bg-rose-50/40" : "hover:bg-slate-50/60",
                          )}
                        >
                          <td className="py-2.5 pr-3">
                            <input
                              type="checkbox"
                              aria-label="행 선택"
                              checked={isChecked}
                              disabled={!id}
                              onChange={() => id && toggleSelect(id)}
                              className="w-3.5 h-3.5 rounded border-slate-300 text-[#3182CE] focus:ring-[#3182CE]/30"
                            />
                          </td>
                          <td className="py-2.5 pr-4 text-slate-400 tabular-nums">{recent.length - i}</td>
                          <td className="py-2.5 pr-4 text-slate-800 font-medium">{r.branch}</td>
                          <td className="py-2.5 pr-4 text-slate-600">{r.product}</td>
                          <td className="py-2.5 pr-4 text-slate-600 tabular-nums">{r.sold_at}</td>
                          <td className="py-2.5 pr-4 text-slate-400 tabular-nums text-xs">
                            {format(new Date(r.created_at), "yyyy.MM.dd HH:mm", { locale: ko })}
                          </td>
                          <td className="py-2.5 pr-2 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteOne(id)}
                              disabled={!id}
                              aria-label="삭제"
                              className="inline-flex items-center justify-center w-7 h-7 rounded-md text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors disabled:opacity-30"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        <p className="text-[11px] text-slate-400 mt-6 text-center">
          ※ 데이터는 Lovable Cloud에 영구 저장되며 모든 매장에서 공유됩니다
        </p>
      </div>
    </div>
  );
};

const Admin = () => {
  const { authed, login, logout } = useAuth();
  useEffect(() => {
    document.title = "관리자 대시보드 | ViewKit";
  }, []);
  if (!authed) return <Gate onPass={login} />;
  return <Dashboard onLogout={logout} />;
};

export default Admin;
