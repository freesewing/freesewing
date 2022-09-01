import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { demo } from './demo.mjs'

// Setup our new design
const Rendertest = new Design({
  data,
  parts: [ demo ]
})

// Named exports
export { demo, Rendertest }

