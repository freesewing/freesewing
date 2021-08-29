---
title: Completing the neck opening
order: 180
---

As the neck opening is symmetrical, there's no need to re-calculate the points
on the other side. You can just flip them over, so to speak. And that's exactly what you'll do:

First create some new points:

```js
points.rightCp2 = points.rightCp1.flipY()
points.bottomCp1 = points.bottomCp2.flipX()

points.left = points.right.flipX()
points.leftCp1 = points.rightCp2.flipX()
points.leftCp2 = points.rightCp1.flipX()

points.top = points.bottom.flipY()
points.topCp1 = points.bottomCp2.flipY()
points.topCp2 = points.bottomCp1.flipY()
```

<Note>

We're using the `Point.flipX()` and `Point.flipY()` methods here.
Perhaps you can figure out what they do? If not, check [the API documentation](/reference/api/point/).

</Note>

Then, update your path:

```js
paths.neck = new Path()
  .move(points.top)
  .curve(points.topCp2, points.leftCp1, points.left)
  .curve(points.leftCp2, points.bottomCp1, points.bottom)
  .curve(points.bottomCp2, points.rightCp1, points.right)
  .curve(points.rightCp2, points.topCp1, points.top)
  .close()
```

<Example pattern="tutorial" part="step4" caption="And now you have a complete neck opening" />

