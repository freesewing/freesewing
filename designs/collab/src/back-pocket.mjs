import { back } from './back.mjs'

/*
 * This is the exported part object
 */
export const backPocket = {
  name: 'collab:backPocket', // The name in design::part format
  draft: draftBackPocket, // The method to call to draft this part
  from: back, // Draft this part starting from the (imported) `back` part
}

/*
 * This function drafts the back pocket of the skirt
 */
function draftBackPocket({
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
   * Clean up what we don't need from the back part
   */
  delete paths.cb
  delete paths.hem
  delete paths.hipLine
  delete paths.side
  delete paths.backSeam
  delete snippets['dartLeft-bnotch']
  delete snippets['dartRight-bnotch']
  delete snippets['dartTip-bnotch']
  macro('rmd', { id: 'topLeftToDartWidth' })
  macro('rmd', { id: 'topRightToDartWidth' })
  macro('rmd', { id: 'bottomLeftToTopWidth' })
  macro('rmd', { id: 'topWidth' })
  macro('rmd', { id: 'dartWidth' })
  macro('rmd', { id: 'dartLength' })
  macro('rmd', { id: 'rightHeight' })
  macro('rmd', { id: 'bottomWidth' })
  macro('rmd', { id: 'topLeftToBottomWidth' })

  /*
   * Draw the pocket
   */
  points.waistCenter = points.topLeft.shiftFractionTowards(points.topRight, 0.5)
  points.hemCenter = new Point(points.waistCenter.x, points.bottomRight.y)
  points.pocketBottomRight = points.hemCenter.shiftFractionTowards(points.bottomRight, 0.75)
  points.pocketBottomLeft = points.hemCenter.shiftFractionTowards(points.bottomRight, -0.75)
  points.pocketTopRight = points.pocketBottomRight.shift(
    -90,
    points.pocketBottomRight.dy(points.topRight) * options.backPocketHeight
  )
  points.pocketTopLeft = new Point(points.pocketBottomLeft.x, points.pocketTopRight.y)

  /*
   * Chamfer corners
   */
  points.chamferLeft = points.pocketBottomLeft.shiftFractionTowards(
    points.pocketBottomRight,
    options.backPocketChamferSize
  )
  points.chamferRight = points.pocketBottomRight.shiftFractionTowards(
    points.pocketBottomLeft,
    options.backPocketChamferSize
  )
  points.chamferLeftTop = points.chamferLeft.rotate(90, points.pocketBottomLeft)
  points.chamferRightTop = new Point(points.pocketBottomRight.x, points.chamferLeftTop.y)

  /*
   * Draw the pocket flap outline
   */
  points.flapTopLeft = points.pocketTopRight.shiftFractionTowards(points.pocketTopLeft, 1.02)
  points.flapTopRight = points.pocketTopLeft.shiftFractionTowards(points.pocketTopRight, 1.02)
  points.flapBottomLeft = points.flapTopLeft.shift(
    -90,
    points.flapTopLeft.dy(points.pocketBottomLeft) / 3
  )
  points.flapBottomRight = points.flapTopRight.shift(
    -90,
    points.flapTopLeft.dy(points.pocketBottomLeft) / 4
  )

  /*
   * The seam line
   */
  paths.seam = new Path()
    .move(points.pocketTopLeft)
    .line(points.chamferLeftTop)
    .line(points.chamferLeft)
    .line(points.chamferRight)
    .line(points.chamferRightTop)
    .line(points.pocketTopRight)
    .line(points.pocketTopLeft)
    .close()
    .addClass('fabric')

  // Complete?
  if (complete) {
    /*
     * Add the title
     */
    points.title = points.pocketTopLeft.shiftFractionTowards(points.chamferLeft, 0.5)
    macro('title', {
      at: points.title,
      nr: 10,
      title: 'backPocket',
    })

    /*
     * Add the logo
     */
    points.logo = points.title.shift(20, 80)
    snippets.logo = new Snippet('logo', points.logo).scale(0.5)

    /*
     * Add the grainline indicator
     */
    points.grainlineBottom = points.chamferRight.shiftFractionTowards(points.chamferLeft, 0.1)
    points.grainlineTop = new Point(points.grainlineBottom.x, points.pocketTopRight.y)
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
    })

    /*
     * Only add SA when it's requested.
     * This also adds extra SA to fold under the edge.
     */
    if (sa)
      paths.sa = new Path()
        .move(points.pocketTopLeft)
        .line(points.chamferLeftTop)
        .line(points.chamferLeft)
        .line(points.chamferRight)
        .line(points.chamferRightTop)
        .line(points.pocketTopRight)
        .offset(sa)
        .join(
          new Path()
            .move(points.pocketTopRight)
            .line(points.pocketTopLeft)
            .offset(3 * sa)
        )
        .close()
        .attr('class', 'fabric sa')
  }

  /*
   * Only add dimensions for paperless when they are requested
   */
  if (paperless) {
    macro('hd', {
      id: 'width',
      from: points.chamferLeftTop,
      to: points.chamferRightTop,
      y: points.chamferLeft.y + sa + 15,
    })
    macro('vd', {
      id: 'height',
      from: points.chamferRight,
      to: points.pocketTopRight,
      x: points.pocketTopRight.x + sa + 15,
    })
  }

  return part
}
