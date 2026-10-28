import { describe, expect, it } from "vitest";
import { airconditionerFeatures } from "@/data/airconditionerFeatures";

const aiWind = airconditionerFeatures.find((feature) => feature.id === "18")!;

describe("에어컨 AI바람 카드 영상", () => {
  it("저장된 공식 영상과 대체본·포스터를 사용한다", () => {
    expect(aiWind.mediaType).toBe("video");
    expect(aiWind.mediaUrl).toMatch(/^\/__l5e\/assets-v1\/.+\.mp4$/);
    expect(aiWind.fallbackUrl).toMatch(/^\/__l5e\/assets-v1\/.+\.webm$/);
    expect(aiWind.posterImage).toMatch(/^\/__l5e\/assets-v1\/.+\.jpg$/);
  });

  it("외부 LG 서버 영상을 참조하지 않는다", () => {
    expect(aiWind.mediaUrl).not.toContain("lge.co.kr");
  });
});
