import { frontDimensions } from './shared.mjs'
import { draftFrontLeftClassicSeparate } from './frontleft-classic-separate.mjs'
import { draftFrontLeftClassicCuton } from './frontleft-classic-cuton.mjs'
import { draftFrontLeftSeamless } from './frontleft-seamless.mjs'
import { front } from './front.mjs'
import { buttonholePlacketStyle } from './options.mjs'

function simonFrontLeft(params) {
  const { sa, options, points, macro, part } = params

  frontDimensions(part, 'left')
  macro('ld', {
    from: points.s3CollarSplit,
    to: points.s3ArmholeSplit,
    d: 15 + sa,
  })

  if (options.separateButtonholePlacket) {
    return draftFrontLeftClassicSeparate(params)
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
