import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { products } from "@/data/products";
import { getFeatureById, getFeaturesByProductId } from "@/data/features";
import { getCareProcessPlan } from "@/data/careProcess";
import { hasCareVideo } from "@/utils/careVideoSegments";
import { productCardConfig } from "@/data/featureCardConfig";

describe("hydrotower product navigation data", () => {
  it("registers the product with locally served media", () => {
    const product = products.find((item) => item.id === "hydrotower");
    expect(product).toBeDefined();
    expect(product?.heroImage).toMatch(/^\/__l5e\/assets-v1\//);
  });

  it("resolves every sequential feature ID for direct detail navigation", () => {
    const features = getFeaturesByProductId("hydrotower");
    expect(features).toHaveLength(6);
    features.forEach((feature, index) => {
      expect(feature.id).toBe(String(index + 1));
      expect(getFeatureById("hydrotower", String(index + 1))).toBe(feature);
      expect(feature.mediaUrl).toMatch(/^\/__l5e\/assets-v1\//);
    });
  });

  it("plays the official AI humidification video on the 공간 맞춤 AI가습 card", () => {
    const feature = getFeatureById("hydrotower", "2");
    expect(feature?.mediaType).toBe("video");
    expect(feature?.mediaUrl).toContain("hydrotower-space-ai-humidification.mp4");
    expect(feature?.fallbackUrl).toContain("hydrotower-space-ai-humidification.webm");
    expect(feature?.posterImage).toContain("hydrotower-space-ai-humidification-poster.jpg");
  });

  it("plays the official purified humidification video on the 4단계 정수 가습 card", () => {
    const feature = getFeatureById("hydrotower", "3");
    expect(feature?.mediaType).toBe("video");
    expect(feature?.mediaUrl).toContain("hydrotower-purified-humidification.mp4");
    expect(feature?.fallbackUrl).toContain("hydrotower-purified-humidification.webm");
    expect(feature?.posterImage).toContain("hydrotower-purified-humidification-poster.jpg");
  });

  it("provides two independent hygiene videos on feature 4", () => {
    const feature = getFeatureById("hydrotower", "4");
    expect(feature?.tabs).toHaveLength(2);
    const [recovery, drying] = feature?.tabs ?? [];
    expect(recovery?.mediaType).toBe("video");
    expect(recovery?.mediaUrl).toContain("hydrotower-residual-water-recovery.mp4");
    expect(recovery?.fallbackUrl).toContain("hydrotower-residual-water-recovery.webm");
    expect(drying?.mediaType).toBe("video");
    expect(drying?.mediaUrl).toContain("hydrotower-air-path-drying.mp4");
    expect(drying?.fallbackUrl).toContain("hydrotower-air-path-drying.webm");
    expect(feature?.mediaUrl).toBe(recovery?.mediaUrl);
  });

  it("shows the V2 filter image inside the shared card frame", () => {
    const feature = getFeatureById("hydrotower", "5");
    expect(feature?.mediaType).toBe("image");
    expect(feature?.mediaUrl).toContain("hydrotower-filter.jpg");
    expect(feature?.imageFit).toBe("contain");
  });

  it("compares three official air care lineups with aligned spec labels", () => {
    const feature = getFeatureById("hydrotower", "6");
    expect(feature?.mediaType).toBe("table");
    expect(feature?.tag).toBe("라인업 비교");
    const tableData = feature?.tableData ?? [];
    expect(tableData).toHaveLength(3);
    expect(tableData.map((product) => product.name)).toEqual([
      "하이드로타워 Max",
      "하이드로타워",
      "AI 360˚ 공기청정기 M7",
    ]);
    const labels = tableData[0].specs.map((spec) => spec.label);
    expect(labels).toContain("대표 모델명");
    expect(labels).toContain("최대 가습량");
    expect(labels).toContain("청정 사용 면적");
    tableData.forEach((product) => {
      expect(product.specs.map((spec) => spec.label)).toEqual(labels);
    });
    const byName = (name: string) => tableData.find((product) => product.name === name);
    expect(byName("AI 360˚ 공기청정기 M7")?.specs.find((s) => s.label === "대표 모델명")?.values).toEqual(["AS356NSMA"]);
    expect(byName("하이드로타워 Max")?.specs.find((s) => s.label === "최대 가습량")?.values).toEqual(["850 cc/hr"]);
    expect(byName("하이드로타워")?.specs.find((s) => s.label === "대표 모델명")?.values).toEqual(["HY706RSUA"]);
  });

  it.each([
    ["청정 사용 면적", "AI 360˚ 공기청정기 M7", "114.0㎡"],
    ["에너지소비효율등급", "AI 360˚ 공기청정기 M7", "2등급"],
    ["최대 가습량", "하이드로타워 Max", "850 cc/hr"],
    ["가습모드", "하이드로타워 Max", "AI가습"],
    ["무드등", "하이드로타워 Max", "테마무드 3종 + 컬러 12종"],
    ["이동성", "하이드로타워 Max", "히든휠 내장"],
    ["무게 (kg)", "하이드로타워", "18.7"],
  ])("marks only the explicit advantage for %s", (label, winner, value) => {
    const products = getFeatureById("hydrotower", "6")?.tableData ?? [];
    const highlighted = products.filter((product) => product.specs.find((spec) => spec.label === label)?.highlighted);
    expect(highlighted.map((product) => product.name)).toEqual([winner]);
    expect(highlighted[0]?.specs.find((spec) => spec.label === label)?.values).toContain(value);
  });

  it("does not mark subjective differences or equal capacities as advantages", () => {
    const products = getFeatureById("hydrotower", "6")?.tableData ?? [];
    for (const label of ["색상", "필터", "AI 인증", "물통 (용량/만수용량)", "크기 (mm)"]) {
      expect(products.some((product) => product.specs.find((spec) => spec.label === label)?.highlighted)).toBe(false);
    }
  });

  it("keeps product type out of the rows, drops the footer notes, and keeps categories", () => {
    const feature = getFeatureById("hydrotower", "6");
    const products = feature?.tableData ?? [];
    expect(products.some((product) => product.specs.some((spec) => spec.label === "제품 유형"))).toBe(false);
    expect(feature?.disclaimers ?? []).toHaveLength(0);
    expect(feature?.description).toBe("");
    expect(feature?.highlights ?? []).toHaveLength(0);
    expect(products.map((product) => product.category)).toEqual(["가습 공기청정기", "정수 가습기", "공기청정기"]);
  });

  it("marks only the Hydro Tower Max as the recommended BEST lineup", () => {
    const lineup = getFeatureById("hydrotower", "6")?.tableData ?? [];
    expect(lineup.map((product) => product.name)).toEqual(["하이드로타워 Max", "하이드로타워", "AI 360˚ 공기청정기 M7"]);
    expect(lineup.map((product) => product.best)).toEqual([true, undefined, undefined]);
  });

  it("keeps the recommended situation copy short and uniform across the three lineups", () => {
    const lineup = getFeatureById("hydrotower", "6")?.tableData ?? [];
    const recommended = (name: string) =>
      lineup.find((product) => product.name === name)?.specs.find((spec) => spec.label === "추천 상황")?.values;
    expect(recommended("하이드로타워 Max")).toEqual(["넓은 거실부터 침실까지", "공기청정과 가습을 함께 관리하고 싶은 경우"]);
    expect(recommended("하이드로타워")).toEqual(["침실이나 안방 등에서", "깨끗한 물로 습도를 관리하고 싶은 경우"]);
    expect(recommended("AI 360˚ 공기청정기 M7")).toEqual(["넓은 거실 등에서", "미세먼지와 유해가스까지 관리하고 싶은 경우"]);
    lineup.forEach((product) => {
      const spec = product.specs.find((item) => item.label === "추천 상황");
      expect(spec?.values).toHaveLength(2);
      expect(spec?.emphasizeFirst).toBe(true);
    });
  });

  it("moves the weight and size units into the row labels and keeps the numbers unchanged", () => {
    const lineup = getFeatureById("hydrotower", "6")?.tableData ?? [];
    const specOf = (name: string, label: string) =>
      lineup.find((product) => product.name === name)?.specs.find((spec) => spec.label === label);

    expect(
      lineup.some((product) =>
        product.specs.some((spec) => spec.label === "무게" || spec.label === "제품 크기 (WxHxD)" || spec.label === "제품 크기 (W×H×D, mm)")
      )
    ).toBe(false);


    lineup.forEach((product) => {
      const weight = product.specs.find((spec) => spec.label === "무게 (kg)");
      const size = product.specs.find((spec) => spec.label === "크기 (mm)");
      expect(weight?.values).toHaveLength(1);
      expect(weight?.values[0]).toMatch(/^\d+(?:\.\d+)?$/);
      expect(size?.values).toHaveLength(1);
      expect(size?.values[0]).not.toMatch(/mm/);
      expect(size?.compact).toBe(true);
      expect(weight?.compact).toBe(true);
    });

    expect(specOf("하이드로타워 Max", "무게 (kg)")?.values).toEqual(["21.2"]);
    expect(specOf("하이드로타워", "무게 (kg)")?.values).toEqual(["18.7"]);
    expect(specOf("AI 360˚ 공기청정기 M7", "무게 (kg)")?.values).toEqual(["20.6"]);
    expect(specOf("하이드로타워 Max", "크기 (mm)")?.values).toEqual(["388(310) × 1,088 × 388(310)"]);
    expect(specOf("하이드로타워", "크기 (mm)")?.values).toEqual(["310 × 986 × 310"]);
    expect(specOf("AI 360˚ 공기청정기 M7", "크기 (mm)")?.values).toEqual(["377 × 1,100 × 377"]);
  });

  it("explains the size order through an info hint on the compact size label", () => {
    const lineup = getFeatureById("hydrotower", "6")?.tableData ?? [];
    expect(lineup).toHaveLength(3);
    lineup.forEach((product) => {
      expect(product.specs.find((spec) => spec.label === "크기 (mm)")?.hint).toBe("가로 × 높이 × 깊이");
      expect(product.specs.find((spec) => spec.label === "무게 (kg)")?.hint).toBeUndefined();
    });
  });




  it("shows the lineup comparison headline and lead copy", () => {
    const feature = getFeatureById("hydrotower", "6");
    expect(feature?.title).toBe("우리집엔 어떤\n에어케어 제품이 맞을까?");
    expect(feature?.subtitle).toBe("하이드로타워 Max, 하이드로타워, 360˚공기청정기 M7의\n차이를 한눈에 비교해보세요.");
  });


  it("shows the subscription care card first and no removed cards", () => {
    const features = getFeaturesByProductId("hydrotower");
    expect(features[0].tag).toBe("가전 구독");
    const tags = features.map((feature) => feature.tag);
    expect(tags).not.toContain("사계절 공기 케어");
    expect(tags).not.toContain("맞춤 가습 모드");
    expect(tags).not.toContain("편의 기능·오브제 디자인");
  });
});

describe("hydrotower care service copy", () => {
  const plan = getCareProcessPlan("hydrotower");

  it("uses the approved detail line for each care service", () => {
    const byId = (id: string) => plan?.careServices.find((step) => step.careServiceId === id);
    expect(byId("steam")?.description).toBe("스팀 살균으로 세균 99.999% 제거");
    expect(byId("water-filter")?.description).toBe("고객 선택 주기에 정수필터 무상 교체");
    expect(byId("air-filter")?.description).toBe("12개월마다 공기청정필터 무상 교체");
  });

  it("keeps every care service name and benefit title in the official order", () => {
    expect(plan?.careServices.map((step) => step.careServiceName)).toEqual([
      "분해 케어",
      "위생 케어(스팀)",
      "위생 케어(UV)",
      "정수필터 교체",
      "공기청정필터 교체",
      "가습부 클리닝",
      "급수부 클리닝",
    ]);
    expect(plan?.careServices.map((step) => step.displayOrder)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});

describe("hydrotower lineup comparison card thumbnail", () => {
  const card = productCardConfig.hydrotower?.cards?.["6"];

  it("fills the card frame by zooming in, cropping only the sides", () => {
    expect(card?.image).toBe(
      "/__l5e/assets-v1/22791ec0-c21f-4a67-a696-3fe9c20dddc4/hydrotower-lineup-thumb.webp"
    );
    expect(card?.fit).toBe("cover");
    expect(card?.objectPositionClass).toBe("object-center");
  });

  it("serves that thumbnail from a locally stored asset pointer", () => {
    const pointer = JSON.parse(
      readFileSync("src/assets/hydrotower-lineup-thumb.webp.asset.json", "utf8")
    );
    expect(pointer.url).toBe(card?.image);
    expect(pointer.content_type).toBe("image/webp");
  });
});

describe("hydrotower care video availability", () => {
  const plan = getCareProcessPlan("hydrotower");

  it("정수필터 교체·가습부 클리닝·급수부 클리닝은 영상 미등록이라 영상 버튼 대상이 아니다", () => {
    const noVideoIds = ["water-filter", "humidifier-cleaning", "supply-cleaning"];
    for (const id of noVideoIds) {
      const step = plan?.careServices.find((s) => s.careServiceId === id);
      expect(step).toBeDefined();
      expect(step?.videoUrl).toBeUndefined();
      expect(hasCareVideo(undefined, step?.videoUrl)).toBe(false);
    }
  });

  it("구간이 저장된 케어(분해·스팀·UV·공기청정필터)는 영상 버튼이 표시된다", () => {
    const savedIds = ["disassembly", "steam", "uv", "air-filter"];
    for (const id of savedIds) {
      const step = plan?.careServices.find((s) => s.careServiceId === id);
      expect(hasCareVideo({ videoUrl: plan?.commonVideoUrl, startSeconds: 0, endSeconds: null }, step?.videoUrl)).toBe(true);
    }
  });
});