---
title: Point.shiftTowards()
---

Returns a new `Point` that is shifted `distance` (mm) in the direction of the `target`.

If you need to move a point a percentage instead of a specific distance, use [`Point.shiftFractionTowards()`](reference/api/point/shiftfractiontowards/) instead.

## Point.shiftTowards() signature

```js
Point point.shiftTowards(Point target, float distance)
```

## Point.shiftTowards() example

<Example
  part="point_shifttowards"
  caption="An example of the Point.shiftTowards() method"
/>

```js
let { Point, points, Path, paths, macro } = part.shorthand();

points.A = new Point(90, 70).attr("data-text", "Point A");
points.B = new Point(10, 10).attr("data-text", "Point B");
points.C = points.A.shiftTowards(points.B, 35)
  .attr(
    "data-text",
    "Point C is point A shifted 3.5cm\nin the direction of point B"
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
```
