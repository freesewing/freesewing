export default function(part) {
  let {
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
    utils
  } = part.shorthand()

  let angle = -12
  let bulge = measurements.hipsToUpperLeg * options.bulge
  points.hipSide = new Point(0, 0)
  points.hipCb = new Point(store.get('hipFront'), 0)
  points.legSide = points.hipSide.shift(-90 - angle, measurements.hipsToUpperLeg)
  points.legSideCp = points.legSide.shift(0, store.get('legFront'))
  points.legInner = points.legSideCp.shift(-100, store.get('gusset') / 2)
  points.crossSeam = points.legSideCp.shift(80, store.get('gusset') / 2)
  points.legSideCp = points.legSide.shiftFractionTowards(points.legSideCp, 0.4)
  points.seatCb = points.hipCb.shift(-90 - angle - 5, measurements.hipsToUpperLeg * 0.67)
  points._tmp2 = points.crossSeam.shift(angle, 20)
  points._tmp3 = utils.beamsIntersect(points.crossSeam, points._tmp2, points.hipCb, points.seatCb)
  points.seatCp = points.seatCb.shiftFractionTowards(points._tmp3, 0.7)
  points.crossSeamCp = points.crossSeam.shiftFractionTowards(points._tmp3, 0.7)
  points.midFront = points.hipCb.shiftFractionTowards(points.seatCb, 0.6)
  points.midFrontCpTop = points.hipCb.shiftFractionTowards(points.seatCb, 0.3)
  points.midFrontCpBottom = points.hipCb.shiftFractionTowards(points.seatCb, 0.9)
  points.midBulge = points.midFront.shift(angle * -1, bulge)
  points.bulgeCpTop = points.midFrontCpTop.shift(angle * -1, bulge)
  points.bulgeCpBottom = points.midFrontCpBottom.shift(angle * -1, bulge)
  points.midSide = points.hipSide.shiftFractionTowards(points.legSide, 0.5)
  points.hipSideCpBottom = points.hipSide.shiftFractionTowards(points.legSide, 0.2)
  points.midSideCpTop = points.hipSide.shiftFractionTowards(points.legSide, 0.2)
  points.midSideCpBottom = points.hipSide.shiftFractionTowards(points.legSide, 0.7)
  points.legSideCpTop = points.hipSide.shiftFractionTowards(points.legSide, 0.8)
  points.midSideBulge = points.midSide.shift(angle * -1, bulge * -1)
  points.midSideBulgeCpTop = points.midSideCpTop.shift(angle * -1, bulge * -1)
  points.midSideBulgeCpBottom = points.midSideCpBottom.shift(angle * -1, bulge * -1)

  // Now reduce the legs
  points.reducedLegInner = new Path()
    .move(points.legSide)
    .curve_(points.legSideCp, points.legInner)
    .shiftFractionAlong(1 - options.legReduction)
  points.reducedLegInnerCp = points.legInner.rotate(90, points.reducedLegInner)
  points.reducedCrossSeam = new Path()
    .move(points.crossSeam)
    .curve(points.crossSeamCp, points.seatCp, points.seatCb)
    .shiftFractionAlong(options.legReduction * 2)

  // Lengthen legs
  if (options.legBonus > 0) {
    let shift = measurements.hipsToUpperLeg * options.legBonus
    points.legSide = points.legSide.shift(-90, shift)
    points.legSideCp = points.legSideCp.shift(-90, shift)
    points.reducedLegInner = points.reducedLegInner(-90, shift)
  }

  // Rise
  if (options.rise > 0) {
    let shift = measurements.hipsToUpperLeg * options.rise
    points.hipSide = points.hipSide.shift(90, shift)
    points.hipCb = points.hipCb.shift(0, shift)
  }

  // Back rise
  if (options.backRise > 0) {
    let shift = measurements.hipsToUpperLeg * options.backRise
    points.hipSide = points.hipSide.shift(90, shift / 2)
    points.hipCbCp = new Point(points.hipCb.x / 2, points.hipCb.y)
  }

  // Paths
  paths.saBase = new Path() // Use full crossSeam path
    .move(points.crossSeam)
    .curve(points.crossSeamCp, points.seatCp, points.seatCb)
    .split(points.reducedCrossSeam) // Now split it
    .pop() // Return the relevant part
    .curve(points.midFrontCpBottom, points.bulgeCpBottom, points.midBulge) // Continue from here
    .curve(points.bulgeCpTop, points.midFrontCpTop, points.hipCb)
  if (options.backRise > 0) paths.saBase.curve_(points.hipCbCp, points.hipSide)
  else paths.saBase.line(points.hipSide)
  paths.saBase
    .curve(points.midSideCpTop, points.midSideBulgeCpTop, points.midSideBulge)
    .curve(points.midSideBulgeCpBottom, points.legSideCpTop, points.legSide)
  paths.saBase = new Path()
    .move(points.reducedLegInner)
    .line(points.reducedCrossSeam)
    .join(paths.saBase)
  paths.hemBase = new Path().move(points.legSide).curve_(points.legSideCp, points.reducedLegInner)

  paths.saBase.render = false
  paths.hemBase.render = false

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
      nr: 2,
      title: 'front'
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
    macro('vd', {
      from: points.legSide,
      to: points.hipSide,
      x: points.hipSide.x - sa - 15
    })
    macro('vd', {
      from: points.reducedLegInner,
      to: points.hipSide,
      x: points.hipSide.x - sa - 30
    })
    macro('vd', {
      from: points.reducedLegInner,
      to: points.reducedCrossSeam,
      x: points.reducedCrossSeam.x + sa + 15
    })
    macro('vd', {
      from: points.reducedLegInner,
      to: points.hipCb,
      x: points.reducedCrossSeam.x + sa + 30
    })
    macro('hd', {
      from: points.hipSide,
      to: points.hipCb,
      y: points.hipSide.y - sa - 15
    })
    macro('hd', {
      from: points.hipSide,
      to: points.reducedCrossSeam,
      y: points.hipSide.y - sa - 30
    })
    macro('hd', {
      from: points.legSide,
      to: points.reducedLegInner,
      y: points.reducedLegInner.y + 3 * sa + 15
    })
    macro('hd', {
      from: points.legSide,
      to: points.reducedCrossSeam,
      y: points.reducedLegInner.y + 3 * sa + 30
    })
  }

  return part
}
