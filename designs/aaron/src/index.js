import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import plugins from '@freesewing/plugin-bundle'
import plugin from '@freesewing/plugin-bust' // Note: conditional plugin
import config from '../config'

// Parts
import draftBack from './back'
import draftFront from './front'

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
const Aaron = new freesewing.Design(config, plugins, { plugin, condition })

// Attach draft methods to prototype
Aaron.prototype.draftBase = function (part) {
  // Getting the base part from Brian
  return new Brian(this.settings).draftBase(part)
}
Aaron.prototype.draftFront = (part) => draftFront(part)
Aaron.prototype.draftBack = (part) => draftBack(part)

// Named exports
export { config, Aaron }

// Default export
export default Aaron
