import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { skirt } from './skirt.mjs'
import { waistband } from './waistband.mjs'

// Setup our new design
const Sandy = new Design({
  data,
  parts: [skirt, waistband],
})

// Named exports
export { skirt, waistband, Sandy }
