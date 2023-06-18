import { frontBase, xOnWaist } from './front-base.mjs'

function draftFrontLeft({
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
}) {
  /*
   * Basic outline was drafted in frontBase
   * Now we adapt it for the left panel
   * Left/Right is always from the vantage point the wearer
   */

  /*
   * Figure out where center front lies.
   */
  points.cfTop = xOnWaist(store.get('hips') * options.surpassCf, part)
  points.cfBottom = new Point(points.cfTop.x, points.bottomLeft.y)

  /*
   * Find the points for the fly J-seam
   */
  // FIXME: use option here
  points.jseamTop = xOnWaist(20, part)

  // Front pockets
  //points.frontPocketStart = (options.waistSlant > 0)
  //  ? utils.curveIntersectsY(
  //    points.points.topLeft

  /*
   * Paths
   */

  // Center front
  paths.cf = new Path()
    .move(points.cfBottom)
    .line(points.cfTop)
    .addClass('note dashed')
    .addText('centerFront', 'center fill-note text-sm')
  // Seamline
  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.trueBottomRight)
    .line(points.topRight)
    ._curve(points.topCp, points.topLeft)
    .addClass('fabric')

  // Complete?
  if (complete) {
    // Overwrite title from frontBase
    macro('title', {
      at: points.title,
      nr: 1,
      title: 'frontLeft',
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
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

export const frontLeft = {
  name: 'collab:frontLeft',
  draft: draftFrontLeft,
  from: frontBase,
}
