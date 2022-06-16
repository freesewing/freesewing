import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'
import draftWaistband from './waistband'

// Create new design
const Shin = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Shin.prototype.draftBack = draftBack
Shin.prototype.draftFront = draftFront
Shin.prototype.draftWaistband = draftWaistband

// Named exports
export { config, Shin }

// Default export
export default Shin
