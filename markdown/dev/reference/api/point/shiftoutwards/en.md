---
title: Point.shiftOutwards()
---

Returns a new `Point` that is shifted `distance` (mm) beyond the `target` in the direction of the target point.

## Point.shiftOutwards() signature

```js
Point point.shiftOutwards(Point target, float distance)
```

## Point.shiftOutwards() example

<Example
  part="point_shiftoutwards"
  caption="An example of the Point.shiftOutwards() method"
/>

```js
let { Point, points, Path, paths, macro } = part.shorthand();

points.A = new Point(90, 70).attr("data-text", "Point A");
points.B = new Point(10, 10).attr("data-text", "Point B");
points.C = points.A.shiftOutwards(points.B, 30)
  .attr("data-text", "Point C is point A shifted 3cm\nbeyond point B")
  .attr("data-text-lineheight", 6);

paths.direction = new Path()
  .move(points.A)
  .line(points.C)
  .attr("class", "note dashed");

macro("ld", {
  from: points.C,
  to: points.B,
  d: -10
});
```
