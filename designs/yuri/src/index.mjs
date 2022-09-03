import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { sleeve } from './sleeve.mjs'
import { gusset } from './gusset.mjs'
import { hoodSide } from './hoodside.mjs'
import { hoodCenter } from './hoodcenter.mjs'

// Setup our new design
const Yuri = new Design({
  data,
  parts: [
    back,
    front,
    sleeve,
    gusset,
    hoodSide,
    //  hoodCenter
  ],
})

// Named exports
export { back, front, sleeve, gusset, hoodSide, hoodCenter, Yuri }
