import { describe, it, expect } from "vitest";
import { BRANCH_CODE_MAP, getBranchNameByCode } from "@/data/branches";
import { normalizeStoreIdentity, slugifyStoreName } from "@/utils/storeId";

describe("서안산본점 매장 코드", () => {
  it("서안산본점의 코드는 SASB다 (서·안·산·본 초성)", () => {
    expect(BRANCH_CODE_MAP["서안산본점"]).toBe("SASB");
  });

  it("SASB 코드로 매장명 서안산본점을 찾을 수 있다", () => {
    expect(getBranchNameByCode("SASB")).toBe("서안산본점");
  });

  it("코드만 SASB로 들어와도 매장명이 서안산본점으로 복구된다", () => {
    const normalized = normalizeStoreIdentity("SASB", "SASB");
    expect(normalized.name).toBe("서안산본점");
    expect(normalized.slug).toBe("SASB");
  });

  it("서안산본점을 입력하면 SASB 코드가 부여된다", () => {
    expect(slugifyStoreName("서안산본점")).toBe("SASB");
  });
});
