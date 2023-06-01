// Import Design constructor
import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Import parts
import { front } from './front.mjs'
import { back } from './back.mjs'
import { raglanSleeve } from './raglansleeve.mjs'
import { neckband } from './neckband.mjs'

// Create the new design
const Shelly = new Design({
  data,
  // A list of parts is all that is required.
  parts: [front, back, raglanSleeve, neckband],
})

/*
 * Named exports
 *
 * We export the design itself as well as each part individually.
 * This allows us to re-use these parts in other designs.
 */

export { front, back, raglanSleeve, neckband, Shelly }
