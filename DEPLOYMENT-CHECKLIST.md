# Production Deployment Checklist
## Rum River Wedding Venue - Netlify + Next.js 15
**Ready-to-run implementation guide with production fixes**

---

## 🎯 Deployment Path Decision

**Choose your deployment strategy first:**

### ✅ **Option A: SSR/ISR + Edge Functions (Recommended)**
- Server-side rendering with dynamic content
- Edge Functions for theme injection
- ISR for content caching and revalidation
- Netlify Functions for API routes

### ❌ **Option B: Static Export**
- Fully static site (no server functions)
- No Edge Functions, no ISR
- Use only if you need CDN-only hosting

**This checklist assumes Option A (SSR/ISR + Edge)**

---

## 📋 Implementation Checklist

### **1. Core Configuration Files**

#### ✅ **netlify.toml - Production Ready**
```toml
# SSR/ISR + Edge Functions configuration
[build]
  command = "npm ci && npm run build"
  # NOTE: No 'publish' directive - let Netlify Next runtime handle outputs

[build.environment]
  NODE_VERSION = "18.17.0"
  NEXT_TELEMETRY_DISABLED = "1"

# Edge Functions registration
[[edge_functions]]
  path = "/*"
  function = "theme"

# Production Security Headers
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self' https:; script-src 'self' https://app.storyblok.com 'nonce-theme-init'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: https://a.storyblok.com https://images.unsplash.com https://images.ctfassets.net; connect-src 'self' https://api.storyblok.com; frame-src 'self' https://app.storyblok.com; frame-ancestors 'none';"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

# Static Asset Caching (optional - Next runtime handles most of this)
[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Image Caching with Stale-While-Revalidate
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=2592000, stale-while-revalidate=86400"
```

**Action Items:**
- [ ] Replace current `netlify.toml` with production version above
- [ ] Remove `publish = ".next"` line (let runtime handle it)
- [ ] Add `[[edge_functions]]` block for theme handler
- [ ] Update CSP with proper image domains for Storyblok

---

#### ✅ **Edge Function - Safe Theme Detection**
```typescript
// netlify/edge-functions/theme.ts
import type { Context } from "https://edge.netlify.com";

interface ThemeConfig {
  theme: 'light' | 'dark';
  brand: 'romantic' | 'modern';
  source: 'cookie' | 'query' | 'default';
}

export default async function themeHandler(request: Request, context: Context) {
  const response = await context.next();
  
  // Only process HTML responses
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }
  
  const themeConfig = detectThemePreferences(request);
  const html = await response.text();
  
  // Inject theme attributes before first paint
  const themedHtml = html.replace(
    '<html',
    `<html data-theme="${themeConfig.theme}" data-brand="${themeConfig.brand}"`
  );
  
  return new Response(themedHtml, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

function detectThemePreferences(request: Request): ThemeConfig {
  const url = new URL(request.url);
  const cookies = parseCookies(request.headers.get('cookie') || '');
  
  // Priority: Query param (debug) → Cookie → Default
  const queryTheme = url.searchParams.get('theme');
  const queryBrand = url.searchParams.get('brand');
  
  const theme = (queryTheme === 'dark' || queryTheme === 'light') 
    ? queryTheme 
    : (cookies['rr.theme'] === 'dark' ? 'dark' : 'light');
    
  const brand = (queryBrand === 'modern' || queryBrand === 'romantic')
    ? queryBrand
    : (cookies['rr.brand'] === 'modern' ? 'modern' : 'romantic');
  
  return { 
    theme, 
    brand, 
    source: queryTheme ? 'query' : cookies['rr.theme'] ? 'cookie' : 'default'
  };
}

function parseCookies(cookieHeader: string): Record<string, string> {
  return Object.fromEntries(
    cookieHeader
      .split(';')
      .map(pair => pair.trim().split('=').map(decodeURIComponent))
      .filter(([key]) => key)
  );
}

// Edge function configuration
export const config = {
  path: ["/*"],
  excludedPath: [
    "/api/*",
    "/_next/*", 
    "/images/*",
    "/fonts/*"
  ]
};
```

