import { describe, expect, it } from "vitest";
import { subscriptionProducts } from "@/data/subscriptionCare";
import { getCareProcessPlan } from "@/data/careProcess";
import { getCatalogCare } from "@/data/careCatalog";

describe("Hydrotower subscription care", () => {
  const product = subscriptionProducts.find(item => item.id === "hydrotower");
  const plan = getCareProcessPlan("hydrotower");

  it("registers the product once without replacing existing products", () => {
    expect(subscriptionProducts.filter(item => item.id === "hydrotower")).toHaveLength(1);
    expect(subscriptionProducts.map(item => item.id)).toEqual([
      "washer", "washcombo", "airconditioner", "airpurifier", "hydrotower",
      "bathair", "refrigerator", "stem", "cooktop", "oven", "dishwasher",
    ]);
  });

  it("reuses all seven existing care IDs and official images", () => {
    expect(product?.careSteps.map(step => step.careServiceId)).toEqual([
      "disassembly", "steam", "uv", "water-filter", "air-filter", "humidifier-cleaning", "supply-cleaning",
    ]);
    expect(product?.careSteps.map(step => step.image)).toEqual(plan?.careServices.map(step => step.representativeImageUrl));
    expect(product?.careSteps.map(step => step.careServiceId)).toEqual(getCatalogCare("hydrotower").map(step => step.careServiceId));
  });

  it("preserves the published service eligibility and cycles", () => {
    expect(product?.careSteps[0]?.notes?.join("\n")).toContain("36개월 차에 1회");
    expect(product?.careSteps[3]?.notes?.join("\n")).toContain("3/6/12개월");
    expect(product?.careSteps[4]?.notes?.join("\n")).toContain("12개월마다");
  });
});