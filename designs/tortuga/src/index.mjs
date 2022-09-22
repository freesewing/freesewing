import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { base } from './base.mjs'
import { sleeveGusset } from './sleeveGusset.mjs'
import { neckGusset } from './neckGusset.mjs'
import { body } from './body.mjs'
import { sleeve } from './sleeve.mjs'
import { shoulderStrap } from './shoulderStrap.mjs'
import { collar } from './collar.mjs'
import { cuff } from './cuff.mjs'
import { sideGusset } from './sideGusset.mjs'
import { sideAndSleevePatch } from './sideAndSleevePatch.mjs'
import { chestPatch } from './chestPatch.mjs'

// Setup our new design
const Tortuga = new Design({
  data,
  parts: [ body, sleeve, sleeveGusset, neckGusset, shoulderStrap,
    collar, cuff, sideGusset, sideAndSleevePatch, chestPatch,],
})

// Named exports
export { base, body, sleeveGusset, neckGusset, sleeve, shoulderStrap,
  collar, cuff, sideGusset, sideAndSleevePatch, chestPatch,
  Tortuga }
