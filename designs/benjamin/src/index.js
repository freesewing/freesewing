import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBase from './base'
import draftBow1 from './bow1'
import draftBow2 from './bow2'
import draftBow3 from './bow3'
import draftRibbon from './ribbon'

// Create new design
const Benjamin = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Benjamin.prototype.draftBase = draftBase
Benjamin.prototype.draftBow1 = draftBow1
Benjamin.prototype.draftBow2 = draftBow2
Benjamin.prototype.draftBow3 = draftBow3
Benjamin.prototype.draftRibbon = draftRibbon

// Named exports
export { config, Benjamin }

// Default export
export default Benjamin
