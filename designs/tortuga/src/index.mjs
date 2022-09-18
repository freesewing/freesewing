import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { body } from './body.mjs'

// Setup our new design
const Tortuga = new Design({
  data,
  parts: [body],
})

// Named exports
export { body, Tortuga }
