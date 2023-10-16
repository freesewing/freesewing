import { Design, mergeI18n } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n as titanI18n } from '@freesewing/titan'
import { i18n as pacoI18n } from '../i18n/index.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { cuff } from './cuff.mjs'
import { frontPocketBag } from './frontpocketbag.mjs'
import { backPocketBag } from './backpocketbag.mjs'
import { backPocketWelt } from './backpocketwelt.mjs'
import { backPocketWeltInterfacing } from './backpocketweltinterfacing.mjs'
import { waistband } from './waistband.mjs'

// Setup our new design
const Paco = new Design({
  data,
  parts: [
    back,
    front,
    cuff,
    frontPocketBag,
    backPocketBag,
    backPocketWelt,
    backPocketWeltInterfacing,
    waistband,
  ],
})

// Merge translations
const i18n = mergeI18n([titanI18n, pacoI18n])

// Named exports
export {
  back,
  front,
  cuff,
  frontPocketBag,
  backPocketBag,
  backPocketWelt,
  backPocketWeltInterfacing,
  waistband,
  Paco,
  i18n,
}
