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


  // State methods
  const togglePrimaryMenu = () => setPrimaryMenu(!primaryMenu)
  const openPrimaryMenu = () => setPrimaryMenu(true)
  const closePrimaryMenu = () => setPrimaryMenu(false)


  return {
    // State
    primaryMenu,
    theme,

    // State setters
    setPrimaryMenu,
    setTheme,

    // State handlers
    togglePrimaryMenu,
  }

}

export default useApp

