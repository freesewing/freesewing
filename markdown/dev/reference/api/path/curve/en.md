---
title: curve()
---

```js
Path path.curve(Point cp1, Point cp2, Point to)
```

Draws a cubic Bezier curve from the current position via two control points to a given endpoint.

<Example part="path_curve">
Example of the Path.curve() method
</Example>

```js
let { Point, points, Path, paths } = part.shorthand();

points.from = new Point(10, 20);
points.cp1 = new Point(40, 0);
points.cp2 = new Point(60, 30);
points.to = new Point(90, 20);

paths.line = new Path()
  .move(points.from)
  .curve(points.cp1, points.cp2, points.to)
  .attr("data-text", "Path.curve()")
  .attr("data-text-class", "text-sm center fill-note");
```
