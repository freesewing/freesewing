import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'

// Create design
const Titan = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Titan.prototype.draftBack = (part) => draftBack(part)
Titan.prototype.draftFront = (part) => draftFront(part)

// Named exports
export { config, Titan }

// Default export
export default Titan
