import { prebuildNavigation as pbn } from 'site/prebuild/navigation.mjs'
import { useTranslation } from 'next-i18next'
import { freeSewingConfig as conf } from 'shared/config/freesewing.config.mjs'
import { useAccount } from 'shared/hooks/use-account.mjs'
import { designs, tags } from 'shared/config/designs.mjs'
import { objUpdate } from 'shared/utils.mjs'
import { orderedSlugLut } from 'shared/hooks/use-navigation-helpers.mjs'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

/*
 * prebuildNavvigation[locale] holds the navigation structure based on MDX content.
 * The entire website only has a few pages that are now MDX-based:
 * - 404 => no navigation shown
 * - home page => no navvigation shown
 * - /contact => Added below
 *
 * Remember Mc_Shifton:
 * Note: Set 'm' to truthy to show this as a main section in the side-navigation (optional)
 * Note: Set 'c' to set the control level to hide things from users (optional)
 * Note: Set 's' to the slug (optional insofar as it's not a real page (a spacer for the header))
 * Note: Set '_' to never show the page in the site navigation (like the tags pages)
 * Note: Set 'h' to indicate this is a top-level page that should be hidden from the side-nav (like search)
 * Note: Set 'i' when something should be included as top-level in the collapse side-navigation (optional)
 * Note: Set 'f' to add the page to the footer
 * Note: Set 't' to the title
 * Note: Set 'o' to set the order (optional)
 * Note: Set 'n' to mark this as a noisy entry that should always be closed unless active (like blog)
 */

export const ns = ['account', 'sections', 'design', 'tags', 'designs']

const sitePages = (t = false, control = 99) => {
  // Handle t not being present
  if (!t) t = (string) => string
  const pages = {
    // Top-level pages that are the sections menu
    designs: {
      m: 1,
      s: 'designs',
      t: t('sections:designs'),
      n: 1,
      tags: {
        _: 1,
        s: 'designs/tags',
        t: t('design:tags'),
        o: 'aaa',
      },
    },
    patterns: {
      m: 1,
      s: 'patterns',
      t: t('sections:patterns'),
    },
    sets: {
      m: 1,
      s: 'sets',
      t: t('sections:sets'),
    },
    community: {
      m: 1,
      s: 'community',
      t: t('sections:community'),
    },
    account: {
      m: 1,
      s: 'account',
      t: t('sections:account'),
      n: 1,
    },
    // Top-level pages that are not in the sections menu
    apikeys: {
      _: 1,
      s: 'apikeys',
      h: 1,
      t: t('apikeys'),
    },
    curate: {
      s: 'curate',
      h: 1,
      t: t('curate'),
      sets: {
        t: t('curateSets'),
        s: 'curate/sets',
      },
    },
    new: {
      m: 1,
      s: 'new',
      h: 1,
      t: t('sections:new'),
      pattern: {
        t: t('patternNew'),
        s: 'new/pattern',
        o: 10,
      },
      set: {
        t: t('newSet'),
        s: 'new/set',
        0: 20,
      },
    },
    profile: {
      s: 'profile',
      h: 1,
      t: t('yourProfile'),
    },
    translation: {
      s: 'translation',
      h: 1,
      t: t('translation'),
      join: {
        t: t('translation:joinATranslationTeam'),
        s: 'translation',
      },
      'suggest-language': {
        t: t('translation:suggestLanguage'),
        s: 'translation',
      },
    },
    sitemap: {
      s: 'sitemap',
      h: 1,
      t: t('sitemap'),
    },

    // Not translated, this is a developer page
    typography: {
      s: 'typography',
      h: 1,
      t: 'Typography',
    },
  }
  for (const section in conf.account.fields) {
    for (const [field, controlScore] of Object.entries(conf.account.fields[section])) {
      if (Number(control) >= controlScore)
        pages.account[field] = {
          s: `account/${field}`,
          t: t(`account:${field}`),
        }
    }
  }
  if (Number(control) >= conf.account.fields.developer.apikeys)
    pages.new.apikey = {
      s: 'new/apikey',
      t: t('newApikey'),
      o: 30,
    }
  pages.account.reload = {
    s: `account/reload`,
    t: t(`account:reload`),
  }
  for (const design in designs) {
    // pages.designs[design] = {
    //   t: t(`designs:${design}.t`),
    //   s: `designs/${design}`,
    // }
    pages.new.pattern[design] = {
      s: `new/${design}`,
      t: t(`account:generateANewThing`, { thing: t(`designs:${design}.t`) }),
    }
  }
  for (const tag of tags) {
    pages.designs.tags[tag] = {
      s: `designs/tags/${tag}`,
      t: t(`tags:${tag}`),
    }
  }

  return pages
}

export const useNavigation = (param = {}, extra = []) => {
  const { ignoreControl = false } = param
  // Passing in the locale is not very DRY so let's just grab it from the router
  const { locale } = useRouter()
  // We need translation
  const { t } = useTranslation(ns)
  // We need the account if we want to take control into account
  const { account } = useAccount()

  const control = ignoreControl ? undefined : account.control

  const value = useMemo(() => {
    const siteNav = {
      ...pbn[locale],
      ...sitePages(t, control),
    }
    for (const [_path, _data] of extra) {
      objUpdate(siteNav, _path, _data)
    }

    // Apply some tweaks
    siteNav.blog.m = 1
    siteNav.blog.n = 1
    siteNav.showcase.m = 1
    siteNav.showcase.n = 1
    siteNav.docs.m = 1
    siteNav.newsletter._ = true

    // Set order on main sections
    siteNav.designs.o = 10
    siteNav.docs.o = 20
    siteNav.blog.o = 30
    siteNav.showcase.o = 40
    siteNav.community.o = 50
    siteNav.patterns.o = 60
    siteNav.sets.o = 70
    siteNav.account.o = 80
    siteNav.new.o = 90

    return {
      siteNav, // Site navigation
      slugLut: orderedSlugLut(siteNav), // Slug lookup table
    }
  }, [locale, extra, control])

  return value
}
