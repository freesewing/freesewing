import { bib } from './bib.mjs'

function draftBack({
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
  // The distance from the front waist, over the HPS, and back down to the back waist. This plus the cross seam gives the vertical trunk.
  const waistToWaist = measurements.hpsToWaistFront + measurements.hpsToWaistBack

  // First let's draft the bottoms.
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

  // Now let's draft the back bib.
  points.cfWaist.y = store.get('waistYCoordinate')
  points.waist.y = points.cfWaist.y - waistToWaist * options.outseamHeight
  const seatWaistInverseSlope = 1 / points.crossSeamCurveStart.slope(points.cfWaist)
  points.bibHexagonBottom = new Point(
    0,
    -measurements.hpsToWaistBack *
      (options.backBibHexagonVerticalPosition - (1 / 2) * options.backBibHexagonHeight)
  )
  points.bibHexagonBottom.x =
    points.cfWaist.x + (1 / 2) * points.bibHexagonBottom.y * seatWaistInverseSlope
  points.bibHexagonCenter = points.bibHexagonBottom.translate(
    0,
    +measurements.hpsToWaistBack * ((-1 / 2) * options.backBibHexagonHeight)
  )
  points.bibHexagonLowerInside = points.bibHexagonCenter.translate(
    (measurements.waist / 4) * options.backBibHexagonWidth,
    measurements.hpsToWaistBack * ((1 / 2) * options.backBibHexagonSideHeight)
  )
  points.bibHexagonUpperInside = points.bibHexagonCenter.translate(
    (measurements.waist / 4) * options.backBibHexagonWidth,
    measurements.hpsToWaistBack * ((-1 / 2) * options.backBibHexagonSideHeight)
  )
  points.bibHexagonTop = points.bibHexagonCenter.translate(
    0,
    +measurements.hpsToWaistBack * ((-1 / 2) * options.backBibHexagonHeight)
  )
  points.bibHexagonLowerOutside = points.bibHexagonCenter.translate(
    (-measurements.waist / 4) * options.backBibHexagonWidth,
    measurements.hpsToWaistBack * ((1 / 2) * options.backBibHexagonSideHeight)
  )
  points.bibHexagonUpperOutside = points.bibHexagonCenter.translate(
    (-measurements.waist / 4) * options.backBibHexagonWidth,
    measurements.hpsToWaistBack * ((-1 / 2) * options.backBibHexagonSideHeight)
  )

  // Next come the straps.
  const strapLength =
    (waistToWaist - store.get('bibFrontHeight') + points.bibHexagonTop.y) * options.strapLength
  const strapWidth = options.strapWidth * waistToWaist
  points.strapTaperOutside = new Point(
    points.bibHexagonUpperOutside.x + measurements.waistBack * options.strapPosition,
    points.bibHexagonTop.y - options.strapTaperPosition * strapLength
  )
  points.strapTaperInside = points.strapTaperOutside.translate(strapWidth, 0)
  points.strapEndOutside = points.strapTaperOutside.translate(
    0,
    -strapLength * (1 - options.strapTaperPosition)
  )
  points.strapEndInside = points.strapEndOutside.translate(strapWidth, 0)

  // Finally, let's draft the control points for the curves.
  points.forkCp2 = points.crossSeamCurveCp2.rotate(-90, points.fork)
  points.inseamHemCp1 = points.inseamHem.shiftFractionTowards(points.forkCp2, 2 / 3)

  points.bibCurveMax = utils.beamsIntersect(
    points.waist,
    points.waist.shift(180 - options.backBibBaseAngle, 9001),
    points.bibHexagonLowerInside,
    points.bibHexagonUpperInside
  )
  // Avoids an ugly case if backBibBaseCurve would overshoot the hexagon and recurve.
  if (points.bibCurveMax.y < points.bibHexagonLowerInside.y)
    points.bibCurveMax.y = points.bibHexagonLowerInside.y
  points.waistCp2 = points.waist.shiftFractionTowards(points.bibCurveMax, options.backBibBaseCurve)
  points.bibHexagonLowerInsideCp1 = points.bibHexagonLowerInside.shiftFractionTowards(
    points.bibCurveMax,
    options.backBibBaseCurve
  )

  points.strapTaperCurveMax = utils.beamsIntersect(
    points.bibHexagonUpperInside,
    points.bibHexagonTop,
    points.strapTaperInside,
    points.strapEndInside
  )
  // Avoids an ugly case if the taper point is set too low.
  if (points.strapTaperInside.y > points.strapTaperCurveMax.y) {
    points.strapTaperInside.y = points.strapTaperCurveMax.y
    points.strapTaperOutside.y = points.strapTaperCurveMax.y
  }
  points.bibHexagonTopCp2 = points.bibHexagonTop.shiftFractionTowards(
    points.strapTaperCurveMax,
    options.strapTaperCurve
  )
  points.strapTaperInsideCp1 = points.strapTaperInside.shiftFractionTowards(
    points.strapTaperCurveMax,
    options.strapTaperCurve
  )
  points.strapTaperOutsideCp2 = points.strapTaperOutside.translate(
    0,
    (points.strapTaperOutside.dy(points.bibHexagonUpperOutside) * 1) / 2
  )
  points.bibHexagonUpperOutsideCp1 = points.bibHexagonUpperOutside.translate(
    0,
    (points.bibHexagonUpperOutside.dy(points.strapTaperOutside) * 1) / 6
  )

  points.cfBackMax = utils.beamsIntersect(
    points.bibHexagonBottom,
    points.bibHexagonTop,
    points.cfWaist,
    points.crossSeamCurveStart
  )
  points.bibHexagonBottomCp2 = points.bibHexagonBottom.shiftFractionTowards(points.cfBackMax, 2 / 3)
  points.cfWaistCp1 = points.cfWaist.shiftFractionTowards(points.cfBackMax, 2 / 3)

  // Draft points for the back pocket.
  const pocketMetric = -points.cfWaist.x
  points.backPocket = new Point(
    -pocketMetric * options.pocketBackPositionX,
    pocketMetric * options.pocketBackPositionY
  ).addText('opal:pocketBack', 'center')
  points.backPocketFrontTop = points.backPocket.translate(
    (pocketMetric * options.pocketBackWidth) / 2,
    (-pocketMetric * options.pocketBackHeight) / 2
  )
  points.backPocketBackTop = points.backPocketFrontTop.translate(
    -pocketMetric * options.pocketBackWidth,
    0
  )
  points.backPocketFrontBottom = points.backPocketFrontTop.translate(
    0,
    pocketMetric * options.pocketBackHeight
  )
  points.backPocketBackBottom = new Point(
    points.backPocketBackTop.x,
    points.backPocketFrontBottom.y
  )
  points.backPocketBackBottomP1 = points.backPocketBackBottom.shiftFractionTowards(
    points.backPocketBackTop,
    options.pocketBackCornerHeight
  )
  points.backPocketBackBottomP2 = points.backPocketBackBottom.shiftFractionTowards(
    points.backPocketFrontBottom,
    options.pocketBackCornerWidth / 2
  )
  points.backPocketFrontBottomP1 = points.backPocketFrontBottom.shiftFractionTowards(
    points.backPocketBackBottom,
    options.pocketBackCornerWidth / 2
  )
  points.backPocketFrontBottomP2 = points.backPocketFrontBottom.shiftFractionTowards(
    points.backPocketFrontTop,
    options.pocketBackCornerHeight
  )

  // Draft points for the carpenter pockets.
  points.carpenterPocketTopBack = points.backPocketFrontBottom.translate(
    pocketMetric * -options.pocketCarpenterAnchorX,
    pocketMetric * -options.pocketCarpenterAnchorY
  )
  points.carpenterPocketTopFront = points.carpenterPocketTopBack.translate(
    pocketMetric * options.pocketCarpenterAnchorWidth,
    0
  )
  points.carpenterPocketOutseamTop = new Point(
    0,
    points.carpenterPocketTopBack.y + pocketMetric * options.pocketCarpenterOpeningHeight
  )
  points.carpenterPocketOutseamBottom = new Point(
    0,
    points.carpenterPocketTopBack.y + pocketMetric * options.pocketCarpenterHeight
  )
  points.carpenterPocketBottomBack = new Point(
    points.carpenterPocketTopBack.x,
    points.carpenterPocketOutseamBottom.y
  )
  points.carpenterPocketExtraOutseamTop = points.carpenterPocketOutseamBottom.translate(
    0,
    pocketMetric * -options.pocketCarpenterExtraHeight
  )
  points.carpenterPocketExtraBackTop = new Point(
    points.carpenterPocketBottomBack.x,
    points.carpenterPocketExtraOutseamTop.y
  )
  points.carpenterPocketLabel = points.carpenterPocketTopBack
    .shiftFractionTowards(points.carpenterPocketOutseamBottom, 0.4)
    .addText('opal:pocketCarpenter', 'center')
  points.carpenterPocketExtraLabel = points.carpenterPocketBottomBack
    .shiftFractionTowards(points.carpenterPocketExtraOutseamTop, 1 / 2)
    .addText('opal:pocketCarpenterExtra', 'center')
  store.set('carpenterPocketLabel', points.carpenterPocketLabel)
  store.set('carpenterPocketExtraLabel', points.carpenterPocketExtraLabel)

  // Draft points for the hammer loop.
  points.hammerLoopTop = points.backPocketFrontBottomP1.shiftFractionTowards(
    points.backPocketFrontBottomP2,
    0.5
  )
  points.hammerLoopMax = points.hammerLoopTop.translate(
    pocketMetric * options.hammerLoopCornerX,
    pocketMetric * options.hammerLoopCornerY
  )
  points.hammerLoopOutseam = new Point(
    0,
    points.hammerLoopTop.y + pocketMetric * options.hammerLoopOutseam
  )
  points.hammerLoopCp1 = points.hammerLoopTop.shiftFractionTowards(
    points.hammerLoopMax,
    options.hammerLoopCurve
  )
  points.hammerLoopCp2 = points.hammerLoopOutseam.shiftFractionTowards(
    points.hammerLoopMax,
    options.hammerLoopCurve
  )
  const hammerLoopWidth = pocketMetric * options.hammerLoopWidth

  paths.centerSeam = new Path()
    .move(points.bibHexagonBottom)
    .curve(points.bibHexagonBottomCp2, points.cfWaistCp1, points.cfWaist)
    .line(points.crossSeamCurveStart)
    .curve(points.crossSeamCurveCp1, points.crossSeamCurveCp2, points.fork)
    .curve(points.forkCp2, points.inseamHemCp1, points.inseamHem)
    .addClass('fabric')
  paths.outseam = new Path().move(points.outseamHem).line(points.waist).addClass('fabric')
  paths.legHem = new Path().move(points.inseamHem).line(points.outseamHem).addClass('fabric')
  paths.hem = new Path()
    .move(points.waist)
    .curve(points.waistCp2, points.bibHexagonLowerInsideCp1, points.bibHexagonLowerInside)
    .line(points.bibHexagonUpperInside)
    .line(points.bibHexagonTop)
    .curve(points.bibHexagonTopCp2, points.strapTaperInsideCp1, points.strapTaperInside)
    .line(points.strapEndInside)
    .line(points.strapEndOutside)
    .line(points.strapTaperOutside)
    .curve(
      points.strapTaperOutsideCp2,
      points.bibHexagonUpperOutsideCp1,
      points.bibHexagonUpperOutside
    )
    .line(points.bibHexagonLowerOutside)
    .line(points.bibHexagonBottom)
    .addClass('fabric')

  if (options.pocketBack) {
    paths.pocketBackHem = new Path()
      .move(points.backPocketFrontTop)
      .line(points.backPocketBackTop)
      .addClass('fabric dashed')
    paths.pocketBackSeam = new Path()
      .move(points.backPocketBackTop)
      .line(points.backPocketBackBottomP1)
      .line(points.backPocketBackBottomP2)
      .line(points.backPocketFrontBottomP1)
      .line(points.backPocketFrontBottomP2)
      .line(points.backPocketFrontTop)
      .addClass('fabric dashed')
  }

  if (options.pocketCarpenter) {
    paths.pocketCarpenterHem = new Path()
      .move(points.carpenterPocketOutseamTop)
      .line(points.carpenterPocketTopFront)
      .addClass('fabric dashed')

    paths.pocketCarpenterSeam = new Path()
      .move(points.carpenterPocketTopFront)
      .line(points.carpenterPocketTopBack)
      .line(points.carpenterPocketBottomBack)
      .line(points.carpenterPocketOutseamBottom)
      .line(points.carpenterPocketOutseamTop)
      .addClass('fabric dashed')
  }

  if (options.pocketCarpenterExtra) {
    paths.pocketCarpenterExtraHem = new Path()
      .move(points.carpenterPocketExtraOutseamTop)
      .line(points.carpenterPocketExtraBackTop)
      .addClass('fabric dashed')
    paths.pocketCarpenterExtraSeam = new Path()
      .move(points.carpenterPocketExtraBackTop)
      .line(points.carpenterPocketBottomBack)
      .line(points.carpenterPocketOutseamBottom)
      .line(points.carpenterPocketExtraOutseamTop)
      .addClass('fabric dashed')
  }

  if (options.hammerLoop) {
    paths.hammerLoopCenter = new Path()
      .move(points.hammerLoopTop)
      .curve(points.hammerLoopCp1, points.hammerLoopCp2, points.hammerLoopOutseam)
      .addClass('various dotted')
      .addText('opal:hammerLoop', 'center')
    paths.hammerLoopLeft = paths.hammerLoopCenter
      .offset(hammerLoopWidth / 2)
      .addClass('fabric dashed')
    paths.hammerLoopRight = paths.hammerLoopCenter
      .offset(-hammerLoopWidth / 2)
      .addClass('fabric dashed')
    store.set('hammerLoopLength', paths.hammerLoopCenter.length())
    store.set('hammerLoopWidth', hammerLoopWidth)
  }

  if (sa) {
    points.inseamHemAllowance = points.inseamHem.translate(-sa, absoluteOptions.legHemAllowance)
    points.outseamHemAllowance = points.outseamHem.translate(sa, absoluteOptions.legHemAllowance)
    paths.sa = paths.outseam
      .offset(sa)
      .join(paths.hem.offset(absoluteOptions.hemAllowance).join(paths.centerSeam.offset(sa)))
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

  paths.bibLowerHexagonHint = new Path()
    .move(points.bibHexagonBottom)
    .line(points.bibHexagonLowerInside)
    .addClass('note help')

  paths.bibUpperHexagonHint = new Path()
    .move(points.bibHexagonTop)
    .line(points.bibHexagonUpperOutside)
    .addClass('note help')

  macro('hd', {
    id: 'wWaist',
    from: points.cfWaist,
    to: points.waist,
    y: points.cfWaist.y,
  })
  macro('hd', {
    id: 'wWaistToCrossSeamCurveStart',
    from: points.crossSeamCurveStart,
    to: points.cfWaist,
    y: points.cfWaist.y - (sa + 15),
    noStartMarker: true,
    noEndMarker: true,
  })
  macro('hd', {
    id: 'wCrossSeamCurveStartToCrossCurveSeamMax',
    from: points.crossSeamCurveMax,
    to: points.crossSeamCurveStart,
    y: points.cfWaist.y - (sa + 15),
    noStartMarker: true,
    noEndMarker: true,
  })
  macro('hd', {
    id: 'wCrossSeamCurveMaxToFork',
    from: points.fork,
    to: points.crossSeamCurveMax,
    y: points.cfWaist.y - (sa + 15),
    noStartMarker: true,
    noEndMarker: true,
  })
  macro('hd', {
    id: 'wCrossSeamCurveStartToFork',
    from: points.fork,
    to: points.crossSeamCurveStart,
    y: points.cfWaist.y - (sa + 30),
  })
  macro('hd', {
    id: 'wWidthAtFork',
    from: points.fork,
    to: points.waist,
    y: points.outseamHem.y + (sa + 30),
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
  macro('hd', {
    id: 'wStrapWidth',
    from: points.strapEndOutside,
    to: points.strapEndInside,
    y: points.strapEndOutside.y - (absoluteOptions.hemAllowance + 15),
  })
  macro('hd', {
    id: 'wStrapInsideToHexagonTop',
    from: points.strapEndInside,
    to: points.bibHexagonTop,
    y: points.strapEndOutside.y - (absoluteOptions.hemAllowance + 15),
  })
  macro('hd', {
    id: 'wStrapOutsideToHexagonTop',
    from: points.strapEndOutside,
    to: points.bibHexagonTop,
    y: points.strapEndOutside.y - (absoluteOptions.hemAllowance + 30),
  })
  macro('hd', {
    id: 'wHexagonWidth',
    from: points.bibHexagonLowerOutside,
    to: points.bibHexagonLowerInside,
    y: points.bibHexagonLowerOutside.y,
  })
  macro('hd', {
    id: 'wWidthHexagonBottomToOutseam',
    from: points.bibHexagonBottom,
    to: points.waist,
    y: points.bibHexagonBottom.y,
  })
  macro('hd', {
    id: 'wBackBibCurve',
    from: points.bibHexagonLowerInside,
    to: points.waist,
    y: points.bibHexagonLowerInside.y,
  })
  macro('vd', {
    id: 'vOutseam',
    from: points.waist,
    to: points.outseamHem,
    x: points.waist.x + (sa + 15),
  })
  macro('vd', {
    id: 'vHexagonLowerSideToOutseamTop',
    from: points.bibHexagonLowerInside,
    to: points.waist,
    x: points.waist.x + 0,
  })
  macro('vd', {
    id: 'vHexagonUpperSideToLowerSide',
    from: points.bibHexagonUpperInside,
    to: points.bibHexagonLowerInside,
    x: points.waist.x + 0,
  })
  macro('vd', {
    id: 'vHexagonTopToUpperSide',
    from: points.bibHexagonTop,
    to: points.bibHexagonUpperInside,
    x: points.waist.x + 0,
  })
  macro('vd', {
    id: 'vHexagonTopToOutseam',
    from: points.bibHexagonTop,
    to: points.waist,
    x: points.waist.x + 15,
  })
  macro('vd', {
    id: 'vStrapInsideTaperedHeight',
    from: points.strapTaperInside,
    to: points.bibHexagonTop,
    x: points.waist.x + 0,
  })
  macro('vd', {
    id: 'vStrapInsideStraightHeight',
    from: points.strapEndInside,
    to: points.strapTaperInside,
    x: points.waist.x + 0,
  })
  macro('vd', {
    id: 'vStrapInsideHeight',
    from: points.strapEndInside,
    to: points.bibHexagonTop,
    x: points.waist.x + 15,
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
    id: 'vHexagonBottomToFork',
    from: points.bibHexagonBottom,
    to: points.fork,
    x: points.fork.x - (sa + 30),
  })
  macro('vd', {
    id: 'vForkToHem',
    from: points.fork,
    to: points.inseamHem,
    x: points.fork.x - (sa + 30),
  })
  macro('vd', {
    id: 'vHexagonBottomToWaist',
    from: points.bibHexagonBottom,
    to: points.cfWaist,
    x: points.fork.x - (sa + 15),
  })
  macro('vd', {
    id: 'vHexagonLowerSideToHexagonBottom',
    from: points.bibHexagonLowerOutside,
    to: points.bibHexagonBottom,
    x: points.fork.x - (sa + 15),
  })
  macro('vd', {
    id: 'vHexagonUpperSideToHexagonLowerSide',
    from: points.bibHexagonUpperOutside,
    to: points.bibHexagonLowerOutside,
    x: points.fork.x - (sa + 15),
  })
  macro('vd', {
    id: 'vHexagonTopToHexagonUpperSide',
    from: points.bibHexagonTop,
    to: points.bibHexagonUpperOutside,
    x: points.fork.x - (sa + 15),
  })
  macro('vd', {
    id: 'vHexagonHeight',
    from: points.bibHexagonTop,
    to: points.bibHexagonBottom,
    x: points.fork.x - (sa + 30),
  })
  macro('vd', {
    id: 'vStrapStraightHeight',
    from: points.strapEndOutside,
    to: points.strapTaperOutside,
    x: points.fork.x - (sa + 15),
  })
  macro('vd', {
    id: 'vStrapTaperHeight',
    from: points.strapTaperOutside,
    to: points.bibHexagonTop,
    x: points.fork.x - (sa + 15),
  })
  macro('vd', {
    id: 'vStrapHeight',
    from: points.strapEndOutside,
    to: points.bibHexagonTop,
    x: points.fork.x - (sa + 30),
  })
  macro('vd', {
    id: 'vTotal',
    from: points.strapEndOutside,
    to: points.inseamHem,
    x: points.fork.x - (sa + 45),
  })

  points.grainlineTop = points.waist.shiftFractionTowards(points.cfWaist, 0.05)
  points.grainlineBottom = new Point(points.grainlineTop.x, points.outseamHem.y)
  macro('grainline', {
    from: points.grainlineTop,
    to: points.grainlineBottom,
  })

  store.cutlist.addCut({ cut: 2, from: 'fabric' })

  points.title = points.cfWaist
    .shiftFractionTowards(points.outseamHem, 0.5)
    .shiftFractionTowards(points.inseamHem, 0.5)
  macro('title', { at: points.title, nr: 2, title: 'opal:back' })
  points.logo = points.title.translate(scale * -20, scale * 35)
  snippets.logo = new Snippet('logo', points.logo)
  points.scalebox = points.title.translate(scale * -10, scale * -80)
  macro('scalebox', { at: points.scalebox })

  return part
}

export const back = {
  name: 'back',
  after: bib,
  draft: draftBack,
  options: {
    // What angle the back bib leaves the outseam at. 0 is horizontal, 90 is vertical.
    backBibBaseAngle: { deg: 25, min: 0, max: 90, menu: 'style' },
    // How deep to make the curve connecting the top of the outseam with the hexagon of the back bib.
    backBibBaseCurve: { pct: 40, min: 0, max: 100, menu: 'style' },
    // How high up the hexagon of the back bib is located. 0% refers to the waist, while 100% refers to the HPS.
    backBibHexagonVerticalPosition: { pct: 50, min: 10, max: 90, menu: 'style' },
    // How tall the hexagon where the two sides of the back bib cross over is, as a percent of hpsToWaistBack.
    backBibHexagonHeight: { pct: 40, min: 10, max: 60, menu: 'style' },
    // How wide the hexagon of the back bib is, as a percent of the waist measurement.
    backBibHexagonWidth: { pct: 50, min: 20, max: 80, menu: 'style' },
    // How long to make the two vertical sides of the back bib hexagon.
    backBibHexagonSideHeight: { pct: 12, min: 5, max: 40, menu: 'style' },
    // How long to make the straps, as a percent of the distance from the front waist, over the HPS, and down to the back waist. Recommended 100-110% for fixed straps, 130-140% for adjustable straps.
    strapLength: { pct: 160, min: 100, max: 200, menu: 'style' },
    strapWidth: {
      pct: 4,
      min: 2,
      max: 10,
      toAbs: (pct, settings, mergedOptions) =>
        mergedOptions.strapWidth *
        (settings.measurements.hpsToWaistFront + settings.measurements.hpsToWaistBack),
      menu: 'style',
    },
    // How the straps are positioned with respect to the hexagon. 0 places the outer edge of each strap lined up with the outer edge of the hexagon. Negative values place the outer edge farther out. 0 is generally the most fabric efficient, while negative values may fit better.
    strapPosition: { pct: 0, min: -10, max: 0, menu: 'style' },
    // How long the tapered portions of the straps are. Larger values give a longer, more gradual taper from the back bib's width down to the strap's width.
    strapTaperPosition: { pct: 50, min: 0, max: 100, menu: 'style' },
    // Controls the shape of the curve as the back bib tapers into the straps.
    strapTaperCurve: { pct: 80, min: 0, max: 100, menu: 'style' },
    // Back pocket percentages are as a percentage of the back waist arc, including any ease.
    pocketBack: { bool: true, menu: 'style' },
    pocketBackPositionX: {
      pct: 60,
      min: 20,
      max: 100,
      menu: (settings, mergedOptions) => (mergedOptions.pocketBack ? 'style' : false),
    },

    pocketBackPositionY: {
      pct: 100,
      min: 0,
      max: 160,
      menu: (settings, mergedOptions) => (mergedOptions.pocketBack ? 'style' : false),
    },
    pocketBackWidth: {
      pct: 60,
      min: 10,
      max: 100,
      menu: (settings, mergedOptions) => (mergedOptions.pocketBack ? 'style' : false),
    },

    pocketBackHeight: {
      pct: 80,
      min: 10,
      max: 120,
      menu: (settings, mergedOptions) => (mergedOptions.pocketBack ? 'style' : false),
    },
    pocketBackCornerWidth: {
      pct: 50,
      min: 0,
      max: 100,
      menu: (settings, mergedOptions) => (mergedOptions.pocketBack ? 'style' : false),
    },
    pocketBackCornerHeight: {
      pct: 10,
      min: 0,
      max: 100,
      menu: (settings, mergedOptions) => (mergedOptions.pocketBack ? 'style' : false),
    },
    // Carpenter pocket percentages are as a percentage of the back waist arc, including any ease.
    pocketCarpenter: { bool: true, menu: 'style' },
    pocketCarpenterHeight: {
      pct: 100,
      min: 30,
      max: 150,
      menu: (settings, mergedOptions) => (mergedOptions.pocketCarpenter ? 'style' : false),
    },
    // How far into the back pocket the carpenter pocket goes. Affects style. Larger values will be more secure, but will add bulk.
    pocketCarpenterAnchorX: {
      pct: 20,
      min: 0,
      max: 80,
      menu: (settings, mergedOptions) => (mergedOptions.pocketCarpenter ? 'style' : false),
    },
    pocketCarpenterAnchorY: {
      pct: 10,
      min: 0,
      max: 50,
      menu: (settings, mergedOptions) => (mergedOptions.pocketCarpenter ? 'style' : false),
    },
    pocketCarpenterAnchorWidth: {
      pct: 15,
      min: 0,
      max: 80,
      menu: (settings, mergedOptions) => (mergedOptions.pocketCarpenter ? 'style' : false),
    },
    pocketCarpenterOpeningHeight: {
      pct: 60,
      min: 40,
      max: 100,
      menu: (settings, mergedOptions) => (mergedOptions.pocketCarpenter ? 'style' : false),
    },
    pocketCarpenterExtra: {
      bool: true,
      menu: (settings, mergedOptions) => (mergedOptions.pocketCarpenter ? 'style' : false),
    },
    pocketCarpenterExtraHeight: {
      pct: 50,
      min: 10,
      max: 80,
      menu: (settings, mergedOptions) =>
        mergedOptions.pocketCarpenter && mergedOptions.pocketCarpenterExtra ? 'style' : false,
    },
    hammerLoop: { bool: true, menu: 'style' },
    hammerLoopWidth: { pct: 10, min: 0, max: 20, menu: 'style' },
    hammerLoopCornerX: { pct: 0, min: -50, max: 50, menu: 'style' },
    hammerLoopCornerY: { pct: 20, min: 0, max: 100, menu: 'style' },
    hammerLoopCurve: { pct: 100, min: 0, max: 100, menu: 'style' },
    hammerLoopOutseam: { pct: 20, min: 0, max: 80, menu: 'style' },
    hammerLoopFirstFold: { pct: 90, min: 0, max: 100, menu: 'style' },
    hammerLoopSecondFold: { pct: 60, min: 0, max: 200, menu: 'style' },
  },
}