**Action Items:**
- [ ] Create `netlify/edge-functions/theme.ts` with safe detection logic
- [ ] Remove User-Agent based dark mode detection (doesn't work)
- [ ] Add query parameter support for debug/testing (?theme=dark&brand=modern)
- [ ] Test cookie parsing with multiple values

---

#### ✅ **next.config.mjs - Secure Environment**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build optimizations
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: process.env.NODE_ENV === 'production' },
  
  // Image optimization with Storyblok domains
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'a.storyblok.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 's3.amazonaws.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.ctfassets.net', pathname: '/**' },
    ],
  },
  
  // SECURITY: Only expose NEXT_PUBLIC_* to client bundle
  env: {
    // Client-side (Visual Editor needs this)
    NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
    
    // Do NOT expose server-only tokens:
    // STORYBLOK_PREVIEW_TOKEN - server only
    // STORYBLOK_MANAGEMENT_TOKEN - server only  
    // STORYBLOK_WEBHOOK_SECRET - server only
  },
  
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    compiler: {
      removeConsole: true, // Remove console.log in production
    },
    experimental: {
      optimizeCss: true,   // CSS optimization
    }
  }),
};

export default nextConfig;
```

**Action Items:**
- [ ] Update next.config.mjs with secure environment exposure
- [ ] Add Storyblok image domains to `remotePatterns`
- [ ] Remove server-only tokens from `env` block
- [ ] Enable production optimizations (removeConsole, optimizeCss)

---

### **2. Environment Variables Setup**

#### ✅ **Netlify Environment Configuration**
```bash
# Server-side only (never exposed to client)
netlify env:set STORYBLOK_PREVIEW_TOKEN "sb-****-preview"
netlify env:set STORYBLOK_MANAGEMENT_TOKEN "sb-****-management"  
netlify env:set STORYBLOK_WEBHOOK_SECRET "webhook-****"

# Client-side (Visual Editor needs this)
netlify env:set NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN "sb-****-preview"

# Build configuration
netlify env:set NODE_VERSION "18.17.0"
netlify env:set NEXT_TELEMETRY_DISABLED "1"
netlify env:set NODE_ENV "production"
```

**Action Items:**
- [ ] Set server-only tokens (no NEXT_PUBLIC prefix)
- [ ] Set client token (WITH NEXT_PUBLIC prefix for Visual Editor)
- [ ] Verify no secrets leak to client bundle: check Network tab → JS files
- [ ] Test Visual Editor works with client token

---

### **3. Pre-paint Script Enhancement**

#### ✅ **Nonce-based CSP Compliance**
```javascript
// src/app/layout.js - Enhanced pre-paint script
const themeInitScript = `
(function(){
  try {
    var d = document.documentElement;
    var params = new URLSearchParams(window.location.search);
    
    // URL parameter override (debug)
    var themeOverride = params.get('theme');
    var brandOverride = params.get('brand');
    
    // Apply overrides and save to localStorage
    if (themeOverride && (themeOverride === 'light' || themeOverride === 'dark')) {
      d.setAttribute('data-theme', themeOverride);
      localStorage.setItem('rr.theme', themeOverride);
    }
    
    if (brandOverride && (brandOverride === 'romantic' || brandOverride === 'modern')) {
      d.setAttribute('data-brand', brandOverride);
      localStorage.setItem('rr.brand', brandOverride);
    }
    
    // OS preference fallback (if no cookie/query)
    if (!d.getAttribute('data-theme') && window.matchMedia) {
      var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (prefersDark) {
        d.setAttribute('data-theme', 'dark');
        localStorage.setItem('rr.theme', 'dark');
      } else if (prefersLight) {
        d.setAttribute('data-theme', 'light');
        localStorage.setItem('rr.theme', 'light');
      }
    }
  } catch(e) {
    console.warn('Theme init failed:', e);
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script 
          nonce="theme-init" 
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body>
        {/* ... */}
      </body>
    </html>
  );
}
```

**Action Items:**
- [ ] Add nonce to script tag for CSP compliance
- [ ] Test OS preference detection works on first visit
- [ ] Verify URL parameters override saved preferences
- [ ] Confirm no flash of unstyled content (FOUC)

---

### **4. API Routes for Content Management**

#### ✅ **Health Check with Storyblok Ping**
```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const startTime = Date.now();
  
  try {
    // Ping Storyblok CDN to test connectivity
    const storyblokResponse = await fetch('https://api.storyblok.com/v1/cdn/stories?token=' + process.env.STORYBLOK_PREVIEW_TOKEN + '&version=published', {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    
    const storyblokLatency = Date.now() - startTime;
    
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || 'unknown',
      environment: process.env.NODE_ENV,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      storyblok: {
        connected: storyblokResponse.ok,
        latency: storyblokLatency,
        status: storyblokResponse.status
      }
    };
    
    return NextResponse.json(health, { 
      status: storyblokResponse.ok ? 200 : 503 
    });
    
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: error.message,
        timestamp: new Date().toISOString()
      }, 
      { status: 503 }
    );
  }
}
```

#### ✅ **Webhook Handler with Signature Validation**
```typescript
// src/app/api/revalidate/route.ts
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createHmac } from 'crypto';

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('webhook-signature');
    const body = await request.text();
    
    // Validate Storyblok webhook signature
    if (!validateSignature(body, signature)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const payload = JSON.parse(body);
    const { story, action } = payload;
    
    // Selective revalidation based on story
    if (story?.full_slug === 'home') {
      revalidatePath('/');
    } else if (story?.full_slug) {
      revalidatePath(`/${story.full_slug}`);
    }
    
    // Major content changes trigger full rebuild via build hook
    if (action === 'published' && story?.is_startpage) {
      await triggerBuildHook();
    }
    
    return NextResponse.json({ 
      revalidated: true,
      story: story?.full_slug,
      action,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Revalidation failed' }, 
      { status: 500 }
    );
  }
}

