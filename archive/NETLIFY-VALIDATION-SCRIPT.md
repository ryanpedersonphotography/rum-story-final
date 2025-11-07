# Netlify Validation Script
**Production Deployment Verification for Rum River Wedding Venue**

This script provides comprehensive testing commands to verify your Netlify deployment meets all SRS requirements and production standards.

---

## Pre-Deploy Local Testing

### 1. Build Verification
```bash
# Clean install and build (matches Netlify exactly)
npm ci && npm run build

# Verify build artifacts
ls -la .next/
ls -la netlify/edge-functions/

# Test local dev environment
netlify dev
```

### 2. Edge Function Testing
```bash
# Test theme detection locally
curl -H "Cookie: rr.theme=dark; rr.brand=modern" http://localhost:8888/
curl "http://localhost:8888/?theme=light&brand=romantic"

# Verify no user-agent dependency
curl -H "User-Agent: random-bot" http://localhost:8888/
```

---

## Post-Deploy Production Validation

### 3. Site Health Checks
```bash
# Basic connectivity
curl -I https://rum-story-final.netlify.app/

# Health endpoint
curl https://rum-story-final.netlify.app/api/health
# Expected: {"status": "healthy", "timestamp": "...", "version": "1.0.0"}

# Sitemap accessibility
curl https://rum-story-final.netlify.app/sitemap.xml
```

### 4. Edge Function Validation
```bash
SITE_URL="https://rum-story-final.netlify.app"

# Test default theme application
curl -s "$SITE_URL/" | grep -o 'data-theme="[^"]*"'
# Expected: data-theme="light"

# Test cookie-based theme switching
curl -s -H "Cookie: rr.theme=dark" "$SITE_URL/" | grep -o 'data-theme="[^"]*"'
# Expected: data-theme="dark"

# Test query parameter override
curl -s "$SITE_URL/?theme=dark&brand=modern" | grep -o 'data-theme="[^"]*"'
# Expected: data-theme="dark"

# Test brand persistence
curl -s -H "Cookie: rr.brand=modern" "$SITE_URL/" | grep -o 'data-brand="[^"]*"'
# Expected: data-brand="modern"
```

### 5. Security Headers Validation
```bash
# Content Security Policy
curl -I "$SITE_URL/" | grep -i "content-security-policy"
# Expected: script-src 'self' 'unsafe-inline' app.storyblok.com

# Security headers suite
curl -I "$SITE_URL/" | grep -E "(x-frame-options|x-content-type-options|referrer-policy)"
# Expected: X-Frame-Options: DENY, etc.

# HSTS verification
curl -I "$SITE_URL/" | grep -i "strict-transport-security"
```

### 6. Storyblok Integration Testing
```bash
# Content delivery verification
curl -s "$SITE_URL/" | grep -o "storyblok" | wc -l
# Expected: > 0 (Storyblok content present)

# Visual Editor capability
curl -s "$SITE_URL/?_storyblok=123" | grep -o "storyblok-toolbar"
# Expected: Visual Editor assets loaded

# API route functionality
curl -X POST "$SITE_URL/api/revalidate" \
  -H "Content-Type: application/json" \
  -d '{"story": {"id": 123}}'
# Expected: {"revalidated": true} or webhook signature error
```

---

## Performance Validation

### 7. Core Web Vitals Testing
```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run Lighthouse audit
lhci autorun --upload.target=temporary-public-storage \
  --collect.url="$SITE_URL" \
  --collect.numberOfRuns=3

# Quick performance check
curl -w "@curl-format.txt" -o /dev/null -s "$SITE_URL"
```

**curl-format.txt:**
```
     time_namelookup:  %{time_namelookup}\n
        time_connect:  %{time_connect}\n
     time_appconnect:  %{time_appconnect}\n
    time_pretransfer:  %{time_pretransfer}\n
       time_redirect:  %{time_redirect}\n
  time_starttransfer:  %{time_starttransfer}\n
                     ----------\n
          time_total:  %{time_total}\n
```

### 8. Bundle Size Verification
```bash
# Analyze bundle sizes
npm run analyze

# Check critical CSS inline
curl -s "$SITE_URL/" | grep -o "<style[^>]*>.*</style>" | wc -c
# Expected: < 14KB

# Verify image optimization
curl -I "$SITE_URL/_next/image?url=/images/barn-exterior-full-deck-view-evening.jpg&w=1920&q=75"
# Expected: Content-Type: image/webp or image/avif
```

---

## Accessibility Validation

### 9. WCAG Compliance Testing
```bash
# Install axe-core CLI
npm install -g @axe-core/cli

# Run accessibility audit
axe "$SITE_URL" --reporter=v2 --save=axe-results.json

# Check for violations
jq '.violations | length' axe-results.json
# Expected: 0
```

### 10. Keyboard Navigation Testing
**Manual testing required:**
1. Tab through all interactive elements
2. Verify focus indicators (3px minimum)
3. Test escape key functionality
4. Verify skip links work

---

## Content Management Validation

### 11. Storyblok Webhook Testing
```bash
# Test webhook endpoint
curl -X POST "$SITE_URL/api/storyblok-webhook" \
  -H "Content-Type: application/json" \
  -H "X-Storyblok-Signature: test" \
  -d '{"text": "Story was published", "action": "published"}'

# Check Netlify build hook
curl -X POST https://api.netlify.com/build_hooks/YOUR_BUILD_HOOK_ID
```

