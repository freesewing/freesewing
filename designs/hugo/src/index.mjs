import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { sleeve } from './sleeve.mjs'
import { pocket } from './pocket.mjs'
import { pocketFacing } from './pocketfacing.mjs'
import { hoodSide } from './hoodside.mjs'
import { hoodCenter } from './hoodcenter.mjs'
import { waistband } from './waistband.mjs'
import { cuff } from './cuff.mjs'

// Setup our new design
const Hugo = new Design({
  data,
  parts: [back, front, sleeve, pocket, pocketFacing, hoodSide, hoodCenter, waistband, cuff],
})

// Named exports
export { back, front, sleeve, pocket, pocketFacing, hoodSide, hoodCenter, waistband, cuff, Hugo }
