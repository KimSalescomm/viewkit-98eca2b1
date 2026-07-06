import { useEffect, useMemo, useState } from "react";
import { Eye, CheckCircle2, AlertCircle, PackageCheck } from "lucide-react";
import { featuresMap as draftFeaturesMap } from "@/data/features";
import { products as draftProducts } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_VISIBLE_PRODUCT_IDS } from "@/contexts/ContentContext";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

type Status = "idle" | "loading" | "success" | "error";

// 원고가 존재하는(featuresMap에 등록된) 제품만 노출 후보로 사용
const AUTHORED_PRODUCT_IDS = Object.keys(draftFeaturesMap);
// "구독" 카드는 별도 제품이지만 항상 노출 후보에 포함 (features에 없음)
const EXTRA_PRODUCT_IDS = ["subscription"];
const PUBLISHABLE_IDS = Array.from(
  new Set([...EXTRA_PRODUCT_IDS, ...AUTHORED_PRODUCT_IDS]),
);

const SUBSCRIPTION_ENTRY = { id: "subscription", name: "구독 케어" };

const ContentPublishCard = () => {
  const [lastPublishedAt, setLastPublishedAt] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [passcode, setPasscode] = useState<string>("");
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(DEFAULT_VISIBLE_PRODUCT_IDS),
  );

  const publishableProducts = useMemo(() => {
    const items = PUBLISHABLE_IDS.map((id) => {
      if (id === "subscription") return SUBSCRIPTION_ENTRY;
      const p = draftProducts.find((dp) => dp.id === id);
      return p ? { id: p.id, name: p.name } : null;
    }).filter((v): v is { id: string; name: string } => Boolean(v));
    return items;
  }, []);

  const fetchLatest = async () => {
    const { data } = await supabase
      .from("content_snapshots")
      .select("created_at, payload")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setLastPublishedAt(data?.created_at ?? null);
    const raw = data?.payload as { visibleProductIds?: unknown } | null;
    if (raw && Array.isArray(raw.visibleProductIds)) {
      const ids = raw.visibleProductIds.filter(
        (v): v is string => typeof v === "string",
      );
      if (ids.length > 0) setSelected(new Set(ids));
    }
  };

  useEffect(() => {
    void fetchLatest();
  }, []);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    if (status === "error") setStatus("idle");
  };

  const selectAll = () => setSelected(new Set(PUBLISHABLE_IDS));
  const clearAll = () => setSelected(new Set());

  const handlePublish = async () => {
    if (!passcode.trim()) {
      setStatus("error");
      setMessage("관리자 패스코드를 입력해 주세요.");
      return;
    }
    const selectedIds = publishableProducts
      .map((p) => p.id)
      .filter((id) => selected.has(id));
    const selectedNames = publishableProducts
      .filter((p) => selected.has(p.id))
      .map((p) => p.name)
      .join(", ");
    if (
      !confirm(
        selectedIds.length === 0
          ? "선택된 제품이 없습니다. 지점 계정에서 모든 제품 카드가 비활성으로 보이게 됩니다. 진행할까요?"
          : `지점 계정에서 다음 제품 카드만 활성화합니다 — ${selectedNames}. 진행할까요?`,
      )
    )
      return;

    setStatus("loading");
    setMessage("");
    try {
      const { data, error } = await supabase.functions.invoke("publish-content", {
        body: {
          passcode: passcode.trim(),
          visibleProductIds: selectedIds,
          published_by: "SC",
          note: `visibility: ${selectedIds.join(",")}`,
        },
      });
      if (error || !data?.ok) {
        setStatus("error");
        setMessage(
          (data as { error?: string })?.error ??
            error?.message ??
            "저장에 실패했습니다.",
        );
        return;
      }
      setStatus("success");
      setMessage(
        `노출 설정 저장 완료 — 지점 계정에 즉시 반영됩니다. (${selectedNames || "노출 없음"})`,
      );
      setPasscode("");
      await fetchLatest();
    } catch (e) {
      setStatus("error");
      setMessage(e instanceof Error ? e.message : "저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
          <Eye className="w-5 h-5" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-bold text-slate-900">제품 카드 노출 관리</h2>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            지점 계정(일반 매장·KOR)에서 <b>활성화</b>되어 클릭 가능한 제품 카드를 선택합니다.
            원고·이미지·순서 등 <b>콘텐츠 수정은 러버블 우측 상단 Publish</b>만으로 전 계정에 자동 반영됩니다.
            (SC 관리자 계정은 항상 전체 노출)
          </p>
          <p className="text-[11px] text-slate-400 mt-1.5">
            마지막 노출 설정 저장:{" "}
            {lastPublishedAt
              ? format(new Date(lastPublishedAt), "yyyy.MM.dd HH:mm", { locale: ko })
              : "기록 없음 (기본 노출 세트 사용 중)"}
          </p>
        </div>
      </div>

      {/* 제품 선택 */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
            <PackageCheck className="w-3.5 h-3.5" />
            노출 대상 제품 ({selected.size}/{publishableProducts.length})
          </div>
          <div className="inline-flex items-center gap-1.5">
            <button
              type="button"
              onClick={selectAll}
              className="text-[11px] font-semibold text-slate-600 hover:text-brand px-2 py-1 rounded-md hover:bg-white transition-colors"
            >
              전체 선택
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="text-[11px] font-semibold text-slate-500 hover:text-rose-500 px-2 py-1 rounded-md hover:bg-white transition-colors"
            >
              전체 해제
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5">
          {publishableProducts.map((p) => {
            const checked = selected.has(p.id);
            const featureCount = draftFeaturesMap[p.id]?.length ?? 0;
            return (
              <label
                key={p.id}
                className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 cursor-pointer text-xs transition-colors ${
                  checked
                    ? "border-brand/50 bg-white text-slate-900"
                    : "border-slate-200 bg-white/60 text-slate-600 hover:border-slate-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(p.id)}
                  className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand/30"
                />
                <span className="min-w-0 flex-1 truncate font-semibold">
                  {p.name}
                </span>
                {featureCount > 0 && (
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {featureCount}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* 액션 */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="password"
          value={passcode}
          onChange={(e) => {
            setPasscode(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="관리자 패스코드"
          className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand/15 focus:border-brand flex-1"
          disabled={status === "loading"}
        />
        <button
          type="button"
          onClick={handlePublish}
          disabled={status === "loading"}
          className="h-10 px-4 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-1.5"
        >
          <Eye className="w-4 h-4" />
          {status === "loading" ? "저장 중..." : "노출 설정 저장"}
        </button>
      </div>

      {status === "success" && message && (
        <div className="mt-3 flex items-start gap-1.5 text-xs text-emerald-600">
          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>{message}</span>
        </div>
      )}
      {status === "error" && message && (
        <div className="mt-3 flex items-start gap-1.5 text-xs text-rose-500">
          <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default ContentPublishCard;
