import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
import { lacerna } from './lacerna.mjs'

// Setup our new design
const Lunetius = new Design({
  data,
  parts: [lacerna],
})

// Named exports
export { lacerna, Lunetius, i18n }
