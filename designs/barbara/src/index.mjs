//

import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { front } from './front.mjs'

// Create new design
const Barbara = new Design({
  data,
  parts: [front],
})

// Named exports
export { front, i18n, Barbara }
