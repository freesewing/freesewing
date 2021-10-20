import { frontDimensions } from './shared'
import frontRightClassicSeperate from './frontright-classic-seperate'
import frontRightClassicCuton from './frontright-classic-cuton'
import frontRightSeamless from './frontright-seamless'

export default (part) => {
  const { sa, options, complete, paperless, points, macro, paths } = part.shorthand()
if (options.buttonholePlacement == 'leftOverRight'){
  macro('flip')
  }
  if (complete) {
    points.scalebox = points.waist.shiftFractionTowards(points.cfWaist, 0.5)
    macro('scalebox', { at: points.scalebox })
    if (paperless) {
	  switch (options.buttonholePlacement){
	case 'leftOverRight':
      frontDimensions(part, 'right'),
      macro('ld', {
        from: points.s3ArmholeSplit,
        to: points.s3CollarSplit,
        d: 15 + sa,
      })
	break
	case 'rightOverLeft':
      frontDimensions(part, 'left'),
      macro('ld', {
        from: points.s3CollarSplit,
        to: points.s3ArmholeSplit,
        d: 15 + sa,
      })
	  }
      if (sa) {
        paths.hemSa.attr('data-text-dy', 7, true)
        paths.saFrench.attr('data-text-dy', 7, true)
      }
    }
  }

  return options.buttonPlacketStyle === 'seamless'
    ? frontRightSeamless(part)
    : options.seperateButtonPlacket
    ? frontRightClassicSeperate(part)
    : frontRightClassicCuton(part)
}
