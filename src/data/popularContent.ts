import type { PopularFeature } from "@/hooks/usePopularFeatures";

/** 특장점 상세 화면 경로 (요즘 많이 본 콘텐츠의 키로 사용) */
export const popularPath = (productId: string, featureId: string) =>
  `/product/${productId}/feature/${featureId}`;

/**
 * 메인 '요즘 많이 본 콘텐츠' 1번 슬롯에 고정할 콘텐츠.
 * productId / featureId 는 제품 화면에 실제로 노출되는 카드와 일치해야 합니다.
 * (하이드로타워 화면 1번 카드 = 가전 구독 카드)
 */
export const PINNED_POPULAR_ITEMS: Pick<PopularFeature, "productId" | "featureId">[] = [
  { productId: "hydrotower", featureId: "1" },
];

/**
 * 고정 항목을 목록 맨 앞에 배치하고, 이미 들어 있던 같은 항목은 지운 뒤
 * 표시 개수(limit)에 맞춰 잘라냅니다.
 */
export const applyPinnedPopularItems = (items: PopularFeature[], limit: number): PopularFeature[] => {
  const pinned: PopularFeature[] = PINNED_POPULAR_ITEMS.map(({ productId, featureId }) => ({
    path: popularPath(productId, featureId),
    views: 0,
    productId,
    featureId,
  }));
  const pinnedPaths = new Set(pinned.map((item) => item.path));
  return [...pinned, ...items.filter((item) => !pinnedPaths.has(item.path))].slice(0, limit);
};
