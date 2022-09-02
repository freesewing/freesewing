import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import plugins from '@freesewing/plugin-bundle'
import plugin from '@freesewing/plugin-bust' // Note: conditional plugin
import config from '../config'
// Parts
import draftBack from './back'
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
const Teagan = new freesewing.Design(config, plugins, { plugin, condition })

// Attach draft methods to prototype
Teagan.prototype.draftBase = function (part) {
  // Getting the base part from Brian
  return new Brian(this.settings).draftBase(part)
}
Teagan.prototype.draftSleevecap = function (part) {
  // Getting the sleevecap part from Brian
  return new Brian(this.settings).draftSleevecap(part)
}
Teagan.prototype.draftFront = (part) => draftFront(part)
Teagan.prototype.draftBack = (part) => draftBack(part)
Teagan.prototype.draftSleeve = (part) => draftSleeve(part)

// Named exports
export { config, Teagan }

// Default export
export default Teagan
