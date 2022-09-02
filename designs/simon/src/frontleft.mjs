import { frontDimensions } from './shared'
import frontLeftClassicSeperate from './frontleft-classic-seperate'
import frontLeftClassicCuton from './frontleft-classic-cuton'
import frontLeftSeamless from './frontleft-seamless'

export default (part) => {
  const { sa, options, complete, paperless, points, macro } = part.shorthand()

  if (complete && paperless) {
    frontDimensions(part, 'left')
    macro('ld', {
      from: points.s3CollarSplit,
      to: points.s3ArmholeSplit,
      d: 15 + sa,
    })
  }

  if (options.seperateButtonholePlacket) {
    return frontLeftClassicSeperate(part)
  } else if (options.buttonholePlacketStyle === 'seamless') {
    return frontLeftSeamless(part)
  } else if (options.buttonholePlacketStyle === 'classic') {
    return frontLeftClassicCuton(part)
  } else {
    throw `Unexpected buttonholePlacketStyle: ${options.buttonholePlacketStyle}`
  }
}
