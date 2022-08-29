import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import plugin from '@freesewing/plugin-bust' // Note: conditional plugin
import Brian from '@freesewing/brian'
import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'
import draftSleeve from './sleeve'
import draftGusset from './gusset'
import draftHoodSide from './hoodside'
import draftHoodCenter from './hoodcenter'

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
const Yuri = new freesewing.Design(config, plugins, { plugin, condition })

// Attach draft methods from Brian to prototype
Yuri.prototype.draftBase = function (part) {
  return new Brian(this.settings).draftBase(part)
}
Yuri.prototype.draftFrontBase = function (part) {
  return new Brian(this.settings).draftFront(part)
}
Yuri.prototype.draftBackBase = function (part) {
  return new Brian(this.settings).draftBack(part)
}
Yuri.prototype.draftSleevecap = function (part) {
  return new Brian(this.settings).draftSleevecap(part)
}
Yuri.prototype.draftSleeveBase = function (part) {
  return new Brian(this.settings).draftSleeve(part)
}

// Attach own draft methods to prototype
Yuri.prototype.draftBack = draftBack
Yuri.prototype.draftFront = draftFront
Yuri.prototype.draftSleeve = draftSleeve
Yuri.prototype.draftGusset = draftGusset
Yuri.prototype.draftHoodSide = draftHoodSide
Yuri.prototype.draftHoodCenter = draftHoodCenter

// Named exports
export { config, Yuri }

// Default export
export default Yuri
