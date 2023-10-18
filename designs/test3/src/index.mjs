//

import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { box } from './box.mjs'

// Create new design
const Test3 = new Design({
  data,
  parts: [box],
})

// Named exports
export { box, i18n, Test3 }
