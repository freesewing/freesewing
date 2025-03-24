//

import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { front } from './front.mjs'
// import { frontPoints } from './frontpoints.mjs'
// import { frontInside } from './frontinside.mjs'
// import { frontOutside } from './frontoutside.mjs'
// import { backPoints } from './backpoints.mjs'
// import { backInside } from './backinside.mjs'
// import { backOutside } from './backoutside.mjs'
import { box } from './box.mjs'

// Create new design
const Devon = new Design({
  data,
  parts: [
    // frontPoints,
    // frontInside,
    // frontOutside,
    // backPoints,
    // backInside,
    // backOutside,
    front,
    box,
  ],
})

// Named exports
export {
  // frontPoints,
  // frontInside,
  // frontOutside,
  // backPoints,
  // backInside,
  // backOutside,
  // peplumFront,
  // peplumBack,
  front,
  box,
  i18n,
  Devon,
}

/*
//

import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { box } from './box.mjs'

// Create new design
const Devon = new Design({
  data,
  parts: [box],
})

// Named exports
export { box, i18n, Devon }
*/
