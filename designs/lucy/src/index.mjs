import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftPocket from './pocket'

// Create new design
const Lucy = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Lucy.prototype.draftPocket = draftPocket

// Named exports
export { config, Lucy }

// Default export
export default Lucy