function validateSignature(body: string, signature: string | null): boolean {
  if (!signature || !process.env.STORYBLOK_WEBHOOK_SECRET) {
    return false;
  }
  
  const expectedSignature = createHmac('sha256', process.env.STORYBLOK_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');
    
  return signature === expectedSignature;
}

async function triggerBuildHook() {
  if (process.env.NETLIFY_BUILD_HOOK) {
    await fetch(process.env.NETLIFY_BUILD_HOOK, { method: 'POST' });
  }
}
```

**Action Items:**
- [ ] Implement health check API with Storyblok connectivity test
- [ ] Add webhook signature validation for security
- [ ] Set up build hook URL in environment variables
- [ ] Test revalidation with Storyblok content changes

---

### **5. Build Hooks & Webhook Setup**

#### ✅ **Create Netlify Build Hook**
```bash
# Create build hook via CLI
netlify api createSiteBuildHook --site-id="YOUR_SITE_ID" --data='{"title": "Storyblok Content Update", "branch": "main"}'

# Or via API
curl -X POST https://api.netlify.com/api/v1/sites/YOUR_SITE_ID/build_hooks \
  -H "Authorization: Bearer YOUR_NETLIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Storyblok Content Update", "branch": "main"}'

# Add to environment
netlify env:set NETLIFY_BUILD_HOOK "https://api.netlify.com/build_hooks/BUILD_HOOK_ID"
```

#### ✅ **Configure Storyblok Webhooks**
**Location**: Storyblok Space Settings → Webhooks

| Event | Endpoint | Secret | Purpose |
|-------|----------|--------|---------|
| story.published | `https://api.netlify.com/build_hooks/BUILD_HOOK_ID` | none | Full rebuild |
| story.unpublished | `https://rum-story-final.netlify.app/api/revalidate` | webhook secret | ISR revalidation |
| story.moved | `https://rum-story-final.netlify.app/api/revalidate` | webhook secret | Path updates |

**Action Items:**
- [ ] Create build hook and save URL to environment
- [ ] Configure Storyblok webhooks with proper endpoints
- [ ] Generate webhook secret and add to environment
- [ ] Test webhook delivery with content changes

---

### **6. Deployment Testing & Rollback**

