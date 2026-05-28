CREATE TABLE public.page_views (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id text NOT NULL,
  store_name text,
  path text NOT NULL,
  session_id text NOT NULL,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.page_views TO anon;
GRANT SELECT, INSERT ON public.page_views TO authenticated;
GRANT ALL ON public.page_views TO service_role;

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page views" ON public.page_views FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can read page views" ON public.page_views FOR SELECT TO public USING (true);

CREATE INDEX idx_page_views_store_id ON public.page_views(store_id);
CREATE INDEX idx_page_views_created_at ON public.page_views(created_at DESC);
CREATE INDEX idx_page_views_session_id ON public.page_views(session_id);