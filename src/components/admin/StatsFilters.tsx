import { cn } from "@/lib/utils";
import { BRANCH_CODE_MAP, getManagerByBranch, isSpecialtyManager, getBranchNameByCode } from "@/data/branches";

// 코드(store_id) → 정식 지점명 역매핑
const CODE_TO_NAME: Record<string, string> = Object.fromEntries(
  Object.entries(BRANCH_CODE_MAP).map(([name, code]) => [code, name]),
);

export type StoreCategory = "specialty" | "hiplaza" | "unknown";
export type CategoryKey = "all" | "hiplaza" | "specialty";
export type RangeKey = "today" | "7d" | "14d" | "30d" | "all";

export const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "hiplaza", label: "하이프라자" },
  { key: "specialty", label: "전문점" },
];

export const RANGES: { key: RangeKey; label: string }[] = [
  { key: "today", label: "오늘" },
  { key: "7d", label: "7일" },
  { key: "14d", label: "14일" },
  { key: "30d", label: "30일" },
  { key: "all", label: "전체" },
];

export const getCategoryByName = (name: string | null | undefined): StoreCategory => {
  if (!name) return "unknown";
  const manager = getManagerByBranch(name);
  if (!manager) return "unknown";
  return isSpecialtyManager(manager) ? "specialty" : "hiplaza";
};

export const getCategoryByCode = (code: string): StoreCategory =>
  getCategoryByName(CODE_TO_NAME[(code || "").toUpperCase()] || getBranchNameByCode((code || "").toUpperCase()));

export const matchesCategory = (category: CategoryKey, resolved: StoreCategory): boolean =>
  category === "all" || resolved === category;

/** 선택 기간의 시작 시각(ISO). "전체"는 null */
export const getRangeSinceISO = (key: RangeKey): string | null => {
  if (key === "all") return null;
  const d = new Date();
  if (key === "today") {
    d.setHours(0, 0, 0, 0);
  } else {
    const days = key === "7d" ? 7 : key === "14d" ? 14 : 30;
    d.setDate(d.getDate() - days);
    d.setHours(0, 0, 0, 0);
  }
  return d.toISOString();
};

interface StatsFilterBarProps {
  category: CategoryKey;
  onCategoryChange: (key: CategoryKey) => void;
  range: RangeKey;
  onRangeChange: (key: RangeKey) => void;
  className?: string;
}

const chipClass = (active: boolean) =>
  cn(
    "px-3 h-7 rounded-md text-xs font-medium transition-colors",
    active ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700",
  );

const StatsFilterBar = ({
  category,
  onCategoryChange,
  range,
  onRangeChange,
  className,
}: StatsFilterBarProps) => (
  <div className={cn("flex items-center gap-2 flex-wrap", className)}>
    <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
      {CATEGORIES.map((c) => (
        <button key={c.key} type="button" onClick={() => onCategoryChange(c.key)} className={chipClass(category === c.key)}>
          {c.label}
        </button>
      ))}
    </div>
    <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
      {RANGES.map((r) => (
        <button key={r.key} type="button" onClick={() => onRangeChange(r.key)} className={chipClass(range === r.key)}>
          {r.label}
        </button>
      ))}
    </div>
  </div>
);

export default StatsFilterBar;
