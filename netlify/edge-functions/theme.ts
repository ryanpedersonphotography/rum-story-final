// netlify/edge-functions/theme.ts
// Production-ready theme detection for Rum River Barn
import type { Context } from "https://edge.netlify.com";

interface ThemeConfig {
  theme: 'light' | 'dark';
  brand: 'romantic' | 'modern';
  source: 'cookie' | 'query' | 'default';
}

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  cookieHeader.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[name] = decodeURIComponent(value);
    }
  });
  return cookies;
}

function detectThemePreferences(request: Request): ThemeConfig {
  const url = new URL(request.url);
  const cookies = parseCookies(request.headers.get('cookie') || '');

  // Priority 1: Query parameters (for preview/testing)
  const themeParam = url.searchParams.get('theme');
  const brandParam = url.searchParams.get('brand');
  if (themeParam === 'dark' || themeParam === 'light') {
    return {
      theme: themeParam,
      brand: brandParam === 'modern' ? 'modern' : 'romantic',
      source: 'query'
    };
  }

  // Priority 2: Cookies (user preference)
  const theme = cookies['rr.theme'] === 'dark' ? 'dark' : 'light';
  const brand = cookies['rr.brand'] === 'modern' ? 'modern' : 'romantic';
  
  return {
    theme,
    brand,
    source: cookies['rr.theme'] ? 'cookie' : 'default'
  };
}

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  
  // Skip processing for static assets
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp|avif|mp4|pdf)$/)) {
    return context.next();
  }
  
  // Skip API routes
  if (url.pathname.startsWith('/api/')) {
    return context.next();
  }

  const themeConfig = detectThemePreferences(request);
  const response = await context.next();
  
  // Only process HTML responses
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  // Transform HTML to include theme attributes
  const html = await response.text();
  const transformedHtml = html.replace(
    /<html([^>]*)>/i,
    `<html$1 data-theme="${themeConfig.theme}" data-brand="${themeConfig.brand}" suppressHydrationWarning>`
  );

  return new Response(transformedHtml, {
    status: response.status,
    headers: response.headers
  });
};

export const config = {
  path: "/*"
};