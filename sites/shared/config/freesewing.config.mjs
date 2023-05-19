import { social } from 'config/social.mjs'

export const freeSewingConfig = {
  monorepo: 'https://github.com/freesewing/freesewing',
  backend: process.env.NEXT_PUBLIC_BACKEND || 'https://backend3.freesewing.org',
  maxWidth: 2800,
  account: {
    fields: {
      data: {
        sets: 1,
        patterns: 1,
      },
      info: {
        bio: 1,
        email: 3,
        github: 3,
        img: 2,
        units: 2,
        language: 2,
        username: 2,
      },
      settings: {
        compare: 3,
        consent: 2,
        control: 1,
        mfa: 4,
        newsletter: 2,
        password: 2,
      },
      developer: {
        apikeys: 4,
      },
    },
    sets: {
      name: 1,
      img: 2,
      public: 3,
      units: 2,
      notes: 2,
    },
  },
  social,
}
