import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'
import draftSleeve from './sleeve'

// Create design
const Pattern = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Pattern.prototype.draftBase = function (part) {
  // Getting the base part from Brian
  return new Brian(this.settings).draftBase(part)
}
Pattern.prototype.draftSleevecap = function (part) {
  // Getting the sleevecap part from Brian
  let brian = new Brian(this.settings)
  return brian.draftSleevecap(part)
}
Pattern.prototype.draftFront = (part) => draftFront(part)
Pattern.prototype.draftBack = (part) => draftBack(part)
Pattern.prototype.draftSleeve = (part) => draftSleeve(part)

export default Pattern
