//

import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { leg } from './leg.mjs'

// Create new design
const Lumira = new Design({
  data,
  parts: [leg],
})

// Named exports
export { leg, i18n, Lumira }

// http://localhost:8000/new/lumira#view=%22inspect%22&settings=%7B%22measurements%22%3A%7B%22waist%22%3A960%2C%22waistBack%22%3A485%2C%22hips%22%3A885%2C%22seat%22%3A965%2C%22seatBack%22%3A490%2C%22upperLeg%22%3A570%2C%22knee%22%3A415%2C%22ankle%22%3A230%2C%22heel%22%3A370%2C%22inseam%22%3A800%2C%22crossSeam%22%3A800%2C%22crossSeamFront%22%3A380%2C%22waistToFloor%22%3A1100%2C%22waistToKnee%22%3A610%2C%22waistToUpperLeg%22%3A335%2C%22waistToSeat%22%3A230%2C%22waistToHips%22%3A120%7D%2C%22units%22%3A%22metric%22%7D
