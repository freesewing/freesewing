import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import about from '../about.json' with { type: 'json' }
// Parts
import { frontPoints } from './frontpoints.mjs'
import { frontInside } from './frontinside.mjs'
import { frontOutside } from './frontoutside.mjs'
import { backPoints } from './backpoints.mjs'
import { backInside } from './backinside.mjs'
import { backOutside } from './backoutside.mjs'
import { peplumFront } from './peplumFront.mjs'
import { peplumBack } from './peplumBack.mjs'

// Create new design
const Tristan = new Design({
  data: about,
  parts: [
    frontPoints,
    frontInside,
    frontOutside,
    backPoints,
    backInside,
    backOutside,
    peplumFront,
    peplumBack,
  ],
})

// Named exports
export {
  frontPoints,
  frontInside,
  frontOutside,
  backPoints,
  backInside,
  backOutside,
  peplumFront,
  peplumBack,
  i18n,
  Tristan,
  about,
}
