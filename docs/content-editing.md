# VIEW KIT 문구 수정 경로

## 제품 카드와 상세 페이지

제품별 카드 문구를 각 파일로 분리했습니다. `src/data/features.ts`는 파일을 연결하는 공통 목록이므로 일반 문구 수정 시 편집하지 않아도 됩니다.

| 제품 | 편집 파일 |
| --- | --- |
| 하이드로타워 | `src/data/hydrotowerFeatures.ts` |
| 바스에어시스템 | `src/data/bathairFeatures.ts` |
| 바스에어 모델 비교표 | `src/data/bathairLineupFeatures.ts` |
| 워시타워 | `src/data/washtowerFeatures.ts` |
| 워시콤보 | `src/data/washcomboFeatures.ts` |
| 냉장고 | `src/data/refrigeratorFeatures.ts` |
| TV | `src/data/tvFeatures.ts` |
| 스타일러 | `src/data/stylerFeatures.ts` |
| 에어컨 | `src/data/airconditionerFeatures.ts` |
| 청소로봇 | `src/data/vacuumFeatures.ts` |
| PC | `src/data/pcFeatures.ts` |
| 쿠킹 | `src/data/cookingFeatures.ts` |

### 어떤 항목을 수정하나요?

- `title`: 카드의 큰 질문형 제목, 상세 페이지 제목
- `subtitle`: 제목 아래 부제
- `tag`: 기능명 라벨 (`featureCardConfig.ts`에 `eyebrow`가 지정된 카드는 해당 값이 우선)
- `descriptionTitle`, `description`: 상세 설명 제목과 본문
- `highlights`: ‘핵심만 쏙’ 목록
- `tabs`: 탭 이름(`label`)과 탭별 설명(`description`)
- `galleryImages`, `mediaGallery`: 이미지별 제목과 설명
- `tableData`: 모델 비교표의 제품명·항목명·값
- `disclaimers`, `collapsibleDisclaimers`, `mediaDisclaimers`, `mediaCollapsibleDisclaimers`: 유의사항

찾으려는 카드의 현재 제목이나 `id`로 파일 안에서 검색하세요. 예: `/product/washcombo/feature/7`은 `washcomboFeatures.ts`의 `id: "7"`입니다. 워시타워 주소의 제품 ID는 `ai-washtower`이고 문구 파일명은 `washtowerFeatures.ts`입니다.

```ts
title: "워시콤보를 구독하면\n무엇이 좋을까요?",
subtitle: "가전 케어 매니저가 보이지 않는 부분까지 꼼꼼하게 관리해줘요.",
```

`\n`은 줄바꿈입니다. 따옴표와 쉼표는 유지하고 따옴표 안의 문구만 바꾸세요. 문구 수정 시 `id`, 제품 ID, 케어 항목 ID는 바꾸지 마세요. 기존 영상 구간과 좋아요·조회수의 연결에 사용됩니다.

## 구독·케어 및 기타 문구

| 수정 대상 | 편집 경로 / 항목 |
| --- | --- |
| 하이드로타워 사진·영상 케어 설명 | `src/data/careProcess.ts` — `title`, `subtitle`, `careServices`의 `careServiceName`, `benefitText`, `description`, `disclaimers` |
| `/subscription` 제품별 케어 내용 | `src/data/subscriptionCare.ts` — 제품 `id`로 검색, `careSteps`의 `label`, `description`, `notes`, `disclaimer` |
| 세탁기 프리미엄·라이트플러스 | `src/data/subscriptionCare.ts` — `washerPlanContents` |
| 에어컨 프리미엄·라이트플러스 | `src/data/subscriptionCare.ts` — `airconPlanContents` |
| 제품 이름·제품 페이지 소개 | `src/data/products.ts` — `name`, `title` 등 |
| 카드의 작은 레드 라벨·썸네일·노출 순서 | `src/data/featureCardConfig.ts` — `eyebrow`, `image`, `order` |

하이드로타워 가전 구독 **카드 제목**은 `hydrotowerFeatures.ts`, 해당 카드 안의 **케어 항목 설명**은 `careProcess.ts`에서 수정합니다. 서로 다른 화면 문구이므로 둘을 구분해서 편집하세요.

## 변경 내용 확인

- SC 미리보기는 코드 문구를 표시합니다.
- 일반 매장 계정은 관리자에서 마지막으로 게시한 콘텐츠를 표시합니다. 코드 수정만으로 저장된 게시 콘텐츠가 바뀌지는 않습니다.
- 공개 앱의 코드 변경은 Lovable의 Publish → Update로 반영하고, 일반 매장용 콘텐츠는 관리자 콘텐츠 게시도 진행하세요.

이번 정리는 파일 위치만 변경했으며 기존 문구·수치·이미지·영상·카드 ID·순서·화면 디자인은 유지했습니다.