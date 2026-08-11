import { useEffect, useState } from "react";
import { MessageSquarePlus, X, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentStore } from "@/utils/storeId";

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

  const inputClass =
    "w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 outline-none focus:border-[#3182CE] transition-colors";

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

      {open && (
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-extrabold text-gray-900">콘텐츠 요청하기</h2>
                <p className="text-xs text-gray-500 mt-1 break-keep">
                  현장에서 필요한 콘텐츠나 개선 의견을 남겨주세요
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="닫기"
                className="p-2 -mr-2 -mt-2 text-gray-400 hover:text-gray-600 touch-manipulation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">지점코드</label>
                  <input
                    value={storeCode}
                    onChange={(e) => setStoreCode(e.target.value.toUpperCase())}
                    maxLength={12}
                    className={inputClass}
                    placeholder="예: GSB"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">지점명</label>
                  <input
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    maxLength={60}
                    className={inputClass}
                    placeholder="예: 베스트샵 강서본점"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">요청 유형</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={inputClass}
                >
                  {REQUEST_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  요청 내용 <span className="text-[#A50034]">*</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength={1000}
                  rows={5}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 outline-none focus:border-[#3182CE] transition-colors resize-none break-keep"
                  placeholder="필요한 콘텐츠나 개선이 필요한 부분을 구체적으로 적어주세요"
                />
                <div className="text-right text-[11px] text-gray-400 mt-1 tabular-nums">
                  {content.length}/1000
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full h-12 rounded-xl bg-[#A50034] text-white text-sm font-bold inline-flex items-center justify-center gap-2 disabled:opacity-50 touch-manipulation"
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
        </div>
      )}
    </>
  );
};

export default ContentRequestButton;
