import { backAttachmentBack } from './back-attachment-back.mjs'

/*
 * This is the exported part object
 */
export const backAttachmentFront = {
  name: 'collab:backAttachmentFront', // The name in design::part format
  draft: draftBackAttachmentFront, // The method to call to draft this part
  from: backAttachmentBack, // Draft this part starting from the (imported) `backAttachmentBack` part
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
   * Add points for the velcro strip
   */
  points.velcroTopLeft = points.frontLeft
    .shiftFractionTowards(points.frontRight, 0.4)
    .shift(-90, points.frontRight.x / 10)
  points.velcroTopRight = points.frontRight
    .shiftFractionTowards(points.frontLeft, 0.4)
    .shift(-90, points.frontRight.x / 10)
  points.velcroBottomLeft = points.velcroTopLeft.shift(-90, points.frontRight.x / 3)
  points.velcroBottomRight = points.velcroTopRight.shift(-90, points.frontRight.x / 3)

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
     * Mark the velcro strip
     */
    paths.velcro = new Path()
      .move(points.velcroTopLeft)
      .line(points.velcroBottomLeft)
      .line(points.velcroBottomRight)
      .line(points.velcroTopRight)
      .line(points.velcroTopLeft)
      .close()
      .addClass('note stroke-sm dashed')
    macro('banner', {
      path: paths.velcro,
      text: 'velcro',
      className: 'fill-note text-xs',
      spaces: 2,
    })

    /*
     * Only add SA when it's requested.
     * This also adds extra SA to fold under the edge.
     */
    if (sa)
      paths.sa = new Path()
        .move(points.frontLeft)
        .line(points.bottomLeft)
        .line(points.bottomRight)
        .line(points.frontRight)
        .offset(sa)
        .join(
          new Path()
            .move(points.frontRight)
            .line(points.frontLeft)
            .offset(3 * sa)
        )
        .close()
        .addClass('fabric sa')
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
