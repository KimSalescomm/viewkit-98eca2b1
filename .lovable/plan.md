# 대안 C 상세 구현 플랜 — 특장점 관심 표시 (콘텐츠 선호도 조사)

## 목표
- **비즈니스 목표**: 매장별로 "어떤 특장점 콘텐츠가 방문객의 관심을 끄는가"를 정량화해 콘텐츠 우선순위·매장 응대 스크립트에 활용
- **UX 목표**: 방문객이 부담 없이 참여하고, 편향(사회적 증거) 없이 순수한 개인 반응만 수집
- **데이터 목표**: 매장ID × 제품 × 특장점 단위 관심 이벤트 raw 로그 → 대시보드에서 랭킹·트렌드 집계

---

## 1. 고객 노출 UX

### 1.1 위치 및 형태
- FeatureCard 우측 상단 (모바일 리스트: `›` 화살표 위, 데스크톱 카드: 우측 상단 코너)
- 아이콘: Lucide `Heart` (outline 상태) / `Heart fill` (선택 상태)
  - "북마크"보다 감정적 이해가 즉시 되고, 매장 방문객 학습 비용이 낮음
  - 카운트를 표시하지 않으므로 "좋아요 수 경쟁" 편향은 없음
- 크기: 모바일 32px 탭 영역, 데스크톱 40px

### 1.2 마이크로카피
- 미선택 상태 hover/long-press 툴팁: **"이 기능이 마음에 들어요"**
- 첫 진입 시 카드 1개에 한해 **1.5초 pulse 힌트 애니메이션** (세션당 1회, localStorage 플래그)
- 탭 직후 토스트: **"관심 표시가 기록되었어요 · 매장 콘텐츠 개선에 활용됩니다"**

### 1.3 인터랙션 상세
1. 탭 → 즉시 하트 채워짐 + `animate-scale-in` + 짧은 하트 파티클 효과
2. 백그라운드로 Supabase insert (fire-and-forget, 실패해도 UI 유지)
3. 300ms debounce, 세션당 동일 특장점 최대 20회 소프트 캡 (초과 시 UI만 반응, insert skip)
4. **세션 종료(탭 닫기/새 방문객)** 시 상태 리셋 → 다음 방문객엔 다시 빈 하트로 노출
   - `sessionStorage`에 `liked_feature_ids` 배열 저장
5. 카드 전체 링크와 충돌 방지: `<button>` 별도 영역, `e.stopPropagation()` + `e.preventDefault()`

### 1.4 접근성
- `aria-label="이 특장점에 관심 표시하기"`
- `aria-pressed` 토글
- 키보드 포커스링 유지

### 1.5 카운트 미표시 원칙
- 방문객에게는 어떤 형태의 숫자·순위도 노출하지 않음
- "다른 사람이 몇 명 눌렀는지" 볼 수 없어야 편향 없는 데이터 확보 가능

---

## 2. 데이터 모델

### 2.1 신규 테이블 `feature_reactions`
```text
id            uuid PK
created_at    timestamptz default now()
store_slug    text        -- 예: GSB, PGY
store_name    text        -- 스냅샷
product_id    text        -- 예: vacuum
product_name  text        -- 스냅샷
feature_id    text        -- features.ts의 id (예: "1")
feature_title text        -- 스냅샷 (콘텐츠 개편 후에도 히스토리 유지)
session_id    text        -- 기존 page_views와 동일 패턴
```

### 2.2 정책
- RLS ENABLE
- `INSERT` → anon/authenticated 허용 (기존 `page_views` 정책 동일)
- `SELECT` → authenticated만 (대시보드 접근 계정)
- GRANT: `INSERT` anon/authenticated, `SELECT` authenticated, `ALL` service_role

### 2.3 인덱스
- `(store_slug, product_id, feature_id)` — 대시보드 집계용
- `(created_at desc)` — 기간 필터용

### 2.4 집계 제외 규칙 (클라이언트 단)
- SC / KOR 관리자 계정은 insert skip (기존 `isAdminStore` 재사용)
- 매장 미설정 상태(모달 노출 전) skip

---

## 3. 프론트엔드 변경

### 3.1 신규 파일
- `src/utils/featureReactionLog.ts` — `page_views` 로그 패턴 그대로 복제
  - `logFeatureReaction({productId, productName, featureId, featureTitle})`
  - debounce, 세션 캡, admin 제외, session_id 관리
- `src/components/FeatureLikeButton.tsx` — 하트 버튼 컴포넌트
  - Props: 위와 동일 + `variant: "mobile" | "desktop"`
  - 내부 상태: `sessionStorage`에서 liked 여부 조회
  - 클릭 핸들러가 `stopPropagation` + insert 호출

