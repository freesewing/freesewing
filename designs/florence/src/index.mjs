import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { mask } from './mask.mjs'

// Setup our new design
const Florence = new Design({
  data,
  parts: [mask],
})

// Named exports
export { mask, Florence }
