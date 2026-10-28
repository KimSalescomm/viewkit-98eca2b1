import { describe, expect, it } from "vitest";
import { getFeatureById } from "@/data/features";

const feature = getFeatureById("bathair", "4");
const costTable = feature?.tabs?.find((tab) => tab.label === "추가 설치 비용")?.costTable;

describe("바스에어시스템 추가 설치 비용 표", () => {
  it("표 위에 제목 '바스에어시스템 추가 설치 비용'을 표시한다", () => {
    expect(costTable?.title).toBe("바스에어시스템 추가 설치 비용");
  });

  it("기준 문구 '[단가 : 원, VAT 포함]'을 유지한다", () => {
    expect(costTable?.headerNote).toBe("[단가 : 원, VAT 포함]");
  });

  it("8개 항목의 순서·단가·단위를 원문 그대로 유지한다", () => {
    expect(costTable?.rows.map((row) => [row.item, row.price, row.unit])).toEqual([
      ["신규 타공", "10,000", "1개"],
      ["덕트 추가 및 교체", "10,000", "1M"],
      ["레듀샤(덕트 연결소켓)", "5,000", "1개"],
      ["콘센트 설치", "7,000 / 10,000", "1구 / 2구"],
      ["전원선 연장", "10,000", "1M"],
      ["천장 보강 작업", "20,000", "1식"],
      ["점검구 설치", "50,000", "1개"],
      ["기존 제품 재설치", "10,000", "1대"],
    ]);
  });

  it("하단 유의사항 5개를 순서대로 유지한다", () => {
    expect(costTable?.notes).toHaveLength(5);
    expect(costTable?.notes?.[0]).toContain("기존 환풍기는");
    expect(costTable?.notes?.[1]).toContain("기본 설치 비용은 제품 가격에 포함되어 있습니다");
    expect(costTable?.notes?.[2]).toContain("천장 복구 비용은 고객 부담");
    expect(costTable?.notes?.[3]).toContain("LG전자서비스센터(1544-7777)");
    expect(costTable?.notes?.[4]).toContain("이전 설치 신청 > 일정 조율 및 예약");
  });
});
