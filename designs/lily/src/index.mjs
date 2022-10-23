import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { front } from './front.mjs'
import { back } from './back.mjs'
import { waistband } from './waistband.mjs'

// Create new design
const Lily = new Design({
  data,
  parts: [ front, back, waistband],
})

// Named exports
export { front, back, waistband, Lily }
