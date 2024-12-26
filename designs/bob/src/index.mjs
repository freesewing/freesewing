import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { bib } from './bib.mjs'
import { i18n } from '../i18n/index.mjs'

// Setup our new design
const Bob = new Design({
  data: about,
  parts: [bib],
})

//Named exports
export { bib, Bob, i18n, about }
