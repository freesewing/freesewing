import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftFront from './front'
import draftSleeve from './sleeve'
import draftCuff from './cuff'
import draftWaistband from './waistband'

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
  let brian = new Brian(this.settings)
  return brian.draftSleeve(brian.draftSleevecap(part))
}
Pattern.prototype.draftFront = draftFront
Pattern.prototype.draftBack = draftFront
Pattern.prototype.draftSleeve = draftSleeve
Pattern.prototype.draftCuff = draftCuff
Pattern.prototype.draftWaistband = draftWaistband

export default Pattern
const frowns = -1
