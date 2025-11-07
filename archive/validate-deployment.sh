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