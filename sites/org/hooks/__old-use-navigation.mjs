import { useState } from 'react'
import get from 'lodash.get'
import set from 'lodash.set'
// Prebuild navigation
import { prebuildNavigation } from 'site/prebuild/navigation.mjs'

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

/*
 * The actual hook
 */
export function useNavigation({}) {
  // React State
  const [navigation, setNavigation] = useState(buildNavigation(locale, t))
  const [slug, setSlug] = useState('/')

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

  return {
    // State
    navigation,
    setNavigation,
    slug,
    setSlug,
    updateNavigation,

    // Navigation
    getTitle,
    getBreadcrumb,
  }
}
