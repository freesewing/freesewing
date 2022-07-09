import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import plugins from '@freesewing/plugin-bundle'
import plugin from '@freesewing/plugin-bust' // Note: conditional plugin
import config from '../config'
// Parts
import draftFront from './front'
import draftSleeve from './sleeve'

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
const Diana = new freesewing.Design(config, plugins, { plugin, condition })

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
