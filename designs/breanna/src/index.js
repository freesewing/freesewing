import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBase from './base'
import draftBack from './back'
import draftFrontBase from './front-base'
import draftFront from './front'
import draftSleevecap from './sleevecap'
import draftSleeve from './sleeve'

// Create design
const Breanna = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Breanna.prototype.draftBase = draftBase
Breanna.prototype.draftBack = draftBack
Breanna.prototype.draftFrontBase = draftFrontBase
Breanna.prototype.draftFront = draftFront
Breanna.prototype.draftSleevecap = draftSleevecap
Breanna.prototype.draftSleeve = draftSleeve

// Named exports
export { config, Breanna }

// Default export
export default Breanna
