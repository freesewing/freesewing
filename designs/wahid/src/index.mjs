import { Design, mergeI18n } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n as brianI18n } from '@freesewing/brian'
import { i18n as wahidI18n } from '../i18n/index.mjs'
import { front } from './front.mjs'
import { back } from './back.mjs'
import { frontFacing } from './frontfacing.mjs'
import { frontLining } from './frontlining.mjs'
import { pocketWelt } from './pocketwelt.mjs'
import { pocketBag } from './pocketbag.mjs'
import { pocketFacing } from './pocketfacing.mjs'
import { pocketInterfacing } from './pocketinterfacing.mjs'

// Setup our new design
const Wahid = new Design({
  data,
  parts: [
    front,
    back,
    frontFacing,
    frontLining,
    pocketWelt,
    pocketBag,
    pocketFacing,
    pocketInterfacing,
  ],
})

// Merge translations
const i18n = mergeI18n([brianI18n, wahidI18n], {
  o: { drop: Object.keys(brianI18n.en.o).filter((o) => o.indexOf('sleeve') === 0) },
})

// Named exports
export {
  front,
  back,
  frontFacing,
  frontLining,
  pocketWelt,
  pocketBag,
  pocketFacing,
  pocketInterfacing,
  Wahid,
  i18n,
}
