import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftSkirt from './skirt'
import draftWaistband from './waistband'

// Create design
const Sandy = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Sandy.prototype.draftSkirt = (part) => draftSkirt(part)
Sandy.prototype.draftWaistband = (part) => draftWaistband(part)

// Named exports
export { config, Sandy }

// Default export
export default Sandy
