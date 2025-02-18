import { pctBasedOn } from '@freesewing/core'

export const options = {
  // Fit
  backRaise: {
    pct: 10,
    min: 0,
    max: 25,
    // eslint-disable-next-line no-unused-vars
    toAbs: (value, { measurements, options }, mergedOptions) =>
      value *
      (measurements.crotchDepth * (1 + mergedOptions.waistRaise) * mergedOptions.crotchEase),
    menu: 'fit',
  },
  waistRaise: {
    pct: 0,
    min: -20,
    max: 40,
    // eslint-disable-next-line no-unused-vars
    toAbs: (value, { measurements, options }, mergedOptions) =>
      measurements.crotchDepth * (1 + value),
    menu: 'fit',
  },
  fitWaist: { bool: true, menu: 'fit' },
  // Style
  hemWidth: { pct: 1.75, min: 1, max: 2.5, ...pctBasedOn('inseam'), menu: 'style' },
  legSize: { pct: 75, max: 90, min: 50, ...pctBasedOn('inseam'), menu: 'style' },
  waistOverlap: {
    pct: 50,
    min: 10,
    max: 100,
    // eslint-disable-next-line no-unused-vars
    toAbs: (value, { measurements, options }, mergedOptions) => {
      const waist =
        typeof measurements.waist == 'undefined' || false == mergedOptions.fitWaist
          ? measurements.seat
          : measurements.waist
      return (measurements.seat > waist ? measurements.seat : waist) * value
    },
    menu: 'style',
  },
  frontPocket: { bool: true, menu: 'style' },
  backPocket: { bool: true, menu: 'style' },
  waistbandWidth: { pct: 3.5, min: 2, max: 5, ...pctBasedOn('inseam'), menu: 'style' },
  frontPocketStyle: { dflt: 'welt', list: ['welt', 'waistband'], menu: 'style' },
  separateWaistband: { bool: false, menu: 'style' },
  // knotInFront: { bool: true, menu: 'style' },
  knotPlacement: { dflt: 'front', list: ['front', 'back', 'traditional'], menu: 'style' },
  // Advanced
  crotchFront: { pct: 30, min: 10, max: 70, menu: 'advanced' },
  crotchBack: { pct: 45, min: 10, max: 70, menu: 'advanced' },
  crotchFactorFrontHor: { pct: 90, min: 10, max: 100, menu: 'advanced' },
  crotchFactorFrontVer: { pct: 30, min: 10, max: 70, menu: 'advanced' },
  crotchFactorBackHor: { pct: 90, min: 10, max: 100, menu: 'advanced' },
  crotchFactorBackVer: { pct: 60, min: 20, max: 90, menu: 'advanced' },
  // Static values
  backWaistAdjustment: 0.3,
  frontPocketVerticalOffset: 0.07,
  frontPocketHorizontalOffset: 0.18,
  frontPocketSize: 0.45,
  frontPocketWidthHeightRatio: 0.076,
  frontPocketDepthFactor: 1.6,
  frontWaistAdjustment: 0.163,
  backPocketDepth: 0.5,
  backPocketVerticalOffset: 0.2,
  backPocketHorizontalOffset: 0.045,
  backPocketSize: 0.45,
  crotchEase: 1.08,
}

