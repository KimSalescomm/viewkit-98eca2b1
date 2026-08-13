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
  "tv",
  "refrigerator",
  "washer",
  "airconditioner",
  "vacuum",
];

export interface VisibilityPayload {
  visibleProductIds: string[];
}

/** 실제 코드에 존재하는 제품 id만 노출 후보로 인정 (가상 카드 '구독' 포함) */
const KNOWN_PRODUCT_IDS = new Set<string>([
  "subscription",
  ...staticProducts.map((p) => p.id),
]);
/** 지점 계정에 절대 노출하지 않는 내부/미사용 제품 */
const NEVER_VISIBLE_PRODUCT_IDS = new Set<string>(["pc"]);
/** 대외비 제품: 내부 계정(SC/KOR)에서만 열람 가능 */
const CONFIDENTIAL_PRODUCT_IDS = new Set<string>(["bathair", "washcombo"]);

/** 스냅샷·캐시에 남아있는 오래된/알 수 없는 id를 걸러냅니다. */
const sanitizeVisibleIds = (ids: string[]): string[] =>
  Array.from(
    new Set(
      ids.filter(
        (id) => KNOWN_PRODUCT_IDS.has(id) && !NEVER_VISIBLE_PRODUCT_IDS.has(id),
      ),
    ),
  );

interface ContentContextValue {
  featuresMap: Record<string, Feature[]>;
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  getFeaturesByProductId: (productId: string) => Feature[];
  getFeatureById: (productId: string, featureId: string) => Feature | undefined;
  /** 지점 계정에서 활성화(강조·클릭 가능) 노출할 제품 id 집합. SC는 전체. */
  visibleProductIds: string[];
  /** 해당 제품을 현재 계정에서 열어볼 수 있는지 (지점 계정은 노출 목록 기준) */
  isProductVisible: (productId: string) => boolean;
  source: "draft" | "published" | "fallback";
  publishedAt: string | null;
  ready: boolean;
}

// 기본 노출 세트/필터 로직 변경 시 이전 지점 캐시가 남지 않도록 버전을 올립니다.
const CACHE_KEY = "viewkit_visibility_snapshot_v5";
// 캐시 유효 시간: 30분 (퍼블리시 변경이 빠르게 반영되도록)
const CACHE_TTL_MS = 30 * 60 * 1000;

const ContentContext = createContext<ContentContextValue | null>(null);

const buildValue = (
  visibleProductIds: string[],
  source: ContentContextValue["source"],
  publishedAt: string | null,
  ready: boolean,
  isAdmin: boolean,
  isInternal: boolean = isAdmin,
): ContentContextValue => {
  const filterFeatures = (list: Feature[]) =>
    list.filter((f) => !f.disabled && (isAdmin || !f.scOnly));
  const visible = isAdmin ? visibleProductIds : sanitizeVisibleIds(visibleProductIds);
  return {
    featuresMap: staticFeaturesMap,
    products: staticProducts,
    getProductById: (id) => staticProducts.find((p) => p.id === id),
    getFeaturesByProductId: (productId) =>
      filterFeatures(staticFeaturesMap[productId] ?? []),
    getFeatureById: (productId, featureId) =>
      filterFeatures(staticFeaturesMap[productId] ?? []).find((f) => f.id === featureId),
    visibleProductIds: visible,
    isProductVisible: (productId) =>
      isAdmin ||
      visible.includes(productId) ||
      (isInternal && CONFIDENTIAL_PRODUCT_IDS.has(productId)),
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
  return sanitizeVisibleIds(ids);
};


/** URL의 store_id(?store_id=SC)를 최우선으로, 없으면 저장된 매장 코드를 사용 */
const resolveCurrentSlug = (): string => {
  if (typeof window === "undefined") return "";
  try {
    const fromUrl = new URLSearchParams(window.location.search)
      .get("store_id")
      ?.trim()
      .toUpperCase();
    if (fromUrl) return fromUrl;
  } catch {
    /* noop */
  }
  return (getCurrentStore()?.slug || "").toUpperCase();
};

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [slug, setSlug] = useState<string>(() => resolveCurrentSlug());

  // URL/저장값이 늦게 반영되는 경우(첫 진입 직후)에도 관리자 판정이 갱신되도록 감시
  useEffect(() => {
    const sync = () => {
      const next = resolveCurrentSlug();
      setSlug((prev) => (prev === next ? prev : next));
    };
    sync();
    const id = window.setInterval(sync, 1000);
    window.addEventListener("popstate", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("popstate", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isAdmin = isAdminStore(slug);
  // 내부 계정(SC/KOR): 대외비 제품도 열람 가능
  const isInternal = isAdmin || slug === "KOR";

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
    // 캐시된 visibility 우선 사용 → 첫 페인트 빠르게 (단, 6시간 이내 캐시만 신뢰)
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as {
          visibleProductIds?: string[];
          publishedAt: string | null;
          cachedAt?: number;
        };
        const fresh =
          typeof cached.cachedAt === "number" &&
          Date.now() - cached.cachedAt < CACHE_TTL_MS;
        if (Array.isArray(cached.visibleProductIds) && fresh) {
          return {
            visibleProductIds: sanitizeVisibleIds(cached.visibleProductIds),
            source: "published",
            publishedAt: cached.publishedAt ?? null,
            ready: true,
          };
        }
        if (!fresh) localStorage.removeItem(CACHE_KEY);
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

  // 관리자(SC) 판정이 뒤늦게 확정되어도 전체 제품이 노출되도록 상태를 승격
  useEffect(() => {
    if (!isAdmin) return;
    setState({
      visibleProductIds: Array.from(
        new Set([...DEFAULT_VISIBLE_PRODUCT_IDS, ...staticProducts.map((p) => p.id)]),
      ),
      source: "draft",
      publishedAt: null,
      ready: true,
    });
  }, [isAdmin]);

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
              cachedAt: Date.now(),
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
        isInternal,
      ),
    [state, isAdmin, isInternal],
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
      true,
    );
  }
  return ctx;
};

// 편의 훅
export const useProducts = () => useContent().products;
export const useFeaturesMap = () => useContent().featuresMap;
