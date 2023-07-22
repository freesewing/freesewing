import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { frontpoints } from './frontpoints.mjs'
import { front } from './front.mjs'
import { back } from './back.mjs'
import { legband } from './legband.mjs'
import { legbandKeystone } from './legbandkeystone.mjs'
import { waistband } from './waistband.mjs'
import { pocketFacing } from './pocketfacing.mjs'
import { pocket } from './pocket.mjs'
import { zipperguard } from './zipperguard.mjs'
// Translation
import { i18n } from '../i18n/index.mjs'

// Create new design
const Cornelius = new Design({
  data,
  parts: [front, back, legband, legbandKeystone, waistband, pocketFacing, pocket, zipperguard],
})

// Named exports
export {
  front,
  back,
  legband,
  legbandKeystone,
  waistband,
  pocketFacing,
  pocket,
  zipperguard,
  frontpoints,
  Cornelius,
  i18n,
}
