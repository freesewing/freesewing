---
title: Rounding the corners
order: 94
---

We already know how to round corners, we'll have the `round` macro take care of that for us.

With our corners rounded, we should also update our path.
Fortunately, we merely have to update the start of it.

<Example tutorial caption="The shape of our bib is now completed">
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
   * Construct the quarter neck opening
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
    }),
    tipRightBottom: macro("round", {
      id: "tipRightBottom",
      from: points.tipRight,
      to: points.top,
      via: points.tipRightBottom,
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

  // highlight-start
  /*
   * Round the bottom corners
   * Macros will return the auto-generated IDs
   */
  const ids2 = {
    bottomLeft: macro("round", {
      id: "bottomLeft",
      from: points.topLeft,
      to: points.bottomRight,
      via: points.bottomLeft,
      radius: points.bottomRight.x / 4,
    }),
    bottomRight: macro("round", {
      id: "bottomRight",
      from: points.bottomLeft,
      to: points.topRight,
      via: points.bottomRight,
      radius: points.bottomRight.x / 4,
    })
  }

  /*
   * Create points from them with easy names
   */
  for (const side in ids2) {
    for (const id of ['start', 'cp1', 'cp2', 'end']) {
      points[`${side}${utils.capitalize(id)}`] = points[ids2[side].points[id]].copy()
    }
  }
  // highlight-end

  // Create one path for the bib outline
  paths.seam = new Path()
    .move(points.edgeLeft)
    // strikeout-start
    /* We only need to replace the start
     * with the new lines below
    .line(points.bottomLeft)
    .line(points.bottomRight)
    */
    // strikeout-end
    // highlight-start
    .line(points.bottomLeftStart)
    .curve(points.bottomLeftCp1, points.bottomLeftCp2, points.bottomLeftEnd)
    .line(points.bottomRightStart)
    .curve(points.bottomRightCp1, points.bottomRightCp2, points.bottomRightEnd)
    // highlight-end
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

  return part
}
```
</Example>
