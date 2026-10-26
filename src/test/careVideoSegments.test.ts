import { describe, expect, it } from "vitest";
import {
  formatTimeInput,
  hasCareVideo,
  hasReachedEnd,
  parseTimeInput,
  resolveVideoUrl,
  toSegmentMap,
  validateSegment,
} from "@/utils/careVideoSegments";

describe("케어 영상 구간 로직", () => {
  it("DB 행을 careServiceId → 구간 맵으로 변환한다", () => {
    const map = toSegmentMap([
      {
        product_id: "hydrotower",
        care_service_id: "steam",
        video_url: "https://example.com/care.mp4",
        start_seconds: 12.5,
        end_seconds: 30,
      },
      {
        product_id: "hydrotower",
        care_service_id: "uv",
        video_url: "https://example.com/care.mp4",
        start_seconds: 40,
        end_seconds: null,
      },
    ]);
    expect(map.steam).toEqual({
      videoUrl: "https://example.com/care.mp4",
      startSeconds: 12.5,
      endSeconds: 30,
    });
    expect(map.uv.endSeconds).toBeNull();
  });

  it("영상 URL 우선순위: 저장된 구간 > 케어별 영상 > 공통 영상", () => {
    expect(resolveVideoUrl({ videoUrl: "a", startSeconds: 0, endSeconds: null }, "b", "c")).toBe("a");
    expect(resolveVideoUrl(undefined, "b", "c")).toBe("b");
    expect(resolveVideoUrl(undefined, undefined, "c")).toBe("c");
    expect(resolveVideoUrl(undefined, undefined, undefined)).toBeUndefined();
  });

  it("분:초 문자열을 초로 변환한다", () => {
    expect(parseTimeInput("0:00")).toBe(0);
    expect(parseTimeInput("1:23")).toBe(83);
    expect(parseTimeInput("12:05.5")).toBe(725.5);
    expect(parseTimeInput("1:75")).toBeNull();
    expect(parseTimeInput("abc")).toBeNull();
    expect(parseTimeInput("")).toBeNull();
  });

  it("초를 분:초 문자열로 변환한다", () => {
    expect(formatTimeInput(0)).toBe("0:00");
    expect(formatTimeInput(83)).toBe("1:23");
    expect(formatTimeInput(725.5)).toBe("12:05.5");
    expect(formatTimeInput(null)).toBe("");
  });

  it("시작 시간이 종료 시간보다 늦거나 같으면 저장할 수 없다", () => {
    expect(validateSegment(10, 10)).not.toBeNull();
    expect(validateSegment(10, 5)).not.toBeNull();
    expect(validateSegment(10, 20)).toBeNull();
  });

  it("종료 시간이 영상 길이를 초과하면 저장할 수 없다", () => {
    expect(validateSegment(0, 100, 60)).not.toBeNull();
    expect(validateSegment(0, 50, 60)).toBeNull();
    expect(validateSegment(-1, 10)).not.toBeNull();
    expect(validateSegment(0, null)).toBeNull();
  });

  it("종료 시점 도달 여부를 판정한다", () => {
    expect(hasReachedEnd(30, 30)).toBe(true);
    expect(hasReachedEnd(29.96, 30)).toBe(true); // 0.05초 오차 허용
    expect(hasReachedEnd(29.9, 30)).toBe(false);
    expect(hasReachedEnd(999, null)).toBe(false); // 종료 미설정 = 끝까지 재생
  });

  it("저장된 구간도 케어별 영상도 없으면 영상 버튼이 없다 (공통 영상만 있어도 예외)", () => {
    const segment = { videoUrl: "https://example.com/care.mp4", startSeconds: 47, endSeconds: 65 };
    expect(hasCareVideo(segment, undefined)).toBe(true); // 관리자가 구간을 저장한 케어
    expect(hasCareVideo(undefined, "https://example.com/step.mp4")).toBe(true); // 케어별 개별 영상
    expect(hasCareVideo(undefined, undefined)).toBe(false); // 영상 미등록 케어
  });
  it("관리자가 공통 영상을 등록하면 미설정 케어도 전체 영상 재생을 제공한다", () => {
    expect(hasCareVideo(undefined, undefined, "https://example.com/common.mp4")).toBe(true);
    expect(hasCareVideo(undefined, undefined, null)).toBe(false);
  });
  it("시작 시점도 영상 길이 안에 있어야 한다", () => {
    expect(validateSegment(120, null, 118)).not.toBeNull();
    expect(validateSegment(47, 65, 118)).toBeNull();
  });
  it("개별 영상이 없는 구간은 제품 공통 URL을 사용한다", () => {
    const map = toSegmentMap([{ product_id: "hydrotower", care_service_id: "steam", video_url: "legacy", individual_video_url: null, start_seconds: 47, end_seconds: 65 }]);
    expect(resolveVideoUrl(map.steam, undefined, "common-new")).toBe("common-new");
    expect(map.steam.startSeconds).toBe(47);
    expect(map.steam.endSeconds).toBe(65);
  });
});
