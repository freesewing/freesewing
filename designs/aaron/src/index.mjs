import { Design } from '@freesewing/core'
import { name, version } from '../pkg.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'

// Setup our new design
const Aaron = new Design({
  name,
  version,
  parts: [ back, front ],
})

// Named exports
export { back, front, Aaron }
