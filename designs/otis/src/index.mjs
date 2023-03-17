//

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { back } from './back.mjs'
import { front } from './front.mjs'
import { shortsleeve } from './shortsleeve.mjs'
import { longsleeve } from './longsleeve.mjs'

// Create new design
const Otis = new Design({
  data,
  parts: [back, front, shortsleeve, longsleeve],
})

// Named exports
export { back, front, shortsleeve, longsleeve, Otis }
