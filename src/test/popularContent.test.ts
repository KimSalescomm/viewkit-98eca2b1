import { describe, expect, it } from "vitest";
import {
  PINNED_POPULAR_ITEMS,
  applyPinnedPopularItems,
  popularPath,
} from "@/data/popularContent";
import { applyCardOrder, productCardConfig } from "@/data/featureCardConfig";
import { hydrotowerFeatures } from "@/data/hydrotowerFeatures";
import type { PopularFeature } from "@/hooks/usePopularFeatures";

const item = (productId: string, featureId: string): PopularFeature => ({
  path: popularPath(productId, featureId),
  views: 10,
  productId,
  featureId,
});

describe("메인 요즘 많이 본 콘텐츠 1번 고정", () => {
  it("하이드로타워 가전 구독 카드가 1번에 온다", () => {
    const result = applyPinnedPopularItems([item("refrigerator", "10"), item("bathair", "7")], 5);
    expect(result[0]).toMatchObject({
      productId: "hydrotower",
      featureId: "1",
      path: "/product/hydrotower/feature/1",
    });
    expect(result.map((i) => i.path)).toEqual([
      "/product/hydrotower/feature/1",
      "/product/refrigerator/feature/10",
      "/product/bathair/feature/7",
    ]);
  });

  it("이미 목록에 있어도 중복되지 않는다", () => {
    const result = applyPinnedPopularItems([item("refrigerator", "10"), item("hydrotower", "1")], 5);
    expect(result.map((i) => i.path)).toEqual([
      "/product/hydrotower/feature/1",
      "/product/refrigerator/feature/10",
    ]);
  });

  it("고정 항목이 있어도 표시 개수를 넘기지 않는다", () => {
    const result = applyPinnedPopularItems(
      [item("refrigerator", "10"), item("bathair", "7"), item("tv", "1")],
      2,
    );
    expect(result.map((i) => i.path)).toEqual([
      "/product/hydrotower/feature/1",
      "/product/refrigerator/feature/10",
    ]);
  });

  it("고정 대상은 하이드로타워 화면의 첫 카드(가전 구독)다", () => {
    const [firstCard] = applyCardOrder(hydrotowerFeatures, productCardConfig.hydrotower?.order);
    const [pin] = PINNED_POPULAR_ITEMS;
    expect(firstCard.id).toBe(pin.featureId);
    expect(firstCard.tag).toBe("가전 구독");
  });
});
