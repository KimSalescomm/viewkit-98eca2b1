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
    expect(features).toHaveLength(8);
    features.forEach((feature, index) => {
      expect(feature.id).toBe(String(index + 1));
      expect(getFeatureById("hydrotower", String(index + 1))).toBe(feature);
      expect(feature.mediaUrl).toMatch(/^\/__l5e\/assets-v1\//);
    });
    expect(getFeatureById("hydrotower", "9")).toBeUndefined();
  });
});