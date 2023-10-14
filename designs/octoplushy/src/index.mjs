import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
import { headSection1, headSection2 } from './head.mjs'
import { armSection1, armSection2 } from './arm.mjs'
import { eye1, eye2, eye3 } from './eye.mjs'

// Setup our new design
const Octoplushy = new Design({
  data,
  parts: [headSection1, headSection2, armSection1, armSection2, eye1, eye2, eye3],
})

// Named exports
export { headSection1, headSection2, armSection1, armSection2, eye1, eye2, eye3, Octoplushy, i18n }
