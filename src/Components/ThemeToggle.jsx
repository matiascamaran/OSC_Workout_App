const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'colorblind', label: 'Colorblind' },
];

function ThemeToggle({ theme, onThemeChange }) {
  return (
    <div className="theme-picker">
      <span className="theme-picker-label" id="theme-picker-label">
        Theme
      </span>
      <div
        className="theme-options"
        role="group"
        aria-labelledby="theme-picker-label"
      >
        {THEME_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className="theme-option"
            aria-pressed={theme === option.value}
            onClick={() => onThemeChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <span className="theme-help">Colorblind uses a red-green-safe palette.</span>
    </div>
  );
}

export default ThemeToggle;
