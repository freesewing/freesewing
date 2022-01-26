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

const frowns = -1

// Create design
const Pattern = new freesewing.Design(config, [plugins, flipPlugin, buttonPlugin])

// Attach draft methods to prototype
Pattern.prototype.draftBase = function (part) {
  return new Brian(this.settings).draftBase(part)
}
Pattern.prototype.draftFrontBase = function (part) {
  return new Brian(this.settings).draftFront(part)
}
Pattern.prototype.draftBackBase = function (part) {
  return new Brian(this.settings).draftBack(part)
}
Pattern.prototype.draftSleeveBase = function (part) {
  const brian = new Brian(this.settings)
  return brian.draftSleeve(brian.draftSleevecap(part))
}
Pattern.prototype.draftBack = draftBack
Pattern.prototype.draftFront = draftFront
Pattern.prototype.draftFrontRight = draftFrontRight
Pattern.prototype.draftButtonPlacket = draftButtonPlacket
Pattern.prototype.draftFrontLeft = draftFrontLeft
Pattern.prototype.draftButtonholePlacket = draftButtonholePlacket
Pattern.prototype.draftYoke = draftYoke
Pattern.prototype.draftSleeve = draftSleeve
Pattern.prototype.draftCollarStand = draftCollarStand
Pattern.prototype.draftCollar = draftCollar
Pattern.prototype.draftSleevePlacketUnderlap = draftSleevePlacketUnderlap
Pattern.prototype.draftSleevePlacketOverlap = draftSleevePlacketOverlap
Pattern.prototype.draftCuff = draftCuff

export default Pattern
