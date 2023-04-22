export const freeSewingConfig = {
  algolia: {
    app: 'MA0Y5A2PF0', // Application ID
    index: 'canary_freesewing.dev',
    key: '589c7a7e4d9c95a4f12868581259bf3a', // Search-only API key
  },
  bugsnag: {
    key: '1b3a900d6ebbfd071975e39b534e1ff5',
  },
  monorepo: 'https://github.com/freesewing/freesewing',
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
  },
  languages: ['en', 'es', 'de', 'fr', 'nl'],
}
