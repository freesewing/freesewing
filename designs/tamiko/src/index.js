import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import plugin from '@freesewing/plugin-bust' // Note: conditional plugin
import config from '../config'
// Parts
import draftTop from './top'

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
const Tamiko = new freesewing.Design(config, plugins, { plugin, condition })

// Part draft method
Tamiko.prototype.draftTop = (part) => draftTop(part)

// Named exports
export { config, Tamiko }

// Default export
export default Tamiko
