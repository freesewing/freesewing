import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { shared } from './shared.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'

// Create new design
const Collab = new Design({
  data,
  parts: [shared, back, front],
})

// Named exports
export { shared, back, front, Collab }
