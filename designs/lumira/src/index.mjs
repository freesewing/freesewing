//

import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { leg } from './leg.mjs'

// Create new design
const Lumira = new Design({
  data,
  parts: [leg],
})

// Named exports
export { leg, i18n, Lumira }
