# ProductSelection 카드 구분감 개선

## 목표
ProductSelection 페이지의 제품 카드가 흰색 배경과 구분되지 않아 시각적으로 묻히는 문제를 해결한다. 사용자가 선택한 "Soft elevation design" 방향을 적용한다.

## 변경 범위
- `src/pages/ProductSelection.tsx`
- `src/components/PopularContentSlider.tsx` (간접: 상단 섹션 배경 조화)

## 구현 내용

### 1. 페이지 배경
- `<main>` 배경을 `bg-white`에서 연한 회색(`bg-slate-50` 또는 프로젝트 토큰에 맞는 `--muted` 기반)으로 변경
- 헤더는 현재 `bg-white/95 backdrop-blur` 유지

### 2. 제품 카드 스타일
- 카드 배경: `bg-white`
- 테두리: `border border-slate-200/60`
- 그림자: 기본 `shadow-sm`, hover 시 `shadow-xl`
- hover 시 카드가 살짝 떠오르는 효과: `hover:-translate-y-1`
- 카드 높이: 기존 `h-[120px]` 유지
- 모서리: 기존 `rounded-[20px]` 유지

### 3. 아이콘 영역
- 아이콘 컨테이너에 연한 회색 배경 박스 추가: `bg-slate-50 rounded-xl`
- 아이콘 컨테이너 크기: `w-12 h-12` 또는 `w-14 h-14` (카드 120px 높이에 맞춰 조정)
- hover 시 아이콘 영역 배경이 브랜드 컬러 연톤으로 변경: `group-hover:bg-blue-50` (또는 브랜드 토큰)
- hover 시 아이콘 색상이 브랜드 컬러로 변경: `group-hover:text-brand-accent`
- `ProductMockup` 컴포넌트는 그대로 사용, 아이콘 크기는 카드 내에서 적절히 조정

### 4. 텍스트 영역
- 제품명은 기존 위치와 스타일 유지
- 텍스트 가독성을 위해 카드 배경과 충분한 대비 유지

### 5. PopularContentSlider
- 현재 limit={3}으로 3개만 노출 중이며 그리드 레이아웃 사용
- 상단 섹션 배경이 `bg-gray-900`이므로 페이지 배경 변경과 큰 충돌 없음
- 필요 시 상단 섹션과의 간격/구분감만 미세 조정

## 검증 항목
- [ ] ProductSelection 페이지 배경이 연한 회색으로 변경됨
- [ ] 제품 카드가 흰색 배경 + 테두리 + 그림자로 돋보임
- [ ] 아이콘 영역에 연한 회색 배경 박스가 적용됨
- [ ] hover 시 카드가 떠오르고 아이콘 색상이 브랜드 컬러로 변경됨
- [ ] 카드 높이가 기존 120px에서 변경되지 않음
- [ ] 스탠바이미 세로 모드에서 한 화면에 레이아웃이 깨지지 않음
