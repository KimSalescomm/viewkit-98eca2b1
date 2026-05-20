import { useState } from "react";
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
// 뷰킷에서 활성화된 제품 카드와 동일 (ProductSelection: pc 제외)
const PRODUCT_OPTIONS = products.filter((p) => p.id !== "pc").map((p) => p.name);

const SalesCertBadge = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { trackEvent } = useAnalytics();

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
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 z-40",
          "inline-flex items-center gap-1.5",
          "h-9 pl-3 pr-3.5 rounded-full",
          "bg-white/90 hover:bg-white",
          "border border-slate-200 hover:border-[#3182CE]/40",
          "backdrop-blur-md",
          "shadow-[0_4px_14px_-4px_rgba(15,23,42,0.12)]",
          "text-[#3182CE]",
          "opacity-80 hover:opacity-100",
          "transition-all duration-200 hover:-translate-y-0.5",
        )}
      >
        <Trophy className="w-3.5 h-3.5" strokeWidth={2.4} />
        <span className="text-xs font-semibold tracking-tight">판매인증</span>
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
