## 개념

- **드래프트 = 코드 파일** (`src/data/features.ts`, `src/data/products.ts`). 제가 수정하는 값.
- **퍼블리시 = DB 스냅샷** (`content_snapshots` 테이블에 features+products 전체를 JSON으로 보관).
- **SC 계정**: 항상 코드 그대로(드래프트) 노출.
- **일반 지점 / KOR**: 항상 가장 최근 퍼블리시 스냅샷 노출. 아직 한 번도 퍼블리시되지 않았다면 코드(현재 상태) 폴백.

## 변경 사항

### 1. 백엔드
- 새 테이블 `content_snapshots`: `payload jsonb`(featuresMap + products), `published_by`, `published_at`. anon SELECT 허용, INSERT는 엣지 함수로만.
- 새 엣지 함수 `publish-content`: 관리자 패스코드(ADMIN_PASSCODE) 검증 후 INSERT.

### 2. 프론트엔드 데이터 레이어
- `ContentProvider` (Context) 신규 — 앱 로드 시 한 번:
  - 현재 store slug = `SC` → 코드의 `featuresMap`/`products` 사용
  - 그 외 → Supabase에서 latest 스냅샷 조회, 있으면 그것을, 없으면 코드 폴백
- `useContent()` 훅에서 `featuresMap`, `products`, `getProductById`, `getFeatureById`, `getFeaturesByProductId` 노출
- 기존 import 사용처 6곳 리팩터(`ProductSelection`, `Home`, `FeatureDetail`, `Legal`, `SalesCertBadge`는 데이터 사용. `MediaViewer`, `FeatureIcon`은 타입/상수만 → 그대로 유지)

### 3. 퍼블리시 UI
- `/admin` 페이지에 "콘텐츠 퍼블리시" 카드 추가. SC 슬러그 + 관리자 패스코드 인증된 상태에서만 표시.
- 버튼 클릭 시 현재 코드 데이터(`featuresMap` + `products`)를 엣지 함수로 전송 → 새 스냅샷 생성 → 일반 지점 다음 로드부터 반영.
- 최근 퍼블리시 시각 표시.

## 기술 세부

```text
[코드 파일 (드래프트)] ──► SC 화면 (그대로)
        │
        │ SC가 /admin에서 "퍼블리시" 클릭
        ▼
[content_snapshots 테이블]
        │
        ▼
[일반 지점/KOR 화면] (latest 스냅샷 사용)
```

- 스냅샷 캐시: `localStorage`에 마지막 응답 보관 → 네트워크 실패 시 마지막 퍼블리시 유지.
- 일반 지점은 새로고침 시점에 latest를 가져옴(실시간 푸시 없음). 매장에선 충분.
- 타입 호환을 위해 payload는 현재 TS 인터페이스(`Feature`, `Product`)와 1:1 동일 구조.
