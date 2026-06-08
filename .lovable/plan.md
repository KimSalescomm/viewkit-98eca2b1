
# 대시보드 로직 문서화 (README.md 보강)

`/admin` 대시보드가 어떻게 데이터를 수집·필터·집계하는지와 정확도를 어떻게 담보하는지를 README에 명시적으로 기록합니다. 코드 변경은 없고, 문서만 추가합니다.

## 추가 위치
`README.md` 하단 "운영 가이드"와 "배포" 사이에 **`📊 관리자 대시보드 (/admin)`** 섹션을 새로 삽입.

## 섹션 구성

### 1) 대시보드 개요
- 진입 경로: `/admin` (Edge Function `admin-login` 기반 패스코드 인증, 세션스토리지)
- 두 가지 영역
  - **지점별 접속 통계** (`StoreVisitStats` · `page_views` 테이블)
  - **판매 인증 집계** (`Dashboard` · `sales_certifications` 테이블)

### 2) 데이터 수집 파이프라인
- **페이지뷰** — `src/utils/pageViewLog.ts`
  - 라우트 변경 시 `supabase.from("page_views").insert(...)`
  - 필드: `store_id`(코드 슬러그), `store_name`, `path`, `session_id`, `created_at`
  - `session_id`: `sessionStorage`에 발급되어 세션 내 동일 식별자 유지
- **판매 인증** — `src/utils/salesLog.ts`
  - 필드: `branch`, `product`, `sold_at`, `created_at`

### 3) 정확도 보증 규칙 (Hygiene)
이 부분이 핵심. 다음 규칙들이 어디서/왜 적용되는지 명시:

1. **사이트 오픈일 컷오프** — `SITE_OPEN_DATE = 2026-06-08`
   - 그 이전 데이터는 사이트 오픈 전 테스트 허수로 간주, 양쪽 쿼리 모두에서 `gte("created_at", "2026-06-08T00:00:00Z")` 강제
   - 위치: `salesLog.ts`의 `getSales`, `StoreVisitStats.tsx`의 `effectiveSince`
2. **관리자/본사 제외**
   - `store_id`가 `SC`(관리자) 또는 `KOR`(본사 유관부서)인 페이지뷰는 집계 결과에서 제외
   - 기록 단계(`logPageView`)에서도 한 번, 표시 단계(`StoreVisitStats`)에서도 한 번 — 이중 가드
3. **지점 미설정 상태 무기록** — `store.slug`가 비어 있으면 insert 자체를 수행하지 않음 (최초 모달 단계 노출 제외)
4. **1초 내 동일 경로 중복 방지** — `lastLogged` 메모이제이션으로 빠른 재진입/리렌더의 더블 카운트 차단
5. **쿼리 파라미터 정규화** — `path`에서 `?store_id=...` 등 쿼리 제거 후 저장
6. **정식 매장명 보정** — `BRANCH_CODE_MAP` 역매핑(`CODE_TO_NAME`)을 우선 사용해 DB에 저장된 표기 불일치(예: `"GSB"`, `"강서본점"`, 직접입력 `"강서"` 등)를 표시 단계에서 코드 기준으로 통일

### 4) 집계 방식
- **페이지뷰** (`StoreVisitStats.stats`)
  - 그룹키: `store_id`
  - `views` = 행 개수
  - `visits` = `session_id`의 distinct 수 (Set)
  - `lastAt` = 최신 `created_at`
  - 정렬: `views` 내림차순
- **상단 KPI** (`StoreVisitStats.totals`)
  - `총 페이지뷰` = 필터된 rows.length
  - `총 방문` = 전체 rows에 대한 distinct session_id 수
  - `활성 지점` = 그룹 개수
- **기간 필터** — 오늘 / 7일 / 30일 / 전체. `all` 선택 시에도 위 사이트 오픈 컷오프는 항상 적용됨
- **판매 인증** (`Admin.tsx`)
  - 지점/제품/판매일 범위 필터 → `byBranch`, `byProduct` 카운트 집계
  - CSV 내보내기는 필터 결과 기준

### 5) 알려진 한계
- `limit(5000)` — 페이지뷰 표시 한도. 30일 누적이 이를 초과하면 최근 5,000건만 반영됨
- 익명/공개 INSERT 정책이므로 동일 사용자가 새 세션을 만들면 별도 방문으로 카운트됨
- 클라이언트 발급 `session_id`라 시크릿/스토리지 초기화 시 세션이 새로 잡힘

### 6) 데이터 정정 운영
- 잘못 기록된 매장명/코드 정정은 마이그레이션으로 일괄 UPDATE
- 이전 사례: `N`, `STORE` 등 비정상 코드 row 삭제 / 코드별 매장명 정식 명칭으로 통일

## 변경 파일
- `README.md` (섹션 1개 추가, 약 80~100줄)

코드/로직 변경은 없습니다.
