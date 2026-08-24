# View Kit 디자인 가이드 (전 제품군 공통)

청소로봇 상세페이지에서 확정된 규칙입니다. 냉장고·에어컨·워시타워·워시콤보·TV·의류관리기·바스에어시스템 등 **모든 제품군에 동일하게 적용**합니다.
새 제품을 추가할 때는 데이터(`src/data/products.ts`, `src/data/features.ts`)만 넣으면 이 디자인이 자동으로 적용됩니다.

## 1. 컬러

| 용도 | 값 / 토큰 |
| --- | --- |
| 페이지 배경 | `#F3F4F6` (연회색) |
| 카드 배경 | `white` |
| 포인트(레드) | `brand-accent` = `hsl(1 98% 59%)` |
| 제목 텍스트 | `gray-900` |
| 본문 텍스트 | `gray-600` / `gray-700` |
| 보조·주석 | `muted-foreground` |
| 구분선 | `gray-200` |
| 탭 강조 | `--tab-accent` (레드와 동일) |

- 컬러는 항상 토큰(`brand-accent`, `muted-foreground` 등)으로 사용합니다. `text-white`, `bg-[#...]` 같은 하드코딩은 금지(카드 위 텍스트 예외 없음).
- 보라색 계열(구버전 `#7842F5`, `#534AB7`)은 사용하지 않습니다.

## 2. 타이포그래피

- 폰트: Noto Sans KR, 자간 `tracking-[-0.02em]`
- 한글 줄바꿈: `word-break: keep-all`, `overflow-wrap: break-word`
- 크기 기준 (모바일 / sm 이상)

| 요소 | 크기 |
| --- | --- |
| 제품명(히어로 h1) | 30px / 38px, `font-semibold` |
| 히어로 한 줄 설명 | 13px / 15px, `font-semibold`, `gray-700` |
| 섹션 타이틀 | 17px / 20px, `font-semibold` |
| 상세 헤드(h1) | 26px / 32px, `font-bold` |
| 상세 서브카피 | 15px / 17px, `gray-600` |
| 카드 헤드카피 | 17px / 18px, `font-bold` |
| 아이브로우 라벨 | 12px(카드) · 13px(상세), `font-bold`, 레드 |
| 카드/본문 설명 | 15px, `leading-relaxed` |
| 디스클레이머 | 11px, `muted-foreground` |

## 3. 레이아웃

- 콘텐츠 폭·좌우 여백은 **항상 `PageContainer`** 를 사용합니다. 페이지별로 폭을 따로 지정하지 않습니다.
  - `max-w-xl` / `sm:max-w-4xl` / `lg:max-w-6xl`, 좌우 `px-5 sm:px-8`, 상하 `py-6 sm:py-8`
- 스탠바이미(9:16 세로) 기준으로 목록 페이지가 스크롤 없이 한 화면에 들어오는 것을 우선합니다.
- 상단 바: 좌측 `BackButton`, 우측 `OrientationToggle`(세로모드/가로모드 알약 버튼).

## 4. 제품 상세(특장점 목록) 페이지 — `src/pages/Home.tsx`

1. **히어로 카드**: 흰 카드(radius 14px, shadow `0 1px 3px rgba(0,0,0,.06)`)
   - 좌측: `VIEW KIT` 라벨(11px, uppercase, `tracking-[0.18em]`, `gray-500`) → 제품명 → 한 줄 설명
   - 우측: 제품컷 이미지 `h-[130px] sm:h-[180px]`, `object-contain`, `max-w-[55%]`
   - 제품컷은 `products.ts`의 `heroImage`(없으면 `keyVisualImage`)를 사용합니다. 누끼컷이 있으면 `heroImage`에 지정하세요.
2. **키비주얼 영상**(`keyVisualVideo`가 있을 때만): `WebOSVideoPlayer`, radius 14px 흰 카드.
3. **섹션 타이틀**: 좌우 헤어라인(`h-px bg-gray-200`) + 중앙 문구 "궁금한 내용을 확인해보세요".
4. **특장점 카드 그리드** (`ProductFeatureGrid`)
   - 그리드: `grid-cols-2`, `sm:grid-cols-3`, `lg:grid-cols-3`, gap `16→20→24px`
   - 카드: 흰 배경, radius 12px, shadow 2단(`0 1px 3px / 0 1px 2px`), `active:scale-[0.98]`
   - 이미지: 4:3 `object-cover` (필요 시 `objectPositionClass`로 크롭 위치 조정)
   - 우상단: 좋아요 필(반투명 흰 배경 + 회색 아웃라인 하트 + 카운트 11px)
   - 텍스트: 아이브로우(레드) → 헤드카피(질문형)
   - 재생 버튼: **영상 소스(video/youtube)가 있는 카드에만** 헤드카피 우측에 레드 원형 버튼(32px)
   - 카드 클릭 시 팝업 없이 바로 상세 페이지로 이동
