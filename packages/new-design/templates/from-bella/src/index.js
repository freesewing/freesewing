// Import dependencies
import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
// Import Bella so we can extend it
import Bella from '@freesewing/bella'
// Import configuration
import config from '../config'
// Import parts
import draftBack from './back'
import draftFront from './front'

// Create the new design
const Design = new freesewing.Design(config, plugins)

// Attach Bella's draft methods to the prototype
for (const m of [ 'Back', 'FrontSideDart' ]) {
  Design.prototype[`draftBella${m}`] = function (part) {
    return new Bella(this.settings)[`draft${m}`](part)
  }
}

// Attach the draft methods to the prototype
Design.prototype.draftBack = draftBack
Design.prototype.draftFront = draftFront

// Export the new Design
export default Design
