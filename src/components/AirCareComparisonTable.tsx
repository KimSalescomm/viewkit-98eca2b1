import { useState } from "react";
import { Info } from "lucide-react";
import type { ProductComparisonTable } from "@/data/features";
import SafeImage from "@/components/SafeImage";


/** 항목명 옆 정보 아이콘: 마우스를 올리거나 누르면 표기 설명을 보여준다. */
function LabelHint({ text }: { text: string }) {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hovered || pinned;

  return (
    <span
      className="inline-flex shrink-0 items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        type="button"
        aria-label={`항목 표기 설명: ${text}`}
        aria-expanded={open}
        onClick={() => setPinned((value) => !value)}
        onBlur={() => setPinned(false)}
        className="flex h-4 w-4 items-center justify-center rounded-full border border-muted-foreground/40 text-muted-foreground transition-colors hover:border-brand-accent hover:text-brand-accent focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent"
      >
        <Info className="h-2.5 w-2.5" aria-hidden="true" />
      </button>
      {open && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-0 z-20 mb-1.5 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[0.6875rem] font-medium leading-none text-background shadow-md"
        >
          {text}
        </span>
      )}
    </span>
  );
}


export default function AirCareComparisonTable({ products }: { products: ProductComparisonTable[] }) {
  const hasImages = products.some((product) => Boolean(product.imageUrl));
  // 세 제품 모두 같은 이름이면 헤더에 같은 카테고리를 세 번 반복하지 않는다.
  // 좌상단에 모델라인업 같은 구분자를 쓰는 표는 제품명 아래 카테고리 줄을 숨긴다.
  const cornerLabel = products.find((product) => product.cornerLabel)?.cornerLabel;
  const showCategory =
    !products.some((product) => product.hideCategoryLine) &&
    new Set(products.map((product) => product.category)).size > 1;

  const labels = products[0]?.specs.map((spec) => spec.label) ?? [];
  const rows = labels.map((label) => ({
    label,
    group: products[0]?.specs.find((item) => item.label === label)?.group,
    hint: products[0]?.specs.find((item) => item.label === label)?.hint,
    entries: products.map((product) => ({
      product,
      spec: product.specs.find((item) => item.label === label),
    })),
    compact: products.some((product) => product.specs.find((item) => item.label === label)?.compact),
  }));
  // 같은 그룹명이 연속되는 행을 하나의 구분 셀로 묶기 위한 시작 위치와 길이
  const hasGroups = rows.some((row) => Boolean(row.group));
  const groupStarts = new Map<number, { name: string; span: number }>();
  rows.forEach((row, index) => {
    if (!row.group) return;
    if (index > 0 && rows[index - 1].group === row.group) return;
    let span = 1;
    while (index + span < rows.length && rows[index + span].group === row.group) span += 1;
    groupStarts.set(index, { name: row.group, span });
  });


  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border bg-card">
      <table
        className="w-full table-fixed border-collapse text-sm text-foreground"
        style={{ minWidth: `${Math.max(720, 110 + products.length * 104 + (hasGroups ? 72 : 0))}px` }}
        aria-label="라인업 비교"
      >
        <colgroup>
          {hasGroups && <col className="w-[5.5rem]" />}
          <col className="w-[7.5rem]" />
        </colgroup>
        <thead>
          {/* 제품명 + 카테고리 행: 세 제품이 동일한 높이를 공유하는 독립 행 */}
          <tr>
            {/* 구분 열과 항목 열을 하나의 좌상단 셀로 묶어 표의 시작을 알려준다. */}
            <th
              scope="col"
              rowSpan={hasImages ? 2 : 1}
              colSpan={hasGroups ? 2 : 1}
              className={`border-r border-border bg-muted p-0 align-middle ${hasImages ? "" : "border-b"}`}
              aria-label={cornerLabel ?? "항목"}
            >
              {cornerLabel && (
                <div className="px-2 py-4 text-center text-xs font-bold leading-relaxed">
                  {cornerLabel}
                </div>
              )}
            </th>

            {products.map((product) => (
              <th
                key={product.name}
                scope="col"
                className={`border-r border-border p-0 align-middle last:border-r-0 ${hasImages ? "" : "border-b"} ${product.best ? "bg-brand-soft" : "bg-muted"}`}
              >
                <div className="flex flex-col items-center justify-center px-3 py-4">
                  <div className="flex min-h-7 items-center justify-center gap-1.5">
                    <h4 className="text-base font-bold leading-snug">{product.name}</h4>
                    {product.best && (
                      <span className="rounded-full bg-brand-accent px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.12em] leading-none text-brand-accent-foreground">
                        BEST
                      </span>
                    )}
                  </div>
                  {showCategory && (
                    <span className="mt-1 flex min-h-5 items-center text-[0.825rem] font-medium">{product.category}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
          {/* 이미지 행: 모든 제품이 같은 높이·같은 배경의 독립 행 */}
          {hasImages && <tr>
            {products.map((product) => (
              <th key={`${product.name}-image`} scope="col" className="bg-card p-0">
                <div className="flex h-52 items-center justify-center px-5 py-4 lg:h-60">
                  <SafeImage src={product.imageUrl} alt={product.name} className="h-full w-full object-contain" />
                </div>
              </th>

            ))}
          </tr>}
        </thead>
        <tbody>
          {rows.map(({ label, entries, compact, hint }, rowIndex) => (
            <tr key={label}>
              {groupStarts.has(rowIndex) && (
                <th
                  scope="rowgroup"
                  rowSpan={groupStarts.get(rowIndex)!.span}
                  className="w-[5.5rem] border-r border-t border-border bg-muted px-2 py-3 align-middle text-xs font-bold leading-relaxed"
                >
                  {groupStarts.get(rowIndex)!.name}
                </th>
              )}
              <th
                scope="row"
                className={`w-[7.5rem] border-r border-t border-border bg-muted text-left align-middle font-semibold leading-relaxed ${compact ? "px-2 py-2 text-[0.6875rem]" : "px-3 py-3 text-xs"}`}
              >
                <div className="relative flex items-center gap-1">
                  <span>{label}</span>
                  {hint && <LabelHint text={hint} />}
                </div>
              </th>

              {entries.map(({ product, spec }) => (
                <td
                  key={product.name}
                  className={`border-r border-t border-border align-middle last:border-r-0 ${compact ? "px-2 py-2 text-xs tabular-nums lg:text-sm" : "px-4 py-3"} ${spec?.highlighted ? "bg-brand-soft" : "bg-card"}`}
                >
                  <div className={`space-y-1 leading-relaxed ${spec?.highlighted ? "font-semibold" : "font-normal"}`}>
                    {(spec?.values ?? ["—"]).map((value, index) => (
                      <p
                        key={index}
                        className={`${compact ? "whitespace-nowrap" : ""} ${spec?.emphasizeFirst && index === 0 ? "font-semibold" : ""}`}
                      >
                        {value}
                      </p>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
