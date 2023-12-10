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
import { peplumFront } from './peplumFront.mjs'
import { peplumBack } from './peplumBack.mjs'

// Create new design
const Tristan = new Design({
  data,
  parts: [
    frontPoints,
    frontInside,
    frontOutside,
    backPoints,
    backInside,
    backOutside,
    peplumFront,
    peplumBack,
  ],
})

// Named exports
export {
  frontPoints,
  frontInside,
  frontOutside,
  backPoints,
  backInside,
  backOutside,
  peplumFront,
  peplumBack,
  i18n,
  Tristan,
}

// http://localhost:8000/new/tristan#view=%22draft%22&settings=%7B%22measurements%22%3A%7B%22highBust%22%3A790%2C%22chest%22%3A840%2C%22underbust%22%3A735%2C%22waist%22%3A711%2C%22waistBack%22%3A358%2C%22bustSpan%22%3A190%2C%22neck%22%3A311%2C%22hpsToBust%22%3A245%2C%22hpsToWaistFront%22%3A415%2C%22hpsToWaistBack%22%3A410%2C%22shoulderToShoulder%22%3A390%2C%22shoulderSlope%22%3A15%7D%7D

// lasermonkey12: http://localhost:8000/new/tristan#view=%22inspect%22&settings=%7B%22measurements%22%3A%7B%22highBust%22%3A889%2C%22chest%22%3A940%2C%22underbust%22%3A797%2C%22waist%22%3A787%2C%22waistBack%22%3A362%2C%22bustSpan%22%3A203%2C%22neck%22%3A381%2C%22hpsToBust%22%3A292%2C%22hpsToWaistFront%22%3A457%2C%22hpsToWaistBack%22%3A438%2C%22shoulderToShoulder%22%3A406%2C%22shoulderSlope%22%3A26%7D%2C%22options%22%3A%7B%22cutRoundnessFront%22%3A0.829%2C%22cutDepthFront%22%3A0.668%2C%22cutDepthBack%22%3A0.166%2C%22cutRoundnessBack%22%3A0.248%2C%22strapWidth%22%3A0.6%7D%7D
