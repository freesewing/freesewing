//

import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { coat } from './coat.mjs'

// Create new design
const Jasmine = new Design({
  data,
  parts: [coat],
})

// Named exports
export { coat, i18n, Jasmine }
