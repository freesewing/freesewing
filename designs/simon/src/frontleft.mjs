import { frontDimensions } from './shared.mjs'
import { draftFrontLeftClassicSeperate } from './frontleft-classic-seperate.mjs'
import { draftFrontLeftClassicCuton } from './frontleft-classic-cuton.mjs'
import { draftFrontLeftSeamless } from './frontleft-seamless.mjs'
import { front } from './front.mjs'
import { buttonholePlacketStyle } from './options.mjs'

function simonFrontLeft(params) {
  const { sa, options, complete, paperless, points, macro, part } = params

  if (complete && paperless) {
    frontDimensions(part, 'left')
    macro('ld', {
      from: points.s3CollarSplit,
      to: points.s3ArmholeSplit,
      d: 15 + sa,
    })
  }
  if (options.seperateButtonholePlacket) {
    return draftFrontLeftClassicSeperate(params)
  } else if (options.buttonholePlacketStyle === 'seamless') {
    return draftFrontLeftSeamless(params)
  } else if (options.buttonholePlacketStyle === 'classic') {
    return draftFrontLeftClassicCuton(params)
  } else {
    throw `Unexpected buttonholePlacketStyle: ${options.buttonholePlacketStyle}`
  }
}

export const frontLeft = {
  name: 'simon.frontLeft',
  from: front,
  options: {
    buttonholePlacketStyle,
  },
  draft: simonFrontLeft,
}
