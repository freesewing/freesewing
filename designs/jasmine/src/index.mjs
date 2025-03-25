//

import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { coat } from './coat.mjs'
import { kangaroopocket } from './kangaroopocket.mjs'
import { cargopocket } from './cargopocket.mjs'
import { cargopockettop } from './cargopockettop.mjs'

// Create new design
const Jasmine = new Design({
  data,
  parts: [coat, kangaroopocket, cargopocket, cargopockettop],
})

// Named exports
export { coat, kangaroopocket, cargopocket, cargopockettop, Jasmine, i18n }
