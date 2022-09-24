import { Design } from '@freesewing/core'
import { front } from './front.mjs'
// import { back } from './back.mjs'
// import { gusset } from './gusset.mjs'
import { data } from '../data.mjs'

// Setup our new design
const Unice = new Design({
  data,
  parts: [front], //  parts: [back, front],
})

// Named exports
export {front, Unice} // export { back, front, gusset, Unice }