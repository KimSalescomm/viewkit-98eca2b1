# 냉장고 설치체크 썸네일 교체

## 목표
`/product/refrigerator` 특장점 목록(써머리) 페이지의 "설치 체크" 카드 썸네일을 제공된 LG 이미지로 교체합니다. 상세 페이지(`/product/refrigerator/feature/9`)의 갤러리 콘텐츠는 그대로 유지합니다.

## 변경 내용
- 파일: `src/data/featureCardConfig.ts`
- 대상: `refrigerator.cards["9"]`
- 현재: `https://c29ebf32-471f-4991-a656-57585c8d8b56.lovableproject.com/images/installation-step1.jpeg`
- 변경: `https://www.lge.co.kr/kr/bestcare/service-installation-removal/images/img-refrigerators-step02.jpg`

## 검증
- `/product/refrigerator` 진입 시 "설치 체크" 카드 썸네일이 새 이미지로 노출되는지 확인
- 상세 페이지(`/product/refrigerator/feature/9`) 기존 5단계 갤러리에 변화 없음 확인
