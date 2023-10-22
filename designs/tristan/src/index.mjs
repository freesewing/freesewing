//

import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { frontPoints } from './frontpoints.mjs'
import { frontInside } from './frontinside.mjs'
import { frontOutside } from './frontoutside.mjs'
import { backPoints } from './backpoints.mjs'
import { backInside } from './backinside.mjs'
import { backOutside } from './backoutside.mjs'

// Create new design
const Tristan = new Design({
  data,
  parts: [frontPoints, frontInside, frontOutside, backPoints, backInside, backOutside],
})

// Named exports
export {
  frontPoints,
  frontInside,
  frontOutside,
  backPoints,
  backInside,
  backOutside,
  i18n,
  Tristan,
}

// http://localhost:8000/new/tristan#view=%22draft%22&settings=%7B%22measurements%22%3A%7B%22highBust%22%3A790%2C%22chest%22%3A840%2C%22underbust%22%3A735%2C%22waist%22%3A711%2C%22waistBack%22%3A358%2C%22bustSpan%22%3A190%2C%22neck%22%3A311%2C%22hpsToBust%22%3A245%2C%22hpsToWaistFront%22%3A415%2C%22hpsToWaistBack%22%3A410%2C%22shoulderToShoulder%22%3A390%2C%22shoulderSlope%22%3A15%7D%7D
