import allLanguages from '../../../config/languages.json' assert { type: 'json' }
import { freeSewingConfig as conf } from '../config/freesewing.config.mjs'
import { designs, tags } from '../config/designs.mjs'
import { loadTranslations } from './shared.mjs'
import i18next from 'i18next'

/* Remember Mc_Shifton:
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

export const extendSiteNav = async (pages, lang) => {
  const translations = await loadTranslations({
    site: 'org',
    namespaces: ['account', 'design', 'sections', 'tags'],
    languages: allLanguages,
  })

  const resources = {}
  resources[lang] = translations[lang]
  i18next.init({
    lng: lang,
    resources,
  })
  const { t } = i18next

  const addThese = {
    blog: {
      m: 1,
      s: 'blog',
      t: t('sections:blog'),
      n: 1,
    },
    showcase: {
      m: 1,
      s: 'showcase',
      t: t('sections:showcase'),
      n: 1,
    },
    docs: {
      m: 1,
      s: 'docs',
      t: t('sections:docs'),
    },
    newsletter: {
      s: 'newsletter',
      t: t('sections:newsletter'),
      _: 1,
    },
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
      reload: {
        s: `account/reload`,
        t: t(`account:reload`),
      },
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
      apikey: {
        c: conf.account.fields.developer.apikeys,
        s: 'new/apikey',
        t: t('newApikey'),
        o: 30,
      },
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
      addThese.account[field] = {
        s: `account/${field}`,
        t: t(`account:${field}`),
        c: controlScore,
      }
    }
  }

  for (const design in designs) {
    // addThese.designs[design] = {
    //   t: t(`designs:${design}.t`),
    //   s: `designs/${design}`,
    // }
    addThese.new.pattern[design] = {
      s: `new/${design}`,
      t: t(`account:generateANewThing`, { thing: t(`designs:${design}.t`) }),
    }
  }

  for (const tag of tags) {
    addThese.designs.tags[tag] = {
      s: `designs/tags/${tag}`,
      t: t(`tags:${tag}`),
    }
  }

  // Set order on main sections
  addThese.designs.o = 10
  addThese.docs.o = 20
  addThese.blog.o = 30
  addThese.showcase.o = 40
  addThese.community.o = 50
  addThese.patterns.o = 60
  addThese.sets.o = 70
  addThese.account.o = 80
  addThese.new.o = 90

  return { ...pages, ...addThese }
}
