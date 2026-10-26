import { products } from "@/data/products";
import { featuresMap } from "@/data/features";
import { careProcessPlans } from "@/data/careProcess";
import { subscriptionProducts, airconPlanContents, washerPlanContents } from "@/data/subscriptionCare";

/** Legacy items without IDs get a deterministic, source-qualified key, never an array index. */
export const careItemId = (label: string) => {
  let hash = 2166136261;
  for (const char of label.normalize("NFC")) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return `care-${(hash >>> 0).toString(16)}`;
};
export interface CatalogCare { careServiceId: string; careServiceName: string }
export const subscriptionProductId = (id: string) => id === "cooking" ? "dishwasher" : id;
export const canonicalCareProductId = (id: string) => id === "dishwasher" ? "cooking" : id;
export const careServiceIdFor = (productId: string, label: string) => {
  const product = subscriptionProducts.find(p => p.id === subscriptionProductId(productId));
  const known = [...(product?.careSteps ?? []), ...(productId === "washer" ? washerPlanContents.flatMap(p => p.steps) : []), ...(productId === "airconditioner" ? airconPlanContents.flatMap(p => p.steps) : [])].find(s => s.label === label);
  return known?.careServiceId ?? careItemId(label);
};
export const getCatalogCare = (productId: string, planId = "premium"): CatalogCare[] => {
  const process = careProcessPlans[productId];
  if (process) return process.careServices;
  const id = subscriptionProductId(productId);
  const subscription = subscriptionProducts.find(p => p.id === id);
  const steps = id === "washer" ? washerPlanContents.find(p => p.plan === planId)?.steps
    : id === "airconditioner" && planId === "litePlus" ? airconPlanContents.find(p => p.plan === planId)?.steps
    : subscription?.careSteps;
  const items = featuresMap[productId]?.flatMap(f => f.subscriptionServiceItems ?? []) ?? [];
  const combined = [ ...(steps ?? []).map(step => ({ careServiceId: step.careServiceId ?? careItemId(step.label), careServiceName: step.label })),
    ...items.map(item => ({ careServiceId: careServiceIdFor(productId, item.label), careServiceName: item.label })) ];
  return Array.from(new Map(combined.map(item => [item.careServiceId, item])).values());
};
export const careCatalogProducts = [
  ...products,
  ...subscriptionProducts.filter(p => !products.some(master => subscriptionProductId(master.id) === p.id))
    .map(p => ({ id: p.id, name: p.name, title: p.name })),
];