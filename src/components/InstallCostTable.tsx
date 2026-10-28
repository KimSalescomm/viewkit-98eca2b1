import { InstallCostTable } from "@/data/features";

/**
 * 행 기반 추가 설치 비용 표.
 * 구분 / 단가(원) / 단위 / 설명 4열 구성, 모바일에서는 좌우 스크롤.
 */
const InstallCostTableView = ({ data }: { data: InstallCostTable }) => {
  return (
    <div className="w-full px-4 py-5 sm:px-6 sm:py-6">
      {data.headerNote && (
        <p className="mb-2 text-right text-[12px] font-medium text-gray-500">{data.headerNote}</p>
      )}

      <div className="overflow-x-auto rounded-[12px] border border-gray-200">
        <table className="w-full min-w-[620px] border-collapse text-left">
          <thead>
            <tr className="bg-gray-50">
              <th className="w-[22%] whitespace-nowrap px-3 py-3 text-[13px] font-semibold text-gray-900 sm:px-4">
                구분
              </th>
              <th className="w-[16%] whitespace-nowrap px-3 py-3 text-[13px] font-semibold text-gray-900 sm:px-4">
                단가(원)
              </th>
              <th className="w-[12%] whitespace-nowrap px-3 py-3 text-[13px] font-semibold text-gray-900 sm:px-4">
                단위
              </th>
              <th className="w-[50%] px-3 py-3 text-[13px] font-semibold text-gray-900 sm:px-4">설명</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, idx) => (
              <tr key={idx} className="border-t border-gray-200 align-top">
                <td className="whitespace-nowrap px-3 py-3.5 text-[13px] font-semibold text-gray-900 sm:px-4">
                  {row.item}
                </td>
                <td className="whitespace-nowrap px-3 py-3.5 text-[13px] tabular-nums text-gray-900 sm:px-4 sm:text-right">
                  {row.price}
                </td>
                <td className="whitespace-nowrap px-3 py-3.5 text-[13px] text-gray-700 sm:px-4">{row.unit}</td>
                <td className="px-3 py-3.5 text-[12.5px] leading-relaxed text-gray-600 break-keep sm:px-4 sm:text-[13px]">
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.notes && data.notes.length > 0 && (
        <ul className="mt-3 space-y-1">
          {data.notes.map((note, idx) => (
            <li key={idx} className="flex gap-1 text-[12px] leading-relaxed text-gray-500 break-keep">
              <span className="shrink-0">*</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InstallCostTableView;
