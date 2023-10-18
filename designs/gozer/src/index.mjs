//

import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { ghost } from './ghost.mjs'

// Create new design
const Gozer = new Design({
  data,
  parts: [ghost],
})

// Named exports
export { ghost, i18n, Gozer }
