CREATE TABLE public.content_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payload jsonb NOT NULL,
  published_by text,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.content_snapshots TO anon;
GRANT SELECT ON public.content_snapshots TO authenticated;
GRANT ALL ON public.content_snapshots TO service_role;

ALTER TABLE public.content_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read content snapshots"
  ON public.content_snapshots
  FOR SELECT
  USING (true);

CREATE INDEX content_snapshots_created_at_idx
  ON public.content_snapshots (created_at DESC);