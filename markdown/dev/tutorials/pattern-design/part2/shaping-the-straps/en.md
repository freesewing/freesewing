---
title: Shaping the straps
order: 90
---

Our straps should follow the neck opening, which isn't that hard to do.
We just need to keep the control points of our curves at similar proportions.
Which means, halfway between the start of the curve, and the corner of our rectangle.

<Note>

For this, we'll be using a new method: `Point.shiftFractionTowards()`. We've already
used `Point.shift()` and there's also `Point.shiftTowards()` and `Point.shiftOutwards()`.
As always, [the API docs](/reference/api/point/) have all the details.

</Note>


<Example tutorial caption="All of a sudden, things are starting to look like a bib">
```design/src/bib.mjs
function draftBib({
  Path,
  Point,
  paths,
  points,
  measurements,
  options,
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

// strikeout-start
/*
* Remove this path

  paths.rect = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .addClass('fabric')
*/
// strikeout-end

// highlight-start
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

// highlight-end

  return part
}
```
</Example>
