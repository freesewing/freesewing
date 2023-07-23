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

export const extendSiteNav = async (siteNav, lang) => {
  const translations = await loadTranslations({
    site: 'org',
    namespaces: ['account', 'design', 'sections', 'tags'],
    language: lang,
  })

  const resources = {}
  resources[lang] = translations
  i18next.init({
    lng: lang,
    resources,
  })
  const { t } = i18next

  // Add new
  siteNav.new = {
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
  }

  // Add designs
  siteNav.designs = {
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
  }
  for (const design in designs) {
    // addThese.designs[design] = {
    //   t: t(`designs:${design}.t`),
    //   s: `designs/${design}`,
    // }
    siteNav.new.pattern[design] = {
      s: `new/${design}`,
      t: t(`account:generateANewThing`, { thing: t(`designs:${design}.t`) }),
    }
  }
  for (const tag of tags) {
    siteNav.designs.tags[tag] = {
      s: `designs/tags/${tag}`,
      t: t(`tags:${tag}`),
    }
  }

  for (const key of ['patterns', 'sets', 'community']) {
    siteNav[key] = { m: 1, s: key, t: t(`sections:${key}`) }
  }

  // Configure properties of blog and showcase sections
  for (const key of ['blog', 'showcase']) {
    siteNav[key].m = 1
    siteNav[key].s = key
    siteNav[key].t = t(`sections:${key}`)
    siteNav[key].n = 1
  }

  // Add docs as section
  siteNav.docs.m = 1

  // Add newsletter but hide it
  siteNav.newsletter.t = t('sections:newsletter')
  siteNav.newsletter._ = 1
  siteNav.newsletter.s = 'newsletter'

  // Add account
  siteNav.account = {
    m: 1,
    s: 'account',
    t: t('sections:account'),
    n: 1,
    reload: {
      s: `account/reload`,
      t: t(`account:reload`),
    },
  }
  for (const section in conf.account.fields) {
    for (const [field, controlScore] of Object.entries(conf.account.fields[section])) {
      siteNav.account[field] = {
        s: `account/${field}`,
        t: t(`account:${field}`),
        c: controlScore,
      }
    }
  }

  // Add api keys
  siteNav.apikeys = {
    _: 1,
    s: 'apikeys',
    h: 1,
    t: t('apikeys'),
  }

  // Add curate
  siteNav.curate = {
    s: 'curate',
    h: 1,
    t: t('curate'),
    sets: {
      t: t('curateSets'),
      s: 'curate/sets',
    },
  }

  // Add profile
  siteNav.profile = {
    s: 'profile',
    h: 1,
    t: t('yourProfile'),
  }

  // Add translation
  siteNav.translation = {
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
  }

  // Add search
  siteNav.search = {
    s: 'search',
    h: 1,
    t: t('search'),
  }

  // Add sitemap
  siteNav.sitemap = {
    s: 'sitemap',
    h: 1,
    t: t('sitemap'),
  }

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

  return siteNav
}
