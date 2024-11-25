//

import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { coat } from './coat.mjs'
import { hoodiepocket } from './hoodiepocket.mjs'

// Create new design
const Jasmine = new Design({
  data,
  parts: [coat, hoodiepocket],
})

// Named exports
export { coat, hoodiepocket, i18n, Jasmine }
