# 청소로봇 헤드영역 회색 배경 + 투명 누끼컷

## 목표
`/product/vacuum` 상세 상단 히어로에서 흰색 카드 배경을 없애고 페이지 배경(회색 `#F3F4F6`)에 그대로 얹은 뒤, 제품 사진은 배경이 투명한 누끼 PNG로 교체한다.

## 누끼 이미지 제작
현재 사용 중인 LG 이미지(`.../gallery/medium05.jpg`)는 흰 배경이 구워진 JPG라 회색 배경 위에서 흰 사각형이 보인다. 이 이미지를 원본으로 배경 제거를 수행해 투명 PNG를 생성한다.

- 원본: `https://static.lge.co.kr/kr/images/vacuum-cleaners/md10730837/gallery/medium05.jpg`
- 이미지 편집(배경 제거)으로 투명 PNG 생성 → `src/assets/vacuum-hero-cutout.png`
- Lovable 자산 포인터(`src/assets/vacuum-hero-cutout.png.asset.json`)로 등록해 퍼블리시 스냅샷에서도 안정적인 CDN URL 사용
- 제품 형태/색상/그림자는 원본 그대로 유지(재생성이 아니라 배경만 제거)

## 히어로 레이아웃 변경 (`src/pages/Home.tsx`, isSample 영역)
- 흰 카드(`bg-white` + `rounded-[14px]` + shadow) 제거 → 배경 없이 회색 페이지 위에 직접 배치
- 좌측: `VIEW KIT` 아이브로우 / `청소로봇` 타이틀 / 설명 카피 (현재 텍스트·크기 유지)
- 우측: 투명 누끼 이미지, 현재와 동일한 높이(모바일 130px / sm 180px)
- 스탠바이미 세로 모드에서 한 화면에 들어오는 현재 높이 감각 유지

## 검증
- `/product/vacuum`에서 히어로에 흰 박스가 사라지고 회색 배경과 이어지는지
- 누끼 이미지 주변에 흰 테두리/잔상이 없는지
- 하단 "궁금한 내용을 확인해보세요" 섹션 및 카드 그리드는 변경 없음
