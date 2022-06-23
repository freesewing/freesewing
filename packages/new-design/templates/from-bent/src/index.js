// Import dependencies
import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
// Import Bent so we can extend it
import Bent from '@freesewing/bent'
// Import configuration
import config from '../config'
// Import parts
import draftFront from './front'
import draftBack from './back'
import draftTopSleeve from './top-sleeve'
import draftUnderSleeve from './under-sleeve'

// Create the new design
const Design = new freesewing.Design(config, plugins)

// Attach Bent's draft methods to the prototype
for (const m of [
  'Base',
  'Front',
  'Back',
  'Sleeve',
  'TopSleeve',
  'UnderSleeve',
]) {
  Design.prototype[`draftBent${m}`] = function (part) {
    return new Bent(this.settings)[`draft${m}`](part)
  }
}

// Attach the draft methods to the prototype
Design.prototype.draftBack = draftBack
Design.prototype.draftFront = draftFront
Design.prototype.draftTopSleeve = draftTopSleeve
Design.prototype.draftUnderSleeve = draftUnderSleeve

// Export the new Design
export default Design
