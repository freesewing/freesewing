import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
import { back } from './back.mjs'
import { frontRight } from './frontright.mjs'
import { frontLeft } from './frontleft.mjs'
import { buttonPlacket } from './buttonplacket.mjs'
import { buttonholePlacket } from './buttonholeplacket.mjs'
import { yoke } from './yoke.mjs'
import { sleeve } from './sleeve.mjs'
import { collarStand } from './collarstand.mjs'
import { collar } from './collar.mjs'
import { sleevePlacketUnderlap } from './sleeveplacket-underlap.mjs'
import { sleevePlacketOverlap } from './sleeveplacket-overlap.mjs'
import { cuff } from './cuff.mjs'
/* Re-export skeleton part */
import { front } from './front.mjs'

// Setup our new design
const Simon = new Design({
  data,
  parts: [
    back,
    buttonholePlacket,
    buttonPlacket,
    collar,
    collarStand,
    cuff,
    front,
    frontRight,
    frontLeft,
    sleeve,
    sleevePlacketOverlap,
    sleevePlacketUnderlap,
    yoke,
  ],
})

// Named exports
export {
  back,
  buttonholePlacket,
  buttonPlacket,
  collar,
  collarStand,
  cuff,
  front,
  frontRight,
  frontLeft,
  sleeve,
  sleevePlacketOverlap,
  sleevePlacketUnderlap,
  yoke,
  Simon,
}

/*
import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import plugins from '@freesewing/plugin-bundle'
import flipPlugin from '@freesewing/plugin-flip'
import plugin from '@freesewing/plugin-bust' // Note: conditional plugin
import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'
import draftFrontRight from './frontright'
import draftButtonPlacket from './buttonplacket'
import draftFrontLeft from './frontleft'
import draftButtonholePlacket from './buttonholeplacket'
import draftYoke from './yoke'
import draftSleeve from './sleeve'
import draftCollarStand from './collarstand'
import draftCollar from './collar'
import draftSleevePlacketUnderlap from './sleeveplacket-underlap'
import draftSleevePlacketOverlap from './sleeveplacket-overlap'
import draftCuff from './cuff'

//
const condition = (settings = false) =>
  settings &&
  settings.options &&
  settings.options.draftForHighBust &&
  settings.measurements.highBust
    ? true
    : false

// Create design
const Simon = new freesewing.Design(config, [plugins, flipPlugin], { plugin, condition })

// Attach draft methods to prototype
Simon.prototype.draftBase = function (part) {
  return new Brian(this.settings).draftBase(part)
}
Simon.prototype.draftFrontBase = function (part) {
  return new Brian(this.settings).draftFront(part)
}
Simon.prototype.draftBackBase = function (part) {
  return new Brian(this.settings).draftBack(part)
}
Simon.prototype.draftSleeveBase = function (part) {
  const brian = new Brian(this.settings)
  return brian.draftSleeve(brian.draftSleevecap(part))
}
Simon.prototype.draftBack = draftBack
Simon.prototype.draftFront = draftFront
Simon.prototype.draftFrontRight = draftFrontRight
Simon.prototype.draftButtonPlacket = draftButtonPlacket
Simon.prototype.draftFrontLeft = draftFrontLeft
Simon.prototype.draftButtonholePlacket = draftButtonholePlacket
Simon.prototype.draftYoke = draftYoke
Simon.prototype.draftSleeve = draftSleeve
Simon.prototype.draftCollarStand = draftCollarStand
Simon.prototype.draftCollar = draftCollar
Simon.prototype.draftSleevePlacketUnderlap = draftSleevePlacketUnderlap
Simon.prototype.draftSleevePlacketOverlap = draftSleevePlacketOverlap
Simon.prototype.draftCuff = draftCuff

// Named exports
export { config, Simon }

// Default export
export default Simon
*/
