import { Design } from '@freesewing/core'
import { front } from './front.mjs'
import { back } from './back.mjs'
import { gusset } from './gusset.mjs'
import { elastic } from './elastic.mjs'
import { data } from '../data.mjs'

// Setup our new design
const Unice = new Design({
  data,
  parts: [front, back, gusset, elastic],
})

// Named exports
export {front, back, gusset, elastic, Unice} // export { back, front, gusset, Unice }