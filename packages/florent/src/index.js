import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftTop from './top'
import draftSide from './side'
import draftBrimBottom from './brimbottom'
import draftBrimTop from './brimtop'
import draftBrimInterfacing from './briminterfacing'

// Create new design
const Pattern = new freesewing.Design(config, plugins)

// Attachdraft methods to prototype
Pattern.prototype.draftTop = draftTop
Pattern.prototype.draftSide = draftSide
Pattern.prototype.draftBrimBottom = draftBrimBottom
Pattern.prototype.draftBrimTop = draftBrimTop
Pattern.prototype.draftBrimInterfacing = draftBrimInterfacing

export default Pattern
const frowns = -1
