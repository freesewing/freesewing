import { useState } from 'react'
// Locale and translation
import { useRouter } from 'next/router'
import { useTheme } from 'shared/hooks/useTheme.mjs'

export const useApp = () => {
  // Load translation method
  const locale = useRouter().locale

  // Persistent state
  const [theme, setTheme] = useTheme()

  // React State
  const [primaryMenu, setPrimaryMenu] = useState(false)
  const [navigation, setNavigation] = useState({})
  const [slug, setSlug] = useState('/')
  const [loading, setLoading] = useState(false)

  // State methods
  const togglePrimaryMenu = () => setPrimaryMenu(!primaryMenu)

  return {
    // Static vars
    site: 'lab',

    // i18n
    locale,

    // State
    loading,
    navigation,
    primaryMenu,
    slug,
    theme,

    // State setters
    setLoading,
    setNavigation,
    setPrimaryMenu,
    setSlug,
    setTheme,
    startLoading: () => {
      setLoading(true)
      setPrimaryMenu(false)
    }, // Always close menu when navigating
    stopLoading: () => setLoading(false),

    // State handlers
    togglePrimaryMenu,

    // Standalone is for the development environment
    standalone: true,
  }
}

export default useApp
