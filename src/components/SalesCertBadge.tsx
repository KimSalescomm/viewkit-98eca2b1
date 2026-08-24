import { useEffect, useMemo, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Trophy, CalendarIcon, CheckCircle2, Home, Store, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useAnalytics from "@/hooks/useAnalytics";
import { products } from "@/data/products";
import { appendSale } from "@/utils/salesLog";
import { getStoreCategoryLabel, isAdminStore, getBranchNameByCode, cleanBranchName } from "@/data/branches";
import { getCurrentStore } from "@/utils/storeId";
import { useToast } from "@/hooks/use-toast";

// 구독을 맨 위로, 그 외 뷰킷 활성 제품 카드
const PRODUCT_OPTIONS = ["구독", ...products.filter((p) => p.id !== "pc").map((p) => p.name)];

// 1차 제품 분류 → 하위 카테고리 매핑
const SUBCATEGORY_MAP: Record<string, string[]> = {
  "구독": [
    "세탁기",
    "스탠드 에어컨",
    "공기청정기",
    "냉장고",
    "STEM 냉장고",
    "워시타워",
    "건조기",
    "전기레인지",
    "식기세척기",
    "광파오븐",
  ],
  "냉장고": ["STEM", "Fit&Max", "양문형 냉장고"],
  "에어컨": ["스탠드 에어컨"],
  "워시타워": ["워시타워", "워시타워 콤보", "세탁기", "건조기"],
};

const MEMO_PLACEHOLDER =
  "뷰킷업을 사용해 판매한 스토리를 들려주세요.\n예) \"얼음정수기냉장고의 케어 서비스 내용을 일일이 말로 설명해야 했던 상담을, 뷰킷업의 정확한 문구와 영상으로 대체하니 고객 이해도가 높아지고 구독의 장점을 효과적으로 소구할 수 있어 판매로 이어졌습니다.";




const MEMO_MIN = 30;
const MEMO_MAX = 200;

const SalesCertBadge = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<string>("");
  const [subcategory, setSubcategory] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  
  const [date, setDate] = useState<Date>(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const submitLockRef = useRef(false);

  const { trackEvent } = useAnalytics();
  const { toast } = useToast();

  const currentStore = getCurrentStore();
  const isAdmin = isAdminStore(currentStore?.slug);
  const defaultBranch = useMemo(() => {
    const name = currentStore?.name?.trim() || "";
    if (name) return name;
    const fromCode = getBranchNameByCode(currentStore?.slug || "");
    return fromCode || "";
  }, [currentStore?.name, currentStore?.slug]);

  // 숨겨진 관리자 진입: 배지를 1.2초 이상 길게 누르면 /admin 으로 이동
  const longPressTimer = useRef<number | null>(null);
  const longPressFired = useRef(false);
  const startLongPress = () => {
    longPressFired.current = false;
    longPressTimer.current = window.setTimeout(() => {
      longPressFired.current = true;
      navigate("/admin");
    }, 1200);
  };
  const cancelLongPress = () => {
    if (longPressTimer.current) {
      window.clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const resetForm = () => {
    setProduct("");
    setSubcategory("");
    setMemo("");
    setDate(new Date());
    setSubmitted(false);
    submitLockRef.current = false;
    setSubmitting(false);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) {
      setAnimationKey((k) => k + 1);
    }
    if (!next) {
      setTimeout(resetForm, 200);
    }
  };


  const subcategoryOptions = product ? SUBCATEGORY_MAP[product] : undefined;
  const needsSubcategory = !!subcategoryOptions && subcategoryOptions.length > 0;


  const handleSubmit = async () => {
    if (!defaultBranch || !product || !date) return;
    if (needsSubcategory && !subcategory) return;
    if (memo.trim().length < MEMO_MIN) return;
    if (submitLockRef.current) return;
    submitLockRef.current = true;
    setSubmitting(true);
    const soldAt = format(date, "yyyy-MM-dd");
    const memoToSave = memo.trim();
    trackEvent("sales_certification", {
      branch: defaultBranch,
      product,
      subcategory: subcategory || undefined,
      sold_at: soldAt,
      has_memo: memoToSave.length > 0,
    });
    try {
      await appendSale({
        branch: defaultBranch,
        product,
        subcategory: subcategory || null,
        memo: memoToSave || null,
        sold_at: soldAt,
      });
      setSubmitted(true);
    } catch (err) {
      console.warn("[SalesCertBadge] appendSale failed", err);
      toast({
        title: "저장 실패",
        description: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        variant: "destructive",
      });
      submitLockRef.current = false;
    } finally {
      setSubmitting(false);
    }
  };

  const goProducts = () => {
    setOpen(false);
    setTimeout(resetForm, 200);
    navigate("/");
  };

  const fieldClass =
    "w-full bg-white border border-slate-200 rounded-xl text-slate-800 " +
    "hover:border-slate-300 focus:border-[#A50034] focus:ring-2 focus:ring-[#A50034]/15 focus:ring-offset-0 " +
    "h-11 px-3.5 text-sm transition-colors";

  const canSubmit = !!(
    defaultBranch &&
    product &&
    date &&
    (!needsSubcategory || subcategory) &&
    memo.trim().length >= MEMO_MIN
  );

  return (
    <>
      <button
        type="button"
        aria-label="판매 인증"
        onClick={() => {
          if (longPressFired.current) return;
          setOpen(true);
        }}
        onPointerDown={startLongPress}
        onPointerUp={cancelLongPress}
        onPointerLeave={cancelLongPress}
        onPointerCancel={cancelLongPress}
        onContextMenu={(e) => e.preventDefault()}
        className={cn(
          "group fixed bottom-5 right-5 z-40 isolate",
          "inline-flex items-center gap-2",
          "h-11 px-4 rounded-full",
          "text-white",
          "bg-gradient-to-r from-[#FF4D6D] via-brand to-[#FF8A3D]",
          "shadow-[0_10px_30px_-6px_hsl(var(--brand)/0.45)]",
          "ring-1 ring-white/40",
          "hover:scale-105 hover:-translate-y-0.5",
          "transition-transform duration-200",
        )}
      >
        <span className="relative flex items-center justify-center">
          <Trophy className="w-[18px] h-[18px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" strokeWidth={2.4} />
        </span>
        <span className="text-[13px] font-semibold tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
          판매 인증
        </span>
        <span className="ml-0.5 text-[10px] px-2 py-0.5 rounded-full bg-white text-brand font-bold tracking-wide shadow-sm">
          매장 전용
        </span>
      </button>

      {open && (
        <Dialog open={open} onOpenChange={handleOpenChange}>

        <DialogContent
          className={cn(
            "sm:max-w-md p-0 gap-0 rounded-2xl border border-slate-200",
            "bg-white text-slate-800",
            "shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)]",
            "animate-in fade-in duration-300",
          )}
        >
          {!submitted ? (
            <>
              <div className="p-6 pb-4 border-b border-slate-100">
                <DialogHeader className="space-y-1.5 text-left">
                  <DialogTitle className="text-base font-semibold tracking-tight text-slate-900 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#A50034]/10 text-[#A50034]">
                      <Trophy className="w-4 h-4" strokeWidth={2.4} />
                    </span>
                    판매 인증
                  </DialogTitle>
                  <DialogDescription className="text-xs text-slate-500 leading-relaxed">
                    상담 중 <span className="font-semibold text-brand">'뷰킷'</span>을 사용하여 판매에 성공한 건을 인증해 주세요!
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-medium tracking-wide text-slate-500">지점</label>
                    {isAdmin && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand/10 text-brand font-semibold">
                        관리자 (SC)
                      </span>
                    )}
                  </div>
                  <div className={cn(fieldClass, "flex items-center gap-2")}>
                    <Store className="w-4 h-4 text-[#A50034] shrink-0" />
                    <span className="font-medium text-slate-900 truncate">
                      {defaultBranch ? cleanBranchName(defaultBranch) : "지점 미설정"}
                    </span>
                    {defaultBranch && getStoreCategoryLabel(defaultBranch) && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 shrink-0">
                        {getStoreCategoryLabel(defaultBranch)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium tracking-wide text-slate-500">
                    제품 <span className="text-brand">*</span>
                  </label>

                  <Select
                    value={product}
                    onValueChange={(v) => {
                      setProduct(v);
                      setSubcategory("");
                    }}
                  >
                    <SelectTrigger className={fieldClass}>
                      <SelectValue placeholder="제품을 선택해보세요" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-slate-200 rounded-xl text-slate-800">
                      {PRODUCT_OPTIONS.map((p) => (
                        <SelectItem key={p} value={p} className="rounded-lg focus:bg-[#A50034]/10 focus:text-[#A50034]">
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {needsSubcategory && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium tracking-wide text-slate-500">
                      세부 분류 <span className="text-brand">*</span>
                    </label>
                    <Select value={subcategory} onValueChange={setSubcategory}>
                      <SelectTrigger className={fieldClass}>
                        <SelectValue placeholder={`${product} 하위 카테고리를 선택하세요`} />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-slate-200 rounded-xl text-slate-800">
                        {subcategoryOptions!.map((s) => (
                          <SelectItem key={s} value={s} className="rounded-lg focus:bg-[#A50034]/10 focus:text-[#A50034]">
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium tracking-wide text-slate-500">판매일</label>
                  <Popover open={dateOpen} onOpenChange={setDateOpen}>
                    <PopoverTrigger asChild>
                      <button type="button" className={cn(fieldClass, "flex items-center justify-between text-left")}>
                        <span>{format(date, "yyyy.MM.dd (EEE)", { locale: ko })}</span>
                        <CalendarIcon className="w-4 h-4 text-slate-400" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border border-slate-200 rounded-xl" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => {
                          if (d) setDate(d);
                          setDateOpen(false);
                        }}
                        initialFocus
                        locale={ko}
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold tracking-wide text-slate-700">
                    뷰킷을 사용하며 가장 도움이 되었던 부분은 무엇인가요?{" "}
                    <span className="text-brand">*</span>
                  </label>
                </div>
                <div
                  key={`warning-${animationKey}`}
                  className="flex items-center justify-between text-[12px] font-medium text-brand animate-fade-in-warning"
                >
                  <div className="flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>진짜 경험이 담긴 사례를 30자 이상 구체적으로 남겨주세요.</span>
                  </div>
                  <span className="text-muted-foreground">
                    {memo.length < MEMO_MIN
                      ? `${memo.length}/${MEMO_MIN}자`
                      : `✓ ${memo.length}/${MEMO_MAX}`}
                  </span>
                </div>

                  <textarea
                    value={memo}
                    onChange={(e) => setMemo(e.target.value.slice(0, MEMO_MAX))}
                    placeholder={MEMO_PLACEHOLDER}
                    rows={4}
                    className={cn(
                      "w-full bg-white border rounded-xl text-slate-800",
                      "hover:border-slate-300 focus:border-[#A50034] focus:ring-2 focus:ring-[#A50034]/15 focus:ring-offset-0 focus:outline-none",
                      "px-3.5 py-2.5 text-sm transition-colors resize-none leading-relaxed",
                      "placeholder:text-[11px] placeholder:text-slate-400 placeholder:whitespace-pre-line",
                      memo.length < MEMO_MIN && memo.length > 0
                        ? "border-orange-300 focus:border-orange-400 focus:ring-orange-200"
                        : "border-slate-200",
                    )}
                  />
                </div>


              </div>

              <div className="p-6 pt-2 flex gap-2">
                <Button
                  type="button"
                  variant="subtle"
                  onClick={() => handleOpenChange(false)}
                  className="flex-1 h-12 rounded-xl border border-slate-200"
                >
                  취소
                </Button>
                <Button
                  type="button"
                  variant="brand"
                  size="cta"
                  onClick={() => void handleSubmit()}
                  disabled={!canSubmit || submitting || submitLockRef.current}
                  className="flex-[2] rounded-xl shadow-[0_6px_16px_-6px_hsl(var(--brand)/0.5)] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? "저장 중..." : "인증 완료"}
                </Button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-[#A50034]/10 text-[#A50034] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-7 h-7" strokeWidth={2.2} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1.5">실적이 기록되었습니다</h3>
              <p className="text-sm text-slate-500 mb-6">
                <span className="text-slate-700 font-medium">{cleanBranchName(defaultBranch)}</span> · {product}
                {subcategory ? ` (${subcategory})` : ""} · {format(date, "yyyy.MM.dd", { locale: ko })}
              </p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={goProducts}
                  className="w-full h-11 rounded-xl bg-[#A50034] text-white text-sm font-semibold hover:bg-[#7A0026] shadow-[0_6px_16px_-6px_rgba(165,0,52,0.5)] transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <Home className="w-4 h-4" />
                  제품 페이지로 돌아가기
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      )}
    </>

  );
};

export default SalesCertBadge;
