import { Design, mergeI18n } from '@freesewing/core'
import { i18n as bentI18n } from '@freesewing/bent'
import { i18n as jaegerI18n } from '../i18n/index.mjs'
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
import { chestPiece } from './chest-piece.mjs'
import { frontFacing } from './front-facing.mjs'
import { frontLining } from './front-lining.mjs'

// Setup our new design
const Jaeger = new Design({
  data,
  parts: [
    backBase,
    frontBase,
    frontFacing,
    frontLining,
    chestPiece,
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

// Merge translations
const i18n = mergeI18n([bentI18n, jaegerI18n])

// Named exports
export {
  backBase,
  frontBase,
  frontFacing,
  frontLining,
  chestPiece,
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
  i18n,
}
