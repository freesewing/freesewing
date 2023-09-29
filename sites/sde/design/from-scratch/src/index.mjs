import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { scratch } from './scratch.mjs'

/*
 * Create the design
 */
const FromScratch = new Design({
  data: {
    name: 'fromScratch',
    version: '0.0.1',
  },
  parts: [scratch],
})

export { scratch, FromScratch, i18n }
