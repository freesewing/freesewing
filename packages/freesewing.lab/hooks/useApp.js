import { useState } from 'react'
import set from 'lodash.set'
import mustache from 'mustache'
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
    const template =
      strings[toLanguage][key] ||
      strings[toLanguage][`app.${key}`] ||
      strings[toLanguage][`plugin.${key}`] ||
      strings.en[`app.${key}`] ||
      false
    if (!props && template) return template
    else if (template) return mustache.render(
      template.split('{').join('{{').split('}').join('}}'),
      props
    )
    // No translation found
    //console.log('Missing translation key:', key)

    // If it's a key (no spaces), return the final part, that's slightly better
    return (typeof key === 'string' && key.indexOf(' ') === -1)
      ? key.split('.').pop()
      : key
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

