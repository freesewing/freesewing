// Import Design constructor
import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
// Import Parts
import { front } from './front.mjs'
import { back } from './back.mjs'
import { raglanSleeve } from './raglansleeve.mjs'
import { neckband } from './neckband.mjs'
import { zipperGuard } from './zipperguard.mjs'
import { crotchGusset } from './crotchgusset.mjs'
import { hood } from './hood.mjs'
import { hoodFront } from './hoodfront.mjs'

// Create new design
const Onyx = new Design({
  data,
  parts: [front, back, raglanSleeve, neckband, zipperGuard, crotchGusset, hood, hoodFront],
})

// Named exports
export {
  front,
  back,
  raglanSleeve,
  neckband,
  zipperGuard,
  crotchGusset,
  hood,
  hoodFront,
  Onyx,
  i18n,
}
