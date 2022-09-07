import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'

// Setup our new design
const Titan = new Design({
  data,
  parts: [back, front],
})

// Named exports
export { back, front, Titan }
