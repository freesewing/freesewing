//

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'

// Parts
import { front } from './front.mjs'
import { side } from './side.mjs'
import { strapLeft } from './strapLeft.mjs'
import { strapRight } from './strapRight.mjs'
import { pocket } from './pocket.mjs'
import { pocketWelt } from './pocketWelt.mjs'
import { back } from './back.mjs'

// Create new design
const Cuthbert = new Design({
  data: {
    version: '0.0.1',
    name: '@freesewing/Cuthbert',
  },
  parts: [front, side, strapLeft, strapRight, back, pocket, pocketWelt],
})

// Named exports
export { front, side, pocket, pocketWelt, back, strapLeft, strapRight, Cuthbert }
