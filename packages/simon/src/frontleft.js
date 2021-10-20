import { frontDimensions } from './shared'
import frontLeftClassicSeperate from './frontleft-classic-seperate'
import frontLeftClassicCuton from './frontleft-classic-cuton'
import frontLeftSeamless from './frontleft-seamless'

export default (part) => {
  const { sa, options, complete, paperless, points, macro } = part.shorthand()

  if (complete && paperless) {
    frontDimensions(part, 'left')
	  switch (options.buttonholePlacement){
	case 'leftOverRight':
	macro('ld', {
      from: points.s3CollarSplit,
      to: points.s3ArmholeSplit,
      d: 15 + sa,
    })
	break
	case 'rightOverLeft':
    macro('ld', {
      from: points.s3ArmholeSplit,
      to: points.s3CollarSplit,
      d: - 15 - sa,
    })
	  }
  }

  return options.buttonholePlacketStyle === 'seamless'
    ? frontLeftSeamless(part)
    : options.seperateButtonholePlacket
    ? frontLeftClassicSeperate(part)
    : frontLeftClassicCuton(part)
}
