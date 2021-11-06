---
title: Point.shiftFractionTowards()
---

Returns a new `Point` that is shifted towards the `target` by a `fraction` of the distance between this
point and the target.

This method accepts values larger than 1 to go beyond the target point, or negative values to shift the
point in the opposite direction.

If you need to move a point by a specific distance instead of a percentage, use [`Point.shiftTowards()`]((reference/api/point/shifttowards/)) or [`Point.shiftOutwards()`](reference/api/point/shiftoutwards/) instead.

## Point.shiftFractionTowards() signature

```js
Point point.shiftFractionTowards(Point target, float fraction)
```

## Point.shiftFractionTowards() example

<Example
  part="point_shiftfractiontowards"
  caption="An example of the Point.shiftFractionTowards() method"
/>

```js
let { Point, points, Path, paths, macro } = part.shorthand();

points.A = new Point(90, 70).attr("data-text", "Point A");
points.B = new Point(10, 10).attr("data-text", "Point B");
points.C = points.A.shiftFractionTowards(points.B, 0.5)
  .attr(
    "data-text",
    "Point C is point A shifted 50%\nin the direction of point B"
  )
  .attr("data-text-class", "center")
  .attr("data-text-lineheight", 6);

paths.direction = new Path()
  .move(points.A)
  .line(points.B)
  .attr("class", "note dashed");

macro("ld", {
  from: points.C,
  to: points.A,
  d: -10
});

macro("ld", {
  from: points.B,
  to: points.A,
  d: 20
});
```
