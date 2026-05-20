import { useState } from "react";
import { Trophy, CalendarIcon } from "lucide-react";
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
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import useAnalytics from "@/hooks/useAnalytics";

const STORES = ["강남본점", "서초점", "잠실점"];
const PRODUCTS = ["냉장고", "세탁기", "에어컨", "TV"];

const SalesCertBadge = () => {
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [dateOpen, setDateOpen] = useState(false);
  const { trackEvent } = useAnalytics();

  const handleSubmit = () => {
    if (!store || !product || !date) {
      toast.error("모든 항목을 입력해주세요");
      return;
    }
    trackEvent("sales_certification", {
      branch: store,
      product,
      sold_at: format(date, "yyyy-MM-dd"),
    });
    toast.success("실적이 기록되었습니다");
    setOpen(false);
    setStore("");
    setProduct("");
    setDate(new Date());
  };

  const fieldClass =
    "w-full bg-white border border-slate-200 rounded-xl text-slate-800 " +
    "hover:border-slate-300 focus:border-[#3182CE] focus:ring-2 focus:ring-[#3182CE]/15 focus:ring-offset-0 " +
    "h-11 px-3.5 text-sm transition-colors";

  return (
    <>
      {/* Floating pill badge — 트로피 + 판매인증 */}
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={cn(
            "sm:max-w-md p-0 gap-0 rounded-2xl border border-slate-200",
            "bg-white text-slate-800",
            "shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)]",
          )}
        >
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
            {/* 지점 */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium tracking-wide text-slate-500">
                지점
              </label>
              <Select value={store} onValueChange={setStore}>
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder="지점을 선택하세요" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-slate-200 rounded-xl text-slate-800">
                  {STORES.map((s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      className="rounded-lg focus:bg-[#3182CE]/10 focus:text-[#3182CE]"
                    >
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 제품 */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium tracking-wide text-slate-500">
                제품
              </label>
              <Select value={product} onValueChange={setProduct}>
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder="제품을 선택하세요" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-slate-200 rounded-xl text-slate-800">
                  {PRODUCTS.map((p) => (
                    <SelectItem
                      key={p}
                      value={p}
                      className="rounded-lg focus:bg-[#3182CE]/10 focus:text-[#3182CE]"
                    >
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 날짜 */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium tracking-wide text-slate-500">
                판매일
              </label>
              <Popover open={dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(fieldClass, "flex items-center justify-between text-left")}
                  >
                    <span>{format(date, "yyyy.MM.dd (EEE)", { locale: ko })}</span>
                    <CalendarIcon className="w-4 h-4 text-slate-400" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-white border border-slate-200 rounded-xl"
                  align="start"
                >
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
              onClick={() => setOpen(false)}
              className="flex-1 h-11 rounded-xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-[2] h-11 rounded-xl bg-[#3182CE] text-white text-sm font-semibold hover:bg-[#2c74b8] shadow-[0_6px_16px_-6px_rgba(49,130,206,0.5)] transition-colors"
            >
              인증 완료
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SalesCertBadge;
