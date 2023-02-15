import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { front } from './front.mjs'
import { side } from './side.mjs'
// Inherited parts
import { back } from '@freesewing/carlton'
import { tail } from '@freesewing/carlton'
import { belt } from '@freesewing/carlton'
import { topSleeve } from '@freesewing/carlton'
import { underSleeve } from '@freesewing/carlton'
import { collarStand } from '@freesewing/carlton'
import { collar } from '@freesewing/carlton'
import { cuffFacing } from '@freesewing/carlton'
import { pocket } from '@freesewing/carlton'
import { pocketFlap } from '@freesewing/carlton'
import { pocketLining } from '@freesewing/carlton'
import { chestPocketWelt } from '@freesewing/carlton'
import { chestPocketBag } from '@freesewing/carlton'
import { innerPocketWelt } from '@freesewing/carlton'
import { innerPocketBag } from '@freesewing/carlton'
import { innerPocketTab } from '@freesewing/carlton'

// Create new design
const Carlita = new Design({
  data,
  parts: [
    front,
    side,
    back,
    tail,
    belt,
    topSleeve,
    underSleeve,
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
  side,
  back,
  tail,
  belt,
  topSleeve,
  underSleeve,
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
  Carlita,
}
