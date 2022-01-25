import { useState } from 'react'
import set from 'lodash.set'
// Stores state in local storage
import useLocalStorage from 'shared/hooks/useLocalStorage.js'
// Patterns
import patterns from 'site/patterns.json'
// Languages
import { strings } from 'pkgs/i18n'

// Initial navigation
const initialNavigation = {
  accessories: {
    __title: 'accessoryPatterns',
    __order: 'accessoryPatterns',
    __linktitle: 'accessoryPatterns',
    __slug: 'accessories',
  },
  blocks: {
    __title: 'blockPatterns',
    __order: 'blockPatterns',
    __linktitle: 'blockPatterns',
    __slug: 'blocks',
  },
  garments: {
    __title: 'garmentPatterns',
    __order: 'garmentPatterns',
    __linktitle: 'GarmentPatterns',
    __slug: 'garments',
  },
  utilities: {
    __title: 'utilityPatterns',
    __order: 'utilityPatterns',
    __linktitle: 'utilityPatterns',
    __slug: 'utilities',
  },
}
for (const type in patterns) {
  for (const design of patterns[type]) {
    initialNavigation[type][design] = {
      __title: design,
      __order: design,
      __linktitle: design,
      __slug: `${type}/${design}`
    }
  }
}

// Translate navigation
const translateNavigation = (lang, t) => {
  const newNav = {...initialNavigation}
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
  const [navigation, setNavigation] = useState(initialNavigation)
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
    patterns,

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

