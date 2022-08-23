import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import plugins from '@freesewing/plugin-bundle'
import plugin from '@freesewing/plugin-bust' // Note: conditional plugin
import config from '../config'
// Parts
import draftFront from './front'
import draftBack from './back'
import draftFrontFacing from './frontfacing'
import draftFrontLining from './frontlining'
import draftPocketWelt from './pocketwelt'
import draftPocketBag from './pocketbag'
import draftPocketFacing from './pocketfacing'
import draftPocketInterfacing from './pocketinterfacing'

// Brian needs the wrist measurements, but it's pointless for Wahid
// So let's just guesstimate it rather than ask the user
const wristPlugin = {
  name: 'wrist',
  version: 1,
  hooks: {
    preDraft: function ({ settings }) {
      settings.measurements.wrist = settings.measurements.biceps * 0.6
      settings.measurements.shoulderToWrist = settings.measurements.shoulderToShouder * 1.5
    },
  },
}

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
const Wahid = new freesewing.Design(config, [plugins, wristPlugin], { plugin, condition })

// Parts we're getting from Brian
Wahid.prototype.draftBase = function (part) {
  return new Brian(this.settings).draftBase(part)
}
Wahid.prototype.draftBackBlock = function (part) {
  return new Brian(this.settings).draftBack(part)
}
Wahid.prototype.draftFrontBlock = function (part) {
  return new Brian(this.settings).draftFront(part)
}

// Attach draft methods to prototype
Wahid.prototype.draftFront = (part) => draftFront(part)
Wahid.prototype.draftBack = (part) => draftBack(part)
Wahid.prototype.draftFrontFacing = (part) => draftFrontFacing(part)
Wahid.prototype.draftFrontLining = (part) => draftFrontLining(part)
Wahid.prototype.draftPocketWelt = (part) => draftPocketWelt(part)
Wahid.prototype.draftPocketBag = (part) => draftPocketBag(part)
Wahid.prototype.draftPocketFacing = (part) => draftPocketFacing(part)
Wahid.prototype.draftPocketInterfacing = (part) => draftPocketInterfacing(part)

// Named exports
export { config, Wahid }

// Default export
export default Wahid
