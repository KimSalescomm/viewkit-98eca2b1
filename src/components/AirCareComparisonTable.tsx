import type { ProductComparisonTable } from "@/data/features";
import SafeImage from "@/components/SafeImage";

export default function AirCareComparisonTable({ products }: { products: ProductComparisonTable[] }) {
  const labels = products[0]?.specs.map((spec) => spec.label) ?? [];

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full min-w-[720px] table-fixed border-collapse text-sm text-foreground" aria-label="LG 퓨리케어 라인업 비교">
        <thead>
          {/* 제품명 + 카테고리 행: 세 제품이 동일한 높이를 공유하는 독립 행 */}
          <tr>
            <th
              scope="col"
              rowSpan={2}
              className="w-[7.5rem] border-r border-b border-border bg-muted p-0 align-middle"
              aria-label="항목"
            />
            {products.map((product) => (
              <th key={product.name} scope="col" className="border-r border-b border-border bg-muted p-0 align-middle last:border-r-0">
                <div className="flex flex-col items-center justify-center px-3 py-4">
                  <div className="flex min-h-7 items-center justify-center gap-1.5">
                    <h4 className="text-base font-bold leading-snug">{product.name}</h4>
                    {product.best && (
                      <span className="rounded-full bg-brand-accent px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.12em] leading-none text-brand-accent-foreground">
                        BEST
                      </span>
                    )}
                  </div>
                  <span className="mt-1 flex min-h-5 items-center text-[0.825rem] font-medium">{product.category}</span>
                </div>
              </th>
            ))}
          </tr>
          {/* 이미지 행: 모든 제품이 같은 높이·같은 배경의 독립 행 */}
          <tr>
            {products.map((product) => (
              <th key={`${product.name}-image`} scope="col" className="border-r border-border bg-card p-0 last:border-r-0">
                <div className="flex h-56 items-center justify-center p-3">
                  <SafeImage src={product.imageUrl} alt={product.name} className="h-full w-full object-contain" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {labels.map((label) => (
            <tr key={label}>
              <th
                scope="row"
                className="w-[7.5rem] border-r border-t border-border bg-muted px-3 py-3 align-middle text-xs font-semibold leading-relaxed"
              >
                {label}
              </th>
              {products.map((product) => {
                const spec = product.specs.find((item) => item.label === label);
                return (
                  <td
                    key={product.name}
                    className={`border-r border-t border-border px-4 py-3 align-middle last:border-r-0 ${spec?.highlighted ? "bg-brand-soft" : "bg-card"}`}
                  >
                    <div className={`space-y-1 leading-relaxed ${spec?.highlighted ? "font-semibold" : "font-normal"}`}>
                      {(spec?.values ?? ["—"]).map((value, index) => (
                        <p
                          key={index}
                          className={label === "추천 상황" && index === 0 ? "font-semibold" : undefined}
                        >
                          {value}
                        </p>
                      ))}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
