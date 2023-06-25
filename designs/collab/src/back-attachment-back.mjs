import { waistband } from './waistband.mjs'

/*
 * This is the exported part object
 */
export const backAttachmentBack = {
  name: 'collab:backAttachmentBack', // The name in design::part format
  draft: draftBackAttachmentBack, // The method to call to draft this part
  after: waistband, // Ensure this is drafted after the (imported) waistband part
}

/*
 * This function drafts the back of the back attachment of the skirt
 */
function draftBackAttachmentBack({
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
  log,
  utils,
}) {
  /*
   * We allow the user to control the back attachment, but warn them when it's
   * too wide to fit between the belt loops, because that is inconvenient.
   */
  if (absoluteOptions.backAttachmentWidth > store.get('backAttachmentMaxWidth')) {
    log.warning('backAttachmentIsWiderThanSpaceBetweenBeltloops')
  }

  /*
   * Draw the back of the back attachment shape
   */
  points.topLeft = new Point(0, 0)
  points.topRight = new Point(absoluteOptions.backAttachmentWidth, 0)
  points.bottomLeft = new Point(0, points.topRight.x * options.backAttachmentDepth)
  points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)

  /*
   * Add points to mark the edge of the attachment's front
   */
  points.frontLeft = points.topLeft.shiftFractionTowards(points.bottomLeft, 0.22)
  points.frontRight = new Point(points.topRight.x, points.frontLeft.y)

  /*
   * The seam line
   */
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .addClass('fabric')

  // Complete?
  if (complete) {
    /*
     * Add the title
     */
    points.title = points.frontLeft.shiftFractionTowards(points.bottomLeft, 0.4).shift(0, 5)
    macro('title', {
      at: points.title,
      nr: 12,
      title: 'backAttachmentBack',
    })

    /*
     * Add the logo
     */
    points.logo = points.title.shift(-70, 50)
    snippets.logo = new Snippet('logo', points.logo).scale(0.5)

    /*
     * Add the front edge line
     */
    paths.frontEdge = new Path()
      .move(points.frontLeft)
      .line(points.frontRight)
      .addClass('note stroke-sm dashed')

    /*
     * Only add SA when it's requested.
     * This also adds extra SA to fold under the edge.
     */
    if (sa) paths.sa = paths.seam.offset(sa).addClass('fabric sa')
  }

  /*
   * Only add dimensions for paperless when they are requested
   */
  if (paperless) {
    macro('hd', {
      id: 'width',
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('vd', {
      id: 'length',
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
  }

  return part
}
