import { backAttachmentFront } from './back-attachment-back.mjs'

/*
 * This is the exported part object
 */
export const backAttachmentSide = {
  name: 'collab:backAttachmentSide', // The name in design::part format
  draft: draftBackAttachmentSide, // The method to call to draft this part
  from: backAttachmentFront, // Draft this part starting from the (imported) `backAttachmentFront` part
}

/*
 * This function drafts the front of the back attachment of the skirt
 */
function draftBackAttachmentFront({
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
   * Clear up what we don't need from the backAttachmentBack part
   */
  delete paths.frontEdge

  /*
   * The seam line
   */
  paths.seam = new Path()
    .move(points.frontLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.frontRight)
    .line(points.frontLeft)
    .close()
    .addClass('fabric')

  // Complete?
  if (complete) {
    /*
     * Add the title
     */
    macro('title', {
      at: points.title,
      nr: 13,
      title: 'backAttachmentFront',
    })

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
      to: points.frontRight,
      x: points.topRight.x + sa + 15,
    })
  }

  return part
}
