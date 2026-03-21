export type FeatureKey = "blog" | "work" | "projects" | "consulting" | "connect";
export type ContentCollectionKey = "blog" | "work" | "projects";

type FeatureConfig = {
  enabled: boolean;
  enabledInNav: boolean;
  routePrefix: `/${string}`;
  navLabel: string;
  contentCollection?: ContentCollectionKey;
};

export const FEATURES: Record<FeatureKey, FeatureConfig> = {
  blog: {
    enabled: false,
    enabledInNav: false,
    routePrefix: "/blog",
    navLabel: "blog",
    contentCollection: "blog",
  },
  work: {
    enabled: true,
    enabledInNav: true,
    routePrefix: "/work",
    navLabel: "work",
    contentCollection: "work",
  },
  consulting: {
    enabled: true,
    enabledInNav: true,
    routePrefix: "/consulting",
    navLabel: "consulting",
  },
  connect: {
    enabled: true,
    enabledInNav: false,
    routePrefix: "/connect",
    navLabel: "connect",
  },
  projects: {
    enabled: true,
    enabledInNav: true,
    routePrefix: "/projects",
    navLabel: "projects",
    contentCollection: "projects",
  },
};

export const NAV_FEATURE_ORDER: FeatureKey[] = [
  "blog",
  "work",
  "consulting",
  "connect",
  "projects",
];

export const DISABLED_ROUTE_PREFIXES = Object.values(FEATURES)
  .filter((feature) => !feature.enabled)
  .map((feature) => feature.routePrefix);

export function isFeatureEnabled(feature: FeatureKey): boolean {
  return FEATURES[feature].enabled;
}

export function isFeaturePathEnabled(pathname: string): boolean {
  const normalizedPath = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  if (normalizedPath.length === 0) return true;

  return !DISABLED_ROUTE_PREFIXES.some((prefix) => {
    const normalizedPrefix = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
    return normalizedPath === normalizedPrefix || normalizedPath.startsWith(`${normalizedPrefix}/`);
  });
}
