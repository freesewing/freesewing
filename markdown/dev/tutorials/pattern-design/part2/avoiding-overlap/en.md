---
title: Avoiding overlap
order: 220
---

While we've only drawn the end of one strap, it's pretty obvious they overlap,
which makes it impossible to cut out, so we're going to have to address
that.

Specifically, we're going to rotate our strap out of the way until it no longer overlaps.
The rest of our bib should stay as it is, so let's start by making a list of points we need
to rotate.

Once we have our list of points to rotate, we can rotate them. How far? Until the strap no longer overlaps.

<Example tutorial caption="It is looking pretty wonky now, but we'll deal with that next">
```design/src/bib.mjs
function draftBib({
  Path,
  Point,
  paths,
  points,
  measurements,
  options,
  macro,
  part,
}) {

  // Construct the quarter neck opening
  let tweak = 1
  let target = (measurements.head * options.neckRatio) /4
  let delta
  do {
    points.right = new Point(tweak * measurements.head / 10, 0)
    points.bottom = new Point(0, tweak * measurements.head / 12)

    points.rightCp1 = points.right.shift(90, points.bottom.dy(points.right)/2)
    points.bottomCp2 = points.bottom.shift(0, points.bottom.dx(points.right)/2)

    paths.quarterNeck = new Path()
      .move(points.right)
      .curve(points.rightCp1, points.bottomCp2, points.bottom)
      .hide() // Add this line

    delta = paths.quarterNeck.length() - target
    if (delta > 0) tweak = tweak * 0.99
    else tweak = tweak * 1.02
  } while (Math.abs(delta) > 1)

  // Construct the complete neck opening
  points.rightCp2 = points.rightCp1.flipY()
  points.bottomCp1 = points.bottomCp2.flipX()
  points.left = points.right.flipX()
  points.leftCp1 = points.rightCp2.flipX()
  points.leftCp2 = points.rightCp1.flipX()
  points.top = points.bottom.flipY()
  points.topCp1 = points.bottomCp2.flipY()
  points.topCp2 = points.bottomCp1.flipY()

  paths.neck = new Path()
    .move(points.top)
    .curve(points.topCp2, points.leftCp1, points.left)
    .curve(points.leftCp2, points.bottomCp1, points.bottom)
    .curve(points.bottomCp2, points.rightCp1, points.right)
    .curve(points.rightCp2, points.topCp1, points.top)
    .close()
    .addClass('fabric')

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

  paths.rect = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .addClass('fabric')

  // Shape the straps
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

  macro("round", {
    from: points.edgeTop,
    to: points.tipRight,
    via: points.tipRightTop,
    prefix: "tipRightTop",
    hide: false
  })
  macro("round", {
    from: points.tipRight,
    to: points.top,
    via: points.tipRightBottom,
    prefix: "tipRightBottom",
    hide: false
  })

  // highlight-start
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
  // highlight-end

  // highlight-start
  /*
   * This is not needed
   * we are merely adding it to show
   * what the rotated path looks like
   */
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
  // highlight-end

  // highlight-start
  /*
   * Always draw your path at the end
   * after you've manipulated your points
   */
  paths.rect = new Path()
    .move(points.edgeTop)
    .curve(points.edgeTopLeftCp, points.edgeLeftCp, points.edgeLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.edgeRight)
    .curve(points.edgeRightCp, points.edgeTopRightCp, points.edgeTop)
    .close()
  // highlight-end

  return part
}
```
</Example>
