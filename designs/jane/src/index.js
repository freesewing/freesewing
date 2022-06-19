import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftBody from './body'
import draftSleeve from './sleeve'
import draftGusset from './gusset'
// Create new design
const Pattern = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Pattern.prototype.draftBody = draftBody
Pattern.prototype.draftSleeve  = draftSleeve
Pattern.prototype.draftGusset = draftGusset
export default Pattern
