import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Inherited Parts
import { front as frontBase } from '@freesewing/brian'
import { back as backBase } from '@freesewing/brian'
import { sleeve as sleeveBase } from '@freesewing/brian'
// Parts
import { front } from './front.mjs'
import { back } from './front.mjs'
import { sleeve } from './sleeve.mjs'

// Create design
const Diana = new Design({
  data,
  parts: [
    front, back, sleeve,
  ],
})

// Named exports
export {
  front, back, sleeve,
  frontBase, backBase, sleeveBase,
  Diana,
}
