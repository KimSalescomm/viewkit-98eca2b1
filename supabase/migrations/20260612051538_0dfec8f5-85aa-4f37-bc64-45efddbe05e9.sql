DROP POLICY IF EXISTS "Anyone can delete sales certifications" ON public.sales_certifications;
REVOKE DELETE ON public.sales_certifications FROM anon, authenticated;