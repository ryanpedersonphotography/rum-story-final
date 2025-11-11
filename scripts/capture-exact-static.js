const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');

async function captureExactStatic() {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  console.log('Loading page...');
  await page.goto('https://localhost:9999', { 
    waitUntil: 'networkidle0',
    timeout: 60000 
  });
  
  // Wait for dynamic content to load
  await page.waitForTimeout(3000);
  
  console.log('Extracting styles and HTML...');
  
  // Get all stylesheets and inline styles
  const pageData = await page.evaluate(() => {
    // Get all stylesheet contents
    const styles = [];
    
    // External stylesheets
    Array.from(document.styleSheets).forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || sheet.rules || []);
        const css = rules.map(rule => rule.cssText).join('\n');
        if (css) styles.push(css);
      } catch (e) {
        // Cross-origin stylesheets
        if (sheet.href) {
          styles.push(`/* External: ${sheet.href} */`);
        }
      }
    });
    
    // Inline styles
    Array.from(document.querySelectorAll('style')).forEach(style => {
      styles.push(style.innerHTML);
    });
    
    // Get computed styles for critical elements
    const criticalStyles = {};
    const elements = document.querySelectorAll('[data-section], .navbar, .section, .Hero_hero__HKpHp, .AlternatingBlocks_container___YJZb, .Experience_experienceGrid__W6gq_, .Gallery_gallery__e0iM5');
    
    elements.forEach(el => {
      const computed = window.getComputedStyle(el);
      const important = [
        'display', 'position', 'width', 'height', 'margin', 'padding',
        'background', 'color', 'font', 'flex', 'grid', 'transform',
        'opacity', 'z-index', 'overflow', 'border', 'box-shadow'
      ];
      
      const selector = el.className || el.tagName.toLowerCase();
      criticalStyles[selector] = {};
      
      important.forEach(prop => {
        const value = computed.getPropertyValue(prop);
        if (value && value !== 'initial' && value !== 'normal') {
          criticalStyles[selector][prop] = value;
        }
      });
    });
    
    // Clean the HTML
    const html = document.documentElement.outerHTML;
    
    return {
      html,
      styles: styles.join('\n'),
      criticalStyles
    };
  });
  
  // Process HTML - remove Next.js specific elements
  let cleanHtml = pageData.html;
  
  // Remove Next.js scripts but keep essential ones
  cleanHtml = cleanHtml.replace(/<script[^>]*\/_next\/[^>]*>[\s\S]*?<\/script>/gi, '');
  cleanHtml = cleanHtml.replace(/<script[^>]*webpack[^>]*>[\s\S]*?<\/script>/gi, '');
  cleanHtml = cleanHtml.replace(/<link[^>]*\/_next\/[^>]*>/gi, '');
  
  // Fix image sources
  cleanHtml = cleanHtml.replace(/\/_next\/image\?url=([^&"]+)[^"]*"/gi, (match, url) => {
    const decodedUrl = decodeURIComponent(url);
    if (decodedUrl.startsWith('http')) {
      return `"${decodedUrl}"`;
    }
    return `"${decodedUrl}"`;
  });
  
  // Add our clean CSS
  const cssTag = `<style>
/* Reset and Base Styles */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* Extracted Styles */
${pageData.styles}

/* Critical Computed Styles */
${Object.entries(pageData.criticalStyles).map(([selector, props]) => 
  `.${selector} { ${Object.entries(props).map(([k, v]) => `${k}: ${v}`).join('; ')} }`
).join('\n')}
</style>`;
  
  // Insert CSS before closing head
  cleanHtml = cleanHtml.replace('</head>', `${cssTag}\n</head>`);
  
  // Add minimal JavaScript
  const jsScript = `
<script>
// Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('rr.theme') || 'light';
  root.setAttribute('data-theme', savedTheme);
  
  // Mobile Menu
  const mobileBtn = document.querySelector('.navbar__mobile-btn');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');
  const closeBtn = document.querySelector('.navbar__mobile-close');
  
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.add('navbar__mobile-menu--open');
    });
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('navbar__mobile-menu--open');
    });
  }
  
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Space tabs
  const tabs = document.querySelectorAll('.Spaces_venueTab__3eVUo');
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('Spaces_active__j2VF3'));
      tab.classList.add('Spaces_active__j2VF3');
    });
  });
});
</script>
`;
  
  // Add JS before closing body
  cleanHtml = cleanHtml.replace('</body>', `${jsScript}\n</body>`);
  
  // Create output directory
  const outputDir = path.join(process.cwd(), 'static-export-exact');
  await fs.ensureDir(outputDir);
  
  // Write the HTML file
  await fs.writeFile(path.join(outputDir, 'index.html'), cleanHtml);
  
  // Copy images
  const publicDir = path.join(process.cwd(), 'public');
  const imagesSource = path.join(publicDir, 'images');
  const imagesDest = path.join(outputDir, 'images');
  
  if (await fs.pathExists(imagesSource)) {
    await fs.copy(imagesSource, imagesDest);
  }
  
  console.log('Static export complete!');
  console.log(`Output directory: ${outputDir}`);
  
  await browser.close();
}

captureExactStatic().catch(console.error);