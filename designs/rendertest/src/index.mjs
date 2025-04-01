import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { demo } from './demo.mjs'

// Setup our new design
const Rendertest = new Design({
  parts: [demo],
})

// Named exports
export { demo, Rendertest, i18n }
