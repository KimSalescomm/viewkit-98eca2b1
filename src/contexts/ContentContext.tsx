import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  featuresMap as staticFeaturesMap,
  type Feature,
} from "@/data/features";
import { products as staticProducts, type Product } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentStore } from "@/utils/storeId";
import { isAdminStore } from "@/data/branches";

export interface ContentPayload {
  featuresMap: Record<string, Feature[]>;
  products: Product[];
}

interface ContentContextValue {
  featuresMap: Record<string, Feature[]>;
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  getFeaturesByProductId: (productId: string) => Feature[];
  getFeatureById: (productId: string, featureId: string) => Feature | undefined;
  source: "draft" | "published" | "fallback";
  publishedAt: string | null;
  ready: boolean;
}

const STATIC_PAYLOAD: ContentPayload = {
  featuresMap: staticFeaturesMap,
  products: staticProducts,
};

const CACHE_KEY = "viewkit_content_snapshot_v1";

const ContentContext = createContext<ContentContextValue | null>(null);

const buildValue = (
  payload: ContentPayload,
  source: ContentContextValue["source"],
  publishedAt: string | null,
  ready: boolean,
): ContentContextValue => ({
  featuresMap: payload.featuresMap,
  products: payload.products,
  getProductById: (id) => payload.products.find((p) => p.id === id),
  getFeaturesByProductId: (productId) => payload.featuresMap[productId] ?? [],
  getFeatureById: (productId, featureId) =>
    (payload.featuresMap[productId] ?? []).find((f) => f.id === featureId),
  source,
  publishedAt,
  ready,
});

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const store = typeof window !== "undefined" ? getCurrentStore() : null;
  const isAdmin = isAdminStore(store?.slug);

  // SC: always render the draft (code-level data) — no loading state.
  const [state, setState] = useState<{
    payload: ContentPayload;
    source: ContentContextValue["source"];
    publishedAt: string | null;
    ready: boolean;
  }>(() => {
    if (isAdmin) {
      return {
        payload: STATIC_PAYLOAD,
        source: "draft",
        publishedAt: null,
        ready: true,
      };
    }
    // Try cached snapshot for fast first paint.
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as {
          payload: ContentPayload;
          publishedAt: string | null;
        };
        if (cached?.payload?.featuresMap && cached?.payload?.products) {
          return {
            payload: cached.payload,
            source: "published",
            publishedAt: cached.publishedAt ?? null,
            ready: true,
          };
        }
      }
    } catch {
      /* noop */
    }
    return {
      payload: STATIC_PAYLOAD,
      source: "fallback",
      publishedAt: null,
      ready: true,
    };
  });

  useEffect(() => {
    if (isAdmin) return;
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("content_snapshots")
          .select("payload, created_at")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (cancelled) return;
        if (error || !data) return;
        const payload = data.payload as unknown as ContentPayload;
        if (!payload?.featuresMap || !payload?.products) return;
        setState({
          payload,
          source: "published",
          publishedAt: data.created_at,
          ready: true,
        });
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ payload, publishedAt: data.created_at }),
          );
        } catch {
          /* noop */
        }
      } catch {
        /* ignore — keep current state */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  const value = useMemo(
    () => buildValue(state.payload, state.source, state.publishedAt, state.ready),
    [state],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContent = (): ContentContextValue => {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    // Safe fallback — used during early renders or in tests.
    return buildValue(STATIC_PAYLOAD, "draft", null, true);
  }
  return ctx;
};

// Convenience hooks matching the legacy helper signatures.
export const useProducts = () => useContent().products;
export const useFeaturesMap = () => useContent().featuresMap;
