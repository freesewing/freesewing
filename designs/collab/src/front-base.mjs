import { back } from './back.mjs'

export const xOnWaist = (x, part) => {
  const { options, utils, points, Point } = part.shorthand()

  return options.waistSlant
    ? utils.curveIntersectsX(points.topLeft, points.topCp, points.topRight, points.topRight, x)
    : new Point(x, points.topLeft.y)
}

export const drawCornerPath = (part) => {
  const { Path, points, paths } = part.shorthand()

  return new Path()
    .move(points.frontPocketSide)
    .line(points.topRight)
    .join(paths.frontWaistSide)
    .addClass('note dashed stroke-sm')
}

export const drawSeamLine = (part) => {
  const { Path, points, paths } = part.shorthand()

  return new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.trueBottomRight)
    .line(points.frontPocketSide)
    .line(points.frontPocketCurveStart)
    .curve(points.frontPocketCpSide, points.frontPocketCpTop, points.frontPocketStart)
    .join(paths.frontWaistCenter)
    .close()
    .addClass('fabric')
}

export const drawSideNote = (part) => {
  const { Path, points } = part.shorthand()

  return new Path()
    .move(points.trueBottomRight)
    .line(points.topRight)
    .addClass('hidden')
    .addText('sideSeam', 'center fill-note text-sm')
    .attr('data-text-dy', -1)
}

export const drawHemNote = (part) => {
  const { Path, points } = part.shorthand()

  return new Path()
    .move(points.bottomLeft)
    .line(points.trueBottomRight)
    .addClass('hidden')
    .addText('hem', 'center fill-note text-sm')
    .attr('data-text-dy', -1)
}

export const splitFrontWaist = (part) => {
  const { paths, points, Path, options } = part.shorthand()
  // Handle the split of the waitline at the pocket openinig
  paths.frontWaist = new Path().move(points.topRight)
  if (options.waistSlant) paths.frontWaist.curve(points.topRight, points.topCp, points.topLeft)
  else paths.frontWaist.line(points.topLeft)
  paths.frontWaist.addClass('hidden')

  // Store both halves for re-use
  const halves = paths.frontWaist.split(part.points.frontPocketStart)
  paths.frontWaistSide = halves[0].hide()
  paths.frontWaistCenter = halves[1].hide()
}

function draftFrontBase({
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
  // Simple skirt outline for the front panel
  points.topLeft = new Point(0, 0)
  points.topCp = new Point(store.get('frontQuarterHips') / 2, 0)
  points.topRight = new Point(store.get('frontQuarterHips'), absoluteOptions.waistSlant * -1)
  points.bottomLeft = new Point(
    0,
    points.topRight.y + store.get('hipsToUpperLeg') - absoluteOptions.waistbandWidth
  )
  points.bottomRight = new Point(store.get('frontQuarterSeat'), points.bottomLeft.y)

  /*
   * If there's darts at the back, we need to reduce the front hem length
   * because we lengthened the back hem to keep the skirt balanced
   */
  if (store.get('darts')) {
    points.bottomRight = points.bottomRight.shift(180, absoluteOptions.dartWidth)
  }

  // True the side seam
  points.trueBottomRight = points.topRight.shiftTowards(points.bottomRight, store.get('sideSeam'))
  points.trueBottomLeft = new Point(0, points.trueBottomRight.y)

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

  // Paths
  splitFrontWaist(part) // Handle the split of the waitline at the pocket openinig
  paths.seam = drawSeamLine(part) // Seamline
  paths.corner = drawCornerPath(part) // Pocket corner

  // Complete?
  if (complete) {
    points.logo = points.topLeft
      .shiftFractionTowards(points.bottomLeft, 0.3)
      .shift(0, points.topRight.x / 3)
    snippets.logo = new Snippet('logo', points.logo)

    points.title = points.logo.shift(-90, 70)
    macro('title', {
      at: points.title,
      nr: '0',
      title: 'frontBase',
    })

    paths.side = drawSideNote(part)
    paths.hem = drawHemNote(part)
    points.topRight
      .addText('attachWaistband', 'fill-note right text-sm')
      .attr('data-text-dy', 8)
      .attr('data-text-dx', -8)
    points.topLeft
      .addText('attachWaistband', 'fill-note left text-sm')
      .attr('data-text-dy', 8)
      .attr('data-text-dx', 8)

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  return part
}

export const frontBase = {
  name: 'collab:frontBase',
  draft: draftFrontBase,
  hide: { self: true },
  after: back,
}
