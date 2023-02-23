import { useState } from 'react'
import get from 'lodash.get'
import set from 'lodash.set'
// Stores state in local storage
import { useLocalStorage } from 'shared/hooks/useLocalStorage.mjs'
import { useTheme } from 'shared/hooks/useTheme.mjs'
// Prebuild navigation
import { prebuildNavigation } from 'site/prebuild/navigation.mjs'
// Translation
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import toastMethod from 'react-hot-toast'
import { Toast } from 'site/components/toast/index.mjs'
/*
 * Dumb method to generate a unique (enough) ID for submissions to bugsnag
 */
function errId() {
  let result = ''
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let s = 0; s < 3; s++) {
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    if (s < 2) result += '-'
  }

  return result
}

/*
 * Helper method for a simple navigation item
 */
const simpleNav = (term, t, lng, prefix = '', order = '') => ({
  __title: t(term, { lng }),
  __linktitle: t(term, { lng }),
  __slug: prefix + term,
  __order: order + t(term, { lng }),
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

  // Translation top-level strapi pages
  nav.showcase.__title = t('showcase')
  nav.showcase.__linktitle = t('showcase')
  nav.blog.__title = t('blog')
  nav.blog.__linktitle = t('blog')

  // Translation top-level strapi pages
  nav.community.__title = t('community')
  nav.community.__linktitle = t('community')

  return nav
}

/* Custom toast methods */
const toastMethods = (t) => ({
  info: (children) => toastMethod.custom(<Toast type="info">{children}</Toast>),
  warning: (children) => toastMethod.custom(<Toast type="warning">{children}</Toast>),
  error: (children) => toastMethod.custom(<Toast type="error">{children}</Toast>),
  accent: (children) => toastMethod.custom(<Toast type="accent">{children}</Toast>),
  success: (children) => toastMethod.custom(<Toast type="success">{children}</Toast>),
  for: {
    settingsSaved: () =>
      toastMethod.custom(
        <Toast type="success">
          <span>{t('settingsSaved')}</span>
        </Toast>
      ),
  },
})

/*
 * The actual hook
 */
export function useApp({ bugsnag }) {
  // Load translation method
  const locale = useRouter().locale
  const { t } = useTranslation(['toast'])

  // Persistent state
  const [account, setAccount, accountReady] = useLocalStorage('account', { username: false })
  const [token, setToken] = useLocalStorage('token', null)
  const [theme, setTheme] = useTheme()

  // React State
  const [primaryMenu, setPrimaryMenu] = useState(false)
  const [navigation, setNavigation] = useState(buildNavigation(locale, t))
  const [slug, setSlug] = useState('/')
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)

  // State methods
  const togglePrimaryMenu = () => setPrimaryMenu(!primaryMenu)

  /*
   * Hot-update navigation method
   */
  const updateNavigation = (path, content) => {
    if (typeof path === 'string') {
      path = path.slice(0, 1) === '/' ? path.slice(1).split('/') : path.split('/')
    }
    setNavigation(set(navigation, path, content))
  }

  /*
   * Helper method to get title from navigation structure
   */
  const getTitle = (slug) => get(navigation, slug).__title

  /*
   * Helper method to construct breadcrumb from navigation structure
   */
  const getBreadcrumb = (slug) => [get(navigation, slug).__title, `/${slug}`]

  const loadHelpers = {
    startLoading: () => setLoading(true),
    stopLoading: () => setLoading(false),
    loading,
    setLoading,
  }

  const error = (err) => {
    const id = errId
    bugsnag.notify(err, (evt) => {
      evt.setUser(account.username ? account.username : '__visitor')
      evt.context = id
    })

    return id
  }

  return {
    // Static vars
    site: 'org',

    // i18n
    locale,

    // State
    account,
    accountReady,
    token,
    loading,
    navigation,
    primaryMenu,
    slug,
    theme,
    modal,

    // State setters
    setAccount,
    setToken,
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
    updateNavigation,
    setModal,

    // State handlers
    togglePrimaryMenu,
    toast: toastMethods(t),

    // Navigation
    getTitle,
    getBreadcrumb,

    // Loading state helpers
    loadHelpers,

    // Bugsnag wrapper
    error,
    errId,
  }
}
