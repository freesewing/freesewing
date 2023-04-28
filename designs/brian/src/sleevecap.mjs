import { front } from './front.mjs'

/** Calculates the differece between actual and optimal sleevecap length
 * Positive values mean sleevecap is longer than armhole
 */
function sleevecapDelta(store) {
  return store.get('sleevecapLength') - store.get('sleevecapTarget')
}

function sleevecapAdjust(store) {
  const delta = sleevecapDelta(store)
  const len = store.get('sleevecapLength')
  const doverl = delta / len
  store.set('doverl', doverl)
  let factor = store.get('sleeveFactor')
  if (doverl > 0.1) factor = factor * 0.8
  if (doverl > 0.02) factor = factor * 0.9
  else if (doverl < -0.1) factor = factor * 1.3
  else if (doverl < -0.02) factor = factor * 1.15
  else if (delta > 0) factor = factor * 0.99
  else factor = factor * 1.008
  store.set('sleeveFactor', factor)
}

function draftSleevecap(part, run) {
  let { store, measurements, options, Point, points, Path, paths } = part.shorthand()
  // Sleeve center axis
  points.centerBiceps = new Point(0, 0)
  points.centerCap = points.centerBiceps.shift(
    90,
    options.sleevecapTopFactorY *
      (measurements.biceps *
        (1 + options.bicepsEase) *
        options.armholeDepthFactor *
        store.get('sleeveFactor'))
  )

  // Left and right biceps points, limit impact of sleeveFactor to 25%
  let halfWidth = (measurements.biceps * (1 + options.bicepsEase)) / 2
  points.bicepsLeft = points.centerBiceps.shift(
    180,
    halfWidth * options.sleeveWidthGuarantee +
      halfWidth * (1 - options.sleeveWidthGuarantee) * store.get('sleeveFactor')
  )
  points.bicepsRight = points.bicepsLeft.flipX(points.centerBiceps)

  // Adapt sleeve center axis
  points.capLeft = new Point(points.bicepsLeft.x, points.centerCap.y)
  points.capRight = points.capLeft.flipX()
  points.centerCap = points.capLeft.shiftFractionTowards(
    points.capRight,
    options.sleevecapTopFactorX
  )

  // Pitch points
  let width = points.bicepsRight.x
  let height = points.centerCap.y
  points.backPitch = new Point(
    -1 * width * options.sleevecapBackFactorX,
    height * options.sleevecapBackFactorY
  )
  points.frontPitch = new Point(
    width * options.sleevecapFrontFactorX,
    height * options.sleevecapFrontFactorY
  )

  // 4 sleevecap quadrants
  // Base points
  points.capQ1Base = points.frontPitch.shiftFractionTowards(points.bicepsRight, 0.5)
  points.capQ2Base = points.frontPitch.shiftFractionTowards(points.centerCap, 0.5)
  points.capQ3Base = points.backPitch.shiftFractionTowards(points.centerCap, 0.5)
  points.capQ4Base = points.backPitch.shiftFractionTowards(points.bicepsLeft, 0.5)
  // Offset points
  let baseOffset = measurements.biceps * (1 + options.bicepsEase)
  points.capQ1 = points.capQ1Base.shift(
    points.bicepsRight.angle(points.frontPitch) + 90,
    baseOffset * options.sleevecapQ1Offset
  )
  points.capQ2 = points.capQ2Base.shift(
    points.centerCap.angle(points.frontPitch) + 90,
    baseOffset * options.sleevecapQ2Offset
  )
  points.capQ3 = points.capQ3Base.shift(
    points.centerCap.angle(points.backPitch) - 90,
    baseOffset * options.sleevecapQ3Offset
  )
  points.capQ4 = points.capQ4Base.shift(
    points.bicepsLeft.angle(points.backPitch) - 90,
    baseOffset * options.sleevecapQ4Offset
  )
  // Control points
  points.capQ1Cp1 = points.capQ1.shift(
    points.frontPitch.angle(points.bicepsRight),
    baseOffset * options.sleevecapQ1Spread1
  )
  points.capQ1Cp2 = points.capQ1.shift(
    points.frontPitch.angle(points.bicepsRight),
    baseOffset * options.sleevecapQ1Spread2 * -1
  )
  points.capQ2Cp1 = points.capQ2.shift(
    points.centerCap.angle(points.frontPitch),
    baseOffset * options.sleevecapQ2Spread1
  )
  points.capQ2Cp2 = points.capQ2.shift(
    points.centerCap.angle(points.frontPitch),
    baseOffset * options.sleevecapQ2Spread2 * -1
  )
  points.capQ3Cp1 = points.capQ3.shift(
    points.backPitch.angle(points.centerCap),
    baseOffset * options.sleevecapQ3Spread1
  )
  points.capQ3Cp2 = points.capQ3.shift(
    points.backPitch.angle(points.centerCap),
    baseOffset * options.sleevecapQ3Spread2 * -1
  )
  points.capQ4Cp1 = points.capQ4.shift(
    points.bicepsLeft.angle(points.backPitch),
    baseOffset * options.sleevecapQ4Spread1
  )
  points.capQ4Cp2 = points.capQ4.shift(
    points.bicepsLeft.angle(points.backPitch),
    baseOffset * options.sleevecapQ4Spread2 * -1
  )

  // Sleevecap seamline
  paths.sleevecap = new Path()
    .move(points.bicepsRight)
    .curve(points.bicepsRight, points.capQ1Cp1, points.capQ1)
    .curve(points.capQ1Cp2, points.capQ2Cp1, points.capQ2)
    .curve(points.capQ2Cp2, points.capQ3Cp1, points.capQ3)
    .curve(points.capQ3Cp2, points.capQ4Cp1, points.capQ4)
    .curve(points.capQ4Cp2, points.bicepsLeft, points.bicepsLeft)

  // Store sleevecap length & height
  store.set('sleevecapLength', paths.sleevecap.length())
  store.set('sleevecapHeight', paths.sleevecap.edge('bottom').x - paths.sleevecap.edge('top').x)
  if (run === 0) {
    let armholeLength = store.get('frontArmholeLength') + store.get('backArmholeLength')
    let sleevecapEase = armholeLength * options.sleevecapEase
    store.set('sleevecapEase', sleevecapEase)
    store.set('sleevecapTarget', armholeLength + sleevecapEase)

    // Uncomment this line to see all sleevecap iterations
    //paths[run] = paths.sleevecap;
  }
}

