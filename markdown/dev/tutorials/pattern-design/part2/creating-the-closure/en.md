---
title: Creating the closure
order: 91
---

Things are starting to look good, but we can't fit the bib over the baby's head like this.
So we must create a closure. We'll let the straps overlap at the end, and put in a snap
later.

## Using macros

To round the straps, we'll use something new: **a macro**. To use macros, we
need the `macro` method, which we can destructure to get access to it.

Macros are little helpers that automate things that would otherwise get rather
tedious. There are macros to add titles to our pattern, or grainline
indicators, a scalebox, and there's a macro to round corners. The `round`
macro.

<Note> You can find more information on the `round` macro in [the macros docs](/reference/macros/round/).</Note>

We need a half circle here, but the `round` macro works on 90° angles, so
we'll use it twice.  As such, we'll add some points to guide the macro, and
then put it to work.

Like our neck opening, we've only drawn half since we can simply copy the
points to the other side.

<Example tutorial caption="Now the straps overlap. Which doesn't work for a pattern as it would make it impossible to cut it out of a single piece of fabric. So let's deal with the overlap next.">
```design/src/bib.mjs
function draftBib({
  Path,
  Point,
  paths,
  points,
  measurements,
  options,
  // highlight-start
  macro,
  // highlight-end
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

  paths.neck = new Path()
    .move(points.top)
    .curve(points.topCp2, points.leftCp1, points.left)
    .curve(points.leftCp2, points.bottomCp1, points.bottom)
    .curve(points.bottomCp2, points.rightCp1, points.right)
    .curve(points.rightCp2, points.topCp1, points.top)
    .close()
    .addClass('fabric')

  /*
   * Drawing the bib outline
   */
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

  // highlight-start
  // Round the straps
  const strap = points.edgeTop.dy(points.top)

  points.tipRight = points.edgeTop.translate(strap / 2, strap / 2)
  points.tipRightTop = new Point(points.tipRight.x, points.edgeTop.y)
  points.tipRightBottom = new Point(points.tipRight.x, points.top.y)

  macro("round", {
    id: "tipRightTop",
    from: points.edgeTop,
    to: points.tipRight,
    via: points.tipRightTop,
    hide: false
  })
  macro("round", {
    id: "tipRightBottom",
    from: points.tipRight,
    to: points.top,
    via: points.tipRightBottom,
    hide: false
  })
  // highlight-end

    /*
   * Now, adapt our `rect` path so it's no longer a rectangle:
   */
  paths.rect = new Path()
    .move(points.edgeTop)
    .curve(points.edgeTopLeftCp, points.edgeLeftCp, points.edgeLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.edgeRight)
    .curve(points.edgeRightCp, points.edgeTopRightCp, points.edgeTop)
    .close()

  return part
}
```
</Example>

Notice that we always draw our path at the end after we've manipulated our points.