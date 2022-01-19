---
title: Completing the neck opening
order: 180
---

## Hiding our quarter neck

We've constructed the perfectly sized quarter neck, and we're going to use this
to create our complete neck path by flipping and mirroring it.

To make our code easier to understand, we're going to leave the `quarterNeck` path
as it is, and simply chose to not show it.

To accomplish this, update the code and add this one line:

```js
paths.quarterNeck = new Path()
	  .move(points.right)
	  .curve(points.rightCp1, points.bottomCp2, points.bottom)
    .setRender(false) // <== Add this line
```

We're saying: don't render this path. In other words, don't show it.
The path is now known, and we can still use it to calculate the length of the neck opening.
But it won't show up on screen or on the page.

## Create the complete neck path

Now that we've hidden our homework, let's create the complete neck path.
As the neck opening is symmetrical, there's no need to re-calculate the points
on the other side. You can just flip them over, so to speak. And that's exactly what you'll do.

Below your code (under the line with `while` on it), let's add some more points:

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

Then, below those new points, and the following code to create your path for the neck opening:

```js
paths.neck = new Path()
  .move(points.top)
  .curve(points.topCp2, points.leftCp1, points.left)
  .curve(points.leftCp2, points.bottomCp1, points.bottom)
  .curve(points.bottomCp2, points.rightCp1, points.right)
  .curve(points.rightCp2, points.topCp1, points.top)
  .close()
```

<Example pattern="tutorial" part="step4">
And now you have a complete neck opening
</Example>

