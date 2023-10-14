import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { bib } from './bib.mjs'

/*
 * Create the design
 */
const Tutorial = new Design({
  data: {
    name: 'tutorial',
    version: '0.0.1',
  },
  parts: [bib],
})

export { bib, Tutorial, i18n }
