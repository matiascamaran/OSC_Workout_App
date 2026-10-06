import { act } from 'react';
import { createRoot } from 'react-dom/client';
import ThemeToggle from './ThemeToggle';

let container;
let root;

beforeAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
});

afterAll(() => {
  delete global.IS_REACT_ACT_ENVIRONMENT;
});

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

test('shows all themes and marks the current selection', () => {
  act(() => {
    root.render(<ThemeToggle theme="dark" onThemeChange={() => {}} />);
  });

  const buttons = Array.from(container.querySelectorAll('button'));

  expect(buttons.map((button) => button.textContent)).toEqual([
    'Light',
    'Dark',
    'Colorblind',
  ]);
  expect(buttons[0]).toHaveAttribute('aria-pressed', 'false');
  expect(buttons[1]).toHaveAttribute('aria-pressed', 'true');
  expect(buttons[2]).toHaveAttribute('aria-pressed', 'false');
});

test('reports the selected theme', () => {
  const handleThemeChange = jest.fn();

  act(() => {
    root.render(
      <ThemeToggle theme="dark" onThemeChange={handleThemeChange} />
    );
  });

  const colorblindButton = Array.from(container.querySelectorAll('button')).find(
    (button) => button.textContent === 'Colorblind'
  );

  act(() => {
    colorblindButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(handleThemeChange).toHaveBeenCalledWith('colorblind');
});
