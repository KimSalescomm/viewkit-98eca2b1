# Store ID별 접속 통계 (자체 집계)

GA4와 별개로 Supabase에 페이지뷰를 기록하고 `/admin` 페이지에서 지점별 접속 수를 확인할 수 있게 합니다.

## 구현 내용

### 1. 데이터베이스
신규 테이블 `page_views`:
- `store_id` (text) — 지점 슬러그 (GSB, DCB, SC 등)
- `store_name` (text) — 화면 표시용 지점명
- `path` (text) — 방문 경로 (/product/refrigerator 등)
- `session_id` (text) — 세션 식별 (방문 수 중복 제거용)
- `user_agent` (text, nullable)
- `created_at` (timestamptz)

인덱스: `store_id`, `created_at`, `session_id`
RLS: 누구나 INSERT/SELECT 가능 (관리자 계정 없이 운영 중인 현 구조와 동일, `sales_certifications`와 동일 패턴)

### 2. 페이지뷰 기록 로직
`src/hooks/useAnalytics.ts`에 Supabase 기록 추가:
- 경로가 바뀔 때마다 `page_views`에 1행 INSERT
- `session_id`는 `sessionStorage`에 1회 생성 (방문 vs 페이지뷰 구분용)
- 기존 GA4 전송과 병행, 실패해도 무시

### 3. /admin 페이지 통계 패널
`src/pages/Admin.tsx`에 신규 섹션:
- 기간 선택 (오늘 / 7일 / 30일 / 전체)
- **지점별 접속 수 표** : 지점명, store_id, 총 페이지뷰, 고유 방문(session_id), 최근 접속 시각
- 합계 카드 (총 페이지뷰, 총 방문, 활성 지점 수)
- 정렬: 페이지뷰 내림차순

## 기술 메모
- 무한 새로고침/봇 트래픽 방지를 위해 동일 path 연속 기록은 클라이언트 측에서 1초 디바운스
- 기존 `sales_certifications` 패턴 그대로 따름 (public RLS, 인증 없음)
- Hard Budget 정책 준수 — 단순 INSERT만, 별도 함수/스토리지 사용 없음
