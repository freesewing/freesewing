import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { front } from './front.mjs'
import { back } from './back.mjs'

// Create new design
const Lily = new Design({
  data,
  parts: [ front, back],
})

// Named exports
export { front, back, Lily }
