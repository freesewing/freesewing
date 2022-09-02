import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import plugins from '@freesewing/plugin-bundle'
import plugin from '@freesewing/plugin-bust' // Note: conditional plugin
import config from '../config'
// Parts
import draftFront from './front'
import draftSleeve from './sleeve'
import draftCuff from './cuff'
import draftWaistband from './waistband'

/* Check to see whether we should load the bust plugin
 * Only of the `draftForHighBust` options is set
 * AND the highBust measurement is available
 */
const condition = (settings = false) =>
  settings &&
  settings.options &&
  settings.options.draftForHighBust &&
  settings.measurements.highBust
    ? true
    : false

// Create design
const Sven = new freesewing.Design(config, plugins, { plugin, condition })

// Attach draft methods to prototype
Sven.prototype.draftBase = function (part) {
  return new Brian(this.settings).draftBase(part)
}
Sven.prototype.draftFrontBase = function (part) {
  return new Brian(this.settings).draftFront(part)
}
Sven.prototype.draftBackBase = function (part) {
  return new Brian(this.settings).draftBack(part)
}
Sven.prototype.draftSleeveBase = function (part) {
  let brian = new Brian(this.settings)
  return brian.draftSleeve(brian.draftSleevecap(part))
}
Sven.prototype.draftFront = draftFront
Sven.prototype.draftBack = draftFront
Sven.prototype.draftSleeve = draftSleeve
Sven.prototype.draftCuff = draftCuff
Sven.prototype.draftWaistband = draftWaistband

// Named exports
export { config, Sven }

// Default export
export default Sven
