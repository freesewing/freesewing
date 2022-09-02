import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import mirrorPlugin from '@freesewing/plugin-mirror'
import plugin from '@freesewing/plugin-bust' // Note: conditional plugin
import Brian from '@freesewing/brian'
import config from '../config'
// Parts
import draftSleeve from './sleeve'
import draftTopSleeve from './topsleeve'
import draftUnderSleeve from './undersleeve'

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

// Create new design
const Bent = new freesewing.Design(config, [plugins, mirrorPlugin], { plugin, condition })

// Attach draft methods from Brian to prototype
Bent.prototype.draftBase = function (part) {
  return new Brian(this.settings).draftBase(part)
}
Bent.prototype.draftFront = function (part) {
  return new Brian(this.settings).draftFront(part)
}
Bent.prototype.draftBack = function (part) {
  return new Brian(this.settings).draftBack(part)
}

// Attach own draft methods to prototype
Bent.prototype.draftSleeve = draftSleeve
Bent.prototype.draftTopSleeve = draftTopSleeve
Bent.prototype.draftUnderSleeve = draftUnderSleeve

// Named exports
export { config, Bent }

// Default export
export default Bent
