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
const Trayvon = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Trayvon.prototype.draftInterfacingTip = (part) => draftInterfacingTip(part)
Trayvon.prototype.draftInterfacingTail = (part) => draftInterfacingTail(part)
Trayvon.prototype.draftFabricTip = (part) => draftFabricTip(part)
Trayvon.prototype.draftFabricTail = (part) => draftFabricTail(part)
Trayvon.prototype.draftLiningTip = (part) => draftLiningTip(part)
Trayvon.prototype.draftLiningTail = (part) => draftLiningTail(part)
Trayvon.prototype.draftLoop = (part) => draftLoop(part)

// Named exports
export { config, Trayvon }

// Default export
export default Trayvon
