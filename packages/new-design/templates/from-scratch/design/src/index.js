// Import dependencies
import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
// Import configuration
import config from '../config'
// Import parts
import draftBox from './box'

// Create the new design
const Design = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Design.prototype.draftBox = draftBox

// Export the new Design
export default Design
