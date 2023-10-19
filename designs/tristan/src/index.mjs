//

import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { frontPoints } from './frontpoints.mjs'
import { frontInside } from './frontinside.mjs'
import { frontOutside } from './frontoutside.mjs'

// Create new design
const Tristan = new Design({
  data,
  parts: [frontPoints, frontInside, frontOutside],
})

// Named exports
export { frontPoints, frontInside, frontOutside, i18n, Tristan }
