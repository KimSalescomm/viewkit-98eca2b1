import { useEffect, useMemo, useRef, useState } from "react";
import { Clapperboard, Search, Save, Trash2, Play, Pause, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { careCatalogProducts, getCatalogCare } from "@/data/careCatalog";
import useCareVideoSegments from "@/hooks/useCareVideoSegments";
import { requireAdminPasscode } from "@/utils/adminPasscode";
import { supabase } from "@/integrations/supabase/client";
import { formatTimeInput, parseTimeInput, resolveVideoUrl, validateSegment } from "@/utils/careVideoSegments";

const inputClass = "h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const CareVideoSegmentSection = () => {
  const [productId, setProductId] = useState("hydrotower");
  const [query, setQuery] = useState("");
  const [modelId, setModelId] = useState("");
  const [modelDraft, setModelDraft] = useState("");
  const [planId, setPlanId] = useState("premium");
  const { segments, productVideo, videos, loaded, error, refetch } = useCareVideoSegments(productId, modelId);
  const steps = useMemo(() => getCatalogCare(productId, planId), [productId, planId]);
  const [careId, setCareId] = useState("disassembly");
  const step = steps.find(s => s.careServiceId === careId) ?? steps[0];
  const saved = step ? segments[step.careServiceId] : undefined;
  const ownConfig = videos.find(v => v.product_id === productId && v.model_id === modelId);
  const shared = !!ownConfig?.shared_product_id;
  const [commonUrl, setCommonUrl] = useState("");
  const [individualUrl, setIndividualUrl] = useState("");
  const [sharing, setSharing] = useState("");
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");
  const [duration, setDuration] = useState<number>();
  const [previewing, setPreviewing] = useState(false);
  const [previewScope, setPreviewScope] = useState<"common" | "step">("common");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewUrl = previewScope === "common" ? commonUrl : individualUrl || commonUrl;
  const matches = careCatalogProducts.filter(p => {
    const text = `${p.name} ${p.title} ${videos.filter(v => v.product_id === p.id).map(v => v.model_id).join(" ")}`;
    return text.toLowerCase().includes(query.toLowerCase());
  });
  useEffect(() => {
    setCommonUrl(productVideo?.common_video_url ?? "");
    setSharing(ownConfig?.shared_product_id ? `${ownConfig.shared_product_id}|${ownConfig.shared_model_id}` : "");
  }, [productId, modelId, productVideo?.common_video_url, ownConfig?.shared_product_id, ownConfig?.shared_model_id]);
  useEffect(() => {
    videoRef.current?.pause(); setPreviewing(false); setPreviewScope("common"); setMessage("");
    setStartInput(saved ? formatTimeInput(saved.startSeconds) : "");
    setEndInput(saved ? formatTimeInput(saved.endSeconds) : "");
    setIndividualUrl(saved?.videoUrl ?? "");
  }, [productId, modelId, step?.careServiceId, saved?.startSeconds, saved?.endSeconds, saved?.videoUrl]);
  useEffect(() => { setDuration(undefined); setVideoError(false); }, [previewUrl]);
  const changeProduct = (id: string) => { videoRef.current?.pause(); setProductId(id); setModelId(""); setModelDraft(""); setPlanId("premium"); setCareId(""); };
  const invoke = async (fields: Record<string, unknown>) => {
    const passcode = requireAdminPasscode("저장하려면 관리자 패스코드를 입력해 주세요.");
    if (!passcode) return false;
    setBusy(true); setMessage("");
    try {
      const { data, error: requestError } = await supabase.functions.invoke("care-video-admin", { body: { ...fields, passcode, product_id: productId, model_id: modelId } });
      if (requestError || !data?.ok) throw new Error(data?.error ?? requestError?.message ?? "저장 실패");
      await refetch(); window.dispatchEvent(new Event("care-video-updated")); setMessage("저장되었습니다."); return true;
    } catch (e) { setMessage(e instanceof Error ? e.message : "저장에 실패했습니다."); return false; }
    finally { setBusy(false); }
  };
  const saveProduct = async () => {
    if (!sharing && !/^https:\/\//.test(commonUrl)) { setMessage("HTTPS 영상 주소를 입력해 주세요."); return; }
    const [sharedProduct, sharedModel = ""] = sharing.split("|");
    await invoke({ action: "save-product", common_video_url: sharing ? null : commonUrl, video_duration: previewScope === "common" ? duration ?? (commonUrl === productVideo?.common_video_url ? productVideo?.video_duration : null) ?? null : null, shared_product_id: sharedProduct || null, shared_model_id: sharedModel, allow_full_video: true });
  };
  const saveSegment = async () => {
    if (!step) return;
    const start = parseTimeInput(startInput);
    const end = endInput.trim() ? parseTimeInput(endInput) : null;
    if (start === null || (endInput.trim() && end === null)) { setMessage("시간을 분:초 형식으로 입력해 주세요."); return; }
    const url = resolveVideoUrl(undefined, individualUrl, productVideo?.common_video_url ?? undefined);
    if (!url) { setMessage("먼저 제품 영상을 저장해 주세요."); return; }
    const limit = previewScope === "step" ? duration : individualUrl ? undefined : productVideo?.video_duration ?? duration;
    const invalid = validateSegment(start, end, limit ?? undefined);
    if (invalid) { setMessage(invalid); return; }
    await invoke({ action: "upsert", care_service_id: step.careServiceId, video_url: url, individual_video_url: individualUrl || null, start_seconds: start, end_seconds: end, video_duration: limit ?? null });
  };
  const reset = async () => {
    if (!step) return;
    if (!saved) { setStartInput(""); setEndInput(""); setIndividualUrl(""); return; }
    if (!confirm("선택한 케어의 저장된 구간을 삭제할까요?")) return;
    await invoke({ action: "delete", care_service_id: step.careServiceId });
  };
  const preview = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (previewing) { video.pause(); setPreviewing(false); return; }
    const start = parseTimeInput(startInput);
    const end = endInput.trim() ? parseTimeInput(endInput) : null;
    if (start === null || (endInput.trim() && end === null)) { setMessage("시간을 확인해 주세요."); return; }
    const invalid = validateSegment(start, end, duration);
    if (invalid) { setMessage(invalid); return; }
    if (previewScope !== "step") { setPreviewScope("step"); setMessage("케어 영상 미리보기를 선택했습니다. 구간 미리보기를 다시 눌러 주세요."); return; }
    try { video.currentTime = start; await video.play(); setPreviewing(true); } catch { setMessage("영상이 준비된 후 다시 시도해 주세요."); }
  };
  const currentPoint = (setter: (v: string) => void) => setter(formatTimeInput(Math.floor((videoRef.current?.currentTime ?? 0) * 10) / 10));
  return (
    <section className="mb-6 rounded-lg border border-border bg-card p-5 text-card-foreground" aria-label="케어 영상 관리">
      <h2 className="mb-4 flex items-center gap-2 text-base font-bold"><Clapperboard className="h-5 w-5 text-brand" />케어 영상 관리</h2>
      <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="min-w-0">
          <label className="relative mb-2 block"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><input aria-label="제품명 또는 모델명 검색" className={`${inputClass} pl-9`} placeholder="제품명 / 모델명 검색" value={query} onChange={e => setQuery(e.target.value)} /></label>
          <div className="max-h-72 space-y-1 overflow-y-auto lg:max-h-[620px]" role="list" aria-label="제품 목록">
            {matches.map(p => <Button key={p.id} variant={productId === p.id ? "soft" : "ghost"} onClick={() => changeProduct(p.id)} className={`h-auto min-h-12 w-full justify-between whitespace-normal text-left ${productId === p.id ? "text-brand" : ""}`}><span>{p.name}</span><span className="shrink-0 text-[11px] text-muted-foreground">{videos.some(v => v.product_id === p.id) ? "등록" : "미등록"}</span></Button>)}
            {!matches.length && <p className="py-4 text-sm text-muted-foreground">검색 결과가 없습니다.</p>}
          </div>
        </aside>
        <div className="min-w-0 space-y-4">
          <div className="grid gap-2 sm:grid-cols-2">
            <label className="space-y-1 text-xs font-medium">모델 설정<select aria-label="모델 설정" className={inputClass} value={modelId} onChange={e => { setModelId(e.target.value); setModelDraft(e.target.value); }}><option value="">제품 공통</option>{Array.from(new Set([...videos.filter(v => v.product_id === productId).map(v => v.model_id), modelId])).filter(Boolean).map(id => <option key={id} value={id}>{id}</option>)}</select></label>
            <div className="space-y-1"><label htmlFor="new-care-model" className="text-xs font-medium">모델명 추가</label><div className="flex gap-2"><input id="new-care-model" className={inputClass} value={modelDraft} onChange={e => setModelDraft(e.target.value)} maxLength={100} /><Button variant="outline" disabled={!modelDraft.trim()} onClick={() => setModelId(modelDraft.trim())}>선택</Button></div></div>
          </div>
          {(productId === "washer" || productId === "airconditioner") && <label className="block text-xs font-medium">구독 유형<select className={`${inputClass} mt-1`} value={planId} onChange={e => setPlanId(e.target.value)}><option value="premium">프리미엄</option><option value="litePlus">라이트플러스</option></select></label>}
          <div className="space-y-2 border-b border-border pb-4">
            <h3 className="text-sm font-semibold">전체 케어 영상</h3>
            <label className="block text-xs text-muted-foreground">공유 영상<select aria-label="공유 영상" className={`${inputClass} mt-1`} value={sharing} onChange={e => setSharing(e.target.value)}><option value="">직접 등록</option>{videos.filter(v => !(v.product_id === productId && v.model_id === modelId)).map(v => <option key={`${v.product_id}|${v.model_id}`} value={`${v.product_id}|${v.model_id}`}>{careCatalogProducts.find(p => p.id === v.product_id)?.name ?? v.product_id} · {v.model_id || "제품 공통"}</option>)}</select></label>
            <input aria-label="전체 케어 MP4 URL" className={inputClass} placeholder="https://…/care.mp4" disabled={!!sharing} value={commonUrl} onChange={e => { setCommonUrl(e.target.value); setPreviewScope("common"); }} />
            <div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => setPreviewScope("common")}><Play />전체 영상 미리보기</Button><Button variant="brand" disabled={busy || !loaded} onClick={saveProduct}><Save />영상 저장</Button></div>
          </div>
          {previewUrl ? <div className="overflow-hidden rounded-lg bg-muted"><video aria-label="케어 영상 미리보기" ref={videoRef} key={previewUrl} src={previewUrl} controls playsInline preload="metadata" className="aspect-video w-full object-contain" onLoadedMetadata={e => setDuration(e.currentTarget.duration)} onError={() => setVideoError(true)} onTimeUpdate={e => { const end = parseTimeInput(endInput); if (previewing && end !== null && e.currentTarget.currentTime >= end) { e.currentTarget.pause(); setPreviewing(false); } }} onPause={() => setPreviewing(false)} /></div> : <div className="flex aspect-video items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">등록된 영상 없음</div>}
          {videoError && <p role="alert" className="text-sm text-destructive">영상을 불러오지 못했습니다. 주소와 연결 상태를 확인해 주세요.</p>}
          <p className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" />영상 길이: {formatTimeInput(duration ?? productVideo?.video_duration ?? null) || "확인 대기"}</p>
          <h3 className="text-sm font-semibold">케어 항목 · 구간 설정</h3>
          <div role="group" aria-label="관리 케어 항목" className="flex flex-wrap gap-2">{steps.map(s => <Button key={s.careServiceId} size="sm" variant={s.careServiceId === step?.careServiceId ? "brand" : "outline"} onClick={() => setCareId(s.careServiceId)}>{s.careServiceName}<span className="text-[10px]">{segments[s.careServiceId] ? "저장됨" : "미설정"}</span></Button>)}</div>
          {!steps.length ? <p className="text-sm text-muted-foreground">이 제품에 등록된 케어 항목이 없습니다.</p> : <>
            {shared && <p className="text-sm text-muted-foreground">공유 중인 구간은 원본 제품에서 수정해 주세요.</p>}
            <label className="block text-xs font-medium">개별 영상 URL (선택)<input aria-label="개별 영상 URL" className={`${inputClass} mt-1`} value={individualUrl} disabled={shared} placeholder="비워두면 제품 공통 영상" onChange={e => { setIndividualUrl(e.target.value); setPreviewScope("step"); }} /></label>
            <div className="grid gap-3 sm:grid-cols-2">{[{ label: "시작 시간 (분:초)", value: startInput, setter: setStartInput }, { label: "종료 시간 (분:초)", value: endInput, setter: setEndInput }].map(field => <label key={field.label} className="min-w-0 text-xs font-medium">{field.label}<div className="mt-1 flex gap-2"><input className={inputClass} aria-label={field.label} value={field.value} disabled={shared} placeholder={field.setter === setStartInput ? "미설정" : "끝까지"} onChange={e => field.setter(e.target.value)} /><Button title="현재 시점으로 지정" aria-label={`${field.label} 현재 시점`} variant="outline" size="icon" disabled={shared || !duration} onClick={() => currentPoint(field.setter)}><Clock /></Button></div></label>)}</div>
            <p className="text-xs text-muted-foreground">{saved ? `저장된 구간: ${formatTimeInput(saved.startSeconds)} ~ ${formatTimeInput(saved.endSeconds) || "끝까지"}` : "저장된 구간 없음"}</p>
            <div className="flex flex-wrap gap-2"><Button variant="outline" disabled={!previewUrl} onClick={preview}>{previewing ? <Pause /> : <Play />}구간 미리보기</Button><Button variant="brand" disabled={busy || shared || !loaded} onClick={saveSegment}><Save />구간 저장</Button><Button variant="outline" disabled={busy || shared} onClick={reset}><Trash2 />구간 삭제 · 초기화</Button></div>
          </>}
          {(message || error) && <p role="status" className="text-sm text-foreground">{message || error}</p>}
        </div>
      </div>
    </section>
  );
};
export default CareVideoSegmentSection;
