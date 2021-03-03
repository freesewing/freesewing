import { frontDimensions } from './shared'
import frontRightClassicSeperate from './frontright-classic-seperate'
import frontRightClassicCuton from './frontright-classic-cuton'
import frontRightSeamless from './frontright-seamless'

export default (part) => {
  let { sa, options, complete, paperless, points, macro, paths } = part.shorthand()
  macro('flip')
  if (complete) {
    points.scalebox = points.waist.shiftFractionTowards(points.cfWaist, 0.5)
    macro('scalebox', { at: points.scalebox })
    if (paperless) {
      frontDimensions(part, 'right')
      macro('ld', {
        from: points.shoulder,
        to: points.neck,
        d: 15 + sa
      })
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
