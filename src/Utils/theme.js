export const THEMES = Object.freeze(['light', 'dark', 'colorblind']);
export const DEFAULT_THEME = 'dark';
export const THEME_STORAGE_KEY = 'osc-workout-theme';

const THEME_COLORS = {
  light: '#f6f8fc',
  dark: '#050914',
  colorblind: '#0b0f14',
};

function getBrowserStorage() {
  if (typeof window === 'undefined') return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getDocumentRoot() {
  return typeof document === 'undefined' ? null : document.documentElement;
}

function getThemeColorMeta() {
  if (typeof document === 'undefined') return null;
  return document.querySelector('meta[name="theme-color"]');
}

export function normalizeTheme(theme) {
  return THEMES.includes(theme) ? theme : DEFAULT_THEME;
}

export function getStoredTheme(storage = getBrowserStorage()) {
  try {
    return normalizeTheme(storage?.getItem(THEME_STORAGE_KEY));
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyTheme(
  theme,
  {
    root = getDocumentRoot(),
    storage = getBrowserStorage(),
    themeColorMeta = getThemeColorMeta(),
  } = {}
) {
  const nextTheme = normalizeTheme(theme);

  if (root) {
    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme === 'light' ? 'light' : 'dark';
  }

  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', THEME_COLORS[nextTheme]);
  }

  try {
    storage?.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch {
    // The visual theme still works when storage is unavailable or disabled.
  }

  return nextTheme;
}
