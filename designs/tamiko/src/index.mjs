import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { top } from './top.mjs'

// Setup our new design
const Tamiko = new Design({
  data,
  parts: [top],
})

// Named exports
export { top, Tamiko }
