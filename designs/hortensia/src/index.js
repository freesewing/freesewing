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
const Hortensia = new freesewing.Design(config, plugins)

// Attach the draft methods to the prototype
Hortensia.prototype.draftSidepanel = draftSidepanel
Hortensia.prototype.draftStrap = draftStrap
Hortensia.prototype.draftBottompanel = draftBottompanel
Hortensia.prototype.draftFrontpanel = draftFrontpanel
Hortensia.prototype.draftZipperpanel = draftZipperpanel
Hortensia.prototype.draftSidepanelreinforcement = draftSidepanelreinforcement

// Named exports
export { config, Hortensia }

// Default export
export default Hortensia
