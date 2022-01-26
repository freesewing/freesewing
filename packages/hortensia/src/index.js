import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
// import theme from '@freesewing/plugin-theme'
import config from '../config'
import draftSidepanel from './sidepanel'
import draftFrontpanel from './frontpanel'
import draftBottompanel from './bottompanel'
import draftZipperpanel from './zipperpanel'
import draftSidepanelreinforcement from './sidepanelreinforcement'
import draftStrap from './strap'

// Create new design
const Pattern = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Pattern.prototype.draftSidepanel = draftSidepanel
Pattern.prototype.draftStrap = draftStrap
Pattern.prototype.draftBottompanel = draftBottompanel
Pattern.prototype.draftFrontpanel = draftFrontpanel
Pattern.prototype.draftZipperpanel = draftZipperpanel
Pattern.prototype.draftSidepanelreinforcement = draftSidepanelreinforcement

export default Pattern
const frowns = -1
