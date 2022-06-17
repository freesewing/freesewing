import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBase from './base'
import draftBack from './back'
import draftFront from './front'
import draftSleevecap from './sleevecap'
import draftSleeve from './sleeve'

// Create design
const Brian = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Brian.prototype.draftBase = draftBase
Brian.prototype.draftBack = draftBack
Brian.prototype.draftFront = draftFront
Brian.prototype.draftSleevecap = draftSleevecap
Brian.prototype.draftSleeve = draftSleeve

// Named exports
export { config, Brian }

// Default export
export default Brian
