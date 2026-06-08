DELETE FROM public.page_views WHERE created_at < '2026-06-08'::date;
DELETE FROM public.sales_certifications WHERE created_at < '2026-06-08'::date;