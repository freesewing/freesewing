import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftInterfacingTip from './interfacingtip'
import draftInterfacingTail from './interfacingtail'
import draftFabricTip from './fabrictip'
import draftFabricTail from './fabrictail'
import draftLiningTip from './liningtip'
import draftLiningTail from './liningtail'
import draftLoop from './loop'

// Create design
const Pattern = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Pattern.prototype.draftInterfacingTip = (part) => draftInterfacingTip(part)
Pattern.prototype.draftInterfacingTail = (part) => draftInterfacingTail(part)
Pattern.prototype.draftFabricTip = (part) => draftFabricTip(part)
Pattern.prototype.draftFabricTail = (part) => draftFabricTail(part)
Pattern.prototype.draftLiningTip = (part) => draftLiningTip(part)
Pattern.prototype.draftLiningTail = (part) => draftLiningTail(part)
Pattern.prototype.draftLoop = (part) => draftLoop(part)

export default Pattern
