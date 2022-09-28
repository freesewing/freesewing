import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { back } from './back.mjs'
import { front } from './front.mjs'
import { sleeve } from './sleeve.mjs'
import { pocket } from './pocket.mjs'
import { hood } from './hood.mjs'
import { waistband } from './waistband.mjs'
import { cuff } from './cuff.mjs'

// Create design
const Huey = new Design({
  data,
  parts: [back, front, sleeve, pocket, hood, waistband, cuff],
})

// Named exports
export { back, front, sleeve, pocket, hood, waistband, cuff, Huey }
