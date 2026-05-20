# 인증 완료 후 액션 + 제품 목록 동기화

## 1. 제품 옵션을 뷰킷 활성 카드와 동기화
- `src/components/SalesCertBadge.tsx`에서 하드코딩된 `PRODUCTS` 배열을 제거하고 `src/data/products.ts`의 `products`를 import
- `ProductSelection`과 동일한 기준으로 `pc` 제외 후 `name`만 추출 → 옵션: 냉장고, 워시타워, 의류관리기, TV, 청소로봇, 휘센, 쿠킹
- ※ 구독 카드는 실제 제품이 아니므로 옵션에서 제외

## 2. 인증 완료 후 화면 전환 (모달 내부)
- `submitted` state 추가. "인증 완료" 클릭 시:
  1) GA4 `sales_certification` 이벤트 전송 (기존 유지)
  2) localStorage `viewkit_sales_log`에 기록 추가 (`/ranking` 집계용)
  3) 토스트 대신 모달 내부를 **성공 화면**으로 교체
- 성공 화면 구성:
  - 체크 아이콘 + "실적이 기록되었습니다"
  - 방금 입력한 지점·제품·날짜 요약
  - 액션 버튼 2개
    - **실시간 순위 보러가기** (블루 솔리드) → `/ranking` 이동
    - **제품 페이지로 돌아가기** (아웃라인) → `/` 이동
- 모달 닫히면 폼/submitted state 초기화

## 3. 실시간 순위 페이지 신설 — `/ranking`
- 새 라우트 `src/pages/Ranking.tsx`, `App.tsx` lazy 라우트 등록
- 데이터 소스: `src/utils/salesLog.ts` (localStorage 래퍼)
  - `getSales()`, `appendSale()`, `clearSales()`
  - 레코드: `{ branch, product, sold_at, created_at }`
- 페이지 UI (라이트 톤, 뷰킷과 통일):
  - 상단: ← 제품 페이지로 / 트로피 헤더 / 총 N건 / 기록 초기화
  - 카드 2개: 지점별 순위, 제품별 순위 (메달 아이콘 + 건수)
  - 최근 기록 20건 리스트 (시간 표시)
  - 빈 상태 메시지
  - 하단 안내: "현재 데이터는 이 기기 브라우저에만 저장됩니다 (Lovable Cloud 연동 시 매장 전체 합산 가능)"

## 한계 / 다음 단계
- localStorage 기반이라 **기기별로 데이터가 분리**됩니다. 여러 매장 합산 순위가 필요하면 다음 단계로 Lovable Cloud DB(`sales_certifications` 테이블)로 마이그레이션 권장.
