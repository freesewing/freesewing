import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { i18n } from '../i18n/index.mjs'
import { interfacingTail, interfacingTip } from './interfacing.mjs'
import { liningTail, liningTip } from './lining.mjs'
import { fabricTail, fabricTip } from './fabric.mjs'
import { fabricLoop } from './loop.mjs'

// Setup our new design
const Trayvon = new Design({
  data,
  parts: [
    interfacingTail,
    interfacingTip,
    liningTail,
    liningTip,
    fabricTail,
    fabricTip,
    fabricLoop,
  ],
})

// Named exports
export {
  interfacingTail,
  interfacingTip,
  liningTail,
  liningTip,
  fabricTail,
  fabricTip,
  fabricLoop,
  Trayvon,
  i18n,
}
