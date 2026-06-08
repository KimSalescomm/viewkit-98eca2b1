
-- 1. 'N', 'STORE' 등 잘못된 매장 데이터 삭제
DELETE FROM public.page_views WHERE store_id IN ('N', 'STORE');

-- 2. store_id 코드별 정식 매장명으로 통일 (BRANCH_CODE_MAP 기준)
UPDATE public.page_views SET store_name = '대전본점' WHERE store_id = 'DJB';
UPDATE public.page_views SET store_name = '금오본점' WHERE store_id = 'GOB';
UPDATE public.page_views SET store_name = '강서본점' WHERE store_id = 'GSB';
UPDATE public.page_views SET store_name = '황금본점' WHERE store_id = 'HGB';
UPDATE public.page_views SET store_name = '이도본점' WHERE store_id = 'IDB';
UPDATE public.page_views SET store_name = '유관부서' WHERE store_id = 'KOR';
UPDATE public.page_views SET store_name = '베스트샵 남천점' WHERE store_id = 'NC';
UPDATE public.page_views SET store_name = '노은점' WHERE store_id = 'NE';
UPDATE public.page_views SET store_name = '베스트샵 파주본점' WHERE store_id = 'PJB';
UPDATE public.page_views SET store_name = '소하본점' WHERE store_id = 'SHB';
UPDATE public.page_views SET store_name = '운정본점' WHERE store_id = 'UJB';
-- DY는 기존 데이터 다수가 '대연점' 이므로 그대로 통일 (담양점이 아닌 사용자 입력 매장)
UPDATE public.page_views SET store_name = '대연점' WHERE store_id = 'DY';
-- GC는 '거창' 직접 입력에서 발생 → '베스트샵 거창점'(GC2)이 정식이지만 기존 코드는 GC로 기록됨. 명칭만 보정
UPDATE public.page_views SET store_name = '베스트샵 거창점' WHERE store_id = 'GC';
