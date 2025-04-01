import { Design } from '@freesewing/core'
import about from '../about.json' with { type: 'json' }
import { i18n } from '../i18n/index.mjs'
// Parts
import { back } from './back.mjs'
import { front } from './front.mjs'
import { shortsleeve } from './shortsleeve.mjs'
import { longsleeve } from './longsleeve.mjs'
import { bindingNeckBack } from './bindingNeckBack.mjs'
import { bindingNeckFront } from './bindingNeckFront.mjs'
import { bindingLeg } from './bindingLeg.mjs'

// Create new design
const Otis = new Design({
  data: about,
  parts: [back, front, shortsleeve, longsleeve, bindingNeckBack, bindingNeckFront, bindingLeg],
})

// Named exports
export {
  back,
  front,
  shortsleeve,
  longsleeve,
  bindingNeckBack,
  bindingNeckFront,
  bindingLeg,
  i18n,
  Otis,
  about,
}
