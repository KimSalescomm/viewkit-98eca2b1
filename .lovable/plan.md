# /product/airconditioner 카드 순서 변경

## 목표
`src/data/features.ts`의 `airconditioner` 특장점 배열 순서를 아래와 같이 변경하여 `/product/airconditioner` 페이지 카드 노출 순서를 조정합니다.

```text
1. AI 콜드프리     (id: "15")
2. AI 바람         (id: "18")
3. 청정 UVnano     (id: "19")
4. AI 편의기능 절전 (id: "20")
5. 라인업 비교     (id: "21")
6. 엘숏츠          (id: "17")
7. TV CF           (id: "22")
```

## 작업 내용
- `src/data/features.ts` 내 `airconditioner: [` 배열의 7개 객체 순서를 위 목록과 동일하게 재배치합니다.
- 각 객체의 `id`, `title`, `tag`, 데이터 내용은 변경하지 않고 순서만 이동합니다.
- 변경 후 `bun run build`로 TypeScript/빌드 오류를 확인합니다.

## 영향 범위
- `/product/airconditioner` 주요 특장점 카드 그리드
- 특장점 상세 페이지(`/product/airconditioner/feature/:id`)는 데이터 자체가 변하지 않으므로 영향 없음
