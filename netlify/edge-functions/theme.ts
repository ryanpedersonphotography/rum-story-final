// netlify/edge-functions/theme.ts
import type { Context } from "https://edge.netlify.com";

export default async function handler(req: Request, ctx: Context) {
  const res = await ctx.next();
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("text/html")) return res;

  const cookies = parseCookies(req.headers.get("cookie") || "");
  const theme = cookies["rr.theme"] === "dark" ? "dark" : "light";
  const brand = cookies["rr.brand"] === "modern" ? "modern" : "romantic";

  const html = await res.text();
  const injected = html.replace("<html", `<html data-theme="${theme}" data-brand="${brand}"`);

  return new Response(injected, { status: res.status, headers: res.headers });
}

export const config = {
  path: ["/*"],
  excludedPath: ["/api/*", "/_next/*", "/images/*", "/fonts/*"]
};

function parseCookies(raw: string) {
  return Object.fromEntries(
    raw.split(";")
      .map(p => p.trim().split("=").map(decodeURIComponent))
      .filter(([k]) => k)
  );
}