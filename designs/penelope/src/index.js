import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftFront from './front'
import draftBack from './back'
import draftWaistband from './waistband'

// Create new design
const Penelope = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Penelope.prototype.draftFront = draftFront
Penelope.prototype.draftBack = draftBack
Penelope.prototype.draftWaistband = draftWaistband

// Named exports
export { config, Penelope }

// Default export
export default Penelope
