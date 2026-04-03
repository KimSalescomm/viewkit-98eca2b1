import { Link, useParams } from "react-router-dom";
import { getProductById } from "@/data/products";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Manual = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = getProductById(productId || "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 px-4 py-6 sm:px-6 sm:py-8">
      <div className="max-w-xl mx-auto sm:max-w-3xl">
        {/* Back */}
        <Link
          to={productId ? `/product/${productId}` : "/"}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm mb-6 transition-colors"
        >
          <span className="text-lg">←</span>
          <span>돌아가기</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-100 mb-4">
            <span className="text-2xl">📖</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            VIEW KIT 운영 매뉴얼
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            매니저를 위한 운영 가이드
          </p>
        </div>

        {/* Manual Content */}
        <div className="space-y-4">
          {/* Section 1 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <Accordion type="single" collapsible>
              <AccordionItem value="activation" className="border-none">
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 text-sm font-bold">1</span>
                    <span className="font-semibold text-gray-900">제품 활성화/비활성화 관리</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <div className="space-y-4 text-sm text-gray-700">
                    <p>
                      현재 특정 제품만 활성화되어 있고, 나머지 제품은 비활성화(흑백 처리, 클릭 불가) 상태입니다.
                    </p>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">📁 수정 파일</h4>
                      <code className="text-xs bg-gray-200 px-2 py-1 rounded text-purple-700">
                        src/pages/ProductSelection.tsx
                      </code>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <h4 className="font-semibold text-green-800 mb-2">✅ 모든 제품 활성화</h4>
                        <pre className="text-xs bg-white rounded-lg p-3 overflow-x-auto border">
{`const isEnabled = true;`}
                        </pre>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">🔧 특정 제품만 활성화</h4>
                        <pre className="text-xs bg-white rounded-lg p-3 overflow-x-auto border">
{`const enabledProducts = ["refrigerator", "tv", "styler"];
const isEnabled = enabledProducts.includes(product.id);`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <Accordion type="single" collapsible>
              <AccordionItem value="product-ids" className="border-none">
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 text-purple-600 text-sm font-bold">2</span>
                    <span className="font-semibold text-gray-900">제품 ID 목록</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left px-4 py-2.5 font-semibold text-gray-700">제품</th>
                          <th className="text-left px-4 py-2.5 font-semibold text-gray-700">ID</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {[
                          { name: "TV", id: "tv" },
                          { name: "냉장고", id: "refrigerator" },
                          { name: "의류관리기", id: "styler" },
                          { name: "워시타워", id: "washer" },
                          { name: "청소기", id: "vacuum" },
                          { name: "휘센 에어컨", id: "airconditioner" },
                          { name: "PC", id: "pc" },
                          { name: "식기세척기", id: "cooking" },
                        ].map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2.5 text-gray-900">{item.name}</td>
                            <td className="px-4 py-2.5">
                              <code className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded">
                                {item.id}
                              </code>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <Accordion type="single" collapsible>
              <AccordionItem value="features" className="border-none">
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 text-orange-600 text-sm font-bold">3</span>
                    <span className="font-semibold text-gray-900">특장점 콘텐츠 수정</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">📁 수정 파일</h4>
                      <code className="text-xs bg-gray-200 px-2 py-1 rounded text-purple-700">
                        src/data/features.ts
                      </code>
                    </div>
                    <p>각 제품의 특장점 데이터는 <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">features.ts</code>에서 관리됩니다.</p>
                    <ul className="space-y-2 pl-1">
                      <li className="flex gap-2"><span>•</span><span><strong>tag</strong>: 파란색 태그 이름</span></li>
                      <li className="flex gap-2"><span>•</span><span><strong>title</strong>: 메인 질문 (볼드 텍스트)</span></li>
                      <li className="flex gap-2"><span>•</span><span><strong>subtitle</strong>: 상세 설명 (회색 텍스트)</span></li>
                      <li className="flex gap-2"><span>•</span><span><strong>description</strong>: 설명 더보기 내용</span></li>
                      <li className="flex gap-2"><span>•</span><span><strong>highlights</strong>: 핵심만 쏙 항목들</span></li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <Accordion type="single" collapsible>
              <AccordionItem value="branding" className="border-none">
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-100 text-teal-600 text-sm font-bold">4</span>
                    <span className="font-semibold text-gray-900">제품 브랜딩 수정</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">📁 수정 파일</h4>
                      <code className="text-xs bg-gray-200 px-2 py-1 rounded text-purple-700">
                        src/data/products.ts
                      </code>
                    </div>
                    <p>제품 카테고리명, 타이틀, 설명, 키비주얼 이미지 등을 수정할 수 있습니다.</p>
                    <ul className="space-y-2 pl-1">
                      <li className="flex gap-2"><span>•</span><span><strong>name</strong>: 카테고리 이름 (예: "냉장고")</span></li>
                      <li className="flex gap-2"><span>•</span><span><strong>title</strong>: 제품 타이틀 (예: "DIOS 냉장고")</span></li>
                      <li className="flex gap-2"><span>•</span><span><strong>description</strong>: 제품 설명</span></li>
                      <li className="flex gap-2"><span>•</span><span><strong>keyVisualImage</strong>: 키비주얼 이미지 URL</span></li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-400">
          <p>VIEW KIT v1.0 · 매니저 전용 가이드</p>
        </div>
      </div>
    </div>
  );
};

export default Manual;
