import { useEffect, useState } from "react";
import { Trash2, Plus, Monitor, GripVertical } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface ScreensaverRow {
  id: string;
  url: string;
  is_youtube: boolean;
  sort_order: number;
  enabled: boolean;
  label: string | null;
  created_at: string;
}

// 패스코드는 메모리에만 보관 (sessionStorage/localStorage 금지)
let inMemoryPasscode: string | null = null;

const askPasscode = (): string | null => {
  if (inMemoryPasscode) return inMemoryPasscode;
  const code = window.prompt(
    "스크린세이버를 변경하려면 관리자 패스코드를 입력해 주세요.",
    "",
  );
  if (!code) return null;
  const trimmed = code.trim();
  if (!trimmed) return null;
  inMemoryPasscode = trimmed;
  return trimmed;
};

const clearCachedPasscode = () => {
  inMemoryPasscode = null;
};

const callAdmin = async (
  body: Record<string, unknown>,
): Promise<{ ok: boolean; error?: string }> => {
  const passcode = askPasscode();
  if (!passcode) return { ok: false, error: "패스코드가 필요합니다." };
  const { data, error } = await supabase.functions.invoke("screensaver-admin", {
    body: { ...body, passcode },
  });
  if (error || !data?.ok) {
    const message =
      (data as { error?: string } | null)?.error ?? error?.message ?? "요청 실패";
    if (/unauthorized/i.test(message)) {
      clearCachedPasscode();
      alert("패스코드가 올바르지 않습니다. 다시 시도해 주세요.");
    } else {
      alert(`처리 실패: ${message}`);
    }
    return { ok: false, error: message };
  }
  return { ok: true };
};

const detectYouTube = (url: string) => /(?:youtube\.com|youtu\.be)/i.test(url);

const ScreensaverManager = () => {
  const [rows, setRows] = useState<ScreensaverRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await (supabase as any)
      .from("screensaver_videos")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    setRows((data ?? []) as ScreensaverRow[]);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const handleAdd = async () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    if (!/^https?:\/\//i.test(trimmed)) {
      alert("올바른 URL을 입력해 주세요 (http/https로 시작).");
      return;
    }
    setBusy(true);
    const res = await callAdmin({
      action: "add",
      url: trimmed,
      label: label.trim() || null,
    });
    setBusy(false);
    if (!res.ok) return;
    setUrl("");
    setLabel("");
    void load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("이 영상을 목록에서 삭제하시겠어요?")) return;
    const res = await callAdmin({ action: "delete", id });
    if (res.ok) void load();
  };

  const handleToggle = async (row: ScreensaverRow) => {
    const res = await callAdmin({
      action: "toggle",
      id: row.id,
      enabled: !row.enabled,
    });
    if (res.ok) void load();
  };

  const handleMove = async (idx: number, dir: -1 | 1) => {
    const target = rows[idx];
    const swap = rows[idx + dir];
    if (!target || !swap) return;
    const res = await callAdmin({
      action: "swap_order",
      a_id: target.id,
      b_id: swap.id,
      a_order: target.sort_order,
      b_order: swap.sort_order,
    });
    if (res.ok) void load();
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 mb-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 rounded-lg bg-[#3182CE]/10 text-[#3182CE] flex items-center justify-center">
          <Monitor className="w-4 h-4" strokeWidth={2.4} />
        </div>
        <h2 className="text-base font-semibold text-slate-900">
          대기용 영상 플레이리스트
        </h2>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        90초 동안 화면 조작이 없으면 등록된 영상이 전면에 순환 재생됩니다. (세로형 영상 권장 · YouTube/MP4/WebM 지원 · 관리자 전용)
      </p>

      {/* 추가 폼 */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="영상 URL (https://...)"
            maxLength={1000}
            className="flex-1 h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3182CE]/15 focus:border-[#3182CE]"
          />
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="메모 (선택)"
            maxLength={100}
            className="sm:w-48 h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3182CE]/15 focus:border-[#3182CE]"
          />
          <button
            type="button"
            onClick={() => void handleAdd()}
            disabled={busy || !url.trim()}
            className="h-10 px-4 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#3182CE] text-white text-sm font-semibold hover:bg-[#2c74b8] transition-colors disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> 추가
          </button>
        </div>
      </div>

      {/* 목록 */}
      {loading ? (
        <p className="text-xs text-slate-400 py-6 text-center">불러오는 중...</p>
      ) : rows.length === 0 ? (
        <p className="text-xs text-slate-400 py-6 text-center">
          등록된 영상이 없습니다. URL을 추가해 주세요.
        </p>
      ) : (
        <ul className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
          {rows.map((row, i) => (
            <li
              key={row.id}
              className={cn(
                "flex items-center gap-2 px-3 py-2.5 text-sm",
                !row.enabled && "bg-slate-50/60 opacity-60",
              )}
            >
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => void handleMove(i, -1)}
                  disabled={i === 0}
                  aria-label="위로"
                  className="text-slate-300 hover:text-slate-600 disabled:opacity-30 leading-none text-xs"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => void handleMove(i, 1)}
                  disabled={i === rows.length - 1}
                  aria-label="아래로"
                  className="text-slate-300 hover:text-slate-600 disabled:opacity-30 leading-none text-xs"
                >
                  ▼
                </button>
              </div>
              <GripVertical className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0",
                  row.is_youtube
                    ? "bg-rose-50 text-rose-600"
                    : "bg-sky-50 text-sky-600",
                )}
              >
                {row.is_youtube ? "YT" : "MP4"}
              </span>
              <div className="flex-1 min-w-0">
                {row.label && (
                  <div className="text-xs text-slate-700 font-medium truncate">
                    {row.label}
                  </div>
                )}
                <div className="text-[11px] text-slate-400 truncate">
                  {row.url}
                </div>
              </div>
              <label className="inline-flex items-center gap-1 text-[11px] text-slate-500 shrink-0">
                <input
                  type="checkbox"
                  checked={row.enabled}
                  onChange={() => void handleToggle(row)}
                  className="w-3.5 h-3.5 rounded border-slate-300 text-[#3182CE] focus:ring-[#3182CE]/30"
                />
                활성
              </label>
              <button
                type="button"
                onClick={() => void handleDelete(row.id)}
                aria-label="삭제"
                className="inline-flex items-center justify-center w-7 h-7 rounded-md text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScreensaverManager;
