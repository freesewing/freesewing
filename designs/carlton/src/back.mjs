import { back as bentBack } from '@freesewing/bent'
import { calculateRatios } from './shared.mjs'
import { hidePresets, pctBasedOn } from '@freesewing/core'

function draftCarltonBack({
  sa,
  snippets,
  Snippet,
  store,
  complete,
  points,
  measurements,
  options,
  macro,
  Point,
  paths,
  Path,
  part,
}) {
  calculateRatios(part)
  // Belt width
  let bw = measurements.hpsToWaistBack * options.beltWidth
  store.set('beltWidth', bw)

  // Box pleat (bp)
  points.bpStart = new Point(0, points.armholePitch.y)
  points.bpTop = new Point(measurements.chest * options.backPleat * -1, points.armholePitch.y)
  points.bpBottom = new Point(points.bpTop.x, points.cbWaist.y - bw / 2)
  points.bpTriangleEdge = points.bpStart.shift(0, points.bpTop.dx(points.bpStart) * 0.6)
  points.bpTriangleTip = points.bpStart.shift(90, points.bpStart.dx(points.bpTriangleEdge))

  // Waist shaping
  points.waist = new Point(
    store.get('chest') / 4 - store.get('waistReduction') / 8,
    points.bpBottom.y
  )
  points.waistCp2 = points.waist.shift(90, points.armhole.dy(points.waist) / 3)
  points.cbWaist = new Point(0, points.bpBottom.y)

  // Dart
  points.dartCenter = points.cbWaist.shiftFractionTowards(points.waist, 0.4)
  points.dartTip = points.dartCenter.shift(90, points.armhole.dy(points.dartCenter) * 0.85)
  points.dartRight = points.dartCenter.shift(0, store.get('waistReduction') / 8)
  points.dartLeft = points.dartRight.flipX(points.dartCenter)
  points.dartLeftCp = points.dartLeft.shift(90, points.dartTip.dy(points.dartCenter) * 0.6)
  points.dartRightCp = points.dartLeftCp.flipX(points.dartCenter)

  store.set('cbToDart', points.dartLeft.x)
  store.set('dartToSide', points.dartRight.dx(points.waist))

  // Back stay (bs)
  points.bpEnd = new Path()
    .move(points.armhole)
    ._curve(points.waistCp2, points.waist)
    .shiftFractionAlong(0.1)
  points.bsCp1 = points.bpStart.shiftFractionTowards(points.armholePitch, 0.5)
  points.bsCp2 = points.bpEnd.shiftFractionTowards(points.cbArmhole, 0.3)

  // Store collar length
  store.set(
    'backCollarLength',
    new Path().move(points.cbNeck)._curve(points.neckCp2, points.neck).length()
  )

  // Store distance to armhole pitch point notch
  store.set(
    'backArmholePitchToShoulder',
    new Path()
      .move(points.armholePitch)
      .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder)
      .length()
  )

  // Clean up
  for (let i in paths) {
    if (['backArmhole', 'backCollar'].indexOf(i) === -1) delete paths[i]
  }
  for (let i in snippets) delete snippets[i]

  // Paths
  paths.seam1 = new Path()
    .move(points.cbNeck)
    .line(points.bpStart)
    .line(points.bpTop)
    .line(points.bpBottom)
  paths.dart = new Path()
    .move(points.dartLeft)
    .curve_(points.dartLeftCp, points.dartTip)
    ._curve(points.dartRightCp, points.dartRight)
  paths.seam2 = new Path()
    .move(points.waist)
    .curve_(points.waistCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    .join(paths.backArmhole)
    .line(points.s3CollarSplit)
    .join(paths.backCollar)
  paths.seam = paths.seam1.join(paths.dart).join(paths.seam2).close().attr('class', 'fabric')

  if (sa)
    paths.sa = paths.seam1
      .line(points.waist)
      .offset(sa)
      .join(paths.seam2.offset(sa))
      .close()
      .trim()
      .close()
      .addClass('fabric sa')

  if (complete) {
    paths.backStay = new Path()
      .move(points.bpStart)
      .curve(points.bsCp1, points.bsCp2, points.bpEnd)
      .addClass('canvas help')

    paths.triangle = new Path()
      .move(points.bpTriangleTip)
      .line(points.bpTriangleEdge)
      .line(points.bpStart)
      .addClass('dashed')
  }

  /*
   * Annotations
   */

  // Cut list
  store.cutlist.removeCut('fabric')
  store.cutlist.addCut([
    { cut: 2, from: 'fabric' },
    { cut: 2, from: 'lining' },
  ])

  // Title
  macro('title', {
    at: points.title,
    nr: '2',
    title: 'back',
  })

  // Notches
  macro('sprinkle', {
    snippet: 'bnotch',
    on: ['shoulder', 'bpTriangleTip', 'backArmholePitch'],
  })

  // Grainline
  macro('grainline', {
    from: points.cbWaist,
    to: points.bpStart,
  })

  // Logo
  points.logo = new Point(points.armhole.x * 0.7, points.dartTip.y)
  snippets.logo = new Snippet('logo', points.logo)

  // Dimensions
  macro('hd', {
    id: 'wFold',
    from: points.bpBottom,
    to: points.bpStart,
    y: points.bpBottom.y + 15 + sa,
  })
  macro('hd', {
    id: 'wCbWaistToWaistDartInner',
    from: points.cbWaist,
    to: points.dartLeft,
    y: points.cbWaist.y + 15 + sa,
  })
  macro('hd', {
    id: 'wWaistDart',
    from: points.dartLeft,
    to: points.dartRight,
    y: points.cbWaist.y + 15 + sa,
  })
  macro('hd', {
    id: 'wWaistDartOuterToWaistSide',
    from: points.dartRight,
    to: points.waist,
    y: points.cbWaist.y + 15 + sa,
  })
  macro('hd', {
    id: 'hTriangle',
    from: points.cbWaist,
    to: points.waist,
    y: points.cbWaist.y + 30 + sa,
  })
  macro('hd', {
    id: 'wWaist',
    from: points.bpBottom,
    to: points.waist,
    y: points.cbWaist.y + 45 + sa,
  })
  macro('vd', {
    id: 'hWaistToArmhole',
    from: points.waist,
    to: points.armhole,
    x: points.armhole.x + 15 + sa,
  })
  macro('vd', {
    id: 'hArmholeToArmpit',
    from: points.armhole,
    to: points.armholePitch,
    x: points.armhole.x + 15 + sa,
  })
  macro('vd', {
    id: 'hArmpitToShoulder',
    from: points.armhole,
    to: points.s3ArmholeSplit,
    x: points.armhole.x + 30 + sa,
  })
  macro('vd', {
    id: 'hWaistToShoulder',
    from: points.waist,
    to: points.s3ArmholeSplit,
    x: points.armhole.x + 45 + sa,
  })
  macro('vd', {
    id: 'hDart',
    from: points.dartRight,
    to: points.dartTip,
    x: points.dartRight.x + 15,
  })
  macro('vd', {
    id: 'hWaistToFoldTop',
    from: points.bpBottom,
    to: points.bpTop,
    x: points.bpTop.x - 15 - sa,
  })
  macro('vd', {
    id: 'hFoldTopToNeckOpening',
    from: points.bpTop,
    to: points.cbNeck,
    x: points.bpTop.x - 15 - sa,
  })
  macro('vd', {
    id: 'hFull',
    from: points.bpBottom,
    to: points.s3CollarSplit,
    x: points.bpTop.x - 30 - sa,
  })
  macro('vd', {
    id: 'hTriangle',
    from: points.bpStart,
    to: points.bpTriangleTip,
    x: points.bpTriangleEdge.x + 15,
  })
  macro('hd', {
    id: 'wTriangle',
    from: points.bpStart,
    to: points.bpTriangleEdge,
    y: points.bpTriangleEdge.y + 15,
  })
  macro('hd', {
    id: 'wNeckOpening',
    from: points.cbNeck,
    to: points.s3CollarSplit,
    y: points.s3CollarSplit.y - 15 - sa,
  })
  macro('hd', {
    id: 'wCbToArmholePitch',
    from: points.cbNeck,
    to: points.armholePitch,
    y: points.s3CollarSplit.y - 30 - sa,
  })
  macro('hd', {
    id: 'wCbToShoulder',
    from: points.cbNeck,
    to: points.shoulder,
    y: points.s3CollarSplit.y - 45 - sa,
  })
  macro('hd', {
    id: 'wFull',
    from: points.cbNeck,
    to: points.armhole,
    y: points.s3CollarSplit.y - 60 - sa,
  })

  return part
}

export const back = {
  name: 'carlton.back',
  from: bentBack,
  hide: hidePresets.HIDE_TREE,
  measurements: ['chest', 'hpsToWaistBack'],
  options: {
    backPleat: 0.048,
    beltWidth: { pct: 15, min: 10, max: 20, menu: 'style' },
    waistEase: { pct: 14, min: 8, max: 25, ...pctBasedOn('waist'), menu: 'fit' },
    seatEase: { pct: 14, min: 8, max: 25, ...pctBasedOn('seat'), menu: 'fit' },
  },
  draft: draftCarltonBack,
}
