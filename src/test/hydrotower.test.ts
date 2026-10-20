import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import { getFeatureById, getFeaturesByProductId } from "@/data/features";
import { getCareProcessPlan } from "@/data/careProcess";

describe("hydrotower product navigation data", () => {
  it("registers the product with locally served media", () => {
    const product = products.find((item) => item.id === "hydrotower");
    expect(product).toBeDefined();
    expect(product?.heroImage).toMatch(/^\/__l5e\/assets-v1\//);
  });

  it("resolves every sequential feature ID for direct detail navigation", () => {
    const features = getFeaturesByProductId("hydrotower");
    expect(features).toHaveLength(6);
    features.forEach((feature, index) => {
      expect(feature.id).toBe(String(index + 1));
      expect(getFeatureById("hydrotower", String(index + 1))).toBe(feature);
      expect(feature.mediaUrl).toMatch(/^\/__l5e\/assets-v1\//);
    });
  });

  it("plays the official AI humidification video on the 공간 맞춤 AI가습 card", () => {
    const feature = getFeatureById("hydrotower", "2");
    expect(feature?.mediaType).toBe("video");
    expect(feature?.mediaUrl).toContain("hydrotower-space-ai-humidification.mp4");
    expect(feature?.fallbackUrl).toContain("hydrotower-space-ai-humidification.webm");
    expect(feature?.posterImage).toContain("hydrotower-space-ai-humidification-poster.jpg");
  });

  it("plays the official purified humidification video on the 4단계 정수 가습 card", () => {
    const feature = getFeatureById("hydrotower", "3");
    expect(feature?.mediaType).toBe("video");
    expect(feature?.mediaUrl).toContain("hydrotower-purified-humidification.mp4");
    expect(feature?.fallbackUrl).toContain("hydrotower-purified-humidification.webm");
    expect(feature?.posterImage).toContain("hydrotower-purified-humidification-poster.jpg");
  });

  it("provides two independent hygiene videos on feature 4", () => {
    const feature = getFeatureById("hydrotower", "4");
    expect(feature?.tabs).toHaveLength(2);
    const [recovery, drying] = feature?.tabs ?? [];
    expect(recovery?.mediaType).toBe("video");
    expect(recovery?.mediaUrl).toContain("hydrotower-residual-water-recovery.mp4");
    expect(recovery?.fallbackUrl).toContain("hydrotower-residual-water-recovery.webm");
    expect(drying?.mediaType).toBe("video");
    expect(drying?.mediaUrl).toContain("hydrotower-air-path-drying.mp4");
    expect(drying?.fallbackUrl).toContain("hydrotower-air-path-drying.webm");
    expect(feature?.mediaUrl).toBe(recovery?.mediaUrl);
  });

  it("shows the V2 filter image inside the shared card frame", () => {
    const feature = getFeatureById("hydrotower", "5");
    expect(feature?.mediaType).toBe("image");
    expect(feature?.mediaUrl).toContain("hydrotower-filter.jpg");
    expect(feature?.imageFit).toBe("contain");
  });

  it("compares three official air care lineups with aligned spec labels", () => {
    const feature = getFeatureById("hydrotower", "6");
    expect(feature?.mediaType).toBe("table");
    expect(feature?.tag).toBe("라인업 비교");
    const tableData = feature?.tableData ?? [];
    expect(tableData).toHaveLength(3);
    expect(tableData.map((product) => product.name)).toEqual([
      "AI 360˚ 공기청정기 M7",
      "하이드로타워 Max",
      "하이드로타워",
    ]);
    const labels = tableData[0].specs.map((spec) => spec.label);
    expect(labels).toContain("대표 모델명");
    expect(labels).toContain("최대 가습량");
    expect(labels).toContain("청정 사용 면적");
    tableData.forEach((product) => {
      expect(product.specs.map((spec) => spec.label)).toEqual(labels);
    });
    const byName = (name: string) => tableData.find((product) => product.name === name);
    expect(byName("AI 360˚ 공기청정기 M7")?.specs.find((s) => s.label === "대표 모델명")?.values).toEqual(["AS356NSMA"]);
    expect(byName("하이드로타워 Max")?.specs.find((s) => s.label === "최대 가습량")?.values).toEqual(["850 cc/hr"]);
    expect(byName("하이드로타워")?.specs.find((s) => s.label === "대표 모델명")?.values).toEqual(["HY706RSUA"]);
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

describe("hydrotower care service copy", () => {
  const plan = getCareProcessPlan("hydrotower");

  it("uses the approved detail line for each care service", () => {
    const byId = (id: string) => plan?.careServices.find((step) => step.careServiceId === id);
    expect(byId("steam")?.description).toBe("스팀 살균으로 세균 99.999% 제거");
    expect(byId("water-filter")?.description).toBe("고객 선택 주기에 정수필터 무상 교체");
    expect(byId("air-filter")?.description).toBe("12개월마다 공기청정필터 무상 교체");
  });

  it("keeps every care service name and benefit title in the official order", () => {
    expect(plan?.careServices.map((step) => step.careServiceName)).toEqual([
      "분해 케어",
      "위생 케어(스팀)",
      "위생 케어(UV)",
      "정수필터 교체",
      "공기청정필터 교체",
      "가습부 클리닝",
      "급수부 클리닝",
    ]);
    expect(plan?.careServices.map((step) => step.displayOrder)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});