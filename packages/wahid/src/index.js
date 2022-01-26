import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import plugins from '@freesewing/plugin-bundle'
import round from '@freesewing/plugin-round'
import buttons from '@freesewing/plugin-buttons'
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

// Create pattern
const Pattern = new freesewing.Design(config, [plugins, round, buttons, wristPlugin])

// Parts we're getting from Brian
Pattern.prototype.draftBase = function (part) {
  return new Brian(this.settings).draftBase(part)
}
Pattern.prototype.draftBackBlock = function (part) {
  return new Brian(this.settings).draftBack(part)
}
Pattern.prototype.draftFrontBlock = function (part) {
  return new Brian(this.settings).draftFront(part)
}

// Attach draft methods to prototype
Pattern.prototype.draftFront = (part) => draftFront(part)
Pattern.prototype.draftBack = (part) => draftBack(part)
Pattern.prototype.draftFrontFacing = (part) => draftFrontFacing(part)
Pattern.prototype.draftFrontLining = (part) => draftFrontLining(part)
Pattern.prototype.draftPocketWelt = (part) => draftPocketWelt(part)
Pattern.prototype.draftPocketBag = (part) => draftPocketBag(part)
Pattern.prototype.draftPocketFacing = (part) => draftPocketFacing(part)
Pattern.prototype.draftPocketInterfacing = (part) => draftPocketInterfacing(part)

export default Pattern
const frowns = -1
