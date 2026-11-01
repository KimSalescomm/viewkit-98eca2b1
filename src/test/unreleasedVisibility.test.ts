import { describe, expect, it } from "vitest";
import { subscriptionProducts } from "@/data/subscriptionCare";
import {
  UNRELEASED_CARE_TAB_IDS,
  UNRELEASED_PRODUCT_IDS,
  canOpenProduct,
  filterVisibleCareTabs,
  isInternalSlug,
} from "@/data/visibility";

// 2026-09-16 자 최신 노출 설정 스냅샷(content_snapshots)과 동일한 매장 계정 조건
const STORE_VISIBLE = [
  "subscription",
  "tv",
  "refrigerator",
  "ai-washtower",
  "airconditioner",
  "vacuum",
  "bathair",
  "washcombo",
];
const STORE = { isAdmin: false, isInternal: false, visible: STORE_VISIBLE };
const SC = { isAdmin: true, isInternal: true, visible: STORE_VISIBLE };
const KOR = { isAdmin: false, isInternal: true, visible: STORE_VISIBLE };

describe("미공개 제품 열람 권한", () => {
  it("미공개 제품은 하이드로타워·스타일러·식기세척기 3개", () => {
    expect(Array.from(UNRELEASED_PRODUCT_IDS).sort()).toEqual([
      "cooking",
      "hydrotower",
      "styler",
    ]);
  });

  it("매장 계정은 미공개 제품을 열람할 수 없다", () => {
    for (const id of ["hydrotower", "styler", "cooking"]) {
      expect(canOpenProduct(id, STORE)).toBe(false);
    }
  });

  it("SC(관리자)와 KOR(유관부서)는 미공개 제품을 열람할 수 있다", () => {
    for (const id of ["hydrotower", "styler", "cooking"]) {
      expect(canOpenProduct(id, SC)).toBe(true);
      expect(canOpenProduct(id, KOR)).toBe(true);
    }
  });

  it("노출 설정에 체크되더라도 매장 계정에는 열람할 수 없다", () => {
    expect(
      canOpenProduct("hydrotower", {
        isAdmin: false,
        isInternal: false,
        visible: ["hydrotower", "tv"],
      }),
    ).toBe(false);
  });

  it("이미 공개된 제품은 매장 계정에서 계속 열람할 수 있다", () => {
    expect(canOpenProduct("tv", STORE)).toBe(true);
    expect(canOpenProduct("bathair", STORE)).toBe(true);
    expect(canOpenProduct("subscription", STORE)).toBe(true);
  });
});

describe("구독 케어 탭 노출", () => {
  it("매장 계정은 하이드로타워 Max·통돌이 탭을 보지 못한다", () => {
    const ids = filterVisibleCareTabs(subscriptionProducts, false).map((p) => p.id);
    expect(ids).not.toContain("hydrotower");
    expect(ids).not.toContain("toploader");
    expect(ids).toContain("washer");
    expect(ids).toContain("bathair");
  });

  it("내부 계정은 전체 탭을 본다", () => {
    const ids = filterVisibleCareTabs(subscriptionProducts, true).map((p) => p.id);
    expect(ids).toContain("hydrotower");
    expect(ids).toContain("toploader");
    expect(ids.length).toBe(subscriptionProducts.length);
  });

  it("미공개 탭 목록은 구독 케어에 실제로 존재한다", () => {
    const ids = subscriptionProducts.map((p) => p.id);
    for (const id of UNRELEASED_CARE_TAB_IDS) {
      expect(ids).toContain(id);
    }
  });
});

describe("내부 계정 판정", () => {
  it("SC(관리자)·KOR(유관부서)만 내부 계정이다", () => {
    expect(isInternalSlug("SC")).toBe(true);
    expect(isInternalSlug("kor")).toBe(true);
    expect(isInternalSlug("GSB")).toBe(false);
    expect(isInternalSlug("")).toBe(false);
    expect(isInternalSlug(undefined)).toBe(false);
  });
});
