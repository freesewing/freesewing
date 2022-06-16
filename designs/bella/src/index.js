import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBack from './back'
import draftFrontSideDart from './front-side-dart'
//import draftFrontShoulderDart from './front-shoulder-dart'

// Create design
const Bella = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Bella.prototype.draftBack = (part) => draftBack(part)
Bella.prototype.draftFrontSideDart = (part) => draftFrontSideDart(part)
//Bella.prototype.draftFrontShoulderDart = (part) => draftFrontShoulderDart(part)

// Named exports
export { config, Bella }

// Default export
export default Bella
