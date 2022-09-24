import { Design } from '@freesewing/core'
import { front } from './front.mjs'
import { back } from './back.mjs'
import { gusset } from './gusset.mjs'
import { elastic } from '@freesewing/ursula'
import { data } from '../data.mjs'

// Setup our new design
const Unice = new Design({
  data,
  parts: [front, back, gusset],
})

// Named exports
export {front, back, gusset, Unice} // export { back, front, gusset, Unice }