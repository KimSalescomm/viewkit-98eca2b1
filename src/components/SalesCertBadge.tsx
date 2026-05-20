import { useState } from "react";
import { Check, CalendarIcon } from "lucide-react";
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
    // reset for next entry
    setStore("");
    setProduct("");
    setDate(new Date());
  };

  // Dark, sharp 1px-border field styling
  const fieldClass =
    "w-full bg-[#0A0F16] border border-white/15 rounded-none text-white/90 " +
    "hover:border-white/30 focus:border-white/60 focus:ring-0 focus:ring-offset-0 " +
    "h-11 px-3 text-sm transition-colors";

  return (
    <>
      {/* Floating badge — discreet, bottom-right */}
      <button
        type="button"
        aria-label="판매 인증"
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 z-40",
          "w-9 h-9 rounded-full",
          "flex items-center justify-center",
          "bg-[#3182CE]/30 hover:bg-[#3182CE]/70",
          "border border-white/10 hover:border-white/30",
          "backdrop-blur-sm shadow-sm",
          "transition-all duration-200",
          "opacity-60 hover:opacity-100",
        )}
      >
        <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={cn(
            "sm:max-w-md p-0 gap-0 rounded-none border border-white/15",
            "bg-[#0A0F16] text-white",
            "shadow-[0_0_60px_-15px_rgba(49,130,206,0.35)]",
          )}
        >
          <div className="p-6 border-b border-white/10">
            <DialogHeader className="space-y-1.5 text-left">
              <DialogTitle className="text-base font-medium tracking-tight text-white flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-[#3182CE] rounded-full" />
                판매 인증
              </DialogTitle>
              <DialogDescription className="text-xs text-white/50">
                지점·제품·판매일을 기록합니다
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-6 space-y-5">
            {/* 지점 */}
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-[0.12em] text-white/40">
                지점
              </label>
              <Select value={store} onValueChange={setStore}>
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder="지점을 선택하세요" />
                </SelectTrigger>
                <SelectContent className="bg-[#0A0F16] border border-white/15 rounded-none text-white">
                  {STORES.map((s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      className="rounded-none focus:bg-white/10 focus:text-white"
                    >
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 제품 */}
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-[0.12em] text-white/40">
                제품
              </label>
              <Select value={product} onValueChange={setProduct}>
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder="제품을 선택하세요" />
                </SelectTrigger>
                <SelectContent className="bg-[#0A0F16] border border-white/15 rounded-none text-white">
                  {PRODUCTS.map((p) => (
                    <SelectItem
                      key={p}
                      value={p}
                      className="rounded-none focus:bg-white/10 focus:text-white"
                    >
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 날짜 */}
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-[0.12em] text-white/40">
                판매일
              </label>
              <Popover open={dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger asChild>
                  <button type="button" className={cn(fieldClass, "flex items-center justify-between text-left")}>
                    <span>{format(date, "yyyy.MM.dd (EEE)", { locale: ko })}</span>
                    <CalendarIcon className="w-4 h-4 text-white/40" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-[#0A0F16] border border-white/15 rounded-none text-white"
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

          <div className="p-6 pt-2 border-t border-white/10 flex gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 h-11 rounded-none border border-white/15 text-white/70 text-sm hover:border-white/30 hover:text-white transition-colors"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-[2] h-11 rounded-none border border-[#3182CE] bg-[#3182CE] text-white text-sm font-medium hover:bg-[#3182CE]/90 transition-colors"
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
