import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import about from '../about.json' with { type: 'json' }
// Parts
import { ghost } from './ghost.mjs'

// Create new design
const Gozer = new Design({
  data: about,
  parts: [ghost],
})

// Named exports
export { ghost, Gozer, i18n, about }
