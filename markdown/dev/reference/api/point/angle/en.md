---
title: Point.angle()
---

A point's `angle()` method returns the angle (in degrees) between this point and
the point passed into the method. An angle of 0° points to the right, and the angle increases counterclockwise.

## Point.angle() signature

```js
float point.angle(Point pointB)
```

## Point.angle() Example

<Example
  part="point_angle"
  caption="An example of the Point.angle() method"
/>

```js
let { Point, points, Path, paths } = part.shorthand();

points.sun = new Point(10, 5);
points.moon = points.sun.shift(-15, 70);
points.text = points.sun
  .shiftFractionTowards(points.moon, 0.8)
  .attr("data-text", points.sun.angle(points.moon)+"°")
  .attr("data-text-class", "text-sm fill-note center");

paths.line = new Path()
  .move(points.sun)
  .line(points.moon)
  .attr("class", "dashed");
```