### 3.2 수정 파일
- `src/components/FeatureCard.tsx`
  - 모바일 레이아웃: `›` 화살표 위쪽에 하트 버튼 삽입
  - 데스크톱 레이아웃: 카드 우측 상단 absolute 배치
  - `<Link>` 내부에서 `<button>`이 정상 동작하도록 구조 조정

### 3.3 GA4 이벤트
- `useAnalytics.ts`에 `trackFeatureLike(productName, featureName)` 추가
- 이벤트명: `feature_like`, 파라미터: `product_name`, `feature_name`, `store_id`
- 하트 클릭 시 Supabase insert와 병렬 발송

---

## 4. 관리자 대시보드 (`/admin`)

### 4.1 신규 섹션 "콘텐츠 선호도"
`page_views` 통계 아래에 새 카드 섹션으로 배치.

**상단 필터**
- 기간: 오늘 / 7일 / 30일 / 전체
- 매장: 전체 / 특정 매장 선택
- 제품: 전체 / 특정 제품 선택

**뷰 1. 특장점 랭킹 표** (기본)
| 순위 | 제품 | 특장점 | 관심 수 | 매장 수 | 최근 반응 |
|------|------|--------|---------|---------|-----------|
- 관심 수 내림차순 정렬
- "매장 수" = 반응이 있었던 유니크 매장 수 (편향 판단 지표)
- 특장점 클릭 시 매장별 브레이크다운 모달

**뷰 2. 매장 × 특장점 히트맵**
- 세로축: 매장, 가로축: 특장점
- 셀 색상 진하기 = 관심 수 (매장별 정규화)
- 매장마다 관심 콘텐츠 편차를 한눈에 파악

**뷰 3. 시간별 트렌드**
- 특정 특장점 선택 → 일별 관심 수 라인 차트
- 콘텐츠 개편 전/후 효과 측정

### 4.2 신규 파일
- `src/components/admin/FeaturePreferenceSection.tsx`
- `src/hooks/useFeatureReactions.ts` — Supabase 조회 훅
- 차트: 기존 `src/components/ui/chart.tsx` (recharts) 재사용

### 4.3 데이터 신뢰도 표시
- 대시보드 상단에 안내 배너:
  > "관심 표시는 세션당 최대 20회로 제한됩니다. '매장 수' 지표를 함께 확인하면 편향을 줄일 수 있습니다."

### 4.4 CSV 다운로드
- 랭킹 표 우측에 "CSV 내보내기" 버튼 (기간 필터 적용된 데이터)

---

## 5. 마이그레이션 순서

1. Supabase 마이그레이션 실행 (테이블 + GRANT + RLS + 정책 + 인덱스)
2. `featureReactionLog.ts` + `FeatureLikeButton.tsx` 추가
3. `FeatureCard.tsx` 수정 (모바일/데스크톱 양쪽)
4. `useAnalytics.ts`에 `trackFeatureLike` 추가
5. `/admin`에 `FeaturePreferenceSection` 추가
6. 관리자 페이지에서 테스트 매장(GSB)으로 반응 이벤트 발생 → 대시보드 확인
7. 로컬 스토리지 리셋 후 첫 진입 pulse 힌트 동작 확인

---

## 6. 리스크 & 완화

| 리스크 | 완화 |
|--------|------|
| 매장 직원이 임의 클릭으로 편향 유발 | 세션 20회 캡 + '매장 수' 지표 병기 + SC/KOR 계정 제외 |
| 이벤트 볼륨 급증 (무료 한도) | debounce 300ms, 세션 캡, admin 제외로 자연 감소. `page_views`와 유사 규모로 예상 |
| 카드 UI 복잡도 증가 | 하트 아이콘 1개 + 카운트 미표시로 최소화. 상세 페이지 이동 링크와 시각 분리 |
| 방문객이 "다른 사람 눌린 수"로 오해 | 카운트를 UI에 절대 노출하지 않음 |
| 콘텐츠 개편 시 feature_id 변경 → 히스토리 유실 | 이벤트에 `feature_title` 스냅샷 저장 |

---

## 7. 성공 지표 (도입 4주 후 리뷰)

- 매장당 주간 관심 이벤트 발생 매장 비율 ≥ 60%
- 상위 3개 특장점이 매장 총 관심의 40~70% 차지 (0% 또는 90% 이상이면 데이터 신뢰도 재검토)
- 최소 2개 이상의 매장 응대 스크립트가 이 데이터를 근거로 조정됨

---

승인 시 위 순서대로 구현을 진행하겠습니다.
