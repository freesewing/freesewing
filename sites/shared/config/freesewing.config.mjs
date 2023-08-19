/*
 * Do not use the 'config' webpack alias here because
 * this is used in the prebuild step which is pure NodeJS
 */
import { social } from '../../../config//social.mjs'

export const freeSewingConfig = {
  monorepo: 'https://github.com/freesewing/freesewing',
  backend: process.env.NEXT_PUBLIC_BACKEND || 'https://backend3.freesewing.org',
  maxWidth: 2800,
  account: {
    fields: {
      data: {
        bookmarks: 1,
        sets: 1,
        patterns: 1,
        apikeys: 4,
      },
      info: {
        username: 2,
        bio: 1,
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
        mfa: 4,
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
      img: 2,
      public: 3,
      units: 2,
      notes: 2,
    },
    patterns: {
      name: 1,
      img: 2,
      public: 3,
      notes: 2,
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
