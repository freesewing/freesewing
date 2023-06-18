import { frontBase, xOnWaist } from './front-base.mjs'

function draftFrontLeft({
  Point,
  points,
  Path,
  paths,
  store,
  part,
  measurements,
  options,
  complete,
  sa,
  paperless,
  snippets,
  Snippet,
  macro,
  absoluteOptions,
  utils,
}) {
  /*
   * Basic outline was drafted in frontBase
   * Now we adapt it for the left panel
   * Left/Right is always from the vantage point the wearer
   */

  /*
   * Figure out where center front lies.
   */
  points.cfTop = xOnWaist(store.get('hips') * options.surpassCf, part)
  points.cfBottom = new Point(points.cfTop.x, points.bottomLeft.y)

  /*
   * Construct the fly J-seam - see paths.jseam
   */
  points.jseamTop = xOnWaist(absoluteOptions.flyWidth, part)
  points.jseamBottom = new Point(0, absoluteOptions.flyLength)
  points.jseamCorner = new Point(points.jseamTop.x, points.jseamBottom.y)
  points.jseamCurveStart = new Point(points.jseamTop.x, points.jseamBottom.y - points.jseamTop.x)
  points.jseamCpTop = points.jseamCorner.shiftFractionTowards(
    points.jseamCurveStart,
    1 - options.jseamBend
  )
  points.jseamCpBottom = points.jseamCorner.shiftFractionTowards(
    points.jseamBottom,
    1 - options.jseamBend
  )

  /*
   * Construct the fly extention (fe) - see paths.seam
   */
  for (const p of [
    'jseamTop',
    'jseamBottom',
    'jseamCorner',
    'jseamCurveStart',
    'jseamCpTop',
    'jseamCpBottom',
  ])
    points[`${p}Fe`] = points[p].flipX()

  /*
   * Construct the front pocket cutout
   */
  points.frontPocketStart = xOnWaist(absoluteOptions.frontPocketOpeningStart, part)
  points.frontPocketSide = utils.beamIntersectsY(
    points.topRight,
    points.trueBottomRight,
    absoluteOptions.frontPocketOpeningDepth
  )
  points.frontPocketCorner = new Point(points.frontPocketStart.x, points.frontPocketSide.y)
  points.frontPocketCurveStart = points.frontPocketStart.rotate(-90, points.frontPocketCorner)
  points.frontPocketCpTop = points.frontPocketCorner.shiftFractionTowards(
    points.frontPocketStart,
    1 - options.frontPocketOpeningBend
  )
  points.frontPocketCpSide = points.frontPocketCorner.shiftFractionTowards(
    points.frontPocketCurveStart,
    1 - options.frontPocketOpeningBend
  )
  //  ? utils.curveIntersectsY(
  //    points.points.topLeft

  /*
   * Paths
   */

  // Center front
  paths.cf = new Path()
    .move(points.cfBottom)
    .line(points.cfTop)
    .addClass('note dashed stroke-sm')
    .addText('centerFront', 'center fill-note text-sm')

  // J-Seam
  paths.jseam = new Path()
    .move(points.jseamBottom)
    .curve(points.jseamCpBottom, points.jseamCpTop, points.jseamCurveStart)
    .line(points.jseamTop)
    .addClass('note dashed stroke-sm')
    .addText('jSeam', 'text-sm center fill-note')
  paths.flyFold = new Path()
    .move(points.jseamBottom)
    .line(points.topLeft)
    .addClass('note help stroke-sm')

  macro('banner', {
    path: paths.flyFold,
    text: 'foldHere',
    className: 'text-sm fill-note',
  })

  // Handle the split of the waitline at the pocket openinig
  paths.waist = new Path().move(points.topRight)
  if (options.waistSlant) paths.waist.curve(points.topRight, points.topCp, points.topLeft)
  else paths.waist.line(points.topLeft)
  paths.waist.addClass('hidden')
  // Store both halves for re-use
  const halves = paths.waist.split(points.frontPocketStart)

  // Seamline
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.jseamTopFe)
    .line(points.jseamCurveStartFe)
    .curve(points.jseamCpTopFe, points.jseamCpBottomFe, points.jseamBottomFe)
    .line(points.bottomLeft)
    .line(points.trueBottomRight)
    .line(points.frontPocketSide)
    .line(points.frontPocketCurveStart)
    .curve(points.frontPocketCpSide, points.frontPocketCpTop, points.frontPocketStart)
    .join(halves[1]) // join with half of the waist line

  paths.corner = new Path()
    .move(points.frontPocketSide)
    .line(points.topRight)
    .join(halves[0])
    .addClass('note dashed stroke-sm')

  paths.seam.close().addClass('fabric')

  // Complete?
  if (complete) {
    // Overwrite title from frontBase
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'frontLeft',
    })

    // Overwrite logo from frontBase
    points.logo = points.frontPocketCurveStart.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: points.topLeft.y - sa - 15,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    // macro('vd', {
    //   from: points.bottomRight,
    //   to: points.topRight,
    //   x: points.topRight.x + sa + 15,
    // })
  }

  return part
}

export const frontLeft = {
  name: 'collab:frontLeft',
  draft: draftFrontLeft,
  from: frontBase,
}
