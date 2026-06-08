import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Store, Copy, Search, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { registerStore, slugifyStoreName, getRegistry, resolveUniqueSlug, normalizeStoreIdentity } from "@/utils/storeId";
import { logPageView } from "@/utils/pageViewLog";
import { ALL_BRANCHES, getManagerByBranch, BRANCH_CODE_MAP, ADMIN_STORE_CODE, DEALER_TO_BRANCH_MAP, resolveBranchByDealer } from "@/data/branches";
import { cn } from "@/lib/utils";

const ADMIN_ENTRY = { name: "관리자", slug: ADMIN_STORE_CODE };
const isAdminQuery = (q: string) => {
  const s = q.trim().toLowerCase();
  if (!s) return false;
  return "sc".startsWith(s) || s.startsWith("sc") || "관리자".includes(s) || "admin".startsWith(s);
};

const KOR_ENTRY = { name: "유관부서", slug: "KOR" };
const isKorQuery = (q: string) => {
  const s = q.trim().toLowerCase();
  if (!s) return false;
  return (
    "kor".startsWith(s) ||
    s.startsWith("kor") ||
    "유관부서".includes(s) ||
    "한영본부".includes(s) ||
    "한영본".includes(s) ||
    s.includes("한영")
  );
};

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
  const [editing, setEditing] = useState(true);
  const [query, setQuery] = useState("");
  const [codeOverride, setCodeOverride] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (open) {
      setName(initialName);
      setEditing(!initialName);
      setQuery("");
      setCodeOverride("");
      setShowAdvanced(false);
    }
  }, [open, initialName]);

  const autoSlug = useMemo(() => slugifyStoreName(name), [name]);
  const baseSlug = (codeOverride || autoSlug).toUpperCase();
  const finalSlug = useMemo(
    () => normalizeStoreIdentity(name.trim(), resolveUniqueSlug(baseSlug, name.trim())).slug,
    [baseSlug, name]
  );
  const registry = useMemo(() => (open ? getRegistry() : {}), [open]);
  const existingEntries = Object.entries(registry);

  const filteredBranches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as string[];
    return ALL_BRANCHES.filter((b) => b.toLowerCase().includes(q)).slice(0, 30);
  }, [query]);

  // 거래선명으로 검색 시 매칭되는 매장명 후보
  const dealerMatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as Array<{ dealer: string; branch: string }>;
    return Object.entries(DEALER_TO_BRANCH_MAP)
      .filter(([dealer]) => dealer.toLowerCase().includes(q))
      .filter(([, branch]) => !branch.toLowerCase().includes(q)) // 매장명 검색 결과와 중복 제거
      .slice(0, 10)
      .map(([dealer, branch]) => ({ dealer, branch }));
  }, [query]);

  const isAdmin = name.trim().toUpperCase() === ADMIN_STORE_CODE || finalSlug === ADMIN_STORE_CODE;
  const isMasterBranch = !!BRANCH_CODE_MAP[name.trim()];
  const manager = isAdmin ? "관리자 계정" : getManagerByBranch(name.trim());

  const canSave = name.trim().length > 0 && finalSlug.length > 0;

  const handlePickBranch = (branch: string) => {
    setName(branch);
    setCodeOverride("");
    setEditing(false);
    setQuery("");
  };

  const handleSave = () => {
    if (!canSave) return;
    const trimmedName = name.trim();

    // 예약/마스터 매장은 검증 통과
    const isReserved = trimmedName === "관리자" || trimmedName === "유관부서" || isAdmin;
    const isMaster = !!BRANCH_CODE_MAP[trimmedName];

    // 유효성 검사: '점' 한 글자만 입력했거나 슬러그가 STORE/너무 짧은 경우 차단
    const isInvalidName = trimmedName === "점" || /^점+$/.test(trimmedName);
    const isFallbackSlug = finalSlug === "STORE";
    const isTooShortSlug = finalSlug.length < 2 && !isAdmin;

    // 한글 2자 이상 입력 필수 (예약/마스터 제외)
    const koreanChars = (trimmedName.match(/[\uac00-\ud7a3]/g) || []).length;
    const lacksKorean = !isReserved && !isMaster && koreanChars < 2;

    if (isInvalidName || isFallbackSlug || isTooShortSlug || lacksKorean) {
      toast({
        title: "매장명을 정확히 입력해 주세요",
        description:
          "매장명은 한글 2자 이상으로 입력해야 합니다. (예: 강서본점, 노은점)",
        variant: "destructive",
      });
      return;
    }

    const info = registerStore(trimmedName, finalSlug);
    // 매장 등록 직후 현재 페이지를 새 매장 ID로 즉시 기록 (모달 닫힘 시점)
    try { logPageView(window.location.pathname); } catch { /* noop */ }
    onSaved(info);
  };

  const fieldClass =
    "w-full bg-white border border-slate-200 rounded-xl text-slate-800 " +
    "hover:border-slate-300 focus:border-[#A50034] focus:ring-2 focus:ring-[#A50034]/15 focus:ring-offset-0 " +
    "h-11 px-3.5 text-sm transition-colors";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && dismissible && onClose?.()}>
      <DialogContent
        className="w-[calc(100vw-2rem)] max-w-md overflow-hidden p-5 sm:p-6"
        onInteractOutside={(e) => {
          if (!dismissible) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (!dismissible) e.preventDefault();
        }}
      >
        <DialogHeader className="min-w-0 pr-8">
          <div className="flex min-w-0 items-center gap-2">
            <div className="w-9 h-9 shrink-0 rounded-xl bg-[#FBE8EE] flex items-center justify-center">
              <Store className="w-5 h-5 text-[#A50034]" />
            </div>
            <DialogTitle>지점 설정</DialogTitle>
          </div>
          <DialogDescription className="break-keep leading-relaxed">
            매장 분석을 위해 지점을 선택해 주세요. 선택한 지점은 이 기기에 저장되어 다음부터는 다시 묻지 않습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="min-w-0 space-y-4 mt-2">
          <div className="min-w-0 space-y-1.5">
            <label className="text-[11px] font-medium tracking-wide text-slate-500">지점</label>
            {!editing && name ? (
              <div className={cn(fieldClass, "flex items-center justify-between")}>
                <div className="flex items-center gap-2 min-w-0">
                  <Store className="w-4 h-4 text-[#A50034] shrink-0" />
                  <span className="font-medium text-slate-900 truncate">{name}</span>
                  {manager && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 shrink-0">
                      {manager} 담당
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => { setEditing(true); setQuery(""); }}
                  className="text-[11px] text-[#A50034] hover:underline shrink-0"
                >
                  변경
                </button>
              </div>
            ) : (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="지점명을 검색하세요 (예: 강서, 대치)"
                  className={cn(fieldClass, "pl-9 pr-9")}
                />
                {name && (
                  <button
                    type="button"
                    onClick={() => { setEditing(false); setQuery(""); }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                {query.trim() && (
                  <div className="absolute z-10 mt-1 w-full max-h-56 overflow-auto rounded-xl border border-slate-200 bg-white shadow-lg">
                    {isAdminQuery(query) && (
                      <button
                        type="button"
                        onClick={() => {
                          setName(ADMIN_ENTRY.name);
                          setCodeOverride(ADMIN_ENTRY.slug);
                          setEditing(false);
                          setQuery("");
                        }}
                        className="w-full text-left px-3.5 py-2 text-sm hover:bg-[#A50034]/10 hover:text-[#A50034] flex items-center justify-between border-b border-slate-100"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="font-medium">관리자 계정</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#A50034]/10 text-[#A50034] font-semibold">SC</span>
                        </span>
                        <span className="text-[10px] text-slate-400">전 매장 집계</span>
                      </button>
                    )}
                    {isKorQuery(query) && (
                      <button
                        type="button"
                        onClick={() => {
                          setName(KOR_ENTRY.name);
                          setCodeOverride(KOR_ENTRY.slug);
                          setEditing(false);
                          setQuery("");
                        }}
                        className="w-full text-left px-3.5 py-2 text-sm hover:bg-[#A50034]/10 hover:text-[#A50034] flex items-center justify-between border-b border-slate-100"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="font-medium">유관부서</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#A50034]/10 text-[#A50034] font-semibold">KOR</span>
                        </span>
                        <span className="text-[10px] text-slate-400">한영본부 등</span>
                      </button>
                    )}
                    {filteredBranches.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => handlePickBranch(b)}
                        className="w-full text-left px-3.5 py-2 text-sm hover:bg-[#A50034]/10 hover:text-[#A50034] flex items-center justify-between"
                      >
                        <span>{b}</span>
                        <span className="text-[10px] text-slate-400">
                          {getManagerByBranch(b)}
                        </span>
                      </button>
                    ))}
                    {filteredBranches.length === 0 && !isAdminQuery(query) && !isKorQuery(query) && (
                      <div className="px-3.5 py-3 text-xs text-slate-400">검색 결과가 없습니다</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 고급: 영문 코드 직접 지정 (마스터에 없는 매장 / 관리자 SC 코드용) */}
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => setShowAdvanced((v) => !v)}
              className="text-[11px] text-slate-400 hover:text-slate-600"
            >
              {showAdvanced ? "고급 설정 닫기" : "마스터에 없는 매장인가요? 직접 입력"}
            </button>
            {showAdvanced && (
              <div className="mt-2 space-y-2">
                <Input
                  value={name}
                  onChange={(e) => { setName(e.target.value); setEditing(false); }}
                  placeholder="지점명 직접 입력 (예: D5, 신규지점)"
                />
                <Input
                  value={codeOverride}
                  onChange={(e) => setCodeOverride(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))}
                  placeholder={autoSlug || "영문 대문자 코드 (2자 이상)"}
                />
              </div>
            )}
          </div>

          {finalSlug && name && (
            <div className="min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-2.5 space-y-2">
              <p className="flex min-w-0 flex-col gap-0.5 text-xs text-gray-600 sm:flex-row sm:flex-wrap">
                <span>공유 URL <span className="font-mono text-[10px] text-[#A50034]">· {finalSlug}{isMasterBranch ? "" : " (자동)"}</span></span>
                <span className="text-[11px] text-gray-400">다른 기기에서 동일 매장으로 집계</span>
              </p>
              <div className="grid min-w-0 gap-2">
                <code className="block w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap rounded border border-gray-200 bg-white px-2 py-1.5 font-mono text-[11px] text-gray-700">
                  {typeof window !== "undefined" ? `${window.location.origin}/?store_id=${finalSlug}` : `/?store_id=${finalSlug}`}
                </code>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={async () => {
                    const url = `${window.location.origin}/?store_id=${finalSlug}`;
                    try {
                      await navigator.clipboard.writeText(url);
                      toast({ title: "복사 완료", description: url });
                    } catch {
                      toast({ title: "복사 실패", description: "URL을 직접 선택해 복사해 주세요." });
                    }
                  }}
                  className="h-8 w-full px-2.5 text-xs sm:w-auto sm:justify-self-end"
                >
                  <Copy className="w-3.5 h-3.5 mr-1" /> 복사
                </Button>
              </div>
            </div>
          )}

          {existingEntries.length > 0 && (
            <div className="rounded-lg bg-gray-50 border border-gray-100 p-3">
              <p className="text-xs font-semibold text-gray-500 mb-2">최근 등록된 지점</p>
              <div className="flex flex-wrap gap-1.5">
                {existingEntries.map(([n, s]) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      setName(n);
                      setCodeOverride(s);
                      setEditing(false);
                      setQuery("");
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
