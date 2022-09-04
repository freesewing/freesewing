import { Design } from '@freesewing/core'
import { data } from '../data.mjs'

import { front } from '@freesewing/brian'
import { back } from '@freesewing/brian'
import { sleeve } from './sleeve.mjs'
import { topSleeve } from './topsleeve.mjs'
import { underSleeve } from './undersleeve.mjs'

// Create new design
const Bent = new Design({
  data,
  parts: [ front, back, sleeve, topSleeve, underSleeve ],
})

// Named exports
export { front, back, sleeve, topSleeve, underSleeve, Bent }
