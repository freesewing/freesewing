//

import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { extendPath, controlPoints, createControlPoints, shape } from './shape.mjs'
import { leg } from './leg.mjs'
import { gusset } from './gusset.mjs'
import { waistband } from './waistband.mjs'

// Create new design
const Lumira = new Design({
  data,
  parts: [shape, gusset, leg, waistband],
})

// Named exports
export {
  i18n,
  Lumira,
  shape,
  gusset,
  leg,
  waistband,
  extendPath,
  controlPoints,
  createControlPoints,
}
