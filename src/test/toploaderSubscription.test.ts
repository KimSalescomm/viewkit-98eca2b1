import { describe, expect, it } from "vitest";
import { subscriptionProducts } from "@/data/subscriptionCare";
describe("통돌이 케어 제공 조건", () => {
  const product = subscriptionProducts.find(p => p.id === "toploader");
  it("완전 분해는 프리미엄 48개월 차 1회이다", () => {
    expect(product?.careSteps.find(s => s.careServiceId === "toploader-disassembly")?.notes).toContain("분해 케어는 프리미엄 케어서비스 구독 시에만 48개월 차에 1회 제공해 드립니다.");
  });
  it("먼지필터는 24개월 주기로 교체한다", () => {
    expect(product?.careSteps.find(s => s.careServiceId === "toploader-filter")?.notes).toContain("먼지필터: 24개월 주기 교체");
  });
});