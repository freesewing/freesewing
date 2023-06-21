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
   * Basic outline was drafted in frontBase
   * Now we adapt it for the left panel
   * Left/Right is always from the vantage point the wearer
   */

  // Let's mirror the entire thing
  for (const p in points) points[p] = points[p].flipX()

  // We need to re-split the waist after mirroring it and re-draw paths
  splitFrontWaist(part)
  paths.corner = drawCornerPath(part) // Corner
  paths.seam = drawSeamLine(part) // Seamline

  // Complete?
  if (complete) {
    drawPocketBag(part)
    paths.side = drawSideNote(part)
    paths.hem = drawHemNote(part).reverse(true)

    // Overwrite title from frontBase
    macro('title', {
      at: points.title,
      nr: 3,
      title: 'frontRight',
    })

    // Overwrite logo from frontBase
    points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    snippets.logo = new Snippet('logo', points.logo)
    if (sa) {
      paths.sa = paths.seam.offset(-1 * sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.topLeft,
      to: points.topRight,
      y: points.topLeft.y - sa - 15,
    })
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    // macro('vd', {
    //   from: points.bottomRight,
    //   to: points.topRight,
    //   x: points.topRight.x + sa + 15,
    // })
  }

  return part
}

export const frontRight = {
  name: 'collab:frontRight',
  draft: draftFrontRight,
  from: frontBase,
}
