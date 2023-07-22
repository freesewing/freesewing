import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
import { tunica } from './tunica.mjs'

// Setup our new design
const Tiberius = new Design({
  data,
  parts: [tunica],
})

// Named exports
export { tunica, Tiberius, i18n }
