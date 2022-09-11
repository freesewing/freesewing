import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { back } from './back.mjs'
import { frontSideDart } from './front-side-dart.mjs'

const Bella = new Design({
  data,
  parts: [back, frontSideDart],
})

export { back, frontSideDart, Bella }
