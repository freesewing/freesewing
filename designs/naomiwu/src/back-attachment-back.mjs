import { waistband } from './waistband.mjs'

/*
 * This is the exported part object
 */
export const backAttachmentBack = {
  name: 'naomiwu.backAttachmentBack', // The name in design::part format
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
  options,
  complete,
  sa,
  snippets,
  Snippet,
  macro,
  expand,
  units,
  absoluteOptions,
}) {
  const width = absoluteOptions.backAttachmentWidth
  const height = width * options.backAttachmentDepth

  /*
   * Draw the back of the back attachment shape
   */
  points.topLeft = new Point(0, 0)
  points.topRight = new Point(width, 0)
  points.bottomLeft = new Point(0, height)
  points.bottomRight = new Point(width, height)

  /*
   * Add points to mark the edge of the attachment's front
   * Even if expand is off, we need these in other parts
   */
  points.frontLeft = points.topLeft.shiftFractionTowards(points.bottomLeft, 0.22)
  points.frontRight = new Point(points.topRight.x, points.frontLeft.y)

  /*
   * We allow the user to control the back attachment, but warn them when it's
   * too wide to fit between the belt loops, because that is inconvenient.
   */
  if (absoluteOptions.backAttachmentWidth > store.get('backAttachmentMaxWidth')) {
    store.flag.warn({
      msg: 'naomiwu:backAttachmentTooWide',
      replace: {
        delta: units(absoluteOptions.backAttachmentWidth - store.get('backAttachmentMaxWidth')),
      },
      suggest: {
        text: 'flag:decrease',
        icon: 'down',
        update: {
          settings: ['options.backAttachmentWidth', options.backAttachmentWidth * 0.9],
        },
      },
    })
  }

  if (expand) {
    store.flag.preset('expandIsOn')
  } else {
    // Expand is off, do not draw the part but flag this to the user
    store.flag.note({
      msg: `naomiwu:cutBackAttachmentBack`,
      replace: {
        width: units(width + 2 * sa),
        length: units(height + 2 * sa),
      },
      suggest: {
        text: 'flag:show',
        icon: 'expand',
        update: {
          settings: ['expand', 1],
        },
      },
    })
    // Also hint about expand
    store.flag.preset('expandIsOff')

    return part.hide()
  }

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

  /*
   * Add the front edge line
   */
  if (complete)
    paths.frontEdge = new Path()
      .move(points.frontLeft)
      .line(points.frontRight)
      .addClass('note stroke-sm dashed')

  /*
   * Only add SA when it's requested.
   * This also adds extra SA to fold under the edge.
   */
  if (sa) paths.sa = paths.seam.offset(sa).addClass('fabric sa')

  /*
   * Annotations
   */
  // Cutlist
  store.cutlist.setCut({ cut: 1, from: 'fabric' })

  /*
   * Add the title
   */
  points.title = points.frontLeft.shiftFractionTowards(points.bottomRight, 0.5)
  macro('title', {
    at: points.title,
    nr: 12,
    title: 'backAttachmentBack',
    align: 'center',
    scale: 0.666,
  })

  /*
   * Add the logo
   */
  points.logo = points.title.shift(90, 65)
  snippets.logo = new Snippet('logo', points.logo).scale(0.5)

  /*
   * Dimensions
   */
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

  return part
}
