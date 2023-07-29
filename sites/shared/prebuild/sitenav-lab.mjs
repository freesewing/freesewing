import i18nConfig from '../config/i18n.config.mjs'
import { loadTranslations } from './shared.mjs'
import { freeSewingConfig as conf } from '../config/freesewing.config.mjs'
import { designs, tags } from '../config/designs.mjs'
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
  const resources = await loadTranslations({
    site: 'lab',
    namespaces: ['account', 'sections', 'tags', 'designs'],
    languages: [lang],
  })

  const config = i18nConfig([lang])
  await i18next.init({
    lng: lang,
    resources,
    interpolation: config.interpolation,
  })
  const { t } = i18next

  const addThese = {
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
    docs: {
      m: 1,
      s: 'docs',
      t: t('sections:docs'),
    },
    code: {
      m: 1,
      s: 'code',
      t: t('sections:code'),
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
    },
    profile: {
      s: 'profile',
      h: 1,
      t: t('yourProfile'),
    },
    sitemap: {
      s: 'sitemap',
      h: 1,
      t: t('sitemap'),
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
  addThese.patterns.o = 20
  addThese.sets.o = 30
  addThese.docs.o = 40
  addThese.code.o = 50
  addThese.account.o = 80
  addThese.new.o = 90

  return { ...pages, ...addThese }
}
