import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { front, back } from './frontback.mjs'
import { sleeve } from './sleeve.mjs'
import { cuff } from './cuff.mjs'
import { waistband } from './waistband.mjs'

// Setup our new design
const Sven = new Design({
  data,
  parts: [front, back, sleeve, cuff, waistband],
})

// Named exports
export { front, back, sleeve, cuff, waistband, Sven }
