import { useEffect, useState } from "react";
import { Rocket, CheckCircle2, AlertCircle } from "lucide-react";
import { featuresMap as draftFeaturesMap } from "@/data/features";
import { products as draftProducts } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

type Status = "idle" | "loading" | "success" | "error";

const ContentPublishCard = () => {
  const [lastPublishedAt, setLastPublishedAt] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [passcode, setPasscode] = useState<string>("");

  const fetchLatest = async () => {
    const { data } = await supabase
      .from("content_snapshots")
      .select("created_at")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setLastPublishedAt(data?.created_at ?? null);
  };

  useEffect(() => {
    void fetchLatest();
  }, []);

  const handlePublish = async () => {
    if (!passcode.trim()) {
      setStatus("error");
      setMessage("관리자 패스코드를 입력해 주세요.");
      return;
    }
    if (!confirm("현재 코드(드래프트) 상태를 모든 일반 지점에 퍼블리시합니다. 진행할까요?")) return;

    setStatus("loading");
    setMessage("");
    try {
      const { data, error } = await supabase.functions.invoke("publish-content", {
        body: {
          passcode: passcode.trim(),
          payload: {
            featuresMap: draftFeaturesMap,
            products: draftProducts,
          },
          published_by: "SC",
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
      setMessage("퍼블리시 완료! 일반 지점은 다음 새로고침부터 반영됩니다.");
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
        <div className="w-9 h-9 rounded-xl bg-[#A50034]/10 text-[#A50034] flex items-center justify-center shrink-0">
          <Rocket className="w-5 h-5" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-bold text-slate-900">콘텐츠 퍼블리시</h2>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            SC 계정에서는 항상 코드의 최신(드래프트) 콘텐츠가 보입니다. 아래 버튼을 누르면 현재 상태가 일반 지점·KOR 계정에 동일하게 적용됩니다.
          </p>
          <p className="text-[11px] text-slate-400 mt-1.5">
            마지막 퍼블리시:{" "}
            {lastPublishedAt
              ? format(new Date(lastPublishedAt), "yyyy.MM.dd HH:mm", { locale: ko })
              : "기록 없음 (일반 지점은 코드 기본값 표시 중)"}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="password"
          value={passcode}
          onChange={(e) => {
            setPasscode(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="관리자 패스코드"
          className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#A50034]/15 focus:border-[#A50034] flex-1"
          disabled={status === "loading"}
        />
        <button
          type="button"
          onClick={handlePublish}
          disabled={status === "loading"}
          className="h-10 px-4 rounded-lg bg-[#A50034] text-white text-sm font-semibold hover:bg-[#8a002b] transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-1.5"
        >
          <Rocket className="w-4 h-4" />
          {status === "loading" ? "퍼블리시 중..." : "지금 퍼블리시"}
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
