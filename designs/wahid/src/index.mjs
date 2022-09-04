import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { front } from './front.mjs'
import { back } from './back.mjs'
import { frontFacing } from './frontfacing.mjs'
import { frontLining } from './frontlining.mjs'
import { pocketWelt } from './pocketwelt.mjs'
import { pocketBag } from './pocketbag.mjs'
import { pocketFacing } from './pocketfacing.mjs'
import { pocketInterfacing } from './pocketinterfacing.mjs'

// Setup our new design
const Wahid = new Design({
  data,
  parts: [
    front,
    back,
    frontFacing,
    frontLining,
    pocketWelt,
    pocketBag,
    pocketFacing,
    pocketInterfacing,
  ],
})

// Named exports
export {
  front,
  back,
  frontFacing,
  frontLining,
  pocketWelt,
  pocketBag,
  pocketFacing,
  pocketInterfacing,
  Wahid,
}
