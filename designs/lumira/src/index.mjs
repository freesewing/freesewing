//

import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { shape } from './shape.mjs'
import { leg } from './leg.mjs'
import { gusset } from './gusset.mjs'
import { waistband } from './waistband.mjs'

// Create new design
const Lumira = new Design({
  data,
  parts: [shape, leg, gusset, waistband],
})

// Named exports
export { shape, leg, gusset, waistband, i18n, Lumira }

// http://localhost:8001/new/lumira#view=%22inspect%22&settings=%7B%22measurements%22%3A%7B%22waist%22%3A880%2C%22waistBack%22%3A420%2C%22hips%22%3A920%2C%22seat%22%3A965%2C%22seatBack%22%3A490%2C%22upperLeg%22%3A580%2C%22knee%22%3A395%2C%22ankle%22%3A230%2C%22heel%22%3A340%2C%22inseam%22%3A800%2C%22crossSeam%22%3A800%2C%22crossSeamFront%22%3A380%2C%22waistToFloor%22%3A1100%2C%22waistToKnee%22%3A610%2C%22waistToUpperLeg%22%3A335%2C%22waistToSeat%22%3A210%2C%22waistToHips%22%3A80%7D%2C%22options%22%3A%7B%22cyclingChamois%22%3Atrue%2C%22waistband%22%3Atrue%7D%2C%22sabool%22%3A1%2C%22sa%22%3A10%2C%22embed%22%3Afalse%7D

// http://localhost:8000/new/lumira#view=%22inspect%22&settings=%7B%22measurements%22%3A%7B%22waist%22%3A960%2C%22waistBack%22%3A485%2C%22hips%22%3A885%2C%22seat%22%3A965%2C%22seatBack%22%3A490%2C%22upperLeg%22%3A570%2C%22knee%22%3A415%2C%22ankle%22%3A230%2C%22heel%22%3A370%2C%22inseam%22%3A800%2C%22crossSeam%22%3A800%2C%22crossSeamFront%22%3A380%2C%22waistToFloor%22%3A1100%2C%22waistToKnee%22%3A610%2C%22waistToUpperLeg%22%3A335%2C%22waistToSeat%22%3A230%2C%22waistToHips%22%3A120%7D%2C%22units%22%3A%22metric%22%7D

// http://localhost:8000/new/lumira#view=%22inspect%22&settings=%7B%22measurements%22%3A%7B%22waist%22%3A240%2C%22waistBack%22%3A120%2C%22hips%22%3A220%2C%22seat%22%3A240%2C%22seatBack%22%3A120%2C%22upperLeg%22%3A140%2C%22knee%22%3A105%2C%22ankle%22%3A57.5%2C%22heel%22%3A92.5%2C%22inseam%22%3A200%2C%22crossSeam%22%3A200%2C%22crossSeamFront%22%3A95%2C%22waistToFloor%22%3A275%2C%22waistToKnee%22%3A152.5%2C%22waistToUpperLeg%22%3A82.5%2C%22waistToSeat%22%3A57.5%2C%22waistToHips%22%3A30%7D%2C%22units%22%3A%22metric%22%2C%22embed%22%3Afalse%7D

// Nina: http://localhost:8001/new/lumira#view=%22inspect%22&settings=%7B%22measurements%22%3A%7B%22waist%22%3A680%2C%22waistBack%22%3A340%2C%22hips%22%3A790%2C%22seat%22%3A900%2C%22seatBack%22%3A490%2C%22upperLeg%22%3A530%2C%22knee%22%3A365%2C%22ankle%22%3A215%2C%22heel%22%3A330%2C%22inseam%22%3A690%2C%22crossSeam%22%3A730%2C%22crossSeamFront%22%3A340%2C%22waistToFloor%22%3A990%2C%22waistToKnee%22%3A580%2C%22waistToUpperLeg%22%3A300%2C%22waistToSeat%22%3A180%2C%22waistToHips%22%3A70%7D%2C%22units%22%3A%22metric%22%7D
