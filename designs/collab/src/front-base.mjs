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

export const drawPocketBag = (part, reverse) => {
  const { paths, Path, points } = part.shorthand()

  paths.pocketbag = new Path()
    .move(points.frontPocketBagStart)
    .line(points.frontPocketBagHem)
    .addClass('note dashed stroke-sm')
  paths.pocketfacingBoundary = new Path()
    .move(reverse ? points.frontPocketFacingSide : points.frontPocketFacingCenter)
    .line(reverse ? points.frontPocketFacingCenter : points.frontPocketFacingSide)
    .addClass('note dashed stroke-sm')
    .addText('pocketFacing', 'fill-note center text-sm')
  paths.pocketbagBoundary = new Path()
    .move(reverse ? points.frontPocketFacingSide : points.frontPocketFacingCenter)
    .line(reverse ? points.frontPocketFacingCenter : points.frontPocketFacingSide)
    .addClass('hidden')
    .addText('pocketBag', 'fill-note center text-sm')
    .attr('data-text-dy', 6)
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
  // How much shaping should we add in the panel?
  const shaping = store.get('hipsQuarterReduction')

  // Simple skirt outline for the front panel
  points.topLeft = new Point(shaping / 2, 0)
  points.topCp = new Point(store.get('frontQuarterHips') / 2, 0)
  points.topRight = new Point(
    points.topLeft.x + store.get('frontQuarterHips'),
    absoluteOptions.waistSlant * -1
  )
  points.bottomLeft = new Point(0, points.topRight.y + absoluteOptions.length)
  points.bottomRight = new Point(store.get('frontQuarterSeat'), points.bottomLeft.y)

  // True the side seam
  points.trueBottomRight = points.topRight.shiftTowards(points.bottomRight, store.get('sideSeam'))
  points.trueBottomLeft = new Point(0, points.trueBottomRight.y)

  /*
   * Construct the fly J-seam - see paths.jseam
   */
  points.jseamTop = xOnWaist(points.topLeft.x + absoluteOptions.flyWidth, part)
  points.jseamBottom = points.topLeft.shiftTowards(points.bottomLeft, absoluteOptions.flyLength)
  points.jseamCorner = points.jseamBottom
    .shiftTowards(points.topLeft, absoluteOptions.flyWidth)
    .rotate(-90, points.jseamBottom)
  points.jseamCurveStart = points.jseamCorner.shiftTowards(
    points.jseamTop,
    absoluteOptions.flyWidth
  )
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
  macro('mirror', {
    clone: true,
    mirror: [points.jseamBottom, points.topLeft],
    points: [
      'jseamTop',
      'jseamBottom',
      'jseamCorner',
      'jseamCurveStart',
      'jseamCpTop',
      'jseamCpBottom',
    ],
    nameFormat: (name) => `${name}Fe`, //Fe = Fly extension
  })

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

  /*
   * Front pocket bag/facing outline
   */
  points.frontPocketBagStart = points.frontPocketStart.shiftFractionTowards(points.jseamTop, 0.4)
  points.frontPocketBagHem = new Point(points.frontPocketBagStart.x, points.bottomRight.y)
  points.frontPocketFacingSide = points.frontPocketSide.shiftFractionTowards(points.topRight, -0.4)
  points.frontPocketFacingCenter = new Point(
    points.frontPocketBagStart.x,
    points.frontPocketFacingSide.y
  )

  // Paths
  splitFrontWaist(part) // Handle the split of the waitline at the pocket openinig
  paths.seam = drawSeamLine(part) // Seamline

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

    paths.corner = drawCornerPath(part) // Pocket corner
    drawPocketBag(part)
    paths.side = drawSideNote(part)
    paths.hem = drawHemNote(part)

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
