//
import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
import about from '../about.json' with { type: 'json' }
// Parts
import { front } from './front.mjs'
import { side } from './side.mjs'

// Create new design
const Bonny = new Design({
  data,
  parts: [side, front],
})

// Named exports
export { side, i18n, Bonny, about }
