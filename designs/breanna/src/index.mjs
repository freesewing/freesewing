import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { sleeve } from './sleeve.mjs'
import { base } from './base.mjs'
import { frontBase } from './front-base.mjs'
import { sleevecap } from './sleevecap.mjs'
import { i18n } from '../i18n/index.mjs'

// Create design
const Breanna = new Design({
  data,
  parts: [back, front, sleeve],
})

// Named exports
export { back, front, sleeve, base, frontBase, sleevecap, Breanna, i18n }
