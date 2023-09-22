import {
  frontBase,
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
/*
 * This function drafts the front panel of the skirt without the fly on it
 * Whether that ends up being the right or left panel depends on the
 * 'invertFly' option.
 * By default, this is the right panel, if the option is truthy, this becomes
 * the right panel.
 *
 * Basic outline was drafted in frontBase
 *
 * Note that Left/Right is always from the vantage point the wearer
 */
export const frontNoFlySide = {
  name: 'naomiwu.frontNoFlySide', // Name in design:part format
  draft: draftFrontNoFlySide, // Method to call to draft this part
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
function draftFrontNoFlySide({
  Point,
  points,
  paths,
  store,
  part,
  options,
  complete,
  sa,
  snippets,
  Snippet,
  macro,
}) {
  /*
   * Let's mirror the entire thing, unless the user wants the fly side inverted
   * In that case, we already have it the way it should be.
   */
  if (!options.invertFly) {
    for (const p in points) points[p] = points[p].flipX()

    /*
     * We need to re-split the waist after mirroring it and re-draw paths
     */
    splitFrontWaist(part)
    paths.corner = drawCornerPath(part) // Corner
    paths.seam = drawSeamLine(part) // Seamline
  }

  /*
   * Only add SA if it's requested
   */
  if (sa) paths.sa = paths.seam.offset(-1 * sa).attr('class', 'fabric sa')

  /*
   * If the user wants a complete pattern, let's add some more guidance
   */
  if (complete) {
    /*
     * Draw various helper paths
     */
    drawPocketBag(part, true) // Pocket bage
    paths.side = drawSideNote(part) // Helper note on the side seam
    paths.hem = drawHemNote(part).reverse(true) // Helper note on the hem
  }

  /*
   * Annotations
   */

  // Cutlist
  store.cutlist.setCut({ cut: 1, from: 'fabric' })

  /*
   * Overwrite title from frontBase to add our own title
   */
  macro('rmtitle')
  macro('title', {
    at: points.title,
    nr: 3,
    title: options.invertFly ? 'frontNoFlySideLeft' : 'frontNoFlySideRight',
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
   * Dimensions
   */
  macro('hd', {
    id: 'wAtHem',
    from: points.trueBottomRight,
    to: points.bottomLeft,
    y: points.bottomLeft.y + sa + 15,
  })
  macro('hd', {
    id: 'wPocketNotchToCfront',
    from: points.frontPocketBagStart,
    to: points.topLeft,
    y: points.frontPocketStart.y - sa - 15,
  })
  macro('hd', {
    id: 'wPocketCutoutToCfront',
    from: points.frontPocketStart,
    to: points.topLeft,
    y: points.frontPocketStart.y - sa - 30,
  })
  macro('hd', {
    id: 'wPocketCutout',
    from: points.frontPocketSide,
    to: points.frontPocketStart,
    y: points.frontPocketStart.y - sa - 15,
  })
  macro('hd', {
    id: 'wPocketCutoutToCfHem',
    from: points.frontPocketStart,
    to: points.trueBottomLeft,
    y: points.frontPocketStart.y - sa - 45,
  })
  macro('hd', {
    id: 'wSideHemToStartPocketCutout',
    from: points.trueBottomRight,
    to: points.frontPocketStart,
    y: points.frontPocketStart.y - sa - 30,
  })
  macro('vd', {
    id: 'hSideHemToPocketCutout',
    from: points.trueBottomRight,
    to: points.frontPocketSide,
    x: points.bottomRight.x - sa - 15,
  })
  macro('vd', {
    id: 'hHemBottomToPocketCutout',
    from: points.bottomLeft,
    to: points.frontPocketSide,
    x: points.bottomRight.x - sa - 30,
  })
  macro('vd', {
    id: 'hCfHemToPoketStart',
    from: points.bottomLeft,
    to: points.frontPocketStart,
    x: points.bottomRight.x - sa - 45,
  })
  macro('vd', {
    from: points.bottomLeft,
    id: 'hTopLeftBottomLeft',
    to: points.topLeft,
    x: points.bottomLeft.x + sa + 15,
  })
  if (options.waistSlant) {
    macro('vd', {
      id: 'hFullWithSlant',
      from: points.bottomLeft,
      to: points.topRight,
      x: points.bottomRight.x - sa - 60,
    })
    macro('vd', {
      id: 'hWithSlantCfront',
      from: points.bottomLeft,
      to: points.frontPocketStart,
      x: points.bottomLeft.x + sa + 30,
    })
  }

  return part
}
