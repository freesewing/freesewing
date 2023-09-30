import { front } from './front.mjs'
import { back } from './back.mjs'
import { front as titanFront } from '@freesewing/titan'
import { back as titanBack } from '@freesewing/titan'

function draftCharlieWaistbandCurved({
  points,
  Point,
  paths,
  Path,
  options,
  absoluteOptions,
  complete,
  store,
  macro,
  snippets,
  Snippet,
  sa,
  part,
}) {
  if (options.waistbandCurve == 0) return part

  store.set('waistbandWidth', absoluteOptions.waistbandWidth)
  const fullWaist = 2 * (store.get('waistbandBack') + store.get('waistbandFront'))
  const sideSeamFraction =
    (0.5 * store.get('waistbandFront')) / (store.get('waistbandBack') + store.get('waistbandFront'))
  const radius = fullWaist / (2 * Math.PI * options.waistbandCurve)
  const angle = 360 * options.waistbandCurve

  points.center = new Point(0, 0)

  points.cfLeftBottom = points.center.shift(0, radius)
  points.cbBottom = points.cfLeftBottom.rotate(0.5 * angle, points.center)
  points.cfRightBottom = points.cfLeftBottom.rotate(angle, points.center)

  points.cfLeftTop = points.cfLeftBottom.shiftTowards(points.center, store.get('waistbandWidth'))
  points.cbTop = points.cfLeftTop.rotate(0.5 * angle, points.center)
  points.cfRightTop = points.cfRightBottom.shiftTowards(points.center, store.get('waistbandWidth'))

  // Calculate control points for circle arc
  // https://math.stackexchange.com/questions/873224/calculate-control-points-of-cubic-bezier-curve-approximating-a-part-of-a-circle
  const a = (4 / 3) * Math.tan((2 * Math.PI * options.waistbandCurve) / 4)

  points.cfLeftBottomCp = points.cfLeftBottom.shift(90, a * radius)
  points.cfRightBottomCp = points.cfRightBottom.shift(angle - 90, a * radius)

  points.cfLeftTopCp = points.cfLeftTop.shift(90, a * (radius - store.get('waistbandWidth')))
  points.cfRightTopCp = points.cfRightTop.shift(
    angle - 90,
    a * (radius - store.get('waistbandWidth'))
  )

  // Add fly underlap
  points.edgeRightTop = points.cfRightTop.shiftTowards(
    points.cfRightTopCp,
    -store.get('waistbandFly')
  )
  points.edgeRightBottom = points.cfRightBottom.shiftTowards(
    points.cfRightBottomCp,
    -store.get('waistbandFly')
  )

  paths.waistbandTop = new Path()
    .move(points.cfRightTop)
    .curve(points.cfRightTopCp, points.cfLeftTopCp, points.cfLeftTop)
    .hide()

  paths.waistbandBottom = new Path()
    .move(points.cfRightBottom)
    .curve(points.cfRightBottomCp, points.cfLeftBottomCp, points.cfLeftBottom)

  points.ssRightBottom = paths.waistbandBottom.shiftFractionAlong(sideSeamFraction)
  points.ssLeftBottom = paths.waistbandBottom.shiftFractionAlong(1 - sideSeamFraction)

  points.ssRightTop = paths.waistbandTop.shiftFractionAlong(sideSeamFraction)
  points.ssLeftTop = paths.waistbandTop.shiftFractionAlong(1 - sideSeamFraction)

  paths.saBase = new Path()
    .move(points.cfLeftBottom)
    .curve(points.cfLeftBottomCp, points.cfRightBottomCp, points.cfRightBottom)
    .line(points.edgeRightBottom)
    .line(points.edgeRightTop)
    .line(points.cfRightTop)
    .curve(points.cfRightTopCp, points.cfLeftTopCp, points.cfLeftTop)
    .line(points.cfLeftBottom)
    .close()
    .hide()
  paths.seam = paths.saBase.clone().attr('class', 'fabric').unhide()

  if (sa) paths.sa = paths.saBase.offset(sa).close().attr('class', 'fabric sa')

  if (complete) {
    paths.cf = new Path()
      .move(points.cfRightTop)
      .line(points.cfRightBottom)
      .attr('class', 'dashed')
      .attr('data-text', 'centerFront')
      .attr('data-text-class', 'center')
    paths.rs = new Path()
      .move(points.ssRightTop)
      .line(points.ssRightBottom)
      .attr('class', 'dashed')
      .attr('data-text', 'rightSide')
      .attr('data-text-class', 'center')
    paths.ls = new Path()
      .move(points.ssLeftTop)
      .line(points.ssLeftBottom)
      .attr('class', 'dashed')
      .attr('data-text', 'leftSide')
      .attr('data-text-class', 'center')
  }

  /*
   * Annotations
   */
  // Cut list
  store.cutlist.setCut({ cut: 1, from: 'fabric' })

  // Notches
  macro('sprinkle', {
    snippet: 'notch',
    on: [
      'cfRightBottom',
      'cfRightTop',
      'cbBottom',
      'cbTop',
      'ssLeftBottom',
      'ssRightBottom',
      'ssLeftTop',
      'ssRightTop',
    ],
  })

  // Title
  points.titleAnchor = points.cfLeftTop.shiftFractionTowards(points.ssLeftBottom, 0.5)
  macro('title', {
    at: points.titleAnchor,
    nr: 11,
    title: 'waistband',
    rotation: 90,
  })

  // Grainline
  macro('grainline', {
    from: points.cbTop,
    to: points.cbBottom,
  })

  // Button / Buttonhole
  let buttonScale = store.get('waistbandWidth') / 14
  points.button = points.edgeRightBottom.shiftFractionTowards(points.cfRightTop, 0.6)
  snippets.button = new Snippet('button', points.button).attr('data-scale', buttonScale)
  points.buttonhole = new Point(
    points.cfLeftTop.x + 0.4 * store.get('waistbandWidth'),
    points.cfLeftTop.y - store.get('waistbandFly') * 0.4
  )
  snippets.buttonhole = new Snippet('buttonhole-start', points.buttonhole).attr(
    'data-scale',
    buttonScale
  )

  // Dimensions
  // Lower waistband measurements
  macro('hd', {
    id: 'wFull',
    from: points.edgeRightBottom,
    to: points.cfLeftBottom,
    y: points.edgeRightBottom.y - sa - 30,
  })
  macro('vd', {
    id: 'hFull',
    from: points.edgeRightBottom,
    to: points.cfLeftBottom,
    x: points.cfLeftBottom.x + sa + 30,
  })

  macro('hd', {
    id: 'wTopToSegment1',
    from: points.edgeRightBottom,
    to: points.ssRightBottom,
    y: points.edgeRightBottom.y - sa - 15,
  })
  macro('vd', {
    id: 'hTopToSegment1',
    from: points.edgeRightBottom,
    to: points.ssRightBottom,
    x: points.ssRightBottom.x + sa + 15,
  })

  macro('hd', {
    id: 'wSegment1To2',
    from: points.ssRightBottom,
    to: points.cbBottom,
    y: points.ssRightBottom.y - sa - 15,
  })
  macro('vd', {
    id: 'hSegment1To2',
    from: points.ssRightBottom,
    to: points.cbBottom,
    x: points.cbBottom.x + sa + 15,
  })

  macro('hd', {
    id: 'wSegment2To3',
    from: points.cbBottom,
    to: points.ssLeftBottom,
    y: points.cbBottom.y - sa - 15,
  })
  macro('vd', {
    id: 'hSegment2To3',
    from: points.cbBottom,
    to: points.ssLeftBottom,
    x: points.ssLeftBottom.x + sa + 15,
  })
  macro('hd', {
    id: 'wToFinalSegment',
    from: points.ssLeftBottom,
    to: points.cfLeftBottom,
    y: points.ssLeftBottom.y - sa - 15,
  })
  macro('vd', {
    id: 'hToFinalSegment',
    from: points.ssLeftBottom,
    to: points.cfLeftBottom,
    x: points.cfLeftBottom.x + sa + 15,
  })
  macro('hd', {
    id: 'wWaistband',
    from: points.cfLeftTop,
    to: points.cfLeftBottom,
    y: points.cfLeftTop.y + sa + 15,
  })
  macro('hd', {
    id: 'horWidthWaistband',
    from: points.edgeRightBottom,
    to: points.edgeRightTop,
    y: points.edgeRightBottom.y - sa - 15,
  })
  macro('vd', {
    id: 'verWidthWaistband',
    from: points.edgeRightBottom,
    to: points.edgeRightTop,
    x: points.edgeRightTop.x - sa - 15,
  })

  // TOP OF WAISTBAND
  macro('hd', {
    id: 'wInnerCurve',
    from: points.edgeRightTop,
    to: points.cfLeftTop,
    y: points.edgeRightTop.y + sa + 30,
  })
  macro('vd', {
    id: 'hInnerCurve',
    from: points.edgeRightTop,
    to: points.cfLeftTop,
    x: points.edgeRightTop.x - sa - 30,
  })
  macro('hd', {
    id: 'wInnerTopToSegment1',
    from: points.edgeRightTop,
    to: points.ssRightTop,
    y: points.edgeRightTop.y + sa + 15,
  })
  macro('vd', {
    id: 'hInnerTopToSegment1',
    from: points.edgeRightTop,
    to: points.ssRightTop,
    x: points.edgeRightTop.x - sa - 15,
  })

  macro('hd', {
    id: 'wInnerSegment1To2',
    from: points.ssRightTop,
    to: points.cbTop,
    y: points.ssRightTop.y + sa + 15,
  })
  macro('vd', {
    id: 'hInnerSegment1To2',
    from: points.ssRightTop,
    to: points.cbTop,
    x: points.ssRightBottom.x - sa - 15,
  })
  macro('hd', {
    id: 'wInnerSegment2To3',
    from: points.cbTop,
    to: points.ssLeftTop,
    y: points.cbTop.y + sa + 15,
  })
  macro('vd', {
    id: 'hInnerSegment3To4',
    from: points.cbTop,
    to: points.ssLeftTop,
    x: points.cbTop.x - sa - 15,
  })

  macro('hd', {
    id: 'wInnerSegment4To5',
    from: points.ssLeftTop,
    to: points.cfLeftTop,
    y: points.ssLeftTop.y + sa + 15,
  })
  macro('vd', {
    id: 'hInnerSegment4To5',
    from: points.ssLeftTop,
    to: points.cfLeftTop,
    x: points.ssLeftTop.x - sa - 15,
  })

  return part
}

export const waistbandCurved = {
  name: 'charlie.waistbandCurved',
  after: [titanBack, titanFront, front, back],
  draft: draftCharlieWaistbandCurved,
}
