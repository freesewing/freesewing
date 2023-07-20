import { freeSewingConfig as conf } from '../config/freesewing.config.mjs'
import { designs, tags } from '../config/designs.mjs'
// Translation via i18next directly
import i18next from 'i18next'
// Actual translations for various languages
// EN
import accountEn from '../../org/public/locales/en/sections.json' assert { type: 'json' }
import designsEn from '../../org/public/locales/en/sections.json' assert { type: 'json' }
import sectionsEn from '../../org/public/locales/en/sections.json' assert { type: 'json' }
import tagsEn from '../../org/public/locales/en/sections.json' assert { type: 'json' }
// DE
import accountDe from '../../org/public/locales/de/sections.json' assert { type: 'json' }
import designsDe from '../../org/public/locales/de/sections.json' assert { type: 'json' }
import sectionsDe from '../../org/public/locales/de/sections.json' assert { type: 'json' }
import tagsDe from '../../org/public/locales/de/sections.json' assert { type: 'json' }
// ES
import accountEs from '../../org/public/locales/es/sections.json' assert { type: 'json' }
import designsEs from '../../org/public/locales/es/sections.json' assert { type: 'json' }
import sectionsEs from '../../org/public/locales/es/sections.json' assert { type: 'json' }
import tagsEs from '../../org/public/locales/es/sections.json' assert { type: 'json' }
// FR
import accountFr from '../../org/public/locales/fr/sections.json' assert { type: 'json' }
import designsFr from '../../org/public/locales/fr/sections.json' assert { type: 'json' }
import sectionsFr from '../../org/public/locales/fr/sections.json' assert { type: 'json' }
import tagsFr from '../../org/public/locales/fr/sections.json' assert { type: 'json' }
// NL
import accountNl from '../../org/public/locales/nl/sections.json' assert { type: 'json' }
import designsNl from '../../org/public/locales/nl/sections.json' assert { type: 'json' }
import sectionsNl from '../../org/public/locales/nl/sections.json' assert { type: 'json' }
import tagsNl from '../../org/public/locales/nl/sections.json' assert { type: 'json' }
// UK
import accountUk from '../../org/public/locales/uk/sections.json' assert { type: 'json' }
import designsUk from '../../org/public/locales/uk/sections.json' assert { type: 'json' }
import sectionsUk from '../../org/public/locales/uk/sections.json' assert { type: 'json' }
import tagsUk from '../../org/public/locales/uk/sections.json' assert { type: 'json' }

/*
 * Construct an object we can load the translations from
 */
const translations = {
  en: {
    account: accountEn,
    design: designsEn,
    sections: sectionsEn,
    tags: tagsEn,
  },
  de: {
    account: accountDe,
    design: designsDe,
    sections: sectionsDe,
    tags: tagsDe,
  },
  es: {
    account: accountEs,
    design: designsEs,
    sections: sectionsEs,
    tags: tagsEs,
  },
  fr: {
    account: accountFr,
    design: designsFr,
    sections: sectionsFr,
    tags: tagsFr,
  },
  nl: {
    account: accountNl,
    design: designsNl,
    sections: sectionsNl,
    tags: tagsNl,
  },
  uk: {
    account: accountUk,
    design: designsUk,
    sections: sectionsUk,
    tags: tagsUk,
  },
}

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

export const extendSiteNav = (pages, lang) => {
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
