/**
 * Zen System 7.0 - Theme Init Script
 * 
 * This script runs BEFORE React hydration to prevent theme flash.
 * It reads localStorage + OS preference and sets data-theme attribute.
 * 
 * Storage key: 'zen-theme'
 * Values: 'light' | 'dark' | 'system'
 */

export const initThemeScript = `
(function() {
  var storageKey = 'zen-theme';
  var root = document.documentElement;

  var stored = null;
  try {
    stored = window.localStorage.getItem(storageKey);
  } catch (e) {
    // localStorage may be blocked
  }

  var theme;
  if (stored === 'light' || stored === 'dark') {
    theme = stored;
  } else if (stored === 'system' || stored === null) {
    var mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    theme = mql && mql.matches ? 'dark' : 'light';
  } else {
    theme = 'light';
  }

  root.dataset.theme = theme;
  root.style.colorScheme = theme;
})();
`;

/**
 * Storage key for theme preference
 * Used by ThemeToggle and other theme-related components
 */
export const THEME_STORAGE_KEY = 'zen-theme';

/**
 * Theme values
 */
export type ThemeValue = 'light' | 'dark' | 'system';
