import { Design, mergeI18n } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n as titanI18n } from '@freesewing/titan'
import { i18n as paulI18n } from '../i18n/index.mjs'
// Parts
import { back } from './back.mjs'
import { front } from './front.mjs'
import { gusset } from './gusset.mjs'
import { waistband } from './waistband.mjs'
import { waistbandCurved } from './waistband-curved.mjs'
import { flyFacing } from './fly-facing.mjs'
import { flyPlacket } from './fly-placket.mjs'
import { flyExtension } from './fly-extension.mjs'
import { beltLoops } from './beltloops.mjs'
import { pocketBag } from './pocket-bag.mjs'
import { pocketFacing } from './pocket-facing.mjs'
import { yoke } from './yoke.mjs'
import { backPocket } from './back-pocket.mjs'
import { pocketTrim } from './pocket-trim.mjs'

// Create design
const Paul = new Design({
  data,
  parts: [
    front,
    back,
    waistband,
    waistbandCurved,
    flyFacing,
    flyPlacket,
    flyExtension,
    beltLoops,
    pocketBag,
    pocketFacing,
    pocketTrim,
    yoke,
    backPocket,
    gusset,
  ],
})

// Merge translations
const i18n = mergeI18n([titanI18n, paulI18n])

// Named exports
export {
  front,
  back,
  waistband,
  waistbandCurved,
  flyFacing,
  flyExtension,
  flyPlacket,
  beltLoops,
  pocketBag,
  pocketFacing,
  pocketTrim,
  yoke,
  backPocket,
  gusset,
  Paul,
  i18n,
}
