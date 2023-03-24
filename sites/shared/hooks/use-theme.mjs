import { useEffect } from 'react'
import createPersistedState from 'use-persisted-state'

const usePersistedTheme = createPersistedState('fs-theme')

const preferredTheme = () => {
  const prefersDarkMode =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(`(prefers-color-scheme: dark`).matches
      : undefined

  return prefersDarkMode ? 'dark' : 'light'
}

export const useTheme = () => {
  // (persisted) State (saved to local storage)
  const [theme, setTheme] = usePersistedTheme(preferredTheme)

  //useEffect(() => {
  //  // set the default theme based on user prefence
  //  if (theme === undefined) {
  //    const prefersDarkMode =
  //      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
  //        ? window.matchMedia(`(prefers-color-scheme: dark`).matches
  //        : undefined

  //    setTheme(prefersDarkMode ? 'dark' : 'light')
  //  }
  //}, [theme, setTheme])

  return [theme, setTheme]
}
