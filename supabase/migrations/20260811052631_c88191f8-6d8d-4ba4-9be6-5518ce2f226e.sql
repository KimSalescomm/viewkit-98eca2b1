DROP POLICY IF EXISTS "Anyone can read content requests" ON public.content_requests;
DROP POLICY IF EXISTS "Anyone can update content request status" ON public.content_requests;

REVOKE SELECT, UPDATE, DELETE ON public.content_requests FROM anon;
REVOKE SELECT, UPDATE, DELETE ON public.content_requests FROM authenticated;
GRANT INSERT ON public.content_requests TO anon, authenticated;
GRANT ALL ON public.content_requests TO service_role;