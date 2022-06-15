import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
import draftBody from './body'
import draftTail from './tail'
import draftMouth from './mouth'
import draftAboveMouth from './aboveMouth'
import draftBelly from './belly'
import draftTopFin from './topFin'
import draftBottomFin from './bottomFin'
import draftLowerTeeth from './lowerTeeth'
import draftUpperTeeth from './upperTeeth'

// Create design
const Hi = new freesewing.Design(config, plugins)

Hi.prototype.draftBody = draftBody
Hi.prototype.draftTail = draftTail
Hi.prototype.draftMouth = draftMouth
Hi.prototype.draftAboveMouth = draftAboveMouth
Hi.prototype.draftBelly = draftBelly
Hi.prototype.draftTopFin = draftTopFin
Hi.prototype.draftBottomFin = draftBottomFin
Hi.prototype.draftLowerTeeth = draftLowerTeeth
Hi.prototype.draftUpperTeeth = draftUpperTeeth

// Named exports
export { config, Hi }

// Default export
export default Hi
