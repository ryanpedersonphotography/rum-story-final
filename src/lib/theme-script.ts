// No-flash script to run in <head>
// This reads localStorage and system preference to set data-theme immediately
export function initThemeScript(): string {
  return `
    (function() {
      try {
        var local = localStorage.getItem('theme');
        var support = window.matchMedia('(prefers-color-scheme: dark)');
        var theme = local ? local : (support.matches ? 'dark' : 'light');
        document.documentElement.dataset.theme = theme;
      } catch (e) {}
    })()
  `
}
