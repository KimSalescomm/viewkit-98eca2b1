## 변경 내용

1. **`src/pages/ProductSelection.tsx`**
   - `enabledIds` 배열에 `"vacuum"` 추가 → 청소기 카드 클릭 가능하게 활성화

2. **`src/data/products.ts`**
   - `vacuum` 항목의 `name`을 `"청소기"` → `"로봇청소기"`로 변경
   - `title`도 `"무선 청소기"` → `"로봇청소기"`로 변경 (일관성), `description`은 유지 또는 로봇청소기에 맞게 조정 여부 확인 필요

## 확인 필요

- `/product/vacuum` 라우트로 진입 시 보여줄 features 데이터가 `src/data/features.ts`에 있는지 확인 후 없으면 빈 상태 처리 필요할 수 있음 (구현 단계에서 점검)
- `title`/`description`도 같이 "로봇청소기" 표현으로 바꿀지, name만 바꿀지는 구현 시 기본은 **name만 "로봇청소기"로 변경**, title/description은 그대로 두는 방향으로 진행