import { frontBase, xOnWaist } from './front-base.mjs'

/*
 * This is the exported part object
 */
export const frontAttachment = {
  name: 'collab:frontAttachment', // The name in design::part format
  draft: draftFrontAttachment, // The method to call to draft this part
  from: frontBase, // Draft this part starting from the (imported) frontBase part
}

/*
 * This function drafts the front attachment of the skirt
 */
function draftFrontAttachment({
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
   * Draw the front attachment shape, or at least the part that's not
   * made out of the main materials (aka the facing)
   */
  points.waistLeft = points.topRight.shiftFractionTowards(
    points.frontPocketStart,
    options.frontAttachmentWidth
  )
  points.waistRight = points.frontPocketStart.shiftFractionTowards(points.topRight, 0.95)
  points.foldLeft = new Point(points.waistLeft.x, points.trueBottomRight.y)
  points.foldRight = new Point(points.waistRight.x, points.foldLeft.y)
  points.edgeLeft = points.foldLeft.shift(-90, points.foldLeft.y - points.frontPocketSide.y / 2)
  points.edgeRight = new Point(points.waistRight.x, points.edgeLeft.y)

  /*
   * Indicate the chamfers and fold line
   */
  points.chamferLeft = points.foldLeft.shiftFractionTowards(
    points.foldRight,
    options.frontAttachmentChamferSize
  )
  points.chamferRight = points.foldRight.shiftFractionTowards(
    points.foldLeft,
    options.frontAttachmentChamferSize
  )
  points.chamferLeftTop = points.chamferLeft.rotate(90, points.foldLeft)
  points.chamferLeftBottom = points.chamferLeft.rotate(-90, points.foldLeft)
  points.chamferRightTop = new Point(points.foldRight.x, points.chamferLeftTop.y)
  points.chamferRightBottom = new Point(points.foldRight.x, points.chamferLeftBottom.y)

  /*
   * The seam line
   */
  paths.seam = new Path()
    .move(points.waistLeft)
    .line(points.edgeLeft)
    .line(points.edgeRight)
    .line(points.waistRight)
    .line(points.waistLeft)
    .close()
    .addClass('various')

  // Clean up a bit
  delete paths.corner
  delete paths.hem
  delete paths.side
  delete paths.frontWaist
  delete paths.pocketbag
  delete paths.pocketbagBoundary
  delete paths.pocketfacingBoundary

  // Complete?
  if (complete) {
    /*
     * Add the title
     */
    points.title = points.foldLeft
      .shiftFractionTowards(points.foldRight, 0.2)
      .shift(90, points.foldLeft.y / 2)
    macro('title', {
      at: points.title,
      nr: 8,
      title: 'frontAttachment',
    })

    /*
     * Add the logo
     */
    points.logo = points.title.shift(-70, 70)
    snippets.logo = new Snippet('logo', points.logo)

    /*
     * Add the fold line
     */
    paths.fold = new Path().move(points.foldLeft).line(points.foldRight).addClass('help note')

    /*
     * Add the chamfers (the 45-degree slant at the corners of the fold)
     */
    paths.chamfer = new Path()
      .move(points.chamferLeftTop)
      .line(points.chamferLeft)
      .line(points.chamferLeftBottom)
      .move(points.chamferRightTop)
      .line(points.chamferRight)
      .line(points.chamferRightBottom)
      .addClass('note dashed stroke-sm')

    /*
     * Add a 'fold here' note
     */
    macro('banner', {
      path: paths.fold,
      text: 'foldHere',
      className: 'text-sm fill-note',
    })

    /*
     * Sprinkle some notches
     */
    macro('sprinkle', {
      snippet: 'notch',
      on: [
        'chamferLeftTop',
        'chamferLeftBottom',
        'chamferLeft',
        'chamferRightTop',
        'chamferRightBottom',
        'chamferRight',
      ],
    })

    /*
     * Only add SA when it's requested.
     * This also adds extra SA to fold under the edge.
     */
    if (sa)
      paths.sa = new Path()
        .move(points.edgeRight)
        .line(points.waistRight)
        .line(points.waistLeft)
        .line(points.edgeLeft)
        .offset(sa)
        .join(
          new Path()
            .move(points.edgeLeft)
            .line(points.edgeRight)
            .offset(3 * sa)
        )
        .close()
        .attr('class', 'various sa')
  }

  /*
   * Only add dimensions for paperless when they are requested
   */
  if (paperless) {
    macro('hd', {
      id: 'width',
      from: points.edgeLeft,
      to: points.edgeRight,
      y: points.edgeLeft.y + 3 * sa + 15,
    })
    macro('hd', {
      id: 'chamferWidth',
      from: points.foldLeft,
      to: points.chamferLeft,
      y: points.chamferLeftBottom.y + sa + 15,
    })
    macro('vd', {
      id: 'chamferHeight',
      from: points.chamferLeftBottom,
      to: points.chamferLeft,
      x: points.chamferLeft.x + 15,
    })
    macro('vd', {
      id: 'bottomLength',
      from: points.edgeRight,
      to: points.foldRight,
      x: points.edgeRight.x + sa + 15,
    })
    macro('vd', {
      id: 'topLength',
      from: points.foldRight,
      to: points.waistRight,
      x: points.edgeRight.x + sa + 15,
    })
    macro('vd', {
      id: 'length',
      from: points.edgeRight,
      to: points.waistRight,
      x: points.edgeRight.x + sa + 30,
    })
  }

  return part
}
