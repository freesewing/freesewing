import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftPocket from './pocket'

// Create new design
const Pattern = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Pattern.prototype.draftPocket = draftPocket

export default Pattern
