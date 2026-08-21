CREATE OR REPLACE FUNCTION public.get_popular_features(
  days_back integer DEFAULT 30,
  limit_count integer DEFAULT 5
)
RETURNS TABLE(path text, views bigint)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT
    path,
    COUNT(*)::bigint AS views
  FROM public.page_views
  WHERE created_at >= (now() - (days_back || ' days')::interval)
    AND path ~ '^/product/[^/]+/feature/[^/]+$'
  GROUP BY path
  ORDER BY views DESC, path
  LIMIT limit_count;
$$;

GRANT EXECUTE ON FUNCTION public.get_popular_features(integer, integer) TO anon;
GRANT EXECUTE ON FUNCTION public.get_popular_features(integer, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_popular_features(integer, integer) TO service_role;