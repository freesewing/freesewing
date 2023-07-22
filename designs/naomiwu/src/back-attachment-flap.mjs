import { backAttachmentFront } from './back-attachment-front.mjs'

/*
 * This is the exported part object
 */
export const backAttachmentFlap = {
  name: 'collab:backAttachmentFlap', // The name in design::part format
  draft: draftBackAttachmentFlap, // The method to call to draft this part
  from: backAttachmentFront, // Draft this part starting from the (imported) `backAttachmentBack` part
}

/*
 * This function drafts the flap of the back attachment of the skirt
 */
function draftBackAttachmentFlap({
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
   * Shorten the bottom
   */
  points.bottomLeft = new Point(
    points.topLeft.x,
    points.velcroBottomLeft.y + points.velcroBottomLeft.dx(points.velcroBottomRight)
  )
  points.bottomRight = new Point(points.topRight.x, points.bottomLeft.y)

  /*
   * Add chamfer
   */
  const size = points.frontRight.x * options.backAttachmentFlapChamferSize
  points.chamferLeftTop = points.bottomLeft.shift(90, size)
  points.chamferLeftBottom = points.bottomLeft.shift(0, size)
  points.chamferRightTop = points.bottomRight.shift(90, size)
  points.chamferRightBottom = points.bottomRight.shift(180, size)

  /*
   * Extend the velcro strip
   */
  points.velcroBottomLeft = new Point(points.velcroBottomLeft.x, points.bottomLeft.y * 0.92)
  points.velcroBottomRight = new Point(points.velcroBottomRight.x, points.velcroBottomLeft.y)

  /*
   * The seam line
   */
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.chamferLeftTop)
    .line(points.chamferLeftBottom)
    .line(points.chamferRightBottom)
    .line(points.chamferRightTop)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .addClass('fabric')

  // Complete?
  if (complete) {
    /*
     * Add the title
     */
    points.title = points.topLeft.shift(-90, 25).shift(0, 10)
    macro('title', {
      at: points.title,
      nr: 14,
      title: 'backAttachmentFlap',
      scale: 0.5,
    })

    /*
     * Add the logo
     */
    points.logo = points.title.shift(-90, 30)
    snippets.logo = new Snippet('logo', points.logo).scale(0.333)

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
    if (sa) paths.sa = paths.seam.offset(sa).close().addClass('fabric sa')
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
    macro('hd', {
      id: 'chamferWidth',
      from: points.chamferRightBottom,
      to: points.chamferRightTop,
      y: points.chamferRightTop.y - 15,
    })
  }

  return part
}
