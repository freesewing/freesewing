import createPersistedState from 'use-persisted-state'

const usePersistedTheme = createPersistedState('fs-theme')

const preferredTheme = () => {
  const prefersDarkMode =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(`(prefers-color-scheme: dark`).matches
      : undefined

  return prefersDarkMode ? 'dark' : 'light'
}

export const useTheme = () => usePersistedTheme(preferredTheme)
