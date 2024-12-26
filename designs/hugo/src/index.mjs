import { Design, mergeI18n } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n as brianI18n } from '@freesewing/brian'
import { i18n as hugoI18n } from '../i18n/index.mjs'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { sleeve } from './sleeve.mjs'
import { pocket } from './pocket.mjs'
import { pocketFacing } from './pocketfacing.mjs'
import { hoodSide } from './hoodside.mjs'
import { hoodCenter } from './hoodcenter.mjs'
import { waistband } from './waistband.mjs'
import { cuff } from './cuff.mjs'
import { neckBinding } from './neckbinding.mjs'

// Setup our new design
const Hugo = new Design({
  data: about,
  parts: [
    back,
    front,
    sleeve,
    pocket,
    pocketFacing,
    hoodSide,
    hoodCenter,
    waistband,
    cuff,
    neckBinding,
  ],
})

// Merge translations
const i18n = mergeI18n([brianI18n, hugoI18n])

// Named exports
export {
  back,
  front,
  sleeve,
  pocket,
  pocketFacing,
  hoodSide,
  hoodCenter,
  waistband,
  cuff,
  neckBinding,
  Hugo,
  i18n,
  about,
}
