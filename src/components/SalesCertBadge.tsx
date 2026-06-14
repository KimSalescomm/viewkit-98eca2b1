import { useEffect, useMemo, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Trophy, CalendarIcon, CheckCircle2, Home, Search, Store, X } from "lucide-react";
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
import { cn } from "@/lib/utils";
import useAnalytics from "@/hooks/useAnalytics";
import { products } from "@/data/products";
import { appendSale } from "@/utils/salesLog";
import { ALL_BRANCHES, getManagerByBranch, getStoreCategoryLabel, isAdminStore, getBranchNameByCode, cleanBranchName } from "@/data/branches";
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
  "예) 상담 중 화면을 보여줄 수 있어 좋아요.\n예) 구독 판매에 도움이 되었습니다.\n예) ○○본점 명장 홍길동 판매인증합니다";

const SalesCertBadge = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState<string>("");
  const [editingStore, setEditingStore] = useState(false);
  const [storeQuery, setStoreQuery] = useState("");
  const [product, setProduct] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submitLockRef = useRef(false);
  const { trackEvent } = useAnalytics();
  const { toast } = useToast();

  const currentStore = getCurrentStore();
  const isAdmin = isAdminStore(currentStore?.slug);
  const defaultBranch = useMemo(() => {
    const name = currentStore?.name?.trim() || "";
    // 1순위: 등록된 매장명이 마스터에 그대로 있으면 사용
    if (name && ALL_BRANCHES.includes(name)) return name;
    // 2순위: slug(영문 코드)로 마스터 지점명 역조회 (예: GSB → 강서본점)
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
    setStore(defaultBranch);
    setEditingStore(!defaultBranch && !isAdmin);
    setStoreQuery("");
    setProduct("");
    setDate(new Date());
    setSubmitted(false);
    submitLockRef.current = false;
    setSubmitting(false);
  };

  // 다이얼로그가 열릴 때마다 현재 매장 정보로 자동 초기화
  // (onClick 으로 직접 setOpen(true) 호출 시 Radix onOpenChange 가 발화하지 않아 필요)
  useEffect(() => {
    if (!open) return;
    setStore(defaultBranch);
    setEditingStore(isAdmin || !defaultBranch);
    setStoreQuery("");
  }, [open, defaultBranch, isAdmin]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setTimeout(resetForm, 200);
    }
  };

  const handleSubmit = async () => {
    if (!store || !product || !date) return;
    if (submitLockRef.current) return;
    submitLockRef.current = true;
    setSubmitting(true);
    const soldAt = format(date, "yyyy-MM-dd");
    trackEvent("sales_certification", { branch: store, product, sold_at: soldAt });
    try {
      await appendSale({ branch: store, product, sold_at: soldAt });
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
    "hover:border-slate-300 focus:border-[#3182CE] focus:ring-2 focus:ring-[#3182CE]/15 focus:ring-offset-0 " +
    "h-11 px-3.5 text-sm transition-colors";

  const canSubmit = store && product && date;

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
          "h-12 pl-4 pr-4 rounded-full",
          "text-white",
          "bg-gradient-to-r from-[#FF4D6D] via-[#A50034] to-[#FF8A3D]",
          "shadow-[0_10px_30px_-6px_rgba(165,0,52,0.45)]",
          "ring-1 ring-white/40",
          "hover:scale-105 hover:-translate-y-0.5",
          "transition-transform duration-200",
        )}
      >
        <span className="relative flex items-center justify-center">
          <Trophy className="w-4 h-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" strokeWidth={2.6} />
        </span>
        <span className="text-[13px] font-extrabold tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
          판매 인증
        </span>
        <span className="ml-0.5 text-[10px] px-1.5 py-0.5 rounded-full bg-white text-[#A50034] font-black tracking-wider shadow-sm">
          매장 전용
        </span>
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          className={cn(
            "sm:max-w-md p-0 gap-0 rounded-2xl border border-slate-200",
            "bg-white text-slate-800",
            "shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)]",
          )}
        >
          {!submitted ? (
            <>
              <div className="p-6 pb-4 border-b border-slate-100">
                <DialogHeader className="space-y-1.5 text-left">
                  <DialogTitle className="text-base font-semibold tracking-tight text-slate-900 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#3182CE]/10 text-[#3182CE]">
                      <Trophy className="w-4 h-4" strokeWidth={2.4} />
                    </span>
                    판매 인증
                  </DialogTitle>
                  <DialogDescription className="text-xs text-slate-500">
                    지점·제품·판매일을 기록합니다
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-medium tracking-wide text-slate-500">지점</label>
                    {isAdmin && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#A50034]/10 text-[#A50034] font-semibold">
                        관리자 (SC)
                      </span>
                    )}
                  </div>
                  {!editingStore && store ? (
                    <div className={cn(fieldClass, "flex items-center justify-between")}>
                      <div className="flex items-center gap-2 min-w-0">
                        <Store className="w-4 h-4 text-[#3182CE] shrink-0" />
                        <span className="font-medium text-slate-900 truncate">{cleanBranchName(store)}</span>
                        {getStoreCategoryLabel(store) && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 shrink-0">
                            {getStoreCategoryLabel(store)}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => { setEditingStore(true); setStoreQuery(""); }}
                        className="text-[11px] text-[#3182CE] hover:underline shrink-0"
                      >
                        변경
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      <input
                        autoFocus
                        value={storeQuery}
                        onChange={(e) => setStoreQuery(e.target.value)}
                        placeholder="지점명을 검색하세요 (예: 강서, 대치)"
                        className={cn(fieldClass, "pl-9 pr-9")}
                      />
                      {store && (
                        <button
                          type="button"
                          onClick={() => { setEditingStore(false); setStoreQuery(""); }}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {storeQuery.trim() && (
                        <div className="absolute z-10 mt-1 w-full max-h-56 overflow-auto rounded-xl border border-slate-200 bg-white shadow-lg">
                          {ALL_BRANCHES.filter((b) =>
                            b.toLowerCase().includes(storeQuery.trim().toLowerCase()),
                          ).slice(0, 30).map((b) => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => {
                                setStore(b);
                                setEditingStore(false);
                                setStoreQuery("");
                              }}
                              className="w-full text-left px-3.5 py-2 text-sm hover:bg-[#3182CE]/10 hover:text-[#3182CE] flex items-center justify-between"
                            >
                            <span>{cleanBranchName(b)}</span>
                            <span className="text-[10px] text-slate-400">
                              {getManagerByBranch(b)}
                            </span>
                            </button>
                          ))}
                          {ALL_BRANCHES.filter((b) =>
                            b.toLowerCase().includes(storeQuery.trim().toLowerCase()),
                          ).length === 0 && (
                            <div className="px-3.5 py-3 text-xs text-slate-400">검색 결과가 없습니다</div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium tracking-wide text-slate-500">제품</label>
                  <Select value={product} onValueChange={setProduct}>
                    <SelectTrigger className={fieldClass}>
                      <SelectValue placeholder="제품을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-slate-200 rounded-xl text-slate-800">
                      {PRODUCT_OPTIONS.map((p) => (
                        <SelectItem key={p} value={p} className="rounded-lg focus:bg-[#3182CE]/10 focus:text-[#3182CE]">
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
              </div>

              <div className="p-6 pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  className="flex-1 h-11 rounded-xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={() => void handleSubmit()}
                  disabled={!canSubmit || submitting || submitLockRef.current}
                  className="flex-[2] h-11 rounded-xl bg-[#3182CE] text-white text-sm font-semibold hover:bg-[#2c74b8] shadow-[0_6px_16px_-6px_rgba(49,130,206,0.5)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? "저장 중..." : "인증 완료"}
                </button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-[#3182CE]/10 text-[#3182CE] flex items-center justify-center mb-4">
                <CheckCircle2 className="w-7 h-7" strokeWidth={2.2} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1.5">실적이 기록되었습니다</h3>
              <p className="text-sm text-slate-500 mb-6">
                <span className="text-slate-700 font-medium">{cleanBranchName(store)}</span> · {product} ·{" "}
                {format(date, "yyyy.MM.dd", { locale: ko })}
              </p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={goProducts}
                  className="w-full h-11 rounded-xl bg-[#3182CE] text-white text-sm font-semibold hover:bg-[#2c74b8] shadow-[0_6px_16px_-6px_rgba(49,130,206,0.5)] transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <Home className="w-4 h-4" />
                  제품 페이지로 돌아가기
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SalesCertBadge;
