import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftTunica from './tunica'

// Create new design
const Tiberius = new freesewing.Design(config, plugins)

Tiberius.prototype.draftTunica = draftTunica

// Named exports
export { config, Tiberius }

// Default export
export default Tiberius
