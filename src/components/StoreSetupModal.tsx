import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Store, Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { registerStore, slugifyStoreName, getRegistry } from "@/utils/storeId";

interface StoreSetupModalProps {
  open: boolean;
  initialName?: string;
  onSaved: (info: { name: string; slug: string }) => void;
  onClose?: () => void;
  dismissible?: boolean;
}

const StoreSetupModal: React.FC<StoreSetupModalProps> = ({
  open,
  initialName = "",
  onSaved,
  onClose,
  dismissible = false,
}) => {
  const [name, setName] = useState(initialName);
  const [codeOverride, setCodeOverride] = useState("");

  useEffect(() => {
    if (open) {
      setName(initialName);
      setCodeOverride("");
    }
  }, [open, initialName]);

  const autoSlug = useMemo(() => slugifyStoreName(name), [name]);
  const finalSlug = (codeOverride || autoSlug).toUpperCase();
  const registry = useMemo(() => (open ? getRegistry() : {}), [open]);
  const existingEntries = Object.entries(registry);

  const canSave = name.trim().length > 0 && finalSlug.length > 0;

  const handleSave = () => {
    if (!canSave) return;
    const info = registerStore(name.trim(), finalSlug);
    onSaved(info);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && dismissible && onClose?.()}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => {
          if (!dismissible) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (!dismissible) e.preventDefault();
        }}
      >
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#FBE8EE] flex items-center justify-center">
              <Store className="w-5 h-5 text-[#A50034]" />
            </div>
            <DialogTitle>지점 설정</DialogTitle>
          </div>
          <DialogDescription>
            매장 분석을 위해 지점명을 입력해 주세요. 입력하신 지점명은 영문 코드로 자동 변환되며,
            이 기기에 저장되어 다음부터는 다시 묻지 않습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">지점명</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 강서본점, 대치본점, D5"
              autoFocus
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              영문 코드{" "}
              <span className="text-xs font-normal text-gray-400">(자동 생성 · 필요 시 수정)</span>
            </label>
            <Input
              value={codeOverride}
              onChange={(e) => setCodeOverride(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
              placeholder={autoSlug || "AUTO"}
            />
            {name && (
              <p className="text-xs text-gray-500 mt-1.5">
                저장될 URL 파라미터: <span className="font-mono text-[#A50034]">?store_id={finalSlug}</span>
              </p>
            )}
          </div>

          {existingEntries.length > 0 && (
            <div className="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <p className="text-xs font-semibold text-gray-500 mb-2">등록된 지점</p>
              <div className="flex flex-wrap gap-1.5">
                {existingEntries.map(([n, s]) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      setName(n);
                      setCodeOverride(s);
                    }}
                    className="text-xs px-2 py-1 rounded-md bg-white border border-gray-200 hover:border-[#A50034] hover:text-[#A50034] transition-colors"
                  >
                    {n} <span className="text-gray-400">· {s}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-2">
          {dismissible && (
            <Button variant="ghost" onClick={onClose}>
              취소
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={!canSave}
            className="bg-[#A50034] hover:bg-[#7A0026] text-white"
          >
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoreSetupModal;
