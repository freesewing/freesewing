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
    patterns: {
      name: 1,
      img: 2,
      public: 3,
      notes: 2,
    },
  },
  social,
  patrons: {
    presets: {
      amounts: [5, 10, 25, 50, 100, 250, 500],
      periods: ['w', 'm', '3m', '6m', 'y', 'x'],
      currencies: {
        /*
         * Each currency has a multiplication factor to allow the
         * suggested amounts to remain meaningful in various currencies
         */
        eur: 1, // Euro
        usd: 1, // US Dollar
        aud: 1, // Australian Dollar
        bgn: 2, // Bulgarian Lev
        brl: 5, // Brazilian Real
        cad: 1, // Candadian Dollar
        chf: 1, // Swiss Frank
        czk: 25, // Czech Koruna
        dkk: 10, // Danish Krone
        gbp: 1, // UK Pound
        huf: 500, // Hungary Forint
        pln: 4, // Polish Zloty
        ron: 5, // Romanion Leu
        sek: 10, // Swedish Krona
      },
    },
  },
}
