# 구독 페이지 탭 클릭 트래킹

## 현재 상태
`/subscription` 페이지에서 세탁기/청소로봇/스타일러 등 제품 탭 전환은 `setSelectedId`만 호출하고, GA4/Supabase 어디에도 이벤트가 남지 않습니다. 지금은 어느 탭이 가장 많이 눌렸는지 확인할 방법이 없습니다. (참고: 30초 무동작 시 자동 회전 로직도 있어, 트래킹 시 사용자 클릭과 자동 회전을 구분해야 합니다.)

## 목표
- 구독 페이지의 제품 탭 클릭을 수집하고, 관리자 대시보드에서 순위로 확인할 수 있게 한다.

## 구현 방향

### 1) 클릭 이벤트 수집 (`src/pages/Subscription.tsx`)
- 제품 탭 버튼의 `onClick`에서 새 핸들러 `handleTabClick(productId)` 호출.
  - `setSelectedId` 실행
  - `useAnalyticsContext().trackEvent('subscription_tab_click', { product_id, product_name, store_id })` (GA4)
  - 기존 `feature_reactions` 테이블에 재사용해 기록:
    - `store_slug`, `store_name`: 현재 매장
    - `product_id`: `subscription`
    - `product_name`: `구독 케어`
    - `feature_id`: `tab_${productId}` (예: `tab_washer`)
    - `feature_title`: 해당 제품명 (예: `세탁기`)
    - `session_id`: 기존 유틸 재사용
- 자동 회전(`advance`)은 트래킹하지 않음 (사용자 의도 아님).
- 페이지 최초 진입 시 기본 탭(`washer`)은 트래킹하지 않고, 실제 클릭만 카운트.

### 2) 관리자 대시보드 표시 (`src/components/admin/FeaturePreferenceSection.tsx`)
- 기존 집계 로직은 그대로 두고, 별도 섹션 "구독 페이지 탭 클릭 순위"를 추가.
  - `feature_reactions`에서 `product_id = 'subscription' AND feature_id LIKE 'tab_%'` 필터
  - 탭별 클릭 수, 고유 매장 수, 매장명 리스트 표시
  - 기간 필터는 상단 공통 필터를 그대로 따름
- CSV 내보내기에도 포함 (기존 내보내기 흐름에 맞춰).

## 대안 (원하시면 대신 적용)
- **GA4만 사용**: Supabase 저장 없이 GA4 이벤트만 보내고, Analytics 화면(이벤트 리포트)에서 확인. 대시보드 통합은 안 함.
- **좋아요 버튼과 동일 로직**: 탭 클릭도 세션당 여러 번 카운트 vs. 세션당 1회로 제한. 기본은 클릭마다 카운트(사용자가 다른 관심도 지표에서 그렇게 요청하셨던 방향과 일치).

## 확인 방법
- SC 계정으로 `/subscription`에서 각 탭을 눌러보고, `/admin` → 콘텐츠 선호도 → "구독 탭 클릭 순위"에 반영되는지 확인.
- 30초 방치 후 자동 회전이 발생해도 카운트가 늘지 않는지 확인.
