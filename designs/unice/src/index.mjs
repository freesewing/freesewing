import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
import { front } from './front.mjs'
import { back } from './back.mjs'
import { gusset } from './gusset.mjs'
import { elastic } from './elastic.mjs'

// Setup our new design
const Unice = new Design({
  data,
  parts: [front, back, gusset, elastic],
})

// Named exports
export { front, back, gusset, elastic, Unice, i18n }
