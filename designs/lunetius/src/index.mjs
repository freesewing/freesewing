import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftLacerna from './lacerna'

// Create new design
const Lunetius = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Lunetius.prototype.draftLacerna = draftLacerna

// Named exports
export { config, Lunetius }

// Default export
export default Lunetius
