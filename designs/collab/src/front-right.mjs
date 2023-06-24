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
    drawPocketBag(part, true)
    paths.side = drawSideNote(part)
    paths.hem = drawHemNote(part).reverse(true)

    // Overwrite title from frontBase
    macro('title', {
      at: points.title,
      nr: 3,
      title: 'frontRight',
    })

    snippets.notch = new Snippet('notch', points.frontPocketBagStart)

    points.grainlineTop = points.topLeft.shiftFractionTowards(points.jseamTop, 0.5)
    points.grainlineBottom = new Point(points.grainlineTop.x, points.bottomLeft.y)
    macro('grainline', {
      from: points.grainlineBottom,
      to: points.grainlineTop,
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

export const frontRight = {
  name: 'collab:frontRight',
  draft: draftFrontRight,
  from: frontBase,
}
