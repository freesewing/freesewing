import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { cup } from './cup.mjs'
import { neckTie } from './neck-tie.mjs'
import { bandTie } from './band-tie.mjs'

const Bee = new Design({
  data,
  parts: [cup, neckTie, bandTie],
})

export { cup, neckTie, bandTie, Bee }
