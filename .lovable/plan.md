# 페이지뷰 집계 누락 수정

## 현재 DB 상태 (확인 완료)
```
store_id | store_name | views | last
GSB      | 강서본점   | 4     | 07:24
```
SC 등 다른 매장 기록 0건. 실제 사용량 대비 과소 집계.

## 원인 2가지

### 1. 매장 설정 직후 첫 페이지 누락
`useAnalytics`의 useEffect는 페이지 진입 시 1회만 발동. 그 시점엔 아직 `getCurrentStore()`가 null이므로 `logPageView`가 조기 return. 이후 사용자가 모달에서 매장을 선택해도 URL이 안 바뀌어 useEffect가 다시 안 돈다 → 첫 화면은 영원히 기록되지 않음.

### 2. 동일 경로 재방문 누락
`useAnalytics`에 `if (lastPath.current === currentPath) return;` 가드가 있어, 한 세션에서 `/ → /product/refrigerator → /` 로 돌아오면 두 번째 `/` 는 `logPageView` 호출 자체가 안 됨. (실제로는 별개 페이지뷰여야 함.)

## 수정 내용

### `src/hooks/useAnalytics.ts`
`logPageView(location.pathname)` 호출 위치를 **동일 경로 가드보다 위로** 이동. 내부에 이미 1초 디바운스가 있어 React StrictMode 더블 호출은 자동 차단됨. 결과적으로:
- 모든 라우트 변경마다 무조건 1회 시도
- 같은 경로 재방문도 1초 이상 지나면 새 페이지뷰로 기록
- GA4 측 동일 경로 차단(`return`)은 그대로 유지하여 GA4는 영향 없음

### `src/components/StoreSetupModal.tsx`
매장 등록(`registerStore`) 직후 `logPageView(window.location.pathname)`를 한 번 호출. 모달 닫힘 시점의 현재 페이지를 정확히 새 매장 ID로 기록.

## 검증 방법
1. 새 브라우저(시크릿)에서 매장 설정 → 바로 DB에 1행 INSERT 확인
2. `/ → /product/refrigerator → /` 이동 후 DB에서 `/` 가 2행으로 잡히는지 확인
3. SC 계정으로 진입 → /admin 통계에 "관리자" 노출되는지 확인

## 영향 범위
- INSERT 빈도 소폭 증가 (재방문 추적 포함) — 100지점 기준으로도 무료 한도 내 변함없음
- GA4 동작 변화 없음
- 기존 데이터 손실 없음
