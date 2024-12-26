import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { mask } from './mask.mjs'
import { i18n } from '../i18n/index.mjs'

// Setup our new design
const Florence = new Design({
  data: about,
  parts: [mask],
})

// Named exports
export { mask, Florence, i18n, about }
