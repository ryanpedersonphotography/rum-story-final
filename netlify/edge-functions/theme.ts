// netlify/edge-functions/theme.ts
import type { Context } from "https://edge.netlify.com";

const THEME_COOKIES = ['rr.theme', 'theme'] as const
const BRAND_COOKIES = ['rr.brand', 'brand'] as const

function readCookieValue(source: string, keys: readonly string[], fallback: string) {
  const parts = source.split(';').map((s) => s.trim())
  for (const key of keys) {
    const match = parts.find((entry) => entry.startsWith(`${key}=`))
    if (match) {
      const value = match.split('=')[1]
      if (value) return value
    }
  }
  return fallback
}

export default async (req: Request, ctx: Context) => {
  const url = new URL(req.url);
  
  // Skip for static assets
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
    return ctx.next();
  }
  
  // Get cookies
  const cookies = req.headers.get("cookie") || "";
  const theme = readCookieValue(cookies, THEME_COOKIES, "light");
  const brand = readCookieValue(cookies, BRAND_COOKIES, "romantic");

  const res = await ctx.next(); // render page
  
  // Only process HTML responses
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    return res;
  }

  // Inject data-theme and data-brand on <html> to prevent FOUC
  const html = await res.text();
  
  // Determine actual theme (no system preference handling for simplicity)
  const actualTheme = theme;
  
  const patched = html.replace(
    /<html([^>]*)>/i,
    `<html$1 data-theme="${actualTheme}" data-brand="${brand}" suppressHydrationWarning>`
  );

  return new Response(patched, {
    status: res.status,
    headers: res.headers
  });
};

export const config = {
  path: "/*"
};