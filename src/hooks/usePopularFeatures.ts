import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PopularFeature {
  path: string;
  views: number;
  productId: string;
  featureId: string;
}

interface UsePopularFeaturesOptions {
  days?: number;
  limit?: number;
  enabled?: boolean;
}

const PATH_REGEX = /^\/product\/([^/]+)\/feature\/([^/]+)$/;

export const usePopularFeatures = (options: UsePopularFeaturesOptions = {}) => {
  const { days = 30, limit = 5, enabled = true } = options;
  const [items, setItems] = useState<PopularFeature[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled) {
      setItems([]);
      return;
    }

    let cancelled = false;
    const fetchPopular = async () => {
      setLoading(true);
      setError(null);
      try {
        const [
          { data: viewData, error: viewError },
          { data: likeData, error: likeError },
        ] = await Promise.all([
          supabase.rpc("get_popular_features", {
            days_back: days,
            limit_count: limit,
          }),
          supabase.rpc("get_top_liked_features", {
            days_back: days,
            limit_count: 2,
          }),
        ]);

        if (viewError) throw viewError;
        if (likeError) throw likeError;

        const parseRows = (rows: { path: string; views?: number; likes?: number }[]) =>
          (rows || [])
            .map((row) => {
              const match = row.path.match(PATH_REGEX);
              if (!match) return null;
              return {
                path: row.path,
                views: Number(row.views ?? 0),
                productId: match[1],
                featureId: match[2],
              };
            })
            .filter((item): item is PopularFeature => item !== null);

        const liked = parseRows(likeData || []);
        const viewed = parseRows(viewData || []);

        const likedPaths = new Set(liked.map((item) => item.path));
        const remaining = viewed.filter((item) => !likedPaths.has(item.path));

        const combined = [...liked, ...remaining].slice(0, limit);

        if (!cancelled) setItems(combined);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPopular();
    return () => {
      cancelled = true;
    };
  }, [days, limit, enabled]);

  return { items, loading, error };
};
