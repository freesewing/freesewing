import { useState } from 'react'
// Stores state in local storage
import useLocalStorage from 'shared/hooks/useLocalStorage.js'

function useApp(full = true) {

  // User color scheme preference
  const prefersDarkMode = (typeof window !== 'undefined' && typeof  window.matchMedia === 'function')
    ? window.matchMedia(`(prefers-color-scheme: dark`).matches
    : null

  // React State
  const [primaryMenu, setPrimaryMenu] = useState(false)

  // Persistent state
  const [account, setAccount] = useLocalStorage('account', { username: false })
  const [theme, setTheme] = useLocalStorage('theme', prefersDarkMode ? 'dark' : 'light')
  const [language, setLanguage] = useLocalStorage('language', 'en')


  // State methods
  const togglePrimaryMenu = () => setPrimaryMenu(!primaryMenu)
  const openPrimaryMenu = () => setPrimaryMenu(true)
  const closePrimaryMenu = () => setPrimaryMenu(false)


  return {
    // Static vars
    site: 'dev',
    pitch: "This website does not track you",

    // State
    primaryMenu,
    theme,
    language,

    // State setters
    setPrimaryMenu,
    setTheme,
    setLanguage,

    // State handlers
    togglePrimaryMenu,
  }

}

export default useApp

