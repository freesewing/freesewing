import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import about from '../about.json' with { type: 'json' }
// Parts
import { front } from './front.mjs'
import { back } from './back.mjs'
import { bib } from './bib.mjs'
import { waistband } from './waistband.mjs'
import { bibPlacket } from './bibplacket.mjs'
import { pocketSlash } from './pocketslash.mjs'
import { pocketSlashShield } from './pocketslashshield.mjs'
import { pocketBib } from './pocketbib.mjs'
import { pocketBack } from './pocketback.mjs'
import { pocketCarpenter } from './pocketcarpenter.mjs'
import { pocketCarpenterExtra } from './pocketcarpenterextra.mjs'
import { hammerLoop } from './hammerloop.mjs'

// Create new design
const Opal = new Design({
  data: about,
  parts: [
    front,
    back,
    bib,
    waistband,
    bibPlacket,
    pocketSlash,
    pocketSlashShield,
    pocketBib,
    pocketBack,
    pocketCarpenter,
    pocketCarpenterExtra,
    hammerLoop,
  ],
})

// Named exports
export {
  front,
  back,
  bib,
  waistband,
  bibPlacket,
  pocketSlash,
  pocketSlashShield,
  pocketBib,
  pocketBack,
  pocketCarpenter,
  pocketCarpenterExtra,
  hammerLoop,
  i18n,
  Opal,
  about,
}
