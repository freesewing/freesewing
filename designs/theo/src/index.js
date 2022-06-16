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
const Theo = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Theo.prototype.draftBack = (part) => draftBack(part)
Theo.prototype.draftFront = (part) => draftFront(part)
Theo.prototype.draftWaistbandInterfacingLeft = (part) => draftWaistbandInterfacingLeft(part)
Theo.prototype.draftWaistbandInterfacingRight = (part) => draftWaistbandInterfacingRight(part)
Theo.prototype.draftWaistbandLiningLeft = (part) => draftWaistbandLiningLeft(part)
Theo.prototype.draftWaistbandLiningRight = (part) => draftWaistbandLiningRight(part)
Theo.prototype.draftWaistbandLeft = (part) => draftWaistbandLeft(part)
Theo.prototype.draftWaistbandRight = (part) => draftWaistbandRight(part)
Theo.prototype.draftFlyPiece = (part) => draftFlyPiece(part)
Theo.prototype.draftFlyShield = (part) => draftFlyShield(part)
Theo.prototype.draftSidePiece = (part) => draftSidePiece(part)
Theo.prototype.draftFrontPocketBag = (part) => draftFrontPocketBag(part)
Theo.prototype.draftBackInnerPocketBag = (part) => draftBackInnerPocketBag(part)
Theo.prototype.draftBackOuterPocketBag = (part) => draftBackOuterPocketBag(part)
Theo.prototype.draftBackPocketFacing = (part) => draftBackPocketFacing(part)
Theo.prototype.draftBackPocketInterfacing = (part) => draftBackPocketInterfacing(part)
Theo.prototype.draftBeltLoop = (part) => draftBeltLoop(part)

// Named exports
export { config, Theo }

// Default export
export default Theo
