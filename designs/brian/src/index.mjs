import { Design } from '@freesewing/core'
import { i18n } from '../i18n/index.mjs'
import { data } from '../data.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { sleeve } from './sleeve.mjs'
// Re-export skeleton parts so peope can re-use them
import { base } from './base.mjs'
import { sleevecap } from './sleevecap.mjs'

// Setup our new design
const Brian = new Design({
  data,
  parts: [back, front, sleeve],
})

// Named exports
export { back, front, sleeve, base, sleevecap, Brian, i18n }
