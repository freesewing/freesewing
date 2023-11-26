import { front } from './front.mjs'

function draftBack({
  measurements,
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  sa,
  complete,
  macro,
  part,
  store,
  units,
  utils,
  scale,
}) {
  // Todo:
  // - Make needed changes to make this a back piece.
  // - Form the back bib/straps (lines).
  // - Add curves to bib/straps.

  /*
   * Helper method to determine if the cross seam is too short or too long, adapted from Titan (Joost De Cock).
   */
  const crossSeamDelta = () =>
    new Path()
      .move(points.cfWaist)
      .line(points.crossSeamCurveStart)
      .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
      .length() - crossSeamBack

  const crossSeamBack = measurements.crossSeamBack * (1 + options.crotchEase)

  points.cfWaist = new Point(
    -measurements.waistBackArc * (1 + options.waistEase) * (1 + options.waistBalance),
    0
  )
  points.cfSeat = new Point(
    -measurements.seatBackArc * (1 + options.seatEase) * (1 + options.seatBalance),
    measurements.waistToSeat
  )
  points.crossSeamCurveStart = points.cfWaist.shiftFractionTowards(
    points.cfSeat,
    options.crossSeamCurveStart
  )
  points.fork = new Point(
    (-measurements.upperLeg / 2) *
      options.thighShape *
      (1 + options.crotchEase + options.crotchForkBalance),
    measurements.waistToUpperLeg * (1 + options.crotchDrop)
  )

  let minX = points.crossSeamCurveStart.x
  let maxX = -2 * crossSeamBack
  let delta

  // This is a binary search, so 20 iterations should get us within 1 part in 1 million error.
  for (let i = 0; i < 1; i++) {
    const midX = (minX + maxX) / 2
    //    points.fork.x = midX

    // With the fork moved, recalculate the scoop.
    points.crossSeamCurveMax = utils.beamsIntersect(
      points.cfWaist,
      points.cfSeat,
      points.fork,
      points.fork.shift(0, 1337)
    )
    points.crossSeamCurveCp1 = points.crossSeamCurveStart.shiftFractionTowards(
      points.crossSeamCurveMax,
      options.crossSeamCurveBend
    )
    points.crossSeamCurveCp2 = points.fork
      .shiftFractionTowards(points.crossSeamCurveMax, options.crossSeamCurveBend)
      .rotate(options.crossSeamCurveAngle, points.fork)

    delta = crossSeamDelta()

    delta < 0 ? (minX = midX) : (maxX = midX)
  }

  // If this checks true, it means that the crotch fork can't be placed with the given measurements and options.

  const legLength = (measurements.waistToFloor - points.fork.y) * options.legLength
  const thighAnkleRatio = Math.min(1, options.legLength / options.anklePosition)
  const legWidth =
    measurements.upperLeg * (1 - thighAnkleRatio) + measurements.ankle * thighAnkleRatio
  points.inseamHem = new Point(
    ((-(1 + options.legHemEase) * legWidth) / 2) * (1 + options.legBalance),
    points.fork.y + legLength
  )
  points.outseamHem = new Point(0, points.fork.y + legLength)
  points.waist = new Point(0, 0)

  points.forkCp2 = points.crossSeamCurveCp2.rotate(-90, points.fork)
  points.inseamHemCp1 = points.inseamHem.shiftFractionTowards(points.forkCp2, 2 / 3)

  paths.seam = new Path()
    .move(points.cfWaist)
    .line(points.crossSeamCurveStart)
    .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
    .curve(points.forkCp2, points.inseamHemCp1, points.inseamHem)
    .line(points.outseamHem)
    .line(points.waist)
    .line(points.cfWaist)
    .close()
    .attr('class', 'fabric')

  if (sa) {
    paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }

  if (complete)
    paths.hint = new Path()
      .move(points.crossSeamCurveStart)
      .line(points.crossSeamCurveMax)
      .line(points.fork)
      .addClass('note help')

  macro('hd', {
    id: 'wWaist',
    from: points.cfWaist,
    to: points.waist,
    y: points.waist.y - (sa + 15),
  })
  macro('hd', {
    id: 'wWaistToCrossSeamCurveStart',
    from: points.crossSeamCurveStart,
    to: points.cfWaist,
    y: points.waist.y - (sa + 15),
    noStartMarker: true,
    noEndMarker: true,
  })
  macro('hd', {
    id: 'wCrossSeamCurveStartToCrossCurveSeamMax',
    from: points.crossSeamCurveMax,
    to: points.crossSeamCurveStart,
    y: points.waist.y - (sa + 15),
    noStartMarker: true,
    noEndMarker: true,
  })
  macro('hd', {
    id: 'wCrossSeamCurveMaxToFork',
    from: points.fork,
    to: points.crossSeamCurveMax,
    y: points.waist.y - (sa + 15),
    noStartMarker: true,
    noEndMarker: true,
  })
  macro('hd', {
    id: 'wCrossSeamCurveStartToFork',
    from: points.fork,
    to: points.crossSeamCurveStart,
    y: points.waist.y - (sa + 30),
  })
  macro('hd', {
    id: 'wWidthAtFork',
    from: points.fork,
    to: points.waist,
    y: points.waist.y - (sa + 45),
  })
  macro('hd', {
    id: 'wHem',
    from: points.inseamHem,
    to: points.outseamHem,
    y: points.outseamHem.y + (sa + 15),
  })
  macro('hd', {
    id: 'wForkToHem',
    from: points.fork,
    to: points.inseamHem,
    y: points.inseamHem.y + (sa + 15),
  })
  macro('vd', {
    id: 'vOutseam',
    from: points.waist,
    to: points.outseamHem,
    x: points.waist.x + (sa + 15),
  })
  macro('vd', {
    id: 'vWaistToCrossSeamCurveStart',
    from: points.cfWaist,
    to: points.crossSeamCurveStart,
    x: points.fork.x - (sa + 15),
  })
  macro('vd', {
    id: 'vCrossSeamCurveStartToFork',
    from: points.crossSeamCurveStart,
    to: points.fork,
    x: points.fork.x - (sa + 15),
  })
  macro('vd', {
    id: 'vWaistToFork',
    from: points.cfWaist,
    to: points.fork,
    x: points.fork.x - (sa + 30),
  })
  macro('vd', {
    id: 'vForkToHem',
    from: points.fork,
    to: points.inseamHem,
    x: points.fork.x - (sa + 30),
  })

  points.grainlineTop = points.waist.shiftFractionTowards(points.cfWaist, 0.05)
  points.grainlineBottom = new Point(points.grainlineTop.x, points.outseamHem.y)
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  store.cutlist.addCut({ cut: 2, from: 'fabric' })

  points.title = points.cfWaist.shiftFractionTowards(points.outseamHem, 0.5)
  macro('title', { at: points.title, nr: 2, title: 'onyx:back' })
  points.logo = points.title.translate(-scale * 20, scale * 35)
  snippets.logo = new Snippet('logo', points.logo)
  points.scalebox = points.title.translate(0, -scale * 100)
  macro('scalebox', { at: points.scalebox })

  return part
}

export const back = {
  name: 'back',
  after: front,
  draft: draftBack,
  options: {
    // Where the back bib is located. 0% refers to the waist, while 100% refers to the HPS.
    backBibPosition: { pct: 40, min: 10, max: 90, menu: 'style' },
    // How long the hexagon where the two sides of the back bib cross over is, as a percent of hpsToWaist.
    backBibLength: { pct: 20, min: 10, max: 40, menu: 'style' },
    // How wide the hexagon of the back bib is, as a percent of the waist measurement.
    backBibWidth: { pct: 40, min: 20, max: 80, menu: 'style' },
    // How much longer to make the straps, as a percent of the distance between the two bibs.
    strapBonusLength: { pct: 60, min: 0, max: 120, menu: 'style' },
  },
}
