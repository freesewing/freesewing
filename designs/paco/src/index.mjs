import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { cuff } from './cuff.mjs'
import { frontPocketBag } from './frontpocketbag.mjs'
import { backPocketBag } from './backpocketbag.mjs'
import { backPocketWelt } from './backpocketwelt.mjs'
import { backPocketWeltInterfacing } from './backpocketweltinterfacing.mjs'

// Setup our new design
const Paco = new Design({
  data,
  parts: [
    back,
    front,
    cuff,
    frontPocketBag,
    backPocketBag,
    backPocketWelt,
    backPocketWeltInterfacing,
  ],
})

// Named exports
export {
  back,
  front,
  cuff,
  frontPocketBag,
  backPocketBag,
  backPocketWelt,
  backPocketWeltInterfacing,
  Paco,
}
