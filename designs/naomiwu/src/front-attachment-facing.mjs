import { frontAttachment } from './front-attachment.mjs'

/*
 * This is the exported part object
 */
export const frontAttachmentFacing = {
  name: 'naomiwu.frontAttachmentFacing', // The name in design::part format
  draft: draftFrontAttachmentFacing, // The method to call to draft this part
  from: frontAttachment, // Draft this part starting from the (imported) frontAttachment part
}

/*
 * This function drafts the front attachment facing of the skirt
 */
function draftFrontAttachmentFacing({
  Point,
  points,
  Path,
  paths,
  part,
  store,
  options,
  sa,
  snippets,
  Snippet,
  macro,
}) {
  /*
   * Adapt shape from the front attachment main shape
   */
  points.waistLeft = points.topRight.shiftFractionTowards(
    points.frontPocketStart,
    options.frontAttachmentWidth
  )
  points.waistRight = points.frontPocketStart.shiftFractionTowards(points.topRight, 0.95)
  points.startLeft = new Point(points.waistLeft.x, points.frontPocketCurveStart.y)
  points.startRight = new Point(points.waistRight.x, points.frontPocketCurveStart.y)
  points.edgeLeft = points.foldLeft.shiftFractionTowards(points.startLeft, -0.4)
  points.edgeRight = new Point(points.waistRight.x, points.edgeLeft.y)

  /*
   * The seam line
   */
  paths.seam = new Path()
    .move(points.startLeft)
    .line(points.edgeLeft)
    .line(points.edgeRight)
    .line(points.startRight)
    .line(points.startLeft)
    .close()

  /*
   * Only add SA when it's requested.
   * This also adds extra SA to fold under the edge.
   */
  if (sa)
    paths.sa = new Path()
      .move(points.startLeft)
      .line(points.edgeLeft)
      .line(points.edgeRight)
      .line(points.startRight)
      .offset(sa)
      .join(
        new Path()
          .move(points.startRight)
          .line(points.startLeft)
          .offset(3 * sa)
      )
      .close()
      .addClass('fabric sa')

  /*
   * Annotations
   */

  // Cutlist
  store.cutlist.setCut({ cut: 1, from: 'fabric' })

  /*
   * Add the title
   */
  points.title = points.waistLeft
    .shiftFractionTowards(points.waistRight, 0.1)
    .shift(-90, points.foldRight.y / 1.5)
  macro('title', {
    at: points.title,
    nr: 9,
    title: 'frontAttachmentFacing',
  })

  /*
   * Add the logo
   */
  points.logo = points.title.shift(-70, 70)
  snippets.logo = new Snippet('logo', points.logo).scale(0.666)

  /*
   * Dimensions
   */
  macro('hd', {
    id: 'width',
    from: points.edgeLeft,
    to: points.edgeRight,
    y: points.edgeLeft.y + sa + 15,
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
    to: points.startRight,
    x: points.edgeRight.x + sa + 15,
  })
  macro('vd', {
    id: 'length',
    from: points.edgeRight,
    to: points.startRight,
    x: points.edgeRight.x + sa + 30,
  })

  return part
}
