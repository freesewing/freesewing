---
title: Drawing the bib outline
order: 190
---

With our neck opening in place, let's draw the basic outline of our bib:

```js
let width = measurements.head * options.widthRatio
let length = measurements.head * options.lengthRatio

points.topLeft = new Point(
  width / -2,
  points.top.y - (width / 2 - points.right.x)
);
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
```

First thing we did was create the `width` and `length` variables to
save ourselves some typing:

```js
let width = measurements.head * options.widthRatio
let length = measurements.head * options.lengthRatio
```

Both the length and width of your bib are a factor of the head circumference.
This way, your bib size will adapt to the size of the baby, and the user can tweak
the length and width by playing with the options you added to the pattern.

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
```

We're calculating the `topLeft` point so that the top edge of our bib
and the sides are equidistant from the neck neck opening.

You didn't have to do that. But it looks nicely balanced this way:

<Example pattern="tutorial" part="step5">
Note how the neck opening is the same distance from the left, right, and top edge
</Example>


