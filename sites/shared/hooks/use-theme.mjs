//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { spectrum, rating, graph } from 'shared/themes/index.mjs'
import useLocalStorageState from 'use-local-storage-state'

const preferredTheme = () => {
  const prefersDarkMode =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(`(prefers-color-scheme: dark`).matches
      : undefined

  return prefersDarkMode ? 'dark' : 'light'
}

export const useTheme = () => {
  const theme = useLocalStorageState('fs-theme', { defaultValue: preferredTheme })

  return {
    theme: theme[0],
    setTheme: theme[1],
    spectrum: spectrum[theme[0]],
    rating: rating[theme[0]],
    graph: graph[theme[0]],
  }
}
