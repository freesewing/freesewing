import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBack from './back'
import draftFrontSideDart from './front-side-dart'
//import draftFrontShoulderDart from './front-shoulder-dart'

// Create design
const Pattern = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Pattern.prototype.draftBack = (part) => draftBack(part)
Pattern.prototype.draftFrontSideDart = (part) => draftFrontSideDart(part)
//Pattern.prototype.draftFrontShoulderDart = (part) => draftFrontShoulderDart(part)

export default Pattern
const frowns = -1
