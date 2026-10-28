import { describe, expect, it } from "vitest";
import { getFeatureById } from "@/data/features";

/**
 * 바스에어시스템 듀얼 배기 카드의 사진/영상 전환 데이터 검증.
 * 사진(mediaUrl)은 유지한 채 영상(videoUrl)이 추가·연결되어 있어야 한다.
 */
describe("바스에어시스템 듀얼 배기 사진/영상 토글", () => {
  const feature = getFeatureById("bathair", "1");

  it("사진과 영상을 함께 보유한다", () => {
    expect(feature?.mediaType).toBe("image");
    expect(feature?.mediaUrl).toContain("MX0120BASV_160CMH_pc.jpg");
    expect(feature?.videoUrl).toMatch(/\.mp4$/);
    expect(feature?.videoFallbackUrl).toMatch(/\.webm$/);
    expect(feature?.videoPosterImage).toMatch(/\.jpg$/);
  });

  it("토글 영상은 다른 제품과 같은 16:9 표시를 사용한다", () => {
    expect(feature?.videoAspectRatio).toBe("16/9");
    expect(feature?.videoObjectFit).toBe("contain");
  });
});
