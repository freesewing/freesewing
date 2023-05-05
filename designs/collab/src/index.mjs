//

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { box } from './box.mjs'

// Create new design
const Collab = new Design({
  data,
  parts: [box],
})

// Named exports
export { box, Collab }
