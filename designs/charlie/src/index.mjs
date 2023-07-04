import { Design, mergeI18n } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n as titanI18n } from '@freesewing/titan'
import { i18n as charlieI18n } from '../i18n/index.mjs'
// Parts
import { back } from './back.mjs'
import { front } from './front.mjs'
import { waistband } from './waistband.mjs'
import { waistbandCurved } from './waistband-curved.mjs'
import { frontPocket } from './front-pocket.mjs'
import { frontPocketFacing } from './front-pocket-facing.mjs'
import { backPocket } from './back-pocket.mjs'
import { backPocketFacing } from './back-pocket-facing.mjs'
import { backPocketInterfacing } from './back-pocket-interfacing.mjs'
import { backPocketWelt } from './back-pocket-welt.mjs'
import { flyFacing } from './fly-facing.mjs'
import { flyExtension } from './fly-extension.mjs'
import { beltLoops } from './beltloops.mjs'

// Create design
const Charlie = new Design({
  data,
  parts: [
    front,
    back,
    waistband,
    waistbandCurved,
    frontPocket,
    frontPocketFacing,
    backPocket,
    backPocketFacing,
    backPocketInterfacing,
    backPocketWelt,
    flyFacing,
    flyExtension,
    beltLoops,
  ],
})

// Merge translations
const i18n = mergeI18n([titanI18n, charlieI18n])

// Named exports
export {
  front,
  back,
  waistband,
  waistbandCurved,
  frontPocket,
  frontPocketFacing,
  backPocket,
  backPocketFacing,
  backPocketInterfacing,
  backPocketWelt,
  flyFacing,
  flyExtension,
  beltLoops,
  Charlie,
  i18n,
}
