import { pluginBundle } from '@freesewing/plugin-bundle'

function draftBack({
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  paperless,
  measurements,
  store,
  macro,
  part,
}) {
  const waist = measurements.waist / 4
  const sizeFactor = measurements.waist / 510
  const ease = options.ease

  store.set('waist', waist)
  store.set('ease', ease)
  store.set('sizeFactor', sizeFactor)

  points.p0 = new Point(0, 0)
  points.p0Cp1 = points.p0.shift(180, 66.91517912470589 * (ease + 1) * sizeFactor)
  points.p1 = points.p0.shift(149.4969649618097, 114.87166082661528 * (ease + 1) * sizeFactor)
  points.p1Cp1 = points.p1.shift(278.9548159482757, 137.90010759149453 * (ease + 1) * sizeFactor)
  points.p1Cp2 = points.p1.shift(336.4763168951959, 68.61447469210127 * (ease + 1) * sizeFactor)
  points.p2 = points.p0.shift(218.49950238029894, 163.05015542953512 * (ease + 1) * sizeFactor)
  points.p2Cp2 = points.p2.shift(2.0575442111337274, 29.562919686247152 * (ease + 1) * sizeFactor)
  points.p3 = points.p0.shift(246.77020008250858, 323.5264286434397 * (ease + 1) * sizeFactor)
  points.p3Cp1 = points.p3.shift(335.4445026359432, 31.324216272472654 * (ease + 1) * sizeFactor)
  points.p3Cp1 = points.p3.shift(0, 15 * (ease + 1) * sizeFactor)
  points.p4 = points.p0.shift(258.29473769456416, 373.7460389711983 * (ease + 1) * sizeFactor)
  points.p4Cp1 = points.p4.shift(294.805946128575, 27.347838639268335 * (ease + 1) * sizeFactor)
  points.p4Cp2 = points.p4.shift(114.81188629380082, 38.21149693481505 * (ease + 1) * sizeFactor)
  points.p5 = points.p0.shift(266.33816548102595, 416.91257944059936 * (ease + 1) * sizeFactor)
  points.p5Cp2 = points.p5.shift(180, 34.60436510741867 * (ease + 1) * sizeFactor)
  points.p6 = points.p5.shift(270, measurements.waist * options.snapPlacket * 2)
  points.p7 = new Point(0, points.p6.y)

  store.set('sideseam', points.p2.dist(points.p3))

  paths.armhole = new Path().move(points.p1).curve(points.p1Cp1, points.p2Cp2, points.p2).hide()

  store.set('armhole', paths.armhole.length() * 0.85)

  points.shoulder = paths.armhole.shiftFractionAlong(0.15)
  points.snapPlacketOut = points.p5.shift(270, measurements.waist * options.snapPlacket)
  points.snapPlacketIn = new Point(0, points.snapPlacketOut.y)

  paths.seamSA = new Path()
    .move(points.p0)
    .curve(points.p0Cp1, points.p1Cp2, points.p1)
    .curve(points.p1Cp1, points.p2Cp2, points.p2)
    .line(points.p3)
    .curve(points.p3Cp1, points.p4Cp2, points.p4)
    .curve(points.p4Cp1, points.p5Cp2, points.p5)
    .line(points.p5)
    .line(points.p6)
    .line(points.p7)
    .hide()

  paths.seam = paths.seamSA.clone().line(points.p0).close().unhide()

  store.set(
    'BackNeckOpening',
    new Path().move(points.p0).curve(points.p0Cp1, points.p1Cp2, points.p1).length() * 2
  )
  store.set(
    'BackLegOpening',
    new Path()
      .move(points.p3)
      .curve(points.p3Cp1, points.p4Cp2, points.p4)
      .curve(points.p4Cp1, points.p5Cp2, points.p5)
      .length()
  )
  store.set('SnapPlacketWidth', points.p6.dist(points.p7))

  // Complete?
  if (complete) {
    points.logo = points.p0.shiftFractionTowards(points.p3, 0.5)
    snippets.logo = new Snippet('logo', points.logo)

    macro('title', {
      at: points.logo.shift(-90, waist / 1.7).shift(-180, waist / 4),
      nr: 1,
      title: 'back',
    })

    paths.snapPlacket = new Path()
      .move(points.snapPlacketOut)
      .line(points.snapPlacketIn)
      .addClass('dashed')

    points.snap = points.p6
      .shiftFractionTowards(points.p7, 0.333)
      .shift(90, (measurements.waist * options.snapPlacket) / 2)
    snippets.snap = new Snippet('snap-stud', points.snap)

    if (sa) {
      paths.sa = paths.seamSA.offset(sa).close().trim().attr('class', 'fabric sa')
    }

    snippets.shoulder = new Snippet('notch', points.shoulder)

    macro('cutonfold', {
      from: new Point(0, points.p5.y),
      to: points.p0,
    })
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.p1,
      to: points.p0,
      y: points.p1.y - sa - 15,
    })
    macro('hd', {
      from: points.p6,
      to: points.p7,
      y: points.p7.y + sa + 15,
    })
    macro('vd', {
      from: points.p1,
      to: points.p0,
      x: points.p0.x + 15,
    })
    macro('vd', {
      from: points.p2,
      to: points.p1,
      x: points.p2.x - sa - 15,
    })
    macro('vd', {
      from: points.p3,
      to: points.p2,
      x: points.p2.x - sa - 15,
    })
    macro('vd', {
      from: points.p5,
      to: points.p3,
      x: points.p3.x - sa - 15,
    })
    macro('vd', {
      from: points.snapPlacketOut,
      to: points.p5,
      x: points.p5.x - sa - 15,
    })
    macro('vd', {
      from: points.p6,
      to: points.snapPlacketOut,
      x: points.p5.x - sa - 15,
    })
    macro('vd', {
      from: points.p0,
      to: points.p7,
      x: points.p7.x + 15,
    })
  }

  store.cutlist.addCut({ material: 'fabric', cut: 1 })

  return part
}

export const back = {
  name: 'back',
  measurements: ['waist'],
  options: {
    ease: { pct: 14, min: 0, max: 30, menu: 'fit' },
    snapPlacket: { pct: 5, min: 0, max: 30, menu: 'advanced' },
  },
  plugins: [pluginBundle, pluginCutlist],
  draft: draftBack,
}
