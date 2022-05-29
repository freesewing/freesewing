import { useState } from 'react'
import set from 'lodash.set'
// Stores state in local storage
import useLocalStorage from 'shared/hooks/useLocalStorage.js'
// Prebuild navigation
import prebuildNavigation from 'site/prebuild/navigation.js'
// Translation
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

/*
 * Helper method for a simple navigation item
 */
const simpleNav = (term, t, lng, prefix='', order='') => ({
  __title: t(term, { lng }),
  __linktitle: t(term, { lng }),
  __slug: prefix+term,
  __order: order+t(term, { lng })
})

/*
 * Generated the static navigation
 * Static means not mdx, not strapi
 */
const staticNavigation = (t, lang) => ({
  designs: simpleNav('designs', t, lang, '', 'A'),
  community: simpleNav('community', t, lang),
  account: simpleNav('account', t, lang),
})

/*
 * Merges prebuild navigation with the static navigation
 */
const buildNavigation = (lang, t) => {
  const nav = {
    ...prebuildNavigation[lang],
    ...staticNavigation(t, lang),
  }

  // Set top-level order
  nav.designs.__order = 'a'
  nav.showcase.__order = 'b'
  nav.docs.__order = 'c'
  nav.community.__order = 'd'
  nav.blog.__order = 'e'
  nav.account.__order = 'f'

  return nav
}

/*
 * The actual hook
 */
function useApp(full = true) {

  // Load translation method
  const locale = useRouter().locale
  const { t } = useTranslation()

  // User color scheme preference
  const prefersDarkMode = (typeof window !== 'undefined' && typeof  window.matchMedia === 'function')
    ? window.matchMedia(`(prefers-color-scheme: dark`).matches
    : null

  // Persistent state
  const [account, setAccount] = useLocalStorage('account', { username: false })
  const [theme, setTheme] = useLocalStorage('theme', prefersDarkMode ? 'dark' : 'light')

  // React State
  const [primaryMenu, setPrimaryMenu] = useState(false)
  const [navigation, setNavigation] = useState(buildNavigation(locale, t))
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
    site: 'org',

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
    startLoading: () => { setLoading(true); setPrimaryMenu(false) }, // Always close menu when navigating
    stopLoading: () => setLoading(false),
    updateNavigation,

    // State handlers
    togglePrimaryMenu,
  }
}

export default useApp

