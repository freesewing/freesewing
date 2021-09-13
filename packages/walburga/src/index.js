import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftBase from './base'
import draftFront from './front'
import draftBack from './back'

// Create new design
const Pattern = new freesewing.Design(config, plugins)

Pattern.prototype.draftBase = draftBase
Pattern.prototype.draftFront = draftFront
Pattern.prototype.draftBack = draftBack


export default Pattern
