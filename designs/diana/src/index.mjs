import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
// Parts
import { front } from './front.mjs'
import { back } from './front.mjs'
import { sleeve } from './sleeve.mjs'

// Create design
const Diana = new Design({
  data,
  parts: [front, back, sleeve],
})

// Named exports
export { front, back, sleeve, Diana, i18n }
