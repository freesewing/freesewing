import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { front } from './front.mjs'
import { back } from './back.mjs'
import { bottom } from './bottom.mjs'

// Create new design
const Senya = new Design({
  data,
  parts: [front, back, bottom],
})

// Named exports
export { front, back, bottom, Senya }
