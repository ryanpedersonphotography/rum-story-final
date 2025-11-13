const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log('Starting flash test...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 100 // Slow down to see the flash
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: './test-videos',
      size: { width: 1920, height: 1080 }
    }
  });
  
  const page = await context.newPage();
  
  // Listen for console messages
  page.on('console', msg => {
    console.log('Browser console:', msg.text());
  });
  
  // Take screenshots during load
  const screenshots = [];
  
  // Start recording screenshots before navigation
  const screenshotInterval = setInterval(async () => {
    try {
      const timestamp = Date.now();
      const screenshot = await page.screenshot({ 
        path: `screenshot-${timestamp}.png`,
        fullPage: false 
      });
      screenshots.push(timestamp);
    } catch (e) {
      // Page might not be ready
    }
  }, 50); // Every 50ms
  
  console.log('Navigating to page...');
  
  // Measure paint timings
  const startTime = Date.now();
  
  // Navigate and wait for different load states
  await page.goto('https://localhost:9999', {
    waitUntil: 'domcontentloaded',
    timeout: 10000
  });
  
  const domLoadTime = Date.now() - startTime;
  console.log(`DOM loaded in ${domLoadTime}ms`);
  
  // Wait for network idle
  await page.waitForLoadState('networkidle');
  const networkIdleTime = Date.now() - startTime;
  console.log(`Network idle in ${networkIdleTime}ms`);
  
  // Stop screenshot recording after 3 seconds
  setTimeout(() => {
    clearInterval(screenshotInterval);
    console.log(`Captured ${screenshots.length} screenshots`);
  }, 3000);
  
  // Check for white flash by analyzing background colors
  const bgColors = await page.evaluate(() => {
    const timeline = [];
    
    // Get initial body background
    const body = document.body;
    const html = document.documentElement;
    
    timeline.push({
      time: 'initial',
      bodyBg: window.getComputedStyle(body).backgroundColor,
      htmlBg: window.getComputedStyle(html).backgroundColor,
      theme: html.getAttribute('data-theme'),
      brand: html.getAttribute('data-brand')
    });
    
    return timeline;
  });
  
  console.log('Background colors:', bgColors);
  
  // Get performance metrics
  const metrics = await page.evaluate(() => {
    const perf = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    
    return {
      navigation: {
        domContentLoaded: perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart,
        loadComplete: perf.loadEventEnd - perf.loadEventStart,
        domInteractive: perf.domInteractive,
        domComplete: perf.domComplete
      },
      paint: paint.map(p => ({
        name: p.name,
        time: Math.round(p.startTime)
      }))
    };
  });
  
  console.log('Performance metrics:', JSON.stringify(metrics, null, 2));
  
  // Check CSS loading
  const cssLoaded = await page.evaluate(() => {
    const styles = Array.from(document.styleSheets);
    return {
      count: styles.length,
      loaded: styles.map(s => ({
        href: s.href,
        rules: s.cssRules ? s.cssRules.length : 0
      }))
    };
  });
  
  console.log('CSS loaded:', JSON.stringify(cssLoaded, null, 2));
  
  // Wait a bit more for video recording
  await page.waitForTimeout(2000);
  
  await context.close();
  await browser.close();
  
  console.log('Test complete. Check screenshot-*.png files and test-videos folder.');
})().catch(console.error);