// Skully

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { cheek } from './cheek.mjs'
import { cheekbone } from './cheekbone.mjs'
import { eye } from './eye.mjs'
import { forehead } from './forehead.mjs'
import { head1 } from './head1.mjs'
import { head2 } from './head2.mjs'
import { head3 } from './head3.mjs'
import { jawfloor } from './jawfloor.mjs'
import { lowerjaw } from './lowerjaw.mjs'
import { lowermouth } from './lowermouth.mjs'
import { nose } from './nose.mjs'
import { uppermouth } from './uppermouth.mjs'

// Create new design
const Skully = new Design({
  data,
  parts: [
    cheek,
    cheekbone,
    eye,
    forehead,
    head1,
    head2,
    head3,
    jawfloor,
    lowerjaw,
    lowermouth,
    nose,
    uppermouth,
  ],
})

// Named exports
export {
  cheek,
  cheekbone,
  eye,
  forehead,
  head1,
  head2,
  head3,
  jawfloor,
  lowerjaw,
  lowermouth,
  nose,
  uppermouth,
  Skully,
}
