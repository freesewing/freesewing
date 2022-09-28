import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { waistband } from './waistband.mjs'

// Setup our new design
const Penelope = new Design({
  data,
  parts: [back, front, waistband],
})

// Named exports
export { back, front, waistband, Penelope }
