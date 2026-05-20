# 판매 인증 뱃지 & 모달 라이트 톤 리뉴얼

첨부 이미지(연분홍 배경 위 화이트 pill 버튼 + 분홍 책 아이콘 + 굵은 한글 텍스트)를 참고해, 현재 View Kit의 밝은 그라데이션 톤에 어울리도록 재구성합니다.

## 1. 플로팅 뱃지 (src/components/SalesCertBadge.tsx)

- 형태: 원형 → **pill (rounded-full, 가로형)**
- 구성: `Trophy` 아이콘 (lucide-react) + "판매인증" 텍스트
- 컬러: 화이트 배경 + 미세한 보더, 아이콘/텍스트는 프로젝트 메인 블루(`#3182CE`) 사용해 기존 헬프 아이콘/뷰킷 톤과 통일
- 사이즈: 작고 정갈하게 (h-9, px-3.5, text-xs, font-semibold)
- 위치: 우측 하단 fixed (bottom-4 right-4)
- 효과: `backdrop-blur` + soft shadow + hover 시 살짝 떠오르는 lift (`hover:-translate-y-0.5`)
- 투명도: 평상시 살짝 톤 다운(`opacity-80`), hover 시 100%

```text
┌──────────────────────┐
│ 🏆  판매인증          │   ← 화이트 pill, 블루 텍스트
└──────────────────────┘
```

## 2. 모달 (라이트 톤으로 변경)

- 배경: `bg-white` (다크 #0A0F16 제거)
- 보더: `border border-slate-200`, `rounded-2xl` (날카로운 1px → 부드러운 라운드로 톤 맞춤)
- 타이틀 영역: 트로피 아이콘 + "판매 인증" + 서브카피
- 인풋 필드(지점/제품/날짜): 화이트 배경, `border-slate-200`, focus 시 블루 ring
- 액션 버튼:
  - 취소: 아웃라인 그레이
  - 인증 완료: 솔리드 블루(`#3182CE`), 화이트 텍스트
- 동작은 기존 그대로 유지 (지점/제품 Select, 오늘 기본 Date Picker, GA4 `sales_certification` 이벤트, 토스트 "실적이 기록되었습니다")

## 기술 메모

- App.tsx 변경 없음 (이미 마운트되어 있음)
- 다크 모드 관련 클래스/색상값 모두 제거
- 폰트는 프로젝트 기본 Noto Sans KR 사용 (별도 지정 X)
- 접근성: `aria-label="판매 인증"` 유지
