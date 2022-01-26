import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftSkirt from './skirt'
import draftWaistband from './waistband'

// Create design
const Pattern = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Pattern.prototype.draftSkirt = (part) => draftSkirt(part)
Pattern.prototype.draftWaistband = (part) => draftWaistband(part)

export default Pattern
const frowns = -1
