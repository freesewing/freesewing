import { freeSewingConfig as conf } from '../config/freesewing.config.mjs'
import { designs } from '../config/designs.mjs'
import i18nConfig from '../config/i18n.config.mjs'
import { loadTranslations } from './shared.mjs'
import i18next from 'i18next'

/* Remember Mc_Shifton:
 * Note: Set 'm' to truthy to show this as a main section in the side-navigation (optional)
 * Note: Set 'c' to set the control level to hide things from users (optional)
 * Note: Set 's' to the slug (optional insofar as it's not a real page (a spacer for the header))
 * Note: Set '_' to never show the page in the site navigation
 * Note: Set 'h' to indicate this is a top-level page that should be hidden from the side-nav (like search)
 * Note: Set 'i' when something should be included as top-level in the collapse side-navigation (optional)
 * Note: Set 'f' to add the page to the footer
 * Note: Set 't' to the title
 * Note: Set 'o' to set the order (optional)
 * Note: Set 'n' to mark this as a noisy entry that should always be closed unless active (like blog)
 */

export const extendSiteNav = async (siteNav, lang) => {
  const resources = await loadTranslations({
    site: 'org',
    namespaces: ['account', 'sections', 'tags', 'designs', 'patrons'],
    languages: [lang],
  })

  const config = i18nConfig([lang])
  await i18next.init({
    lng: lang,
    resources,
    interpolation: config.interpolation,
  })
  const { t } = i18next

  // Add new
  siteNav.new = {
    m: 1,
    s: 'new',
    h: 1,
    t: t('sections:new'),
    apikey: {
      c: conf.account.fields.security.apikeys,
      s: 'new/apikey',
      t: t('newApikey'),
      o: 30,
    },
    bookmark: {
      s: 'new/bookmark',
      t: t('account:newBookmark'),
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
    showcase: {
      t: t('newShowcase'),
      s: 'new/showcase',
      0: 30,
    },
    blog: {
      t: t('newBlog'),
      s: 'new/blog',
      0: 30,
    },
  }

  // Add designs
  siteNav.designs = {
    m: 1,
    s: 'designs',
    t: t('sections:designs'),
    n: 1,
  }
  for (const design in designs) {
    siteNav.designs[design] = {
      t: t(`designs:${design}.t`),
      s: `designs/${design}`,
    }
    siteNav.new.pattern[design] = {
      s: `new/${design}`,
      t: t(`account:generateANewThing`, { thing: t(`designs:${design}.t`) }),
    }
  }

  // Configure properties of blog and showcase sections
  for (const key of ['blog', 'showcase']) {
    siteNav[key].m = 1
    siteNav[key].s = key
    siteNav[key].t = t(`sections:${key}`)
    siteNav[key].n = 1
  }

  // Add docs as section
  siteNav.docs.t = t('sections:docs')
  siteNav.docs.m = 1
  siteNav.docs.s = 'docs'

  // Add newsletter but hide it
  siteNav.newsletter.t = t('sections:newsletter')
  siteNav.newsletter._ = 1
  siteNav.newsletter.s = 'newsletter'

  // Add admin but hide it
  siteNav.admin = {
    t: t('sections:admin'),
    _: 1,
    s: 'admin',
    cset: {
      t: 'Curated Measurement Sets',
      s: 'admin/cset',
      _: 1,
      h: 1,
    },
  }

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

  // Add curated measurements sets
  siteNav['curated-sets'] = {
    _: 1,
    m: 1,
    s: 'curated-sets',
    t: t('sections:curatedSets'),
    n: 1,
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

  // Add patrons
  siteNav.patrons = {
    _: 1,
    s: 'patrons',
    h: 1,
    t: t('patrons:freeSewingPatrons'),
    join: {
      s: 'patrons/join',
      t: t('patrons:joinThePatrons'),
    },
    thanks: {
      _: 1,
      s: 'thanks',
      t: t('patrons:thankYouVeryMuch'),
    },
  }

  // Add donate
  siteNav.donate = {
    _: 1,
    s: 'donate',
    h: 1,
    t: t('patrons:donate'),
    thanks: {
      _: 1,
      s: 'patrons/thanks',
      h: 1,
      t: t('patrons:thankYouVeryMuch'),
    },
  }

  // Add support
  siteNav.support = {
    _: 1,
    m: 1,
    s: 'support',
    t: t('sections:support'),
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
  siteNav.new.o = 50
  siteNav.account.o = 60
  siteNav.support.o = 70

  return siteNav
}
