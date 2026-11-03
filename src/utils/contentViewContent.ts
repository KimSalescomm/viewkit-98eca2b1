import { products } from "@/data/products";
import { subscriptionProducts } from "@/data/subscriptionCare";

const aliases: Record<string, string> = { dishwasher: "cooking" };
const careNames: Record<string, string> = Object.fromEntries(subscriptionProducts.map(p => [p.id, p.name]));
const names: Record<string, string> = {
  ...Object.fromEntries(subscriptionProducts.map(p => [p.id, p.name])),
  ...Object.fromEntries(products.map(p => [p.id, p.name])),
  subscription: "가전 구독",
};

/** Titles of features that were removed from the app but still have recorded views. */
export const legacyFeatureTitles: Record<string, string> = {
  "airconditioner::20": "에어컨을 더 똑똑하게 사용하는 꿀팁!",
  "airconditioner::22": "일상이 더 쾌적해지는 순간, TVCF 이야기",
  "bathair::3": "눈에 보이지 않는 팬은 어떻게 관리하죠?",
  "vacuum::6": "사전 예약, 어떤 혜택이 있을까요?",
  "vacuum::9": "사전 구매하면 어떤 혜택이 있을까요?",
  "vacuum::10": "머리카락 엉킴, 더 이상 없을까?",
  "washcombo::5": "모던하고 세련된 감성의 세탁실을 원한다면?",
  "washcombo::6": "적은 양의 빨래는 따로 세탁하길 원한다면?",
  "washer::1": "AI가 세탁까지 업그레이드 한다니 믿어지세요?",
  "washer::2": "구독하면 세탁기 속까지 관리할 수 있다는 사실, 아셨나요?",
  "washer::3": "아끼는 옷, 더 섬세하게 세탁·건조하고 싶지 않으세요?",
  "washer::4": "보이지 않는 속까지 알아서 깨끗하게 관리하고 싶으시죠?",
  "washer::5": "세탁이 끝나기 전 건조를 준비하면, 집안일도 빨리 끝나겠죠?",
  "washer::6": "매번 쓰는 세탁기·건조기 속, 얼마나 깨끗한지 궁금하지 않으세요?",
};

/** Display name for a feature view: current title, then removed-feature title, never a "특장점 N" placeholder. */
export const featureContentName = (productId: string, featureId: string, currentTitle?: string) =>
  (currentTitle?.replace(/\s*\n\s*/g, " ").trim()) ||
  legacyFeatureTitles[`${productId}::${featureId}`] ||
  `삭제된 콘텐츠 (${featureId}번)`;

/** Resolve historical product IDs without rewriting the original view records. */
export const resolveContentView = (path: string) => {
  const pathname = path.split(/[?#]/)[0].replace(/\/$/, "");
  if (pathname === "/subscription") {
    return { productId: "subscription", featureId: "overview", productName: names.subscription, contentName: "구독 케어 전후 비교 (제품 미구분)" };
  }
  const tab = pathname.match(/^\/subscription\/([^/]+)$/);
  if (tab) {
    return { productId: "subscription", featureId: tab[1], productName: names.subscription, contentName: `${careNames[tab[1]] ?? tab[1]} 케어 전후 비교` };
  }
  const match = pathname.match(/^\/product\/([^/]+)\/feature\/([^/]+)$/);
  if (!match) return null;
  const productId = aliases[match[1]] ?? match[1];
  return {
    productId,
    featureId: match[2],
    productName: names[productId] ?? "기타 제품",
    contentName: undefined as string | undefined,
  };
};

export const getContentViewProductOptions = (paths: string[]) => {
  const options = new Map<string, string>([["subscription", names.subscription]]);
  paths.forEach(path => {
    const content = resolveContentView(path);
    if (content) options.set(content.productId, content.productName);
  });
  return [...options.entries()].sort((a, b) => a[1].localeCompare(b[1], "ko"));
};