import { backPocket } from './back-pocket.mjs'

/*
 * This is the exported part object
 */
export const backPocketFlap = {
  name: 'collab:backPocketFlap', // The name in design::part format
  draft: draftBackPocketFlap, // The method to call to draft this part
  from: backPocket, // Draft this part starting from the (imported) `backPocket` part
}

/*
 * This function drafts the back pocket flap of the skirt
 */
function draftBackPocketFlap({
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
   * Clean up what we don't need from the backPocket part
   */
  delete paths.pocket
  macro('rmd', { id: 'height' })
  macro('rmd', { id: 'width' })

  /*
   * Draw the pocket flap
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
    .move(points.flapTopRight)
    .line(points.flapTopLeft)
    .line(points.flapBottomLeft)
    .line(points.flapBottomRight)
    .line(points.flapTopRight)
    .close()

  // Complete?
  if (complete) {
    /*
     * Add the title
     */
    points.title = points.pocketTopLeft
      .shiftFractionTowards(points.flapBottomLeft, 0.6)
      .shift(0, 20)
    macro('title', {
      at: points.title,
      nr: 11,
      title: 'backPocketFlap',
      scale: 0.7,
    })

    /*
     * Add the logo
     */
    points.logo = points.title.shift(0, 70)
    snippets.logo = new Snippet('logo', points.logo).scale(0.5)

    /*
     * Add a grainline indicator
     */
    points.grainlineBottom = points.flapBottomLeft.shift(0, 10)
    points.grainlineTop = new Point(points.grainlineBottom.x, points.flapTopRight.y)
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
    })

    /*
     * Only add SA when it's requested
     */
    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
  }

  /*
   * Only add dimensions for paperless when requested
   */
  if (paperless) {
    macro('vd', {
      id: 'leftHeight',
      from: points.flapBottomLeft,
      to: points.flapTopLeft,
      x: points.flapTopLeft.x - sa - 15,
    })
    macro('vd', {
      id: 'rightHeight',
      from: points.flapBottomRight,
      to: points.flapTopRight,
      x: points.flapTopRight.x + sa + 15,
    })
    macro('hd', {
      id: 'width',
      from: points.flapTopLeft,
      to: points.flapTopRight,
      y: points.flapTopRight.y - sa - 15,
    })
  }

  return part
}
