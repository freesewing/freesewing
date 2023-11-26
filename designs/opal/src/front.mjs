function draftFront({
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
  // - (DONE) Derive points from measurements.
  // - (DONE) Add options.
  // - (DONE) Derive points from measurements + options.
  // - (DONE) Scoop the crotch.
  // - (DONE) Add logo and dimension box.
  // - (DONE) Add cut instructions (2, mirrored, from main fabric)
  // - (DONE) Add dimensions.
  // - Onto the back piece.
  // - Onto the bib.
  // - Onto the pockets.

  points.cfWaist = new Point(
    -measurements.waistFrontArc * (1 + options.waistEase) * (1 - options.waistBalance),
    0
  )
  points.cfSeat = new Point(
    -measurements.seatFrontArc * (1 + options.seatEase) * (1 - options.seatBalance),
    measurements.waistToSeat
  )
  points.crossSeamCurveStart = points.cfWaist.shiftFractionTowards(
    points.cfSeat,
    options.crotchSeamCurveStart
  )
  points.fork = new Point(
    (-measurements.upperLeg / 2) *
      options.thighShape *
      (1 + options.crotchEase - options.crotchForkBalance),
    measurements.waistToUpperLeg * (1 + options.crotchDrop)
  )

  points.crossSeamCurveMax = utils.beamsIntersect(
    points.cfWaist,
    points.cfSeat,
    points.fork,
    points.fork.shift(0, 1337)
  )
  points.crossSeamCurveCp1 = points.crossSeamCurveStart.shiftFractionTowards(
    points.crossSeamCurveMax,
    options.crotchSeamCurveBend
  )
  points.crossSeamCurveCp2 = points.fork
    .shiftFractionTowards(points.crossSeamCurveMax, options.crotchSeamCurveBend)
    .rotate(options.crotchSeamCurveAngle, points.fork)

  store.set('forkYCoordinate', points.fork.y)

  const legLength = (measurements.waistToFloor - points.fork.y) * options.legLength
  const thighAnkleRatio = Math.min(1, options.legLength / options.anklePosition)
  const legWidth =
    measurements.upperLeg * (1 - thighAnkleRatio) + measurements.ankle * thighAnkleRatio
  points.inseamHem = new Point(
    ((-(1 + options.legHemEase) * legWidth) / 2) * (1 - options.legBalance),
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
  macro('title', { at: points.title, nr: 1, title: 'onyx:front' })
  points.logo = points.title.translate(-scale * 20, scale * 35)
  snippets.logo = new Snippet('logo', points.logo)
  points.scalebox = points.title.translate(0, -scale * 100)
  macro('scalebox', { at: points.scalebox })

  return part
}

export const front = {
  name: 'front',
  measurements: [
    'waist',
    'waistBack',
    'seat',
    'seatBack',
    'waistToSeat',
    'upperLeg',
    'hpsToWaistFront',
    'waistToUpperLeg',
    'waistToArmpit',
    'waistToFloor',
    'inseam',
    'ankle',
  ],
  options: {
    waistEase: { pct: 15, min: -30, max: 100, menu: 'fit' },
    // Moves fabric towards the back piece for positive values, and towards the front piece for negative values.
    waistBalance: { pct: 0, min: -15, max: 15, menu: 'fit' },
    // Moves fabric towards the back piece for positive values, and towards the front piece for negative values.
    seatEase: { pct: 10, min: -30, max: 100, menu: 'fit' },
    // Ratio between the circumference around both legs individually (2 * upperLeg) vs. around both legs together (like 'seat', but measured at the fork). Larger for deeper and narrower thighs.
    seatBalance: { pct: 0, min: -15, max: 15, menu: 'fit' },
    thighShape: { pct: 122, min: 116, max: 135, menu: 'advanced' },
    // How much ease to have where the leg ends, wherever that may be.
    legHemEase: { pct: 20, min: -30, max: 200, menu: 'fit' },
    // How long the legs on the garment are, measured from the waist to the floor: 40-70% for shorts, ~93% for ankle-length legs, 100% for legs that touch the floor.
    legLength: { pct: 20, min: 10, max: 120, menu: 'style' },
    crossSeamCurveStart: { pct: 85, min: 60, max: 100, menu: 'advanced' },
    crossSeamCurveBend: { pct: 65, min: 45, max: 85, menu: 'advanced' },
    crossSeamCurveAngle: { deg: 12, min: 0, max: 45, menu: 'advanced' },
    crotchSeamCurveStart: { pct: 80, min: 60, max: 95, menu: 'advanced' },
    crotchSeamCurveBend: { pct: 80, min: 45, max: 100, menu: 'advanced' },
    crotchSeamCurveAngle: { deg: 25, min: 0, max: 45, menu: 'advanced' },
    // Positive values move more of the fabric to the back piece, negative values to the front piece.
    crotchForkBalance: { pct: 10, min: -20, max: 40, menu: 'advanced' },
    // Horizontal ease at the crotch fork.
    crotchEase: { pct: 10, min: -30, max: 100, menu: 'fit' },
    // Vertical ease at the crotch fork.
    crotchDrop: { pct: 5, min: -10, max: 80, menu: 'fit' },
    // Positive values move more of the fabric to the back piece, negative values to the front piece.
    legBalance: { pct: 0, min: -30, max: 30, menu: 'fit' },
    anklePosition: 0.91,
  },
  draft: draftFront,
}
