import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import mirrorPlugin from '@freesewing/plugin-mirror'
import Brian from '@freesewing/brian'
import config from '../config'
// Parts
import draftSleeve from './sleeve'
import draftTopSleeve from './topsleeve'
import draftUnderSleeve from './undersleeve'

// Create new design
const Pattern = new freesewing.Design(config, [plugins, mirrorPlugin])

// Attach draft methods from Brian to prototype
Pattern.prototype.draftBase = function (part) {
  return new Brian(this.settings).draftBase(part)
}
Pattern.prototype.draftFront = function (part) {
  return new Brian(this.settings).draftFront(part)
}
Pattern.prototype.draftBack = function (part) {
  return new Brian(this.settings).draftBack(part)
}

// Attach own draft methods to prototype
Pattern.prototype.draftSleeve = draftSleeve
Pattern.prototype.draftTopSleeve = draftTopSleeve
Pattern.prototype.draftUnderSleeve = draftUnderSleeve

export default Pattern
const frowns = -1
