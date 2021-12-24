import { useState } from 'react'
// Stores state in local storage
import useLocalStorage from 'shared/hooks/useLocalStorage.js'
// Translation
import { en } from '@freesewing/i18n'
// Prebuild navigation
import prebuildNavigation from 'site/prebuild/navigation.js'

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
  const [navigation, setNavigation] = useState(prebuildNavigation[language])
  const [slug, setSlug] = useState('/')

  // State methods
  const togglePrimaryMenu = () => setPrimaryMenu(!primaryMenu)
  const openPrimaryMenu = () => setPrimaryMenu(true)
  const closePrimaryMenu = () => setPrimaryMenu(false)

  /*
   * Translation method
   *
   * Note that freesewing.dev is only available in English
   * however we use certain shared code/components between
   * freesewing.dev and freesewing.org, so we still need
   * a translation method
   */
  const t = (key=false, vals=false) => {
    if (!key) return ''
    if (!en.strings[key]) return key
    let val = en.strings[key]
    if (vals) {
      for (const [search, replace] of Object.entries(vals)) {
        val = val.replace(/search/g, replace)
      }
    }

    return val
  }


  return {
    // Static vars
    site: 'dev',

    // State
    language,
    navigation,
    primaryMenu,
    slug,
    theme,

    // State setters
    setLanguage,
    setNavigation,
    setPrimaryMenu,
    setSlug,
    setTheme,

    // State handlers
    togglePrimaryMenu,

  }

}

export default useApp

