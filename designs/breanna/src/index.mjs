import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { back } from './back.mjs'
import { front } from './front.mjs'
import { sleeve } from './sleeve.mjs'
// Skeleton parts for exporting and re-use
import { base } from './base.mjs'
import { frontBase } from './front-base.mjs'
import { sleeveCap } from './sleevecap.mjs'

// Create design
const Breanna = new Design({
  data,
  parts: [back, front, sleeve],
})

// Named exports
export { back, front, sleeve, base, frontBase, sleeveCap, Breanna }
