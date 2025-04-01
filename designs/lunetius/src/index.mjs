import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n } from '../i18n/index.mjs'
import { lacerna } from './lacerna.mjs'

// Setup our new design
const Lunetius = new Design({
  data: about,
  parts: [lacerna],
})

// Named exports
export { lacerna, Lunetius, i18n, about }
