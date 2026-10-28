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
  it("marks the merged corner cell as 모델라인업 without a category line or description box", () => {
    expect(lineup[0]?.cornerLabel).toBe("모델라인업");
    expect(lineup.filter((product) => product.cornerLabel)).toHaveLength(1);
    expect(lineup.every((product) => product.hideCategoryLine)).toBe(true);
    expect(feature?.description).toBe("");
  });

  it("supports 필터클린봇 only on 타워I 9시리즈", () => {
    expect(values("필터클린봇")).toEqual([["O"], ["X"], ["X"], ["X"], ["X"]]);
  });
  it("supports 뷰케이스 only on 뷰I 프로 lineups", () => {
    expect(values("뷰케이스(별매)")).toEqual([["X"], ["X"], ["X"], ["O"], ["O"]]);
  });
  it("marks AI콜드프리 as model-dependent or unsupported per series", () => {
    expect(values("AI콜드프리")).toEqual([
      ["※ 모델별 상이"],
      ["※ 모델별 상이"],
      ["X"],
      ["※ 모델별 상이"],
      ["X"],
    ]);
  });
  it("keeps voice recognition scope per lineup", () => {
    expect(values("AI음성인식")).toEqual([
      ["O (본체/리모컨)"],
      ["O (본체/리모컨)"],
      ["O (본체/리모컨)"],
      ["O (리모컨)"],
      ["O (리모컨)"],
    ]);
  });
  it("keeps energy grades per series", () => {
    expect(values("에너지등급")).toEqual([
      ["1/2등급 ※ 모델별 상이"],
      ["2등급"],
      ["2등급"],
      ["1/2등급 ※ 모델별 상이"],
      ["2등급"],
    ]);
  });
  it("highlights O cells in mixed O/X rows and unique advantages", () => {
    const highlighted = lineup.map((product) => product.specs.filter((spec) => spec.highlighted).map((spec) => spec.label));
    expect(highlighted).toEqual([
      ["필터클린봇", "알러지케어 공기청정 필터", "공기청정"],
      ["알러지케어 공기청정 필터", "공기청정"],
      [],
      ["알러지케어 공기청정 필터", "공기청정", "뷰케이스(별매)"],
      ["뷰케이스(별매)"],
    ]);
  });
  it("groups rows into the original section order", () => {
    const groups = lineup[0]?.specs.map((spec) => spec.group);
    expect(groups).toEqual([
      "AI특화기능", "AI특화기능", "AI특화기능", "AI특화기능",
      "냉방", "냉방",
      "청정관리", "청정관리", "청정관리",
      "셀프청정",
      "공기청정",
      "에너지등급",
      "디자인", "디자인", "디자인",
      "출시년도",
    ]);
  });
});
