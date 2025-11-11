const https = require('https');
const fs = require('fs');
const path = require('path');

// Ignore SSL errors for localhost
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

https.get('https://localhost:9999', (res) => {
  let html = '';
  res.on('data', (chunk) => { html += chunk; });
  res.on('end', () => {
    // Clean up Next.js specific elements
    html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<link[^>]*\/_next[^>]*>/gi, '');
    html = html.replace(/data-blok-[^=]*="[^"]*"/g, '');
    html = html.replace(/class="__variable_[^"]*"/g, '');
    
    // Write cleaned HTML
    fs.writeFileSync(path.join(__dirname, 'index-raw.html'), html);
    console.log('HTML extracted to index-raw.html');
  });
}).on('error', (err) => {
  console.error('Error fetching page:', err);
});
