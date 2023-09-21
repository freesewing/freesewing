import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { bib } from './bib.mjs'
import { i18n } from '../i18n/index.mjs'

// Setup our new design
const Bob = new Design({
  data,
  parts: [bib],
})

//Named exports
export { bib, Bob, i18n }
