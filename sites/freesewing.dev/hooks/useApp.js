import { useState } from 'react'
import set from 'lodash.set'
// Stores state in local storage
import useLocalStorage from 'shared/hooks/useLocalStorage.js'
import useTheme from 'shared/hooks/useTheme'
// Prebuild navigation
import prebuildNavigation from 'site/prebuild/navigation.js'

function useApp(full = true) {
  // No translation for freesewing.dev
  const language = 'en'

  // Persistent state
  const [account, setAccount] = useLocalStorage('account', { username: false })
  const [theme, setTheme] = useTheme();

  // React State
  const [primaryMenu, setPrimaryMenu] = useState(false)
  const [navigation, setNavigation] = useState(prebuildNavigation[language])
  const [slug, setSlug] = useState('/')
  const [loading, setLoading] = useState(false)

  // State methods
  const togglePrimaryMenu = () => setPrimaryMenu(!primaryMenu)

  /*
   * Hot-update navigation method
   */
  const updateNavigation = (path, content) => {
    if (typeof path === 'string') {
      path = (path.slice(0,1) === '/')
        ? path.slice(1).split('/')
        : path.split('/')
    }
    setNavigation(set(navigation, path, content))
  }

  return {
    // Static vars
    site: 'dev',
    language,

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
    startLoading: () => { setLoading(true); setPrimaryMenu(false) }, // Always close menu when navigating
    stopLoading: () => setLoading(false),
    updateNavigation,

    // State handlers
    togglePrimaryMenu,

    // Dummy translation method
    t: s => s,
    i18n: false,
  }
}

export default useApp

