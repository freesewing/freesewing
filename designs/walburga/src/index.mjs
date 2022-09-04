import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { front } from './front.mjs'
import { back } from './back.mjs'
// Re-export skeleton parts so peope can re-use them
import { base } from './base.mjs'

// Setup our new design
const Walburga = new Design({
  data,
  parts: [back, front],
})

// Named exports
export { back, front, base, Walburga }
