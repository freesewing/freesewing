// Import dependencies
import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
// Import Titan so we can extend it
import Titan from '@freesewing/titan'
// Import configuration
import config from '../config'
// Import parts
import draftFront from './front'
import draftBack from './back'

// Create the new design
const Design = new freesewing.Design(config, plugins)

// Attach Titan's draft methods to the prototype
for (const m of [ 'Back', 'Front' ]) {
  Design.prototype[`draftTitan${m}`] = function (part) {
    return new Titan(this.settings)[`draft${m}`](part)
  }
}

// Attach the draft methods to the prototype
Design.prototype.draftBack = draftBack
Design.prototype.draftFront = draftFront

// Export the new Design
export default Design
