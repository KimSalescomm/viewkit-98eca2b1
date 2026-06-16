DROP POLICY IF EXISTS "Anyone can insert screensaver videos" ON public.screensaver_videos;
DROP POLICY IF EXISTS "Anyone can update screensaver videos" ON public.screensaver_videos;
DROP POLICY IF EXISTS "Anyone can delete screensaver videos" ON public.screensaver_videos;
REVOKE INSERT, UPDATE, DELETE ON public.screensaver_videos FROM anon, authenticated;