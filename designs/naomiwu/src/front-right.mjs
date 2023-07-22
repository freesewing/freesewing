import {
  frontBase,
  xOnWaist,
  splitFrontWaist,
  drawCornerPath,
  drawSeamLine,
  drawSideNote,
  drawHemNote,
  drawPocketBag,
} from './front-base.mjs'

/*
 * This is the exported part object
 */
export const frontRight = {
  name: 'collab:frontRight', // Name in design:part format
  draft: draftFrontRight, // Method to call to draft this part
  from: frontBase, // Draft this starting from (the imported) frontBase part
}

/*
 * This function drafts the right front panel of the skirt
 *
 * Basic outline was drafted in frontBase
 * Now we adapt it for the right panel
 *
 * Note that Left/Right is always from the vantage point the wearer
 */
function draftFrontRight({
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
   * Let's mirror the entire thing
   */
  for (const p in points) points[p] = points[p].flipX()

  /*
   * We need to re-split the waist after mirroring it and re-draw paths
   */
  splitFrontWaist(part)
  paths.corner = drawCornerPath(part) // Corner
  paths.seam = drawSeamLine(part) // Seamline

  // Complete?
  if (complete) {
    /*
     * Draw various helper paths
     */
    drawPocketBag(part, true) // Pocket bage
    paths.side = drawSideNote(part) // Helper note on the side seam
    paths.hem = drawHemNote(part).reverse(true) // Helper note on the hem

    /*
     * Overwrite title from frontBase to add our own title
     */
    macro('title', {
      at: points.title,
      nr: 3,
      title: 'frontRight',
    })

    /*
     * Add the 1 notch that is on this part
     */
    snippets.notch = new Snippet('notch', points.frontPocketBagStart)

    /*
     * Add a grainline indicator
     */
    points.grainlineTop = points.topLeft.shiftFractionTowards(points.jseamTop, 0.5)
    points.grainlineBottom = new Point(points.grainlineTop.x, points.bottomLeft.y)
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
    })

    /*
     * Overwrite logo from frontBase to add our own (or rather the same in our preferred location)
     */
    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)

    /*
     * Only add SA if it's requested
     */
    if (sa) paths.sa = paths.seam.offset(-1 * sa).attr('class', 'fabric sa')
  }

  /*
   * Only add dimensions for paperless when they're requested
   */
  if (paperless) {
    macro('hd', {
      from: points.trueBottomRight,
      to: points.bottomLeft,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('hd', {
      from: points.frontPocketBagStart,
      to: points.topLeft,
      y: points.frontPocketStart.y - sa - 15,
    })
    macro('hd', {
      from: points.frontPocketStart,
      to: points.topLeft,
      y: points.frontPocketStart.y - sa - 30,
    })
    macro('hd', {
      from: points.frontPocketSide,
      to: points.frontPocketStart,
      y: points.frontPocketStart.y - sa - 15,
    })
    macro('hd', {
      from: points.frontPocketStart,
      to: points.trueBottomLeft,
      y: points.frontPocketStart.y - sa - 45,
    })
    macro('hd', {
      from: points.trueBottomRight,
      to: points.frontPocketStart,
      y: points.frontPocketStart.y - sa - 30,
    })
    macro('vd', {
      from: points.trueBottomRight,
      to: points.frontPocketSide,
      x: points.bottomRight.x - sa - 15,
    })
    macro('vd', {
      from: points.bottomLeft,
      to: points.frontPocketSide,
      x: points.bottomRight.x - sa - 30,
    })
    macro('vd', {
      from: points.bottomLeft,
      to: points.frontPocketStart,
      x: points.bottomRight.x - sa - 45,
    })
    macro('vd', {
      from: points.bottomLeft,
      to: points.topLeft,
      x: points.bottomLeft.x + sa + 15,
    })
    if (options.waistSlant) {
      macro('vd', {
        from: points.bottomLeft,
        to: points.topRight,
        x: points.bottomRight.x - sa - 60,
      })
      macro('vd', {
        from: points.bottomLeft,
        to: points.frontPocketStart,
        x: points.bottomLeft.x + sa + 30,
      })
    }
  }

  return part
}
