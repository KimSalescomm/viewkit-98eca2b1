import type { InstallCostTable } from "@/data/features";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/**
 * 행 기반 추가 설치 비용 표.
 * 구분 / 단가(원) / 단위 / 설명 4열 구성, 모바일에서는 좌우 스크롤.
 */
const InstallCostTableView = ({ data }: { data: InstallCostTable }) => {
  return (
    <div className="w-full px-3 py-4 sm:px-4 sm:py-5">
      {data.headerNote && (
        <p className="mb-3 text-right text-sm font-medium leading-relaxed text-muted-foreground">{data.headerNote}</p>
      )}

      <div
        role="region"
        aria-label="추가 설치 비용"
        tabIndex={0}
        className="overflow-x-auto rounded-lg border border-border border-t-2 border-t-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <table className="w-full min-w-[780px] table-fixed border-collapse text-left text-[15px]">
          <colgroup>
            <col className="w-[21%]" />
            <col className="w-[19%]" />
            <col className="w-[9%]" />
            <col className="w-[51%]" />
          </colgroup>
          <thead>
            <tr className="bg-muted/70 text-foreground">
              <th scope="col" className="px-3 py-3.5 font-semibold">
                구분
              </th>
              <th scope="col" className="whitespace-nowrap px-3 py-3.5 text-right font-semibold">
                단가(원)
              </th>
              <th scope="col" className="whitespace-nowrap px-2 py-3.5 text-center font-semibold">
                단위
              </th>
              <th scope="col" className="px-3 py-3.5 font-semibold">설명</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, idx) => (
              <tr key={idx} className="border-t border-border/70 align-middle">
                <th scope="row" className="break-keep px-3 py-4 text-left font-semibold leading-relaxed text-foreground">
                  {row.item}
                </th>
                <td className="whitespace-nowrap px-3 py-4 text-right font-bold tabular-nums text-foreground">
                  {row.price}
                </td>
                <td className="whitespace-nowrap px-2 py-4 text-center text-sm text-muted-foreground">{row.unit}</td>
                <td className="break-keep px-3 py-4 leading-[1.75] text-foreground/80">
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.notes && data.notes.length > 0 && (
        <Accordion type="single" collapsible className="mt-4 border-y border-border">
          <AccordionItem value="installation-notes" className="border-b-0">
            <AccordionTrigger className="min-h-12 gap-4 py-3.5 text-[15px] font-semibold text-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&>svg]:text-brand-accent">
              유의사항 전체 보기
            </AccordionTrigger>
            <AccordionContent className="pb-4 motion-reduce:animate-none">
              <ul className="space-y-3">
                {data.notes.map((note, idx) => (
                  <li key={idx} className="flex gap-2 break-keep text-sm leading-[1.8] text-muted-foreground">
                    <span className="shrink-0">*</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default InstallCostTableView;
