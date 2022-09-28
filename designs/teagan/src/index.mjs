import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { sleeve } from './sleeve.mjs'

// Setup our new design
const Teagan = new Design({
  data,
  parts: [back, front, sleeve],
})

// Named exports
export { back, front, sleeve, Teagan }
