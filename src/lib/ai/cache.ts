import type { LayoutSpec } from "./types";

const cache = new Map<string, { spec: LayoutSpec; expiresAt: number }>();
const TTL_MS = 1000 * 60 * 30;

export function getCachedLayoutSpec(key: string): LayoutSpec | undefined {
  const item = cache.get(key);
  if (!item) return undefined;
  if (item.expiresAt <= Date.now()) {
    cache.delete(key);
    return undefined;
  }
  return item.spec;
}

export function setCachedLayoutSpec(key: string, spec: LayoutSpec) {
  cache.set(key, { spec, expiresAt: Date.now() + TTL_MS });
}
