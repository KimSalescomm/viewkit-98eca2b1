import { describe, expect, it } from "vitest";
import { getFeaturesByProductId } from "@/data/features";
import { applyCardOrder, productCardConfig } from "@/data/featureCardConfig";

/** '가전 구독' 카드가 있는 제품 */
const WITH_SUBSCRIPTION = [
  "hydrotower",
  "refrigerator",
  "vacuum",
  "ai-washtower",
  "airconditioner",
  "bathair",
  "washcombo",
];

/** 구독 카드가 없는 제품(실수로 카드가 추가되면 아래 테스트가 실패한다) */
const WITHOUT_SUBSCRIPTION = ["styler", "tv", "pc", "cooking"];

const orderedCards = (productId: string) =>
  applyCardOrder(getFeaturesByProductId(productId), productCardConfig[productId]?.order);

const isSubscriptionCard = (feature: { tag?: string }) => (feature.tag ?? "").includes("구독");

describe("제품 카드 노출 순서", () => {
  it.each(WITH_SUBSCRIPTION)("%s 제품은 구독 카드가 맨 앞에 온다", (productId) => {
    const cards = orderedCards(productId);
    expect(cards.length).toBeGreaterThan(0);
    expect(isSubscriptionCard(cards[0])).toBe(true);
  });

  it.each(WITHOUT_SUBSCRIPTION)("%s 제품은 구독 카드가 없다", (productId) => {
    expect(orderedCards(productId).some(isSubscriptionCard)).toBe(false);
  });
});
