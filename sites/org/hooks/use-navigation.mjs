import { useContext, useEffect } from 'react'
import { NavigationContext } from 'shared/context/navigation-context.mjs'
import get from 'lodash.get'
import { prebuildNavigation as pbn } from 'site/prebuild/navigation.mjs'
import { useTranslation } from 'next-i18next'
import orderBy from 'lodash.orderby'
import { freeSewingConfig as conf } from 'site/freesewing.config.mjs'
import { useAccount } from 'shared/hooks/use-account.mjs'

/*
 * prebuildNavvigation[locale] holds the navigation structure based on MDX content.
 * The entire website only has a few pages that are now MDX-based:
 * - 404 => no navigation shown
 * - home page => no navvigation shown
 * - /contact => Added below
 *
 * Note: Set 'h' to truthy to not show a top-level entry as a section
 * Note: Set 'c' to set the control level to hide things from users
 */

const ns = ['account', 'sections']

const sitePages = (t = false, control = 99) => {
  // Handle t not being present
  if (!t) t = (string) => string
  const pages = {
    // Top-level pages that are the sections menu
    designs: {
      t: t('sections:designs'),
      s: 'designs',
      o: 10,
    },
    showcase: {
      t: t('sections:showcase'),
      s: 'showcase',
      o: 20,
    },
    blog: {
      t: t('sections:blog'),
      s: 'blog',
      o: 40,
    },
    community: {
      t: t('sections:community'),
      s: 'community',
      o: 50,
    },
    account: {
      t: t('sections:account'),
      s: 'account',
      o: 60,
    },
    // Top-level pages that are not in the sections menu
    profile: {
      t: t('yourProfile'),
      s: 'profile',
      h: 1,
    },
    new: {
      t: t('new'),
      s: 'new',
      h: 1,
      apikey: {
        t: t('newApikey'),
        s: 'new/apikey',
        h: 1,
      },
    },

    // Not translated, this is a developer page
    typography: {
      t: 'Typography',
      s: 'typography',
      h: 1,
    },
  }
  for (const section in conf.account.fields) {
    for (const [field, controlScore] of Object.entries(conf.account.fields[section])) {
      if (Number(control) >= controlScore)
        pages.account[field] = {
          t: t(`account:${field}`),
          s: `account/${field}`,
        }
    }
  }
  pages.account.reload = {
    t: t(`account:reload`),
    s: `account/reload`,
  }

  return pages
}

const createCrumbs = (path, nav) =>
  path.map((crumb, i) => {
    const entry = get(nav, path.slice(0, i + 1), { t: 'no-title', s: path.join('/') })
    const val = { t: entry.t, s: entry.s }
    if (entry.o) val.o = entry.o

    return val
  })

const createSections = (nav) => {
  const sections = {}
  for (const slug of Object.keys(nav)) {
    const entry = nav[slug]
    const val = { t: entry.t, s: entry.s }
    if (entry.o) val.o = entry.o
    if (!entry.h) sections[slug] = val
  }

  return orderBy(sections, ['o', 't'])
}

export const useNavigation = ({ path, locale }) => {
  const { t } = useTranslation(ns)
  const { account } = useAccount()

  const nav = { ...pbn[locale], ...sitePages(t, account?.control) }

  // Creat crumbs array
  const crumbs = createCrumbs(path, nav)
  const sections = createSections(nav)

  return {
    crumbs,
    sections,
    slug: path.join('/'),
    nav: path.length > 1 ? get(nav, path[0]) : path.length === 0 ? sections : nav[path[0]],
    title: crumbs.length > 0 ? crumbs.slice(-1)[0].t : '',
  }
}
