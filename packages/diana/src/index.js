import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftFront from './front'
import draftSleeve from './sleeve'

// Create design
const Diana = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Diana.prototype.draftBase = function (part) {
  return new Brian(this.settings).draftBase(part)
}
Diana.prototype.draftFrontBase = function (part) {
  return new Brian(this.settings).draftFront(part)
}
Diana.prototype.draftBackBase = function (part) {
  return new Brian(this.settings).draftBack(part)
}
Diana.prototype.draftSleeveBase = function (part) {
  let brian = new Brian(this.settings)
  return brian.draftSleeve(brian.draftSleevecap(part))
}
Diana.prototype.draftFront = draftFront
Diana.prototype.draftBack = draftFront
Diana.prototype.draftSleeve = draftSleeve

// Named exports
export { config, Diana }

// Default export
export default Diana
