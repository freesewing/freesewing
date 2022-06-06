import useLocalStorage from 'shared/hooks/useLocalStorage';
import { useState, useEffect } from 'react'

function useTheme() {
  const [storedTheme, setStoredTheme, ready] = useLocalStorage('theme', undefined);

  useEffect(() => {
    if (ready && storedTheme === undefined) {
      const prefersDarkMode = (typeof window !== 'undefined' && typeof window.matchMedia === 'function')
        ? window.matchMedia(`(prefers-color-scheme: dark`).matches
        : null

      setStoredTheme(prefersDarkMode ? 'dark' : 'light')
    }
  }, [ready])

  return [storedTheme, setStoredTheme];
}

export default useTheme;
