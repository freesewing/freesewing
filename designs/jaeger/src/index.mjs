import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { backBase } from './backbase.mjs'
import { frontBase } from './frontbase.mjs'
import { side } from './side.mjs'
import { collarStand } from './collarstand.mjs'
import { collar } from './collar.mjs'
import { underCollar } from './undercollar.mjs'
import { pocket } from './pocket.mjs'
import { pocketLining } from './pocketlining.mjs'
import { chestPocketWelt } from './chestpocketwelt.mjs'
import { chestPocketBag } from './chestpocketbag.mjs'
import { topSleeve } from './topsleeve.mjs'
import { underSleeve } from './undersleeve.mjs'
import { innerPocketBag } from './innerpocketbag.mjs'
import { innerPocketWelt } from './innerpocketwelt.mjs'

// Setup our new design
const Jaeger = new Design({
  data,
  parts: [
    backBase,
    frontBase,
    side,
    collarStand,
    collar,
    underCollar,
    pocket,
    pocketLining,
    chestPocketWelt,
    chestPocketBag,
    topSleeve,
    underSleeve,
    innerPocketBag,
    innerPocketWelt,
  ],
})

// Named exports
export {
  backBase,
  frontBase,
  side,
  collarStand,
  collar,
  underCollar,
  pocket,
  pocketLining,
  chestPocketWelt,
  chestPocketBag,
  topSleeve,
  underSleeve,
  innerPocketBag,
  innerPocketWelt,
  Jaeger,
}
