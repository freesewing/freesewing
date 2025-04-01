import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import about from '../about.json' with { type: 'json' }
// Parts
import { front } from './front.mjs'
import { back } from './back.mjs'
import { waistband } from './waistband.mjs'

// Create new design
const Lily = new Design({
  data: about,
  parts: [front, back, waistband],
})

// Named exports
export { front, back, waistband, Lily, i18n, about }
