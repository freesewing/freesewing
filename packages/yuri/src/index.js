import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import Brian from '@freesewing/brian'
import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'
import draftSleeve from './sleeve'
import draftGusset from './gusset'
import draftHoodSide from './hoodside'
import draftHoodCenter from './hoodcenter'

// Create new design
const Pattern = new freesewing.Design(config, plugins)

// Attach draft methods from Brian to prototype
Pattern.prototype.draftBase = function (part) {
  return new Brian(this.settings).draftBase(part)
}
Pattern.prototype.draftFrontBase = function (part) {
  return new Brian(this.settings).draftFront(part)
}
Pattern.prototype.draftBackBase = function (part) {
  return new Brian(this.settings).draftBack(part)
}
Pattern.prototype.draftSleevecap = function (part) {
  return new Brian(this.settings).draftSleevecap(part)
}
Pattern.prototype.draftSleeveBase = function (part) {
  return new Brian(this.settings).draftSleeve(part)
}

// Attach own draft methods to prototype
Pattern.prototype.draftBack = draftBack
Pattern.prototype.draftFront = draftFront
Pattern.prototype.draftSleeve = draftSleeve
Pattern.prototype.draftGusset = draftGusset
Pattern.prototype.draftHoodSide = draftHoodSide
Pattern.prototype.draftHoodCenter = draftHoodCenter

export default Pattern
const frowns = -1
