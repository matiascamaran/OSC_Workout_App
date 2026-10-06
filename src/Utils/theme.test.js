import {
  applyTheme,
  DEFAULT_THEME,
  getStoredTheme,
  THEME_STORAGE_KEY,
} from './theme';

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.style.removeProperty('color-scheme');
});

test('uses dark as the default theme', () => {
  expect(getStoredTheme()).toBe(DEFAULT_THEME);
});

test.each(['light', 'dark', 'colorblind'])('restores the %s theme', (theme) => {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);

  expect(getStoredTheme()).toBe(theme);
});

test('falls back safely when the saved theme is invalid', () => {
  window.localStorage.setItem(THEME_STORAGE_KEY, 'neon-rainbow');

  expect(getStoredTheme()).toBe(DEFAULT_THEME);
});

test('applies and saves a selected theme', () => {
  const themeColorMeta = document.createElement('meta');
  themeColorMeta.setAttribute('name', 'theme-color');

  applyTheme('light', { themeColorMeta });

  expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  expect(document.documentElement.style.colorScheme).toBe('light');
  expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  expect(themeColorMeta).toHaveAttribute('content', '#f6f8fc');
});

test('still applies the theme when storage is unavailable', () => {
  const blockedStorage = {
    setItem() {
      throw new Error('Storage blocked');
    },
  };

  expect(() => applyTheme('colorblind', { storage: blockedStorage })).not.toThrow();
  expect(document.documentElement).toHaveAttribute('data-theme', 'colorblind');
});
