import { front } from './front.mjs'
import { back } from './back.mjs'

function draftHueyHood({
  store,
  macro,
  Point,
  Path,
  points,
  paths,
  snippets,
  Snippet,
  sa,
  options,
  measurements,
  part,
}) {
  const base = store.get('frontNeckSeamLength') + store.get('backNeckSeamLength')
  points.cfBottom = new Point(0, 0)
  points.cbBottom = points.cfBottom.shift(0, base).rotate(options.hoodAngle, points.cfBottom)
  points.cfHeightLeft = points.cfBottom.shift(90, measurements.head * options.hoodHeight)
  points.cfHeightRight = points.cfHeightLeft.shift(0, base)
  points.cfTop = points.cfBottom
    .shift(90, measurements.head * options.hoodClosure)
    .rotate(options.hoodAngle, points.cfBottom)
  points.frontTop = points.cfHeightLeft.shift(0, measurements.head * options.hoodCutback)
  points.frontTopCp2 = new Point(points.frontTop.x, points.cfTop.y)
  points.backPitch = new Point(
    points.cbBottom.x + measurements.head * options.hoodDepth,
    points.cfHeightRight.y * 0.6
  )
  points.backPitchCp1 = points.backPitch.shift(-90, measurements.head * 0.1)
  points.backPitchCp2 = points.backPitchCp1.flipY(points.backPitch)

  // Paths
  paths.seam = new Path()
    .move(points.cfBottom)
    .line(points.cbBottom)
    ._curve(points.backPitchCp1, points.backPitch)
    .curve(points.backPitchCp2, points.cfHeightRight, points.frontTop)
    .curve_(points.frontTopCp2, points.cfTop)
    .line(points.cfBottom)
    .close()
    .attr('class', 'fabric')

  if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 4, from: 'fabric' })

  // Logo
  points.logo = points.frontTop.shiftFractionTowards(points.cbBottom, 0.7)
  snippets.logo = new Snippet('logo', points.logo)

  // Title
  points.title = points.frontTop.shiftFractionTowards(points.cbBottom, 0.3)
  macro('title', {
    at: points.title,
    nr: 5,
    title: 'hood',
  })

  // Dimensions
  macro('hd', {
    id: 'wAtNeck',
    from: points.cfBottom,
    to: points.cbBottom,
    y: points.cfBottom.y + sa + 15,
  })
  macro('hd', {
    id: 'wNeckToHood',
    from: points.cbBottom,
    to: points.backPitch,
    y: points.cfBottom.y + sa + 15,
  })
  macro('hd', {
    id: 'wFull',
    from: points.cfTop,
    to: points.backPitch,
    y: points.cfBottom.y + sa + 30,
  })
  macro('hd', {
    id: 'wHoodTopToHoodBack',
    from: points.frontTop,
    to: points.backPitch,
    y: points.frontTop.y - sa - 15,
  })
  macro('ld', {
    id: 'lHoodRise',
    from: points.cfBottom,
    to: points.cfTop,
    d: -15,
  })
  macro('ld', {
    id: 'lAtNeck',
    from: points.cfBottom,
    to: points.cbBottom,
    d: 15,
  })
  macro('vd', {
    id: 'hOpening',
    from: points.cfTop,
    to: points.frontTop,
    x: points.cfBottom.x - sa - 15,
  })
  macro('vd', {
    id: 'hFull',
    from: points.cfBottom,
    to: points.frontTop,
    x: points.cfBottom.x - sa - 30,
  })

  return part
}

export const hood = {
  name: 'huey.hood',
  after: [front, back],
  measurements: ['head'],
  options: {
    hoodHeight: { pct: 59, min: 55, max: 65, menu: 'style' },
    hoodCutback: { pct: 10, min: 5, max: 15, menu: 'style' },
    hoodClosure: { pct: 13.5, min: 10, max: 15, menu: 'style' },
    hoodDepth: { pct: 8.5, min: 5, max: 12, menu: 'style' },
    hoodAngle: { deg: 5, min: 2, max: 8, menu: 'style' },
  },
  draft: draftHueyHood,
}
