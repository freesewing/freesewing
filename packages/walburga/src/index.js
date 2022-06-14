import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftBase from './base'
import draftFront from './front'
import draftBack from './back'

// Create new design
const Walburga = new freesewing.Design(config, plugins)

Walburga.prototype.draftBase = draftBase
Walburga.prototype.draftFront = draftFront
Walburga.prototype.draftBack = draftBack

// Named exports
export { config, Walburga }

// Default export
export default Walburga
