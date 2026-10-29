import { describe, expect, it } from "vitest";
import { stylerFeatures } from "@/data/stylerFeatures";
import { products } from "@/data/products";
import { productCardConfig } from "@/data/featureCardConfig";
import header from "@/assets/styler-sc5gmr80s-header.png.asset.json";

describe("SC5GMR80S 공식 자료 연결", () => {
  it("지정한 medium11 제품컷을 상단에 사용한다", () => {
    expect(products.find((p) => p.id === "styler")?.heroImage).toBe(header.url);
  });
  it("모든 상세와 탭 미디어는 등록된 공식 자료를 사용한다", () => {
    const urls = stylerFeatures.flatMap((f) => [f.mediaUrl, ...(f.tabs?.map((t) => t.mediaUrl) ?? [])]);
    expect(urls.length).toBeGreaterThan(9);
    for (const url of urls) expect(url).toMatch(/^\/__l5e\/assets-v1\//);
  });
  it("모든 영상에 로딩 전 사진이 제공된다", () => {
    const videos = stylerFeatures.filter((f) => f.mediaType === "video");
    expect(videos.length).toBe(8);
    for (const f of videos) expect(f.posterImage).toMatch(/^\/__l5e\/assets-v1\//);
  });
});