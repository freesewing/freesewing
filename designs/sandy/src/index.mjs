import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n } from '../i18n/index.mjs'
import { skirt } from './skirt.mjs'
import { waistband } from './waistband.mjs'

// Setup our new design
const Sandy = new Design({
  data: about,
  parts: [skirt, waistband],
})

// Named exports
export { skirt, waistband, Sandy, i18n, about }
