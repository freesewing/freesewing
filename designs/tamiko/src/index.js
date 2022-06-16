import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftTop from './top'

// Create design
const Tamiko = new freesewing.Design(config, plugins)

// Part draft method
Tamiko.prototype.draftTop = (part) => draftTop(part)

// Named exports
export { config, Tamiko }

// Default export
export default Tamiko
