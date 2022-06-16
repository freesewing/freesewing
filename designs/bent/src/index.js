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
const Bent = new freesewing.Design(config, [plugins, mirrorPlugin])

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
