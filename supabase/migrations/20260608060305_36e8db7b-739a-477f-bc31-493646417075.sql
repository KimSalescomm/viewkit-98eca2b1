DELETE FROM public.page_views
WHERE upper(store_id) = 'GBS'
  AND trim(coalesce(store_name, '')) = '유관부서';