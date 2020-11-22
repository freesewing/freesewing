import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBack from './back'
import draftFrontSideDart from './front-side-dart'
import draftFrontShoulderDart from './front-shoulder-dart'

// Base outlines
import bellaPlugin from './bella'

// Create design
const Pattern = new freesewing.Design(config, [plugins, bellaPlugin])

// Attach draft methods to prototype
Pattern.prototype.draftBack = (part) => draftBack(part)
Pattern.prototype.draftFrontSideDart = (part) => draftFrontSideDart(part)
Pattern.prototype.draftFrontShoulderDart = (part) => draftFrontShoulderDart(part)

export default Pattern
