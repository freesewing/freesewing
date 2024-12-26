import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import about from '../about.json' with { type: 'json' }
// Parts
import { shape } from './shape.mjs'
import { panel } from './panel.mjs'
import { leg } from './leg.mjs'
import { pocket } from './pocket.mjs'
import { waistband } from './waistband.mjs'

// Create new design
const Lumina = new Design({
  data: about,
  parts: [shape, panel, leg, waistband, pocket],
})

// Named exports
export { shape, panel, leg, waistband, pocket, Lumina, i18n, about }
