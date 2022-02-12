import { useState, useEffect } from 'react'
import set from 'lodash.set'
// Stores state in local storage
import useLocalStorage from 'shared/hooks/useLocalStorage.js'
// Patterns
import patterns from 'site/patterns.json'
// Locale and translation
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { capitalize } from 'shared/utils'

// Initial navigation
const initialNavigation = (locale, t) => {
  const base = {
    accessories: {
      __title: t('accessoryPatterns'),
      __order: t('accessoryPatterns'),
      __linktitle: t('accessoryPatterns'),
      __slug: 'accessories',
    },
    blocks: {
      __title: t('blockPatterns'),
      __order: t('blockPatterns'),
      __linktitle: t('blockPatterns'),
      __slug: 'blocks',
    },
    garments: {
      __title: t('garmentPatterns'),
      __order: t('garmentPatterns'),
      __linktitle: t('garmentPatterns'),
      __slug: t('garments'),
    },
    utilities: {
      __title: t('utilityPatterns'),
      __order: t('utilityPatterns'),
      __linktitle: t('utilityPatterns'),
      __slug: 'utilities',
    },
  }
  for (const type in patterns) {
    for (const design of patterns[type]) {
      base[type][design] = {
        __title: capitalize(design),
        __order: design,
        __linktitle: capitalize(design),
        __slug: `${type}/${design}`
      }
    }
  }

  return base
}

function useApp(full = true) {

  // Locale (aka language)
  const router = useRouter()
  const { locale } = router
  const { t } = useTranslation(['app'])

  // User color scheme preference
  const prefersDarkMode = (typeof window !== 'undefined' && typeof  window.matchMedia === 'function')
    ? window.matchMedia(`(prefers-color-scheme: dark`).matches
    : null

  // Persistent state
  const [account, setAccount] = useLocalStorage('account', { username: false })
  const [theme, setTheme] = useLocalStorage('theme', prefersDarkMode ? 'dark' : 'light')

  // React State
  const [primaryMenu, setPrimaryMenu] = useState(false)
  const [navigation, setNavigation] = useState(initialNavigation(locale, t))
  const [slug, setSlug] = useState('/')
  const [pattern, setPattern] = useState(false)
  const [loading, setLoading] = useState(false)

  // State methods
  const togglePrimaryMenu = () => setPrimaryMenu(!primaryMenu)

  return {
    // Static vars
    site: 'lab',
    patterns,

    // State
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
  }
}

export default useApp

