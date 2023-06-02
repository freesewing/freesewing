//

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { front } from './front.mjs'
import { back } from './back.mjs'
import { raglanSleeve } from './raglansleeve.mjs'
import { neckband } from './neckband.mjs'
import { zipperGuard } from './zipperguard.mjs'
import { crotchGusset } from './crotchgusset.mjs'

// Create new design
const Onyx = new Design({
  data,
  parts: [front, back, raglanSleeve, neckband, zipperGuard, crotchGusset],
})

// Named exports
export { front, back, raglanSleeve, neckband, zipperGuard, crotchGusset, Onyx }
