import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { shared } from './shared.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { waistband } from './waistband.mjs'

// Create new design
const Collab = new Design({
  data,
  parts: [shared, back, front, waistband],
})

// Named exports
export { shared, back, front, waistband, Collab }
