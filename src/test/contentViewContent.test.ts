import { describe, expect, it } from "vitest";
import { getContentViewProductOptions, resolveContentView } from "@/utils/contentViewContent";

describe("content view classification", () => {
  it("merges historical dishwasher and cooking records into one product", () => {
    expect(resolveContentView("/product/dishwasher/feature/1")?.productId).toBe("cooking");
    expect(resolveContentView("/product/dishwasher/feature/1")).toEqual(
      resolveContentView("/product/cooking/feature/1"),
    );
    expect(getContentViewProductOptions([
      "/product/dishwasher/feature/1", "/product/cooking/feature/2",
    ]).filter(([id]) => id === "cooking")).toHaveLength(1);
  });
  it("includes subscription page views alongside feature views", () => {
    expect(resolveContentView("/subscription?store_id=GSB")?.productId).toBe("subscription");
    expect(resolveContentView("/subscription/")?.featureId).toBe("overview");
  });
  it("offers the subscription product filter even before it has views", () => {
    expect(getContentViewProductOptions([]).map(([id]) => id)).toContain("subscription");
  });
  it("keeps feature IDs and excludes unrelated page views", () => {
    expect(resolveContentView("/product/washer/feature/3")?.featureId).toBe("3");
    expect(resolveContentView("/product/washer")).toBeNull();
    expect(resolveContentView("/admin")).toBeNull();
  });
  it("counts each subscription product tab as its own content under 가전 구독", () => {
    const tab = resolveContentView("/subscription/hydrotower");
    expect(tab?.productId).toBe("subscription");
    expect(tab?.featureId).toBe("hydrotower");
    expect(tab?.contentName).toBe("하이드로타워 Max 케어 전후 비교");
    expect(resolveContentView("/subscription/washer")?.featureId).not.toBe(tab?.featureId);
  });
});
