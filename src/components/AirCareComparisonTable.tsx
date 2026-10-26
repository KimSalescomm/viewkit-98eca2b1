import type { ProductComparisonTable } from "@/data/features";
import SafeImage from "@/components/SafeImage";

export default function AirCareComparisonTable({ products }: { products: ProductComparisonTable[] }) {
  const labels = products[0]?.specs.map((spec) => spec.label) ?? [];

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full min-w-[720px] table-fixed border-collapse text-sm text-foreground" aria-label="LG 퓨리케어 라인업 비교">
        <thead>
          <tr>
            <th scope="col" className="w-[7.5rem] border-r border-border bg-muted p-0 align-bottom last:border-r-0" aria-label="항목" />
            {products.map((product) => (
              <th key={product.name} scope="col" className="border-r border-border p-0 align-top last:border-r-0">
                <div className="flex min-h-24 flex-col items-center justify-center gap-2 border-b border-border bg-muted px-3 py-4">
                  <h4 className="text-base font-bold leading-snug">{product.name}</h4>
                  <span className="text-[0.825rem] font-medium">{product.category}</span>
                </div>
                <div className="flex h-56 items-center justify-center bg-card p-3">
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
                className="w-[7.5rem] border-r border-t border-border bg-muted px-3 py-4 align-middle text-xs font-semibold leading-relaxed"
              >
                {label}
              </th>
              {products.map((product) => {
                const spec = product.specs.find((item) => item.label === label);
                return (
                  <td
                    key={product.name}
                    className={`border-r border-t border-border px-4 py-4 align-middle last:border-r-0 ${spec?.highlighted ? "bg-brand-soft" : "bg-card"}`}
                  >
                    <div className={`space-y-1 leading-relaxed ${spec?.highlighted ? "font-semibold" : "font-normal"}`}>
                      {(spec?.values ?? ["—"]).map((value, index) => (
                        <p key={index}>{value}</p>
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
