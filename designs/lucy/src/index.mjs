import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n } from '../i18n/index.mjs'
import { pocket } from './pocket.mjs'

// Setup our new design
const Lucy = new Design({
  data: about,
  parts: [pocket],
})

// Named exports
export { pocket, Lucy, i18n, about }
