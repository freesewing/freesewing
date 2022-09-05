import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
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
    front, back, waistband, waistbandCurved, frontPocket, frontPocketFacing,
    backPocket, backPocketFacing, backPocketInterfacing, backPocketWelt,
    flyFacing, flyExtension, beltLoops,
  ],
})

// Named exports
export {
  front, back, waistband, waistbandCurved, frontPocket, frontPocketFacing,
  backPocket, backPocketFacing, backPocketInterfacing, backPocketWelt,
  flyFacing, flyExtension, beltLoops,
  Charlie,
}
