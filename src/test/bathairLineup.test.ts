import { describe, expect, it } from "vitest";
import { getFeatureById } from "@/data/features";

const lineup = getFeatureById("bathair", "8")?.tableData ?? [];
const values = (label: string) => lineup.map((product) => product.specs.find((spec) => spec.label === label)?.values);

describe("bathair supplied model specifications", () => {
  it("preserves the three model identifiers in lineup order", () => {
    expect(values("모델명")).toEqual([["MX0120BASV"], ["M-X0120BASV"], ["M-X0120BASA"]]);
  });
  it("preserves each maximum airflow in ventilation / fan / heating order", () => {
    expect(values("최대 풍량 (환기/송풍/온풍)")).toEqual([
      ["160 / 120 / 120 CMH"], ["120 / 120 / 120 CMH"], ["120 / 120 / 120 CMH"],
    ]);
  });
  it("supports dual exhaust only on premium dual", () => {
    expect(values("듀얼배기")).toEqual([["지원"], ["미지원"], ["미지원"]]);
  });
  it.each(["UV 팬살균", "무드등"])("supports %s only on premium lineups", (label) => {
    expect(values(label)).toEqual([["지원"], ["지원"], ["미지원"]]);
  });
  it.each(["와이드 자동 바람", "온풍", "송풍", "공간케어", "바디케어", "원격제어(ThinQ)"])("supports %s on all three models", (label) => {
    expect(values(label)).toEqual([["지원"], ["지원"], ["지원"]]);
  });
  it("shows the recommendation row without bold emphasis", () => {
    const specs = lineup.map((product) => product.specs.find((spec) => spec.label === "추천 상황"));
    expect(specs.every((spec) => spec && !spec.emphasizeFirst)).toBe(true);
  });
});