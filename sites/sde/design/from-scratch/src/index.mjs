import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { bib } from './bib.mjs'

/*
 * Create the design
 */
const FromScratch = new Design({
  data: {
    name: 'fromScratch',
    version: '0.0.1',
  },
  parts: [bib],
})

export { bib, FromScratch, i18n }
