import useLocalStorage from './useLocalStorage';
import useMedia from './useMedia';

/**
 * Returns the user's preference for dark mode, and the function to update it.
 *
 * @export
 * @returns
 */
export default function useDarkMode() {
  const [enabledState, setEnabledState] = useLocalStorage('dark-mode-enabled');

  // See if user has set a browser or OS preference for dark mode.
  // The usePrefersDarkMode hook composes a useMedia hook (see code below).
  const prefersDarkMode = usePrefersDarkMode();

  // If enabledState is defined use it, otherwise fallback to prefersDarkMode.
  // This allows user to override OS level setting on our website.
  const enabled =
    typeof enabledState !== 'undefined' ? enabledState : prefersDarkMode;

  // Return enabled state and setter
  return [enabled, setEnabledState];
}

/**
 * Returns the browser's preference for dark mode, or null if no preference.
 *
 * @returns {boolean | null} Browser's preference for dark mode, or null if no preference.
 */
function usePrefersDarkMode() {
  return useMedia(['(prefers-color-scheme: dark)'], [true], false);
}
