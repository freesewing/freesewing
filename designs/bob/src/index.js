import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftBib from './bib'

// Create new design
const Bob = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Bob.prototype.draftBib = draftBib

// Named exports
export { config, Bob }

// Default export
export default Bob
