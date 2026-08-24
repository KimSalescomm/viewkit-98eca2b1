# 청소로봇 디자인가이드 정리 + 전 제품군 확대 적용

청소로봇(`/product/vacuum`)에만 적용된 신규 디자인을 문서로 정리하고, 냉장고·에어컨·워시타워 등 모든 제품군에 동일하게 적용합니다. 데이터(특장점 문구, 탭, 영상, 이미지)는 전혀 손대지 않고 표현 계층만 통일합니다.

## 현재 상태

- 목록 페이지(`src/pages/Home.tsx`)는 `isSample = productId === "vacuum"` 분기로 신규 히어로/그리드를, 나머지 제품은 구버전 히어로(대형 키비주얼 + FEATURES 타이틀 + 기존 카드)를 렌더링합니다.
- 상세 페이지(`src/pages/FeatureDetail.tsx`)도 `isVacuumSample`일 때만 `VacuumSampleLayout`을 사용합니다.
- 카드 그리드는 `VacuumFeatureGrid.tsx` 내부에 청소로봇 전용 카드 이미지·아이브로우가 하드코딩되어 있어 그대로는 다른 제품에 쓸 수 없습니다.

## 1) 디자인가이드 문서 작성

`docs/design-guide.md`(신규)에 다음 규칙을 정리합니다. 코드 값 기준으로 그대로 적어 재현 가능하게 합니다.

- 컬러: 배경 `#F3F4F6`, 카드 `white`, 포인트 = `brand-accent`(LG 레드), 본문 `gray-900`, 보조 `gray-600`, 구분선 `gray-200`. 하드코딩 색상 금지, 토큰 사용.
- 타이포: Noto Sans KR, `tracking-[-0.02em]`, 제품명 30/38px, 상세 헤드 26/32px, 카드 헤드 17/18px, 아이브로우 12~13px bold 레드, 서브카피 13/15px.
- 레이아웃: `PageContainer` 단일 규격(max-w-xl / sm:4xl / lg:6xl, px-5 sm:px-8), 스탠바이미 세로 기준 한 화면 노출.
- 히어로: 좌측 VIEW KIT 라벨 + 제품명 + 한 줄 설명, 우측 제품 누끼 이미지(높이 130/180px), 흰 카드 radius 14px, 그림자 `0 1px 3px rgba(0,0,0,.06)`.
- 섹션 타이틀: 좌우 헤어라인 + 중앙 "궁금한 내용을 확인해보세요".
- USP 카드: 4:3 실사 이미지 + 우상단 좋아요 필(하트+숫자) + 아이브로우(레드) + 헤드카피 + 영상 소스가 있을 때만 레드 재생 버튼. radius 12px, `active:scale-[0.98]`, 그리드 2열 / sm·lg 3열.
- 상세 페이지: 아이콘 배지(56/64px, 회색 라운드) + 아이브로우 + 헤드 + 서브카피, 하단 구분선, 탭은 `FeatureTabs`(accent 레드), 미디어는 `BlurMediaFrame`(확대 블러 배경 + contain), 핵심만 쏙 체크리스트(레드 체크), CTA 레드 버튼.
- 이미지 규칙: 잘림 방지는 `BlurMediaFrame`, 카드 썸네일만 `object-cover`(필요 시 `object-position` 조정).

## 2) 코드 확대 적용

- `VacuumFeatureGrid.tsx` → `ProductFeatureGrid.tsx`로 일반화: 카드 이미지/아이브로우 하드코딩을 제품별 설정 맵(`src/data/featureCardConfig.ts`)으로 분리하고, 설정이 없으면 각 feature의 기존 `imageUrl`/`mediaUrl`·`tag`를 폴백으로 사용. 청소로봇 설정은 현재 값 그대로 이관.
- `Home.tsx`: `isSample` 분기를 제거하고 모든 제품이 신규 히어로 + 새 그리드를 사용. 히어로 이미지는 하드코딩된 청소로봇 URL 대신 `product.heroCutout ?? product.keyVisualImage` 사용. 키비주얼 영상이 있는 제품은 히어로 아래 기존 위치에 유지.
- `FeatureDetail.tsx`: `isVacuumSample` 분기를 제거하고 `VacuumSampleLayout`을 `FeatureDetailLayout`으로 승격해 모든 제품에 적용. 레거시 레이아웃에만 있던 렌더 케이스(비교 테이블, 갤러리, 캐러셀, 구독 케어, 디스클레이머/아코디언, scOnly 등)는 전부 새 레이아웃 안에서 렌더되도록 이관 — 누락 시 데이터 유실로 보이므로 제품별로 실제 화면 확인.
- 제품별 확인 대상: 냉장고, 에어컨, 워시타워, 워시콤보, 바스에어시스템, TV, 광파오븐, 세탁기, 식기세척기, 가전구독.

## 3) 검증

Playwright로 각 제품 목록 + 특장점 상세 페이지를 세로/가로 모드로 캡처하여 탭·영상·비교표·갤러리가 모두 살아 있는지, 스탠바이미 세로에서 한 화면에 들어오는지 확인합니다.

## 기술 메모

데이터 파일(`src/data/features.ts`, `products.ts`)은 읽기만 하고 수정하지 않습니다. 제품별 카드 이미지/아이브로우만 신규 설정 파일에 추가되며, 설정이 없는 제품도 폴백으로 정상 렌더됩니다.
