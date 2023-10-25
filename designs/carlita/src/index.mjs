import { Design, mergeI18n } from '@freesewing/core'
import { data } from '../data.mjs'
import { front } from './front.mjs'
import { side } from './side.mjs'
import { frontFacing } from './front-facing.mjs'
import { frontLining } from './front-lining.mjs'
import {
  back,
  backStay,
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
  i18n as carltonI18n,
} from '@freesewing/carlton'
import { i18n as carlitaI18n } from '../i18n/index.mjs'

// Create new design
const Carlita = new Design({
  data,
  parts: [
    front,
    frontFacing,
    frontLining,
    side,
    back,
    backStay,
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

// Merge translations
const i18n = mergeI18n([carltonI18n, carlitaI18n])

// Named exports
export {
  front,
  frontFacing,
  frontLining,
  side,
  back,
  backStay,
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
  i18n,
}
