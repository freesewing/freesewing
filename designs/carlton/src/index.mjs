import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { front } from './front.mjs'
import { back } from './back.mjs'
import { tail } from './tail.mjs'
import { topSleeve } from './topsleeve.mjs'
import { underSleeve } from './undersleeve.mjs'
import { belt } from './belt.mjs'
import { collarStand } from './collarstand.mjs'
import { collar } from './collar.mjs'
import { cuffFacing } from './cufffacing.mjs'
import { pocket } from './pocket.mjs'
import { pocketFlap } from './pocketflap.mjs'
import { pocketLining } from './pocketlining.mjs'
import { chestPocketWelt } from './chestpocketwelt.mjs'
import { chestPocketBag } from './chestpocketbag.mjs'
import { innerPocketWelt } from './innerpocketwelt.mjs'
import { innerPocketBag } from './innerpocketbag.mjs'
import { innerPocketTab } from './innerpockettab.mjs'

// Create design
const Carlton = new Design({
  data,
  parts: [
    front,
    back,
    tail,
    topSleeve,
    underSleeve,
    belt,
    collarStand,
    collar,
    cuffFacing,
    pocket,
    pocketFlap,
    pocketLining,
    chestPocketWelt,
    chestPocketBag,
    innerPocketWelt,
    innerPocketBag,
    innerPocketTab,
  ],
})

// Named exports
export {
  front,
  back,
  tail,
  topSleeve,
  underSleeve,
  belt,
  collarStand,
  collar,
  cuffFacing,
  pocket,
  pocketFlap,
  pocketLining,
  chestPocketWelt,
  chestPocketBag,
  innerPocketWelt,
  innerPocketBag,
  innerPocketTab,
  Carlton,
}
