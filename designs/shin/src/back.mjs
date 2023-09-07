import { pctBasedOn } from '@freesewing/core'
import { elastics } from '@freesewing/snapseries'

function shinBack({
  store,
  macro,
  Point,
  Path,
  points,
  paths,
  complete,
  paperless,
  snippets,
  Snippet,
  sa,
  options,
  measurements,
  utils,
  part,
}) {
  // Store some helper variables
  store.set('hips', (measurements.hips / 2) * utils.stretchToScale(options.stretch))
  store.set('hipFront', store.get('hips') * options.frontFactor)
  store.set('hipBack', store.get('hips') * (1 - options.frontFactor))
  store.set('legs', measurements.upperLeg * utils.stretchToScale(options.stretch))
  store.set('legFront', store.get('legs') * options.legFrontFactor)
  store.set('legBack', store.get('legs') * (1 - options.legFrontFactor))
  store.set('gusset', measurements.hips * options.gussetFactor)

  points.hipSide = new Point(0, 0)
  points.hipCb = new Point(store.get('hipBack'), 0)
  points.legSide = points.hipSide.shift(
    -90 - options.angle,
    measurements.waistToUpperLeg - measurements.waistToHips
  )
  points.legSideCp = points.legSide.shift(options.angle * -1 + 7, store.get('legBack'))
  points.legInner = points.legSideCp.shift(options.angle * -1 - 90, store.get('gusset') / 2)
  points.legSideCp = points.legSideCp.shiftFractionTowards(points.legSide, 0.5)
  let tmp = new Path().move(points.legInner)._curve(points.legSideCp, points.legSide).shiftAlong(2)
  let gussetAngle = points.legInner.angle(tmp)
  points.crossSeam = points.legInner.shift(gussetAngle - 90, store.get('gusset'))
  points.seatCb = points.hipCb.shift(
    -86,
    (measurements.waistToUpperLeg - measurements.waistToHips) * 0.62
  )
  tmp = utils.beamsIntersect(
    points.crossSeam,
    points.crossSeam.shift(gussetAngle, 20),
    points.hipCb,
    points.seatCb
  )
  points.seatCp = points.seatCb.shiftFractionTowards(tmp, 0.7)
  points.crossSeamCp = points.crossSeam.shiftFractionTowards(tmp, 0.7)

  // Reduce the legs
  points.reducedLegInner =
    options.legReduction === 0
      ? points.legInner
      : new Path()
          .move(points.legSide)
          .curve_(points.legSideCp, points.legInner)
          .shiftFractionAlong(1 - options.legReduction)
  points.reducedLegInnerCp = points.legInner.rotate(90, points.reducedLegInner)
  points.reducedCrossSeam = new Path()
    .move(points.crossSeam)
    .curve(points.crossSeamCp, points.seatCp, points.seatCb)
    .shiftFractionAlong(options.legReduction * 2)

  // Rise
  if (options.rise > 0) {
    let rise = (measurements.waistToUpperLeg - measurements.waistToHips) * options.rise
    points.hipSide = points.hipSide.shift(90, rise)
    points.hipCb = points.hipCb.shift(90, rise)
  }

  // Back rise
  if (options.backRise > 0) {
    let backRise = (measurements.waistToUpperLeg - measurements.waistToHips) * options.backRise
    points.hipCb = points.hipCb.shift(90, backRise)
    points.hipSide = points.hipSide.shift(90, backRise)
    points.hipCbCp = new Point(points.hipCb.x / 2, points.hipCb.y)
  }

  // Paths
  paths.saBase = new Path() // Use full crossSeam path
    .move(points.crossSeam)
    .curve(points.crossSeamCp, points.seatCp, points.seatCb)
    .split(points.reducedCrossSeam) // Now split it
    .pop() // Return the relevant part
    .line(points.hipCb) // Continue from here
  if (options.backRise > 0) paths.saBase._curve(points.hipCbCp, points.hipSide)
  else paths.saBase.line(points.hipSide)
  paths.saBase.line(points.legSide)
  paths.saBase = new Path()
    .move(points.reducedLegInner)
    .line(points.reducedCrossSeam)
    .join(paths.saBase)

  paths.hemBase = new Path().move(points.legSide).curve_(points.legSideCp, points.reducedLegInner)
  paths.saBase.hide()
  paths.hemBase.hide()

  paths.seam = paths.saBase.join(paths.hemBase).attr('class', 'fabric')

  /** Uncomment this to see the reduced crossSeam
  paths.xred = new Path()
    .move(points.reducedLegInner)
    .line(points.legInner)
    .line(points.crossSeam)
  */

  // Complete?
  if (complete) {
    points.logo = points.hipSide.shiftFractionTowards(points.seatCb, 0.3)
    points.title = points.hipSide.shiftFractionTowards(points.seatCb, 0.7)
    snippets.logo = new Snippet('logo', points.logo)
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'back',
    })
    macro('scalebox', { at: new Point(points.legSide.x + 100, points.legSide.y - 40) })
    points.grainlineFrom = points.legSide.shift(0, 15)
    points.grainlineTo = points.hipSide.shift(0, 15)
    macro('grainline', {
      from: points.grainlineFrom,
      to: points.grainlineTo,
    })
    if (sa) {
      paths.sa = paths.hemBase
        .offset(3 * sa)
        .join(paths.saBase.offset(sa))
        .close()
        .attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.hipSide,
      to: points.hipCb,
      y: points.hipCb.y - sa - 15,
    })
    macro('hd', {
      from: points.legSide,
      to: points.hipCb,
      y: points.hipCb.y - sa - 30,
    })
    macro('vd', {
      from: points.legSide,
      to: points.hipSide,
      x: points.legSide.x - sa - 15,
    })
    macro('vd', {
      from: points.reducedLegInner,
      to: points.hipSide,
      x: points.legSide.x - sa - 30,
    })
    macro('hd', {
      from: points.legSide,
      to: points.reducedLegInner,
      y: points.reducedLegInner.y + 3 * sa + 15,
    })
    macro('hd', {
      from: points.legSide,
      to: points.reducedCrossSeam,
      y: points.reducedLegInner.y + 3 * sa + 30,
    })
    macro('vd', {
      from: points.reducedLegInner,
      to: points.reducedCrossSeam,
      x: points.reducedCrossSeam.x + sa + 15,
    })
    macro('vd', {
      from: points.reducedLegInner,
      to: points.hipCb,
      x: points.reducedCrossSeam.x + sa + 30,
    })
  }

  return part
}

export const back = {
  name: 'shin.back',
  measurements: ['hips', 'upperLeg', 'waistToUpperLeg', 'waistToHips'],
  options: {
    frontFactor: 0.58,
    legFrontFactor: 0.48,
    gussetFactor: 0.0714,
    angle: 10,
    elasticWidth: {
      pct: 10,
      min: 4,
      max: 20,
      snap: elastics,
      ...pctBasedOn('waistToUpperLeg'),
      menu: 'style',
    },
    stretch: { pct: 20, min: 10, max: 30, menu: 'fit' },
    bulge: { pct: 2.5, min: 0, max: 5, menu: 'fit' },
    legReduction: { pct: 5, min: 0, max: 10, menu: 'fit' },
    rise: { pct: 0, min: 0, max: 25, menu: 'style' },
    backRise: { pct: 5, min: 0, max: 10, menu: 'fit' },
  },
  draft: shinBack,
}