#### ✅ **Deployment Commands**
```bash
# Deploy and monitor
netlify deploy --prod --message="Production deployment with fixes"

# List recent deployments
netlify deploy:list --prod

# Health check after deployment
curl https://rum-story-final.netlify.app/api/health | jq

# Performance check
lighthouse https://rum-story-final.netlify.app --only-categories=performance --output=json --quiet
```

#### ✅ **Rollback Procedures**
```bash
# Emergency rollback via CLI
netlify deploy:list --prod
netlify deploy:restore --id PREVIOUS_DEPLOY_ID

# Git-based rollback
git log --oneline -5
git revert HEAD
git push origin main  # Triggers new deployment

# Manual rollback via web UI
# Visit: https://app.netlify.com/projects/rum-story-final/deploys
# Click on previous deploy → "Publish deploy"
```

**Action Items:**
- [ ] Test deployment process end-to-end
- [ ] Verify health endpoint returns 200 after deployment
- [ ] Practice rollback procedures in staging
- [ ] Document emergency contact for deployment issues

---

### **7. Performance & Security Validation**

#### ✅ **Performance Checklist**
```bash
# Core Web Vitals check
lighthouse https://rum-story-final.netlify.app \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json \
  --chrome-flags="--headless"

# Bundle size analysis
npm run build
npx next-bundle-analyzer

# Cache validation
curl -I https://rum-story-final.netlify.app/_next/static/css/app.css
# Should return: Cache-Control: public, max-age=31536000, immutable

# Theme switching test
curl -H "Cookie: rr.theme=dark; rr.brand=modern" https://rum-story-final.netlify.app
# Should contain: <html data-theme="dark" data-brand="modern"
```

#### ✅ **Security Validation**
```bash
# CSP header check
curl -I https://rum-story-final.netlify.app | grep -i content-security-policy

# HTTPS redirect test
curl -I http://rum-story-final.netlify.app
# Should return: 301 redirect to https://

# Security headers scan
curl -I https://rum-story-final.netlify.app | grep -E "X-Content-Type-Options|X-Frame-Options|Referrer-Policy"
```

**Action Items:**
- [ ] Achieve Lighthouse Performance score >90
- [ ] Verify all security headers present
- [ ] Test HTTPS redirect works
- [ ] Confirm CSP doesn't break functionality

---

## ✅ **Final Pre-Production Checklist**

### **Infrastructure**
- [ ] Edge function registered and working (`[[edge_functions]]` in netlify.toml)
- [ ] Environment variables set correctly (server vs client tokens)
- [ ] Build hook created and Storyblok webhooks configured
- [ ] Health check API responding with Storyblok connectivity

### **Performance**
- [ ] CSS bundle size < 150KB compressed
- [ ] LCP (Largest Contentful Paint) < 2 seconds
- [ ] No FOUC (Flash of Unstyled Content)
- [ ] Images optimized and cached properly

### **Security**
- [ ] CSP headers configured without unsafe-eval
- [ ] No server tokens exposed to client bundle
- [ ] Webhook signatures validated
- [ ] HTTPS enforced with proper redirects

### **Content Management**
- [ ] Visual Editor working with NEXT_PUBLIC token
- [ ] Content updates trigger appropriate revalidation/rebuilds
- [ ] ISR working for dynamic content updates
- [ ] Fallback content displays if Storyblok unavailable

### **Monitoring & Recovery**
- [ ] Health check endpoint monitoring external services
- [ ] Rollback procedures tested and documented
- [ ] Performance budgets enforced in CI
- [ ] Error tracking configured (optional: Sentry)

---

## 🚀 **Ready for Production**

Once all checklist items are complete:

1. **Final deployment**: `netlify deploy --prod`
2. **Smoke test**: Visit site, test theme switching, check Visual Editor
3. **Performance validation**: Run Lighthouse, confirm Core Web Vitals
4. **Monitor**: Watch health endpoint, check error rates
5. **Document**: Update team on new deployment architecture

**Emergency contacts**: Document who can perform rollbacks and access Netlify/Storyblok admin panels.

---

*This checklist ensures production-ready deployment with zero-downtime updates, proper security, and optimal performance for the Rum River Wedding Venue website.*