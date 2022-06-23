// Import dependencies
import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
// Import Breanna so we can extend it
import Breanna from '@freesewing/breanna'
// Import configuration
import config from '../config'
// Import parts
import draftBack from './back'
import draftFront from './front'
import draftSleeve from './sleeve'

// Create the new design
const Design = new freesewing.Design(config, plugins)

// Attach Breanna's draft methods to the prototype
for (const m of [
  'Base',
  'Back',
  'FrontBase',
  'Front',
  'Sleevecap',
  'Sleeve',
]) {
  Design.prototype[`draftBreanna${m}`] = function (part) {
    return new Breanna(this.settings)[`draft${m}`](part)
  }
}

// Attach the draft methods to the prototype
Design.prototype.draftBack = draftBack
Design.prototype.draftFront = draftFront
Design.prototype.draftSleeve = draftSleeve

// Export the new Design
export default Design
