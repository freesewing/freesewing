import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { back } from './back.mjs'
import { side } from './side.mjs'
import { front } from './front.mjs'
import { inset } from './inset.mjs'

// Create design
const Bruce = new Design({
  data,
  parts: [ back, side, front, inset ]
})

// Named exports
export { back, side, front, inset, Bruce }

