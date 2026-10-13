(() => {
  'use strict';
  const storageKey = 'comp329-theme';
  const root = document.documentElement;
  let theme = 'light';
  try { if (localStorage.getItem(storageKey) === 'dark') theme = 'dark'; } catch (_) { /* The switch also works when storage is unavailable. */ }
  const update = value => {
    theme = value === 'dark' ? 'dark' : 'light';
    root.dataset.theme = theme;
    document.querySelectorAll('[data-theme-toggle]').forEach(button => button.setAttribute('aria-checked', String(theme === 'dark')));
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#14212c' : '#f7f7f1');
  };
  update(theme);
  document.addEventListener('DOMContentLoaded', () => {
    update(theme);
    document.querySelectorAll('[data-theme-toggle]').forEach(button => button.addEventListener('click', () => {
      update(theme === 'dark' ? 'light' : 'dark');
      try { localStorage.setItem(storageKey, theme); } catch (_) { /* Keep the current page usable without storage. */ }
    }));
  });
  window.addEventListener('storage', event => { if (event.key === storageKey) update(event.newValue); });
})();
