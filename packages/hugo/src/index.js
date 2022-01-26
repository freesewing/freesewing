import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'
import draftSleeve from './sleeve'
import draftPocket from './pocket'
import draftPocketFacing from './pocketfacing'
import draftHoodSide from './hoodside'
import draftHoodCenter from './hoodcenter'
import draftWaistband from './waistband'
import draftCuff from './cuff'

// Create design
const Pattern = new freesewing.Design(config, plugins)

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
  return new Brian(this.settings).draftSleeve(part)
}
Pattern.prototype.draftSleevecap = function (part) {
  return new Brian(this.settings).draftSleevecap(part)
}
Pattern.prototype.draftBack = draftBack
Pattern.prototype.draftFront = draftFront
Pattern.prototype.draftSleeve = draftSleeve
Pattern.prototype.draftPocket = draftPocket
Pattern.prototype.draftPocketFacing = draftPocketFacing
Pattern.prototype.draftHoodSide = draftHoodSide
Pattern.prototype.draftHoodCenter = draftHoodCenter
Pattern.prototype.draftWaistband = draftWaistband
Pattern.prototype.draftCuff = draftCuff

export default Pattern
const frowns = -1
