---
title: Drawing the straps
order: 93
---

All we have to do now is flip a bunch of points on the other side,
and create one single path that follows our bib outline.

And as we now have one path to draw the bib, we can (and should)
remove the earlier paths we drew to see what we are doing.

The `round` macro we added earlier is still required to calculate the points we
need to construct the half-circle. But we don't want it to draw the half-circle
path. As it happens, that is the default behaviour, so we merely have to remove
its `hidden: false` property.

<Example tutorial caption="It is starting to look good. But this sharp corners at the bottom don't exactly say baby, do they?">
```design/src/bib.mjs
function draftBib({
  Path,
  Point,
  paths,
  points,
  measurements,
  options,
  utils,
  macro,
  part,
}) {

  /*
   * Construct the neck opening
   */
  let tweak = 1
  let target = (measurements.head * options.neckRatio) /4
  let delta
  do {
    points.right = new Point(
      tweak * measurements.head / 10, 
      0
    )
    points.bottom = new Point(
      0, 
      tweak * measurements.head / 12
    )
  
    points.rightCp1 = points.right.shift(
      90, 
      points.bottom.dy(points.right) / 2
    )
    points.bottomCp2 = points.bottom.shift(
      0, 
      points.bottom.dx(points.right) / 2
    )
  
    paths.quarterNeck = new Path()
      .move(points.right)
      .curve(
        points.rightCp1, 
        points.bottomCp2, 
        points.bottom
      )
      .hide()

    delta = paths.quarterNeck.length() - target
    if (delta > 0) tweak = tweak * 0.99
    else tweak = tweak * 1.02
  } while (Math.abs(delta) > 1)

  /*
   * Construct the complete neck opening
   */
  points.rightCp2 = points.rightCp1.flipY()
  points.bottomCp1 = points.bottomCp2.flipX()
  points.left = points.right.flipX()
  points.leftCp1 = points.rightCp2.flipX()
  points.leftCp2 = points.rightCp1.flipX()
  points.top = points.bottom.flipY()
  points.topCp1 = points.bottomCp2.flipY()
  points.topCp2 = points.bottomCp1.flipY()

  // strikeout-start
  /* Remove this path
  paths.neck = new Path()
    .move(points.top)
    .curve(points.topCp2, points.leftCp1, points.left)
    .curve(points.leftCp2, points.bottomCp1, points.bottom)
    .curve(points.bottomCp2, points.rightCp1, points.right)
    .curve(points.rightCp2, points.topCp1, points.top)
    .close()
    .addClass('fabric')
   */
  // strikeout-end

  // Drawing the bib outline
  const width = measurements.head * options.widthRatio
  const length = measurements.head * options.lengthRatio

  points.topLeft = new Point(
    width / -2,
    points.top.y - (width / 2 - points.right.x)
  )
  points.topRight = points.topLeft.shift(0, width)
  points.bottomLeft = points.topLeft.shift(-90, length)
  points.bottomRight = points.topRight.shift(-90, length)

  /*
   * Shape the straps
   */
  points.edgeLeft = new Point(points.topLeft.x, points.left.y)
  points.edgeRight = new Point(points.topRight.x, points.right.y)
  points.edgeTop = new Point(0, points.topLeft.y)

  points.edgeLeftCp = points.edgeLeft.shiftFractionTowards(points.topLeft, 0.5)
  points.edgeRightCp = points.edgeLeftCp.flipX()
  points.edgeTopLeftCp = points.edgeTop.shiftFractionTowards(
    points.topLeft,
    0.5
  )
  points.edgeTopRightCp = points.edgeTopLeftCp.flipX()

  // Round the straps
  const strap = points.edgeTop.dy(points.top)

  points.tipRight = points.edgeTop.translate(strap / 2, strap / 2)
  points.tipRightTop = new Point(points.tipRight.x, points.edgeTop.y)
  points.tipRightBottom = new Point(points.tipRight.x, points.top.y)

  /*
   * Macros will return the auto-generated IDs
   */
  const ids1 = {
    tipRightTop: macro("round", {
      id: "tipRightTop",
      from: points.edgeTop,
      to: points.tipRight,
      via: points.tipRightTop,
      // strikeout-start
      /* Remove this to have the macro
       * only create the points we need
       * and not draw a path
      hide: false
      */
      // strikeout-end
    }),
    tipRightBottom: macro("round", {
      id: "tipRightBottom",
      from: points.tipRight,
      to: points.top,
      via: points.tipRightBottom,
      // strikeout-start
      /* Remove this to have the macro
       * only create the points we need
       * and not draw a path
      hide: false
      */
      // strikeout-end
    })
  }

  /*
   * Create points from them with easy names
   */
  for (const side in ids1) {
    for (const id of ['start', 'cp1', 'cp2', 'end']) {
      points[`${side}${utils.capitalize(id)}`] = points[ids1[side].points[id]].copy()
    }
  }

  /*
   * This is the list of points we need to rotate
   * to move our strap out of the way
   */

  const rotateThese = [
    "edgeTopLeftCp",
    "edgeTop",
    "tipRight",
    "tipRightTop",
    "tipRightTopStart",
    "tipRightTopCp1",
    "tipRightTopCp2",
    "tipRightTopEnd",
    "tipRightBottomStart",
    "tipRightBottomCp1",
    "tipRightBottomCp2",
    "tipRightBottomEnd",
    "tipRightBottom",
    "top",
    "topCp2"
  ]
    /*
     * We're rotating all the points in
     * the `rotateThese` array around
     * the `edgeLeft` point.
     *
     * We're using increments of 1 degree
     * until the `tipRightBottomStart` point
     * is 1 mm beyond the center of our bib.
     */
    while (points.tipRightBottomStart.x > -1) {
      for (const p of rotateThese) points[p] = points[p].rotate(1, points.edgeLeft)
    }

  // strikeout-start
  /* Remove this repetition
  macro("round", {
    from: points.edgeTop,
    to: points.tipRight,
    via: points.tipRightTop,
    prefix: "tipRightTop",
    hide: false,
    class: 'contrast dotted',
  })
  macro("round", {
    from: points.tipRight,
    to: points.top,
    via: points.tipRightBottom,
    prefix: "tipRightBottom",
    hide: false,
    class: 'contrast dotted',
  })

  paths.rect = new Path()
    .move(points.edgeTop)
    .curve(points.edgeTopLeftCp, points.edgeLeftCp, points.edgeLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.edgeRight)
    .curve(points.edgeRightCp, points.edgeTopRightCp, points.edgeTop)
    .close()
  */
  // strikeout-end

  // highlight-start
  // Add points for second strap
  points.edgeTopRightCp = points.edgeTopLeftCp.flipX()
  points.topCp1 = points.topCp2.flipX()
  points.tipLeftTopStart = points.tipRightTopStart.flipX()
  points.tipLeftTopCp1 = points.tipRightTopCp1.flipX()
  points.tipLeftTopCp2 = points.tipRightTopCp2.flipX()
  points.tipLeftTopEnd = points.tipRightTopEnd.flipX()
  points.tipLeftBottomStart = points.tipRightBottomStart.flipX()
  points.tipLeftBottomCp1 = points.tipRightBottomCp1.flipX()
  points.tipLeftBottomCp2 = points.tipRightBottomCp2.flipX()
  points.tipLeftBottomEnd = points.tipRightBottomEnd.flipX()

  // Create one path for the bib outline
  paths.seam = new Path()
    .move(points.edgeLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.edgeRight)
    .curve(
      points.edgeRightCp,
      points.edgeTopRightCp,
      points.tipLeftTopStart
    )
    .curve(
      points.tipLeftTopCp1,
      points.tipLeftTopCp2,
      points.tipLeftTopEnd
    )
    .curve(
      points.tipLeftBottomCp1,
      points.tipLeftBottomCp2,
      points.tipLeftBottomEnd
    )
    .curve(
      points.topCp1,
      points.rightCp2,
      points.right
    )
    .curve(
      points.rightCp1,
      points.bottomCp2,
      points.bottom
    )
    .curve(
      points.bottomCp1,
      points.leftCp2,
      points.left
    )
    .curve(
      points.leftCp1,
      points.topCp2,
      points.tipRightBottomEnd
    )
    .curve(
      points.tipRightBottomCp2,
      points.tipRightBottomCp1,
      points.tipRightBottomStart
    )
    .curve(
      points.tipRightTopCp2,
      points.tipRightTopCp1,
      points.tipRightTopStart
    )
    .curve(
      points.edgeTopLeftCp,
      points.edgeLeftCp,
      points.edgeLeft
    )
    .close()
    .addClass("fabric")
  // highlight-end

  return part
}
```
</Example>
