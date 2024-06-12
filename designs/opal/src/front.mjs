function draftFront({
  measurements,
  options,
  absoluteOptions,
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
  utils,
  scale,
}) {
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

  // Move the waist points from the natural waist to where they should be for the garment.
  points.cfWaist = points.cfWaist.shiftFractionTowards(points.cfSeat, -options.waistPosition)
  points.waist.y = points.cfWaist.y

  // Draft the points for the slash pocket.
  const waistDist = points.waist.dist(points.cfWaist)
  points.slashTop = points.waist.shiftTowards(
    points.cfWaist,
    waistDist * options.pocketSlashOpeningWidth
  )
  points.slashSide = points.waist.shiftTowards(
    points.outseamHem,
    waistDist * options.pocketSlashOpeningHeight
  )
  // and draft the points for the pocket outline.
  points.slashOutlineTopOutside = points.waist
  points.slashOutlineTopInside = points.waist.shiftTowards(
    points.cfWaist,
    waistDist * options.pocketSlashWidth
  )
  points.slashOutlineBottomOutside = points.waist.shiftTowards(
    points.outseamHem,
    waistDist * options.pocketSlashHeight
  )
  points.slashOutlineBottomInside = new Point(
    points.slashOutlineTopInside.x,
    points.slashOutlineBottomOutside.y
  )

  // Draft control points for curves.
  points.forkCp2 = points.crossSeamCurveCp2.rotate(-90, points.fork)
  points.inseamHemCp1 = points.inseamHem.shiftFractionTowards(points.forkCp2, 2 / 3)
  points.slashMax = new Point(points.slashTop.x, points.slashSide.y)
  points.slashSideCp2 = points.slashSide.shiftFractionTowards(
    points.slashMax,
    options.pocketSlashOpeningCurve
  )
  points.slashTopCp1 = points.slashTop.shiftFractionTowards(
    points.slashMax,
    options.pocketSlashOpeningCurve
  )

  store.set('waistYCoordinate', points.cfWaist.y) // Needed for the back.
  store.set('cfWaist', points.cfWaist) // Needed for the bib.
  store.set('waist', points.waist) // Needed for the bib.
  store.set('waistDist', waistDist) // Needed for the slash pockets and the waistband.

  if (options.pocketSlash)
    paths.slashPocketOutline = new Path()
      .move(points.slashOutlineTopOutside)
      .line(points.slashOutlineTopInside)
      .line(points.slashOutlineBottomInside)
      .line(points.slashOutlineBottomOutside)
      .line(points.slashOutlineTopOutside)
      .close()
      .addClass('lining dashed')

  options.pocketSlash
    ? (paths.seam = new Path()
        .move(points.outseamHem)
        .line(points.slashSide)
        .curve(points.slashSideCp2, points.slashTopCp1, points.slashTop)
        .line(points.cfWaist)
        .line(points.crossSeamCurveStart)
        .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
        .curve(points.forkCp2, points.inseamHemCp1, points.inseamHem)
        .addClass('fabric'))
    : (paths.seam = new Path()
        .move(points.outseamHem)
        .line(points.waist)
        .line(points.cfWaist)
        .line(points.crossSeamCurveStart)
        .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
        .curve(points.forkCp2, points.inseamHemCp1, points.inseamHem)
        .addClass('fabric'))

  paths.hem = new Path().move(points.inseamHem).line(points.outseamHem).addClass('fabric')

  if (sa) {
    points.inseamHemAllowance = points.inseamHem.translate(-sa, absoluteOptions.legHemAllowance)
    points.outseamHemAllowance = points.outseamHem.translate(sa, absoluteOptions.legHemAllowance)
    paths.sa = paths.seam
      .offset(sa)
      .line(points.inseamHemAllowance)
      .line(points.outseamHemAllowance)
      .close()
      .addClass('fabric sa')
  }

  if (complete)
    paths.hint = new Path()
      .move(points.crossSeamCurveStart)
      .line(points.crossSeamCurveMax)
      .line(points.fork)
      .addClass('note help')

  if (options.pocketSlash)
    macro('hd', {
      id: 'wWaistSlash',
      from: points.cfWaist,
      to: points.slashTop,
      y: points.waist.y - (sa + 15),
    })
  if (options.pocketSlash)
    macro('hd', {
      id: 'wWaistExSlash',
      from: points.slashTop,
      to: points.waist,
      y: points.waist.y - (sa + 15),
    })
  macro('hd', {
    id: 'wWaistTotal',
    from: points.cfWaist,
    to: points.waist,
    y: points.waist.y - (sa + 30),
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
  if (options.pocketSlash)
    macro('vd', {
      id: 'vSlashOpening',
      from: points.waist,
      to: points.slashSide,
      x: points.waist.x + (sa + 15),
    })
  if (options.pocketSlash)
    macro('vd', {
      id: 'vOutseam',
      from: points.slashSide,
      to: points.outseamHem,
      x: points.waist.x + (sa + 15),
    })
  macro('vd', {
    id: 'vTotal',
    from: points.waist,
    to: points.outseamHem,
    x: points.waist.x + (sa + 30),
  })
  macro('vd', {
    id: 'vLegHemAllowance',
    from: points.outseamHem,
    to: sa ? points.outseamHemAllowance : points.outseamHem,
    x: points.waist.x + (sa + 15),
    noStartMarker: true,
    noEndMarker: true,
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
  points.grainlineTop = points.slashSide.translate(-waistDist * 0.05, 0)
  points.grainlineBottom = new Point(points.grainlineTop.x, points.outseamHem.y)
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  store.cutlist.addCut({ cut: 2, from: 'fabric' })

  points.title = points.cfWaist.shiftFractionTowards(points.outseamHem, 0.5)
  macro('title', { at: points.title, nr: 1, title: 'opal:front' })
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
    'hpsToWaistBack',
    'waistToUpperLeg',
    'waistToArmpit',
    'waistToFloor',
    'inseam',
    'ankle',
  ],
  options: {
    // How wide to make the hem allowance for everywhere except the legs. The default (150%) is set to make a double-fold hem equal in width to the seam allowance, where the first fold is half the width of the second fold.
    hemAllowance: {
      pct: 150,
      min: 0,
      max: 400,
      toAbs: (pct, settings, mergedOptions) =>
        settings.sa ? settings.sa : 0 * mergedOptions.hemAllowance,
      menu: 'construction',
    },
    // Sets the hem allowance for the legs. Very large values are used for cuffs. If making a regular hem, setting this equal to hemAllowance can work well.
    legHemAllowance: {
      pct: 150,
      min: 0,
      max: 1600,
      toAbs: (pct, settings, mergedOptions) => settings.sa * mergedOptions.legHemAllowance,
      menu: 'construction',
    },
    waistEase: { pct: 15, min: -30, max: 100, menu: 'fit' },
    // Moves fabric towards the back piece for positive values, and towards the front piece for negative values.
    waistBalance: { pct: 0, min: -15, max: 15, menu: 'fit' },
    seatEase: { pct: 10, min: -30, max: 100, menu: 'fit' },
    seatBalance: { pct: 0, min: -15, max: 15, menu: 'fit' },
    // Ratio between the circumference around both legs individually (2 * upperLeg) vs. around both legs together (like 'seat', but measured at the fork). Larger for deeper and narrower thighs.
    thighShape: { pct: 122, min: 116, max: 135, menu: 'advanced' },
    // How much ease to have where the leg ends, wherever that may be.
    legHemEase: { pct: 20, min: -30, max: 200, menu: 'fit' },
    // How long the legs on the garment are, measured from the waist to the floor: 40-70% for shorts, ~93% for ankle-length legs, 100% for legs that touch the floor.
    legLength: { pct: 30, min: 10, max: 120, menu: 'style' },
    crossSeamCurveStart: { pct: 85, min: 60, max: 100, menu: 'advanced' },
    crossSeamCurveBend: { pct: 65, min: 45, max: 85, menu: 'advanced' },
    crossSeamCurveAngle: { deg: 12, min: 0, max: 45, menu: 'advanced' },
    crotchSeamCurveStart: { pct: 80, min: 60, max: 95, menu: 'advanced' },
    crotchSeamCurveBend: { pct: 80, min: 45, max: 100, menu: 'advanced' },
    crotchSeamCurveAngle: { deg: 25, min: 0, max: 45, menu: 'advanced' },
    // Positive values move more of the fabric to the back piece, negative values to the front piece.
    crotchForkBalance: { pct: 10, min: -20, max: 40, menu: 'fit' },
    // Horizontal ease at the crotch fork.
    crotchEase: { pct: 10, min: -30, max: 100, menu: 'fit' },
    // Vertical ease at the crotch fork.
    crotchDrop: { pct: 5, min: -10, max: 80, menu: 'fit' },
    // Positive values move more of the fabric to the back piece, negative values to the front piece.
    legBalance: { pct: 0, min: -30, max: 30, menu: 'fit' },
    // Where to put the waistband on the front of the overalls. 0 is at the natural waist and -100 is at the seat.
    waistPosition: { pct: 0, min: -50, max: 50, menu: 'style' },
    anklePosition: 0.91,
    // How far up past the waist the outseam extends, and thus how far up the back bib starts and the front bib starts to taper.
    outseamHeight: { pct: 5, min: 0, max: 20, menu: 'style' },
    // How wide to make the waistband between the bib and the front piece.
    waistbandWidth: {
      pct: 10,
      min: 0,
      max: 20,
      toAbs: (pct, settings, mergedOptions) =>
        (settings.measurements.waist / 4) * mergedOptions.waistbandWidth,
      menu: 'construction',
    },
    waistbandLayers: { count: 3, min: 0, max: 8, menu: 'construction' },

    // All slash pocket percentages are with respect to the length of the top of the front piece.
    pocketSlash: { bool: true, menu: 'style' },
    // Dimensions of the pocket opening, as a percentage of the distance from.
    pocketSlashOpeningWidth: {
      pct: 30,
      min: 4,
      max: 60,
      menu: (settings, mergedOptions) => (mergedOptions.pocketSlash ? 'style' : false),
    },

    pocketSlashOpeningHeight: {
      pct: 60,
      min: 4,
      max: 100,
      menu: (settings, mergedOptions) => (mergedOptions.pocketSlash ? 'style' : false),
    },

    // Shape of the pocket opening. 0 (default) is a straight diagonal line, while positive values make a curve.
    pocketSlashOpeningCurve: {
      pct: 0,
      min: 0,
      max: 100,
      menu: (settings, mergedOptions) => (mergedOptions.pocketSlash ? 'style' : false),
    },

    // Dimensions of the pocket itself, as a percentage of the waistFront.
    pocketSlashWidth: {
      pct: 70,
      min: 20,
      max: 100,
      menu: (settings, mergedOptions) => (mergedOptions.pocketSlash ? 'style' : false),
    },

    pocketSlashHeight: {
      pct: 90,
      min: 20,
      max: 200,
      menu: (settings, mergedOptions) => (mergedOptions.pocketSlash ? 'style' : false),
    },

    // How much past the pocket entrance to extend the pocket shield.
    pocketSlashShieldOverlap: {
      pct: 30,
      min: 0,
      max: 60,
      menu: (settings, mergedOptions) => (mergedOptions.pocketSlash ? 'style' : false),
    },
  },
  draft: draftFront,
}
