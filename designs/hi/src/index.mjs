import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n } from '../i18n/index.mjs'
// Parts
import { body } from './body.mjs'
import { tail } from './tail.mjs'
import { mouth } from './mouth.mjs'
import { aboveMouth } from './aboveMouth.mjs'
import { belly } from './belly.mjs'
import { topOfFin } from './topFin.mjs'
import { bottomOfFin } from './bottomFin.mjs'
import { lowerTeeth } from './lowerTeeth.mjs'
import { upperTeeth } from './upperTeeth.mjs'

// Create design
const Hi = new Design({
  data: about,
  parts: [body, tail, mouth, aboveMouth, belly, topOfFin, bottomOfFin, lowerTeeth, upperTeeth],
})

// Named exports
export {
  body,
  tail,
  mouth,
  aboveMouth,
  belly,
  topOfFin,
  bottomOfFin,
  lowerTeeth,
  upperTeeth,
  Hi,
  i18n,
  about,
}
