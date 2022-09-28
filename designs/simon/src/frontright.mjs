import { frontDimensions } from './shared.mjs'
import { draftFrontRightClassicSeperate } from './frontright-classic-seperate.mjs'
import { draftFrontRightClassicCuton } from './frontright-classic-cuton.mjs'
import { draftFrontRightSeamless } from './frontright-seamless.mjs'
import { front } from './front.mjs'
import { buttonPlacketStyle } from './options.mjs'

function simonFrontRight(params) {
  const { sa, options, complete, paperless, points, macro, paths, part } = params
  macro('flip')
  if (complete) {
    points.scalebox = points.waist.shiftFractionTowards(points.cfWaist, 0.5)
    macro('scalebox', { at: points.scalebox })
    if (paperless) {
      frontDimensions(part, 'right')
      macro('ld', {
        from: points.s3ArmholeSplit,
        to: points.s3CollarSplit,
        d: 15 + sa,
      })
      if (sa) {
        paths.hemSa.attr('data-text-dy', 7, true)
        paths.saFrench.attr('data-text-dy', 7, true)
      }
    }
  }

  if (options.seperateButtonPlacket) {
    return draftFrontRightClassicSeperate(params)
  } else if (options.buttonPlacketStyle === 'seamless') {
    return draftFrontRightSeamless(params)
  } else if (options.buttonPlacketStyle === 'classic') {
    return draftFrontRightClassicCuton(params)
  } else {
    throw `Unexpected buttonPlacketStyle: ${options.buttonPlacketStyle}`
  }
}

export const frontRight = {
  name: 'simon.frontRight',
  from: front,
  options: {
    buttonPlacketStyle,
  },
  draft: simonFrontRight,
}
