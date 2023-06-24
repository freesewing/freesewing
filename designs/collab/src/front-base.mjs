import { back } from './back.mjs'

/*
 * This is the exported part object
 */
export const frontBase = {
  name: 'collab:frontBase', // The name in design::part format
  draft: draftFrontBase, // The method to call to draft this part
  hide: { self: true }, // This part is hidden by default
  after: back, // Draw the (imported) back part prior to drafting this part
}

/*
 * A helper method to find a point on the (potentially curved) waistline for a
 * given X coordinate
 *
 * @param {x} number - The X-coordinate to find the intersection with the waist
 * for
 * @return {point} Point - A Point object that lies at the intersection of the
 * waist with x
 */
export const xOnWaist = (x, part) => {
  const { options, utils, points, Point } = part.shorthand()

  return options.waistSlant
    ? utils.curveIntersectsX(points.topLeft, points.topCp, points.topRight, points.topRight, x)
    : new Point(x, points.topLeft.y)
}

/*
 * A helper method to draw the corner of the front where the pocket goes
 *
 * This is abstracted into a method because we need to draft two fronts that
 * are mirror images of one another. If we mirror them, the entire path will be
 * mirrored, including text and so on.  So this method allows us to mirror
 * first, then call this method again to draw the non-mirrored path using the
 * mirrored points, which is what we want.
 *
 * @param {part} Part - The current part object
 *
 * @return {path} Path - The path object that was drawn
 */
export const drawCornerPath = (part) => {
  const { Path, points, paths } = part.shorthand()

  return new Path()
    .move(points.frontPocketSide)
    .line(points.topRight)
    .join(paths.frontWaistSide)
    .addClass('note dashed stroke-sm')
}

/*
 * A helper method to draw the corner of the front where the pocket goes
 *
 * This is abstracted into a method because we need to draft two fronts that
 * are mirror images of one another. If we mirror them, the entire path will be
 * mirrored, including text and so on.  So this method allows us to mirror
 * first, then call this method again to draw the non-mirrored path using the
 * mirrored points, which is what we want.
 *
 * @param {part} Part - The current part object
 *
 * @return {path} Path - The path object that was drawn
 */
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

/*
 * A helper method to draw a note on the side seam
 *
 * This is abstracted into a method because we need to draft two fronts that
 * are mirror images of one another. If we mirror them, the entire path will be
 * mirrored, including text and so on.  So this method allows us to mirror
 * first, then call this method again to draw the non-mirrored path using the
 * mirrored points, which is what we want.
 *
 * @param {part} Part - The current part object
 *
 * @return {path} Path - The path object that was drawn
 */
export const drawSideNote = (part) => {
  const { Path, points } = part.shorthand()

  return new Path()
    .move(points.trueBottomRight)
    .line(points.topRight)
    .addClass('hidden')
    .addText('sideSeam', 'center fill-note text-sm')
    .attr('data-text-dy', -1)
}

/*
 * A helper method to draw a note on the hem seam
 *
 * This is abstracted into a method because we need to draft two fronts that
 * are mirror images of one another. If we mirror them, the entire path will be
 * mirrored, including text and so on.  So this method allows us to mirror
 * first, then call this method again to draw the non-mirrored path using the
 * mirrored points, which is what we want.
 *
 * @param {part} Part - The current part object
 *
 * @return {path} Path - The path object that was drawn
 */
export const drawHemNote = (part) => {
  const { Path, points } = part.shorthand()

  return new Path()
    .move(points.bottomLeft)
    .line(points.trueBottomRight)
    .addClass('hidden')
    .addText('hem', 'center fill-note text-sm')
    .attr('data-text-dy', -1)
}

/*
 * A helper method to draw a the pocket outline
 *
 * This is abstracted into a method because we need to draft two fronts that
 * are mirror images of one another. If we mirror them, the entire path will be
 * mirrored, including text and so on.  So this method allows us to mirror
 * first, then call this method again to draw the non-mirrored path using the
 * mirrored points, which is what we want.
 *
 * @param {part} Part - The current part object
 * @param {reverse} bool - Indicates whether we are drawing the reversed version or not
 *
 * @return {path} Path - The path object that was drawn
 */
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

/*
 * A helper method to split the front waist at the point the pocket cutout starts
 *
 * Does not return, but mutates the part object
 *
 * @param {part} Part - The current part object
 */
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

/*
 * This function drafts the back panel of the skirt
 */
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
  /*
   * How much shaping should we add in the panel?
   */
  const shaping = store.get('hipsQuarterReduction')

  /*
   * Simple skirt outline for the front panel
   */
  points.topLeft = new Point(shaping / 2, 0)
  points.topCp = new Point(store.get('frontQuarterHips') / 2, 0)
  points.topRight = new Point(
    points.topLeft.x + store.get('frontQuarterHips'),
    absoluteOptions.waistSlant * -1
  )
  points.bottomLeft = new Point(0, points.topRight.y + absoluteOptions.length)
  points.bottomRight = new Point(store.get('frontQuarterSeat'), points.bottomLeft.y)

  /*
   * Store the waist length so we can accurately notch the waistband
   */
  store.set(
    'frontHipLength',
    options.waistSlant
      ? new Path().move(points.topLeft).curve_(points.topCp, points.topRight).length()
      : points.topLeft.dx(points.topRight)
  )

  /*
   * True the side seam
   */
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

  /*
   * Paths
   */
  splitFrontWaist(part) // Handle the split of the waitline at the pocket openinig
  paths.seam = drawSeamLine(part) // Seamline

  // Complete?
  if (complete) {
    /*
     * Add the logo
     */
    points.logo = points.topLeft
      .shiftFractionTowards(points.bottomLeft, 0.3)
      .shift(0, points.topRight.x / 3)
    snippets.logo = new Snippet('logo', points.logo)

    /*
     * Add the title
     */
    points.title = points.logo.shift(-90, 70)
    macro('title', {
      at: points.title,
      nr: '0',
      title: 'frontBase',
    })

    /*
     * Add various helper paths
     */
    paths.corner = drawCornerPath(part) // Pocket corner
    drawPocketBag(part) // Pocket bag
    paths.side = drawSideNote(part) // Note on side seam
    paths.hem = drawHemNote(part) // Note on hem

    /*
     * Add seam allowance only if requested
     */
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }

  return part
}
