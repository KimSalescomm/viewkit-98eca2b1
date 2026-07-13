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

// 스냅샷이 없거나 실패했을 때 지점 계정에서 활성화할 기본 제품 목록
export const DEFAULT_VISIBLE_PRODUCT_IDS = [
  "subscription",
  "vacuum",
  "refrigerator",
  "airconditioner",
  "washer",
];

export interface VisibilityPayload {
  visibleProductIds: string[];
}

interface ContentContextValue {
  featuresMap: Record<string, Feature[]>;
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  getFeaturesByProductId: (productId: string) => Feature[];
  getFeatureById: (productId: string, featureId: string) => Feature | undefined;
  /** 지점 계정에서 활성화(강조·클릭 가능) 노출할 제품 id 집합. SC는 전체. */
  visibleProductIds: string[];
  source: "draft" | "published" | "fallback";
  publishedAt: string | null;
  ready: boolean;
}

const CACHE_KEY = "viewkit_visibility_snapshot_v1";

const ContentContext = createContext<ContentContextValue | null>(null);

const buildValue = (
  visibleProductIds: string[],
  source: ContentContextValue["source"],
  publishedAt: string | null,
  ready: boolean,
  isAdmin: boolean,
): ContentContextValue => {
  const filterFeatures = (list: Feature[]) =>
    list.filter((f) => !f.disabled && (isAdmin || !f.scOnly));
  return {
    featuresMap: staticFeaturesMap,
    products: staticProducts,
    getProductById: (id) => staticProducts.find((p) => p.id === id),
    getFeaturesByProductId: (productId) =>
      filterFeatures(staticFeaturesMap[productId] ?? []),
    getFeatureById: (productId, featureId) =>
      filterFeatures(staticFeaturesMap[productId] ?? []).find((f) => f.id === featureId),
    visibleProductIds,
    source,
    publishedAt,
    ready,
  };
};

const parseVisibility = (raw: unknown): string[] | null => {
  if (!raw || typeof raw !== "object") return null;
  const list = (raw as { visibleProductIds?: unknown }).visibleProductIds;
  if (!Array.isArray(list)) return null;
  const ids = list.filter((v): v is string => typeof v === "string" && v.length > 0);
  return ids.length > 0 ? ids : [];
};

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const store = typeof window !== "undefined" ? getCurrentStore() : null;
  const isAdmin = isAdminStore(store?.slug);

  // SC(관리자): 항상 전체 제품 노출 (구독 가상 카드 포함)
  const [state, setState] = useState<{
    visibleProductIds: string[];
    source: ContentContextValue["source"];
    publishedAt: string | null;
    ready: boolean;
  }>(() => {
    if (isAdmin) {
      return {
        visibleProductIds: Array.from(
          new Set([...DEFAULT_VISIBLE_PRODUCT_IDS, ...staticProducts.map((p) => p.id)]),
        ),
        source: "draft",
        publishedAt: null,
        ready: true,
      };
    }
    // 캐시된 visibility 우선 사용 → 첫 페인트 빠르게
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as {
          visibleProductIds?: string[];
          publishedAt: string | null;
        };
        if (Array.isArray(cached.visibleProductIds)) {
          return {
            visibleProductIds: cached.visibleProductIds,
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
      visibleProductIds: DEFAULT_VISIBLE_PRODUCT_IDS,
      source: "fallback",
      publishedAt: null,
      ready: true,
    };
  });

  useEffect(() => {
    if (isAdmin) return;
    let cancelled = false;

    const fetchLatest = async () => {
      try {
        const { data, error } = await supabase
          .from("content_snapshots")
          .select("payload, created_at")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (cancelled || error || !data) return;

        const visible = parseVisibility(data.payload);
        // 이전 형태(featuresMap/products) 스냅샷이면 visibility 정보가 없음 → 기본값 유지
        if (!visible) return;

        setState({
          visibleProductIds: visible,
          source: "published",
          publishedAt: data.created_at,
          ready: true,
        });
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              visibleProductIds: visible,
              publishedAt: data.created_at,
            }),
          );
        } catch {
          /* noop */
        }
      } catch {
        /* ignore */
      }
    };

    fetchLatest();

    // 실시간 구독: 스냅샷 새로 저장되면 즉시 반영 (원고가 아니므로 새로고침 불필요)
    const channel = supabase
      .channel("content_snapshots_changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "content_snapshots" },
        () => {
          fetchLatest();
        },
      )
      .subscribe();

    const pollId = window.setInterval(fetchLatest, 60_000);
    const onFocus = () => fetchLatest();
    const onVisibility = () => {
      if (document.visibilityState === "visible") fetchLatest();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      window.clearInterval(pollId);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const value = useMemo(
    () =>
      buildValue(
        state.visibleProductIds,
        state.source,
        state.publishedAt,
        state.ready,
        isAdmin,
      ),
    [state, isAdmin],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContent = (): ContentContextValue => {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    return buildValue(
      Array.from(
        new Set([...DEFAULT_VISIBLE_PRODUCT_IDS, ...staticProducts.map((p) => p.id)]),
      ),
      "draft",
      null,
      true,
    );
  }
  return ctx;
};

// 편의 훅
export const useProducts = () => useContent().products;
export const useFeaturesMap = () => useContent().featuresMap;
