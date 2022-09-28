import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { front } from './front.mjs'
import { pocket } from './pocket.mjs'
import { strap } from './strap.mjs'

// Setup our new design
const Albert = new Design({
  data,
  parts: [front, pocket, strap],
})

// Named exports
export { front, pocket, strap, Albert }
