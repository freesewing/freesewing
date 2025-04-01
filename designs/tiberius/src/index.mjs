import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n } from '../i18n/index.mjs'
import { tunica } from './tunica.mjs'

// Setup our new design
const Tiberius = new Design({
  data: about,
  parts: [tunica],
})

// Named exports
export { tunica, Tiberius, i18n, about }