const menu = 'advanced.sleevecap'
export const sleevecap = {
  from: front,
  name: 'brian.sleevecap',
  hide: { self: true },
  options: {
    sleevecapEase: { pct: 0, min: 0, max: 10, menu },
    sleevecapTopFactorX: { pct: 50, min: 25, max: 75, menu },
    sleevecapTopFactorY: { pct: 45, min: 35, max: 125, menu },
    sleevecapBackFactorX: { pct: 60, min: 35, max: 65, menu },
    sleevecapBackFactorY: { pct: 33, min: 30, max: 65, menu },
    sleevecapFrontFactorX: { pct: 55, min: 35, max: 65, menu },
    sleevecapFrontFactorY: { pct: 33, min: 30, max: 65, menu },
    sleevecapQ1Offset: { pct: 1.7, min: 0, max: 7, menu },
    sleevecapQ2Offset: { pct: 3.5, min: 0, max: 7, menu },
    sleevecapQ3Offset: { pct: 2.5, min: 0, max: 7, menu },
    sleevecapQ4Offset: { pct: 1, min: 0, max: 7, menu },
    sleevecapQ1Spread1: { pct: 10, min: 4, max: 20, menu },
    sleevecapQ1Spread2: { pct: 15, min: 4, max: 20, menu },
    sleevecapQ2Spread1: { pct: 15, min: 4, max: 20, menu },
    sleevecapQ2Spread2: { pct: 10, min: 4, max: 20, menu },
    sleevecapQ3Spread1: { pct: 10, min: 4, max: 20, menu },
    sleevecapQ3Spread2: { pct: 8, min: 4, max: 20, menu },
    sleevecapQ4Spread1: { pct: 7, min: 4, max: 20, menu },
    sleevecapQ4Spread2: { pct: 6.3, min: 4, max: 20, menu },
    sleeveWidthGuarantee: { pct: 90, min: 25, max: 100, menu: 'advanced' },
  },
  draft: ({ store, units, options, Point, points, paths, log, snippets, macro, part }) => {
    // Clean up from fron
    for (const path in paths) delete paths[path]
    delete snippets.logo
    macro('title', false)
    macro('cutonfold', false)

    store.set('sleeveFactor', 1)
    let run = 0
    let delta = 0
    do {
      draftSleevecap(part, run)
      delta = sleevecapDelta(store)
      sleevecapAdjust(store)
      run++
      log.debug(`Fitting Brian sleevecap. Run ${run}: delta is ${units(delta)}`)
    } while (options.brianFitSleeve === true && run < 50 && Math.abs(sleevecapDelta(store)) > 2)

    // Paths
    paths.sleevecap.attr('class', 'fabric')

    // Anchor point for sampling
    points.gridAnchor = new Point(0, 0)

    return part
  },
}
