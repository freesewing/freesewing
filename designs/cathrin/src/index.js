import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
//Parts
import draftBase from './base'
import draftPanels from './panels'
import draftPanel1 from './panel1'
import draftPanel2 from './panel2'
import draftPanel3 from './panel3'
import draftPanel4 from './panel4'
import draftPanel5 from './panel5'
import draftPanel6 from './panel6'

// Create design
const Cathrin = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Cathrin.prototype.draftBase = draftBase
Cathrin.prototype.draftPanels = draftPanels
Cathrin.prototype.draftPanel1 = draftPanel1
Cathrin.prototype.draftPanel2 = draftPanel2
Cathrin.prototype.draftPanel3 = draftPanel3
Cathrin.prototype.draftPanel4 = draftPanel4
Cathrin.prototype.draftPanel5 = draftPanel5
Cathrin.prototype.draftPanel6 = draftPanel6

// Named exports
export { config, Cathrin }

// Default export
export default Cathrin
