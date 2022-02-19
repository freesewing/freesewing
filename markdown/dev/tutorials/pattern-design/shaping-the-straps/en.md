---
title: Shaping the straps
order: 200
---

Our straps should follow the neck opening, which isn't that hard to do.
We just need to keep the control points of our curves at similar proportions.
Which means, halfway between the start of the curve, and the corner of our rectangle.

<Note>

For this, you'll be using a new method: `Point.shiftFractionTowards()`. We've already
used `Point.shift()` and there's also `Point.shiftTowards()` and `Point.shiftOutwards()`.
As always, [the API docs](/reference/api/point/) have all the details.

</Note>

```js
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
```

Now, adapt our `rect` path so it's no longer a rectangle:

```js
paths.rect = new Path()
  .move(points.edgeTop)
  .curve(points.edgeTopLeftCp, points.edgeLeftCp, points.edgeLeft)
  .line(points.bottomLeft)
  .line(points.bottomRight)
  .line(points.edgeRight)
  .curve(points.edgeRightCp, points.edgeTopRightCp, points.edgeTop)
  .close()
```

All of a sudden, things are starting to look like a bib:

<Example pattern="tutorial" part="step6">
Pretty good, but how are we going to fit it over the baby's head?
</Example>
