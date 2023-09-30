function draftCorneliusFrontpoints({
  options,
  measurements,
  Point,
  Path,
  points,
  paths,
  store,
  log,
  part,
}) {
  let halfInch = measurements.waistToKnee / 48

  let inseam = measurements.inseam - (measurements.waistToFloor - measurements.waistToKnee)
  let seat = measurements.seat * options.pctSeatAdjustment
  let waist =
    measurements.waist * options.pctSeatAdjustment - measurements.waist * options.waistReduction
  let waistDown = measurements.waistToHips * options.waistbandBelowWaist
  let waistToKnee = measurements.waistToKnee - waistDown

  store.set('waist', waist)
  store.set('seat', seat)
  store.set('halfInch', halfInch)
  store.set('ventLength', waistToKnee * options.bandBelowKnee * options.ventLength)

  let waistAdjustment = 0
  if (measurements.waist > measurements.seat) {
    waistAdjustment = (measurements.waist - measurements.seat) / 4
  }

  points.pO = new Point(0, 0)
  points.pB = points.pO.shift(270, waistToKnee - waistDown)
  points.pA = points.pB.shift(90, inseam)
  points.pC = points.pB.shift(270, waistToKnee * options.bandBelowKnee)
  points.pT = points.pA.shift(90, (waistToKnee - inseam) / 3)
  points.pE = points.pA.shift(180, seat / 4)
  points.pF = points.pA.shift(180, seat / 2)
  points.pD = points.pO.shift(180, seat / 4)
  points.pH = points.pC.shift(180, seat / 4)
  points.pG = points.pO.shift(180, seat / 2)
  points.pW = points.pG.shift(180, waistAdjustment)

  points.pV = points.pF.shift(0, halfInch)
  points.pX = points.pF.shift(180, halfInch)

  let tPath = new Path().move(points.pG).line(points.pV)
  let tPoints = tPath.intersectsY(points.pT.y)
  if (null != tPoints && tPoints.length > 0) {
    points.pS = tPoints[0].clone()
  } else {
    log.error('Something is not quite right here!')
  }
  tPath = new Path().move(points.pG).line(points.pX)
  tPoints = tPath.intersectsY(points.pT.y)
  if (null != tPoints && tPoints.length > 0) {
    points.pZ = tPoints[0].clone()
  } else {
    log.error('Could not find an intersection to create the crotch point Z')
  }

  points.pP = points.pE.shift(180, seat / 3)
  points.pR = points.pP.shift(180, halfInch + halfInch)

  points.pJ = points.pH.shift(0, measurements.knee / 4)
  points.pK = points.pH.shift(180, measurements.knee / 4)

  points.pU = points.pG.shift(0, waist / 2)

  points.pAextra = points.pA.shift(
    0,
    halfInch * (1 + (options.fullness > 0.3 ? options.fullness /*-0.30*/ : 0))
  )

  let aCPu = points.pA.dist(points.pO) * options.pctAtoO
  let aCPj = points.pA.dist(points.pC) * options.pctAtoC

  points.pAextraCPu = points.pAextra.shift(90, aCPu)
  points.pAextraCPj = points.pAextra.shift(270, aCPj)

  points.pUcpA = points.pU.shiftFractionTowards(points.pAextraCPu, options.pctUtoA)
  points.pJcpA = points.pJ
    .shiftFractionTowards(points.pAextraCPj, options.pctJtoA)
    .shift(0, points.pJ.dist(points.pH) * options.fullness)

  paths.sideSeam = new Path()
    .move(points.pJ)
    .curve(points.pJcpA, points.pAextraCPj, points.pAextra)
    .curve(points.pAextraCPu, points.pUcpA, points.pU)
    .hide()

  paths.waistSeam = new Path().move(points.pU).line(points.pD).line(points.pW).hide()

  points.pocketWaist = paths.waistSeam.shiftAlong(waist / 2 / 4.5)
  points.pocketFacingTL = paths.waistSeam.shiftAlong(waist / 2 / 4.5 + halfInch * 3)
  points.pocketTL = paths.waistSeam.shiftAlong((waist / 2) * 0.75)
  points.pocketBL = new Point(points.pocketTL.x, points.pF.y)

  points.pocketSide = paths.sideSeam.shiftAlong(paths.sideSeam.length() - (waist / 2 / 4.5) * 3.5)
  points.pocketFacingBR = paths.sideSeam.shiftAlong(
    paths.sideSeam.length() - (waist / 2 / 4.5) * 3.5 - halfInch * 3
  )

  return part
}

export const frontpoints = {
  name: 'cornelius.frontpoints',
  hide: { self: true },
  measurements: [
    'waist',
    'hips',
    'inseam',
    'seat',
    'waistToKnee',
    'waistToHips',
    'waistToFloor',
    'knee',
  ],
  options: {
    pctAtoO: 0.5,
    pctAtoC: 0.25,
    pctUtoA: 0.25,
    pctJtoA: 0.25,
    pctSeatAdjustment: 0.5,
    ventLength: { pct: 70, min: 50, max: 110, menu: 'style' },
    fullness: { pct: 0, min: 0, max: 55, menu: 'fit' },
    waistbandBelowWaist: { pct: 5, min: 0, max: 15, menu: 'style' },
    waistReduction: { pct: 1, min: -2, max: 10, menu: 'fit' },
    bandBelowKnee: { pct: 25, min: 15, max: 50, menu: 'advanced' },
  },
  draft: draftCorneliusFrontpoints,
}
