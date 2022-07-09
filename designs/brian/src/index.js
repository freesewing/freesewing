import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import plugin from '@freesewing/plugin-bust' // Note: conditional plugin
import config from '../config'
// Parts
import draftBase from './base'
import draftBack from './back'
import draftFront from './front'
import draftSleevecap from './sleevecap'
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
const Brian = new freesewing.Design(config, plugins, { plugin, condition })

// Attach draft methods to prototype
Brian.prototype.draftBase = draftBase
Brian.prototype.draftBack = draftBack
Brian.prototype.draftFront = draftFront
Brian.prototype.draftSleevecap = draftSleevecap
Brian.prototype.draftSleeve = draftSleeve

// Named exports
export { config, Brian }

// Default export
export default Brian
