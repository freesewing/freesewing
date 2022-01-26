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
const Pattern = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Pattern.prototype.draftBase = draftBase
Pattern.prototype.draftPanels = draftPanels
Pattern.prototype.draftPanel1 = draftPanel1
Pattern.prototype.draftPanel2 = draftPanel2
Pattern.prototype.draftPanel3 = draftPanel3
Pattern.prototype.draftPanel4 = draftPanel4
Pattern.prototype.draftPanel5 = draftPanel5
Pattern.prototype.draftPanel6 = draftPanel6

export default Pattern
const frowns = -1
