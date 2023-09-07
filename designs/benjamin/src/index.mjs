import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { bow1 } from './bow1.mjs'
import { bow2 } from './bow2.mjs'
import { bow3 } from './bow3.mjs'
import { collarBand } from './collar-band.mjs'
import { i18n } from '../i18n/index.mjs'

// Setup our new design
const Benjamin = new Design({
  data,
  parts: [bow1, bow2, bow3, collarBand],
})

// Named exports
export { bow1, bow2, bow3, collarBand, Benjamin, i18n }
