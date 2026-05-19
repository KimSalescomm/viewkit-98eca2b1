## 변경 내용

**`src/data/products.ts`** — `vacuum` 항목 텍스트만 수정
- `name`: `"로봇청소기"` → `"LG HOM-BOT RONi"`
- `title`: `"로봇청소기"` → `"LG HOM-BOT RONi"`
- `description`은 그대로 유지

## 영향 범위

- `/` 제품 선택 카드 라벨
- `/product/vacuum` 헤더의 칩(name), 타이틀(title)
- 기타 `getProductById("vacuum").name/title`을 사용하는 모든 화면(FeatureCard, Manual 등)에 자동 반영

표기 대소문자/하이픈/공백(`LG HOM-BOT RONi`) 그대로 정확히 반영합니다.