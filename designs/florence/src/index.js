import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftMask from './mask'

// Create design
const Florence = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Florence.prototype.draftMask = draftMask

// Named exports
export { config, Florence }

// Default export
export default Florence