export const pantsProto = {
  name: 'waralee.pantsProto',
  hide: { self: true },
  measurements: ['seat', 'inseam', 'crotchDepth', 'waistToHips'],
  optionalMeasurements: ['waist', 'waistBack'],
  options,
  draft: ({ options, measurements, Point, Path, points, paths, store, part, utils }) => {
    const seatDepth = measurements.crotchDepth * (1 + options.waistRaise) * options.crotchEase
    const waist =
      typeof measurements.waist == 'undefined' || false == options.fitWaist
        ? measurements.seat
        : measurements.waist
    const circumference = measurements.seat > waist ? measurements.seat : waist
    const waistBack =
      typeof measurements.waistBack == 'undefined' || false == options.fitWaist
        ? waist / 2
        : measurements.waistBack

    const separateWaistband = options.separateWaistband || 'waistband' == options.frontPocketStyle

    const circumference4 = circumference / 4
    const hem = measurements.inseam * options.hemWidth
    const waistBand = measurements.inseam * options.waistbandWidth

    const frontPocketSize = options.frontPocketSize * measurements.crotchDepth
    const pocketDepth =
      (measurements.crotchDepth - measurements.waistToHips) * options.frontPocketDepthFactor >
      frontPocketSize * 1.75
        ? (measurements.crotchDepth - measurements.waistToHips) * options.frontPocketDepthFactor
        : frontPocketSize * 1.75
    const frontPocketHeight = frontPocketSize * options.frontPocketWidthHeightRatio

    store.set('waistBand', waistBand)
    store.set('hem', hem)
    store.set('pocketDepth', pocketDepth)
    store.set('frontPocketSize', frontPocketSize)

    points.mWaist = new Point(0, 0)

    points.mHip = points.mWaist.shift(270, seatDepth)

    points.fWaistSide = points.mWaist
      .shift(180, options.crotchFront * circumference4)
      .shift(90, waistBand)
    points.fWaistCrotchCP = points.fWaistSide.shift(
      270,
      seatDepth * options.crotchFactorFrontVer + waistBand
    )
    points.fHipCrotchCP = points.mHip.shift(
      180,
      options.crotchFront * circumference4 * options.crotchFactorFrontHor
    )

    points.fHipSide = points.mHip.shift(180, options.crotchFront * circumference4)

    points.bWaistSide = points.mWaist
      .shift(0, options.crotchBack * circumference4)
      .shift(90, waistBand)
      .shift(90, options.backRaise * seatDepth)
    points.bWaistCrotchCP = points.bWaistSide.shift(270, seatDepth * options.crotchFactorBackVer)
    points.bHipCrotchCP = points.mHip.shift(
      0,
      options.crotchBack * circumference4 * options.crotchFactorBackHor
    )

    points.bHipSide = points.mHip.shift(0, options.crotchBack * circumference4)

    points.fCutOutHip = new Path()
      .move(points.fWaistSide)
      .curve(points.fWaistCrotchCP, points.fHipCrotchCP, points.mHip)
      .shiftAlong(measurements.waistToHips + waistBand)
    points.bCutOutHip = new Path()
      .move(points.bWaistSide)
      .curve(points.bWaistCrotchCP, points.bHipCrotchCP, points.mHip)
      .shiftAlong(measurements.waistToHips + waistBand + options.backRaise * seatDepth)

    const waistSeatDifferenceBack = measurements.seat / 2 - waistBack
    const waistSeatDifferenceFront = measurements.seat / 2 - (waist - waistBack)

    points.bWaistAdjusted = points.bWaistSide.shift(
      0,
      waistSeatDifferenceBack * options.backWaistAdjustment
    )
    points.fWaistAdjusted = points.fWaistSide.shift(
      180,
      waistSeatDifferenceFront * options.frontWaistAdjustment
    )

    points.mLeg = points.mHip.shift(270, measurements.inseam * options.legSize)
    points.fLegSide = points.mLeg.shift(180, options.crotchFront * circumference4)
    points.bLegSide = points.mLeg.shift(0, options.crotchBack * circumference4)

    points.fWaistFront = points.fWaistSide.shift(180, circumference4)
    points.fWaistFrontOverlap = points.fWaistFront.shift(180, options.waistOverlap * circumference4)
    points.fHipFront = points.fHipSide.shift(180, circumference4)
    points.fHipFrontOverlap = points.fHipFront.shift(180, options.waistOverlap * circumference4)
    points.fLegFront = points.fLegSide.shift(180, circumference4)
    points.fLegFrontOverlap = points.fLegFront.shift(180, options.waistOverlap * circumference4)

    // Calculate the distance we need to move horizontally to get to the point that will
    // diagonally be the distance we're looking for (circumference/4)
    const bHorDistance = Math.sqrt(
      circumference4 * circumference4 -
        options.backRaise * seatDepth * options.backRaise * seatDepth
    )
    // Create a point that is this distance from the side.
    points.bWaistBack = points.mWaist
      .shift(90, waistBand)
      .shift(0, options.crotchBack * circumference4 + bHorDistance)

    points.bWaistBackOverlap = points.bWaistBack.shift(0, options.waistOverlap * circumference4)

    points.bHipBack = points.bHipSide.shift(0, circumference4)
    points.bHipBackOverlap = points.bHipBack.shift(0, options.waistOverlap * circumference4)
    points.bLegBack = points.bLegSide.shift(0, circumference4)
    points.bLegBackOverlap = points.bLegBack.shift(0, options.waistOverlap * circumference4)

    points.bWaistSideTemp = points.bWaistSide.shift(0, 2) // This is a trick to make the offset() call work. Without it, the offset is crossing the cutout line.

    const fPaths = new Path()
      .move(points.fWaistSide)
      .curve(points.fWaistCrotchCP, points.fHipCrotchCP, points.mHip)
      .split(points.fCutOutHip)

    const bPaths = new Path()
      .move(points.bWaistSide)
      .curve(points.bWaistCrotchCP, points.bHipCrotchCP, points.mHip)
      .split(points.bCutOutHip)

    fPaths[0].hide()
    fPaths[1].hide()
    bPaths[0].hide()
    bPaths[1].hide()

    points.fCutOutHipCp1 = fPaths[1].ops[1].cp1.shiftFractionTowards(points.fCutOutHip, 1.25)
    points.fCutOutHipCp2 = fPaths[1].ops[1].cp1.clone()
    points.mHipCp1 = fPaths[1].ops[1].cp2.clone()
    points.mHipCp2 = bPaths[1].ops[1].cp2.clone()
    points.bCutOutHipCp1 = bPaths[1].ops[1].cp1.clone()
    points.bCutOutHipCp2 = bPaths[1].ops[1].cp1.shiftFractionTowards(points.bCutOutHip, 1.25)

    paths.frontBottomCutOut = new Path()
      .move(points.mHip)
      .curve(points.mHipCp1, points.fCutOutHipCp2, points.fCutOutHip)
      .hide()
    paths.backBottomCutOut = new Path()
      .move(points.bCutOutHip)
      .curve(points.bCutOutHipCp1, points.mHipCp2, points.mHip)
      .hide()

    paths.frontTopCutOut = new Path()
      .move(points.fCutOutHip)
      .curve(points.fCutOutHipCp1, points.fWaistAdjusted, points.fWaistAdjusted)
      .hide()
    paths.backTopCutOut = new Path()
      .move(points.bWaistAdjusted)
      .curve(points.bWaistAdjusted, points.bCutOutHipCp2, points.bCutOutHip)
      .hide()

    points.fWaistSideHem = paths.frontTopCutOut.reverse().shiftAlong(waistBand)
    points.fWaistSideSeam = paths.frontTopCutOut.reverse().shiftAlong(waistBand * 2)
    points.fWaistSide = points.fWaistSideSeam.flipY(points.fWaistSideHem)
    points.bWaistSideHem = paths.backTopCutOut.shiftAlong(waistBand)
    points.bWaistSideSeam = paths.backTopCutOut.shiftAlong(waistBand * 2)
    points.bWaistSide = points.bWaistSideSeam.flipY(points.bWaistSideHem)

    points.fWaistFrontOverlapHem = points.fWaistFrontOverlap.shift(270, waistBand)
    points.bWaistBackHem = points.bWaistBack.shift(270, waistBand)
    points.bWaistBackOverlapHem = points.bWaistBackOverlap.shift(270, waistBand)
    points.fWaistFrontOverlapSeam = points.fWaistFrontOverlap.shift(270, waistBand * 2)
    points.bWaistBackSeam = points.bWaistBack.shift(270, waistBand * 2)
    points.bWaistBackOverlapSeam = points.bWaistBackOverlap.shift(270, waistBand * 2)
    points.fWaistSideCp2 = paths.frontTopCutOut.split(points.fWaistSideSeam)[0].ops[1].cp2.clone()

    points.fWaistSideCp2 = paths.frontTopCutOut.split(points.fWaistSideSeam)[0].ops[1].cp2.clone()
    points.fWaistHipCp1 = paths.frontTopCutOut.split(points.fWaistSideSeam)[0].ops[1].cp1.clone()
    points.bWaistSideCp1 = paths.backTopCutOut.split(points.bWaistSideSeam)[1].ops[1].cp1.clone()
    points.bWaistHipCp2 = paths.backTopCutOut.split(points.bWaistSideSeam)[1].ops[1].cp2.clone()

    if (separateWaistband) {
      points.mWaist1 = new Point(points.mWaist.x, points.fWaistSideSeam.y)
      // points.mWaist = new Point(points.mWaist.x, points.fWaistSideSeam.y)
    } else {
      points.mWaist1 = new Point(points.mWaist.x, points.fWaistSide.y)
    }
    if (separateWaistband) {
      points.mWaist2 = new Point(points.mWaist.x, points.bWaistSideSeam.y)
    } else {
      points.mWaist2 = new Point(points.mWaist.x, points.bWaistSide.y)
    }

    paths.frontTopCutOut = new Path()
      .move(points.fCutOutHip)
      .curve(points.fCutOutHipCp1, points.fWaistSideCp2, points.fWaistSideSeam)
      .hide()
    if (false == separateWaistband) {
      paths.frontTopCutOut.line(points.fWaistSideHem)
      paths.frontTopCutOut.line(points.fWaistSide)
    }
    if (false == separateWaistband) {
      paths.backTopCutOut = new Path()
        .move(points.bWaistSide)
        .line(points.bWaistSideHem)
        .line(points.bWaistSideSeam)
    } else {
      paths.backTopCutOut = new Path().move(points.bWaistSideSeam)
    }
    paths.backTopCutOut.curve(points.bWaistSideCp1, points.bCutOutHipCp2, points.bCutOutHip).hide()

    paths.cutout = paths.backTopCutOut
      .join(paths.backBottomCutOut)
      .join(paths.frontBottomCutOut)
      .join(paths.frontTopCutOut)
      .hide()

    paths.waistBack = new Path()
      .move(separateWaistband ? points.bWaistBackOverlapSeam : points.bWaistBackOverlap)
      .line(separateWaistband ? points.bWaistBackSeam : points.bWaistBack)
      .line(separateWaistband ? points.bWaistSideSeam : points.bWaistSide)
      .hide()
    paths.waistFront = new Path()
      .move(separateWaistband ? points.fWaistSideSeam : points.fWaistSide)
      .line(separateWaistband ? points.fWaistFrontOverlapSeam : points.fWaistFrontOverlap)
      .hide()
    paths.front = new Path()
      .move(separateWaistband ? points.fWaistFrontOverlapSeam : points.fWaistFrontOverlap)
      .line(points.fHipFrontOverlap)
      .line(points.fLegFrontOverlap)
      .hide()
    paths.back = new Path()
      .move(points.bLegBackOverlap)
      .line(points.bHipBackOverlap)
      .line(separateWaistband ? points.bWaistBackOverlapSeam : points.bWaistBackOverlap)
      .hide()
    paths.leg = new Path().move(points.fLegFrontOverlap).line(points.bLegBackOverlap).hide()

    paths.seam = paths.waistFront
      .join(paths.front)
      .join(paths.leg)
      .join(paths.back)
      .join(paths.waistBack)
      .join(paths.cutout)
      .close()
      .addClass('fabric')
      .hide()

    if (options.frontPocket) {
      points.frontPocketTop = points.fWaistSideSeam
        .shift(
          270,
          options.frontPocketVerticalOffset * measurements.crotchDepth +
            waistBand * (separateWaistband ? 1 : 2)
        )
        .shift(180, options.frontPocketHorizontalOffset * measurements.seat)

      points.frontPocketTop2 = points.frontPocketTop.shift(340, frontPocketHeight)
      points.frontPocketBottom = points.frontPocketTop.shift(
        250,
        frontPocketSize
        // options.frontPocketSize * measurements.crotchDepth
      )
      points.frontPocketBottom2 = points.frontPocketBottom.shift(340, frontPocketHeight)

      paths.frontPocket = new Path()
        .move(points.frontPocketTop)
        .line(points.frontPocketBottom)
        .line(points.frontPocketBottom2)
        .line(points.frontPocketTop2)
        .close()
        .addClass('fabric')
        .hide()

      points.frontPocketSeam = utils.beamsIntersect(
        points.frontPocketBottom,
        points.frontPocketTop,
        points.fWaistSideSeam,
        points.fWaistFrontOverlapSeam
      )

      const frontPocketExtraDepth = points.frontPocketTop.dist(points.frontPocketSeam)

      points.frontPocketTopLeft = points.frontPocketSeam.shiftTowards(
        points.fWaistFrontOverlapSeam,
        frontPocketHeight
      )
      points.frontPocketTopRight = points.frontPocketTopLeft.shift(0, pocketDepth * (1 / 3))

      points.frontPocketBottomRight = points.frontPocketTopRight.shift(
        270,
        pocketDepth + frontPocketExtraDepth
      )
      points.frontPocketBottomLeft = points.frontPocketTopLeft.shift(
        250,
        pocketDepth * (5 / 6) + frontPocketExtraDepth
      )

      points.frontPocketBottomRightCP = points.frontPocketBottomRight.shift(
        180,
        pocketDepth * (1 / 6)
      )
      points.frontPocketBottomLeftCP = points.frontPocketBottomLeft.shift(
        315,
        pocketDepth * (1 / 4)
      )

      paths.frontPocketSeamSA = new Path()
        .move(points.frontPocketTopRight)
        .line(points.frontPocketTopLeft)
        .line(points.frontPocketBottomLeft)
        .curve(
          points.frontPocketBottomLeftCP,
          points.frontPocketBottomRightCP,
          points.frontPocketBottomRight
        )
        .hide()
      paths.frontPocketSeam = new Path()
        .move(points.frontPocketBottomRight)
        .line(points.frontPocketTopRight)
        .join(paths.frontPocketSeamSA)
        .close()
        .addClass('dotted mark')
        .hide()
    }

    if (options.backPocket) {
      points.backPocketRight = points.bWaistBack
        .shiftTowards(points.bWaistSide, options.backPocketHorizontalOffset * measurements.seat)
        .shift(
          270,
          options.backPocketVerticalOffset * measurements.crotchDepth +
            waistBand * (separateWaistband ? 1 : 2)
        )
      points.backPocketLeft = points.bWaistBack
        .shiftTowards(
          points.bWaistSide,
          options.backPocketHorizontalOffset * measurements.seat +
            options.backPocketSize * measurements.crotchDepth
        )
        .shift(
          270,
          options.backPocketVerticalOffset * measurements.crotchDepth +
            waistBand * (separateWaistband ? 1 : 2)
        )
      points.backPocketRight2 = points.backPocketRight.shift(
        points.backPocketRight.angle(points.backPocketLeft) + 90,
        12
      )
      points.backPocketLeft2 = points.backPocketLeft.shift(
        points.backPocketLeft.angle(points.backPocketRight) - 90,
        12
      )

      paths.backPocket = new Path()
        .move(points.backPocketLeft)
        .line(points.backPocketLeft2)
        .line(points.backPocketRight2)
        .line(points.backPocketRight)
        .close()
        .addClass('fabric')
        .hide()
    }

    return part.hide()
  },
}
