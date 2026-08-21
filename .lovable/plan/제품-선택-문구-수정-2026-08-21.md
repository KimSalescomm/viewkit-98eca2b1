# 제품 선택 문구 수정

## 목표
`제품을 선택하세요` → `제품을 선택해보세요`로 문구를 변경합니다.

## 변경 대상
1. `src/pages/ProductSelection.tsx` (226번 라인) — 제품 선택 페이지 상단 헤딩
2. `src/components/SalesCertBadge.tsx` (277번 라인) — 판매 인증 모달 내 제품 선택 Select placeholder

## 변경 내용
- `제품을 선택하세요` → `제품을 선택해보세요`

## 검증
- 빌드 정상 통과 확인
- ProductSelection 페이지에서 변경된 헤딩 노출 확인
