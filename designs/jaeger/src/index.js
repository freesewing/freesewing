import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import plugin from '@freesewing/plugin-bust' // Note: conditional plugin
import Bent from '@freesewing/bent'
import config from '../config'
// Parts
import draftBackBase from './backbase'
import draftFrontBase from './frontbase'
import draftFront from './front'
import draftBack from './back'
import draftSide from './side'
import draftCollarStand from './collarstand'
import draftCollar from './collar'
import draftUnderCollar from './undercollar'
import draftPocket from './pocket'
import draftPocketLining from './pocketlining'
import draftChestPocketWelt from './chestpocketwelt'
import draftChestPocketBag from './chestpocketbag'
import draftInnerPocketWelt from './innerpocketwelt'
import draftInnerPocketBag from './innerpocketbag'
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

// Create design
const Jaeger = new freesewing.Design(config, plugins, { plugin, condition })

// Attach draft methods from Bent to prototype
Jaeger.prototype.draftBentBase = function (part) {
  return new Bent(this.settings).draftBase(part)
}
Jaeger.prototype.draftBentFront = function (part) {
  return new Bent(this.settings).draftFront(part)
}
Jaeger.prototype.draftBentBack = function (part) {
  return new Bent(this.settings).draftBack(part)
}
Jaeger.prototype.draftBentSleeve = function (part) {
  return new Bent(this.settings).draftSleeve(part)
}
Jaeger.prototype.draftBentTopSleeve = function (part) {
  return new Bent(this.settings).draftTopSleeve(part)
}
Jaeger.prototype.draftBentUnderSleeve = function (part) {
  return new Bent(this.settings).draftUnderSleeve(part)
}

// Attach own draft methods to prototype
Jaeger.prototype.draftBackBase = draftBackBase
Jaeger.prototype.draftFrontBase = draftFrontBase
Jaeger.prototype.draftFront = draftFront
Jaeger.prototype.draftBack = draftBack
Jaeger.prototype.draftSide = draftSide
Jaeger.prototype.draftCollarStand = draftCollarStand
Jaeger.prototype.draftCollar = draftCollar
Jaeger.prototype.draftUnderCollar = draftUnderCollar
Jaeger.prototype.draftPocket = draftPocket
Jaeger.prototype.draftPocketLining = draftPocketLining
Jaeger.prototype.draftChestPocketWelt = draftChestPocketWelt
Jaeger.prototype.draftChestPocketBag = draftChestPocketBag
Jaeger.prototype.draftInnerPocketWelt = draftInnerPocketWelt
Jaeger.prototype.draftInnerPocketBag = draftInnerPocketBag
Jaeger.prototype.draftTopSleeve = draftTopSleeve
Jaeger.prototype.draftUnderSleeve = draftUnderSleeve

// Named exports
export { config, Jaeger }

// Default export
export default Jaeger
