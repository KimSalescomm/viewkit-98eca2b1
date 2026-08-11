UPDATE page_views
SET store_name = '베스트샵 경기광주본점'
WHERE store_id = 'TB' AND store_name = '베스트샵 탄벌점';

UPDATE feature_reactions
SET store_name = '베스트샵 경기광주본점'
WHERE store_slug = 'TB' AND store_name = '베스트샵 탄벌점';

UPDATE sales_certifications
SET branch = '베스트샵 경기광주본점'
WHERE branch = '베스트샵 탄벌점';