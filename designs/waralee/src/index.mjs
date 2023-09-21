import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
import { pants } from './pants.mjs'
import { cutout } from './cutout.mjs'
import { pocket } from './pocket.mjs'
import { backPocket } from './backpocket.mjs'
import { facings } from './facings.mjs'
import { mini } from './mini.mjs'
import { waistbandFront, waistbandBack, strapFront, strapBack } from './waistband.mjs'
// Re-export skeleton parts so peope can re-use them
import { pantsProto } from './pantsproto.mjs'

// Setup our new design
const Waralee = new Design({
  data,
  parts: [
    pants,
    cutout,
    pocket,
    backPocket,
    facings,
    mini,
    waistbandFront,
    waistbandBack,
    strapFront,
    strapBack,
  ],
})

// Named exports
export {
  pants,
  cutout,
  pocket,
  backPocket,
  facings,
  mini,
  waistbandFront,
  waistbandBack,
  strapFront,
  strapBack,
  pantsProto,
  Waralee,
  i18n,
}
