import { front as titanFront } from '@freesewing/titan'
import { back } from './back.mjs'
import { hidePresets } from '@freesewing/core'

function pacoFront({
  utils,
  store,
  sa,
  Point,
  points,
  Path,
  paths,
  options,
  measurements,
  complete,
  paperless,
  macro,
  absoluteOptions,
  part,
}) {
  /*
   * Helper method to draw the inseam path
   */
  const drawInseam = () =>
    new Path().move(points.floorIn).curve(points.kneeInCp2, points.forkCp1, points.fork)
  /*
   * Helper method to draw the outseam path
   */
  const drawOutseam = (noPocketFlap = false) => {
    let waistOut = points.styleWaistOut || points.waistOut
    let outseam = new Path()
      .move(waistOut)
      .curve(points.seatOut, points.kneeOutCp1, points.floorOut)
    if (!options.frontPockets || noPocketFlap) return outseam
    else {
      // Split outseam at top and bottom, and inject pocket flap
      let split = outseam.split(points.pocketFlapTopIn)
      return split[0]
        .join(
          new Path()
            .move(points.pocketFlapTopIn)
            .line(points.pocketFlapTopOut)
            .line(points.pocketFlapBottomOut)
            .line(points.pocketFlapBottomIn)
        )
        .join(split[1].split(points.pocketFlapBottomIn)[1])
    }
  }

  /*
   * Helper method to draw the outline path
   */
  const drawPath = () => {
    let waistIn = points.styleWaistIn || points.waistIn
    let waistOut = points.styleWaistOut || points.waistOut
    return drawOutseam()
      .line(points.floorIn)
      .join(drawInseam())
      .curve(points.crotchSeamCurveCp1, points.crotchSeamCurveCp2, points.crotchSeamCurveStart)
      .line(waistIn)
      .line(waistOut)
      .close()
  }
  /*
   * Helper method to calculate the inseam delta
   */
  const inseamDelta = () => drawInseam().length() - store.get('pacoInseamBack')
  /*
   * Helper method to calculate the outseam delta
   */
  const outseamDelta = () => drawOutseam(true).length() - store.get('pacoOutseamBack')

  // Adapt bottom leg based on heel and heel ease
  let quarterHeel = (measurements.heel * (1 + options.heelEase) * (1 - options.legBalance)) / 2
  points.floorOut = points.floor.shift(180, quarterHeel)
  points.floorIn = points.floor.shift(0, quarterHeel)
  points.kneeOut = points.knee.shift(180, quarterHeel)
  points.kneeOutCp1 = points.kneeOut
  points.kneeIn = points.knee.shift(0, quarterHeel)
  points.kneeInCp2 = points.kneeIn

  // Shorter leg if we have an elasticated hem
  if (options.elasticatedHem) {
    for (const p of ['floor', 'floorIn', 'floorOut'])
      points[p] = points[p].shift(90, options.ankleElastic)
  }

  // Adapt waist so we can get these pants over our bum without a zipper
  let delta =
    (measurements.seat * (1 - options.legBalance)) / 2 -
    points.styleWaistIn.dist(points.styleWaistOut)
  let angle = points.styleWaistInNoAngle.angle(points.styleWaistOut)
  points.styleWaistOut = points.styleWaistOut.shift(angle, delta)
  points.seatOut = points.seatOut.shift(angle, delta)

  // Cut the top of our pants short to make room for the waistband/elastic
  points.styleWaistOut = drawOutseam(true).shiftAlong(store.get('waistbandWidth'))
  points.styleWaistIn = points.styleWaistIn.shiftTowards(
    points.crotchSeamCurveStart,
    store.get('waistbandWidth')
  )

  // Our style changes will have influenced the inseam & outseam a bit
  // but not enough to do a full slash & rotate. So let's just fix the
  // inseam, and then lengthen/shorten the outseam at the waist
  let dIn = inseamDelta()
  points.floor = points.floor.shift(90, dIn)
  points.floorIn = points.floorIn.shift(90, dIn)
  points.floorOut = points.floorOut.shift(90, dIn)
  points.styleWaistOut = points.floorOut.shiftOutwards(points.styleWaistOut, outseamDelta() * -1)

  // Add the (optional) front pocket extention
  if (options.frontPockets) {
    let outseam = drawOutseam(true)
    points.pocketFlapTopIn = outseam.shiftAlong(absoluteOptions.frontPocketFlapSize)
    points.pocketFlapBottomIn = outseam.shiftAlong(
      absoluteOptions.frontPocketFlapSize + measurements.heel * options.frontPocketHeelRatio
    )
    points.pocketFlapTopOut = points.pocketFlapTopIn
      .shiftTowards(points.pocketFlapBottomIn, absoluteOptions.frontPocketFlapSize)
      .rotate(-90, points.pocketFlapTopIn)
    points.pocketFlapBottomOut = points.pocketFlapBottomIn
      .shiftTowards(points.pocketFlapTopIn, absoluteOptions.frontPocketFlapSize)
      .rotate(90, points.pocketFlapBottomIn)
    points.pocketFlapBottomOut = points.pocketFlapTopOut.shiftOutwards(
      points.pocketFlapBottomOut,
      absoluteOptions.frontPocketFlapSize
    )

    points.flapTopLeft = points.pocketFlapTopOut.flipX(points.pocketFlapTopIn)
    points.flapBottomLeft = points.pocketFlapBottomOut.flipX(points.pocketFlapBottomIn)
    points.topLeft = utils.beamsIntersect(
      points.flapBottomLeft,
      points.flapTopLeft,
      points.styleWaistOut,
      points.styleWaistIn
    )
    points.topRight = points.topLeft.shiftFractionTowards(points.styleWaistIn, 0.6)
    points.bottomRight = points.topRight
      .shift(
        points.flapTopLeft.angle(points.flapBottomLeft),
        points.flapTopLeft.dist(points.flapBottomLeft) * 1.75
      )
      .rotate(5, points.topRight)
    points.bottom = new Point(
      points.flapBottomLeft.x + points.flapBottomLeft.dx(points.bottomRight) / 2,
      points.bottomRight.y
    )
    points.bottomCp1 = new Point(points.flapBottomLeft.x, points.bottom.y)
    points.bottomCp2 = utils.beamIntersectsY(points.topRight, points.bottomRight, points.bottom.y)
    paths.pocket = new Path()
      .move(points.topLeft)
      .line(points.flapBottomLeft)
      ._curve(points.bottomCp1, points.bottom)
      .line(points.bottomRight)
      .line(points.topRight)
      .line(points.topLeft)
      .close()
      .attr('class', 'lining')
  }

  // Store top&ankle length
  store.set('frontWaist', points.styleWaistIn.dist(points.styleWaistOut))
  store.set('frontAnkle', points.floorIn.dist(points.floorOut))

  // Now draw the outline
  paths.seam = drawPath()

  if (complete) {
    if (options.frontPockets) {
      paths.pocket = new Path()
        .move(points.topLeft)
        .line(points.flapBottomLeft)
        ._curve(points.bottomCp1, points.bottom)
        .line(points.bottomRight)
        .line(points.topRight)
        .line(points.topLeft)
        .close()
        .attr('class', 'lining lashed')
      paths.pocketFlap = new Path()
        .move(points.pocketFlapTopIn)
        .line(points.flapTopLeft)
        .move(points.pocketFlapBottomIn)
        .line(points.flapBottomLeft)
        .attr('class', 'fabric lashed')
      macro('sprinkle', {
        snippet: 'notch',
        on: ['flapTopLeft', 'flapBottomLeft', 'topLeft', 'topRight'],
      })
    }

    if (sa) {
      const waistIn = points.styleWaistIn || points.waistIn
      const waistOut = points.styleWaistOut || points.waistOut
      const hemSa = options.elasticatedHem ? sa : 4 * sa
      paths.sa = drawOutseam()
        .offset(sa)
        .line(points.floorOut.shift(180, sa).shift(-90, hemSa))
        .line(points.floorIn.shift(0, sa).shift(-90, hemSa))
        .join(drawInseam().offset(sa))
        .join(
          new Path()
            .move(points.fork)
            .curve(
              points.crotchSeamCurveCp1,
              points.crotchSeamCurveCp2,
              points.crotchSeamCurveStart
            )
            .line(waistIn)
            .line(waistOut)
            .offset(sa)
            .trim()
        )
        .close()
        .attr('class', 'fabric sa')
    }
  }

  if (paperless) {
    // Help construct crotch seam
    paths.hint = new Path()
      .move(points.crotchSeamCurveStart)
      .line(points.crotchSeamCurveMax)
      .line(points.fork)
      .attr('class', 'note lashed')
    macro('hd', {
      from: points.floorOut,
      to: points.floor,
      y: points.floorIn.y - 15,
    })
    macro('hd', {
      from: points.floor,
      to: points.floorIn,
      y: points.floorIn.y - 15,
    })
    macro('hd', {
      from: points.floorOut,
      to: points.floorIn,
      y: points.floorIn.y - 30,
    })
    macro('vd', {
      from: points.floorOut,
      to: points.fork,
      x: points.fork.x + sa + 15,
    })
    macro('vd', {
      from: points.fork,
      to: points.styleWaistIn,
      x: points.fork.x + sa + 15,
    })
    macro('vd', {
      from: points.floorIn,
      to: points.styleWaistOut,
      x:
        (points.seatOut.x < points.styleWaistOut.x ? points.seatOut.x : points.styleWaistOut.x) -
        sa -
        15,
    })
    macro('vd', {
      from: points.crotchSeamCurveStart,
      to: points.styleWaistIn,
      x: points.crotchSeamCurveStart.x + sa + 15,
    })
    macro('hd', {
      from: points.styleWaistOut,
      to: points.grainlineTop,
      y: points.styleWaistIn.y - sa - 15,
    })
    if (points.styleWaistOut.x < points.seatOut.x) {
      macro('hd', {
        from: points.styleWaistOut,
        to: points.grainlineTop,
        y: points.styleWaistIn.y - sa - 30,
      })
    }
    macro('hd', {
      from: points.grainlineTop,
      to: points.styleWaistIn,
      y: points.styleWaistIn.y - sa - 15,
    })
    macro('hd', {
      from: points.grainlineTop,
      to: points.crotchSeamCurveStart,
      y: points.styleWaistIn.y - sa - 30,
    })
    macro('hd', {
      from: points.grainlineTop,
      to: points.crotchSeamCurveMax,
      y: points.styleWaistIn.y - sa - 45,
    })
    macro('hd', {
      from: points.grainlineTop,
      to: points.fork,
      y: points.styleWaistIn.y - sa - 60,
    })
    if (options.frontPockets) {
      macro('ld', {
        from: points.pocketFlapTopIn,
        to: points.styleWaistOut,
        d: -15,
      })
      macro('ld', {
        from: points.pocketFlapTopIn,
        to: points.pocketFlapBottomIn,
        d: -15,
      })
      macro('ld', {
        from: points.pocketFlapTopOut,
        to: points.pocketFlapTopIn,
        d: 15,
      })
      macro('ld', {
        from: points.styleWaistOut || points.waistOut,
        to: points.topLeft,
        d: 10 + sa,
      })
      macro('ld', {
        from: points.topLeft,
        to: points.topRight,
        d: 10 + sa,
      })
    }
  }

  return part
}

export const front = {
  name: 'paco.front',
  from: titanFront,
  hide: hidePresets.HIDE_TREE,
  after: back,
  draft: pacoFront,
}
