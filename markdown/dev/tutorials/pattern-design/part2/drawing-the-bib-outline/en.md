---
title: Drawing the bib outline
order: 88
---

With our neck opening in place, let us draw the basic outline of our bib.

<Example tutorial caption="Note how the neck opening is the same distance from the left, right, and top edge">
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

  // Construct the quarter neck opening
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

// highlight-start
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

  paths.rect = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.topRight)
    .line(points.topLeft)
    .close()
    .addClass('fabric')
// highlight-end

  return part
}
```
</Example>

First thing we did was create the `width` and `length` variables to
save ourselves some typing:

```js
const width = measurements.head * options.widthRatio
const length = measurements.head * options.lengthRatio
```

Both the length and width of our bib are a factor of the head circumference.
This way, our bib size will adapt to the size of the baby, and the user can tweak
the length and width by playing with the options we added to the pattern.

Once we have our variables, we're adding some new points, and a second path called `rect`.

```js
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
```

We're calculating the `topLeft` point so that the top edge of our bib
and the sides are equidistant from the neck opening.

We didn't have to do that. But it looks nicely balanced this way.

