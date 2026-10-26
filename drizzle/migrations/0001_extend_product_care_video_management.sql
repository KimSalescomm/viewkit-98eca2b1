CREATE TABLE public.product_care_videos (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 product_id text NOT NULL,
 model_id text NOT NULL DEFAULT '',
 common_video_url text,
 video_duration numeric,
 shared_product_id text,
 shared_model_id text NOT NULL DEFAULT '',
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(product_id, model_id)
);
GRANT SELECT ON public.product_care_videos TO anon, authenticated;
GRANT ALL ON public.product_care_videos TO service_role;
ALTER TABLE public.product_care_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read product care videos" ON public.product_care_videos FOR SELECT TO anon, authenticated USING (true);
ALTER TABLE public.care_video_segments ADD COLUMN model_id text NOT NULL DEFAULT '';
ALTER TABLE public.care_video_segments ADD COLUMN individual_video_url text;
CREATE UNIQUE INDEX care_video_segments_product_model_care_key ON public.care_video_segments(product_id, model_id, care_service_id);
INSERT INTO public.product_care_videos(product_id, common_video_url)
SELECT product_id, min(video_url) FROM public.care_video_segments GROUP BY product_id
ON CONFLICT (product_id, model_id) DO NOTHING;
UPDATE public.care_video_segments SET individual_video_url = video_url;
CREATE OR REPLACE FUNCTION public.validate_product_care_video() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 IF NEW.video_duration IS NOT NULL AND (NEW.video_duration <= 0 OR NEW.video_duration = 'NaN'::numeric) THEN RAISE EXCEPTION 'Invalid video duration'; END IF;
 IF NEW.shared_product_id = NEW.product_id AND NEW.shared_model_id = NEW.model_id THEN RAISE EXCEPTION 'Cannot share with self'; END IF;
 RETURN NEW;
END; $$;
CREATE TRIGGER validate_product_care_video BEFORE INSERT OR UPDATE ON public.product_care_videos FOR EACH ROW EXECUTE FUNCTION public.validate_product_care_video();