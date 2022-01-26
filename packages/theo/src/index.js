import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'
import draftWaistbandInterfacingLeft from './waistband-interfacing-left'
import draftWaistbandInterfacingRight from './waistband-interfacing-right'
import draftWaistbandLeft from './waistband-left'
import draftWaistbandRight from './waistband-right'
import draftWaistbandLiningLeft from './waistband-lining-left'
import draftWaistbandLiningRight from './waistband-lining-right'
import draftFlyPiece from './fly-piece'
import draftFlyShield from './fly-shield'
import draftSidePiece from './side-piece'
import draftFrontPocketBag from './front-pocket-bag'
import draftBackInnerPocketBag from './back-inner-pocket-bag'
import draftBackOuterPocketBag from './back-outer-pocket-bag'
import draftBackPocketFacing from './back-pocket-facing'
import draftBackPocketInterfacing from './back-pocket-interfacing'
import draftBeltLoop from './belt-loop'

// Create design
const Pattern = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Pattern.prototype.draftBack = (part) => draftBack(part)
Pattern.prototype.draftFront = (part) => draftFront(part)
Pattern.prototype.draftWaistbandInterfacingLeft = (part) => draftWaistbandInterfacingLeft(part)
Pattern.prototype.draftWaistbandInterfacingRight = (part) => draftWaistbandInterfacingRight(part)
Pattern.prototype.draftWaistbandLiningLeft = (part) => draftWaistbandLiningLeft(part)
Pattern.prototype.draftWaistbandLiningRight = (part) => draftWaistbandLiningRight(part)
Pattern.prototype.draftWaistbandLeft = (part) => draftWaistbandLeft(part)
Pattern.prototype.draftWaistbandRight = (part) => draftWaistbandRight(part)
Pattern.prototype.draftFlyPiece = (part) => draftFlyPiece(part)
Pattern.prototype.draftFlyShield = (part) => draftFlyShield(part)
Pattern.prototype.draftSidePiece = (part) => draftSidePiece(part)
Pattern.prototype.draftFrontPocketBag = (part) => draftFrontPocketBag(part)
Pattern.prototype.draftBackInnerPocketBag = (part) => draftBackInnerPocketBag(part)
Pattern.prototype.draftBackOuterPocketBag = (part) => draftBackOuterPocketBag(part)
Pattern.prototype.draftBackPocketFacing = (part) => draftBackPocketFacing(part)
Pattern.prototype.draftBackPocketInterfacing = (part) => draftBackPocketInterfacing(part)
Pattern.prototype.draftBeltLoop = (part) => draftBeltLoop(part)

export default Pattern
const frowns = -1
