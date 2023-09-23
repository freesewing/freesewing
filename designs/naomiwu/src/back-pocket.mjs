import { back } from './back.mjs'

/*
 * This is the exported part object
 */
export const backPocket = {
  name: 'naomiwu.backPocket', // The name in design::part format
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
  complete,
  sa,
  snippets,
  Snippet,
  macro,
}) {
  /*
   * Clean up what we don't need from the back part
   */
  delete paths.cb
  delete paths.hem
  delete paths.hipLine
  delete paths.side
  delete paths.backSeam
  if (!complete) delete paths.flap
  delete snippets['dartLeft-bnotch']
  delete snippets['dartRight-bnotch']
  delete snippets['dartTip-bnotch']
  macro('rmad')

  /*
   * The seam line
   */
  paths.pocket.hide()
  paths.seam = paths.pocket.clone().setClass('fabric').unhide()

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

  /*
   * Annotations
   */

  // Cutlist
  store.cutlist.setCut({ cut: 2, from: 'fabric' })

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
   * Dimensions
   */
  macro('hd', {
    id: 'wChamfer',
    from: points.chamferRight,
    to: points.chamferRightTop,
    y: points.chamferLeft.y + sa + 15,
  })
  macro('hd', {
    id: 'width',
    from: points.chamferLeftTop,
    to: points.chamferRightTop,
    y: points.chamferLeft.y + sa + 30,
  })
  macro('vd', {
    id: 'hChamfer',
    from: points.chamferRight,
    to: points.chamferRightTop,
    x: points.pocketTopRight.x + sa + 15,
  })
  macro('vd', {
    id: 'height',
    from: points.chamferRight,
    to: points.pocketTopRight,
    x: points.pocketTopRight.x + sa + 30,
  })

  return part
}
