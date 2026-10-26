import { describe, expect, it } from "vitest";
import { getFeatureById } from "@/data/features";

const feature = getFeatureById("tv", "5");

describe("TV lineup comparison card", () => {
  it("renders the lineup chart as the shared category comparison table", () => {
    expect(feature?.mediaType).toBe("table");
    expect(feature?.tableData).toHaveLength(3);
    expect(feature?.tableData?.map((product) => product.name)).toEqual([
      "G 시리즈",
      "C 시리즈",
      "B 시리즈",
    ]);
    feature?.tableData?.forEach((product) => {
      expect(product.category).toBeTruthy();
      expect(product.imageUrl).toMatch(/^\/__l5e\/assets-v1\//);
    });
  });

  it("drops the description box under the table", () => {
    expect(feature?.description ?? "").toBe("");
    expect(feature?.highlights ?? []).toHaveLength(0);
  });

  it("keeps every spec row from the official lineup chart in order", () => {
    expect(feature?.tableData?.[0].specs.map((spec) => spec.label)).toEqual([
      "올레드 evo",
      "해상도",
      "주사율",
      "VRR 최대 주사율",
      "AI 프로세서",
      "돌비 비전 / 돌비 애트모스",
      "하이퍼 브라이트 부스터",
      "버추얼 서라운드",
      "운영체제",
      "리모컨",
    ]);

    const value = (name: string, label: string) =>
      feature?.tableData?.find((product) => product.name === name)?.specs.find(
        (spec) => spec.label === label,
      )?.values;

    expect(value("G 시리즈", "VRR 최대 주사율")).toEqual(["165 Hz"]);
    expect(value("B 시리즈", "VRR 최대 주사율")).toEqual(["144 Hz / 120 Hz", "※ 모델별 상이"]);
    expect(value("B 시리즈", "AI 프로세서")).toEqual(["알파8 (3세대)"]);
    expect(value("C 시리즈", "하이퍼 브라이트 부스터")).toEqual(["올레드 밝기 부스터"]);
    feature?.tableData?.forEach((product) => {
      expect(value(product.name, "해상도")).toEqual(["4K"]);
      expect(value(product.name, "주사율")).toEqual(["120 Hz"]);
      expect(value(product.name, "버추얼 서라운드")).toEqual(["11.1.2"]);
      expect(value(product.name, "운영체제")).toEqual(["webOS 26"]);
    });
  });

  it("highlights only the rows where a series is objectively ahead", () => {
    const flagged = (name: string, label: string) =>
      !!feature?.tableData?.find((product) => product.name === name)?.specs.find(
        (spec) => spec.label === label,
      )?.highlighted;

    expect(flagged("G 시리즈", "올레드 evo")).toBe(true);
    expect(flagged("C 시리즈", "올레드 evo")).toBe(true);
    expect(flagged("B 시리즈", "올레드 evo")).toBe(false);
    expect(flagged("G 시리즈", "VRR 최대 주사율")).toBe(true);
    expect(flagged("B 시리즈", "VRR 최대 주사율")).toBe(false);
    expect(flagged("G 시리즈", "AI 프로세서")).toBe(true);
    expect(flagged("B 시리즈", "AI 프로세서")).toBe(false);

    ["해상도", "주사율", "돌비 비전 / 돌비 애트모스", "버추얼 서라운드", "운영체제"].forEach(
      (label) => {
        feature?.tableData?.forEach((product) => {
          expect(flagged(product.name, label)).toBe(false);
        });
      },
    );
  });
});
