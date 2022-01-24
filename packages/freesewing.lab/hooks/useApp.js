import { useState } from 'react'
import set from 'lodash.set'
// Stores state in local storage
import useLocalStorage from 'shared/hooks/useLocalStorage.js'
// config
import config from 'site/freesewing.config.js'
// Languages
import { strings } from 'pkgs/i18n'

const translateNavigation = (lang, t) => {
  const newNav = {...config.navigation}
  for (const key in newNav) {
    const translated = t(newNav[key].__title, false, lang)
    newNav[key].__title = translated
    newNav[key].__linktitle = translated
    newNav[key].__order = translated
  }

  return newNav
}


function useApp(full = true) {

  // User color scheme preference
  const prefersDarkMode = (typeof window !== 'undefined' && typeof  window.matchMedia === 'function')
    ? window.matchMedia(`(prefers-color-scheme: dark`).matches
    : null

  // Persistent state
  const [account, setAccount] = useLocalStorage('account', { username: false })
  const [theme, setTheme] = useLocalStorage('theme', prefersDarkMode ? 'dark' : 'light')
  const [language, setLanguage] = useLocalStorage('language', 'en')

  // React State
  const [primaryMenu, setPrimaryMenu] = useState(false)
  const [navigation, setNavigation] = useState(config.navigation)
  const [slug, setSlug] = useState('/')
  const [pattern, setPattern] = useState(false)
  const [loading, setLoading] = useState(false)

  // State methods
  const togglePrimaryMenu = () => setPrimaryMenu(!primaryMenu)
  const changeLanguage = lang => {
    setLanguage(lang)
    setNavigation(translateNavigation(lang, t))
  }

  /*
   * Translation method
   */
  const t = (key, props=false, toLanguage=false) => {
    if (!toLanguage) toLanguage = language
    if (!props) { // easy
      if (strings[toLanguage][key]) return strings[toLanguage][key]
      // app is the most common prefix, so we allow to skip it
      if (strings[toLanguage][`app.${key}`]) return strings[toLanguage][`app.${key}`]
      // Can we fall back to English?
      if (toLanguage !== 'en') {
        if (strings.en[key]) return strings.en[key]
        if (strings.en[`app.${key}`]) return strings.en[`app.${key}`]
      }
    }
    console.log('Missing translation key:', key)

    return key
  }

  return {
    // Static vars
    site: 'lab',
    patterns: config.patterns,

    // State
    language,
    loading,
    navigation,
    pattern,
    primaryMenu,
    slug,
    theme,

    // State setters
    setLoading,
    setNavigation,
    setPattern,
    setPrimaryMenu,
    setSlug,
    setTheme,
    startLoading: () => { setLoading(true); setPrimaryMenu(false) }, // Always close menu when navigating
    stopLoading: () => setLoading(false),

    // State handlers
    togglePrimaryMenu,
    changeLanguage,

    // Translation
    t,
  }
}

export default useApp

