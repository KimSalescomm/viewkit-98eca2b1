import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import { getFeatureById, getFeaturesByProductId } from "@/data/features";

describe("hydrotower product navigation data", () => {
  it("registers the product with locally served media", () => {
    const product = products.find((item) => item.id === "hydrotower");
    expect(product).toBeDefined();
    expect(product?.heroImage).toMatch(/^\/__l5e\/assets-v1\//);
  });

  it("resolves every sequential feature ID for direct detail navigation", () => {
    const features = getFeaturesByProductId("hydrotower");
    expect(features).toHaveLength(5);
    features.forEach((feature, index) => {
      expect(feature.id).toBe(String(index + 1));
      expect(getFeatureById("hydrotower", String(index + 1))).toBe(feature);
      expect(feature.mediaUrl).toMatch(/^\/__l5e\/assets-v1\//);
    });
    expect(getFeatureById("hydrotower", "6")).toBeUndefined();
  });

  it("shows the subscription care card first and no removed cards", () => {
    const features = getFeaturesByProductId("hydrotower");
    expect(features[0].tag).toBe("가전 구독");
    const tags = features.map((feature) => feature.tag);
    expect(tags).not.toContain("사계절 공기 케어");
    expect(tags).not.toContain("맞춤 가습 모드");
    expect(tags).not.toContain("편의 기능·오브제 디자인");
  });
});