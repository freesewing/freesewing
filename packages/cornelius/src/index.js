import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftFront from './front'
import draftBack from './back'
import draftLegband from './legband'

// Create new design
const Pattern = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Pattern.prototype.draftFront = draftFront
Pattern.prototype.draftBack = draftBack
Pattern.prototype.draftLegband = draftLegband

export default Pattern
