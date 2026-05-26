import { Link } from "react-router-dom";
import { ArrowLeft, Printer } from "lucide-react";
import { featuresMap } from "@/data/features";
import { products } from "@/data/products";

const Legal = () => {
  const productOrder = products.map((p) => ({ id: p.id, name: p.name }));

  // 모든 특장점 + 디스클레이머 수집
  const sections = productOrder
    .map((p) => {
      const features = featuresMap[p.id] || [];
      const rows = features
        .map((f) => {
          const disc = [
            ...(f.disclaimers || []),
            ...(f.collapsibleDisclaimers || []).flatMap((c) =>
              c.items.map((i) => `[${c.title}] ${i}`),
            ),
          ];
          return { ...f, disc };
        })
        .filter((f) => f.disc.length > 0);
      return { id: p.id, name: p.name, rows };
    })
    .filter((s) => s.rows.length > 0);

  const total = sections.reduce(
    (a, s) => a + s.rows.reduce((b, r) => b + r.disc.length, 0),
    0,
  );

  return (
    <main className="min-h-screen bg-white text-slate-900 print:bg-white">
      {/* 상단 바 (인쇄 시 숨김) */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur print:hidden">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" /> 홈
          </Link>
          <h1 className="text-sm font-semibold text-slate-700">법무 품의용 — 디스클레이머 모음</h1>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-700"
          >
            <Printer className="w-4 h-4" /> 인쇄
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 print:px-0 print:py-4">
        <header className="mb-8 pb-6 border-b border-slate-200">
          <p className="text-xs font-medium text-slate-500 tracking-wider">LG VIEW KIT · LEGAL REVIEW</p>
          <h2 className="text-2xl font-bold mt-1 text-slate-900">매장 키오스크 표기 문구 디스클레이머 정리</h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            현재 매장 키오스크 앱(View Kit)의 각 제품·특장점 화면에 노출되는 광고 표기에 대한
            주석(disclaimer) 전수입니다. 광고 심의 / 법무 검토용으로 작성되었습니다.
          </p>
          <div className="flex gap-4 mt-3 text-xs text-slate-500">
            <span>총 제품군: {sections.length}개</span>
            <span>총 디스클레이머: {total}건</span>
            <span>출력일: {new Date().toLocaleDateString("ko-KR")}</span>
          </div>
        </header>

        {sections.map((s) => (
          <section key={s.id} className="mb-10 break-inside-avoid">
            <h3 className="text-lg font-bold text-slate-900 mb-3 pb-2 border-b-2 border-slate-900">
              {s.name}
            </h3>
            <div className="space-y-5">
              {s.rows.map((f) => (
                <article
                  key={f.id}
                  className="grid grid-cols-[40px_1fr] gap-x-4 print:break-inside-avoid"
                >
                  <div className="text-xs font-mono text-slate-400 pt-0.5">#{f.id}</div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2 mb-1">
                      {f.tag && (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                          {f.tag}
                        </span>
                      )}
                      <h4 className="text-sm font-semibold text-slate-900">
                        {f.title.replace(/\n/g, " ")}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 mb-2 leading-relaxed">
                      {f.subtitle.replace(/\n/g, " ")}
                    </p>
                    <ul className="space-y-1.5">
                      {f.disc.map((d, i) => (
                        <li
                          key={i}
                          className="text-[11px] leading-relaxed text-slate-700 pl-3 border-l-2 border-slate-300"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        <footer className="mt-12 pt-6 border-t border-slate-200 text-[11px] text-slate-400 leading-relaxed">
          <p>※ 본 문서는 매장 키오스크 노출 문구의 디스클레이머 부분만을 발췌한 것입니다.</p>
          <p>※ 영상·이미지 자료는 LG전자 공식 자료를 사용하며, 본 키오스크는 비상업적 매장 안내 용도로 활용됩니다.</p>
        </footer>
      </div>
    </main>
  );
};

export default Legal;
