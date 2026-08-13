UPDATE public.page_views SET store_name = '일산본점' WHERE upper(store_id) = 'ISB';

ALTER TABLE public.sales_certifications DROP CONSTRAINT IF EXISTS sales_certifications_memo_length;

UPDATE public.sales_certifications SET branch = '일산본점' WHERE upper(branch) = 'ISB';

ALTER TABLE public.sales_certifications
  ADD CONSTRAINT sales_certifications_memo_length
  CHECK (memo IS NULL OR char_length(memo) BETWEEN 20 AND 200) NOT VALID;

UPDATE public.content_requests SET store_name = '일산본점' WHERE upper(store_code) = 'ISB' OR upper(store_name) = 'ISB';

UPDATE public.feature_reactions SET store_name = '일산본점', store_slug = 'ISB' WHERE upper(store_slug) = 'ISB' OR upper(store_name) = 'ISB' OR store_name = '일산본점';