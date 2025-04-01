import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n } from '../i18n/index.mjs'

// Parts
import { crown } from './crown.mjs'
import { visor } from './visor.mjs'
import { ear } from './ear.mjs'

// Create new design
const Holmes = new Design({
  data: about,
  parts: [crown, visor, ear],
})

// Named exports
export { crown, visor, ear, Holmes, i18n, about }
