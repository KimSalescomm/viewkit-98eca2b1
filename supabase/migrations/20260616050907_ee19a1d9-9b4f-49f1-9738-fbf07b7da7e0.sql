CREATE TABLE public.screensaver_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  is_youtube boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  enabled boolean NOT NULL DEFAULT true,
  label text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.screensaver_videos TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.screensaver_videos TO authenticated;
GRANT ALL ON public.screensaver_videos TO service_role;

ALTER TABLE public.screensaver_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read screensaver videos"
  ON public.screensaver_videos FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert screensaver videos"
  ON public.screensaver_videos FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update screensaver videos"
  ON public.screensaver_videos FOR UPDATE
  USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can delete screensaver videos"
  ON public.screensaver_videos FOR DELETE
  USING (true);

CREATE INDEX screensaver_videos_sort_idx ON public.screensaver_videos (sort_order, created_at);