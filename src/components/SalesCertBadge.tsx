import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, CalendarIcon, CheckCircle2, Home } from "lucide-react";
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

const STORES = ["강남본점", "서초점", "잠실점"];
// 구독을 맨 위로, 그 외 뷰킷 활성 제품 카드
const PRODUCT_OPTIONS = ["구독", ...products.filter((p) => p.id !== "pc").map((p) => p.name)];

const SalesCertBadge = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { trackEvent } = useAnalytics();

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
    setStore("");
    setProduct("");
    setDate(new Date());
    setSubmitted(false);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setTimeout(resetForm, 200);
  };

  const handleSubmit = () => {
    if (!store || !product || !date) return;
    const soldAt = format(date, "yyyy-MM-dd");
    trackEvent("sales_certification", { branch: store, product, sold_at: soldAt });
    appendSale({ branch: store, product, sold_at: soldAt });
    setSubmitted(true);
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
          "text-[#3a2a05]",
          "bg-gradient-to-r from-[#FFE9A0] via-[#E0B23A] to-[#B8860B]",
          "shadow-[0_10px_30px_-6px_rgba(184,134,11,0.5)]",
          "ring-1 ring-[#FFF4C2]/70",
          "hover:scale-105 hover:-translate-y-0.5",
          "transition-transform duration-200",
        )}
      >
        <span className="relative flex items-center justify-center">
          <Trophy className="w-4 h-4 drop-shadow-[0_1px_2px_rgba(120,80,0,0.35)]" strokeWidth={2.6} />
        </span>
        <span className="text-[13px] font-extrabold tracking-tight drop-shadow-[0_1px_1px_rgba(255,240,180,0.6)]">
          판매인증
        </span>
        <span className="ml-0.5 text-[10px] px-1.5 py-0.5 rounded-full bg-[#3a2a05] text-[#FFD96B] font-black tracking-widest shadow-sm">
          EVENT
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
                  <label className="text-[11px] font-medium tracking-wide text-slate-500">지점</label>
                  <Select value={store} onValueChange={setStore}>
                    <SelectTrigger className={fieldClass}>
                      <SelectValue placeholder="지점을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-slate-200 rounded-xl text-slate-800">
                      {STORES.map((s) => (
                        <SelectItem key={s} value={s} className="rounded-lg focus:bg-[#3182CE]/10 focus:text-[#3182CE]">
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="flex-[2] h-11 rounded-xl bg-[#3182CE] text-white text-sm font-semibold hover:bg-[#2c74b8] shadow-[0_6px_16px_-6px_rgba(49,130,206,0.5)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  인증 완료
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
                <span className="text-slate-700 font-medium">{store}</span> · {product} ·{" "}
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
