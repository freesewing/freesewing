import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n } from '../i18n/index.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'

// Setup our new design
const Titan = new Design({
  data: about,
  parts: [back, front],
})

// Named exports
export { back, front, Titan, i18n, about }
