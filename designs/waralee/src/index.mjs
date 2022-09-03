import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { pants } from './pants.mjs'
import { cutout } from './cutout.mjs'
import { pocket } from './pocket.mjs'
import { backPocket } from './backpocket.mjs'
import { facings } from './facings.mjs'
import { mini } from './mini.mjs'
// Re-export skeleton parts so peope can re-use them
import { pantsProto } from './pantsproto.mjs'

// Setup our new design
const Waralee = new Design({
  data,
  parts: [pants, cutout, pocket, backPocket, facings, mini],
})

// Named exports
export { pants, cutout, pocket, backPocket, facings, pantsProto, Waralee }
