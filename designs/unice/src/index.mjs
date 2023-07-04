import { Design, mergeI18n } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n as ursulaI18n } from '@freesewing/ursula'
import { i18n as uniceI18n } from '../i18n/index.mjs'
import { front } from './front.mjs'
import { back } from './back.mjs'
import { gusset } from './gusset.mjs'
import { elastic } from './elastic.mjs'

// Setup our new design
const Unice = new Design({
  data,
  parts: [front, back, gusset, elastic],
})

// Merge translations
const i18n = mergeI18n([ursulaI18n, uniceI18n], {
  o: { drop: ['fabricStretch'] },
})

// Named exports
export { front, back, gusset, elastic, Unice, i18n }
