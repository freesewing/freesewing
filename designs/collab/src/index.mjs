import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { shared } from './shared.mjs'
import { back } from './back.mjs'
import { frontBase } from './front-base.mjs'
import { frontLeft } from './front-left.mjs'
import { frontRight } from './front-right.mjs'
import { waistband } from './waistband.mjs'
import { flyShield } from './fly-shield.mjs'

// Create new design
const Collab = new Design({
  data,
  parts: [shared, back, frontBase, frontLeft, frontRight, waistband, flyShield],
})

// Named exports
export { shared, back, frontBase, frontLeft, frontRight, waistband, flyShield, Collab }
