# 하이드로타워 케어 서비스: 올려주신 레드로 바꾸기

올려주신 이미지 속 레드는 **#FD3330**이에요. 앱에서 탭 강조에 이미 쓰고 있는 레드(`--brand-accent`)와 같은 색이에요. 지금 케어 서비스 화면에는 진한 LG 레드(#A50034)가 쓰이고 있어요.

## 바뀌는 부분 (하이드로타워 케어 서비스 화면만)
- 선택된 케어 항목 캡슐 → #FD3330
- [사진][영상] 선택 버튼 → #FD3330
- 썸네일 선택 테두리와 그 밖의 레드 강조 → #FD3330
- 글자는 계속 흰색으로 둬서 잘 읽히게 해요

다른 페이지(구독 등)의 진한 LG 레드는 그대로 둬요.

## 기술 세부사항
- `CareProcessSection.tsx`의 `bg-brand` / `border-brand` / `text-brand-foreground`를 `bg-brand-accent` / `border-brand-accent` / `text-brand-accent-foreground`로 바꿔요 (색은 이미 index.css에 정의되어 있음: 1 98% 59%).
- 이 레드를 쓴다는 점을 프로젝트 메모에 저장해요.