5. **하단**: "다른 제품 보기" 알약 버튼(흰 배경 + 테두리).

제품별 카드 이미지·아이브로우·노출 순서·기본 좋아요 수는 `src/data/featureCardConfig.ts`에서 관리합니다.
설정이 없으면 특장점 데이터에서 자동 유추합니다(이미지 = `mediaUrl`/갤러리 첫 장/제품 키비주얼, 아이브로우 = `feature.tag`).

## 5. 특장점 상세 페이지 — `src/pages/FeatureDetail.tsx`

렌더 순서(데이터가 있는 블록만 노출):

1. 상단 바(BackButton + OrientationToggle)
2. **헤드 영역**: 회색 라운드 아이콘 배지(56/64px, `bg-gray-200/70`) + 아이브로우(레드) + 헤드카피 + 서브카피, 아래 `border-b border-gray-200` 구분선. 흰 카드 배경 없이 회색 페이지 배경 위에 직접 배치.
3. **선택 탭**(`FeatureTabs`, 강조색 레드, 4개 이상이면 스크롤)
4. **메인 미디어**
   - 이미지: `BlurMediaFrame` — 확대·블러 배경 + 원본 `object-contain`. 비율 `aspect-[4/3] sm:aspect-[16/10]`, radius 14px(바깥 카드와 동일해 이중 모서리 없음)
   - 영상/유튜브/표/갤러리: `MediaViewer`를 흰 카드(radius 14px) 안에 배치
   - 구독 케어 섹션이 있는 특장점은 상단 메인 미디어를 생략(이미지 중복 방지)
5. 인증 마크 등 하단 이미지 → 클릭 시 라이트박스 확대
6. 미디어 갤러리(4 + 3 그리드, 각 이미지 `BlurMediaFrame`)
7. 구독 케어 인터랙티브 섹션(좌 설명 + 우 알약형 목록, 선택 항목 레드)
8. 설명 카드(흰 카드, radius 14px, `whitespace-pre-line`으로 `\n` 유지)
9. 세부 기능 아코디언(스텝 배지 = 회색 필 + 레드 텍스트)
10. 적용 코스 캐러셀(좌우 화살표 + 레드 도트)
11. **핵심만 쏙**: 흰 카드 + 2열 그리드, 항목은 `bg-gray-50` 라운드 + 레드 체크 아이콘 + 15.4px 텍스트
12. 디스클레이머: 일반 주석은 `* 텍스트`(11px), 상세 시험 데이터는 "세부정보" 토글 아코디언
13. 하단 CTA: 레드 버튼 "← 전체 특장점으로 돌아가기"

## 6. 이미지 규칙

- 잘림이 문제되는 큰 이미지·비율이 다른 이미지는 `BlurMediaFrame`(블러 확장 배경 + contain)을 사용합니다.
- 카드 썸네일만 `object-cover`를 사용하고, 핵심 요소가 잘리면 `object-position`으로 보정합니다(예: 상단 로고가 있으면 `object-[center_20%]`).
- 외부 이미지는 항상 `SafeImage`로 렌더합니다(폴백·지연 로딩 포함).
- GIF 금지. 영상은 WebM/MP4 또는 YouTube. 20MB 초과 파일은 클라우드 스토리지(`store-videos`) 사용.

## 7. 문구 톤

- 카드 헤드카피는 질문형("~할까요?"), 아이브로우는 기능 명칭(예: 스팀 물걸레, 강력한 흡입력).
- 고정 문구: "궁금한 내용을 확인해보세요", "핵심만 쏙", "세부정보", "설명 더보기", "다른 제품 보기".
- 용어: 로봇청소기 → **청소로봇**, 히든 스테이션 → **히든스테이션**(붙여쓰기).
