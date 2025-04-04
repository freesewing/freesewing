import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { back } from './back.mjs'
import { side } from './side.mjs'
import { front } from './front.mjs'
import { inset } from './inset.mjs'
import { i18n } from '../i18n/index.mjs'

// Create design
const Bruce = new Design({
  data: about,
  parts: [back, side, front, inset],
})

// Named exports
export { back, side, front, inset, Bruce, i18n, about }
