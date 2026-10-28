import { describe, expect, it } from "vitest";
import { getFeatureById } from "@/data/features";

const feature = getFeatureById("airconditioner", "21");
const lineup = feature?.tableData ?? [];
const values = (label: string) => lineup.map((product) => product.specs.find((spec) => spec.label === label)?.values);

describe("airconditioner lineup comparison table", () => {
  it("renders as a table with five models in lineup order", () => {
    expect(feature?.mediaType).toBe("table");
    expect(lineup.map((product) => product.name)).toEqual([
      "타워I 9시리즈",
      "타워I 7시리즈",
      "타워I 5시리즈",
      "뷰I 프로 6시리즈",
      "뷰I 프로 5시리즈",
    ]);
  });
  it("distinguishes premium tower from interior view categories", () => {
    expect(lineup.map((product) => product.category)).toEqual([
      "프리미엄 에어컨",
      "프리미엄 에어컨",
      "프리미엄 에어컨",
      "인테리어 에어컨",
      "인테리어 에어컨",
    ]);
  });
  it("supports 필터클린봇 only on 타워I 9시리즈", () => {
    expect(values("필터클린봇")).toEqual([["지원"], ["미지원"], ["미지원"], ["미지원"], ["미지원"]]);
  });
  it("supports 뷰케이스 only on 뷰I 프로 lineups", () => {
    expect(values("뷰케이스(별매)")).toEqual([["미지원"], ["미지원"], ["미지원"], ["지원"], ["지원"]]);
  });
  it("marks AI콜드프리 as model-dependent or unsupported per series", () => {
    expect(values("AI콜드프리")).toEqual([
      ["모델별 상이"],
      ["모델별 상이"],
      ["미지원"],
      ["모델별 상이"],
      ["미지원"],
    ]);
  });
  it("keeps voice recognition scope per lineup", () => {
    expect(values("AI음성인식")).toEqual([
      ["지원 (본체/리모컨)"],
      ["지원 (본체/리모컨)"],
      ["지원 (본체/리모컨)"],
      ["지원 (리모컨)"],
      ["지원 (리모컨)"],
    ]);
  });
  it("keeps energy grades per series", () => {
    expect(values("에너지등급")).toEqual([
      ["1/2등급 (모델별 상이)"],
      ["2등급"],
      ["2등급"],
      ["1/2등급 (모델별 상이)"],
      ["2등급"],
    ]);
  });
  it("highlights only the unique advantages", () => {
    const highlighted = lineup.map((product) => product.specs.filter((spec) => spec.highlighted).map((spec) => spec.label));
    expect(highlighted).toEqual([["필터클린봇"], [], [], ["뷰케이스(별매)"], ["뷰케이스(별매)"]]);
  });
});
