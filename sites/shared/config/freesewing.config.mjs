//  __SDEFILE__ - This file is a dependency for the stand-alone environment
/*
 * Do not use the 'config' webpack alias here because
 * this is used in the prebuild step which is pure NodeJS
 */
import { social } from './social.mjs'

export const isProduction = process?.env?.VERCEL_ENV === 'production'

export const freeSewingConfig = {
  monorepo: 'https://github.com/freesewing/freesewing',
  backend: process.env.NEXT_PUBLIC_BACKEND || 'https://backend3.freesewing.org',
  maxWidth: 2800,
  account: {
    fields: {
      data: {
        bookmarks: 2,
        sets: 1,
        patterns: 1,
        apikeys: 4,
      },
      info: {
        username: 2,
        bio: 2,
        img: 2,
        email: 3,
      },
      settings: {
        language: 2,
        units: 2,
        newsletter: 2,
        compare: 3,
        control: 1,
        consent: 2,
      },
      security: {
        password: 2,
        mfa: 3,
        apikeys: 4,
      },
      identities: {
        github: 3,
        instagram: 3,
        mastodon: 3,
        reddit: 3,
        twitter: 3,
        twitch: 3,
        tiktok: 3,
        website: 3,
      },
    },
    sets: {
      name: 1,
      img: 1,
      public: 3,
      units: 1,
      notes: 2,
      createdAt: 2,
      updatedAt: 2,
      id: 4,
    },
    patterns: {
      name: 1,
      img: 1,
      public: 3,
      notes: 2,
      createdAt: 2,
      updatedAt: 2,
      id: 4,
    },
  },
  control: {
    core: {
      sa: 2,
      paperless: 2,
      locale: 3,
      units: 1,
      complete: 4,
      expand: 4,
      only: 4,
      scale: 4,
      margin: 4,
    },
    ui: {
      renderer: 4,
      kiosk: 2,
    },
    views: {
      draft: 1,
      measies: 1,
      test: 3,
      print: 1,
      export: 1,
      save: 1,
      edit: 4,
      logs: 2,
      inspect: 4,
      docs: 1,
    },
  },
  social,
  statuses: {
    0: {
      name: 'inactive',
      color: 'neutral',
    },
    1: {
      name: 'active',
      color: 'success',
    },
    '-1': {
      name: 'paused',
      color: 'warning',
    },
    '-2': {
      name: 'disabled',
      color: 'error',
    },
  },
}

export const controlLevels = {
  ...freeSewingConfig.account.fields.data,
  ...freeSewingConfig.account.fields.info,
  ...freeSewingConfig.account.fields.settings,
  ...freeSewingConfig.account.fields.security,
  ...freeSewingConfig.account.fields.identities,
  sets: freeSewingConfig.account.sets,
  patterns: freeSewingConfig.account.patterns,
  core: freeSewingConfig.control.core,
  ui: freeSewingConfig.control.ui,
  views: freeSewingConfig.control.views,
}
