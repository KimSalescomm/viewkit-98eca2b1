import { describe, it, expect } from "vitest";
import { careCatalogProducts, getCatalogCare, careItemId, careServiceIdFor, canonicalCareProductId } from "@/data/careCatalog";
import { subscriptionProducts, washerPlanContents, airconPlanContents } from "@/data/subscriptionCare";
import { resolveCareSource, type ProductCareVideo } from "@/hooks/useCareVideoSegments";
import { products } from "@/data/products";
const config = (product_id: string, model_id = "", shared_product_id: string | null = null, shared_model_id = ""): ProductCareVideo => ({ product_id, model_id, shared_product_id, shared_model_id, common_video_url: "https://example.com/care.mp4", video_duration: 118, allow_full_video: true });
describe("제품별 케어 관리", () => {
  it("제품 마스터의 모든 제품이 선택 가능하다", () => { expect(products.every(p => careCatalogProducts.some(c => c.id === p.id))).toBe(true); });
  it("하이드로타워 기존 7개 ID와 목록을 보존한다", () => { expect(getCatalogCare("hydrotower").map(c => c.careServiceId)).toEqual(["disassembly", "steam", "uv", "water-filter", "air-filter", "humidifier-cleaning", "supply-cleaning"]); });
  it("제품별 목록을 재사용하고 없는 케어를 만들지 않는다", () => { expect(getCatalogCare("vacuum")).toHaveLength(5); expect(getCatalogCare("cooking")).toHaveLength(7); expect(getCatalogCare("pc")).toEqual([]); });
  it("모델별 설정은 다른 모델과 분리된다", () => { const a = config("hydrotower", "A"); const b = config("hydrotower", "B"); expect(resolveCareSource([a,b], "hydrotower", "A")).toBe(a); expect(resolveCareSource([a,b], "hydrotower", "B")).toBe(b); });
  it("공유 모델은 원본 영상·구간 소스를 재사용한다", () => { const original = config("hydrotower", "A"); expect(resolveCareSource([original, config("hydrotower", "B", "hydrotower", "A")], "hydrotower", "B")).toBe(original); });
  it("순환 공유는 거부한다", () => { expect(resolveCareSource([config("a", "", "b"), config("b", "", "a")], "a")).toBeUndefined(); });
  it("레거시 항목 키는 항목 순서와 무관하다", () => { expect(["클리닝", "스팀"].map(careItemId).reverse()).toEqual(["스팀", "클리닝"].map(careItemId)); expect(careItemId("클리닝")).not.toBe(careItemId("스팀")); });
  it("구독 고객 화면의 모든 항목 ID가 관리자 목록에 존재한다", () => {
    for (const product of subscriptionProducts) {
      const id = canonicalCareProductId(product.id);
      const adminIds = new Set([ ...getCatalogCare(id, "premium"), ...getCatalogCare(id, "litePlus") ].map(s => s.careServiceId));
      for (const step of product.careSteps) expect(adminIds.has(step.careServiceId ?? careServiceIdFor(id, step.label))).toBe(true);
    }
    for (const [id, plans] of [["washer", washerPlanContents], ["airconditioner", airconPlanContents]] as const) {
      for (const plan of plans) for (const step of plan.steps) expect(getCatalogCare(id, plan.plan).some(s => s.careServiceId === step.careServiceId)).toBe(true);
    }
  });
});