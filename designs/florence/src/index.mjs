import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { mask } from './mask.mjs'
import { i18n } from '../i18n/index.mjs'

// Setup our new design
const Florence = new Design({
  data,
  parts: [mask],
})

// Named exports
export { mask, Florence, i18n }
