CREATE TABLE public.care_video_segments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text NOT NULL,
  care_service_id text NOT NULL,
  video_url text NOT NULL,
  start_seconds numeric NOT NULL DEFAULT 0,
  end_seconds numeric,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (product_id, care_service_id)
);

GRANT SELECT ON public.care_video_segments TO anon, authenticated;
GRANT ALL ON public.care_video_segments TO service_role;

ALTER TABLE public.care_video_segments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read care video segments"
ON public.care_video_segments
FOR SELECT
TO anon, authenticated
USING (true);