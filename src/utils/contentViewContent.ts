import { products } from "@/data/products";
import { subscriptionProducts } from "@/data/subscriptionCare";

const aliases: Record<string, string> = { dishwasher: "cooking" };
const names: Record<string, string> = {
  ...Object.fromEntries(subscriptionProducts.map(p => [p.id, p.name])),
  ...Object.fromEntries(products.map(p => [p.id, p.name])),
  subscription: "가전 구독",
};

/** Resolve historical product IDs without rewriting the original view records. */
export const resolveContentView = (path: string) => {
  const pathname = path.split(/[?#]/)[0].replace(/\/$/, "");
  if (pathname === "/subscription") {
    return { productId: "subscription", featureId: "overview", productName: names.subscription };
  }
  const match = pathname.match(/^\/product\/([^/]+)\/feature\/([^/]+)$/);
  if (!match) return null;
  const productId = aliases[match[1]] ?? match[1];
  return {
    productId,
    featureId: match[2],
    productName: names[productId] ?? "기타 제품",
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