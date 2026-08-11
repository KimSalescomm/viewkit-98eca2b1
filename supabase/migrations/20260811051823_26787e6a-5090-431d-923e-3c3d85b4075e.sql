CREATE TABLE public.content_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  store_code text NOT NULL,
  store_name text,
  category text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  status text NOT NULL DEFAULT '대기',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.content_requests TO anon;
GRANT SELECT, INSERT, UPDATE ON public.content_requests TO authenticated;
GRANT ALL ON public.content_requests TO service_role;

ALTER TABLE public.content_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read content requests" ON public.content_requests FOR SELECT USING (true);
CREATE POLICY "Anyone can insert content requests" ON public.content_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update content request status" ON public.content_requests FOR UPDATE USING (true) WITH CHECK (true);

CREATE INDEX idx_content_requests_created_at ON public.content_requests (created_at DESC);