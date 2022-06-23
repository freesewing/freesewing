// Import dependencies
import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
// Import Brian so we can extend it
import Brian from '@freesewing/brian'
// Import configuration
import config from '../config'
// Import parts
import draftFront from './front'
import draftBack from './back'
import draftSleeve from './sleeve'

// Create the new design
const Design = new freesewing.Design(config, plugins)

// Attach Brian's draft methods to the prototype
for (const m of [
  'Base',
  'Front',
  'Back',
  'Sleevecap',
  'Sleeve',
]) {
  Design.prototype[`draftBrian${m}`] = function (part) {
    return new Brian(this.settings)[`draft${m}`](part)
  }
}

// Attach the draft methods to the prototype
Design.prototype.draftBack = draftBack
Design.prototype.draftFront = draftFront
Design.prototype.draftSleeve = draftSleeve

// Export the new Design
export default Design
