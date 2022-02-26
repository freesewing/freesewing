import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import plugin_bust from '@freesewing/plugin-bust' // Note: conditional plugin
import config from '../config'
// Parts
import draftBase from './base'
import draftBack from './back'
import draftFront from './front'
import draftSleevecap from './sleevecap'
import draftSleeve from './sleeve'

// Create design
const Pattern = new freesewing.Design(config, [plugins, plugin_bust], )

// Attach draft methods to prototype
Pattern.prototype.draftBase = draftBase
Pattern.prototype.draftBack = draftBack
Pattern.prototype.draftFront = draftFront
Pattern.prototype.draftSleevecap = draftSleevecap
Pattern.prototype.draftSleeve = draftSleeve

export default Pattern
