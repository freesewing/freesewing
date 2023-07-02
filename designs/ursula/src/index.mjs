import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { gusset } from './gusset.mjs'
import { elastic } from './elastic.mjs'

// Setup our new design
const Ursula = new Design({
  data,
  parts: [back, front, gusset, elastic],
})

// Named exports
export { back, front, gusset, elastic, Ursula, i18n }
