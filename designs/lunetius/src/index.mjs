import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { lacerna } from './lacerna.mjs'

// Setup our new design
const Lunetius = new Design({
  data,
  parts: [lacerna],
})

// Named exports
export { lacerna, Lunetius }
