import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
// Parts
import { front } from './front.mjs'
import { back } from './back.mjs'
import { wire } from './wire.mjs'

// Create new design
const Barbara = new Design({
  data,
  parts: [front, back, wire],
})

// Named exports
export { front, back, wire, i18n, Barbara }
