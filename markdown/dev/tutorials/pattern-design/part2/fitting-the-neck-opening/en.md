---
title: Fitting the neck opening
order: 70
---

We are not going to create some opening that we _hope_ is the right size, we're
going to make sure it is.  Here's how we'll make sure the neck opening is _just
right_:

<Example tutorial caption="It might look the same as before, but now it's just right">
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
// highlight-start
  let tweak = 1
  let target = (measurements.head * options.neckRatio) /4
  let delta
  do {
// highlight-end
    points.right = new Point(
// highlight-start
      tweak * measurements.head / 10, 
// highlight-end
      0
    )
    points.bottom = new Point(
      0, 
// highlight-start
      tweak * measurements.head / 12
// highlight-end
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


// highlight-start
    delta = paths.quarterNeck.length() - target
    if (delta > 0) tweak = tweak * 0.99
    else tweak = tweak * 1.02
  } while (Math.abs(delta) > 1)
// highlight-end
  return part
}
```
</Example>

We've added a few new variables:

- `tweak`: A _tweak factor_ that we'll use to increase or decrease the neck
  opening by making it more or less than 1
- `target`: How long our (quarter) neck opening should be
- `delta`: How far we're off. Positive numbers mean it's too long, negative
  means too short

Now that we know what `target` is, we construct our path as we did before.  But
this time around, we multiply our point coordinates with our `tweak` variable
(1 at the start).

Then, we compare our `target` to the result of `paths.neck.length()` which —
you guessed it — returns the length of our neck path.

If the delta is positive, our path is too long and we reduce the tweak factor.
If the delta is negative, our path is too short and we increase the tweak
factor.

We keep on doing this until `Math.abs(delta)` is less than 1. Meaning that we
are within 1 mm of our target value.

Now that we're happy with the length of our quarter neck opening, let's
complete the entire neck opening.
