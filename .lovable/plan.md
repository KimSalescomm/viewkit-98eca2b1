# 원인 분석 및 수정 — SC에서만 구독 카드 비활성

## 원인

`src/contexts/ContentContext.tsx`에서 SC(관리자) 계정의 초기 `visibleProductIds`를 이렇게 계산합니다:

```ts
visibleProductIds: staticProducts.map((p) => p.id)
```

그런데 `src/data/products.ts`에는 실제 제품(refrigerator, washer, vacuum 등)만 있고 **"subscription" 항목이 없습니다**. 구독 카드는 `ProductSelection.tsx`에서 별도의 가상 카드(`subscriptionCard`)로 붙이는 구조라, `staticProducts.map`에는 잡히지 않습니다.

그 결과 SC의 `visibleProductIds`에는 `"subscription"`이 빠져 있고, `ProductSelection`이 `baseEnabledIds.includes("subscription")` 검사에서 false를 받아 카드가 회색·비활성으로 렌더됩니다.

반면 일반 지점은 스냅샷/기본값(`DEFAULT_VISIBLE_PRODUCT_IDS`)에 `"subscription"`이 처음부터 포함되어 있어 정상 노출됩니다. 그래서 지점 계정만 멀쩡해 보이는 것.

```text
SC          → visible = [refrigerator, washer, ...]           ← subscription 누락
매장 계정   → visible = [subscription, vacuum, refrigerator,   ← 정상
                       airconditioner, washer]
```

## 수정

**`src/contexts/ContentContext.tsx` 한 파일**

- SC 초기값 계산을 `DEFAULT_VISIBLE_PRODUCT_IDS`와 `staticProducts` 를 합쳐 중복 제거한 목록으로 변경:
  ```ts
  visibleProductIds: Array.from(new Set([
    ...DEFAULT_VISIBLE_PRODUCT_IDS,     // subscription 포함
    ...staticProducts.map((p) => p.id), // 나머지 실제 제품
  ]))
  ```
- 컨텍스트 미사용 시 안전 fallback(`useContent`)도 동일하게 처리.

다른 파일(엣지 함수·대시보드·ProductSelection 로직)은 손대지 않습니다. 이렇게 하면 SC에서 구독 카드가 다시 활성화되고, 이후 코드에 새 제품이 추가돼도 자동 포함됩니다.
