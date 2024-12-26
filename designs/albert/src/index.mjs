import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { front } from './front.mjs'
import { pocket } from './pocket.mjs'
import { strap } from './strap.mjs'
import { i18n } from '../i18n/index.mjs'

// Setup our new design
const Albert = new Design({
  data: about,
  parts: [front, pocket, strap],
})

// Named exports
export { front, pocket, strap, Albert, i18n, about }
