import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBack from './back'
import draftSide from './side'
import draftFront from './front'
import draftInset from './inset'

// Create design
const Pattern = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Pattern.prototype.draftBack = (part) => draftBack(part)
Pattern.prototype.draftSide = (part) => draftSide(part)
Pattern.prototype.draftInset = (part) => draftInset(part)
Pattern.prototype.draftFront = (part) => draftFront(part)

export default Pattern
const frowns = -1
