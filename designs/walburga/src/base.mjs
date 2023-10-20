import { goldenRatio } from '@freesewing/core'

function walburgaBase({
  Point,
  points,
  Path,
  paths,
  measurements,
  options,
  macro,
  snippets,
  Snippet,
  sa,
  store,
  utils,
  part,
}) {
  // define some variables
  const hem_pos =
    options.length === 'toKnee'
      ? measurements.waistToKnee
      : options.length === 'toMidLeg'
      ? measurements.waistToKnee / 1.3
      : measurements.waistToFloor * 0.95

  const hiplength = measurements.hpsToWaistBack + measurements.waistToHips
  const hwidth = (measurements.shoulderToShoulder / 2) * options.widthBonus
  const length = (measurements.hpsToWaistBack + hem_pos) * options.lengthBonus
  const hhead = (measurements.head / 4) * options.headRatio

  store.set('hhead', hhead)
  store.set('goldenRatio', goldenRatio)

  // make points
  points.top = new Point(0, 0)
  points.bottom = new Point(0, length)
  points.topLeft = points.top.shift(0, -hwidth)
  points.bottomLeft = points.bottom.shift(0, points.bottom.dx(points.topLeft))
  points.headLeft = points.top.shift(180, hhead)
  points.bottomMiddle = points.bottom.shiftFractionTowards(points.bottomLeft, 0.5)
  points.hips = points.top.shift(-90, hiplength)
  points.hipsLeft = points.hips.shift(0, points.bottom.dx(points.bottomLeft))

  points.triangle = points.bottom.shift(90, points.bottomLeft.dx(points.bottom) / goldenRatio) // golderatio proportinal to width
  points.triangleLeft = points.triangle.shift(0, points.bottom.dx(points.bottomLeft))

  // draw paths
  paths.seamBase = new Path()
    .move(points.headLeft)
    .line(points.topLeft)
    .line(points.triangleLeft)
    .line(points.bottomMiddle)
    .line(points.triangle)
    .hide()
  paths.seam = new Path()
    .move(points.top)
    .line(points.topLeft)
    .join(paths.seamBase)
    .line(points.top)
    .close()
    .attr('class', 'fabric')

  // seam allowance
  if (sa) {
    const angle = points.bottomMiddle.angle(points.triangle)
    // Using noop/insop so we can adapt the start later
    paths.saBase = new Path()
      .noop('start')
      .move(points.topLeft.shift(90, sa))
      .line(points.topLeft.shift(180, sa))
      .line(points.triangleLeft.shift(180, sa))
      .line(points.triangleLeft.shift(180 + angle, sa))
      .line(points.bottomMiddle.shift(180 + angle, sa))
      .line(points.bottomMiddle.shift(270 + angle, sa))
      .line(
        utils.beamIntersectsX(
          points.bottomMiddle.shift(270 + angle, sa),
          points.triangle.shift(270 + angle, sa),
          points.triangle.x
        )
      )
      .line(points.triangle)
      .hide()

    // Insop the start
    paths.sa = paths.saBase
      .insop(
        'start',
        new Path()
          .move(points.top)
          .line(points.top.shift(90, sa))
          .line(points.topLeft.shift(90, sa))
      )
      .addClass('fabric sa')
      .unhide()
  }

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 1, from: 'fabric', onFold: true })

  // notches
  if (options.neckline === false) snippets.hl = new Snippet('notch', points.headLeft)

  // Cut on fold
  macro('cutonfold', {
    from: points.triangle,
    to: points.top,
    grainline: true,
  })

  // Logo
  points.logo = points.top.shift(45, points.bottom.dy(points.top) / 5)
  snippets.logo = new Snippet('logo', points.logo)

  // Title
  points.title = points.logo.shift(90, points.bottom.dy(points.top) / 4)
  macro('title', {
    at: points.title,
    nr: 1,
    title: 'wappenrock-base',
    align: 'center',
  })

  // Scalebox
  points.scalebox = points.title.shift(90, points.bottom.dy(points.top) / 5)
  macro('scalebox', { at: points.scalebox })

  // Dimensions
  macro('vd', {
    from: points.bottom,
    to: points.top,
    x: points.bottom.x + 15,
  })
  macro('vd', {
    id: 'hTip',
    from: points.bottomMiddle,
    to: points.triangleLeft,
    x: points.bottomLeft.x - 15 - sa,
  })

  macro('vd', {
    id: 'hSide',
    from: points.topLeft,
    to: points.triangleLeft,
    x: points.bottomLeft.x - 30 - sa,
  })
  macro('hd', {
    id: 'wFull',
    from: points.topLeft,
    to: points.top,
    y: points.top.y - 30 - sa,
  })
  macro('hd', {
    id: 'wTohead',
    from: points.headLeft,
    to: points.top,
    y: points.top.y - 15 - sa,
  })
  macro('hd', {
    id: 'wFromHead',
    from: points.topLeft,
    to: points.headLeft,
    y: points.top.y - 15 - sa,
  })
  macro('hd', {
    id: 'wHalfTip',
    from: points.triangleLeft,
    to: points.bottomMiddle,
    y: points.bottomMiddle.y + sa + 15,
  })
  macro('vd', {
    id: 'hHipsToStartTip',
    from: points.triangleLeft,
    to: points.hipsLeft,
    x: points.triangleLeft.x - 15 - sa,
  })
  macro('ld', {
    id: 'lTip',
    from: points.triangleLeft,
    to: points.bottomMiddle,
    d: -15 - sa,
  })

  return part
}

// These options are re-used in front
export const neckline = { bool: true, menu: 'style' }
export const neckoRatio = { pct: 100, min: 10, max: 190, menu: 'style' }

// Part
export const base = {
  name: 'walburga.base',
  hide: { self: true },
  measurements: [
    'head',
    'shoulderToShoulder',
    'hpsToWaistBack',
    'waistToKnee',
    'waistToHips',
    'waistToFloor',
    'waistToUpperLeg',
  ],
  options: {
    headRatio: { pct: 100, min: 80, max: 120, menu: 'fit' },
    lengthBonus: { pct: 85, min: 60, max: 130, menu: 'style' },
    widthBonus: { pct: 95, min: 50, max: 130, menu: 'style' },
    length: {
      list: ['toKnee', 'toMidLeg', 'toFloor'],
      dflt: 'toKnee',
      menu: 'style',
    },
    neckline,
    neckoRatio,
  },
  draft: walburgaBase,
}
