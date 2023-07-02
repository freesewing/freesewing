import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
// Parts
import { body } from './body.mjs'
import { tail } from './tail.mjs'
import { mouth } from './mouth.mjs'
import { aboveMouth } from './aboveMouth.mjs'
import { belly } from './belly.mjs'
import { topFin } from './topFin.mjs'
import { bottomFin } from './bottomFin.mjs'
import { lowerTeeth } from './lowerTeeth.mjs'
import { upperTeeth } from './upperTeeth.mjs'

// Create design
const Hi = new Design({
  data,
  parts: [body, tail, mouth, aboveMouth, belly, topFin, bottomFin, lowerTeeth, upperTeeth],
})

// Named exports
export { body, tail, mouth, aboveMouth, belly, topFin, bottomFin, lowerTeeth, upperTeeth, Hi, i18n }
