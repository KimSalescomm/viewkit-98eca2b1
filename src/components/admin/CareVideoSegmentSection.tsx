import { useEffect, useMemo, useRef, useState } from "react";
import { Clapperboard, CheckCircle2, AlertCircle, Play, Pause } from "lucide-react";
import { careProcessPlans } from "@/data/careProcess";
import useCareVideoSegments from "@/hooks/useCareVideoSegments";
import { requireAdminPasscode } from "@/utils/adminPasscode";
import { supabase } from "@/integrations/supabase/client";
import {
  formatTimeInput,
  parseTimeInput,
  resolveVideoUrl,
  validateSegment,
} from "@/utils/careVideoSegments";

type Status = "idle" | "loading" | "success" | "error";

/**
 * 관리자 전용 — 케어 영상 구간 관리
 * 제품별 케어 항목마다 영상 URL과 시작·종료 시간을 지정해 저장하면
 * 고객용 케어 서비스 화면의 '영상' 모드에 즉시 반영됩니다.
 */
const CareVideoSegmentSection = () => {
  const productIds = useMemo(() => Object.keys(careProcessPlans), []);
  const [productId, setProductId] = useState(productIds[0] ?? "");
  const plan = careProcessPlans[productId];
  const steps = useMemo(
    () => [...(plan?.careServices ?? [])].sort((a, b) => a.displayOrder - b.displayOrder),
    [plan],
  );

  const [careId, setCareId] = useState(steps[0]?.careServiceId ?? "");
  const { segments, refetch } = useCareVideoSegments(productId);

  const step = steps.find((s) => s.careServiceId === careId) ?? steps[0];
  const saved = step ? segments[step.careServiceId] : undefined;
  const videoUrl = resolveVideoUrl(saved, step?.videoUrl, plan?.commonVideoUrl) ?? "";

  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");
  const [previewing, setPreviewing] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  // 제품/케어 변경 시 저장된 값으로 입력란 채우기 + 미리보기 정지
  useEffect(() => {
    setStartInput(saved ? formatTimeInput(saved.startSeconds) : "");
    setEndInput(saved ? formatTimeInput(saved.endSeconds) : "");
    setPreviewing(false);
    setStatus("idle");
    setMessage("");
    videoRef.current?.pause();
  }, [productId, careId, saved?.startSeconds, saved?.endSeconds, saved?.videoUrl]);

  // 영상 URL이 바뀌면 길이 정보 초기화
  useEffect(() => {
    setDuration(undefined);
  }, [videoUrl]);

  if (!plan || !step) return null;

  const currentSeconds = () => videoRef.current?.currentTime ?? 0;

  const setStartFromVideo = () => {
    setStartInput(formatTimeInput(Math.floor(currentSeconds() * 10) / 10));
    setStatus("idle");
  };
  const setEndFromVideo = () => {
    setEndInput(formatTimeInput(Math.floor(currentSeconds() * 10) / 10));
    setStatus("idle");
  };

  const parsedStart = parseTimeInput(startInput);
  const parsedEnd = endInput.trim() ? parseTimeInput(endInput) : null;
  const inputError =
    startInput.trim() && parsedStart === null
      ? "시작 시간 형식이 올바르지 않습니다. (예: 1:23)"
      : endInput.trim() && parsedEnd === null
        ? "종료 시간 형식이 올바르지 않습니다. (예: 2:45)"
        : null;

  const togglePreview = () => {
    const video = videoRef.current;
    if (!video) return;
    if (previewing) {
      video.pause();
      setPreviewing(false);
      return;
    }
    if (parsedStart === null) {
      setStatus("error");
      setMessage("구간 미리보기를 하려면 시작 시간을 입력해 주세요.");
      return;
    }
    video.currentTime = parsedStart;
    void video.play();
    setPreviewing(true);
  };

  const handleSave = async () => {
    if (parsedStart === null || (endInput.trim() && parsedEnd === null)) {
      setStatus("error");
      setMessage(inputError ?? "시간 형식을 확인해 주세요.");
      return;
    }
    const start = parsedStart ?? 0;
    const validationError = validateSegment(start, parsedEnd, duration);
    if (validationError) {
      setStatus("error");
      setMessage(validationError);
      return;
    }
    const passcode = requireAdminPasscode("저장하려면 관리자 패스코드를 입력해 주세요.");
    if (!passcode) return;

    setStatus("loading");
    setMessage("");
    const { data, error } = await supabase.functions.invoke("care-video-admin", {
      body: {
        action: "upsert",
        passcode,
        product_id: productId,
        care_service_id: step.careServiceId,
        video_url: videoUrl,
        start_seconds: start,
        end_seconds: parsedEnd,
      },
    });
    if (error || !data?.ok) {
      setStatus("error");
      setMessage((data as { error?: string })?.error ?? error?.message ?? "저장에 실패했습니다.");
      return;
    }
    setStatus("success");
    setMessage(`'${step.careServiceName}' 구간 저장 완료 — 고객용 화면에 즉시 반영됩니다.`);
    await refetch();
  };

  const handleReset = async () => {
    if (!saved) {
      setStatus("idle");
      setMessage("");
      setStartInput("");
      setEndInput("");
      return;
    }
    if (!confirm(`'${step.careServiceName}'에 저장된 구간을 삭제할까요? 전체 영상이 처음부터 재생됩니다.`))
      return;
    const passcode = requireAdminPasscode("삭제하려면 관리자 패스코드를 입력해 주세요.");
    if (!passcode) return;

    setStatus("loading");
    const { data, error } = await supabase.functions.invoke("care-video-admin", {
      body: {
        action: "delete",
        passcode,
        product_id: productId,
        care_service_id: step.careServiceId,
      },
    });
    if (error || !data?.ok) {
      setStatus("error");
      setMessage((data as { error?: string })?.error ?? error?.message ?? "삭제에 실패했습니다.");
      return;
    }
    setStatus("success");
    setMessage(`'${step.careServiceName}' 구간 삭제 완료 — 전체 영상이 처음부터 재생됩니다.`);
    await refetch();
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
          <Clapperboard className="w-5 h-5" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-bold text-slate-900">케어 영상 구간 관리</h2>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            하나의 전체 영상에서 케어 항목별로 보여줄 구간(시작·종료)을 지정합니다.
            저장하면 고객용 케어 서비스 화면의 '영상' 버튼에 즉시 반영됩니다.
          </p>
        </div>
      </div>

      {/* 제품 + 케어 항목 선택 */}
      <div className="flex flex-wrap gap-2 mb-3">
        {productIds.length > 1 && (
          <select
            value={productId}
            onChange={(e) => {
              setProductId(e.target.value);
              const first = [...careProcessPlans[e.target.value].careServices].sort(
                (a, b) => a.displayOrder - b.displayOrder,
              )[0];
              setCareId(first?.careServiceId ?? "");
            }}
            className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700"
          >
            {productIds.map((id) => (
              <option key={id} value={id}>
                {careProcessPlans[id].productName}
              </option>
            ))}
          </select>
        )}
        <div className="flex flex-wrap gap-1.5">
          {steps.map((s) => (
            <button
              key={s.careServiceId}
              type="button"
              onClick={() => setCareId(s.careServiceId)}
              className={`h-9 px-3 rounded-full border text-xs font-semibold transition-colors ${
                s.careServiceId === step.careServiceId
                  ? "border-brand bg-brand text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {s.careServiceName}
              {segments[s.careServiceId] && <span className="ml-1 opacity-70">●</span>}
            </button>
          ))}
        </div>
      </div>

      {/* 영상 미리보기 */}
      <div className="rounded-xl overflow-hidden bg-slate-950 mb-3">
        <video
          ref={videoRef}
          key={videoUrl}
          src={videoUrl}
          controls
          playsInline
          preload="metadata"
          className="w-full aspect-video object-contain"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => {
            if (previewing && parsedEnd !== null && e.currentTarget.currentTime >= parsedEnd) {
              e.currentTarget.pause();
              setPreviewing(false);
            }
          }}
          onPause={() => setPreviewing(false)}
        />
      </div>

      {/* 구간 설정 */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 mb-3">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">시작 시간 (분:초)</label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={startInput}
                onChange={(e) => {
                  setStartInput(e.target.value);
                  setStatus("idle");
                }}
                placeholder="0:00"
                className="h-9 w-full px-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand/15 focus:border-brand"
              />
              <button
                type="button"
                onClick={setStartFromVideo}
                className="h-9 px-2.5 rounded-lg border border-slate-200 bg-white text-[11px] font-semibold text-slate-600 hover:bg-slate-50 whitespace-nowrap"
              >
                현재 시점
              </button>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              종료 시간 (분:초, 비우면 끝까지)
            </label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={endInput}
                onChange={(e) => {
                  setEndInput(e.target.value);
                  setStatus("idle");
                }}
                placeholder="끝까지"
                className="h-9 w-full px-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand/15 focus:border-brand"
              />
              <button
                type="button"
                onClick={setEndFromVideo}
                className="h-9 px-2.5 rounded-lg border border-slate-200 bg-white text-[11px] font-semibold text-slate-600 hover:bg-slate-50 whitespace-nowrap"
              >
                현재 시점
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={togglePreview}
            className="h-9 px-3.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1.5"
          >
            {previewing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {previewing ? "미리보기 정지" : "구간 미리보기"}
          </button>
          <span className="text-[11px] text-slate-400">
            {saved
              ? `저장된 구간: ${formatTimeInput(saved.startSeconds)} ~ ${saved.endSeconds !== null ? formatTimeInput(saved.endSeconds) : "끝까지"}`
              : "저장된 구간 없음 — 전체 영상이 처음부터 재생됩니다."}
            {duration !== undefined && ` · 영상 길이 ${formatTimeInput(Math.floor(duration * 10) / 10)}`}
          </span>
        </div>
      </div>

      {/* 액션 */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={status === "loading"}
          className="h-10 px-4 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition-colors disabled:opacity-60 flex-1"
        >
          {status === "loading" ? "저장 중..." : "구간 저장"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={status === "loading"}
          className="h-10 px-4 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-60"
        >
          구간 삭제(재설정)
        </button>
      </div>

      {(inputError || (status !== "idle" && message)) && (
        <div
          className={`mt-3 flex items-start gap-1.5 text-xs ${
            inputError || status === "error" ? "text-rose-500" : "text-emerald-600"
          }`}
        >
          {inputError || status === "error" ? (
            <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          )}
          <span>{inputError ?? message}</span>
        </div>
      )}
    </div>
  );
};

export default CareVideoSegmentSection;
