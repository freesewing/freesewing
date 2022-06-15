import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import plugins from '@freesewing/plugin-bundle'
import flipPlugin from '@freesewing/plugin-flip'
import buttonPlugin from '@freesewing/plugin-buttons'
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

// Create design
const Simon = new freesewing.Design(config, [plugins, flipPlugin, buttonPlugin])

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
