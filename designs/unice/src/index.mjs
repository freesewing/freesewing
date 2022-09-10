import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { front } from './front.mjs'
import { back } from './back.mjs'
import { gusset } from './gusset.mjs'
import { elastic } from './elastic.mjs'

// Create new design
const Unice = new Design({
  data,
  parts: [ front, back, gusset, elastic ],
})

// Named exports
export { front, back, gusset, elastic, Unice }
