import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import plugin from '@freesewing/plugin-bust' // Note: conditional plugin
import Bent from '@freesewing/bent'
import config from '../config'
// Parts
import draftFront from './front'
import draftBack from './back'
import draftTail from './tail'
import draftTopSleeve from './topsleeve'
import draftUnderSleeve from './undersleeve'
import draftBelt from './belt'
import draftCollarStand from './collarstand'
import draftCollar from './collar'
import draftCuffFacing from './cufffacing'
import draftPocket from './pocket'
import draftPocketFlap from './pocketflap'
import draftPocketLining from './pocketlining'
import draftChestPocketWelt from './chestpocketwelt'
import draftChestPocketBag from './chestpocketbag'
import draftInnerPocketWelt from './innerpocketwelt'
import draftInnerPocketBag from './innerpocketbag'
import draftInnerPocketTab from './innerpockettab'

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
const Carlton = new freesewing.Design(config, plugins, { plugin, condition })

// Attach draft methods from Bent to prototype
Carlton.prototype.draftBentBase = function (part) {
  return new Bent(this.settings).draftBase(part)
}
Carlton.prototype.draftBentFront = function (part) {
  return new Bent(this.settings).draftFront(part)
}
Carlton.prototype.draftBentBack = function (part) {
  return new Bent(this.settings).draftBack(part)
}
Carlton.prototype.draftBentSleeve = function (part) {
  return new Bent(this.settings).draftSleeve(part)
}
Carlton.prototype.draftBentTopSleeve = function (part) {
  return new Bent(this.settings).draftTopSleeve(part)
}
Carlton.prototype.draftBentUnderSleeve = function (part) {
  return new Bent(this.settings).draftUnderSleeve(part)
}

// Attach own draft methods to prototype
Carlton.prototype.draftFront = draftFront
Carlton.prototype.draftBack = draftBack
Carlton.prototype.draftTail = draftTail
Carlton.prototype.draftTopSleeve = draftTopSleeve
Carlton.prototype.draftUnderSleeve = draftUnderSleeve
Carlton.prototype.draftBelt = draftBelt
Carlton.prototype.draftCollarStand = draftCollarStand
Carlton.prototype.draftCollar = draftCollar
Carlton.prototype.draftCuffFacing = draftCuffFacing
Carlton.prototype.draftPocket = draftPocket
Carlton.prototype.draftPocketFlap = draftPocketFlap
Carlton.prototype.draftPocketLining = draftPocketLining
Carlton.prototype.draftChestPocketWelt = draftChestPocketWelt
Carlton.prototype.draftChestPocketBag = draftChestPocketBag
Carlton.prototype.draftInnerPocketWelt = draftInnerPocketWelt
Carlton.prototype.draftInnerPocketBag = draftInnerPocketBag
Carlton.prototype.draftInnerPocketTab = draftInnerPocketTab

// Named exports
export { config, Carlton }

// Default export
export default Carlton
