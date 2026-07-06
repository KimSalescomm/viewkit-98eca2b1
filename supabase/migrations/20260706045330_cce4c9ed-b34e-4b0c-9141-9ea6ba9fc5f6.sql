
CREATE TABLE public.feature_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  store_slug text NOT NULL,
  store_name text,
  product_id text NOT NULL,
  product_name text,
  feature_id text NOT NULL,
  feature_title text,
  session_id text NOT NULL
);

GRANT INSERT ON public.feature_reactions TO anon;
GRANT INSERT, SELECT ON public.feature_reactions TO authenticated;
GRANT ALL ON public.feature_reactions TO service_role;

ALTER TABLE public.feature_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert feature reactions"
  ON public.feature_reactions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read feature reactions"
  ON public.feature_reactions
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX feature_reactions_store_product_feature_idx
  ON public.feature_reactions (store_slug, product_id, feature_id);

CREATE INDEX feature_reactions_created_at_idx
  ON public.feature_reactions (created_at DESC);
