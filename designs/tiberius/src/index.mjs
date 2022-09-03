import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { tunica } from './tunica.mjs'

// Setup our new design
const Tiberius = new Design({
  data,
  parts: [tunica],
})

// Named exports
export { tunica, Tiberius }
