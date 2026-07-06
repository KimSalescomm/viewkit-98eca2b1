# 퍼블리시 구조 개선 — 대시보드 퍼블리시는 "노출 관리"만 담당

## 지금 벌어지는 일 (원인 진단)

맞습니다. 지금 구조가 그래서 그렇습니다.

- **SC(관리자) 계정**: 코드에 있는 최신 원고를 바로 봅니다 → 러버블 퍼블리시만으로 반영됨.
- **일반 지점 / KOR 계정**: `content_snapshots` 테이블에서 가장 최근에 "대시보드 퍼블리시" 버튼으로 저장된 스냅샷을 가져와 렌더링합니다. 즉, 원고를 아무리 러버블에서 퍼블리시해도 대시보드에서 다시 퍼블리시 버튼을 눌러야 지점 계정에 반영됩니다.

사용자가 원하는 방향: **대시보드 퍼블리시 = 제품 카드 노출 여부만**, 원고/이미지 등 사소한 변경은 러버블 퍼블리시만으로 전 계정에 자동 반영.

---

## 새 구조

```text
[ 코드(드래프트) ]  ──── 러버블 퍼블리시 ────▶  [모든 계정]  ← 원고·이미지·순서 등 전부 반영
                                                     │
                                                     ▼
                                          [ content_snapshots ]
                                          visibility 만 저장:
                                            { visibleProductIds: [...] }
                                          ─ 대시보드 퍼블리시로만 갱신
                                          ─ 어떤 제품 카드를 켤지 결정
```

- **원고 소스**: 항상 코드(`src/data/features.ts`, `src/data/products.ts`)를 기준으로 렌더.
- **DB 스냅샷 역할**: "지점 계정에서 어떤 제품 카드를 활성화할지" 목록만 저장. 페이로드가 훨씬 작아지고, 원고를 DB로 옮기는 순간이 없어짐.
- **SC 계정**: 기존처럼 모든 제품 카드가 항상 활성 상태(작업/검수용).

---

## 변경 범위

### 1) `src/contexts/ContentContext.tsx`
- `ContentPayload`에서 `featuresMap`/`products`를 제거하고 `visibleProductIds: string[]`만 남김.
- 모든 계정에서 `featuresMap`/`products`는 코드 static을 그대로 반환.
- 일반 지점: DB에서 `visibleProductIds`만 가져와 `getProductById`/`getFeaturesByProductId`가 노출 필터 판단에만 사용하도록 정리.
- 스냅샷이 없거나 fetch 실패 시 fallback = "코드 기본 노출 세트"(현재 `ProductSelection`의 `baseEnabledIds`와 동일).
- 실시간 구독/포커스 재조회는 그대로 유지하되, 원고가 아니라 노출 목록만 갱신하므로 자동 `window.location.reload()`는 제거(플리커 방지 위해 상태 업데이트만).

### 2) `src/pages/ProductSelection.tsx`
- 현재 하드코딩된 `baseEnabledIds` + store 조건 로직을 `useContent()`의 `visibleProductIds`로 대체.
- SC는 항상 전체 노출(코드 기본값), 일반 지점/KOR는 스냅샷 값 기준.
- 순서(`desiredOrder`)는 코드 그대로 유지.

### 3) `src/components/ContentPublishCard.tsx`
- 화면 명칭을 "**제품 카드 노출 관리**"로 변경(문구/설명 재작성).
- 체크박스는 그대로. 저장 버튼은 "선택한 제품만 지점 계정에 노출" 개념으로 변경.
- `buildMergedPayload()` 제거 → 전송 payload는 `{ visibleProductIds: [...selected] }` 만.
- 마지막 저장 시각 표시는 유지.

### 4) `supabase/functions/publish-content/index.ts`
- 입력 스키마를 `visibleProductIds: string[]` (문자열 배열, 각 항목 1~64자) 만 받도록 축소.
- 기존 페이로드 형태로 오는 요청은 400으로 반려(간단화). 
- `content_snapshots.payload`에는 `{ visibleProductIds }` 만 저장.

### 5) 기존 스냅샷 데이터 정리
- 별도 마이그레이션 없이 새 형태를 저장하면 됨. `ContentContext`는 `payload.visibleProductIds`가 없으면 fallback을 쓰도록 방어 로직 포함 → 이전 스냅샷이 남아있어도 앱은 코드 원고를 렌더.
- 사용자가 원하면 대시보드에서 한 번 "노출 저장"을 눌러 새 형태 스냅샷을 남기면 완전 정리됨.

### 6) 임시 코드 정리
- `ContentContext`의 `applyDraftOverrides`(청소로봇 1/5/9번 드래프트 오버라이드)는 원고가 항상 코드에서 나오므로 삭제.

---

## 사용자 체감 변화

- **원고 수정(글자, 이미지, 순서, 하이라이트, 태그 등)**: 러버블 우측 상단 **Publish** 한 번이면 모든 지점에 반영.
- **제품 카드 켜기/끄기**: `/admin` 대시보드의 "제품 카드 노출 관리"에서 체크 후 저장 → 지점 계정 즉시 반영(패스코드 유지).
- SC 계정 동작은 지금과 동일(항상 최신 코드, 전 제품 노출).

---

## 검증

- SC/일반 지점(예: `?store_id=GSB`) 두 뷰에서 다음을 확인:
  1. 코드에서 특장점 텍스트를 살짝 바꿔 러버블 퍼블리시만 실행 → 두 계정 모두 반영되는가.
  2. 대시보드에서 특정 제품 체크 해제 후 저장 → 일반 지점에서 해당 카드 사라지고 SC는 그대로인가.
  3. 스냅샷이 아예 없을 때(초기 상태) fallback 노출 세트가 지점 계정에서 렌더되는가.
