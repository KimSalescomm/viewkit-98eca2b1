import { useEffect, useState } from "react";
import { MessageSquarePlus, X, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentStore } from "@/utils/storeId";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";


export const REQUEST_CATEGORIES = [
  "신제품 콘텐츠 추가",
  "정보 오류 수정",
  "사용성 개선",
  "기타",
] as const;

interface ContentRequestButtonProps {
  variant?: "pill" | "segment";
}

const ContentRequestButton = ({ variant = "pill" }: ContentRequestButtonProps) => {
  const [open, setOpen] = useState(false);
  const [storeCode, setStoreCode] = useState("");
  const [storeName, setStoreName] = useState("");
  const [category, setCategory] = useState<string>(REQUEST_CATEGORIES[0]);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    const store = getCurrentStore();
    setStoreCode(store?.slug ?? "");
    setStoreName(store?.name ?? "");
  }, [open]);

  const reset = () => {
    setCategory(REQUEST_CATEGORIES[0]);
    setContent("");
  };

  const handleSubmit = async () => {
    if (!storeCode.trim()) {
      toast.error("지점 정보를 먼저 등록해 주세요");
      return;
    }
    if (!content.trim()) {
      toast.error("요청 내용을 입력해 주세요");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("content_requests").insert({
      store_code: storeCode.trim().toUpperCase(),
      store_name: storeName.trim() || null,
      category,
      title: content.trim().slice(0, 40),
      content: content.trim(),
    });
    setSubmitting(false);
    if (error) {
      console.warn("[contentRequest] insert failed", error);
      toast.error("등록에 실패했습니다. 잠시 후 다시 시도해 주세요");
      return;
    }
    toast.success("요청이 등록되었습니다");
    reset();
    setOpen(false);
  };

  const fieldClass =
    "w-full h-11 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 outline-none hover:border-slate-300 focus:border-[#A50034] focus:ring-2 focus:ring-[#A50034]/15 transition-colors";


  return (
    <>
      {variant === "segment" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          title="필요한 콘텐츠 요청하기"
        >
          <MessageSquarePlus className="w-3.5 h-3.5 text-[#A50034]" />
          <span>콘텐츠 요청</span>
        </button>
      ) : (
        <div className="w-full flex justify-center px-4 mt-8 sm:mt-10 pb-10">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition touch-manipulation"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#A50034]" />
            필요한 콘텐츠 요청하기
          </button>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md p-0 gap-0 rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)] max-h-[85vh] overflow-y-auto">
          <div className="p-6 pb-4 border-b border-slate-100">
            <DialogHeader className="space-y-1.5 text-left">
              <DialogTitle className="text-base font-semibold tracking-tight text-slate-900 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#A50034]/10 text-[#A50034]">
                  <MessageSquarePlus className="w-4 h-4" strokeWidth={2.4} />
                </span>
                콘텐츠 요청하기
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 leading-relaxed break-keep">
                현장에서 필요한 콘텐츠나 개선 의견을 남겨주세요
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium tracking-wide text-slate-500">지점코드</label>
                <input
                  value={storeCode}
                  onChange={(e) => setStoreCode(e.target.value.toUpperCase())}
                  maxLength={12}
                  className={fieldClass}
                  placeholder="예: GSB"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium tracking-wide text-slate-500">지점명</label>
                <input
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  maxLength={60}
                  className={fieldClass}
                  placeholder="예: 베스트샵 강서본점"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium tracking-wide text-slate-500">
                요청 유형 <span className="text-[#A50034]">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={fieldClass}
              >
                {REQUEST_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium tracking-wide text-slate-500">
                요청 내용 <span className="text-[#A50034]">*</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={1000}
                rows={4}
                className="w-full bg-white border border-slate-200 rounded-xl text-slate-800 hover:border-slate-300 focus:border-[#A50034] focus:ring-2 focus:ring-[#A50034]/15 px-3.5 py-2.5 text-sm transition-colors resize-none outline-none break-keep"
                placeholder="필요한 콘텐츠나 개선이 필요한 부분을 구체적으로 적어주세요"
              />
              <div className="text-right text-[11px] text-slate-400 tabular-nums">
                {content.length}/1000
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 h-11 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors touch-manipulation"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || !content.trim()}
                className="flex-[2] h-11 rounded-xl bg-[#A50034] text-white text-sm font-bold inline-flex items-center justify-center gap-2 shadow-[0_6px_16px_-6px_rgba(165,0,52,0.5)] hover:bg-[#7A0026] disabled:opacity-40 disabled:cursor-not-allowed transition-colors touch-manipulation"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                요청 등록하기
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </>
  );
};

export default ContentRequestButton;
