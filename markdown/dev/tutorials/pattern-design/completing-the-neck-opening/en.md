---
title: Completing the neck opening
order: 180
---

We've constructed the perfectly sized quarter neck, and we're going to use this
to create our complete neck path by flipping and mirroring it.

## Hiding our quarter neck opening

To make our code easier to understand, we're going to leave the `quarterNeck` path
as it is, and simply chose to not show it.

To accomplish this, we'll call the `hide()` method on our path:

<Example tutorial caption="A hidden path is not shown">
```js
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
  	points.right = new Point(tweak * measurements.head / 10, 0)
  	points.bottom = new Point(0, tweak * measurements.head / 12)

  	points.rightCp1 = points.right.shift(90, points.bottom.dy(points.right)/2)
  	points.bottomCp2 = points.bottom.shift(0, points.bottom.dx(points.right)/2)

  	paths.quarterNeck = new Path()
  	  .move(points.right)
  	  .curve(points.rightCp1, points.bottomCp2, points.bottom)
      // highlight-start
      .hide()
      // highlight-end

  	delta = paths.quarterNeck.length() - target
    if (delta > 0) tweak = tweak * 0.99
    else tweak = tweak * 1.02
  } while (Math.abs(delta) > 1)

  return part
}
```
</Example>

We're saying: _hide this path_. In other words, don't show it.
The path is still known, and we can still use it to calculate the length of the neck opening.
But it won't show up on screen or on the page.

## Create the complete neck opening

Now that we've hidden our homework, let's create the complete neck path.
As the neck opening is symmetrical, there's no need to re-calculate the points
on the other side. We can just flip them over, so to speak. And that's exactly
what we'll do.

Let's add some more points, and then construct the complete path for the neck
opening.

<Example tutorial caption="Our completed neck opening">
```js
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
  	points.right = new Point(tweak * measurements.head / 10, 0)
  	points.bottom = new Point(0, tweak * measurements.head / 12)

  	points.rightCp1 = points.right.shift(90, points.bottom.dy(points.right)/2)
  	points.bottomCp2 = points.bottom.shift(0, points.bottom.dx(points.right)/2)

  	paths.quarterNeck = new Path()
  	  .move(points.right)
  	  .curve(points.rightCp1, points.bottomCp2, points.bottom)
      .hide()

  	delta = paths.quarterNeck.length() - target
    if (delta > 0) tweak = tweak * 0.99
    else tweak = tweak * 1.02
  } while (Math.abs(delta) > 1)

  // highlight-start
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
  // highlight-end

  return part
}
```
</Example>

To add the points, we're using the `Point.flipX()` and `Point.flipY()` methods
here.  There's a few new Path methods too, like `close()` and `addClass()`.

Perhaps you can figure out what they do? If not, both [the Point
documentation](/reference/api/point/) and [the Path
documentation](/reference/api/path) have detailed info on all the methods
available, including these.