### 12. Content Revalidation Testing
**Manual steps:**
1. Edit content in Storyblok Visual Editor
2. Publish changes
3. Verify automatic deployment triggered
4. Confirm content updates on site within 60 seconds

---

## Environment Validation

### 13. Environment Variables Check
```bash
# Verify public variables are accessible
curl -s "$SITE_URL/_next/static/chunks/pages/_app-*.js" | grep -o "NEXT_PUBLIC_STORYBLOK"
# Expected: Found

# Verify server variables are NOT exposed
curl -s "$SITE_URL/_next/static/chunks/pages/_app-*.js" | grep -o "STORYBLOK_PREVIEW_TOKEN"
# Expected: Not found (empty result)
```

### 14. Build Environment Verification
```bash
# Check Node.js version in build
netlify api listSiteBuildHooks --site-id YOUR_SITE_ID

# Verify build command execution
netlify api listSiteBuilds --site-id YOUR_SITE_ID | jq '.[0].deploy_time'
```

---

## SEO & Social Validation

### 15. Meta Tags & Schema Testing
```bash
# Open Graph validation
curl -s "$SITE_URL/" | grep -o '<meta property="og:[^"]*" content="[^"]*"'

# Twitter Card validation
curl -s "$SITE_URL/" | grep -o '<meta name="twitter:[^"]*" content="[^"]*"'

# JSON-LD structured data
curl -s "$SITE_URL/" | grep -o '<script type="application/ld+json">.*</script>'

# Canonical URL verification
curl -s "$SITE_URL/" | grep -o '<link rel="canonical" href="[^"]*"'
```

### 16. Search Engine Verification
```bash
# Check robots.txt
curl "$SITE_URL/robots.txt"

# Verify sitemap accessibility
curl "$SITE_URL/sitemap.xml" | head -20

# Test Google indexability
curl -A "Googlebot" "$SITE_URL/" | grep -i "title"
```

---

## Success Criteria Checklist

### ✅ Technical Requirements
- [ ] Site loads without errors (200 status)
- [ ] Edge functions execute successfully
- [ ] Theme switching works via cookies and query params
- [ ] All security headers present and valid
- [ ] Environment variables properly segregated

### ✅ Performance Requirements (SRS NFR-001 to NFR-004)
- [ ] Lighthouse Performance Score > 90
- [ ] LCP < 2 seconds
- [ ] CSS bundle < 150KB compressed
- [ ] JavaScript bundle < 200KB compressed
- [ ] Images served in WebP/AVIF format

### ✅ Accessibility Requirements (SRS NFR-005 to NFR-008)
- [ ] Zero axe-core violations
- [ ] 4.5:1 color contrast ratio maintained
- [ ] Keyboard navigation functional
- [ ] Screen reader compatibility verified

### ✅ SEO Requirements (SRS NFR-009 to NFR-010)
- [ ] Server-side rendering confirmed
- [ ] Core Web Vitals in "Good" range
- [ ] Meta tags and structured data present
- [ ] Sitemap accessible and valid

### ✅ Content Management (SRS FR-004 to FR-006)
- [ ] Storyblok Visual Editor loads
- [ ] Content renders via clean architecture
- [ ] Draft content accessible with preview tokens
- [ ] Webhook triggers successful deployments

---

## Automated Validation Script

Save this as `validate-deployment.sh`:

```bash
#!/bin/bash
set -e

SITE_URL="${1:-https://rum-story-final.netlify.app}"
echo "🚀 Validating Netlify deployment: $SITE_URL"

# Health check
echo "📡 Testing site health..."
curl -f "$SITE_URL/api/health" > /dev/null && echo "✅ Health check passed"

# Theme functionality
echo "🎨 Testing theme switching..."
THEME_RESULT=$(curl -s -H "Cookie: rr.theme=dark" "$SITE_URL/" | grep -o 'data-theme="dark"' || echo "")
[[ -n "$THEME_RESULT" ]] && echo "✅ Theme switching works" || echo "❌ Theme switching failed"

# Security headers
echo "🔒 Checking security headers..."
CSP_RESULT=$(curl -I "$SITE_URL/" 2>/dev/null | grep -i "content-security-policy" || echo "")
[[ -n "$CSP_RESULT" ]] && echo "✅ CSP header present" || echo "❌ CSP header missing"

# Performance check
echo "⚡ Testing performance..."
LOAD_TIME=$(curl -w "%{time_total}" -o /dev/null -s "$SITE_URL")
echo "Load time: ${LOAD_TIME}s"

# Accessibility check (requires axe-core CLI)
if command -v axe &> /dev/null; then
    echo "♿ Running accessibility audit..."
    axe "$SITE_URL" --reporter=v2 --quiet && echo "✅ Accessibility audit passed"
else
    echo "⚠️ Axe CLI not installed, skipping accessibility check"
fi

echo "🎉 Validation complete!"
```

Run with: `bash validate-deployment.sh`

---

**This validation script ensures your Netlify deployment meets all SRS requirements and is production-ready for the Rum River Wedding Venue website.**