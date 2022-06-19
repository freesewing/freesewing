import freesewing from '@freesewing/core'
import Bella from '@freesewing/bella'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBackPoints from './backPoints'
import draftBackInside from './backInside'
import draftBackOutside from './backOutside'
import draftFrontPoints from './frontPoints'
import draftFrontInside from './frontInside'
import draftFrontOutside from './frontOutside'

// Create design
const Pattern = new freesewing.Design(config, plugins)

// console.log( 'bella back')
//   measurements.highBust = (measurements.highBust == undefined || measurements.highBust == 0 ) ? measurements.chest *1.035 : measurements.highBust
//   measurements.bustSpan = (measurements.bustSpan == undefined || measurements.bustSpan == 0 ) ? measurements.waistBack *.47 : measurements.bustSpan
//   measurements.underbust = (measurements.underbust == undefined || measurements.underbust == 0 ) ? (measurements.chest +measurements.waist) *.5 : measurements.underbust
//   measurements.hpsToBust = (measurements.hpsToBust == undefined || measurements.hpsToBust == 0 ) ? measurements.hpsToWaistFront *.59 : measurements.hpsToBust

//   // Get to work
//   console.log({ hpsToBust : measurements.hpsToBust} )
 
// Attach draft methods to prototype
Pattern.prototype.draftBellaBack = function (part) {
  return new Bella(this.settings).draftBack(part)
}
Pattern.prototype.draftBellaFrontSideDart = function (part) {
  return new Bella(this.settings).draftFrontSideDart(part)
}

// Pattern.prototype.draftFrontSideDart = (part) => draftFrontSideDart(part)

Pattern.prototype.draftBackPoints = (part) => draftBackPoints(part)
Pattern.prototype.draftBackInside = (part) => draftBackInside(part)
Pattern.prototype.draftBackOutside = (part) => draftBackOutside(part)
Pattern.prototype.draftFrontPoints = (part) => draftFrontPoints(part)
Pattern.prototype.draftFrontInside = (part) => draftFrontInside(part)
Pattern.prototype.draftFrontOutside = (part) => draftFrontOutside(part)

export default Pattern
