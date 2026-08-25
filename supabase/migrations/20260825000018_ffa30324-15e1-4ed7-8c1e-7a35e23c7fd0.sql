CREATE OR REPLACE FUNCTION public.get_top_liked_features(days_back integer, limit_count integer)
RETURNS TABLE(path text, likes bigint)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT
    '/product/' || product_id || '/feature/' || feature_id AS path,
    COUNT(*)::bigint AS likes
  FROM public.feature_reactions
  WHERE created_at >= now() - (days_back || ' days')::interval
  GROUP BY product_id, feature_id
  ORDER BY likes DESC, MAX(created_at) DESC
  LIMIT limit_count;
$$;

GRANT EXECUTE ON FUNCTION public.get_top_liked_features(integer, integer) TO anon;
GRANT EXECUTE ON FUNCTION public.get_top_liked_features(integer, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_top_liked_features(integer, integer) TO service_role;