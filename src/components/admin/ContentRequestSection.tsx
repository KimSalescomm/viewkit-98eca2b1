import { useEffect, useMemo, useState } from "react";
import { Download, Inbox, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { REQUEST_CATEGORIES } from "@/components/ContentRequestButton";

const STATUSES = ["대기", "처리중", "완료"] as const;

interface RequestRow {
  id: string;
  store_code: string;
  store_name: string | null;
  category: string;
  title: string;
  content: string;
  status: string;
  created_at: string;
}

const statusStyle: Record<string, string> = {
  대기: "bg-slate-100 text-slate-600 border-slate-200",
  처리중: "bg-amber-50 text-amber-700 border-amber-200",
  완료: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("ko-KR", { dateStyle: "short", timeStyle: "short" });

const ContentRequestSection = () => {
  const [rows, setRows] = useState<RequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("content_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2000);
    setLoading(false);
    if (error) {
      console.warn("[contentRequest] fetch failed", error);
      return;
    }
    setRows((data ?? []) as RequestRow[]);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return rows.filter((r) => {
      if (categoryFilter !== "all" && r.category !== categoryFilter) return false;
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (kw) {
        const hay = `${r.store_name ?? ""} ${r.store_code} ${r.title} ${r.content}`.toLowerCase();
        if (!hay.includes(kw)) return false;
      }
      return true;
    });
  }, [rows, keyword, categoryFilter, statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    const prev = rows;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    const { error } = await supabase.from("content_requests").update({ status }).eq("id", id);
    if (error) {
      setRows(prev);
      toast.error("상태 변경에 실패했습니다");
      return;
    }
    toast.success(`상태를 '${status}'로 변경했습니다`);
  };

  const downloadCsv = () => {
    const header = ["등록일시", "지점코드", "지점명", "요청유형", "제목", "내용", "상태"];
    const body = filtered.map((r) =>
      [
        formatDate(r.created_at),
        r.store_code,
        r.store_name ?? "",
        r.category,
        r.title,
        r.content,
        r.status,
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    );
    const csv = "\uFEFF" + [header.join(","), ...body].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `매장요청_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectClass =
    "h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 outline-none focus:border-[#3182CE]";

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
          <label className="text-[11px] font-medium text-slate-500">검색 (지점명/제목/내용)</label>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="예: 강서본점"
            className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 outline-none focus:border-[#3182CE]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-slate-500">요청유형</label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={selectClass}>
            <option value="all">전체</option>
            {REQUEST_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-medium text-slate-500">상태</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectClass}>
            <option value="all">전체</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 ml-auto">
          <button
            type="button"
            onClick={load}
            className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 inline-flex items-center gap-1.5 hover:bg-slate-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            새로고침
          </button>
          <button
            type="button"
            onClick={downloadCsv}
            className="h-9 px-3 rounded-lg bg-[#3182CE] text-white text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            CSV 다운로드
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <Inbox className="w-10 h-10 mx-auto text-slate-300 mb-3" />
          <p className="text-sm text-slate-500">
            {loading ? "불러오는 중..." : "조건에 맞는 요청이 없습니다"}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 text-xs text-slate-500">
            총 <span className="font-semibold text-slate-700 tabular-nums">{filtered.length}</span>건
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="text-left text-[11px] text-slate-400 border-b border-slate-100">
                  <th className="py-2.5 px-4 font-medium whitespace-nowrap">등록일시</th>
                  <th className="py-2.5 px-4 font-medium whitespace-nowrap">지점코드</th>
                  <th className="py-2.5 px-4 font-medium whitespace-nowrap">지점명</th>
                  <th className="py-2.5 px-4 font-medium whitespace-nowrap">요청유형</th>
                  <th className="py-2.5 px-4 font-medium whitespace-nowrap">제목</th>
                  <th className="py-2.5 px-4 font-medium">내용</th>
                  <th className="py-2.5 px-4 font-medium whitespace-nowrap">상태</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-slate-50 align-top">
                    <td className="py-3 px-4 text-slate-500 text-xs whitespace-nowrap tabular-nums">
                      {formatDate(r.created_at)}
                    </td>
                    <td className="py-3 px-4 text-slate-600 text-xs font-semibold whitespace-nowrap">{r.store_code}</td>
                    <td className="py-3 px-4 text-slate-700 text-xs whitespace-nowrap">{r.store_name ?? "-"}</td>
                    <td className="py-3 px-4 text-slate-600 text-xs whitespace-nowrap">{r.category}</td>
                    <td className="py-3 px-4 text-slate-800 text-xs font-semibold break-keep max-w-[200px]">{r.title}</td>
                    <td className="py-3 px-4 text-slate-600 text-xs whitespace-pre-line break-keep max-w-[320px]">
                      {r.content}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={r.status}
                        onChange={(e) => updateStatus(r.id, e.target.value)}
                        className={`h-8 px-2 rounded-lg border text-xs font-semibold outline-none ${
                          statusStyle[r.status] ?? statusStyle["대기"]
                        }`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentRequestSection;
