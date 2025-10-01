// utils/asset.ts
export function asset(p: string): string {
    if (/^(?:https?:)?\/\//.test(p) || /^(?:data:|blob:)/.test(p)) return p;
    const base = (import.meta.env.BASE_URL ?? "/").replace(/\/+$/, "");
    const rel  = (p ?? "").replace(/^\/+/, "");
    return `${base}/${rel}`;
  }
  