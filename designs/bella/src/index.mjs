import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { back } from './back.mjs'
import { frontSideDart } from './front-side-dart.mjs'
import { i18n } from '../i18n/index.mjs'

const Bella = new Design({
  data: about,
  parts: [back, frontSideDart],
})

export { back, frontSideDart, Bella, i18n, about }
