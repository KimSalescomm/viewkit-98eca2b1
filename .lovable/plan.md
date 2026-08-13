# 메인 상단 "뷰킷 소개" 버튼 외부 워크스페이스 페이지로 연결

## 목표
메인 페이지 상단의 "뷰킷 소개" 버튼 클릭 시, 기존 내부 `/guide` 페이지 대신 `https://viewkitup-showcase-pages.lovable.app`로 이동하도록 변경한다.

## 변경 내용
1. `src/pages/ProductSelection.tsx` 상단 segmented controls 영역에서 "뷰킷 소개" 버튼을 수정한다.
2. 내부 라우팅용 `<Link to="/guide">`를 외부 링크용 `<a>` 요소로 교체한다.
3. 새 탭에서 열리도록 `target="_blank" rel="noopener noreferrer"`를 추가한다.
4. 기존 스타일(rounded-full, 아이콘, 텍스트, hover 상태)은 그대로 유지한다.

## 확인 항목
- 메인 페이지에서 "뷰킷 소개" 버튼이 정상적으로 표시되는지 확인
- 클릭 시 지정한 외부 URL이 새 탭에서 열리는지 확인
- 반응형 레이아웃 및 기타 세그먼트 버튼 배치에 영향이 없는지 확인
