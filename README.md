# VIEW KIT

> LG 가전 제품을 매장 키오스크 환경에서 효과적으로 소개하기 위한 인터랙티브 웹 앱

**Live**: https://viewkit.lovable.app
**Lovable Project**: https://lovable.dev/projects/c29ebf32-471f-4991-a656-57585c8d8b56

---

## 📌 앱 소개

**VIEW KIT**은 LG전자 매장에 설치된 **9:16 세로형 터치 디스플레이(스탠바이미 등)** 환경에 최적화된 제품 소개 키오스크 앱입니다.
고객이 직접 화면을 터치하며 제품의 핵심 특장점, 비교 스펙, 케어 서비스, 사용 영상 등을 둘러볼 수 있도록 설계되었습니다.

### 주요 목적
- 🛍 **매장 내 셀프 체험** — 판매 직원의 도움 없이도 고객이 제품 정보를 직관적으로 탐색
- 📱 **세로형 디스플레이 최적화** — 9:16 터치 스크린을 우선 고려하되, 모바일·태블릿·데스크톱까지 완벽 반응형
- 🎬 **풍부한 멀티미디어** — 영상, 갤러리, 비교표를 활용한 시각적 제품 소개
- 🔄 **콘텐츠 중앙 관리** — 제품·특장점·구독 정보를 코드 한 곳에서 손쉽게 갱신

---

## 🗂 콘텐츠 구성

앱은 **3-Level 네비게이션** 구조로 이루어집니다.

```
제품 선택 (/)
   └─ 제품 홈 (/product/:productId)
        ├─ 특장점 상세 (/product/:productId/feature/:id)
        └─ 운영 매뉴얼 (/product/:productId/manual)
구독 케어 서비스 (/subscription)
```

### 1. 제품 선택 화면 (`/`)
8개 LG 제품군을 카드 그리드로 노출. 현재 활성화된 제품만 컬러로 표시되고 비활성 제품은 흑백 처리됩니다.

| 제품 | ID |
|------|-----|
| TV | `tv` |
| 냉장고 (DIOS STEM) | `refrigerator` |
| 의류관리기 (스타일러) | `styler` |
| 워시타워 | `washer` |
| 청소기 | `vacuum` |
| 휘센 에어컨 | `airconditioner` |
| PC | `pc` |
| 식기세척기 | `cooking` |

### 2. 제품 홈 (`/product/:productId`)
선택한 제품의 키비주얼과 특장점 카드 리스트를 보여줍니다. 우측 상단에는 운영 매뉴얼로 이동하는 도움말 아이콘이 있습니다.

### 3. 특장점 상세 (`/product/:productId/feature/:id`)
다양한 미디어 타입을 지원합니다.
- **video** — 자체 호스팅 영상 (WebM/MP4)
- **youtube** — YouTube 임베드 (Shorts 자동 9:16 처리)
- **image / gallery** — 이미지 및 캡션이 포함된 갤러리
- **table** — 모델 간 스펙 비교표 (고유값 하이라이트)

각 상세 화면은 핵심 설명 + 하이라이트 + 일반 디스클레이머 + 접이식 기술 디스클레이머로 구성됩니다.

### 4. 구독 케어 서비스 (`/subscription`)
LG 가전 구독 모델의 케어 단계를 인터랙티브하게 안내합니다.
- 제품별 케어 스텝 카드 (예: 기계실 세척, 유로 세척, 워터필터 교체, 무상 철거 및 재설치 등)
- 케어 영상 재생
- 항목별 디스클레이머 팝업

### 5. 운영 매뉴얼 (`/manual`)
매장 운영자가 앱 사용법을 빠르게 확인할 수 있는 안내 페이지.

---

## 🧰 기술 스택

- **React 18 + TypeScript 5 + Vite 5**
- **Tailwind CSS v3** + shadcn/ui 컴포넌트
- **React Router** — SPA 라우팅
- **Lovable Cloud (Supabase)** — 20MB 초과 영상 호스팅 (`store-videos` 버킷)
- **Google Analytics 4** — 사용자 인터랙션 추적
- **Noto Sans KR** — 한글 자연스러운 줄바꿈(`word-break: keep-all`) 적용

### 미디어 호환성
- WebOS / 스탠바이미 환경을 위한 **WebOSVideoPlayer** 컴포넌트 (MIME 자동 보정)
- LG 서버 영상 CORS 우회를 위한 **Supabase Edge Function 비디오 프록시**
- 영상 디버그 모드: URL에 `?videoDebug=1` 추가

---

## 📁 프로젝트 구조

```
src/
├── pages/              # 라우트별 페이지 (ProductSelection, Home, FeatureDetail, Subscription, Manual)
├── components/         # 재사용 UI 및 미디어 플레이어
├── data/
│   ├── products.ts     # 제품 메타데이터
│   └── features.ts     # 제품별 특장점 콘텐츠
├── hooks/              # useOrientation, useAnalytics, useVideoDebug 등
├── integrations/       # Supabase 클라이언트
└── utils/              # 비디오 유틸
```

---

## 🚀 로컬 개발

```sh
npm install
npm run dev
```

Node.js 설치 추천: [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

---

## 🛠 운영 가이드

### 제품 활성화/비활성화
`src/pages/ProductSelection.tsx`에서 제어합니다.

```tsx
// 냉장고만 활성화 (현재 기본값)
const isEnabled = product.id === "refrigerator";

// 모든 제품 활성화
const isEnabled = true;

// 특정 제품만 활성화
const enabledProducts = ["refrigerator", "tv", "styler"];
const isEnabled = enabledProducts.includes(product.id);
```

### 콘텐츠 수정
- **제품 추가/수정** → `src/data/products.ts`
- **특장점 추가/수정** → `src/data/features.ts`
- **구독 케어 콘텐츠** → `src/pages/Subscription.tsx`

---

## 🌐 배포

Lovable에서 **Share → Publish** 클릭 시 즉시 배포됩니다.
커스텀 도메인은 **Project → Settings → Domains**에서 연결할 수 있습니다.
([상세 가이드](https://docs.lovable.dev/features/custom-domain#custom-domain))

---

## 📄 라이선스

© LG Electronics — 매장 운영용 내부 프로젝트
