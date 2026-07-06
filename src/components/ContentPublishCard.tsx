import { useEffect, useMemo, useState } from "react";
import { Rocket, CheckCircle2, AlertCircle, PackageCheck } from "lucide-react";
import { featuresMap as draftFeaturesMap, type Feature } from "@/data/features";
import { products as draftProducts, type Product } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

type Status = "idle" | "loading" | "success" | "error";

interface SnapshotPayload {
  featuresMap: Record<string, Feature[]>;
  products: Product[];
}

// 원고가 존재하는(featuresMap에 등록된) 제품만 노출 후보로 사용
const AUTHORED_PRODUCT_IDS = Object.keys(draftFeaturesMap);

const ContentPublishCard = () => {
  const [lastPublishedAt, setLastPublishedAt] = useState<string | null>(null);
  const [lastPayload, setLastPayload] = useState<SnapshotPayload | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [passcode, setPasscode] = useState<string>("");
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(AUTHORED_PRODUCT_IDS),
  );

  const publishableProducts = useMemo(() => {
    // 드래프트 products 순서 유지, 원고가 있는 항목만
    return draftProducts.filter((p) => AUTHORED_PRODUCT_IDS.includes(p.id));
  }, []);

  const fetchLatest = async () => {
    const { data } = await supabase
      .from("content_snapshots")
      .select("created_at, payload")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setLastPublishedAt(data?.created_at ?? null);
    setLastPayload((data?.payload as unknown as SnapshotPayload) ?? null);
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

  const selectAll = () => setSelected(new Set(AUTHORED_PRODUCT_IDS));
  const clearAll = () => setSelected(new Set());

  const buildMergedPayload = (): SnapshotPayload => {
    // 기준(base): 최신 퍼블리시된 스냅샷이 있으면 그것, 없으면 드래프트 전체
    const base: SnapshotPayload = lastPayload
      ? {
          featuresMap: { ...lastPayload.featuresMap },
          products: [...lastPayload.products],
        }
      : {
          featuresMap: { ...draftFeaturesMap },
          products: [...draftProducts],
        };

    const nextFeaturesMap = { ...base.featuresMap };
    const productMap = new Map(base.products.map((p) => [p.id, p]));

    for (const id of selected) {
      // features 최신 원고로 덮어쓰기
      if (draftFeaturesMap[id]) {
        nextFeaturesMap[id] = draftFeaturesMap[id];
      }
      // product 메타(썸네일/설명 등) 최신 원고로 덮어쓰기
      const draftProduct = draftProducts.find((p) => p.id === id);
      if (draftProduct) productMap.set(id, draftProduct);
    }

    // products 배열 순서는 드래프트 순서를 우선, 나머지는 base 순서로 뒤에 붙임
    const draftOrder = draftProducts.map((p) => p.id);
    const orderedIds = [
      ...draftOrder.filter((id) => productMap.has(id)),
      ...Array.from(productMap.keys()).filter((id) => !draftOrder.includes(id)),
    ];
    const nextProducts = orderedIds
      .map((id) => productMap.get(id))
      .filter((p): p is Product => Boolean(p));

    return { featuresMap: nextFeaturesMap, products: nextProducts };
  };

  const handlePublish = async () => {
    if (!passcode.trim()) {
      setStatus("error");
      setMessage("관리자 패스코드를 입력해 주세요.");
      return;
    }
    if (selected.size === 0) {
      setStatus("error");
      setMessage("퍼블리시할 제품을 하나 이상 선택해 주세요.");
      return;
    }
    const selectedNames = publishableProducts
      .filter((p) => selected.has(p.id))
      .map((p) => p.name)
      .join(", ");
    if (
      !confirm(
        `선택한 제품(${selectedNames})의 최신 원고를 모든 일반 지점에 퍼블리시합니다. 진행할까요?`,
      )
    )
      return;

    setStatus("loading");
    setMessage("");
    try {
      const payload = buildMergedPayload();
      const { data, error } = await supabase.functions.invoke("publish-content", {
        body: {
          passcode: passcode.trim(),
          payload,
          published_by: "SC",
          note: `products: ${Array.from(selected).join(",")}`,
        },
      });
      if (error || !data?.ok) {
        setStatus("error");
        setMessage(
          (data as { error?: string })?.error ??
            error?.message ??
            "퍼블리시에 실패했습니다.",
        );
        return;
      }
      setStatus("success");
      setMessage(
        `퍼블리시 완료 — ${selectedNames}. 일반 지점은 다음 새로고침부터 반영됩니다.`,
      );
      setPasscode("");
      await fetchLatest();
    } catch (e) {
      setStatus("error");
      setMessage(e instanceof Error ? e.message : "퍼블리시 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
          <Rocket className="w-5 h-5" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-bold text-slate-900">콘텐츠 퍼블리시</h2>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            SC 계정은 항상 코드의 최신(드래프트) 원고가 보입니다. 퍼블리시하려는 제품에 체크한 뒤
            아래 버튼을 누르면 선택한 제품만 최신 버전으로 일반 지점·KOR 계정에 반영됩니다.
            (선택하지 않은 제품은 직전 퍼블리시 상태 유지)
          </p>
          <p className="text-[11px] text-slate-400 mt-1.5">
            마지막 퍼블리시:{" "}
            {lastPublishedAt
              ? format(new Date(lastPublishedAt), "yyyy.MM.dd HH:mm", { locale: ko })
              : "기록 없음 (일반 지점은 코드 기본값 표시 중)"}
          </p>
        </div>
      </div>

      {/* 제품 선택 */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
            <PackageCheck className="w-3.5 h-3.5" />
            퍼블리시 대상 제품 ({selected.size}/{publishableProducts.length})
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
                <span className="text-[10px] text-slate-400 shrink-0">
                  {featureCount}
                </span>
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
          disabled={status === "loading" || selected.size === 0}
          className="h-10 px-4 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-1.5"
        >
          <Rocket className="w-4 h-4" />
          {status === "loading"
            ? "퍼블리시 중..."
            : `선택 ${selected.size}개 퍼블리시`}
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
