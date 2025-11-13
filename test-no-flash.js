const { chromium } = require('playwright');

(async () => {
  console.log('Testing flash elimination...');
  
  // Test 1: Dark theme persistence
  console.log('\n=== TEST 1: Dark Theme (Pre-set) ===');
  const browser1 = await chromium.launch({ 
    headless: false,
    slowMo: 50
  });
  
  const context1 = await browser1.newContext({
    viewport: { width: 1920, height: 1080 },
    colorScheme: 'dark'
  });
  
  const page1 = await context1.newPage();
  
  // Pre-set dark theme in localStorage
  await page1.addInitScript(() => {
    window.localStorage.setItem('rr.theme', 'dark');
    window.localStorage.setItem('rr.brand', 'romantic');
  });
  
  // Capture background colors during load
  let earlyBgColor = null;
  page1.on('domcontentloaded', async () => {
    earlyBgColor = await page1.evaluate(() => {
      const html = document.documentElement;
      return {
        theme: html.getAttribute('data-theme'),
        brand: html.getAttribute('data-brand'),
        bgColor: window.getComputedStyle(html).backgroundColor,
        bodyBgColor: window.getComputedStyle(document.body).backgroundColor
      };
    });
  });
  
  console.log('Navigating to page with dark theme pre-set...');
  const startTime1 = Date.now();
  
  await page1.goto('https://localhost:9999', {
    waitUntil: 'networkidle'
  });
  
  const loadTime1 = Date.now() - startTime1;
  
  // Get final state
  const finalState = await page1.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    return {
      theme: html.getAttribute('data-theme'),
      brand: html.getAttribute('data-brand'),
      htmlBg: window.getComputedStyle(html).backgroundColor,
      bodyBg: window.getComputedStyle(body).backgroundColor,
      colorScheme: window.getComputedStyle(html).colorScheme
    };
  });
  
  console.log('Early state (DOMContentLoaded):', earlyBgColor);
  console.log('Final state:', finalState);
  console.log('Load time:', loadTime1 + 'ms');
  
  // Verify no flash occurred
  const darkBgExpected = 'rgb(29, 33, 57)'; // oklch(0.16 0.03 252) in RGB
  if (earlyBgColor && earlyBgColor.theme === 'dark') {
    console.log('✅ Dark theme was set early (no flash)');
  } else {
    console.log('❌ Dark theme was NOT set early (flash likely occurred)');
  }
  
  await page1.waitForTimeout(1000);
  await context1.close();
  await browser1.close();
  
  // Test 2: Light theme (system preference)
  console.log('\n=== TEST 2: Light Theme (System Preference) ===');
  const browser2 = await chromium.launch({ 
    headless: false,
    slowMo: 50
  });
  
  const context2 = await browser2.newContext({
    viewport: { width: 1920, height: 1080 },
    colorScheme: 'light'
  });
  
  const page2 = await context2.newPage();
  
  // Clear localStorage to test system preference
  await page2.addInitScript(() => {
    window.localStorage.clear();
  });
  
  let earlyBgColor2 = null;
  page2.on('domcontentloaded', async () => {
    earlyBgColor2 = await page2.evaluate(() => {
      const html = document.documentElement;
      return {
        theme: html.getAttribute('data-theme'),
        bgColor: window.getComputedStyle(html).backgroundColor
      };
    });
  });
  
  console.log('Navigating with system light preference...');
  const startTime2 = Date.now();
  
  await page2.goto('https://localhost:9999', {
    waitUntil: 'networkidle'
  });
  
  const loadTime2 = Date.now() - startTime2;
  
  const finalState2 = await page2.evaluate(() => {
    const html = document.documentElement;
    return {
      theme: html.getAttribute('data-theme'),
      htmlBg: window.getComputedStyle(html).backgroundColor,
      colorScheme: window.getComputedStyle(html).colorScheme
    };
  });
  
  console.log('Early state (DOMContentLoaded):', earlyBgColor2);
  console.log('Final state:', finalState2);
  console.log('Load time:', loadTime2 + 'ms');
  
  if (earlyBgColor2 && earlyBgColor2.theme === 'light') {
    console.log('✅ Light theme was set early (correct)');
  } else {
    console.log('⚠️  Light theme was NOT set early');
  }
  
  await page2.waitForTimeout(1000);
  await context2.close();
  await browser2.close();
  
  // Test 3: Rapid screenshots to detect any flash
  console.log('\n=== TEST 3: Screenshot Analysis ===');
  const browser3 = await chromium.launch({ 
    headless: true // Run headless for speed
  });
  
  const context3 = await browser3.newContext({
    viewport: { width: 1920, height: 1080 },
    colorScheme: 'dark'
  });
  
  const page3 = await context3.newPage();
  
  await page3.addInitScript(() => {
    window.localStorage.setItem('rr.theme', 'dark');
  });
  
  const screenshots = [];
  let capturing = true;
  
  // Start capturing screenshots
  (async () => {
    let i = 0;
    while (capturing && i < 20) {
      try {
        const screenshot = await page3.screenshot({ 
          path: `flash-test-${i}.png`,
          fullPage: false 
        });
        screenshots.push({ index: i, time: Date.now() });
        i++;
      } catch (e) {
        // Page might not be ready
      }
      await new Promise(r => setTimeout(r, 50));
    }
  })();
  
  await page3.goto('https://localhost:9999', {
    waitUntil: 'networkidle'
  });
  
  capturing = false;
  await page3.waitForTimeout(500);
  
  console.log(`Captured ${screenshots.length} screenshots`);
  console.log('Check flash-test-*.png files for any white flash');
  
  await context3.close();
  await browser3.close();
  
  console.log('\n=== All Tests Complete ===');
  console.log('If no flash was detected, the implementation is working correctly!');
})().catch(console.error);