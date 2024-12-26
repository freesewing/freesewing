import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n } from '../i18n/index.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { waistband } from './waistband.mjs'

// Setup our new design
const Shin = new Design({
  data: about,
  parts: [back, front, waistband],
})

// Named exports
export { back, front, waistband, Shin, i18n, about }
