import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n } from '../i18n/index.mjs'
import { front } from './front.mjs'
import { back } from './back.mjs'
// Re-export skeleton parts so peope can re-use them
import { base } from './base.mjs'

// Setup our new design
const Walburga = new Design({
  data: about,
  parts: [back, front],
})

// Named exports
export { back, front, base, Walburga, i18n, about }
