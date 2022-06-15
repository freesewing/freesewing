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
const Pattern = new freesewing.Design(config, plugins)

Pattern.prototype.draftBody = draftBody
Pattern.prototype.draftTail = draftTail
Pattern.prototype.draftMouth = draftMouth
Pattern.prototype.draftAboveMouth = draftAboveMouth
Pattern.prototype.draftBelly = draftBelly
Pattern.prototype.draftTopFin = draftTopFin
Pattern.prototype.draftBottomFin = draftBottomFin
Pattern.prototype.draftLowerTeeth = draftLowerTeeth
Pattern.prototype.draftUpperTeeth = draftUpperTeeth

export default Pattern
