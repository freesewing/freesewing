import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n } from '../i18n/index.mjs'
import { top } from './top.mjs'

// Setup our new design
const Tamiko = new Design({
  data: about,
  parts: [top],
})

// Named exports
export { top, Tamiko, i18n, about }
