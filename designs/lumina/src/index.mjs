//

import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { points } from './points.mjs'
import { ipoints } from './ipoints.mjs'
import { zpoints } from './zpoints.mjs'
import { panel } from './panel.mjs'
import { leg } from './leg.mjs'
import { waistband } from './waistband.mjs'

// Create new design
const Lumina = new Design({
  data,
  parts: [/*zpoints, ipoints,*/ points, panel, leg, waistband],
})

// Named exports
export { i18n, Lumina, /*zpoints, ipoints,*/ points, panel, leg, waistband }

// http://localhost:8000/new/lumina#view=%22inspect%22&settings=%7B%22measurements%22%3A%7B%22waist%22%3A960%2C%22waistBack%22%3A440%2C%22hips%22%3A884%2C%22seat%22%3A980%2C%22seatBack%22%3A490%2C%22inseam%22%3A790%2C%22waistToSeat%22%3A230%2C%22waistToUpperLeg%22%3A280%2C%22waistToKnee%22%3A610%2C%22waistToHips%22%3A120%2C%22waistToFloor%22%3A1090%2C%22knee%22%3A415%2C%22ankle%22%3A230%2C%22crossSeam%22%3A800%2C%22crossSeamFront%22%3A380%2C%22heel%22%3A300%2C%22upperLeg%22%3A640%7D%7D

// http://localhost:8000/new/lumina#view=%22inspect%22&settings=%7B%22measurements%22%3A%7B%22waist%22%3A780%2C%22waistBack%22%3A360%2C%22hips%22%3A860%2C%22seat%22%3A980%2C%22seatBack%22%3A510%2C%22inseam%22%3A680%2C%22waistToSeat%22%3A200%2C%22waistToUpperLeg%22%3A250%2C%22waistToKnee%22%3A500%2C%22waistToHips%22%3A90%2C%22waistToFloor%22%3A890%2C%22knee%22%3A360%2C%22ankle%22%3A220%2C%22crossSeam%22%3A620%2C%22crossSeamFront%22%3A290%2C%22heel%22%3A280%2C%22upperLeg%22%3A580%7D%2C%22options%22%3A%7B%22length%22%3A1%2C%22waistreduction%22%3A0.1%2C%22waistLowering%22%3A0.012%2C%22waistlowering%22%3A0.181%7D%2C%22units%22%3A%22metric%22%7D
